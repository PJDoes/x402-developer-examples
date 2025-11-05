/**
 * x402 API Example: Video Generation with Google Veo 3 Fast
 * 
 * This example shows premium video generation with Veo 3.
 * Higher quality than VideoGenAPI, but costs more.
 * 
 * Prerequisites:
 * 1. npm install
 * 2. node generate-wallet.js (get wallet address)
 * 3. Fund wallet with USDC on Base
 * 4. Create .env file with PRIVATE_KEY
 * 
 * Run: node javascript/video-veo.js
 */

import { wrapFetchWithPayment } from 'x402-fetch';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
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
    console.log('🎬 x402 Veo 3 Fast Example\n');
    console.log('='.repeat(60));
    
    // 1. Set up wallet with x402
    const account = privateKeyToAccount(PRIVATE_KEY);
    const walletClient = createWalletClient({
      account,
      chain: base,
      transport: http()
    });
    const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);
    
    console.log(`\n💰 Wallet: ${account.address}`);
    console.log('💸 Cost: $2.00 USDC');
    console.log('🔗 Network: Base');
    console.log('🤖 Model: Google Veo 3 Fast');
    console.log('⭐ Quality: Premium');
    
    // 2. Generate video - PAID REQUEST ($2.00)
    console.log('\n📤 Generating video...\n');
    
    const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3/fast/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Epic ocean waves crashing with dramatic lightning storm approaching',
        aspect_ratio: '16:9',
        duration: '8s',
        resolution: '1080p',
        generate_audio: true
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
        console.log(`\n📋 Duration: ${data.duration}`);
      }
      if (data.resolution) {
        console.log(`📺 Resolution: ${data.resolution}`);
      }
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
    
    console.log('='.repeat(60));
    
    console.log('\n💡 How x402 worked:');
    console.log('1. ✅ Initial request sent → Server: 402 Payment Required');
    console.log('2. ✅ x402-fetch signed $2.00 USDC payment on Base');
    console.log('3. ✅ Retried with X-PAYMENT header');
    console.log('4. ✅ Server verified payment & processed request');
    console.log('5. ✅ Payment settled in ~2 seconds\n');
    
    console.log('💡 Note: Veo 3 Fast is premium quality');
    console.log('   - Better motion and coherence than VideoGenAPI');
    console.log('   - Supports audio generation');
    console.log('   - 4-8 second videos at 720p or 1080p\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('402')) {
      console.log('\n💡 Payment issue - check wallet balance:');
      console.log('   - Ensure wallet has USDC on Base network');
      console.log('   - Minimum: $2.00 USDC for this request\n');
    }
  }
}

main();

