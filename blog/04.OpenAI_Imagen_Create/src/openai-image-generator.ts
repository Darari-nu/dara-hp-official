import { OpenAIImageGenerationSystem } from './integrations/openai-integration';
import { GenerationResult } from './types';

export class OpenAIImageGenerator {
  private system: OpenAIImageGenerationSystem;

  constructor() {
    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiKey || openaiKey === 'your_openai_api_key_here') {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    const config = {
      apiKey: openaiKey,
      apiUrl: process.env.OPENAI_API_URL || 'https://api.openai.com/v1/images/generations',
      imagesDirectory: process.env.IMAGES_DIR || '/Users/watanabehidetaka/Claudecode/250629_Auto_blog_Writing/03.data/XX.image',
      costTrackingFile: './cost-tracking.json',
      promptTemplateFile: './prompt_guide.md',
      costPerImage: parseFloat(process.env.COST_PER_IMAGE || '0.04'),
      dailyBudgetLimit: parseFloat(process.env.DAILY_BUDGET_LIMIT || '5.00'),
      monthlyBudgetLimit: parseFloat(process.env.MONTHLY_BUDGET_LIMIT || '50.00'),
      imageModel: process.env.IMAGE_MODEL || 'gpt-image-1',
      imageQuality: (process.env.IMAGE_QUALITY || 'medium') as 'low' | 'medium' | 'high',
      imageSize: process.env.IMAGE_SIZE || '1024x1024',
      imageCount: parseInt(process.env.IMAGE_COUNT || '1')
    };

    this.system = new OpenAIImageGenerationSystem(config);
  }

  async initialize(): Promise<void> {
    await this.system.initialize();
  }

  async generateImage(prompt: string): Promise<GenerationResult> {
    return await this.system.generateImage(prompt);
  }

  async getCostSummary() {
    return await this.system.getCostSummary();
  }

  async testConnection(): Promise<boolean> {
    return await this.system.testConnection();
  }

  async analyzePrompt(prompt: string) {
    return await this.system.analyzePrompt(prompt);
  }
}