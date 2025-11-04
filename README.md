# x402 AI API - Developer Examples

**Ready-to-run code examples for AI services with USDC payments on Base**

Access 30 AI endpoints (LLM, Image, Video) with instant crypto payments. No API keys, no accounts—just your wallet.

---

## 🚀 Quick Start

Get running in 5 minutes:

```bash
# 1. Clone repository
git clone https://github.com/your-org/x402-developer-examples.git
cd x402-developer-examples

# 2. Install dependencies (choose one)
npm install          # For JavaScript/Node.js
pip install -r requirements.txt  # For Python

# 3. Generate wallet
node generate-wallet.js

# 4. Fund wallet with USDC on Base
# Send USDC to the address shown (minimum $1 for testing)

# 5. Configure environment
cp .env.example .env
# Edit .env and add your PRIVATE_KEY
# API_BASE_URL is already set to https://beatsx402.ai

# 6. Run an example!
node javascript/video-videogenapi.js   # JavaScript
python python/video_videogenapi.py    # Python
```

---

## 💰 What is x402?

**x402 is HTTP 402 Payment Required—made real.**

Traditional APIs use API keys. x402 uses **instant crypto payments**:

```
Traditional API:  API Key → Server → Response
x402:            Request → 402 Payment → USDC Payment → Response
```

### Why x402?

- ✅ **No registration** - Just a wallet with USDC
- ✅ **Instant settlement** - Payments settle in ~2 seconds on Base
- ✅ **Pay-per-use** - From $0.01 USDC per request
- ✅ **AI agent ready** - Autonomous agents can pay
- ✅ **Zero protocol fees** - Direct wallet-to-wallet
- ✅ **FREE status checks** - Poll video generation status for free

---

## 🎯 Available Services

### 🤖 LLM Chat (6 models)
| Model | Cost | Description |
|-------|------|-------------|
| GPT-4o Mini | $0.01 | Fast & affordable |
| GPT-5 Mini | $0.02 | Advanced reasoning |
| Claude 4.5 | $0.05 | Deep analysis |
| Grok 4 | $0.05 | Real-time web data |
| Grok Fast | $0.01 | Efficient reasoning |
| Gemini 2.5 | $0.01 | Multimodal & fast |

### 🎨 Image Generation (6 endpoints)
| Service | Cost | Features |
|---------|------|----------|
| OpenAI GPT-Image-1 | $0.30 | Premium quality, transparent backgrounds |
| OpenAI Image-to-Image | $0.50 | Character consistency with reference images |
| OpenAI Ticker-to-Image | $0.50 | Generate from crypto token |
| Nano Banana Generate | $0.07/img | Fast (5-15s), 10 aspect ratios |
| Nano Banana I2I | $0.07/img | Fast character consistency |
| Nano Banana Ticker | $0.07/img | Fast token-based generation |

### 🎬 Video Generation (18 endpoints)

**VideoGenAPI (MultiModelAPI)** - $0.15 per video
- 9 AI models: sora-2, higgsfield, kling, nanobanana-video, pixverse, ltxv-2, ltxv-13b, seedance, wan-25
- Text-to-video and image-to-video
- **FREE status checks** - Poll /v1/status/:id with no payment

**Premium Video**
| Service | Cost | Quality |
|---------|------|---------|
| Veo 3 Fast | $2.00 | High quality, 4-8s, audio |
| Veo 3 Full | $4.00 | Premium, 4-8s, audio |
| Veo 3.1 Fast | $2.00 | Improved, 4-8s, audio |
| Veo 3.1 Full | $4.00 | State-of-the-art, audio |
| Sora-2 | $1.20 | $0.15/second, 4-12s |
| Sora-2-Pro | $3.60 | $0.45/second, production quality |

**FREE Endpoints**
- `GET /v1/status/:id` - Check VideoGenAPI generation status
- `GET /v1/generations` - List recent VideoGenAPI generations

---

## 📦 What's Included

### JavaScript/Node.js Examples
```
javascript/
├── llm-example.js           - Chat with GPT-4o Mini
├── image-example.js         - Generate images
├── video-videogenapi.js     - Generate video + polling (FREE status checks)
├── video-veo.js             - Premium Veo 3 video
├── video-sora.js            - OpenAI Sora-2 video
└── utils/
    └── polling.js           - Helper for status polling
```

### Python Examples
```
python/
├── llm_example.py           - Chat with GPT-4o Mini
├── image_example.py         - Generate images
├── video_videogenapi.py     - Generate video + polling (FREE status checks)
├── video_veo.py             - Premium Veo 3 video
├── video_sora.py            - OpenAI Sora-2 video
└── utils/
    └── polling.py           - Helper for status polling
```

### Documentation
- `docs/ENDPOINTS.md` - Complete endpoint reference
- `docs/WALLET-SETUP.md` - How to get USDC on Base
- `docs/TROUBLESHOOTING.md` - Common issues & solutions

---

## 🔧 Setup Guide

### Prerequisites

- **Node.js 18+** (for JavaScript examples)
- **Python 3.8+** (for Python examples)
- **USDC on Base** network (minimum $1 for testing)

### Detailed Setup

#### 1. Install Dependencies

**JavaScript:**
```bash
npm install
```

This installs:
- `x402-fetch` - HTTP client with automatic payment handling
- `viem` - Ethereum wallet library
- `dotenv` - Environment variable management

**Python:**
```bash
pip install -r requirements.txt
```

This installs:
- `x402` - Python client with automatic payment handling
- `eth-account` - Ethereum wallet library
- `python-dotenv` - Environment variable management
- `requests` - HTTP library

#### 2. Generate Wallet

```bash
node generate-wallet.js
```

This creates a new wallet and shows:
- **Private key** (add to .env as PRIVATE_KEY)
- **Wallet address** (fund this with USDC on Base)

⚠️ **Security**: Use a separate wallet for testing. Keep small balances (<$10).

#### 3. Fund Wallet

You need **USDC on Base mainnet**. Get it from:

- **Coinbase**: Buy USDC → Withdraw to Base network
- **Bridge**: https://bridge.base.org (from Ethereum)
- **DEX**: Swap ETH → USDC on Uniswap (Base)

**Minimum amounts:**
- $0.01 for LLM
- $0.15 for VideoGenAPI
- $0.30 for OpenAI images
- $2.00 for premium video

#### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
PRIVATE_KEY=0x...           # From step 2
API_BASE_URL=https://your-server.com
```

#### 5. Run Examples

**JavaScript:**
```bash
# Individual examples
node javascript/llm-example.js
node javascript/image-example.js
node javascript/video-videogenapi.js

# Or use npm scripts
npm run llm
npm run image
npm run video
```

**Python:**
```bash
python python/llm_example.py
python python/image_example.py
python python/video_videogenapi.py
```

---

## 💻 Usage Examples

### Basic LLM Chat

**JavaScript:**
```javascript
import { wrapFetchWithPayment } from 'x402-fetch';
import { privateKeyToAccount } from 'viem/accounts';

const account = privateKeyToAccount(process.env.PRIVATE_KEY);
const fetchWithPayment = wrapFetchWithPayment(fetch, account);

const response = await fetchWithPayment('https://beatsx402.ai/v1/llm/gpt-4o-mini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

const data = await response.json();
console.log(data.response);
```

**Python:**
```python
from x402.clients.requests import x402_requests
from eth_account import Account

account = Account.from_key(os.getenv('PRIVATE_KEY'))
session = x402_requests(account)

response = session.post('https://beatsx402.ai/v1/llm/gpt-4o-mini',
    json={'messages': [{'role': 'user', 'content': 'Hello!'}]}
)

print(response.json()['response'])
```

### Video Generation with Status Polling

See `javascript/video-videogenapi.js` or `python/video_videogenapi.py` for complete examples with:
- Paid video generation ($0.15)
- FREE status polling
- Automatic waiting for completion

---

## 🧪 Testing

**Check wallet balance:**
```bash
# Using any Base block explorer
https://basescan.org/address/YOUR_WALLET_ADDRESS
```

**Start with cheap endpoints:**
1. Try LLM first ($0.01)
2. Then image generation ($0.14-$0.30)
3. Finally video generation ($0.15+)

**Monitor costs:**
- Each example prints the cost before running
- Check your wallet balance on BaseScan
- Keep test amounts small (<$10 total)

---

## 📚 Resources

- **Live Playground**: Test with shared wallet (no setup needed)
- **API Documentation**: Complete endpoint reference
- **x402 Protocol**: https://x402.gitbook.io/x402
- **Base Network**: https://base.org
- **Discord Community**: https://discord.gg/cdp

---

## 🔒 Security Best Practices

✅ **DO:**
- Use environment variables for private keys
- Use separate wallets for testing vs production
- Keep small balances in test wallets (<$10)
- Add `.env` to `.gitignore` (already done)

❌ **DON'T:**
- Hardcode private keys in code
- Commit `.env` files to git
- Share private keys
- Use your main wallet for testing

---

## ❓ Troubleshooting

### "Payment verification failed"
- Check wallet has USDC on Base (not Ethereum or other chains)
- Ensure sufficient balance for request cost
- Verify PRIVATE_KEY in .env is correct

### "402 Payment Required" error
- Normal! This means x402 client is working
- x402 automatically handles this and retries with payment
- If you see this error, the client isn't installed correctly

### "Generation timeout"
- VideoGenAPI can take 30-60 seconds
- Status polling is FREE - it will keep checking
- Check /v1/status/:id endpoint manually if needed

See `docs/TROUBLESHOOTING.md` for more help.

---

## 📄 License

MIT License - See LICENSE file

---

## 🤝 Contributing

Pull requests welcome! For major changes, please open an issue first.

---

## 💬 Support

- **Issues**: GitHub Issues
- **Discord**: https://discord.gg/cdp
- **Email**: support@example.com

---

**Built with ❤️ using [x402 Protocol](https://x402.org) on [Base Network](https://base.org)**

