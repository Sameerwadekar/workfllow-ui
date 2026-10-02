/**
 * Safely parses the payload of a JWT string.
 * Supports URL-safe base64 and standard base64 with proper UTF-8 decoding.
 */
export const parseJwtPayload = (token) => {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
};

/**
 * Checks if a JWT token is expired or will expire within a specified buffer window.
 * @param {string} token - The JWT string to evaluate
 * @param {number} bufferSeconds - Safety buffer before actual expiration (defaults to 60 seconds)
 * @returns {boolean} True if expired or invalid; false if still valid
 */
export const isTokenExpired = (token, bufferSeconds = 60) => {
  if (!token) return true;
  const payload = parseJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') {
    return true;
  }
  const currentTimeMs = Date.now();
  const expirationTimeMs = payload.exp * 1000;
  const bufferMs = bufferSeconds * 1000;

  // Expired if current time + buffer is greater than or equal to expiration time
  return currentTimeMs + bufferMs >= expirationTimeMs;
};
