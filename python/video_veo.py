"""
x402 API Example: Video Generation with Google Veo 3 Fast

This example shows premium video generation with Veo 3.
Higher quality than VideoGenAPI, but costs more.

Prerequisites:
1. pip install -r requirements.txt
2. python generate-wallet.js (get wallet address)
3. Fund wallet with USDC on Base
4. Create .env file with PRIVATE_KEY

Run: python python/video_veo.py
"""

from x402.clients.requests import x402_requests
from eth_account import Account
import os
from dotenv import load_dotenv

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
        print('🎬 x402 Veo 3 Fast Example\n')
        print('=' * 60)
        
        # 1. Set up wallet with x402
        account = Account.from_key(PRIVATE_KEY)
        session = x402_requests(account)
        
        print(f'\n💰 Wallet: {account.address}')
        print('💸 Cost: $2.00 USDC')
        print('🔗 Network: Base')
        print('🤖 Model: Google Veo 3 Fast')
        print('⭐ Quality: Premium')
        
        # 2. Generate video - PAID REQUEST ($2.00)
        print('\n📤 Generating video...\n')
        
        response = session.post(
            f'{API_BASE_URL}/v1/veo3/fast/generate',
            json={
                'prompt': 'Epic ocean waves crashing with dramatic lightning storm approaching',
                'aspect_ratio': '16:9',
                'duration': '8s',
                'resolution': '1080p',
                'generate_audio': True
            }
        )
        
        data = response.json()
        
        # 3. Display response
        print('✅ Video generated!\n')
        print('=' * 60)
        
        if 'video_url' in data:
            print('🎬 Video URL:')
            print(data['video_url'])
            
            if 'duration' in data:
                print(f"\n📋 Duration: {data['duration']}")
            if 'resolution' in data:
                print(f"📺 Resolution: {data['resolution']}")
        else:
            print(str(data))
        
        print('=' * 60)
        
        print('\n💡 How x402 worked:')
        print('1. ✅ Initial request sent → Server: 402 Payment Required')
        print('2. ✅ x402 client signed $2.00 USDC payment on Base')
        print('3. ✅ Retried with X-PAYMENT header')
        print('4. ✅ Server verified payment & processed request')
        print('5. ✅ Payment settled in ~2 seconds\n')
        
        print('💡 Note: Veo 3 Fast is premium quality')
        print('   - Better motion and coherence than VideoGenAPI')
        print('   - Supports audio generation')
        print('   - 4-8 second videos at 720p or 1080p\n')
        
    except Exception as error:
        print(f'❌ Error: {str(error)}')
        
        if '402' in str(error):
            print('\n💡 Payment issue - check wallet balance:')
            print('   - Ensure wallet has USDC on Base network')
            print('   - Minimum: $2.00 USDC for this request\n')


if __name__ == '__main__':
    main()

