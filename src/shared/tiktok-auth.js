import { safeParseJSON } from './utils.js';

const STORAGE_KEY = 'bio_aff_tiktok_session';

/**
 * Mock TikTok login.
 * In Phase 1 this returns static mock data and stores it in localStorage.
 *
 * @returns {Promise<{ tiktokId: string, name: string, avatar: string, followers: number, bio: string }>}
 */
export async function login() {
  // Simulate async OAuth flow delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const mockChannel = {
    tiktokId: 'mock_tiktok_id_123',
    name: 'Mock TikTok Channel',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=128&h=128',
    followers: 123456,
    bio: 'This is a mock TikTok channel used for development.',
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockChannel));
  } catch {
    // If storage fails, we still return the mock data.
  }

  return mockChannel;
}

/**
 * Get current channel session from localStorage.
 *
 * @returns {{ tiktokId: string, name: string, avatar: string, followers: number, bio: string } | null}
 */
export function getChannel() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return safeParseJSON(raw, null);
}

/**
 * Clear current session from localStorage.
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}


