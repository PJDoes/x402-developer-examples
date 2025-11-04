/**
 * x402 API Example: Image Generation with OpenAI GPT-Image-1
 * 
 * This example shows how to generate high-quality images using
 * OpenAI's GPT-Image-1 with automatic USDC payments.
 * 
 * Prerequisites:
 * 1. npm install
 * 2. node generate-wallet.js (get wallet address)
 * 3. Fund wallet with USDC on Base
 * 4. Create .env file with PRIVATE_KEY
 * 
 * Run: node javascript/image-example.js
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
    console.log('🎨 x402 Image Generation Example\n');
    console.log('='.repeat(60));
    
    // 1. Set up wallet with x402
    const account = privateKeyToAccount(PRIVATE_KEY);
    const fetchWithPayment = wrapFetchWithPayment(fetch, account);
    
    console.log(`\n💰 Wallet: ${account.address}`);
    console.log('💸 Cost: $0.30 USDC');
    console.log('🔗 Network: Base');
    console.log('🤖 Model: OpenAI GPT-Image-1');
    
    // 2. Make request - x402 handles payment automatically
    console.log('\n📤 Generating image...\n');
    
    const response = await fetchWithPayment(`${API_BASE_URL}/v1/openai/images/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Cyberpunk koala DJ at neon-lit rooftop party overlooking futuristic city',
        size: '1024x1024',
        quality: 'high',
        background: 'opaque'
      })
    });
    
    const data = await response.json();
    
    // 3. Display response
    console.log('✅ Image generated!\n');
    console.log('='.repeat(60));
    
    if (data.images && data.images.length > 0) {
      console.log('🖼️  Image URL:');
      console.log(data.images[0].url);
      
      if (data.images[0].revised_prompt) {
        console.log('\n📝 Revised Prompt:');
        console.log(data.images[0].revised_prompt);
      }
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
    
    console.log('='.repeat(60));
    
    console.log('\n💡 How x402 worked:');
    console.log('1. ✅ Initial request sent → Server: 402 Payment Required');
    console.log('2. ✅ x402-fetch signed $0.30 USDC payment on Base');
    console.log('3. ✅ Retried with X-PAYMENT header');
    console.log('4. ✅ Server verified payment & processed request');
    console.log('5. ✅ Payment settled in ~2 seconds\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('402')) {
      console.log('\n💡 Payment issue - check wallet balance:');
      console.log('   - Ensure wallet has USDC on Base network');
      console.log('   - Minimum: $0.30 USDC for this request\n');
    }
  }
}

main();

