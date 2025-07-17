import axios, { AxiosResponse } from 'axios';
import { OpenAIGenerationConfig } from '../types';

export interface OpenAIImageRequest {
  model: string;
  prompt: string;
  n: number;
  size: string;
  quality: 'low' | 'medium' | 'high';
}

export interface OpenAIImageResponse {
  created: number;
  data: Array<{
    url?: string;
    b64_json?: string;
    revised_prompt?: string;
  }>;
}

export class OpenAIApiClient {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async generateImage(config: OpenAIGenerationConfig): Promise<Buffer> {
    const requestData: OpenAIImageRequest = {
      model: config.model,
      prompt: config.prompt,
      n: config.count,
      size: config.size,
      quality: config.quality
    };

    try {
      const response: AxiosResponse<OpenAIImageResponse> = await axios.post(
        this.apiUrl,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          timeout: 60000
        }
      );


      if (response.data.data && response.data.data.length > 0) {
        const imageData = response.data.data[0];
        
        // base64形式の画像データが返された場合
        if (imageData.b64_json) {
          return Buffer.from(imageData.b64_json, 'base64');
        }
        
        // URL形式の場合（従来のDALL-E 3など）
        if (imageData.url) {
          try {
            const imageResponse = await axios.get(imageData.url, {
              responseType: 'arraybuffer',
              timeout: 30000
            });
            
            return Buffer.from(imageResponse.data);
          } catch (downloadError) {
            throw new Error(`Failed to download image: ${downloadError instanceof Error ? downloadError.message : 'Unknown error'}`);
          }
        }
        
        throw new Error('No valid image data received from API');
      } else {
        throw new Error('No image generated');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error?.message || error.message;
        throw new Error(`OpenAI API Error: ${errorMessage}`);
      }
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const testConfig: OpenAIGenerationConfig = {
        prompt: 'test image generation',
        model: 'gpt-image-1',
        quality: 'low',
        size: '1024x1024',
        count: 1
      };
      
      await this.generateImage(testConfig);
      return true;
    } catch (error) {
      console.error('OpenAI API connection test failed:', error);
      return false;
    }
  }
}