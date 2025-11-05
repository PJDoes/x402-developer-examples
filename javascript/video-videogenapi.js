/**
 * x402 API Example: Video Generation with VideoGenAPI (MultiModelAPI)
 * 
 * This example shows how to:
 * 1. Generate AI video with USDC payment ($0.15)
 * 2. Poll status endpoint (FREE - no payment)
 * 3. Get the final video URL
 * 
 * VideoGenAPI includes 9 models:
 * - sora-2, kling_25, higgsfield_v1, nanobanana-video,
 *   pixverse, ltxv-2, ltxv-13b, seedance, wan-25
 * 
 * Prerequisites:
 * 1. npm install
 * 2. node generate-wallet.js (get wallet address)
 * 3. Fund wallet with USDC on Base
 * 4. Create .env file with PRIVATE_KEY
 * 
 * Run: node javascript/video-videogenapi.js
 */

import { withPaymentInterceptor } from 'x402-axios';
import axios from 'axios';
import { privateKeyToAccount } from 'viem/accounts';
import { waitForVideo } from './utils/polling.js';
import 'dotenv/config';

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'https://beatsx402.ai';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  console.error('❌ Error: PRIVATE_KEY not found in .env file');
  console.log('\n📝 Setup:');
  console.log('1. Run: node generate-wallet.js');
  console.log('2. Copy .env.example to .env');
  console.log('3. Add your PRIVATE_KEY to .env\n');
  process.exit(1);
}

async function main() {
  try {
    console.log('🎬 x402 VideoGenAPI Example (MultiModelAPI)\n');
    console.log('='.repeat(60));
    
    // 1. Set up wallet with x402
    const account = privateKeyToAccount(PRIVATE_KEY);
    const client = withPaymentInterceptor(
      axios.create({ baseURL: API_BASE_URL }),
      account
    );
    
    console.log(`\n💰 Wallet: ${account.address}`);
    console.log('💸 Cost: $0.15 USDC (generation only)');
    console.log('🆓 Status checks: FREE');
    console.log('🔗 Network: Base');
    console.log('🤖 Model: sora-2 (10 second video)');
    
    // 2. Generate video - PAID REQUEST ($0.15)
    console.log('\n📤 Generating video...\n');
    
    const response = await client.post('/v1/generate', {
      model: 'sora-2',
      prompt: 'Neon-lit cyberpunk city with flying vehicles zooming through holographic billboards',
      duration: 10,
      resolution: '720p'
    });
    
    const result = response.data;
    
    if (!result.generation_id) {
      throw new Error('No generation_id in response: ' + JSON.stringify(result));
    }
    
    console.log('✅ Generation started!');
    console.log(`📝 Generation ID: ${result.generation_id}\n`);
    
    // 3. Wait for completion - FREE STATUS CHECKS
    console.log('💡 Polling status (FREE - no payment required)...\n');
    
    const video = await waitForVideo(result.generation_id, API_BASE_URL, {
      interval: 5000,      // Check every 5 seconds
      maxAttempts: 60      // 5 minutes max
    });
    
    // 4. Display final video
    console.log('\n🎉 Video generation complete!\n');
    console.log('='.repeat(60));
    console.log('🎬 Video URL:');
    console.log(video.video_url);
    console.log('\n📋 Details:');
    console.log(`   Model: ${video.model?.name || video.model?.key || 'N/A'}`);
    console.log(`   Duration: ${video.duration}s`);
    console.log(`   Resolution: ${video.resolution}`);
    console.log(`   Processing time: ${video.processing_time || 'N/A'}s`);
    console.log('='.repeat(60));
    
    console.log('\n💡 How x402 worked:');
    console.log('1. ✅ Paid $0.15 USDC for video generation');
    console.log('2. ✅ Got generation_id immediately');
    console.log('3. ✅ Polled /v1/status/:id (FREE) every 5 seconds');
    console.log('4. ✅ Video completed - got public URL\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('402')) {
      console.log('\n💡 Payment issue - check wallet balance:');
      console.log('   - Ensure wallet has USDC on Base network');
      console.log('   - Minimum: $0.15 USDC for this request\n');
    }
  }
}

main();

