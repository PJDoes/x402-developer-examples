# Wallet Setup Guide

Complete guide to setting up your wallet with USDC on Base network.

---

## 🎯 Overview

To use x402 API, you need:
1. ✅ A wallet (private key)
2. ✅ USDC tokens
3. ✅ On Base network (Layer 2)

**Estimated time**: 10-15 minutes  
**Minimum amount**: $1 USDC (for testing)

---

## 📝 Step 1: Generate Wallet

Run the wallet generator:

```bash
node generate-wallet.js
```

This outputs:
```
✅ Wallet Generated!

Private Key (KEEP SECRET):
0x1234567890abcdef...

Wallet Address (fund this with USDC):
0xAbCd1234EfGh5678...
```

**⚠️ Security:**
- **NEVER** share your private key
- **NEVER** commit private keys to git
- Use this wallet **only for testing**
- Keep small balances (<$10)

**Save this information:**
- Copy private key → Add to `.env` file
- Copy wallet address → Use for funding

---

## 💰 Step 2: Get USDC on Base

You have 3 options:

### Option A: Coinbase (Easiest)

1. **Buy USDC** on Coinbase
2. **Withdraw** to your wallet:
   - Select "Base" network (not Ethereum!)
   - Paste your wallet address
   - Amount: $5-10 for testing
   - Fee: Usually free or ~$0.01

**Time**: 1-2 minutes  
**Difficulty**: ⭐ Easy

### Option B: Bridge from Ethereum

If you have USDC on Ethereum:

1. Go to https://bridge.base.org
2. Connect your wallet (MetaMask, etc.)
3. Select: USDC → Base
4. Amount: $5-10
5. Confirm transaction

**Time**: 2-5 minutes  
**Cost**: ~$2-5 in Ethereum gas fees  
**Difficulty**: ⭐⭐ Medium

### Option C: Buy on Base DEX

If you have ETH on Base:

1. Go to Uniswap or other Base DEX
2. Connect wallet
3. Swap ETH → USDC
4. Amount: $5-10

**Time**: 1-2 minutes  
**Cost**: ~0.1% swap fee  
**Difficulty**: ⭐⭐ Medium

---

## 🔍 Step 3: Verify Balance

Check your wallet has USDC on Base:

1. Go to https://basescan.org
2. Paste your wallet address
3. Look for USDC balance

You should see:
- **Network**: Base
- **Token**: USD Coin (USDC)
- **Balance**: $5.00 (or whatever you sent)

---

## ⚙️ Step 4: Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:
```
PRIVATE_KEY=0x1234...  # From Step 1
API_BASE_URL=https://beatsx402.ai
```

**Verify**:
```bash
# Should print your private key (without showing it)
cat .env | grep PRIVATE_KEY
```

---

## ✅ Step 5: Test It

Run a cheap example to verify everything works:

```bash
# JavaScript
node javascript/llm-example.js

# Python  
python python/llm_example.py
```

Expected output:
```
💰 Wallet: 0xAbCd...
💸 Cost: $0.01 USDC
✅ Response received!
```

If this works, you're all set! 🎉

---

## 📊 Cost Planning

### Test Budget: $5-10

This gets you:
- 500 LLM requests ($0.01 each)
- OR 33 VideoGenAPI videos ($0.15 each)
- OR 16 OpenAI images ($0.30 each)
- OR 2-5 premium videos ($2-4 each)

### Production Budget

Estimate based on usage:
- **Heavy LLM use**: $50-100/month
- **Image generation**: $20-50/month
- **Video generation**: $100-500/month

---

## 🔐 Security Best Practices

### DO ✅

- **Use test wallet** for development
- **Use production wallet** for live apps (separate from test)
- **Keep small balances** in test wallets (<$10)
- **Use environment variables** for private keys
- **Add .env to .gitignore** (already done in this repo)
- **Monitor spending** on BaseScan

### DON'T ❌

- **Share private keys** with anyone
- **Commit .env files** to version control
- **Use main wallet** for testing
- **Store large amounts** in test wallets
- **Hardcode keys** in source code
- **Reuse production keys** in multiple places

---

## 🆘 Troubleshooting

### "Insufficient USDC balance"

**Problem**: Wallet doesn't have enough USDC

**Solutions**:
1. Check balance on BaseScan
2. Verify you're on Base network (not Ethereum)
3. Add more USDC (see Step 2)

### "Wrong network"

**Problem**: USDC is on Ethereum, not Base

**Solutions**:
1. Use bridge.base.org to move to Base
2. Or withdraw from Coinbase to Base directly

### "Transaction failed"

**Problem**: Not enough ETH for gas fees

**Solutions**:
1. Add small amount of ETH to wallet (~$0.50)
2. Base gas fees are very low (~$0.001)
3. Get Base ETH from same sources as USDC

### "Private key invalid"

**Problem**: PRIVATE_KEY format wrong in .env

**Solutions**:
1. Must start with `0x`
2. Must be 66 characters long (0x + 64 hex chars)
3. Re-run `generate-wallet.js` if needed

---

## 📚 Additional Resources

### Base Network
- **Website**: https://base.org
- **Bridge**: https://bridge.base.org
- **Explorer**: https://basescan.org
- **Docs**: https://docs.base.org

### USDC Information
- **Contract on Base**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Decimals**: 6 (1 USDC = 1000000 units)
- **Website**: https://www.circle.com/en/usdc

### Getting Help
- **Discord**: [discord.gg/7buaWDUTu7](https://discord.gg/7buaWDUTu7)
- **Telegram**: [t.me/beatsonbase](https://t.me/beatsonbase)
- **Email**: admin@beatsonbase.ai
- **GitHub Issues**: Report problems
- **Troubleshooting**: See TROUBLESHOOTING.md

---

## 🎓 Advanced: Using MetaMask

If you prefer using MetaMask instead of generated keys:

1. **Export private key** from MetaMask:
   - Click account icon
   - Account details
   - Export Private Key
   - Enter password
   - Copy key

2. **Add to .env**:
   ```
   PRIVATE_KEY=0x...  # From MetaMask
   ```

3. **Fund via MetaMask**:
   - Switch to Base network
   - Send/Receive USDC
   - Use your MetaMask address

**Note**: Using MetaMask key is fine for testing, but creates dependency on MetaMask. Generated keys are standalone.

---

## 💡 Pro Tips

1. **Start small**: Test with $1-2 first
2. **Monitor costs**: Check BaseScan after each request
3. **Use cheap endpoints first**: LLM ($0.01) before video ($0.15+)
4. **Keep logs**: Track what you spend on
5. **Separate wallets**: Test vs Production vs Personal

---

Ready to code? Head back to the [main README](../README.md) to run examples!

