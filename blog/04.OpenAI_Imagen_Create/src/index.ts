import dotenv from 'dotenv';
import path from 'path';
import { OpenAIImageGenerator } from './openai-image-generator';
import { Logger } from './utils/logger';

// プロジェクトルートの.envファイルを読み込み
dotenv.config({ path: '/Users/watanabehidetaka/Claudecode/250629_Auto_blog_Writing/.env' });

async function main() {
  const logger = new Logger();
  
  try {
    const generator = new OpenAIImageGenerator();
    await generator.initialize();
    
    await logger.info('OpenAI Image Generator started successfully');
    
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log('Usage: npm start "your prompt here"');
      console.log('Example: npm start "美しい夕焼けの風景"');
      return;
    }
    
    const prompt = args.join(' ');
    console.log(`Generating image for: "${prompt}"`);
    
    const result = await generator.generateImage(prompt);
    
    if (result.success) {
      console.log(`✅ Image generated successfully!`);
      console.log(`📁 Saved to: ${result.imagePath}`);
      console.log(`💰 Cost: $${result.cost.toFixed(4)}`);
      console.log(`🎨 Enhanced prompt: ${result.enhancedPrompt}`);
    } else {
      console.error(`❌ Failed to generate image: ${result.error}`);
    }
    
    const costSummary = await generator.getCostSummary();
    console.log('\n📊 Cost Summary:');
    console.log(`Daily: $${costSummary.daily.current.toFixed(2)} / $${costSummary.daily.limit.toFixed(2)}`);
    console.log(`Monthly: $${costSummary.monthly.current.toFixed(2)} / $${costSummary.monthly.limit.toFixed(2)}`);
    console.log(`Total requests: ${costSummary.total.requests}`);
    
  } catch (error) {
    await logger.error('Application error', error);
    console.error('❌ Application error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}