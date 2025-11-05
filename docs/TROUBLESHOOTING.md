# Troubleshooting Guide

Common issues and solutions when using x402 API.

---

## 🔍 Quick Diagnostics

Run this checklist first:

- [ ] Wallet has USDC on Base network (check BaseScan)
- [ ] PRIVATE_KEY in .env starts with `0x`
- [ ] API_BASE_URL is correct in .env
- [ ] Dependencies installed (`npm install` or `pip install -r requirements.txt`)
- [ ] Using Node.js 18+ or Python 3.8+

---

## 💰 Payment Issues

### "402 Payment Required" Error

**Symptoms**:
```
Error: 402 Payment Required
```

**What it means**: You're seeing the raw x402 payment request

**Solutions**:
1. ✅ **Expected behavior** - x402 clients handle this automatically
2. ❌ **If you see this error**, x402 client isn't installed:
   ```bash
   # JavaScript
   npm install x402-axios axios viem
   
   # Python
   pip install x402 eth-account
   ```
3. Verify you're using `withPaymentInterceptor` (JS) or `x402_requests` (Python)

### "Insufficient USDC balance"

**Symptoms**:
```
Payment verification failed: Insufficient USDC balance
```

**Solutions**:
1. **Check balance** on https://basescan.org
2. **Verify network** - Must be Base, not Ethereum
3. **Add USDC** - See [WALLET-SETUP.md](./WALLET-SETUP.md)
4. **Check amount needed**:
   - LLM: $0.01+
   - Image: $0.07-$0.50
   - Video: $0.15-$4.00

### "Payment signature invalid"

**Symptoms**:
```
Payment verification failed: Invalid signature
```

**Solutions**:
1. **Check PRIVATE_KEY** format in .env:
   - Must start with `0x`
   - Must be 66 characters (0x + 64 hex)
2. **Regenerate wallet** if key is corrupted:
   ```bash
   node generate-wallet.js
   ```
3. **Clear and retry** - Sometimes transient network issues

### "Nonce too low" or "Nonce too high"

**Symptoms**:
```
Error: Nonce too low
```

**Solutions**:
1. **Wait 30 seconds** - Previous transaction still pending
2. **Check BaseScan** - See if transactions are stuck
3. **Restart** - Clear any cached nonce values

---

## 🔐 Wallet Issues

### "Private key invalid"

**Symptoms**:
```
ValueError: Private key must be exactly 32 bytes
Error: Invalid private key
```

**Solutions**:
1. Check PRIVATE_KEY in .env:
   ```bash
   # Should show: PRIVATE_KEY=0x followed by 64 hex chars
   cat .env | grep PRIVATE_KEY
   ```
2. Must start with `0x`
3. Must be 66 characters total
4. No spaces or line breaks
5. Regenerate if needed:
   ```bash
   node generate-wallet.js
   ```

### "Cannot read env variable"

**Symptoms**:
```
Error: PRIVATE_KEY not found
```

**Solutions**:
1. **Check .env exists**:
   ```bash
   ls -la .env  # Should show file
   ```
2. **Copy from example** if missing:
   ```bash
   cp .env.example .env
   ```
3. **Edit .env** - Add your private key
4. **Verify dotenv loaded**:
   ```javascript
   // JavaScript
   import 'dotenv/config';
   console.log(process.env.PRIVATE_KEY ? 'Loaded' : 'Missing');
   ```

### "Wrong network"

**Symptoms**:
```
USDC balance: 0 (but you know you have USDC)
```

**Solutions**:
1. **Check network** on BaseScan:
   - Go to https://basescan.org
   - Paste wallet address
   - Should show "USD Coin" with balance
2. **If on Ethereum** instead:
   - Use https://bridge.base.org to move to Base
   - Or withdraw from Coinbase to Base directly
3. **Verify contract**:
   - Base USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

---

## 🎬 Video Generation Issues

### "Generation timeout"

**Symptoms**:
```
Polling timeout after 60 attempts
```

**Cause**: Video generation takes 30-120 seconds

**Solutions**:
1. **Increase max_attempts**:
   ```javascript
   // JavaScript
   await waitForVideo(id, API_BASE_URL, {
     maxAttempts: 120  // 10 minutes
   });
   
   # Python
   wait_for_video(id, API_BASE_URL, max_attempts=120)
   ```
2. **Check status manually**:
   ```bash
   curl https://beatsx402.ai/v1/status/gen_12345
   ```
3. **Status checks are FREE** - safe to poll longer

### "Generation failed"

**Symptoms**:
```
Status: failed
Error: Generation failed: <reason>
```

**Solutions**:
1. **Check error message** in status response
2. **Common causes**:
   - Invalid prompt (too long, inappropriate content)
   - Invalid image URL (for image-to-video)
   - Model temporarily unavailable
3. **Try different model**:
   ```javascript
   // Instead of kling_25, try sora-2
   { model: 'sora-2', ...params }
   ```
4. **Retry** - Sometimes transient issues

### "No video_url in response"

**Symptoms**:
```
Status: completed
But video_url is missing
```

**Solutions**:
1. **Check status again** - May need refresh
2. **Verify status endpoint**:
   ```bash
   curl https://beatsx402.ai/v1/status/YOUR_ID
   ```
3. **Check generation_id** is correct
4. **Contact support** if persists

---

## 🌐 Network Issues

### "Connection refused" / "ECONNREFUSED"

**Symptoms**:
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Solutions**:
1. **Check API_BASE_URL** in .env:
   - Should be `https://beatsx402.ai`
   - NOT `http://localhost:3000` (unless running locally)
2. **Verify server is running**:
   ```bash
   curl https://beatsx402.ai/health
   ```
3. **Check network** - Try different network/VPN

### "Request timeout"

**Symptoms**:
```
Error: Request timeout after 30000ms
```

**Solutions**:
1. **Check internet connection**
2. **Try different network** - Corporate networks may block
3. **Increase timeout** if on slow connection:
   ```javascript
   // Add timeout option
   fetchWithPayment(url, {
     ...options,
     signal: AbortSignal.timeout(60000)  // 60s
   });
   ```

### "SSL certificate error"

**Symptoms**:
```
Error: unable to verify the first certificate
```

**Solutions**:
1. **Update Node.js** to latest LTS version
2. **Check URL** - Should use `https://` not `http://`
3. **Temporarily disable** (NOT for production):
   ```bash
   NODE_TLS_REJECT_UNAUTHORIZED=0 node script.js
   ```

---

## 📦 Installation Issues

### "Module not found: x402-axios"

**Symptoms**:
```
Error: Cannot find module 'x402-axios'
```

**Solutions**:
1. **Install dependencies**:
   ```bash
   npm install
   # or
   npm install x402-axios axios viem dotenv
   ```
2. **Check package.json** exists
3. **Delete node_modules** and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### "Module not found: x402" (Python)

**Symptoms**:
```python
ModuleNotFoundError: No module named 'x402'
```

**Solutions**:
1. **Install requirements**:
   ```bash
   pip install -r requirements.txt
   # or
   pip install x402 eth-account python-dotenv requests
   ```
2. **Check Python version**:
   ```bash
   python --version  # Should be 3.8+
   ```
3. **Use virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

### "Node version too old"

**Symptoms**:
```
Error: The engine "node" is incompatible with this module
```

**Solutions**:
1. **Check version**:
   ```bash
   node --version  # Should be v18.0.0 or higher
   ```
2. **Update Node.js**:
   - Download from https://nodejs.org
   - Use nvm: `nvm install 18`
3. **Use correct version**:
   ```bash
   nvm use 18
   ```

---

## 🐛 Code Issues

### "TypeError: withPaymentInterceptor is not a function"

**Symptoms**:
```javascript
TypeError: withPaymentInterceptor is not a function
```

**Solutions**:
1. **Check import**:
   ```javascript
   // Correct
   import { withPaymentInterceptor } from 'x402-axios';
   
   // Wrong
   import withPaymentInterceptor from 'x402-axios';
   ```
2. **Reinstall x402-axios**:
   ```bash
   npm install x402-axios@latest
   ```

### "JSON parse error"

**Symptoms**:
```
SyntaxError: Unexpected token < in JSON
```

**Cause**: Server returned HTML instead of JSON

**Solutions**:
1. **Check API_BASE_URL** - Wrong endpoint
2. **Verify server is running**:
   ```bash
   curl https://beatsx402.ai/health
   ```
3. **Check response** manually:
   ```bash
   curl -v https://beatsx402.ai/v1/llm/gpt-4o-mini \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"test"}]}'
   ```

---

## 💬 Getting Help

If none of these solutions work:

1. **Check GitHub Issues**: Someone may have same problem
2. **Join Discord**: [discord.gg/7buaWDUTu7](https://discord.gg/7buaWDUTu7) - Active community support
3. **Telegram**: [t.me/beatsonbase](https://t.me/beatsonbase) - Quick questions
4. **Create new issue**: Include:
   - Error message (full stack trace)
   - Code snippet (remove private keys!)
   - Node/Python version
   - OS (Windows/Mac/Linux)
5. **Email**: admin@beatsonbase.ai

### What to Include

**Good bug report**:
```
Issue: "Payment verification failed"

Environment:
- Node.js: v18.17.0
- OS: Windows 11
- Package versions: x402-axios@latest, axios@1.6.0, viem@2.38.4

Error:
[full error message]

Code:
[minimal example that reproduces issue]

What I tried:
- Checked balance on BaseScan (have $5 USDC)
- Verified PRIVATE_KEY format
- Reinstalled dependencies
```

---

## 📊 Debug Mode

Enable verbose logging:

**JavaScript:**
```javascript
// Add to top of file
process.env.DEBUG = 'x402:*';
```

**Python:**
```python
# Add to top of file
import logging
logging.basicConfig(level=logging.DEBUG)
```

This shows detailed payment flow information.

---

## ✅ Verification Checklist

Before asking for help, verify:

- [ ] Node.js 18+ or Python 3.8+
- [ ] Dependencies installed correctly
- [ ] .env file exists with PRIVATE_KEY
- [ ] Wallet has USDC on Base (verified on BaseScan)
- [ ] API_BASE_URL is correct
- [ ] Tried on different network
- [ ] Tried example files (not custom code)
- [ ] Error message is clear and complete

---

Still stuck? We're here to help! See [Getting Help](#getting-help) above.

