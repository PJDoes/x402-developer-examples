# JavaScript Endpoint Examples

Complete code examples for all x402 API endpoints. Copy-paste these snippets into your project.

**Prerequisites:**
- Run `npm install` to install dependencies
- Configure `.env` with your `PRIVATE_KEY`
- Ensure wallet has USDC on Base network

---

## 🛠️ Setup (Required for All Examples)

Add this setup code at the top of your script:

```javascript
import { wrapFetchWithPayment } from 'x402-fetch';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import 'dotenv/config';

const API_BASE_URL = process.env.API_BASE_URL || 'https://beatsx402.ai';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Create wallet client
const account = privateKeyToAccount(PRIVATE_KEY);
const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http()
});
const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);
```

---

## 🤖 LLM Chat Endpoints

### GPT-4o Mini ($0.01)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/gpt-4o-mini`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain quantum computing in simple terms.' }
    ],
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.response);
```

### GPT-5 Mini ($0.02)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/gpt-5-mini`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Solve this complex math problem: ...' }
    ],
    reasoning_effort: 'high'  // 'low' | 'medium' | 'high'
  })
});

const data = await response.json();
console.log(data.response);
```

### Claude 4.5 ($0.05)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/claude-4.5`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Analyze this business strategy: ...' }
    ],
    temperature: 0.8
  })
});

const data = await response.json();
console.log(data.response);
```

### Grok 4 ($0.05)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/grok-4`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'What are the latest developments in AI?' }
    ],
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.response);
```

### Grok Fast ($0.01)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/grok-fast`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Quick question: What is the capital of France?' }
    ]
  })
});

const data = await response.json();
console.log(data.response);
```

### Gemini 2.5 ($0.01)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/gemini-2.5`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Describe this image and answer questions about it.' }
    ],
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.response);
```

---

## 🎨 Image Generation Endpoints

### OpenAI - Generate Image ($0.30)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/openai/images/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A serene landscape with mountains at sunset, oil painting style',
    size: '1024x1024',        // '1024x1024' | '1536x1024' | '1024x1536'
    quality: 'high',           // 'low' | 'medium' | 'high' | 'auto'
    background: 'opaque'       // 'transparent' | 'opaque'
  })
});

const data = await response.json();
console.log('Image URL:', data.images[0].url);
console.log('Revised Prompt:', data.images[0].revised_prompt);
```

### OpenAI - Image-to-Image Edit ($0.50)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/openai/images/edit`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Transform this character into a superhero costume',
    image_urls: [
      'https://example.com/reference-image-1.jpg',
      'https://example.com/reference-image-2.jpg'
    ],
    aspect_ratio: '1:1',       // '1:1' | '16:9' | '9:16'
    input_fidelity: 'high'     // 'low' | 'high'
  })
});

const data = await response.json();
console.log('Edited Image:', data.images[0].url);
```

### OpenAI - Ticker-to-Image ($0.50)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/openai/ticker-to-image`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ticker: 'TOSHI',
    prompt: 'Epic futuristic scene featuring the TOSHI mascot',
    size: '1024x1024',
    quality: 'high'
  })
});

const data = await response.json();
console.log('Image URL:', data.images[0].url);
```

### Nano Banana - Generate ($0.07 per image)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/nanobanana/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Cute robot holding a birthday cake, digital art',
    aspect_ratio: '16:9',      // '1:1' | '16:9' | '9:16' | '21:9' | '4:3' | '3:2' | '2:3' | '5:4' | '4:5' | '3:4'
    num_images: 1,             // 1-4 (cost multiplies)
    output_format: 'png'       // 'jpeg' | 'png' | 'webp'
  })
});

const data = await response.json();
console.log('Images:', data.images.map(img => img.url));
```

### Nano Banana - Image-to-Image Edit ($0.07 per image)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/nanobanana/edit`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Same character but in a cyberpunk setting',
    image_urls: ['https://example.com/character.jpg'],
    aspect_ratio: '1:1',
    num_images: 1
  })
});

const data = await response.json();
console.log('Edited Image:', data.images[0].url);
```

### Nano Banana - Ticker-to-Image ($0.07 per image)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/nanobanana/ticker-to-image`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ticker: 'BRETT',
    prompt: 'Dynamic action scene with BRETT mascot',
    aspect_ratio: '16:9',
    num_images: 1
  })
});

const data = await response.json();
console.log('Image URL:', data.images[0].url);
```

---

## 🎬 Video Generation Endpoints

### VideoGenAPI - Generate ($0.15)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'nanobanana-video',  // Optional: 'sora-2' | 'kling_25' | 'higgsfield_v1' | 'nanobanana-video' | 'pixverse' | 'ltxv-2' | 'ltxv-13b' | 'seedance' | 'wan-25'
    prompt: 'A cat wearing sunglasses skateboarding down a city street',
    duration: 5,                // 5-60 seconds (varies by model)
    resolution: '720p',         // '480p' | '720p' | '1080p' | '4K'
    aspect_ratio: '16:9'        // '16:9' | '4:3' | '1:1' | '9:21'
  })
});

const data = await response.json();
const generationId = data.generation_id;

// Poll for completion (status checks are FREE)
async function pollStatus(genId) {
  while (true) {
    const statusResponse = await fetch(`${API_BASE_URL}/v1/status/${genId}`);
    const status = await statusResponse.json();
    
    console.log('Status:', status.status);
    
    if (status.status === 'completed') {
      console.log('Video URL:', status.video_url);
      break;
    } else if (status.status === 'failed') {
      console.log('Generation failed:', status.error);
      break;
    }
    
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
  }
}

await pollStatus(generationId);
```

### VideoGenAPI - Image-to-Video ($0.15)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'nanobanana-video',
    prompt: 'Camera slowly zooms in on the subject',
    image_url: 'https://example.com/start-frame.jpg',
    duration: 5
  })
});

const data = await response.json();
// Poll status as shown above
```

### Sora-2 ($0.15/second, 4-12s = $0.60-$1.80)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/sora/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A time-lapse of a flower blooming in spring, cinematic lighting',
    duration: 8  // 4 | 8 | 12 seconds
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Sora-2 Image-to-Video ($0.15/second)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/sora/image-to-video`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'The scene comes to life with gentle movement',
    image_url: 'https://example.com/scene.jpg',
    duration: 8
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Sora-2-Pro ($0.45/second, 4-12s = $1.80-$5.40)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/sora-pro/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Epic dragon flying over a medieval castle, 4K quality',
    duration: 12,
    size: '1792x1024'  // '1280x720' | '720x1280' | '1792x1024' | '1024x1792'
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Veo 3 Fast - Text-to-Video ($2.00)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3/fast/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Ocean waves crashing on a beach at sunset',
    duration: '8s',            // '4s' | '6s' | '8s'
    resolution: '1080p',       // '720p' | '1080p'
    generate_audio: true
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Veo 3 Fast - Image-to-Video ($2.00)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3/fast/image-to-video`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Camera pans across the landscape',
    image_url: 'https://example.com/landscape.jpg',
    aspect_ratio: 'auto',      // '9:16' | '16:9' | '1:1' | 'auto'
    duration: '8s',
    generate_audio: true
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Veo 3 Full Quality - Text-to-Video ($4.00)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'A chef preparing a gourmet meal in a professional kitchen, extreme detail',
    duration: '8s',
    generate_audio: true
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Veo 3.1 Fast - Text-to-Video ($2.00)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3.1/fast/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Futuristic city with flying cars, neon lights',
    duration: '8s',
    resolution: '1080p',
    generate_audio: true
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Veo 3.1 Full Quality ($4.00)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3.1/generate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Documentary-style footage of wildlife in their natural habitat',
    duration: '8s',
    generate_audio: true
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Veo 3.1 - Reference-to-Video ($4.00)

Character consistency with multiple reference images:

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3.1/reference-to-video`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'The character walks through a magical forest',
    image_urls: [
      'https://example.com/character-front.jpg',
      'https://example.com/character-side.jpg',
      'https://example.com/character-back.jpg'
    ],
    duration: '8s',
    generate_audio: true
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

### Veo 3.1 - Ticker-to-Video ($4.00)

```javascript
const response = await fetchWithPayment(`${API_BASE_URL}/v1/veo3.1/ticker-to-video`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ticker: 'DEGEN',
    prompt: 'Dynamic animated scene featuring the DEGEN mascot in action',
    duration: '8s',
    generate_audio: true
  })
});

const data = await response.json();
console.log('Video URL:', data.video_url);
```

---

## 🆓 Free Endpoints (No Payment Required)

These endpoints never require payment - use regular `fetch`:

### Check Video Status

```javascript
// Use regular fetch (no payment)
const response = await fetch(`${API_BASE_URL}/v1/status/generation_123abc`);
const data = await response.json();

console.log('Status:', data.status);
console.log('Video URL:', data.video_url);
```

### List Recent Generations

```javascript
// Use regular fetch (no payment)
const response = await fetch(`${API_BASE_URL}/v1/generations`);
const data = await response.json();

console.log('Recent generations:', data.generations);
```

---

## 💡 Tips & Best Practices

### Error Handling

```javascript
try {
  const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/gpt-4o-mini`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'Hello!' }]
    })
  });
  
  const data = await response.json();
  
  if (data.success === false) {
    console.error('API Error:', data.error, data.message);
  } else {
    console.log('Success:', data.response);
  }
} catch (error) {
  console.error('Request failed:', error.message);
  
  if (error.message.includes('402')) {
    console.log('Payment issue - check wallet balance');
  }
}
```

### Reusable Helper Function

```javascript
async function callLLM(model, prompt, options = {}) {
  const response = await fetchWithPayment(`${API_BASE_URL}/v1/llm/${model}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      ...options
    })
  });
  
  const data = await response.json();
  return data.response;
}

// Usage
const answer = await callLLM('gpt-4o-mini', 'What is AI?', { temperature: 0.7 });
console.log(answer);
```

### Video Generation Helper with Polling

```javascript
async function generateVideo(prompt, options = {}) {
  // Start generation
  const response = await fetchWithPayment(`${API_BASE_URL}/v1/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, ...options })
  });
  
  const { generation_id } = await response.json();
  
  // Poll for completion
  while (true) {
    const statusResponse = await fetch(`${API_BASE_URL}/v1/status/${generation_id}`);
    const status = await statusResponse.json();
    
    if (status.status === 'completed') {
      return status.video_url;
    } else if (status.status === 'failed') {
      throw new Error(status.error);
    }
    
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

// Usage
const videoUrl = await generateVideo('A cat playing piano', { model: 'nanobanana-video' });
console.log('Video ready:', videoUrl);
```

---

## 📚 Additional Resources

- **Live Playground**: [beatsx402.ai](https://beatsx402.ai) - Test all endpoints interactively
- **API Documentation**: [docs/ENDPOINTS.md](../docs/ENDPOINTS.md) - Complete parameter reference
- **Troubleshooting**: [docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md) - Common issues
- **Community**: 
  - Discord: [discord.gg/7buaWDUTu7](https://discord.gg/7buaWDUTu7)
  - Telegram: [t.me/beatsonbase](https://t.me/beatsonbase)

---

**Need help?** Join our Discord or check the troubleshooting guide!

