# Beats x402 API Endpoints Quick Reference

Complete list of all available Beats AI endpoints with pricing and parameters.

**Live Playground**: [beatsx402.ai](https://beatsx402.ai)

---

## 🤖 LLM Chat Endpoints

Base path: `/v1/llm/`

| Endpoint | Cost | Parameters |
|----------|------|------------|
| `POST /v1/llm/gpt-4o-mini` | $0.01 | `messages`, `temperature?`, `system_message?` |
| `POST /v1/llm/gpt-5-mini` | $0.02 | `messages`, `reasoning_effort?`, `system_message?` |
| `POST /v1/llm/claude-4.5` | $0.05 | `messages`, `temperature?`, `system_message?` |
| `POST /v1/llm/grok-4` | $0.05 | `messages`, `temperature?`, `system_message?` |
| `POST /v1/llm/grok-fast` | $0.01 | `messages`, `temperature?`, `system_message?` |
| `POST /v1/llm/gemini-2.5` | $0.01 | `messages`, `temperature?`, `system_message?` |

**Common Parameters:**
- `messages` (required): Array of message objects with `role` and `content`
- `system_message` (optional): System message to set AI behavior
- `temperature` (optional): 0.0-2.0, controls randomness (default: 0.8)
- `reasoning_effort` (optional): 'low' | 'medium' | 'high' (GPT-5 Mini only)

---

## 🎨 Image Generation Endpoints

### OpenAI GPT-Image-1

| Endpoint | Cost | Description |
|----------|------|-------------|
| `POST /v1/openai/images/generate` | $0.30 | Generate high-quality images |
| `POST /v1/openai/images/edit` | $0.50 | Image-to-image with reference images |
| `POST /v1/openai/ticker-to-image` | $0.50 | Generate from crypto ticker |

**Generate Parameters:**
- `prompt` (required): Image description (max 1000 chars)
- `size` (optional): '1024x1024' | '1536x1024' | '1024x1536'
- `quality` (optional): 'low' | 'medium' | 'high' | 'auto'
- `background` (optional): 'transparent' | 'opaque'

**Edit Parameters:**
- `prompt` (required): Editing instructions
- `image_urls` (required): Array of 1-4 reference image URLs
- `aspect_ratio` (optional): '1:1' | '16:9' | '9:16'
- `input_fidelity` (optional): 'low' | 'high'

### Google Nano Banana

| Endpoint | Cost | Description |
|----------|------|-------------|
| `POST /v1/nanobanana/generate` | $0.07/img | Fast generation (5-15s) |
| `POST /v1/nanobanana/edit` | $0.07/img | Fast image-to-image |
| `POST /v1/nanobanana/ticker-to-image` | $0.07/img | Fast token-based generation |

**Generate Parameters:**
- `prompt` (required): Image description
- `aspect_ratio` (optional): '1:1' | '16:9' | '9:16' | '21:9' | '4:3' | '3:2' | '2:3' | '5:4' | '4:5' | '3:4'
- `num_images` (optional): 1-4 (cost multiplies)
- `output_format` (optional): 'jpeg' | 'png' | 'webp'

---

## 🎬 Video Generation Endpoints

### VideoGenAPI (MultiModelAPI) - $0.15

| Endpoint | Cost | Description |
|----------|------|-------------|
| `POST /v1/generate` | $0.15 | Generate video with 9 AI models |
| `GET /v1/status/:generation_id` | **FREE** | Check generation status |
| `GET /v1/generations` | **FREE** | List recent generations |

**Generate Parameters:**
- `model` (optional): 'sora-2' | 'kling_25' | 'higgsfield_v1' | 'nanobanana-video' | 'pixverse' | 'ltxv-2' | 'ltxv-13b' | 'seedance' | 'wan-25'
- `prompt` (required): Video description (max 1000 chars)
- `image_url` (optional): Source image for image-to-video
- `duration` (optional): 5-60 seconds (varies by model)
- `resolution` (optional): '480p' | '720p' | '1080p' | '4K'
- `aspect_ratio` (optional): '16:9' | '4:3' | '1:1' | '9:21' (text-to-video only)

**Status Response:**
- `status`: 'pending' | 'in_queue' | 'in_progress' | 'completed' | 'failed'
- `video_url`: Available when status is 'completed'

### Google Veo 3

| Endpoint | Cost | Description |
|----------|------|-------------|
| `POST /v1/veo3/fast/generate` | $2.00 | Fast text-to-video |
| `POST /v1/veo3/fast/image-to-video` | $2.00 | Fast image-to-video |
| `POST /v1/veo3/generate` | $4.00 | Full quality text-to-video |
| `POST /v1/veo3/image-to-video` | $4.00 | Full quality image-to-video |

**Parameters:**
- `prompt` (required): Video description
- `image_url` (required for I2V): Source image URL
- `aspect_ratio` (optional): '9:16' | '16:9' | '1:1' | 'auto' (I2V)
- `duration` (optional): '4s' | '6s' | '8s'
- `resolution` (optional): '720p' | '1080p' (fast only)
- `generate_audio` (optional): true | false

### Google Veo 3.1

| Endpoint | Cost | Description |
|----------|------|-------------|
| `POST /v1/veo3.1/fast/generate` | $2.00 | Fast text-to-video (improved) |
| `POST /v1/veo3.1/fast/image-to-video` | $2.00 | Fast image-to-video (improved) |
| `POST /v1/veo3.1/generate` | $4.00 | State-of-the-art text-to-video |
| `POST /v1/veo3.1/image-to-video` | $4.00 | State-of-the-art image-to-video |
| `POST /v1/veo3.1/reference-to-video` | $4.00 | Multi-reference character consistency |
| `POST /v1/veo3.1/ticker-to-video` | $4.00 | Generate from crypto ticker |

**Reference-to-Video Parameters:**
- `prompt` (required): Video description
- `image_urls` (required): Array of 1-3 reference images
- `duration` (optional): '8s'
- `generate_audio` (optional): true | false

### OpenAI Sora

| Endpoint | Cost | Description |
|----------|------|-------------|
| `POST /v1/sora/generate` | $0.15/sec | Text-to-video (4-12s) |
| `POST /v1/sora/image-to-video` | $0.15/sec | Image-to-video (4-12s) |
| `POST /v1/sora-pro/generate` | $0.45/sec | Premium text-to-video |
| `POST /v1/sora-pro/image-to-video` | $0.45/sec | Premium image-to-video |

**Parameters:**
- `prompt` (required): Video/animation description
- `image_url` (required for I2V): Source image (must match size)
- `duration` (optional): 4 | 8 | 12 seconds
- `size` (optional): '1280x720' | '720x1280' | '1792x1024' | '1024x1792' (Pro only)

---

## 💸 Cost Summary

| Service Category | Price Range |
|-----------------|-------------|
| **LLM Chat** | $0.01 - $0.05 |
| **Image Generation** | $0.07 - $0.50 |
| **VideoGenAPI** | $0.15 (fixed) |
| **Premium Video** | $0.60 - $5.40 |
| **Status Checks** | FREE |

---

## 🔗 Base URL

All examples use:

```
https://beatsx402.ai
```

- **Production**: https://beatsx402.ai
- **Playground**: https://beatsx402.ai/ (interactive testing)
- **Development**: http://localhost:4000 (if running locally)

---

## 📝 Response Formats

### Success Response
```json
{
  "success": true,
  "response": "...",  // or other data fields
  "model": "...",
  "provider": "..."
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

### Payment Required (402)
```json
{
  "x402Version": 1,
  "error": "X-PAYMENT header is required",
  "accepts": [{
    "scheme": "exact",
    "network": "base",
    "maxAmountRequired": "100000",
    "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "payTo": "0xWalletAddress"
  }]
}
```

---

## 🆓 Free Endpoints

These endpoints **never require payment**:

- `GET /v1/status/:generation_id` - Check VideoGenAPI status
- `GET /v1/generations` - List VideoGenAPI generations
- `GET /health` - Server health check

Use regular `fetch` or `requests` - no x402 client needed!

---

For complete documentation, see the [main README](../README.md).

