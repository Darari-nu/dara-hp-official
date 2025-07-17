export interface OpenAIGenerationConfig {
  prompt: string;
  model: string;
  quality: 'low' | 'medium' | 'high';
  size: string;
  count: number;
}

export interface CostTracking {
  totalCost: number;
  dailyCost: number;
  monthlyCost: number;
  requestCount: number;
  lastResetDate: string;
}

export interface GenerationResult {
  success: boolean;
  imagePath?: string;
  error?: string;
  cost: number;
  prompt: string;
  enhancedPrompt: string;
  timestamp: string;
}