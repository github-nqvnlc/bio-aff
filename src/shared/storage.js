import { createClient } from '@supabase/supabase-js';
import { SUPABASE_TABLES } from './constants.js';

let cachedClient = null;

/**
 * Create (or reuse) a Supabase client instance.
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient} Supabase client
 * @throws {Error} If required environment variables are missing.
 */
export function getSupabaseClient() {
  if (cachedClient) return cachedClient;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)',
    );
  }

  cachedClient = createClient(url, anonKey);
  return cachedClient;
}

/**
 * Simple helper to fetch a small sample of channels.
 * This is mainly for initial wiring and health checks.
 *
 * @returns {Promise<{ data: any[] | null, error: import('@supabase/supabase-js').PostgrestError | null }>}
 */
export async function fetchSampleChannels() {
  const supabase = getSupabaseClient();
  return supabase
    .from(SUPABASE_TABLES.CHANNELS)
    .select('id, name, followers')
    .limit(5);
}

/**
 * Save (upsert) a channel into the `channels` table.
 *
 * @param {{ tiktokId: string, name: string, avatar?: string, followers?: number, bio?: string }} channel
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function saveChannel(channel) {
  try {
    if (!channel || !channel.tiktokId || !channel.name) {
      return { success: false, error: 'Invalid channel payload' };
    }

    const supabase = getSupabaseClient();

    const payload = {
      tiktok_id: channel.tiktokId,
      name: channel.name,
      avatar_url: channel.avatar || null,
      followers: typeof channel.followers === 'number' ? channel.followers : null,
      bio: channel.bio || null,
    };

    const { error } = await supabase
      .from(SUPABASE_TABLES.CHANNELS)
      .upsert(payload, { onConflict: 'tiktok_id' });

    if (error) {
      return { success: false, error: error.message || 'Failed to save channel' };
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

/**
 * Add a new category.
 *
 * @param {{ name: string, description?: string }} input
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function addCategory(input) {
  try {
    if (!input || !input.name || !input.name.trim()) {
      return { success: false, error: 'Category name is required' };
    }

    const supabase = getSupabaseClient();
    const payload = {
      name: input.name.trim(),
      description: input.description ? input.description.trim() : null,
    };

    const { error } = await supabase.from(SUPABASE_TABLES.CATEGORIES).insert(payload);
    if (error) {
      return { success: false, error: error.message || 'Failed to add category' };
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

/**
 * Get all categories.
 *
 * @returns {Promise<{ success: boolean, data?: any[], error?: string }>}
 */
export async function getCategories() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.CATEGORIES)
      .select('id, name, description')
      .order('created_at', { ascending: true });

    if (error) {
      return { success: false, error: error.message || 'Failed to fetch categories' };
    }

    return { success: true, data: data || [] };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

/**
 * Update an existing category.
 *
 * @param {number} id
 * @param {{ name?: string, description?: string }} input
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function updateCategory(id, input) {
  try {
    if (!id) {
      return { success: false, error: 'Category id is required' };
    }

    const supabase = getSupabaseClient();
    const payload = {};

    if (input.name !== undefined) {
      const trimmed = input.name.trim();
      if (!trimmed) {
        return { success: false, error: 'Category name cannot be empty' };
      }
      payload.name = trimmed;
    }

    if (input.description !== undefined) {
      payload.description = input.description ? input.description.trim() : null;
    }

    const { error } = await supabase
      .from(SUPABASE_TABLES.CATEGORIES)
      .update(payload)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message || 'Failed to update category' };
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

/**
 * Delete a category by id.
 *
 * @param {number} id
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function deleteCategory(id) {
  try {
    if (!id) {
      return { success: false, error: 'Category id is required' };
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from(SUPABASE_TABLES.CATEGORIES)
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message || 'Failed to delete category' };
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}


