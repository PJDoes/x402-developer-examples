"""
x402 API Example: LLM Chat with GPT-4o Mini

This example shows how to use x402 payment protocol to call
LLM APIs with automatic USDC payments on Base network.

Prerequisites:
1. pip install -r requirements.txt
2. python generate-wallet.js (get wallet address)
3. Fund wallet with USDC on Base
4. Create .env file with PRIVATE_KEY

Run: python python/llm_example.py
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
        print('🤖 x402 LLM Chat Example\n')
        print('=' * 60)
        
        # 1. Set up wallet with x402
        account = Account.from_key(PRIVATE_KEY)
        session = x402_requests(account)
        
        print(f'\n💰 Wallet: {account.address}')
        print('💸 Cost: $0.01 USDC')
        print('🔗 Network: Base')
        
        # 2. Make request - x402 handles payment automatically
        print('\n📤 Sending request...\n')
        
        response = session.post(
            f'{API_BASE_URL}/v1/llm/gpt-4o-mini',
            json={
                'messages': [
                    {'role': 'user', 'content': 'Explain the x402 payment protocol in one sentence.'}
                ],
                'temperature': 0.8
            }
        )
        
        data = response.json()
        
        # 3. Display response
        print('✅ Response received!\n')
        print('=' * 60)
        print(data.get('response') or data.get('message') or str(data))
        print('=' * 60)
        
        print('\n💡 How x402 worked:')
        print('1. ✅ Initial request sent → Server: 402 Payment Required')
        print('2. ✅ x402 client signed $0.01 USDC payment on Base')
        print('3. ✅ Retried with X-PAYMENT header')
        print('4. ✅ Server verified payment & processed request')
        print('5. ✅ Payment settled in ~2 seconds\n')
        
    except Exception as error:
        print(f'❌ Error: {str(error)}')
        
        if '402' in str(error):
            print('\n💡 Payment issue - check wallet balance:')
            print('   - Ensure wallet has USDC on Base network')
            print('   - Minimum: $0.01 USDC for this request\n')


if __name__ == '__main__':
    main()

