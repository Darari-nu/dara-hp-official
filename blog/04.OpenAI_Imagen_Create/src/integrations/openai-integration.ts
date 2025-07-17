import { OpenAIApiClient } from '../modules/openai-api';
import { UniversalFileManager } from '../lib/file-manager';
import { UniversalCostTracker } from '../lib/cost-tracker';
import { UniversalPromptEnhancer, PromptEnhancerConfig } from '../lib/prompt-enhancer';
import { Logger } from '../utils/logger';
import { GenerationResult, OpenAIGenerationConfig } from '../types';
import { createDefaultSceneVariations } from '../templates/scene-variations';

export interface OpenAIIntegrationConfig {
  apiKey: string;
  apiUrl?: string;
  imagesDirectory: string;
  costTrackingFile: string;
  promptTemplateFile: string;
  costPerImage: number;
  dailyBudgetLimit: number;
  monthlyBudgetLimit: number;
  imageModel?: string;
  imageQuality?: 'low' | 'medium' | 'high';
  imageSize?: string;
  imageCount?: number;
}

export class OpenAIImageGenerationSystem {
  private apiClient: OpenAIApiClient;
  private fileManager: UniversalFileManager;
  private costTracker: UniversalCostTracker;
  private promptEnhancer: UniversalPromptEnhancer;
  private logger: Logger;
  private config: OpenAIIntegrationConfig;

  constructor(config: OpenAIIntegrationConfig) {
    this.config = config;

    // API クライアント
    this.apiClient = new OpenAIApiClient(
      config.apiKey,
      config.apiUrl || 'https://api.openai.com/v1/images/generations'
    );

    // ファイル管理
    this.fileManager = new UniversalFileManager({
      baseDirectory: config.imagesDirectory,
      dateFormat: 'YYYYMMDD',
      fileNaming: 'date_title'
    });

    // コスト追跡
    this.costTracker = new UniversalCostTracker({
      dataFile: config.costTrackingFile,
      costPerOperation: config.costPerImage,
      dailyBudgetLimit: config.dailyBudgetLimit,
      monthlyBudgetLimit: config.monthlyBudgetLimit,
      operationType: 'image_generation'
    });

    // プロンプト強化
    const enhancerConfig: PromptEnhancerConfig = {
      templateFile: config.promptTemplateFile,
      themeVariations: createDefaultSceneVariations()
    };
    this.promptEnhancer = new UniversalPromptEnhancer(enhancerConfig);

    // ロガー
    this.logger = new Logger('./logs/app.log');
  }

  async initialize(): Promise<void> {
    await this.fileManager.createDirectoryStructure();
    await this.costTracker.initialize();
    await this.promptEnhancer.loadTemplate();
    await this.logger.info('OpenAI Image Generation System initialized');
  }

  async generateImage(prompt: string): Promise<GenerationResult> {
    const startTime = Date.now();
    
    try {
      await this.logger.info('Starting image generation', { prompt });

      // 予算チェック
      const budgetCheck = await this.costTracker.checkBudgetLimits();
      if (!budgetCheck.canProceed) {
        const error = `Budget limit exceeded: ${budgetCheck.reason}`;
        await this.logger.warn('Generation blocked due to budget limits', { reason: budgetCheck.reason });
        return {
          success: false,
          error: error,
          cost: 0,
          prompt: prompt,
          enhancedPrompt: prompt,
          timestamp: new Date().toISOString()
        };
      }

      // プロンプト強化
      const enhancedPrompt = this.promptEnhancer.enhancePrompt(prompt);
      await this.logger.info('Prompt enhanced', { original: prompt, enhanced: enhancedPrompt });

      // OpenAI API設定
      const apiConfig: OpenAIGenerationConfig = {
        prompt: enhancedPrompt,
        model: this.config.imageModel || 'gpt-image-1',
        quality: this.config.imageQuality || 'medium',
        size: this.config.imageSize || '1024x1024',
        count: this.config.imageCount || 1
      };

      // 画像生成
      const imageBuffer = await this.apiClient.generateImage(apiConfig);
      
      // ファイル保存
      const saveResult = await this.fileManager.saveFile(imageBuffer, prompt, '.png');
      if (!saveResult.success) {
        throw new Error(`Failed to save image: ${saveResult.error}`);
      }
      
      // コスト記録
      await this.costTracker.recordOperation({
        prompt: prompt,
        enhancedPrompt: enhancedPrompt,
        model: apiConfig.model,
        quality: apiConfig.quality,
        size: apiConfig.size
      });
      
      const result: GenerationResult = {
        success: true,
        imagePath: saveResult.filePath!,
        cost: this.config.costPerImage,
        prompt: prompt,
        enhancedPrompt: enhancedPrompt,
        timestamp: new Date().toISOString()
      };

      await this.logger.logGeneration(prompt, enhancedPrompt, result);
      
      const duration = Date.now() - startTime;
      await this.logger.info('Image generation completed successfully', {
        duration: `${duration}ms`,
        imagePath: saveResult.filePath,
        cost: result.cost
      });

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.logError(error instanceof Error ? error : new Error(errorMessage), 'generateImage');
      
      return {
        success: false,
        error: errorMessage,
        cost: 0,
        prompt: prompt,
        enhancedPrompt: prompt,
        timestamp: new Date().toISOString()
      };
    }
  }

  async getCostSummary() {
    return await this.costTracker.getCostSummary();
  }

  async testConnection(): Promise<boolean> {
    try {
      return await this.apiClient.testConnection();
    } catch (error) {
      await this.logger.error('Connection test failed', error);
      return false;
    }
  }

  async analyzePrompt(prompt: string) {
    // プロンプト分析機能（将来の拡張用）
    return {
      originalPrompt: prompt,
      enhancedPrompt: this.promptEnhancer.enhancePrompt(prompt),
      estimatedCost: this.config.costPerImage,
      canGenerate: (await this.costTracker.checkBudgetLimits()).canProceed
    };
  }

  // 管理機能
  async getSystemStatus() {
    const costSummary = await this.costTracker.getCostSummary();
    const directoryInfo = await this.fileManager.getDirectoryStructure();
    
    return {
      cost: costSummary,
      storage: directoryInfo,
      connection: await this.testConnection(),
      timestamp: new Date().toISOString()
    };
  }

  async updateBudgetLimits(dailyLimit?: number, monthlyLimit?: number) {
    await this.costTracker.updateBudgetLimits(dailyLimit, monthlyLimit);
    await this.logger.info('Budget limits updated', { dailyLimit, monthlyLimit });
  }

  async exportCostData(outputPath: string) {
    await this.costTracker.exportData(outputPath);
    await this.logger.info('Cost data exported', { outputPath });
  }

  async cleanupOldFiles(olderThanDays: number = 30) {
    const removedEntries = await this.costTracker.clearOldEntries(olderThanDays);
    await this.logger.info('Old cost entries cleaned up', { removedEntries, olderThanDays });
    return removedEntries;
  }
}