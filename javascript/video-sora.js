/**
 * x402 API Example: Video Generation with OpenAI Sora-2
 * 
 * This example shows how to use OpenAI's Sora-2 model.
 * Price scales with duration ($0.15/second).
 * 
 * Prerequisites:
 * 1. npm install
 * 2. node generate-wallet.js (get wallet address)
 * 3. Fund wallet with USDC on Base
 * 4. Create .env file with PRIVATE_KEY
 * 
 * Run: node javascript/video-sora.js
 */

import { wrapFetchWithPayment } from 'x402-fetch';
import { privateKeyToAccount } from 'viem/accounts';
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
    console.log('🎬 x402 Sora-2 Example\n');
    console.log('='.repeat(60));
    
    // 1. Set up wallet with x402
    const account = privateKeyToAccount(PRIVATE_KEY);
    const fetchWithPayment = wrapFetchWithPayment(fetch, account);
    
    const duration = 8; // seconds
    const cost = duration * 0.15; // $0.15/second
    
    console.log(`\n💰 Wallet: ${account.address}`);
    console.log(`💸 Cost: $${cost.toFixed(2)} USDC (${duration}s @ $0.15/s)`);
    console.log('🔗 Network: Base');
    console.log('🤖 Model: OpenAI Sora-2');
    
    // 2. Generate video - PAID REQUEST
    console.log('\n📤 Generating video...\n');
    
    const response = await fetchWithPayment(`${API_BASE_URL}/v1/sora/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Cinematic shot of glowing jellyfish floating through neon-lit underwater caves',
        duration: duration,
        size: '1280x720'
      })
    });
    
    const data = await response.json();
    
    // 3. Display response
    console.log('✅ Video generated!\n');
    console.log('='.repeat(60));
    
    if (data.video_url) {
      console.log('🎬 Video URL:');
      console.log(data.video_url);
      
      if (data.duration) {
        console.log(`\n📋 Duration: ${data.duration}s`);
      }
      if (data.size) {
        console.log(`📺 Size: ${data.size}`);
      }
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
    
    console.log('='.repeat(60));
    
    console.log('\n💡 How x402 worked:');
    console.log('1. ✅ Initial request sent → Server: 402 Payment Required');
    console.log(`2. ✅ x402-fetch signed $${cost.toFixed(2)} USDC payment on Base`);
    console.log('3. ✅ Retried with X-PAYMENT header');
    console.log('4. ✅ Server verified payment & processed request');
    console.log('5. ✅ Payment settled in ~2 seconds\n');
    
    console.log('💡 Sora-2 Pricing:');
    console.log('   - $0.15 per second of video');
    console.log('   - 4s video = $0.60');
    console.log('   - 8s video = $1.20');
    console.log('   - 12s video = $1.80\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('402')) {
      console.log('\n💡 Payment issue - check wallet balance:');
      console.log('   - Ensure wallet has USDC on Base network');
      console.log('   - Check that wallet has enough for request\n');
    }
  }
}

main();

