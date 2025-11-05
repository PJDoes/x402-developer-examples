/**
 * x402 Interactive Setup Wizard
 * 
 * This wizard guides you through:
 * 1. Creating/importing a wallet
 * 2. Configuring your environment (Replit or Local)
 * 3. Funding your wallet with USDC on Base
 * 4. Testing LLM endpoints
 * 5. Testing ticker-based image/video generation
 * 
 * Run: npm run setup
 * Or: node setup-wizard.js
 */

import readline from 'readline';
import { privateKeyToAccount } from 'viem/accounts';
import { generatePrivateKey } from 'viem/accounts';
import { createWalletClient, createPublicClient, http, formatUnits } from 'viem';
import { base } from 'viem/chains';
import { wrapFetchWithPayment } from 'x402-fetch';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'https://beatsx402.ai';
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const USDC_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

// State
let totalSpent = 0;
let walletClient;
let account;
let fetchWithPayment;
let isReplit = false;

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Helper function to display section headers
function displayHeader(title) {
  console.log('\n' + '='.repeat(70));
  console.log(`  ${title}`);
  console.log('='.repeat(70) + '\n');
}

// Helper function to display info box
function displayInfo(lines) {
  console.log('\n┌' + '─'.repeat(68) + '┐');
  lines.forEach(line => {
    console.log('│ ' + line.padEnd(67) + '│');
  });
  console.log('└' + '─'.repeat(68) + '┘\n');
}

// Check USDC balance
async function checkUSDCBalance(walletAddress) {
  try {
    const publicClient = createPublicClient({
      chain: base,
      transport: http()
    });

    const balance = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: 'balanceOf',
      args: [walletAddress]
    });

    // USDC has 6 decimals
    const balanceInUSDC = formatUnits(balance, 6);
    return parseFloat(balanceInUSDC);
  } catch (error) {
    console.error('Error checking balance:', error.message);
    return 0;
  }
}

// Welcome screen
async function showWelcome() {
  console.clear();
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                    ║');
  console.log('║              🚀 x402 Interactive Setup Wizard 🚀                   ║');
  console.log('║                                                                    ║');
  console.log('║            Welcome to Beats x402 AI API Examples!                 ║');
  console.log('║                                                                    ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');
  
  displayInfo([
    'This wizard will guide you through:',
    '',
    '  ✓ Creating or importing a wallet',
    '  ✓ Configuring your environment',
    '  ✓ Funding your wallet with USDC on Base',
    '  ✓ Testing AI endpoints (LLM, Image, Video)',
    '',
    'Estimated time: 10-15 minutes'
  ]);

  const ready = await question('Press Enter to begin...');
}

// Step 1: Environment detection
async function detectEnvironment() {
  displayHeader('STEP 1: Environment Setup');
  
  // Auto-detect Replit
  if (process.env.REPL_ID !== undefined) {
    isReplit = true;
    console.log('✓ Detected: Running on Replit\n');
  } else {
    console.log('Which environment are you using?\n');
    console.log('  1) Local development (saves to .env file)');
    console.log('  2) Replit (uses Replit Secrets)\n');
    
    const choice = await question('Enter your choice (1 or 2): ');
    isReplit = choice.trim() === '2';
  }

  if (isReplit) {
    console.log('\n📌 You\'re using Replit - we\'ll guide you to save secrets properly.\n');
  } else {
    console.log('\n📌 You\'re using local development - we\'ll create a .env file.\n');
  }

  await question('Press Enter to continue...');
}

// Check if wallet already exists
async function checkExistingWallet() {
  // Check for existing private key in environment
  const existingKey = process.env.PRIVATE_KEY;
  
  if (existingKey && existingKey.startsWith('0x') && existingKey.length === 66) {
    return existingKey;
  }
  
  // Check for .env file in local environment
  if (!isReplit) {
    const envPath = join(__dirname, '.env');
    if (existsSync(envPath)) {
      const envContent = readFileSync(envPath, 'utf8');
      const match = envContent.match(/PRIVATE_KEY=(.+)/);
      if (match && match[1]) {
        const key = match[1].trim();
        if (key.startsWith('0x') && key.length === 66) {
          return key;
        }
      }
    }
  }
  
  return null;
}

// Import private key from user input
async function importPrivateKey() {
  console.log('\n📝 You can export a private key from MetaMask or Base Wallet.\n');
  console.log('In MetaMask: Account Details → Export Private Key\n');
  
  const privateKey = await question('Enter your private key (starts with 0x): ');
  const trimmedKey = privateKey.trim();
  
  // Validate format
  if (!trimmedKey.startsWith('0x') || trimmedKey.length !== 66) {
    console.log('\n❌ Invalid private key format. It should start with 0x and be 66 characters long.\n');
    return await setupWallet(); // Retry
  }
  
  // Create account
  account = privateKeyToAccount(trimmedKey);
  
  displayInfo([
    '⚠️  SECURITY WARNING - KEEP THIS INFORMATION SAFE!',
    '',
    'Private Key (KEEP SECRET):',
    trimmedKey,
    '',
    'Wallet Address (for receiving USDC):',
    account.address,
    '',
    '⚠️  NEVER share your private key with anyone!',
    '⚠️  Use a separate wallet for testing (not your main wallet)',
    '⚠️  Keep small balances for testing (< $10)'
  ]);
  
  await question('\nPress Enter after you\'ve confirmed this information...');
  
  // Save the private key
  await savePrivateKey(trimmedKey);
  
  // Initialize wallet client
  walletClient = createWalletClient({
    account,
    chain: base,
    transport: http()
  });
  
  fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);
}

// Step 2: Wallet creation/import
async function setupWallet() {
  displayHeader('STEP 2: Wallet Setup');
  
  // Check if wallet already exists
  const existingKey = await checkExistingWallet();
  
  if (existingKey) {
    const tempAccount = privateKeyToAccount(existingKey);
    
    displayInfo([
      '✓ Found existing wallet configuration!',
      '',
      'Wallet Address:',
      tempAccount.address,
      '',
      'This wallet is already configured in your environment.'
    ]);
    
    console.log('Do you want to:\n');
    console.log('  1) Use existing wallet');
    console.log('  2) Generate a new wallet');
    console.log('  3) Import a different private key\n');
    
    const choice = await question('Enter your choice (1, 2, or 3): ');
    
    if (choice.trim() === '1') {
      console.log('\n✅ Using existing wallet configuration.\n');
      account = tempAccount;
      
      // Initialize wallet client
      walletClient = createWalletClient({
        account,
        chain: base,
        transport: http()
      });
      
      fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);
      
      await question('Press Enter to continue...');
      return;
    } else if (choice.trim() === '3') {
      // Import different key
      return await importPrivateKey();
    }
    // If choice is 2, continue to generate new wallet below
  }
  
  console.log('Do you want to:\n');
  console.log('  1) Generate a new wallet');
  console.log('  2) Import an existing private key (from MetaMask, Base Wallet, etc.)\n');
  
  const choice = await question('Enter your choice (1 or 2): ');
  
  let privateKey;
  
  if (choice.trim() === '2') {
    return await importPrivateKey();
  } else {
    console.log('\n🔑 Generating a new wallet...\n');
    privateKey = generatePrivateKey();
    console.log('✅ New wallet generated!\n');
  }
  
  // Create account
  account = privateKeyToAccount(privateKey);
  
  displayInfo([
    '⚠️  SECURITY WARNING - KEEP THIS INFORMATION SAFE!',
    '',
    'Private Key (KEEP SECRET):',
    privateKey,
    '',
    'Wallet Address (for receiving USDC):',
    account.address,
    '',
    '⚠️  NEVER share your private key with anyone!',
    '⚠️  Use a separate wallet for testing (not your main wallet)',
    '⚠️  Keep small balances for testing (< $10)'
  ]);
  
  await question('\nPress Enter after you\'ve saved this information...');
  
  // Save the private key
  await savePrivateKey(privateKey);
  
  // Initialize wallet client
  walletClient = createWalletClient({
    account,
    chain: base,
    transport: http()
  });
  
  fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);
}

// Save private key to appropriate location
async function savePrivateKey(privateKey) {
  displayHeader('STEP 3: Save Private Key');
  
  if (isReplit) {
    displayInfo([
      '📌 To save your private key in Replit:',
      '',
      '  1. Look for "Secrets" in the left sidebar (lock icon 🔒)',
      '  2. Click "Secrets" or use Tools → Secrets',
      '  3. Add a new secret:',
      '     Key: PRIVATE_KEY',
      '     Value: ' + privateKey,
      '  4. Click "Add Secret"',
      '',
      '  Optional: Also add API_BASE_URL',
      '     Key: API_BASE_URL',
      '     Value: https://beatsx402.ai'
    ]);
    
    await question('\nPress Enter after you\'ve added the secret...');
    
    // Verify the secret was added
    if (!process.env.PRIVATE_KEY) {
      console.log('\n⚠️  Warning: PRIVATE_KEY not detected in environment.');
      console.log('Make sure you added it correctly in Replit Secrets.\n');
      const retry = await question('Continue anyway? (y/n): ');
      if (retry.toLowerCase() !== 'y') {
        return await savePrivateKey(privateKey);
      }
    } else {
      console.log('\n✅ Private key detected in Replit Secrets!\n');
    }
  } else {
    // Local environment - create/update .env file
    const envPath = join(__dirname, '.env');
    const envExamplePath = join(__dirname, '.env.example');
    
    let envContent = '';
    
    // Check if .env.example exists and use it as template
    if (existsSync(envExamplePath)) {
      envContent = readFileSync(envExamplePath, 'utf8');
    }
    
    // Replace or add PRIVATE_KEY
    if (envContent.includes('PRIVATE_KEY=')) {
      envContent = envContent.replace(/PRIVATE_KEY=.*/, `PRIVATE_KEY=${privateKey}`);
    } else {
      envContent += `\nPRIVATE_KEY=${privateKey}\n`;
    }
    
    // Ensure API_BASE_URL is set
    if (!envContent.includes('API_BASE_URL=')) {
      envContent += `API_BASE_URL=${API_BASE_URL}\n`;
    }
    
    writeFileSync(envPath, envContent);
    
    console.log('✅ Private key saved to .env file\n');
    displayInfo([
      '📄 Your .env file has been created with:',
      '',
      '  PRIVATE_KEY=' + privateKey.substring(0, 10) + '...',
      '  API_BASE_URL=' + API_BASE_URL,
      '',
      '⚠️  The .env file is in .gitignore - it won\'t be committed to git'
    ]);
  }
  
  await question('\nPress Enter to continue...');
}

// Step 3: Fund wallet
async function fundWallet() {
  displayHeader('STEP 4: Fund Your Wallet');
  
  displayInfo([
    'To use the x402 API, you need USDC on Base Chain.',
    '',
    'Your wallet address:',
    account.address,
    '',
    'How to fund:',
    '  • Send USDC to the address above',
    '  • Network: Base (NOT Ethereum mainnet!)',
    '  • Token: USDC',
    '',
    'Recommended amount for testing: $5-10 USDC',
    '',
    'Minimum amounts needed:',
    '  • Test one LLM: $0.01',
    '  • Test all 6 LLMs: $0.15',
    '  • Ticker-to-Image: $0.07',
    '  • Ticker-to-Video: $4.00'
  ]);
  
  console.log('Fund your wallet, then return here.\n');
  
  // Loop until wallet is funded
  let balance = 0;
  while (balance < 0.01) {
    await question('Press Enter when you\'ve funded your wallet...');
    
    console.log('\n🔍 Checking USDC balance on Base...\n');
    balance = await checkUSDCBalance(account.address);
    
    console.log(`💰 Current balance: $${balance.toFixed(2)} USDC\n`);
    
    if (balance < 0.01) {
      console.log('❌ Insufficient balance. You need at least $0.01 USDC to continue.\n');
      console.log('Please fund your wallet with USDC on Base Chain.\n');
    } else {
      console.log('✅ Wallet funded successfully!\n');
    }
  }
  
  await question('Press Enter to continue to testing...');
  return balance;
}

// Test LLM endpoints
async function testLLMs() {
  displayHeader('STEP 5: Test LLM Endpoints');
  
  console.log('Would you like to test the LLM endpoints?\n');
  console.log('  1) Yes - Test one model (GPT-4o Mini - $0.01)');
  console.log('  2) Yes - Test all 6 models (~$0.15 total)');
  console.log('  3) No - Skip LLM testing\n');
  
  const choice = await question('Enter your choice (1, 2, or 3): ');
  
  if (choice.trim() === '3') {
    console.log('\n⏭️  Skipping LLM tests...\n');
    return;
  }
  
  const testAll = choice.trim() === '2';
  
  const llmModels = [
    { endpoint: 'gpt-4o-mini', name: 'GPT-4o Mini', cost: 0.01 },
    { endpoint: 'gpt-5-mini', name: 'GPT-5 Mini', cost: 0.02 },
    { endpoint: 'claude-4.5', name: 'Claude 4.5', cost: 0.05 },
    { endpoint: 'grok-4', name: 'Grok 4', cost: 0.05 },
    { endpoint: 'grok-fast', name: 'Grok Fast', cost: 0.01 },
    { endpoint: 'gemini-2.5', name: 'Gemini 2.5', cost: 0.01 }
  ];
  
  const modelsToTest = testAll ? llmModels : [llmModels[0]];
  
  console.log(`\n🤖 Testing ${modelsToTest.length} LLM model(s)...\n`);
  
  for (const model of modelsToTest) {
    console.log(`\n📤 Testing ${model.name} ($${model.cost.toFixed(2)})...`);
    
    try {
      const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/${model.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: 'Say "Hello from x402!" in a creative way.' }
          ],
          temperature: 0.8
        })
      });
      
      const data = await response.json();
      
      console.log(`✅ ${model.name} responded successfully!`);
      console.log(`\n   Response: "${data.response?.substring(0, 100)}${data.response?.length > 100 ? '...' : ''}"`);
      
      totalSpent += model.cost;
    } catch (error) {
      console.log(`❌ ${model.name} failed: ${error.message}`);
    }
  }
  
  console.log(`\n✅ LLM testing complete! Spent: $${totalSpent.toFixed(2)}\n`);
  await question('Press Enter to continue...');
}

// Test ticker-based generation
async function testTickerGeneration() {
  displayHeader('STEP 6: Test Ticker-Based Generation');
  
  console.log('Would you like to test ticker-based generation using $TOSHI?\n');
  console.log('  1) No, skip');
  console.log('  2) Image only (Nano Banana - $0.07)');
  console.log('  3) Video only (Veo 3.1 - $4.00)');
  console.log('  4) Both image and video (~$4.07)\n');
  
  const choice = await question('Enter your choice (1, 2, 3, or 4): ');
  
  if (choice.trim() === '1') {
    console.log('\n⏭️  Skipping ticker generation tests...\n');
    return;
  }
  
  const testImage = choice.trim() === '2' || choice.trim() === '4';
  const testVideo = choice.trim() === '3' || choice.trim() === '4';
  
  // Test image generation
  if (testImage) {
    console.log('\n🎨 Testing Ticker-to-Image with $TOSHI (Nano Banana - $0.07)...\n');
    
    try {
      const response = await fetchWithPayment(`${API_BASE_URL}/v1/nanobanana/ticker-to-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: 'TOSHI',
          prompt: 'Epic cyberpunk themed image featuring the TOSHI mascot',
          aspect_ratio: '1:1',
          num_images: 1
        })
      });
      
      const data = await response.json();
      
      console.log('✅ Image generated successfully!\n');
      
      if (data.images && data.images.length > 0) {
        console.log('🖼️  Image URL:');
        console.log(data.images[0].url);
      }
      
      totalSpent += 0.07;
    } catch (error) {
      console.log(`❌ Image generation failed: ${error.message}`);
    }
  }
  
  // Test video generation
  if (testVideo) {
    console.log('\n🎬 Testing Ticker-to-Video with $TOSHI (Veo 3.1 - $4.00)...\n');
    console.log('⚠️  This may take 30-60 seconds...\n');
    
    try {
      const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3.1/ticker-to-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: 'TOSHI',
          prompt: 'Dynamic animation of TOSHI mascot in a vibrant, energetic scene',
          duration: '8s',
          generate_audio: true
        })
      });
      
      const data = await response.json();
      
      console.log('✅ Video generated successfully!\n');
      
      if (data.video_url) {
        console.log('🎥 Video URL:');
        console.log(data.video_url);
      }
      
      totalSpent += 4.00;
    } catch (error) {
      console.log(`❌ Video generation failed: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Ticker generation testing complete!\n`);
  await question('Press Enter to continue...');
}

// Summary and next steps
async function showSummary() {
  displayHeader('🎉 Setup Complete!');
  
  const finalBalance = await checkUSDCBalance(account.address);
  
  displayInfo([
    'Summary:',
    '',
    `  💰 Total spent during testing: $${totalSpent.toFixed(2)}`,
    `  💵 Remaining balance: $${finalBalance.toFixed(2)} USDC`,
    `  📧 Wallet address: ${account.address}`,
    '',
    'What\'s next?',
    '',
    '  📁 Explore the example scripts:',
    '     • javascript/llm-example.js - Chat with AI',
    '     • javascript/image-example.js - Generate images',
    '     • javascript/video-videogenapi.js - Generate videos',
    '     • python/ - Python versions of all examples',
    '',
    '  📚 Read the documentation:',
    '     • README.md - Overview and quick start',
    '     • docs/ENDPOINTS.md - All available endpoints',
    '     • docs/WALLET-SETUP.md - Wallet management',
    '     • docs/TROUBLESHOOTING.md - Common issues',
    '',
    '  🎮 Try the live playground:',
    '     • https://beatsx402.ai - Interactive testing',
    '',
    '  💬 Join the community:',
    '     • Discord: discord.gg/7buaWDUTu7',
    '     • Telegram: t.me/beatsonbase',
    '',
    'Happy coding! 🚀'
  ]);
  
  await question('\nPress Enter to exit...');
}

// Main flow
async function main() {
  try {
    await showWelcome();
    await detectEnvironment();
    await setupWallet();
    await fundWallet();
    await testLLMs();
    await testTickerGeneration();
    await showSummary();
    
    console.log('\n✅ Wizard completed successfully!\n');
  } catch (error) {
    console.error('\n❌ An error occurred:', error.message);
    console.log('\nFor help, see docs/TROUBLESHOOTING.md or visit discord.gg/7buaWDUTu7\n');
  } finally {
    rl.close();
  }
}

main();

