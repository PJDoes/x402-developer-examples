"""
x402 API Example: Image Generation with OpenAI GPT-Image-1

This example shows how to generate high-quality images using
OpenAI's GPT-Image-1 with automatic USDC payments.

Prerequisites:
1. pip install -r requirements.txt
2. python generate-wallet.js (get wallet address)
3. Fund wallet with USDC on Base
4. Create .env file with PRIVATE_KEY

Run: python python/image_example.py
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
        print('🎨 x402 Image Generation Example\n')
        print('=' * 60)
        
        # 1. Set up wallet with x402
        account = Account.from_key(PRIVATE_KEY)
        session = x402_requests(account)
        
        print(f'\n💰 Wallet: {account.address}')
        print('💸 Cost: $0.30 USDC')
        print('🔗 Network: Base')
        print('🤖 Model: OpenAI GPT-Image-1')
        
        # 2. Make request - x402 handles payment automatically
        print('\n📤 Generating image...\n')
        
        response = session.post(
            f'{API_BASE_URL}/v1/openai/images/generate',
            json={
                'prompt': 'Cyberpunk koala DJ at neon-lit rooftop party overlooking futuristic city',
                'size': '1024x1024',
                'quality': 'high',
                'background': 'opaque'
            }
        )
        
        data = response.json()
        
        # 3. Display response
        print('✅ Image generated!\n')
        print('=' * 60)
        
        if 'images' in data and len(data['images']) > 0:
            print('🖼️  Image URL:')
            print(data['images'][0]['url'])
            
            if 'revised_prompt' in data['images'][0]:
                print('\n📝 Revised Prompt:')
                print(data['images'][0]['revised_prompt'])
        else:
            print(str(data))
        
        print('=' * 60)
        
        print('\n💡 How x402 worked:')
        print('1. ✅ Initial request sent → Server: 402 Payment Required')
        print('2. ✅ x402 client signed $0.30 USDC payment on Base')
        print('3. ✅ Retried with X-PAYMENT header')
        print('4. ✅ Server verified payment & processed request')
        print('5. ✅ Payment settled in ~2 seconds\n')
        
    except Exception as error:
        print(f'❌ Error: {str(error)}')
        
        if '402' in str(error):
            print('\n💡 Payment issue - check wallet balance:')
            print('   - Ensure wallet has USDC on Base network')
            print('   - Minimum: $0.30 USDC for this request\n')


if __name__ == '__main__':
    main()

