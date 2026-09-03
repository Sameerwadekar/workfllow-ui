import axios from 'axios';

export function createApiClient(baseURL, options = {}) {
  const client = axios.create({
    baseURL,
    timeout: options.timeout,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return client;
}

export default createApiClient;
