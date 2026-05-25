/**
 * Hashes a message using SHA-256 via Web Crypto API.
 * Includes a lightweight fallback for SSR environments if Crypto API is not available.
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const cryptoObj = typeof window !== 'undefined' ? window.crypto : (globalThis.crypto as any);
  
  if (!cryptoObj || !cryptoObj.subtle) {
    // Fallback hash for build/pre-rendering environments
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }
  
  const hashBuffer = await cryptoObj.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a random cryptographic salt.
 */
export function generateSalt(length = 16): string {
  const cryptoObj = typeof window !== 'undefined' ? window.crypto : (globalThis.crypto as any);
  
  if (!cryptoObj || !cryptoObj.getRandomValues) {
    return Math.random().toString(36).substring(2, 2 + length);
  }
  
  const array = new Uint8Array(length);
  cryptoObj.getRandomValues(array);
  return Array.from(array, dec => dec.toString(16).padStart(2, '0')).join('').substring(0, length);
}

/**
 * Hashes a password with a specific salt.
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  return sha256(password + salt);
}
