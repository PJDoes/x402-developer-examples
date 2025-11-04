/**
 * Polling utility for async video generation
 * 
 * Use this to wait for video generation to complete.
 * Status checks are FREE - no payment required!
 */

/**
 * Poll a status endpoint until completion
 * @param {string} statusUrl - Full URL to status endpoint
 * @param {object} options - Polling options
 * @param {number} options.interval - Polling interval in ms (default: 5000)
 * @param {number} options.maxAttempts - Maximum attempts (default: 60)
 * @param {function} options.onStatus - Callback for status updates
 * @returns {Promise<object>} Final status data
 */
export async function pollStatus(statusUrl, options = {}) {
  const {
    interval = 5000,
    maxAttempts = 60,
    onStatus = null
  } = options;
  
  let attempt = 0;
  
  while (attempt < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, interval));
    attempt++;
    
    const response = await fetch(statusUrl);
    const data = await response.json();
    
    // Call status callback if provided
    if (onStatus) {
      onStatus(data, attempt, maxAttempts);
    }
    
    // Check if completed
    if (data.status === 'completed') {
      return data;
    }
    
    // Check if failed
    if (data.status === 'failed') {
      throw new Error('Generation failed: ' + (data.error || 'Unknown error'));
    }
    
    // Continue polling for: pending, in_queue, in_progress
  }
  
  throw new Error(`Polling timeout after ${maxAttempts} attempts`);
}

/**
 * Wait for video generation to complete
 * @param {string} generationId - Generation ID from generate response
 * @param {string} baseUrl - API base URL
 * @param {object} options - Polling options
 * @returns {Promise<object>} Final video data with URL
 */
export async function waitForVideo(generationId, baseUrl, options = {}) {
  const statusUrl = `${baseUrl}/v1/status/${generationId}`;
  
  console.log('⏳ Waiting for video generation...');
  
  return await pollStatus(statusUrl, {
    ...options,
    onStatus: (data, attempt, maxAttempts) => {
      const statusEmoji = {
        'pending': '⏸️',
        'in_queue': '🔄',
        'in_progress': '🎬',
        'completed': '✅',
        'failed': '❌'
      }[data.status] || '❓';
      
      console.log(`${statusEmoji} [${attempt}/${maxAttempts}] Status: ${data.status}`);
      
      // Call custom callback if provided
      if (options.onStatus) {
        options.onStatus(data, attempt, maxAttempts);
      }
    }
  });
}

