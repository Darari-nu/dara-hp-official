import fs from 'fs-extra';
import path from 'path';
import { CostTracking } from '../types';

export class CostTracker {
  private trackingFile: string;
  private costPerImage: number;
  private dailyLimit: number;
  private monthlyLimit: number;

  constructor(
    trackingFile: string = './cost-tracking.json',
    costPerImage: number = 0.04,
    dailyLimit: number = 5.00,
    monthlyLimit: number = 50.00
  ) {
    this.trackingFile = trackingFile;
    this.costPerImage = costPerImage;
    this.dailyLimit = dailyLimit;
    this.monthlyLimit = monthlyLimit;
  }

  async loadTracking(): Promise<CostTracking> {
    try {
      if (await fs.pathExists(this.trackingFile)) {
        const data = await fs.readJson(this.trackingFile);
        return data as CostTracking;
      }
    } catch (error) {
      console.warn('Failed to load cost tracking data:', error);
    }

    return {
      totalCost: 0,
      dailyCost: 0,
      monthlyCost: 0,
      requestCount: 0,
      lastResetDate: new Date().toISOString().split('T')[0]
    };
  }

  async saveTracking(tracking: CostTracking): Promise<void> {
    try {
      await fs.ensureDir(path.dirname(this.trackingFile));
      await fs.writeJson(this.trackingFile, tracking, { spaces: 2 });
    } catch (error) {
      console.error('Failed to save cost tracking data:', error);
    }
  }

  async recordRequest(): Promise<CostTracking> {
    const tracking = await this.loadTracking();
    const today = new Date().toISOString().split('T')[0];
    
    if (tracking.lastResetDate !== today) {
      tracking.dailyCost = 0;
      tracking.lastResetDate = today;
      
      const currentMonth = new Date().getMonth();
      const lastResetMonth = new Date(tracking.lastResetDate).getMonth();
      if (currentMonth !== lastResetMonth) {
        tracking.monthlyCost = 0;
      }
    }

    tracking.totalCost += this.costPerImage;
    tracking.dailyCost += this.costPerImage;
    tracking.monthlyCost += this.costPerImage;
    tracking.requestCount += 1;

    await this.saveTracking(tracking);
    return tracking;
  }

  async checkBudgetLimits(): Promise<{ canProceed: boolean; reason?: string }> {
    const tracking = await this.loadTracking();
    const today = new Date().toISOString().split('T')[0];
    
    if (tracking.lastResetDate !== today) {
      tracking.dailyCost = 0;
    }

    if (tracking.dailyCost + this.costPerImage > this.dailyLimit) {
      return {
        canProceed: false,
        reason: `Daily budget limit exceeded. Current: $${tracking.dailyCost.toFixed(2)}, Limit: $${this.dailyLimit.toFixed(2)}`
      };
    }

    if (tracking.monthlyCost + this.costPerImage > this.monthlyLimit) {
      return {
        canProceed: false,
        reason: `Monthly budget limit exceeded. Current: $${tracking.monthlyCost.toFixed(2)}, Limit: $${this.monthlyLimit.toFixed(2)}`
      };
    }

    return { canProceed: true };
  }

  async getCostSummary(): Promise<{
    daily: { current: number; limit: number; remaining: number };
    monthly: { current: number; limit: number; remaining: number };
    total: { cost: number; requests: number };
  }> {
    const tracking = await this.loadTracking();
    const today = new Date().toISOString().split('T')[0];
    
    const dailyCost = tracking.lastResetDate === today ? tracking.dailyCost : 0;
    
    return {
      daily: {
        current: dailyCost,
        limit: this.dailyLimit,
        remaining: Math.max(0, this.dailyLimit - dailyCost)
      },
      monthly: {
        current: tracking.monthlyCost,
        limit: this.monthlyLimit,
        remaining: Math.max(0, this.monthlyLimit - tracking.monthlyCost)
      },
      total: {
        cost: tracking.totalCost,
        requests: tracking.requestCount
      }
    };
  }

  async resetDailyCost(): Promise<void> {
    const tracking = await this.loadTracking();
    tracking.dailyCost = 0;
    tracking.lastResetDate = new Date().toISOString().split('T')[0];
    await this.saveTracking(tracking);
  }

  async resetMonthlyCost(): Promise<void> {
    const tracking = await this.loadTracking();
    tracking.monthlyCost = 0;
    await this.saveTracking(tracking);
  }
}