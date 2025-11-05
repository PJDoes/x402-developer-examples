/**
 * x402 API Example: LLM Chat with GPT-4o Mini
 * 
 * This example shows how to use x402 payment protocol to call
 * LLM APIs with automatic USDC payments on Base network.
 * 
 * Prerequisites:
 * 1. npm install
 * 2. node generate-wallet.js (get wallet address)
 * 3. Fund wallet with USDC on Base
 * 4. Create .env file with PRIVATE_KEY
 * 
 * Run: node javascript/llm-example.js
 */

import { withPaymentInterceptor } from 'x402-axios';
import axios from 'axios';
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
    console.log('🤖 x402 LLM Chat Example\n');
    console.log('='.repeat(60));
    
    // 1. Set up wallet with x402
    const account = privateKeyToAccount(PRIVATE_KEY);
    const client = withPaymentInterceptor(
      axios.create({ baseURL: API_BASE_URL }),
      account
    );
    
    console.log(`\n💰 Wallet: ${account.address}`);
    console.log('💸 Cost: $0.01 USDC');
    console.log('🔗 Network: Base');
    
    // 2. Make request - x402 handles payment automatically
    console.log('\n📤 Sending request...\n');
    
    const response = await client.post('/v1/llm/gpt-4o-mini', {
      messages: [
        { role: 'user', content: 'Explain the x402 payment protocol in one sentence.' }
      ],
      temperature: 0.8
    });
    
    const data = response.data;
    
    // 3. Display response
    console.log('✅ Response received!\n');
    console.log('='.repeat(60));
    console.log(data.response || data.message || JSON.stringify(data, null, 2));
    console.log('='.repeat(60));
    
    console.log('\n💡 How x402 worked:');
    console.log('1. ✅ Initial request sent → Server: 402 Payment Required');
    console.log('2. ✅ x402-axios signed $0.01 USDC payment on Base');
    console.log('3. ✅ Retried with X-PAYMENT header');
    console.log('4. ✅ Server verified payment & processed request');
    console.log('5. ✅ Payment settled in ~2 seconds\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('402')) {
      console.log('\n💡 Payment issue - check wallet balance:');
      console.log('   - Ensure wallet has USDC on Base network');
      console.log('   - Minimum: $0.01 USDC for this request\n');
    }
  }
}

main();

