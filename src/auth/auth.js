import { getSupabaseClient } from '../shared/storage.js';

const supabase = getSupabaseClient();

/**
 * Sign up with email and password using Supabase Auth.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ error: string | null }>}
 */
export async function signUp(email, password) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    // Generic message for security reasons
    return { error: 'Unable to create account. Please check your details.' };
  }
  return { error: null };
}

/**
 * Sign in with email and password using Supabase Auth.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ error: string | null }>}
 */
export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: 'Invalid email or password.' };
  }
  return { error: null };
}

/**
 * Get current Supabase session.
 *
 * @returns {Promise<import('@supabase/supabase-js').Session | null>}
 */
export async function getCurrentSession() {
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

/**
 * Sign out current user.
 *
 * @returns {Promise<void>}
 */
export async function signOut() {
  await supabase.auth.signOut();
}

function setError(message) {
  const el = document.querySelector('.auth-error');
  if (!el) return;
  el.textContent = message ?? '';
}

function getFormValues(form) {
  const formData = new FormData(form);
  return {
    email: String(formData.get('email') || '').trim(),
    password: String(formData.get('password') || ''),
    confirmPassword: String(formData.get('confirmPassword') || ''),
  };
}

function attachLoginHandler() {
  const form = document.querySelector('.auth-form');
  if (!form || !window.location.pathname.endsWith('login.html')) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setError('');

    const { email, password } = getFormValues(form);
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      return;
    }

    window.location.href = '/admin/admin.html';
  });
}

function attachRegisterHandler() {
  const form = document.querySelector('.auth-form');
  if (!form || !window.location.pathname.endsWith('register.html')) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setError('');

    const { email, password, confirmPassword } = getFormValues(form);
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    const result = await signUp(email, password);
    if (result.error) {
      setError(result.error);
      return;
    }

    window.location.href = './login.html';
  });
}

async function redirectAuthenticatedUsers() {
  const isAuthPage =
    window.location.pathname.endsWith('login.html') ||
    window.location.pathname.endsWith('register.html');
  if (!isAuthPage) return;

  const session = await getCurrentSession();
  if (session) {
    window.location.href = '/admin/admin.html';
  }
}

redirectAuthenticatedUsers().then(() => {
  attachLoginHandler();
  attachRegisterHandler();
});


