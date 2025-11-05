# Python Endpoint Examples

Complete code examples for all x402 API endpoints. Copy-paste these snippets into your project.

**Prerequisites:**
- Run `pip install -r requirements.txt` to install dependencies
- Configure `.env` with your `PRIVATE_KEY`
- Ensure wallet has USDC on Base network

---

## 🛠️ Setup (Required for All Examples)

Add this setup code at the top of your script:

```python
import os
from x402.clients.requests import x402_requests
from eth_account import Account
from dotenv import load_dotenv
import time

load_dotenv()

API_BASE_URL = os.getenv('API_BASE_URL', 'https://beatsx402.ai')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')

# Create account and session
account = Account.from_key(PRIVATE_KEY)
session = x402_requests(account)
```

---

## 🤖 LLM Chat Endpoints

### GPT-4o Mini ($0.01)

```python
response = session.post(f'{API_BASE_URL}/v1/llm/gpt-4o-mini',
    json={
        'messages': [
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': 'Explain quantum computing in simple terms.'}
        ],
        'temperature': 0.7
    }
)

data = response.json()
print(data['response'])
```

### GPT-5 Mini ($0.02)

```python
response = session.post(f'{API_BASE_URL}/v1/llm/gpt-5-mini',
    json={
        'messages': [
            {'role': 'user', 'content': 'Solve this complex math problem: ...'}
        ],
        'reasoning_effort': 'high'  # 'low' | 'medium' | 'high'
    }
)

data = response.json()
print(data['response'])
```

### Claude 4.5 ($0.05)

```python
response = session.post(f'{API_BASE_URL}/v1/llm/claude-4.5',
    json={
        'messages': [
            {'role': 'user', 'content': 'Analyze this business strategy: ...'}
        ],
        'temperature': 0.8
    }
)

data = response.json()
print(data['response'])
```

### Grok 4 ($0.05)

```python
response = session.post(f'{API_BASE_URL}/v1/llm/grok-4',
    json={
        'messages': [
            {'role': 'user', 'content': 'What are the latest developments in AI?'}
        ],
        'temperature': 0.7
    }
)

data = response.json()
print(data['response'])
```

### Grok Fast ($0.01)

```python
response = session.post(f'{API_BASE_URL}/v1/llm/grok-fast',
    json={
        'messages': [
            {'role': 'user', 'content': 'Quick question: What is the capital of France?'}
        ]
    }
)

data = response.json()
print(data['response'])
```

### Gemini 2.5 ($0.01)

```python
response = session.post(f'{API_BASE_URL}/v1/llm/gemini-2.5',
    json={
        'messages': [
            {'role': 'user', 'content': 'Describe this image and answer questions about it.'}
        ],
        'temperature': 0.7
    }
)

data = response.json()
print(data['response'])
```

---

## 🎨 Image Generation Endpoints

### OpenAI - Generate Image ($0.30)

```python
response = session.post(f'{API_BASE_URL}/v1/openai/images/generate',
    json={
        'prompt': 'A serene landscape with mountains at sunset, oil painting style',
        'size': '1024x1024',        # '1024x1024' | '1536x1024' | '1024x1536'
        'quality': 'high',           # 'low' | 'medium' | 'high' | 'auto'
        'background': 'opaque'       # 'transparent' | 'opaque'
    }
)

data = response.json()
print('Image URL:', data['images'][0]['url'])
print('Revised Prompt:', data['images'][0]['revised_prompt'])
```

### OpenAI - Image-to-Image Edit ($0.50)

```python
response = session.post(f'{API_BASE_URL}/v1/openai/images/edit',
    json={
        'prompt': 'Transform this character into a superhero costume',
        'image_urls': [
            'https://example.com/reference-image-1.jpg',
            'https://example.com/reference-image-2.jpg'
        ],
        'aspect_ratio': '1:1',       # '1:1' | '16:9' | '9:16'
        'input_fidelity': 'high'     # 'low' | 'high'
    }
)

data = response.json()
print('Edited Image:', data['images'][0]['url'])
```

### OpenAI - Ticker-to-Image ($0.50)

```python
response = session.post(f'{API_BASE_URL}/v1/openai/ticker-to-image',
    json={
        'ticker': 'TOSHI',
        'prompt': 'Epic futuristic scene featuring the TOSHI mascot',
        'size': '1024x1024',
        'quality': 'high'
    }
)

data = response.json()
print('Image URL:', data['images'][0]['url'])
```

### Nano Banana - Generate ($0.07 per image)

```python
response = session.post(f'{API_BASE_URL}/v1/nanobanana/generate',
    json={
        'prompt': 'Cute robot holding a birthday cake, digital art',
        'aspect_ratio': '16:9',      # '1:1' | '16:9' | '9:16' | '21:9' | '4:3' | '3:2' | '2:3' | '5:4' | '4:5' | '3:4'
        'num_images': 1,             # 1-4 (cost multiplies)
        'output_format': 'png'       # 'jpeg' | 'png' | 'webp'
    }
)

data = response.json()
print('Images:', [img['url'] for img in data['images']])
```

### Nano Banana - Image-to-Image Edit ($0.07 per image)

```python
response = session.post(f'{API_BASE_URL}/v1/nanobanana/edit',
    json={
        'prompt': 'Same character but in a cyberpunk setting',
        'image_urls': ['https://example.com/character.jpg'],
        'aspect_ratio': '1:1',
        'num_images': 1
    }
)

data = response.json()
print('Edited Image:', data['images'][0]['url'])
```

### Nano Banana - Ticker-to-Image ($0.07 per image)

```python
response = session.post(f'{API_BASE_URL}/v1/nanobanana/ticker-to-image',
    json={
        'ticker': 'BRETT',
        'prompt': 'Dynamic action scene with BRETT mascot',
        'aspect_ratio': '16:9',
        'num_images': 1
    }
)

data = response.json()
print('Image URL:', data['images'][0]['url'])
```

---

## 🎬 Video Generation Endpoints

### VideoGenAPI - Generate ($0.15)

```python
import requests  # For free status checks

# Start generation (paid request)
response = session.post(f'{API_BASE_URL}/v1/generate',
    json={
        'model': 'nanobanana-video',  # Optional: 'sora-2' | 'kling_25' | 'higgsfield_v1' | 'nanobanana-video' | 'pixverse' | 'ltxv-2' | 'ltxv-13b' | 'seedance' | 'wan-25'
        'prompt': 'A cat wearing sunglasses skateboarding down a city street',
        'duration': 5,                # 5-60 seconds (varies by model)
        'resolution': '720p',         # '480p' | '720p' | '1080p' | '4K'
        'aspect_ratio': '16:9'        # '16:9' | '4:3' | '1:1' | '9:21'
    }
)

data = response.json()
generation_id = data['generation_id']

# Poll for completion (status checks are FREE - use regular requests)
def poll_status(gen_id):
    while True:
        status_response = requests.get(f'{API_BASE_URL}/v1/status/{gen_id}')
        status = status_response.json()
        
        print('Status:', status['status'])
        
        if status['status'] == 'completed':
            print('Video URL:', status['video_url'])
            return status['video_url']
        elif status['status'] == 'failed':
            print('Generation failed:', status.get('error'))
            return None
        
        time.sleep(5)  # Wait 5 seconds

video_url = poll_status(generation_id)
```

### VideoGenAPI - Image-to-Video ($0.15)

```python
response = session.post(f'{API_BASE_URL}/v1/generate',
    json={
        'model': 'nanobanana-video',
        'prompt': 'Camera slowly zooms in on the subject',
        'image_url': 'https://example.com/start-frame.jpg',
        'duration': 5
    }
)

data = response.json()
# Poll status as shown above
```

### Sora-2 ($0.15/second, 4-12s = $0.60-$1.80)

```python
response = session.post(f'{API_BASE_URL}/v1/sora/generate',
    json={
        'prompt': 'A time-lapse of a flower blooming in spring, cinematic lighting',
        'duration': 8  # 4 | 8 | 12 seconds
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Sora-2 Image-to-Video ($0.15/second)

```python
response = session.post(f'{API_BASE_URL}/v1/sora/image-to-video',
    json={
        'prompt': 'The scene comes to life with gentle movement',
        'image_url': 'https://example.com/scene.jpg',
        'duration': 8
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Sora-2-Pro ($0.45/second, 4-12s = $1.80-$5.40)

```python
response = session.post(f'{API_BASE_URL}/v1/sora-pro/generate',
    json={
        'prompt': 'Epic dragon flying over a medieval castle, 4K quality',
        'duration': 12,
        'size': '1792x1024'  # '1280x720' | '720x1280' | '1792x1024' | '1024x1792'
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Veo 3 Fast - Text-to-Video ($2.00)

```python
response = session.post(f'{API_BASE_URL}/v1/veo3/fast/generate',
    json={
        'prompt': 'Ocean waves crashing on a beach at sunset',
        'duration': '8s',            # '4s' | '6s' | '8s'
        'resolution': '1080p',       # '720p' | '1080p'
        'generate_audio': True
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Veo 3 Fast - Image-to-Video ($2.00)

```python
response = session.post(f'{API_BASE_URL}/v1/veo3/fast/image-to-video',
    json={
        'prompt': 'Camera pans across the landscape',
        'image_url': 'https://example.com/landscape.jpg',
        'aspect_ratio': 'auto',      # '9:16' | '16:9' | '1:1' | 'auto'
        'duration': '8s',
        'generate_audio': True
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Veo 3 Full Quality - Text-to-Video ($4.00)

```python
response = session.post(f'{API_BASE_URL}/v1/veo3/generate',
    json={
        'prompt': 'A chef preparing a gourmet meal in a professional kitchen, extreme detail',
        'duration': '8s',
        'generate_audio': True
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Veo 3.1 Fast - Text-to-Video ($2.00)

```python
response = session.post(f'{API_BASE_URL}/v1/veo3.1/fast/generate',
    json={
        'prompt': 'Futuristic city with flying cars, neon lights',
        'duration': '8s',
        'resolution': '1080p',
        'generate_audio': True
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Veo 3.1 Full Quality ($4.00)

```python
response = session.post(f'{API_BASE_URL}/v1/veo3.1/generate',
    json={
        'prompt': 'Documentary-style footage of wildlife in their natural habitat',
        'duration': '8s',
        'generate_audio': True
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Veo 3.1 - Reference-to-Video ($4.00)

Character consistency with multiple reference images:

```python
response = session.post(f'{API_BASE_URL}/v1/veo3.1/reference-to-video',
    json={
        'prompt': 'The character walks through a magical forest',
        'image_urls': [
            'https://example.com/character-front.jpg',
            'https://example.com/character-side.jpg',
            'https://example.com/character-back.jpg'
        ],
        'duration': '8s',
        'generate_audio': True
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

### Veo 3.1 - Ticker-to-Video ($4.00)

```python
response = session.post(f'{API_BASE_URL}/v1/veo3.1/ticker-to-video',
    json={
        'ticker': 'DEGEN',
        'prompt': 'Dynamic animated scene featuring the DEGEN mascot in action',
        'duration': '8s',
        'generate_audio': True
    }
)

data = response.json()
print('Video URL:', data['video_url'])
```

---

## 🆓 Free Endpoints (No Payment Required)

These endpoints never require payment - use regular `requests`:

### Check Video Status

```python
import requests

# Use regular requests (no payment)
response = requests.get(f'{API_BASE_URL}/v1/status/generation_123abc')
data = response.json()

print('Status:', data['status'])
print('Video URL:', data.get('video_url'))
```

### List Recent Generations

```python
import requests

# Use regular requests (no payment)
response = requests.get(f'{API_BASE_URL}/v1/generations')
data = response.json()

print('Recent generations:', data['generations'])
```

---

## 💡 Tips & Best Practices

### Error Handling

```python
try:
    response = session.post(f'{API_BASE_URL}/v1/llm/gpt-4o-mini',
        json={
            'messages': [{'role': 'user', 'content': 'Hello!'}]
        }
    )
    
    data = response.json()
    
    if data.get('success') == False:
        print(f"API Error: {data.get('error')} - {data.get('message')}")
    else:
        print('Success:', data['response'])
        
except Exception as error:
    print(f'Request failed: {error}')
    
    if '402' in str(error):
        print('Payment issue - check wallet balance')
```

### Reusable Helper Function

```python
def call_llm(model, prompt, **options):
    """Call any LLM model with a simple interface."""
    response = session.post(f'{API_BASE_URL}/v1/llm/{model}',
        json={
            'messages': [{'role': 'user', 'content': prompt}],
            **options
        }
    )
    
    data = response.json()
    return data['response']

# Usage
answer = call_llm('gpt-4o-mini', 'What is AI?', temperature=0.7)
print(answer)
```

### Video Generation Helper with Polling

```python
import requests
import time

def generate_video(prompt, **options):
    """Generate video and wait for completion."""
    # Start generation
    response = session.post(f'{API_BASE_URL}/v1/generate',
        json={'prompt': prompt, **options}
    )
    
    generation_id = response.json()['generation_id']
    
    # Poll for completion
    while True:
        status_response = requests.get(f'{API_BASE_URL}/v1/status/{generation_id}')
        status = status_response.json()
        
        if status['status'] == 'completed':
            return status['video_url']
        elif status['status'] == 'failed':
            raise Exception(status.get('error', 'Generation failed'))
        
        time.sleep(5)

# Usage
video_url = generate_video('A cat playing piano', model='nanobanana-video')
print('Video ready:', video_url)
```

### Batch Processing

```python
def process_batch(prompts, model='gpt-4o-mini'):
    """Process multiple prompts in sequence."""
    results = []
    
    for i, prompt in enumerate(prompts):
        print(f'Processing {i+1}/{len(prompts)}...')
        
        response = session.post(f'{API_BASE_URL}/v1/llm/{model}',
            json={'messages': [{'role': 'user', 'content': prompt}]}
        )
        
        data = response.json()
        results.append({
            'prompt': prompt,
            'response': data['response']
        })
        
    return results

# Usage
prompts = [
    'What is Python?',
    'What is JavaScript?',
    'What is Rust?'
]

results = process_batch(prompts)
for result in results:
    print(f"Q: {result['prompt']}")
    print(f"A: {result['response']}\n")
```

### Save Results to File

```python
import json

def save_generation(data, filename):
    """Save generation results to JSON file."""
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)
    print(f'Saved to {filename}')

# Usage
response = session.post(f'{API_BASE_URL}/v1/openai/images/generate',
    json={'prompt': 'A beautiful sunset', 'size': '1024x1024'}
)

data = response.json()
save_generation(data, 'image_result.json')
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

