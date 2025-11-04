"""
x402 API Example: Video Generation with OpenAI Sora-2

This example shows how to use OpenAI's Sora-2 model.
Price scales with duration ($0.15/second).

Prerequisites:
1. pip install -r requirements.txt
2. python generate-wallet.js (get wallet address)
3. Fund wallet with USDC on Base
4. Create .env file with PRIVATE_KEY

Run: python python/video_sora.py
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
        print('🎬 x402 Sora-2 Example\n')
        print('=' * 60)
        
        # 1. Set up wallet with x402
        account = Account.from_key(PRIVATE_KEY)
        session = x402_requests(account)
        
        duration = 8  # seconds
        cost = duration * 0.15  # $0.15/second
        
        print(f'\n💰 Wallet: {account.address}')
        print(f'💸 Cost: ${cost:.2f} USDC ({duration}s @ $0.15/s)')
        print('🔗 Network: Base')
        print('🤖 Model: OpenAI Sora-2')
        
        # 2. Generate video - PAID REQUEST
        print('\n📤 Generating video...\n')
        
        response = session.post(
            f'{API_BASE_URL}/v1/sora/generate',
            json={
                'prompt': 'Cinematic shot of glowing jellyfish floating through neon-lit underwater caves',
                'duration': duration,
                'size': '1280x720'
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
                print(f"\n📋 Duration: {data['duration']}s")
            if 'size' in data:
                print(f"📺 Size: {data['size']}")
        else:
            print(str(data))
        
        print('=' * 60)
        
        print('\n💡 How x402 worked:')
        print('1. ✅ Initial request sent → Server: 402 Payment Required')
        print(f'2. ✅ x402 client signed ${cost:.2f} USDC payment on Base')
        print('3. ✅ Retried with X-PAYMENT header')
        print('4. ✅ Server verified payment & processed request')
        print('5. ✅ Payment settled in ~2 seconds\n')
        
        print('💡 Sora-2 Pricing:')
        print('   - $0.15 per second of video')
        print('   - 4s video = $0.60')
        print('   - 8s video = $1.20')
        print('   - 12s video = $1.80\n')
        
    except Exception as error:
        print(f'❌ Error: {str(error)}')
        
        if '402' in str(error):
            print('\n💡 Payment issue - check wallet balance:')
            print('   - Ensure wallet has USDC on Base network')
            print('   - Check that wallet has enough for request\n')


if __name__ == '__main__':
    main()

