"""
x402 API Example: Video Generation with VideoGenAPI (MultiModelAPI)

This example shows how to:
1. Generate AI video with USDC payment ($0.15)
2. Poll status endpoint (FREE - no payment)
3. Get the final video URL

VideoGenAPI includes 9 models:
- sora-2, kling_25, higgsfield_v1, nanobanana-video,
  pixverse, ltxv-2, ltxv-13b, seedance, wan-25

Prerequisites:
1. pip install -r requirements.txt
2. python generate-wallet.js (get wallet address)
3. Fund wallet with USDC on Base
4. Create .env file with PRIVATE_KEY

Run: python python/video_videogenapi.py
"""

from x402.clients.requests import x402_requests
from eth_account import Account
import os
import sys
from dotenv import load_dotenv

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from python.utils.polling import wait_for_video

# Load environment variables
load_dotenv()

# Configuration
API_BASE_URL = os.getenv('API_BASE_URL', 'https://beatsx402.ai')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')

if not PRIVATE_KEY:
    print('❌ Error: PRIVATE_KEY not found in .env file')
    print('\n📝 Setup:')
    print('1. Run: node generate-wallet.js')
    print('2. Copy .env.example to .env')
    print('3. Add your PRIVATE_KEY to .env\n')
    exit(1)


def main():
    try:
        print('🎬 x402 VideoGenAPI Example (MultiModelAPI)\n')
        print('=' * 60)
        
        # 1. Set up wallet with x402
        account = Account.from_key(PRIVATE_KEY)
        session = x402_requests(account)
        
        print(f'\n💰 Wallet: {account.address}')
        print('💸 Cost: $0.15 USDC (generation only)')
        print('🆓 Status checks: FREE')
        print('🔗 Network: Base')
        print('🤖 Model: sora-2 (10 second video)')
        
        # 2. Generate video - PAID REQUEST ($0.15)
        print('\n📤 Generating video...\n')
        
        response = session.post(
            f'{API_BASE_URL}/v1/generate',
            json={
                'model': 'sora-2',
                'prompt': 'Neon-lit cyberpunk city with flying vehicles zooming through holographic billboards',
                'duration': 10,
                'resolution': '720p'
            }
        )
        
        result = response.json()
        
        if 'generation_id' not in result:
            raise Exception(f'No generation_id in response: {result}')
        
        print('✅ Generation started!')
        print(f"📝 Generation ID: {result['generation_id']}\n")
        
        # 3. Wait for completion - FREE STATUS CHECKS
        print('💡 Polling status (FREE - no payment required)...\n')
        
        video = wait_for_video(
            result['generation_id'],
            API_BASE_URL,
            interval=5,      # Check every 5 seconds
            max_attempts=60  # 5 minutes max
        )
        
        # 4. Display final video
        print('\n🎉 Video generation complete!\n')
        print('=' * 60)
        print('🎬 Video URL:')
        print(video['video_url'])
        print('\n📋 Details:')
        model_info = video.get('model', {})
        print(f"   Model: {model_info.get('name') or model_info.get('key') or 'N/A'}")
        print(f"   Duration: {video.get('duration', 'N/A')}s")
        print(f"   Resolution: {video.get('resolution', 'N/A')}")
        print(f"   Processing time: {video.get('processing_time', 'N/A')}s")
        print('=' * 60)
        
        print('\n💡 How x402 worked:')
        print('1. ✅ Paid $0.15 USDC for video generation')
        print('2. ✅ Got generation_id immediately')
        print('3. ✅ Polled /v1/status/:id (FREE) every 5 seconds')
        print('4. ✅ Video completed - got public URL\n')
        
    except Exception as error:
        print(f'❌ Error: {str(error)}')
        
        if '402' in str(error):
            print('\n💡 Payment issue - check wallet balance:')
            print('   - Ensure wallet has USDC on Base network')
            print('   - Minimum: $0.15 USDC for this request\n')


if __name__ == '__main__':
    main()

