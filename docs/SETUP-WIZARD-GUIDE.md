# Setup Wizard Guide

Complete walkthrough of the x402 Interactive Setup Wizard - the easiest way to get started with x402 API.

---

## 📋 Overview

The Setup Wizard is an interactive command-line tool that guides you through the entire x402 setup process:

- ✅ No manual file editing required
- ✅ Works on both local machines and Replit
- ✅ Tests your setup with live API calls
- ✅ Perfect for beginners with no crypto experience

**Time Required:** 10-15 minutes  
**Prerequisites:** Node.js 18+ installed  
**Cost:** $0.01 - $10 depending on testing choices

---

## 🚀 Getting Started

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/PJDoes/x402-developer-examples.git
cd x402-developer-examples

# 2. Install dependencies
npm install

# 3. Run the wizard
npm run setup
```

### Replit

1. **Fork/Import the repository** to Replit
2. Replit will automatically install dependencies
3. Run in the Shell:
   ```bash
   npm run setup
   ```

---

## 📖 Step-by-Step Walkthrough

### Step 1: Welcome Screen

The wizard starts with a welcome screen explaining what it will do:

```
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║              🚀 x402 Interactive Setup Wizard 🚀                   ║
║                                                                    ║
║            Welcome to Beats x402 AI API Examples!                 ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

**What to do:** Press Enter to begin

---

### Step 2: Environment Detection

The wizard asks about your environment:

```
Which environment are you using?

  1) Local development (saves to .env file)
  2) Replit (uses Replit Secrets)

Enter your choice (1 or 2):
```

**For Local Development:** Choose 1  
**For Replit:** Choose 2 (or it auto-detects)

**What happens:**
- **Local:** Creates a `.env` file in the project directory
- **Replit:** Guides you to use Replit Secrets (secure cloud storage)

---

### Step 3: Wallet Setup

#### If No Existing Wallet Found

You'll be asked how you want to set up your wallet:

```
Do you want to:

  1) Generate a new wallet
  2) Import an existing private key (from MetaMask, Base Wallet, etc.)

Enter your choice (1 or 2):
```

#### If Existing Wallet Detected

The wizard automatically checks if you already have a wallet configured (from a previous run). If found:

```
┌────────────────────────────────────────────────────────────────┐
│ ✓ Found existing wallet configuration!                         │
│                                                                 │
│ Wallet Address:                                                │
│ 0xAbCd1234EfGh5678...                                          │
│                                                                 │
│ This wallet is already configured in your environment.         │
└────────────────────────────────────────────────────────────────┘

Do you want to:

  1) Use existing wallet
  2) Generate a new wallet
  3) Import a different private key

Enter your choice (1, 2, or 3):
```

**Option 1: Use Existing Wallet** - Recommended! Continue with your current setup  
**Option 2: Generate New Wallet** - Creates a fresh wallet (you'll need to fund it)  
**Option 3: Import Different Wallet** - Use a different private key

**Tip:** Choose option 1 if you're running the wizard again to test more endpoints.

#### Option 1: Generate New Wallet

The wizard creates a brand new wallet for you:

```
🔑 Generating a new wallet...

✅ New wallet generated!

┌────────────────────────────────────────────────────────────────┐
│ ⚠️  SECURITY WARNING - KEEP THIS INFORMATION SAFE!             │
│                                                                 │
│ Private Key (KEEP SECRET):                                     │
│ 0x1234567890abcdef...                                          │
│                                                                 │
│ Wallet Address (for receiving USDC):                           │
│ 0xAbCd1234EfGh5678...                                          │
│                                                                 │
│ ⚠️  NEVER share your private key with anyone!                  │
│ ⚠️  Use a separate wallet for testing (not your main wallet)   │
│ ⚠️  Keep small balances for testing (< $10)                    │
└────────────────────────────────────────────────────────────────┘
```

**Important:**
- 📝 Copy and save both the private key and wallet address
- 🔒 Keep the private key secret
- 💰 Use this wallet only for testing

#### Option 2: Import Existing Wallet

If you choose to import:

1. The wizard explains how to export from MetaMask:
   - Click account icon → Account Details → Export Private Key
   - Enter your MetaMask password
   - Copy the private key

2. Paste your private key when prompted:
   ```
   Enter your private key (starts with 0x):
   ```

3. The wizard validates the format (must be 66 characters, starting with `0x`)

---

### Step 4: Saving Your Private Key

This step depends on your environment:

#### Local Development

The wizard automatically creates/updates your `.env` file:

```
✅ Private key saved to .env file

┌────────────────────────────────────────────────────────────────┐
│ 📄 Your .env file has been created with:                       │
│                                                                 │
│   PRIVATE_KEY=0x1234567890...                                  │
│   API_BASE_URL=https://beatsx402.ai                            │
│                                                                 │
│ ⚠️  The .env file is in .gitignore - it won't be committed     │
└────────────────────────────────────────────────────────────────┘
```

**What you need to do:** Nothing! It's automatic.

#### Replit Environment

The wizard shows you how to save to Replit Secrets:

```
┌────────────────────────────────────────────────────────────────┐
│ 📌 To save your private key in Replit:                         │
│                                                                 │
│   1. Look for "Secrets" in the left sidebar (lock icon 🔒)    │
│   2. Click "Secrets" or use Tools → Secrets                   │
│   3. Add a new secret:                                         │
│      Key: PRIVATE_KEY                                          │
│      Value: 0x1234567890abcdef...                             │
│   4. Click "Add Secret"                                        │
│                                                                 │
│   Optional: Also add API_BASE_URL                              │
│      Key: API_BASE_URL                                         │
│      Value: https://beatsx402.ai                               │
└────────────────────────────────────────────────────────────────┘
```

**What you need to do:**
1. Find the Secrets panel in Replit (lock icon 🔒 in sidebar)
2. Add a new secret with key `PRIVATE_KEY` and your private key as the value
3. Press Enter in the wizard to continue

**Tip:** The wizard will verify the secret was added correctly before proceeding.

---

### Step 5: Fund Your Wallet

Now you need to add USDC to your wallet:

```
┌────────────────────────────────────────────────────────────────┐
│ To use the x402 API, you need USDC on Base Chain.             │
│                                                                 │
│ Your wallet address:                                           │
│ 0xAbCd1234EfGh5678...                                          │
│                                                                 │
│ How to fund:                                                   │
│   • Send USDC to the address above                            │
│   • Network: Base (NOT Ethereum mainnet!)                     │
│   • Token: USDC                                                │
│                                                                 │
│ Recommended amount for testing: $5-10 USDC                     │
│                                                                 │
│ Minimum amounts needed:                                        │
│   • Test one LLM: $0.01                                       │
│   • Test all 6 LLMs: $0.15                                    │
│   • Ticker-to-Image: $0.07                                    │
│   • Ticker-to-Video: $4.00                                    │
└────────────────────────────────────────────────────────────────┘

Fund your wallet, then return here.

Press Enter when you've funded your wallet...
```

**How to Fund Your Wallet:**

1. **Copy your wallet address** from the wizard
2. **Get USDC on Base** - You can:
   - Use Coinbase: Buy USDC → Withdraw to Base network
   - Use a bridge: https://bridge.base.org (from Ethereum)
   - Use a DEX on Base to swap ETH → USDC

3. **Important:** Make sure you're using **Base network**, not Ethereum mainnet!

4. **Return to the wizard** and press Enter

**Balance Verification:**

After you press Enter, the wizard automatically checks your balance:

```
🔍 Checking USDC balance on Base...

💰 Current balance: $5.00 USDC

✅ Wallet funded successfully!
```

**If insufficient balance:**

```
💰 Current balance: $0.00 USDC

❌ Insufficient balance. You need at least $0.01 USDC to continue.

Please fund your wallet with USDC on Base Chain.

Press Enter when you've funded your wallet...
```

The wizard will keep checking until you have enough USDC.

---

### Step 6: Test LLM Endpoints

Now the fun part - testing the API!

```
Would you like to test the LLM endpoints?

  1) Yes - Test one model (GPT-4o Mini - $0.01)
  2) Yes - Test all 6 models (~$0.15 total)
  3) No - Skip LLM testing

Enter your choice (1, 2, or 3):
```

#### Option 1: Test One Model

Tests GPT-4o Mini ($0.01):

```
🤖 Testing 1 LLM model(s)...

📤 Testing GPT-4o Mini ($0.01)...
✅ GPT-4o Mini responded successfully!

   Response: "Hello from x402! 🚀 Welcome to the future of AI payments..."

✅ LLM testing complete! Spent: $0.01
```

#### Option 2: Test All Models

Tests all 6 LLM models (~$0.15 total):

- GPT-4o Mini ($0.01)
- GPT-5 Mini ($0.02)
- Claude 4.5 ($0.05)
- Grok 4 ($0.05)
- Grok Fast ($0.01)
- Gemini 2.5 ($0.01)

Each model is tested sequentially with live output showing success/failure.

#### Option 3: Skip

If you choose 3, the wizard skips LLM testing and moves to the next step.

---

### Step 7: Test Ticker-Based Generation

Generate images or videos from crypto tickers:

```
Would you like to test ticker-based generation using $TOSHI?

  1) No, skip
  2) Image only (Nano Banana - $0.07)
  3) Video only (Veo 3.1 - $4.00)
  4) Both image and video (~$4.07)

Enter your choice (1, 2, 3, or 4):
```

#### Option 2: Image Only ($0.07)

```
🎨 Testing Ticker-to-Image with $TOSHI (Nano Banana - $0.07)...

✅ Image generated successfully!

🖼️  Image URL:
https://cloudinary.com/...
```

Opens your default browser to view the generated image.

#### Option 3: Video Only ($4.00)

```
🎬 Testing Ticker-to-Video with $TOSHI (Veo 3.1 - $4.00)...

⚠️  This may take 30-60 seconds...

✅ Video generated successfully!

🎥 Video URL:
https://cloudinary.com/...
```

#### Option 4: Both ($4.07)

Generates both image and video with $TOSHI ticker.

#### Option 1: Skip

Skips ticker-based generation testing.

---

### Step 8: Summary & Next Steps

The wizard concludes with a summary:

```
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║                    🎉 Setup Complete!                              ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

┌────────────────────────────────────────────────────────────────┐
│ Summary:                                                        │
│                                                                 │
│   💰 Total spent during testing: $0.15                         │
│   💵 Remaining balance: $4.85 USDC                             │
│   📧 Wallet address: 0xAbCd1234EfGh5678...                     │
│                                                                 │
│ What's next?                                                   │
│                                                                 │
│   📁 Explore the example scripts:                              │
│      • javascript/llm-example.js - Chat with AI                │
│      • javascript/image-example.js - Generate images           │
│      • javascript/video-videogenapi.js - Generate videos       │
│      • python/ - Python versions of all examples               │
│                                                                 │
│   📚 Read the documentation:                                   │
│      • README.md - Overview and quick start                    │
│      • docs/ENDPOINTS.md - All available endpoints             │
│      • docs/WALLET-SETUP.md - Wallet management                │
│      • docs/TROUBLESHOOTING.md - Common issues                 │
│                                                                 │
│   🎮 Try the live playground:                                  │
│      • https://beatsx402.ai - Interactive testing              │
│                                                                 │
│   💬 Join the community:                                       │
│      • Discord: discord.gg/7buaWDUTu7                          │
│      • Telegram: t.me/beatsonbase                              │
│                                                                 │
│ Happy coding! 🚀                                               │
└────────────────────────────────────────────────────────────────┘
```

**Press Enter to exit the wizard.**

---

## 🎯 Replit-Specific Instructions

### Setting Up on Replit

1. **Import Repository:**
   - Go to https://replit.com
   - Click "Create Repl"
   - Choose "Import from GitHub"
   - Paste: `https://github.com/PJDoes/x402-developer-examples`

2. **Run Setup:**
   - Replit auto-installs dependencies
   - Open Shell (not Console)
   - Run: `npm run setup`

3. **Using Replit Secrets:**
   - Click the lock icon (🔒) in the left sidebar
   - Or go to Tools → Secrets
   - Add secrets as the wizard instructs
   - Secrets are environment variables that persist across runs

### Advantages of Replit

- ✅ No local setup required
- ✅ Works on any device with a browser
- ✅ Secrets are stored securely in the cloud
- ✅ Easy to share and collaborate

### Running Examples After Setup

Once the wizard completes:

```bash
# In Replit Shell
node javascript/llm-example.js
node javascript/image-example.js
node javascript/video-videogenapi.js
```

---

## 💡 Tips & Best Practices

### 1. Start Small
- Test with $1-2 first to ensure everything works
- Gradually add more funds as needed

### 2. Budget Planning
- **LLM testing:** $0.15 tests all 6 models
- **Image testing:** $0.07 per image
- **Video testing:** $2-4 per video
- **Recommended starting amount:** $5-10

### 3. Security
- ✅ Use a dedicated test wallet (not your main wallet)
- ✅ Keep small balances (<$10)
- ✅ Never commit `.env` files to git
- ✅ Don't share private keys in chat/Discord

### 4. Network Selection
- **Always use Base network** (Layer 2)
- **NOT Ethereum mainnet** (expensive gas fees)
- Verify network when funding wallet

### 5. Balance Checking
After the wizard completes, check your balance anytime:
```bash
# Visit BaseScan
https://basescan.org/address/YOUR_WALLET_ADDRESS
```

---

## ❓ Troubleshooting

### "Private key invalid format"

**Problem:** Private key doesn't start with `0x` or isn't 66 characters

**Solution:**
- Ensure format: `0x` + 64 hexadecimal characters
- When exporting from MetaMask, copy the entire key including `0x`

### "Insufficient balance" (keeps looping)

**Problem:** Wallet not funded or funded on wrong network

**Solutions:**
1. **Check network:** Must be Base, not Ethereum
2. **Check token:** Must be USDC
3. **Wait time:** Transfers may take 1-2 minutes
4. **Verify on BaseScan:** https://basescan.org/address/YOUR_ADDRESS

### "Replit Secret not detected"

**Problem:** Secret not saved properly in Replit

**Solutions:**
1. Make sure you clicked "Add Secret" (not just typed it)
2. Check spelling: Must be exactly `PRIVATE_KEY` (case-sensitive)
3. Try refreshing Replit page
4. Re-run the wizard

### "Payment verification failed"

**Problem:** Transaction failed or insufficient funds

**Solutions:**
1. Check balance is sufficient for the test
2. Ensure wallet has small amount of ETH for gas (~$0.10)
3. Try with a smaller test first (one LLM model)

### "Error checking balance"

**Problem:** Network connection issue or RPC error

**Solutions:**
1. Check internet connection
2. Wait 30 seconds and try again
3. Verify Base network is operational: https://status.base.org

---

## 🔄 Running the Wizard Again

You can run the wizard multiple times safely:

```bash
npm run setup
```

**What happens:**
- ✅ **Detects existing wallet** - No infinite wallet creation!
- ✅ **Option to reuse** - Continue with your funded wallet
- ✅ **Test more endpoints** - Try different LLM/image/video combinations
- ✅ **Switch wallets** - Import a different wallet if needed
- ✅ **Preserves settings** - Your `.env` or Replit Secrets remain intact

**Common use cases:**
1. **First run:** Set up everything and test basic endpoints
2. **Second run:** Use existing wallet to test ticker-to-video ($4)
3. **Later runs:** Test different LLM models or image generation options

**Tip:** The wizard is designed to be run multiple times without breaking your setup!

---

## 📚 Additional Resources

### Documentation
- [README.md](../README.md) - Main documentation
- [ENDPOINTS.md](./ENDPOINTS.md) - All available endpoints
- [WALLET-SETUP.md](./WALLET-SETUP.md) - Manual wallet setup
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues

### Community
- **Discord:** [discord.gg/7buaWDUTu7](https://discord.gg/7buaWDUTu7)
- **Telegram:** [t.me/beatsonbase](https://t.me/beatsonbase)
- **Email:** admin@beatsonbase.ai

### External Resources
- **Base Network:** https://base.org
- **USDC Info:** https://www.circle.com/en/usdc
- **x402 Protocol:** https://x402.gitbook.io/x402
- **Coinbase CDP:** https://www.coinbase.com/developer-platform/products/x402

---

## 🎓 Next Steps After Wizard

### 1. Explore Example Scripts

**JavaScript:**
```bash
node javascript/llm-example.js          # Chat with AI
node javascript/image-example.js        # Generate images
node javascript/video-videogenapi.js    # Generate videos
node javascript/video-veo.js            # Premium video (Veo)
node javascript/video-sora.js           # OpenAI Sora video
```

**Python:**
```bash
python python/llm_example.py           # Chat with AI
python python/image_example.py         # Generate images
python python/video_videogenapi.py     # Generate videos
```

### 2. Try the Live Playground

Visit https://beatsx402.ai to test all endpoints interactively with a visual interface.

### 3. Build Your Own App

Check out the example scripts to see how to integrate x402 into your own applications.

### 4. Join the Community

Get help, share projects, and stay updated:
- Discord: [discord.gg/7buaWDUTu7](https://discord.gg/7buaWDUTu7)
- Telegram: [t.me/beatsonbase](https://t.me/beatsonbase)

---

**Ready to build amazing things with x402? Happy coding! 🚀**

