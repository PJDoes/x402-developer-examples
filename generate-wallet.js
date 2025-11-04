/**
 * Generate a wallet for x402 payments
 * 
 * Run this once to create a wallet:
 * node generate-wallet.js
 * 
 * This will generate a new wallet and show you:
 * 1. The private key (add to .env as PRIVATE_KEY)
 * 2. The wallet address (fund this with USDC on Base)
 */

import { privateKeyToAccount } from 'viem/accounts';
import { generatePrivateKey } from 'viem/accounts';

console.log('\n🔑 Generating Wallet for x402 Payments\n');
console.log('='.repeat(60));

// Generate a new random private key
const privateKey = generatePrivateKey();
const account = privateKeyToAccount(privateKey);

console.log('\n✅ Wallet Generated!\n');
console.log('Private Key (KEEP SECRET):');
console.log(privateKey);
console.log('\nWallet Address (fund this with USDC):');
console.log(account.address);

console.log('\n' + '='.repeat(60));
console.log('\n📝 Next Steps:\n');
console.log('1. Copy .env.example to .env and add your private key:');
console.log(`   PRIVATE_KEY=${privateKey}`);
console.log('\n2. Fund this wallet with USDC on Base:');
console.log(`   Address: ${account.address}`);
console.log('   Network: Base (mainnet)');
console.log('   Token: USDC');
console.log('   Amount: At least $1 USDC for testing\n');
console.log('3. Get Base USDC from:');
console.log('   - Bridge from Ethereum: https://bridge.base.org');
console.log('   - Buy on Coinbase: https://www.coinbase.com/');
console.log('   - Swap on Base: Use Uniswap or other DEX\n');
console.log('⚠️  SECURITY WARNING:');
console.log('   - NEVER commit .env files to git');
console.log('   - NEVER share your private key');
console.log('   - Use a separate wallet for production');
console.log('   - Keep test amounts small (< $10)\n');
console.log('='.repeat(60) + '\n');

