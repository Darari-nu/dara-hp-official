import fs from 'fs-extra';

export interface CostEntry {
  timestamp: string;
  operation: string;
  cost: number;
  metadata?: Record<string, any>;
}

export interface CostSummary {
  daily: {
    current: number;
    limit: number;
    remaining: number;
  };
  monthly: {
    current: number;
    limit: number;
    remaining: number;
  };
  total: {
    cost: number;
    requests: number;
  };
}

export interface BudgetCheck {
  canProceed: boolean;
  reason?: string;
  currentUsage: {
    daily: number;
    monthly: number;
  };
}

export interface CostTrackerConfig {
  dataFile: string;
  costPerOperation: number;
  dailyBudgetLimit: number;
  monthlyBudgetLimit: number;
  operationType?: string;
}

export interface CostData {
  entries: CostEntry[];
  config: {
    costPerOperation: number;
    dailyBudgetLimit: number;
    monthlyBudgetLimit: number;
  };
}

export class UniversalCostTracker {
  private config: CostTrackerConfig;
  private data: CostData;

  constructor(config: CostTrackerConfig) {
    this.config = {
      operationType: 'operation',
      ...config
    };
    this.data = {
      entries: [],
      config: {
        costPerOperation: config.costPerOperation,
        dailyBudgetLimit: config.dailyBudgetLimit,
        monthlyBudgetLimit: config.monthlyBudgetLimit
      }
    };
  }

  async initialize(): Promise<void> {
    try {
      await this.loadData();
    } catch (error) {
      // ファイルが存在しない場合は新規作成
      await this.saveData();
    }
  }

  private async loadData(): Promise<void> {
    try {
      if (await fs.pathExists(this.config.dataFile)) {
        const fileContent = await fs.readFile(this.config.dataFile, 'utf-8');
        this.data = JSON.parse(fileContent);
        
        // 設定の更新（新しい設定値があれば上書き）
        this.data.config.costPerOperation = this.config.costPerOperation;
        this.data.config.dailyBudgetLimit = this.config.dailyBudgetLimit;
        this.data.config.monthlyBudgetLimit = this.config.monthlyBudgetLimit;
      }
    } catch (error) {
      throw new Error(`Failed to load cost data: ${error}`);
    }
  }

  private async saveData(): Promise<void> {
    try {
      const dataToSave = {
        ...this.data,
        lastUpdated: new Date().toISOString()
      };
      
      await fs.writeFile(
        this.config.dataFile, 
        JSON.stringify(dataToSave, null, 2), 
        'utf-8'
      );
    } catch (error) {
      throw new Error(`Failed to save cost data: ${error}`);
    }
  }

  async checkBudgetLimits(): Promise<BudgetCheck> {
    const summary = await this.getCostSummary();
    
    if (summary.daily.current + this.config.costPerOperation > summary.daily.limit) {
      return {
        canProceed: false,
        reason: `Daily budget limit exceeded. Current: $${summary.daily.current.toFixed(2)}, Limit: $${summary.daily.limit.toFixed(2)}`,
        currentUsage: {
          daily: summary.daily.current,
          monthly: summary.monthly.current
        }
      };
    }
    
    if (summary.monthly.current + this.config.costPerOperation > summary.monthly.limit) {
      return {
        canProceed: false,
        reason: `Monthly budget limit exceeded. Current: $${summary.monthly.current.toFixed(2)}, Limit: $${summary.monthly.limit.toFixed(2)}`,
        currentUsage: {
          daily: summary.daily.current,
          monthly: summary.monthly.current
        }
      };
    }
    
    return {
      canProceed: true,
      currentUsage: {
        daily: summary.daily.current,
        monthly: summary.monthly.current
      }
    };
  }

  async recordOperation(metadata?: Record<string, any>): Promise<CostEntry> {
    const entry: CostEntry = {
      timestamp: new Date().toISOString(),
      operation: this.config.operationType || 'operation',
      cost: this.config.costPerOperation,
      metadata: metadata
    };

    this.data.entries.push(entry);
    await this.saveData();
    
    return entry;
  }

  async getCostSummary(): Promise<CostSummary> {
    // データが正しく初期化されているか確認
    if (!this.data || !this.data.entries) {
      this.data = {
        entries: [],
        config: {
          costPerOperation: this.config.costPerOperation,
          dailyBudgetLimit: this.config.dailyBudgetLimit,
          monthlyBudgetLimit: this.config.monthlyBudgetLimit
        }
      };
    }

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // 日次コスト計算
    const dailyEntries = this.data.entries.filter(entry => 
      entry.timestamp.startsWith(today)
    );
    const dailyCost = dailyEntries.reduce((sum, entry) => sum + entry.cost, 0);

    // 月次コスト計算
    const monthlyEntries = this.data.entries.filter(entry => 
      entry.timestamp.startsWith(currentMonth)
    );
    const monthlyCost = monthlyEntries.reduce((sum, entry) => sum + entry.cost, 0);

    // 総コスト計算
    const totalCost = this.data.entries.reduce((sum, entry) => sum + entry.cost, 0);
    const totalRequests = this.data.entries.length;

    return {
      daily: {
        current: dailyCost,
        limit: this.data.config.dailyBudgetLimit,
        remaining: Math.max(0, this.data.config.dailyBudgetLimit - dailyCost)
      },
      monthly: {
        current: monthlyCost,
        limit: this.data.config.monthlyBudgetLimit,
        remaining: Math.max(0, this.data.config.monthlyBudgetLimit - monthlyCost)
      },
      total: {
        cost: totalCost,
        requests: totalRequests
      }
    };
  }

  async getUsageHistory(days: number = 30): Promise<{
    date: string;
    operations: number;
    cost: number;
  }[]> {
    const result: { date: string; operations: number; cost: number; }[] = [];
    const now = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      const dayEntries = this.data.entries.filter(entry =>
        entry.timestamp.startsWith(dateString)
      );

      result.push({
        date: dateString,
        operations: dayEntries.length,
        cost: dayEntries.reduce((sum, entry) => sum + entry.cost, 0)
      });
    }

    return result.reverse();
  }

  async updateBudgetLimits(
    dailyLimit?: number,
    monthlyLimit?: number
  ): Promise<void> {
    if (dailyLimit !== undefined) {
      this.config.dailyBudgetLimit = dailyLimit;
      this.data.config.dailyBudgetLimit = dailyLimit;
    }
    
    if (monthlyLimit !== undefined) {
      this.config.monthlyBudgetLimit = monthlyLimit;
      this.data.config.monthlyBudgetLimit = monthlyLimit;
    }
    
    await this.saveData();
  }

  async updateCostPerOperation(newCost: number): Promise<void> {
    this.config.costPerOperation = newCost;
    this.data.config.costPerOperation = newCost;
    await this.saveData();
  }

  async exportData(outputPath: string): Promise<void> {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        config: this.data.config,
        summary: await this.getCostSummary(),
        entries: this.data.entries
      };

      await fs.writeFile(
        outputPath,
        JSON.stringify(exportData, null, 2),
        'utf-8'
      );
    } catch (error) {
      throw new Error(`Failed to export data: ${error}`);
    }
  }

  async clearOldEntries(olderThanDays: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
    const cutoffString = cutoffDate.toISOString();

    const oldLength = this.data.entries.length;
    this.data.entries = this.data.entries.filter(entry => 
      entry.timestamp >= cutoffString
    );
    
    const removedCount = oldLength - this.data.entries.length;
    
    if (removedCount > 0) {
      await this.saveData();
    }
    
    return removedCount;
  }
}