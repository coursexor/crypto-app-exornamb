const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function getProfile(token) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}/api/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal: controller.signal
    });
    
    if (!response.ok) {
      let errData;
      try { errData = await response.json(); } catch (e) { errData = {error: e.message}; }
      const error = new Error(errData.error || 'Failed to fetch profile');
      error.status = response.status;
      throw error;
    }
    
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function patchProfile(token, updates) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}/api/profile`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates),
      signal: controller.signal
    });

    if (!response.ok) {
      let errData;
      try { errData = await response.json(); } catch (e) { errData = {error: e.message}; }
      const error = new Error(errData.error || 'Failed to update profile');
      error.status = response.status;
      error.data = errData;
      throw error;
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getGainers() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}/api/crypto/gainers`, {
      method: 'GET',
      signal: controller.signal
    });
    
    if (!response.ok) {
      const error = new Error('Failed to fetch gainers');
      error.status = response.status;
      throw error;
    }
    
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getNewListings() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}/api/crypto/new`, {
      method: 'GET',
      signal: controller.signal
    });
    
    if (!response.ok) {
      const error = new Error('Failed to fetch new listings');
      error.status = response.status;
      throw error;
    }
    
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getPrices() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}/api/crypto`, {
      method: 'GET',
      signal: controller.signal
    });

    if (!response.ok) {
      let errData;
      try { errData = await response.json(); } catch (e) { errData = {error: e.message}; }
      const error = new Error(errData.error || 'Failed to fetch prices');
      error.status = response.status;
      throw error;
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
