# 🎬 Beats x402 AI API - Complete Documentation

**Everything you need to integrate USDC-powered AI services into your applications.**

Complete API reference for LLM chat, video generation, image generation, payment integration, and code examples.

---

## 📚 Table of Contents

### Getting Started
- [Introduction](#-introduction)
- [How x402 Works](#-how-x402-works)
- [Payment Setup](#-payment-setup)
- [Pricing](#-pricing)

### VideoGenAPI (MultiModelAPI)
- [Video Models](#-video-models)
- [Generate Video (Paid)](#post-v1generate)
- [Check Status (FREE)](#get-v1statusgeneration_id)
- [List Generations (FREE)](#get-v1generations)

### Image Generation
- [Image Models](#-image-generation-endpoints)
- [OpenAI Generate](#post-v1openaiimagesgenerate)
- [OpenAI Edit](#post-v1openaiimagesesit)
- [Nano Banana Generate](#post-v1nanobananagenerate)
- [Nano Banana Edit](#post-v1nanobananaedit)

### Integration Examples
- [Node.js](#-nodejs-integration)
- [Python](#-python-integration)
- [Error Handling](#-error-handling)

---

## 📖 Introduction

**Beats x402 AI API** is an AI services payment gateway that enables USDC-based access to AI video and image generation without requiring API keys or user accounts. Built on the x402 protocol.

### ✨ Key Features

- **💰 Pay-per-use** - From $0.01 USDC per generation
- **🆓 Free status checks** - No payment required
- **⚡ Instant settlement** - Payments settle in ~2 seconds on Base
- **🔒 No accounts needed** - Users only need a wallet with USDC
- **🤖 AI agent friendly** - Perfect for autonomous agents
- **🌐 Auto-discoverable** - Listed in the x402 Bazaar

### 🎯 Available Services

**LLM Chat** ($0.01-$0.05) - 6 language models including GPT-5 Mini, Claude 4.5, Grok 4, Gemini 2.5

**Video Generation** ($0.15-$5.40) - 18+ video models including Veo 3.1, Sora-2, and VideoGenAPI (MultiModelAPI)

**Image Generation** ($0.07-$0.50):
- OpenAI GPT-Image-1 - Premium quality, transparent backgrounds, inpainting
- Nano Banana - Fast generation (5-15s), 10 aspect ratios

---

## 🔄 How x402 Works

Unlike traditional APIs that use API keys, Beats x402 uses the **x402 payment protocol**:

### Traditional API Flow
```
User → API Key Auth → API Server → Response
```

### x402 Payment Flow
```
User (with USDC) → Request → 402 Payment Required
    ↓
User → Sign Payment → Retry Request
    ↓
Server → Verify Payment → Generate Content → Response
```

### Why x402?

1. **No Registration** - Users don't create accounts
2. **Instant Payments** - USDC settles in seconds on Base
3. **Transparent Pricing** - Pay exact amounts listed
4. **AI Agent Ready** - Agents can pay autonomously
5. **Zero Protocol Fees** - Direct wallet-to-wallet payments

---

## 🚀 Quick Start

### Prerequisites

- **Wallet with USDC** on Base mainnet (minimum $0.10)
- **Node.js 18+** or **Python 3.8+**
- Basic understanding of HTTP requests

### Installation

<details>
<summary><b>Node.js / TypeScript</b></summary>

```bash
npm install x402-fetch viem
# or
npm install x402-axios viem
```
</details>

<details>
<summary><b>Python</b></summary>

```bash
pip install x402 eth_account
```
</details>

### Your First Request

<details>
<summary><b>Node.js (x402-fetch)</b></summary>

```javascript
import { wrapFetchWithPayment } from 'x402-fetch';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';

// Set up your wallet (with USDC on Base)
const account = privateKeyToAccount('0xYourPrivateKey');
const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http()
});
const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);

// Generate video - payment handled automatically!
const response = await fetchWithPayment('https://beatsx402.ai/v1/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'kling_25',
    prompt: 'A cat playing with a ball in a sunny garden',
    duration: 10,
    resolution: '1080p'
  })
});

const result = await response.json();
console.log('Generation ID:', result.generation_id);

// Check status (FREE - no payment)
const status = await fetch(`https://beatsx402.ai/v1/status/${result.generation_id}`);
const statusData = await status.json();
console.log('Video URL:', statusData.video_url);
```
</details>

<details>
<summary><b>Python</b></summary>

```python
from x402.clients.requests import x402_requests
from eth_account import Account
import requests

# Set up your wallet (with USDC on Base)
account = Account.from_key('0xYourPrivateKey')
session = x402_requests(account)

# Generate video - payment handled automatically!
response = session.post('https://beatsx402.ai/v1/generate', json={
    'model': 'kling_25',
    'prompt': 'A cat playing with a ball in a sunny garden',
    'duration': 10,
    'resolution': '1080p'
})

result = response.json()
print('Generation ID:', result['generation_id'])

# Check status (FREE - no payment)
status = requests.get(f"https://beatsx402.ai/v1/status/{result['generation_id']}")
print('Video URL:', status.json()['video_url'])
```
</details>

---

## 💳 Payment Setup

### Option 1: Create a New Wallet (Recommended for Testing)

Generate a test wallet:

```bash
node generate-wallet.js
```

This outputs:
- **Private Key** (keep secret)
- **Wallet Address** (fund with USDC)

### Option 2: Use an Existing Wallet

Export your private key from MetaMask or Coinbase Wallet:

**MetaMask:**
1. Account Details → Show Private Key
2. Enter password → Copy key

**Coinbase Wallet:**
1. Settings → Show Recovery Phrase
2. Import into MetaMask to get private key

### Funding Your Wallet

You need **USDC on Base mainnet**. Get it from:

- **Bridge**: https://bridge.base.org (from Ethereum)
- **Coinbase**: Buy USDC → Withdraw to Base
- **DEX**: Swap ETH → USDC on Uniswap

**Minimum balance**: $0.01 USDC for LLM requests

### Security Best Practices

✅ **DO:**
- Use environment variables for private keys
- Use separate wallets for testing vs production
- Keep small balances in test wallets

❌ **DON'T:**
- Hardcode private keys in code
- Commit `.env` files to git
- Share private keys
- Use your main wallet for testing

---

## 🤖 Video Models

### VideoGenAPI (MultiModelAPI) Models - $0.15 per generation

All models below are available via the VideoGenAPI (MultiModelAPI) endpoint at **$0.15 USDC per generation**:

| Model | Provider | Resolution | Duration | Modes |
|-------|----------|------------|----------|-------|
| **Sora 2** | OpenAI | 1080p | 10s | Text, Image |
| **Higgsfield** | Higgsfield | 1080p | 5-15s | Text |
| **Kling 2.5** | Kuaishou | 1080p | 5-10s | Text, Image |
| **Nano Banana** | Nano | 720p | 5-10s | Text, Image |
| **Pixverse V5** | Pixverse | 1080p | 5-8s | Text, Image |
| **LTV Video 2** | LTX | 4K | 6-10s | Text, Image |
| **LTX-Video 13B** | LTX | 480p | 1-60s | Text |
| **Seedance** | Seedance | 1080p | 5-10s | Text, Image |
| **Wan 2.5** | Wan | 1080p | 5-10s | Text, Image |

### Premium Video Models (Separate Pricing)

Google Veo 3 and Veo 3.1 models have separate pricing (see pricing table below):
- **Veo 3 Fast**: $2.00 per generation
- **Veo 3 Full Quality**: $4.00 per generation
- **Veo 3.1 Fast**: $2.00 per generation
- **Veo 3.1 Full Quality**: $4.00 per generation

OpenAI Sora models are also priced separately:
- **Sora-2**: $0.15/second (4-12s duration)
- **Sora-2 Pro**: $0.45/second (4-12s duration)

### Model Selection Guide

**Best Overall Quality**: Veo 3.1 Full, Veo 3 Full ($4.00)  
**Best for Long Videos**: `ltxv-13b` (up to 60s, $0.15)  
**Best 4K Output**: `ltxv-2` ($0.15)  
**Fastest Generation**: `seedance`, `nanobanana-video` ($0.15)  
**Best with Audio**: Veo 3.1, Sora-2 (premium pricing)  
**Best Value**: VideoGenAPI (MultiModelAPI) models ($0.15 fixed)

---

## 💰 Pricing

### Video Generation

| Service | Endpoint | Cost |
|---------|----------|------|
| **VideoGenAPI (MultiModelAPI)** (9 models) | POST /v1/generate | **$0.15** |
| **Veo 3 Fast** | POST /v1/veo3/fast/* | **$2.00** |
| **Veo 3 Full Quality** | POST /v1/veo3/* | **$4.00** |
| **Veo 3.1 Fast** | POST /v1/veo3.1/fast/* | **$2.00** |
| **Veo 3.1 Full Quality** | POST /v1/veo3.1/* | **$4.00** |
| **Sora-2** | POST /v1/sora/* | **$0.60-$1.80** (4-12s) |
| **Sora-2 Pro** | POST /v1/sora-pro/* | **$1.80-$5.40** (4-12s) |

### Image Generation

| Service | Endpoint | Cost |
|---------|----------|------|
| **OpenAI Generate** | POST /v1/openai/images/generate | **$0.30** |
| **OpenAI Edit** | POST /v1/openai/images/edit | **$0.50** |
| **Nano Banana Generate** | POST /v1/nanobanana/generate | **$0.07/img** |
| **Nano Banana Edit** | POST /v1/nanobanana/edit | **$0.07/img** |

### LLM Chat

| Service | Endpoint | Cost |
|---------|----------|------|
| **GPT-4o Mini** | POST /v1/llm/gpt-4o-mini | **$0.01** |
| **GPT-5 Mini** | POST /v1/llm/gpt-5-mini | **$0.02** |
| **Claude 4.5 Sonnet** | POST /v1/llm/claude-4-5-sonnet | **$0.05** |
| **Grok 4** | POST /v1/llm/grok-4 | **$0.05** |
| **Grok Fast** | POST /v1/llm/grok-fast | **$0.01** |
| **Gemini 2.5 Flash** | POST /v1/llm/gemini-2-5-flash | **$0.01** |

### Free Endpoints

| Service | Endpoint | Cost |
|---------|----------|------|
| **Status Checks** | GET /v1/status/:id | **FREE** |
| **List Generations** | GET /v1/generations | **FREE** |
| **Health Check** | GET /health | **FREE** |

**Payment**: USDC on Base mainnet • **Settlement**: Instant (~2s) • **Fees**: $0

---

## 🔌 Endpoints

### Base URL

```
https://beatsx402.ai
```

All API endpoints are available at this base URL.

---

## 🎬 VideoGenAPI (MultiModelAPI) Endpoints

All video generation endpoints use the VideoGenAPI (MultiModelAPI) service. The generation endpoint requires payment, while status and listing endpoints are completely free.

### POST /v1/generate

**Generate AI video from text or image**  
**Cost**: 💰 $0.15 USDC

Automatically detects generation mode:
- **Text-to-Video**: Provide only `prompt`
- **Image-to-Video**: Provide both `prompt` and `image_url`

#### Request Parameters

| Parameter | Type | Required | Description | Default |
|-----------|------|----------|-------------|---------|
| `model` | string | No | AI model key (see [Video Models](#-video-models)) | `sora-2` |
| `prompt` | string | **Yes** | Text description (max 1000 chars) | - |
| `image_url` | string | No | Source image URL (activates image-to-video mode) | - |
| `duration` | integer | No | Video duration in seconds (5-60s, varies by model) | 5 |
| `resolution` | string | No | Video resolution: `480p`, `720p`, `1080p`, `4K` | `720p` |
| `aspect_ratio` | string | No | Aspect ratio: `16:9`, `4:3`, `1:1`, `9:21` (text-to-video only) | `16:9` |
| `seed` | integer | No | Random seed for reproducible results (-1 for random) | -1 |
| `camera_fixed` | boolean | No | Fix camera position during generation | `false` |
| `add_audio` | boolean | No | Add AI-generated sound effects | `false` |
| `audio_prompt` | string | No | Custom audio description | - |

#### Example: Text-to-Video

```javascript
// Node.js with x402-fetch
const response = await fetchWithPayment('https://beatsx402.ai/v1/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'kling_25',
    prompt: 'A beautiful sunset over mountains with birds flying',
    duration: 10,
    resolution: '1080p',
    aspect_ratio: '16:9'
  })
});
```

#### Response (Success)

```json
{
  "success": true,
  "generation_id": "gen_686717fe97bd3_055867",
  "request_id": "24076931-9c23-4d18-a1d4-9d5cb5369c62",
  "status": "pending",
  "type": "text-to-video",
  "model": {
    "key": "kling_25",
    "name": "Kling 2.5",
    "provider": "Kuaishou"
  },
  "prompt": "A beautiful sunset over mountains with birds flying",
  "duration": 10,
  "resolution": "1080p",
  "fps": 30,
  "aspect_ratio": "16:9",
  "status_url": "/v1/status/gen_686717fe97bd3_055867",
  "message": "Video generation request submitted successfully."
}
```

---

### GET /v1/status/:generation_id

**Check VideoGenAPI (MultiModelAPI) generation status**  
**Cost**: 🆓 FREE (No payment required)

Use this endpoint to check the status of your video generation. This endpoint is completely free and does not require x402 payment.

#### Example Request

```javascript
// No payment required for status checks!
const response = await fetch('https://beatsx402.ai/v1/status/gen_686717fe97bd3_055867');
const status = await response.json();
```

#### Response (Completed)

```json
{
  "success": true,
  "generation_id": "gen_686717fe97bd3_055867",
  "status": "completed",
  "type": "text-to-video",
  "model": {
    "key": "kling_25",
    "name": "Kling 2.5",
    "provider": "Kuaishou"
  },
  "video_url": "https://videogenapi.com/api/v1/video/gen_686717fe97bd3_055867",
  "prompt": "A beautiful sunset over mountains with birds flying",
  "duration": 10,
  "resolution": "1080p",
  "processing_time": 28,
  "completed_at": "2025-10-27 19:06:45"
}
```

#### Status Values

| Status | Description |
|--------|-------------|
| `pending` | Request submitted, waiting for processing |
| `in_queue` | Request is in the processing queue |
| `in_progress` | Video generation in progress |
| `completed` | Generation completed successfully |
| `failed` | Generation failed |

**💡 Tip**: The `video_url` is publicly accessible - you can share it directly!

---

### GET /v1/generations

**List recent VideoGenAPI (MultiModelAPI) generations**  
**Cost**: 🆓 FREE (No payment required)

Retrieve a list of all your recent video generations. This endpoint is completely free and does not require x402 payment.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Items per page |

#### Example

```javascript
const response = await fetch('https://beatsx402.ai/v1/generations?page=1&limit=10');
const data = await response.json();
```

---

## 🎨 Image Generation Endpoints

### Image Models

#### OpenAI GPT-Image-1

**Cost**: $0.30 (generate) | $0.50 (edit)  
**Quality**: Premium ⭐⭐⭐  
**Speed**: 30-120s  
**Features**: Transparent backgrounds, inpainting, text rendering, 3 aspect ratios (1:1, 16:9, 9:16)

#### Google Nano Banana

**Cost**: $0.07 (generate/edit)  
**Quality**: Very Good ⭐⭐  
**Speed**: 5-15s ⚡  
**Features**: Fast generation, 10 aspect ratios (includes 21:9 ultrawide!), character consistency

---

### POST /v1/openai/images/generate

**Generate high-quality images using OpenAI GPT-Image-1**  
**Cost**: 💰 $0.30 USDC

#### Parameters

| Parameter | Type | Required | Description | Default |
|-----------|------|----------|-------------|---------|
| `prompt` | string | **Yes** | Image description (max 1000 chars) | - |
| `aspectRatio` | string | No | Aspect ratio: `1:1`, `16:9`, `9:16` | `1:1` |
| `quality` | string | No | Quality: `low`, `medium`, `high`, `auto` | `high` |
| `background` | string | No | `transparent` or `opaque` (PNG/WebP only) | `opaque` |
| `size` | string | No | Size: `1024x1024`, `1536x1024`, `1024x1536` | `1024x1024` |

#### Example

```javascript
const response = await fetchWithPayment('https://beatsx402.ai/v1/openai/images/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A detailed oil painting of a medieval castle on a hilltop',
    aspectRatio: '16:9',
    quality: 'high'
  })
});

const result = await response.json();
console.log('Image URL:', result.images[0].url);
```

---

### POST /v1/nanobanana/generate

**Fast image generation using Google Nano Banana**  
**Cost**: 💰 $0.07 USDC

#### Parameters

| Parameter | Type | Required | Description | Default |
|-----------|------|----------|-------------|---------|
| `prompt` | string | **Yes** | Image description | - |
| `aspect_ratio` | string | No | `1:1`, `16:9`, `9:16`, `21:9`, `4:3`, `3:2`, `2:3`, `5:4`, `4:5`, `3:4` | `1:1` |
| `num_images` | integer | No | Number of images (1-4) | 1 |
| `output_format` | string | No | `jpeg`, `png`, `webp` | `jpeg` |

---

## 💻 Node.js Integration

### Using x402-fetch (Recommended)

```javascript
import { wrapFetchWithPayment } from 'x402-fetch';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import dotenv from 'dotenv';

dotenv.config();

// Setup wallet
const account = privateKeyToAccount(process.env.PRIVATE_KEY);
const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http()
});
const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);

// Generate video
async function generateVideo(prompt) {
  try {
    const response = await fetchWithPayment('https://beatsx402.ai/v1/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'kling_25',
        prompt,
        duration: 10,
        resolution: '1080p'
      })
    });

    const result = await response.json();
    console.log('✅ Video generation started!');
    console.log('Generation ID:', result.generation_id);
    
    // Wait for completion
    return await waitForCompletion(result.generation_id);
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Poll for completion (FREE)
async function waitForCompletion(generationId) {
  while (true) {
    const response = await fetch(`https://beatsx402.ai/v1/status/${generationId}`);
    const status = await response.json();
    
    console.log('Status:', status.status);
    
    if (status.status === 'completed') {
      console.log('✅ Video ready!');
      console.log('URL:', status.video_url);
      return status;
    } else if (status.status === 'failed') {
      throw new Error('Video generation failed');
    }
    
    // Wait 10 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

// Usage
generateVideo('A cat playing with a ball in a sunny garden')
  .then(video => console.log('Done!', video))
  .catch(error => console.error(error));
```

---

## 🐍 Python Integration

### Using x402-requests

```python
from x402.clients.requests import x402_requests
from eth_account import Account
import time
import os

# Setup wallet
account = Account.from_key(os.getenv('PRIVATE_KEY'))
session = x402_requests(account)

def generate_video(prompt):
    """Generate a video and wait for completion"""
    
    # Generate video (costs $0.15 USDC)
    response = session.post('https://beatsx402.ai/v1/generate', json={
        'model': 'kling_25',
        'prompt': prompt,
        'duration': 10,
        'resolution': '1080p'
    })
    
    result = response.json()
    print(f"✅ Video generation started!")
    print(f"Generation ID: {result['generation_id']}")
    
    # Wait for completion (FREE)
    return wait_for_completion(result['generation_id'])

def wait_for_completion(generation_id):
    """Poll for completion (status checks are FREE)"""
    import requests
    
    while True:
        response = requests.get(f'https://beatsx402.ai/v1/status/{generation_id}')
        status = response.json()
        
        print(f"Status: {status['status']}")
        
        if status['status'] == 'completed':
            print(f"✅ Video ready!")
            print(f"URL: {status['video_url']}")
            return status
        elif status['status'] == 'failed':
            raise Exception('Video generation failed')
        
        # Wait 10 seconds
        time.sleep(10)

# Usage
video = generate_video('A cat playing with a ball in a sunny garden')
print('Done!', video)
```

---

## ❌ Error Handling

### HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 402 | Payment Required | Payment needed - includes payment instructions |
| 400 | Bad Request | Invalid parameters |
| 500 | Internal Server Error | Server error |

### Common Errors

**402 Payment Required**
```json
{
  "x402Version": 1,
  "error": "X-PAYMENT header is required",
  "accepts": [{
    "scheme": "exact",
    "network": "base",
    "maxAmountRequired": "100000",
    "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "payTo": "0xYourWalletAddress"
  }]
}
```
**Solution**: Use an x402 client to handle payment automatically.

---

## 🆘 Support

Need help? We're here for you!

**Discord**: [discord.gg/7buaWDUTu7](https://discord.gg/7buaWDUTu7)  
**Telegram**: [t.me/beatsonbase](https://t.me/beatsonbase)  
**Email**: admin@beatsonbase.ai  
**GitHub**: [github.com/PJDoes](https://github.com/PJDoes)

### 📚 Resources

- [x402 Protocol Docs](https://x402.gitbook.io)
- [Wallet Setup Guide](./WALLET-SETUP.md)
- [Endpoints Quick Reference](./ENDPOINTS.md)
- [Main README](../README.md)

---

## 🚀 Ready to Start Building?

Get your wallet funded with USDC and start generating amazing AI content with just a few lines of code.

**Quick Links:**
- [Set up your wallet](./WALLET-SETUP.md)
- [View code examples](#nodejs-integration)
- [Check pricing](#pricing)
- [See all models](#-video-models)
- [Try it live](https://beatsx402.ai)

---

<div align="center">

**Built on 🟦 using x402 Protocol**

[x402 Protocol](https://x402.org) • [Base Network](https://base.org) • [Coinbase CDP](https://cdp.coinbase.com)

</div>

