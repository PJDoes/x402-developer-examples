"""
Polling utility for async video generation

Use this to wait for video generation to complete.
Status checks are FREE - no payment required!
"""

import time
import requests
from typing import Callable, Optional, Dict, Any


def poll_status(
    status_url: str,
    interval: int = 5,
    max_attempts: int = 60,
    on_status: Optional[Callable[[Dict[Any, Any], int, int], None]] = None
) -> Dict[Any, Any]:
    """
    Poll a status endpoint until completion
    
    Args:
        status_url: Full URL to status endpoint
        interval: Polling interval in seconds (default: 5)
        max_attempts: Maximum attempts (default: 60)
        on_status: Callback for status updates
        
    Returns:
        Final status data
        
    Raises:
        Exception: If generation fails or polling times out
    """
    attempt = 0
    
    while attempt < max_attempts:
        time.sleep(interval)
        attempt += 1
        
        response = requests.get(status_url)
        data = response.json()
        
        # Call status callback if provided
        if on_status:
            on_status(data, attempt, max_attempts)
        
        # Check if completed
        if data['status'] == 'completed':
            return data
        
        # Check if failed
        if data['status'] == 'failed':
            error_msg = data.get('error', 'Unknown error')
            raise Exception(f'Generation failed: {error_msg}')
        
        # Continue polling for: pending, in_queue, in_progress
    
    raise Exception(f'Polling timeout after {max_attempts} attempts')


def wait_for_video(
    generation_id: str,
    base_url: str,
    interval: int = 5,
    max_attempts: int = 60,
    on_status: Optional[Callable[[Dict[Any, Any], int, int], None]] = None
) -> Dict[Any, Any]:
    """
    Wait for video generation to complete
    
    Args:
        generation_id: Generation ID from generate response
        base_url: API base URL
        interval: Polling interval in seconds (default: 5)
        max_attempts: Maximum attempts (default: 60)
        on_status: Optional custom status callback
        
    Returns:
        Final video data with URL
    """
    status_url = f"{base_url}/v1/status/{generation_id}"
    
    print('⏳ Waiting for video generation...')
    
    def default_on_status(data: Dict[Any, Any], attempt: int, max_attempts: int):
        status_emoji = {
            'pending': '⏸️',
            'in_queue': '🔄',
            'in_progress': '🎬',
            'completed': '✅',
            'failed': '❌'
        }.get(data['status'], '❓')
        
        print(f"{status_emoji} [{attempt}/{max_attempts}] Status: {data['status']}")
        
        # Call custom callback if provided
        if on_status:
            on_status(data, attempt, max_attempts)
    
    return poll_status(
        status_url,
        interval=interval,
        max_attempts=max_attempts,
        on_status=default_on_status
    )

