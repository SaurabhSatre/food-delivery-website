// Backend URL configuration with fallback
export const getBackendUrl = () => {
  // Check if environment variable is set
  if (process.env.REACT_APP_BACKEND_SERVER) {
    return process.env.REACT_APP_BACKEND_SERVER;
  }
  
  // Fallback to your deployed backend URL
  return 'https://food-delivery-website-backend-nu.vercel.app';
};

// API request helper with retry logic
export const apiRequest = async (endpoint, options = {}, retryAttempt = 0) => {
  try {
    const backendUrl = getBackendUrl();
    const url = `${backendUrl}${endpoint}`;
    
    console.log(`Making API request to: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    
    // Implement retry logic with exponential backoff
    if (retryAttempt < 2) {
      const delay = Math.pow(2, retryAttempt) * 1000; // 1s, 2s
      console.log(`Retrying API request in ${delay}ms... (attempt ${retryAttempt + 1}/3)`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return apiRequest(endpoint, options, retryAttempt + 1);
    }
    
    throw error;
  }
};
