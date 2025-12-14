/**
 * Test Supabase Connection
 * 
 * This file tests the connection to Supabase.
 * Run this in browser console or as a module.
 * 
 * Usage:
 * 1. Make sure .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * 2. Import this file in your HTML or run in console
 */

import { createClient } from '@supabase/supabase-js';

/**
 * Test Supabase connection
 * @returns {Promise<Object>} Connection test result
 */
export async function testSupabaseConnection() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Check if environment variables are set
  if (!supabaseUrl || !supabaseKey) {
    return {
      success: false,
      error: 'Missing environment variables',
      details: {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
      },
      message: 'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file',
    };
  }

  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test connection by trying to query a table
    // This will fail if table doesn't exist, but that means connection is working!
    const { data, error } = await supabase.from('channels').select('count').limit(1);

    // If we get here, connection is successful
    // Error codes that indicate connection works but table doesn't exist:
    // PGRST116: relation does not exist
    // PGRST205: table not found in schema cache
    if (error && (error.code === 'PGRST116' || error.code === 'PGRST205')) {
      // Table doesn't exist - but connection is working!
      return {
        success: true,
        message: '✅ Supabase connection successful! (Tables not created yet)',
        details: {
          url: supabaseUrl,
          keyPrefix: supabaseKey.substring(0, 20) + '...',
          note: 'Connection works! Proceed to Task 0.1.4: Database Schema Setup',
        },
      };
    }

    if (error) {
      // Other errors might indicate connection issues
      return {
        success: false,
        error: error.message,
        code: error.code,
        message: 'Connection test failed',
        details: {
          url: supabaseUrl,
        },
      };
    }

    return {
      success: true,
      message: '✅ Supabase connection successful!',
      details: {
        url: supabaseUrl,
        data: data,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to connect to Supabase',
      details: {
        url: supabaseUrl,
      },
    };
  }
}

// Auto-run if imported directly
if (import.meta.hot) {
  // In development, log result
  testSupabaseConnection().then(result => {
    if (result.success) {
      console.log('✅', result.message);
    } else {
      console.error('❌', result.message, result.error || '');
    }
  });
}

