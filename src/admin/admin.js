import { login, getChannel, logout } from '../shared/tiktok-auth.js';
import { getCurrentSession, signOut } from '../auth/auth.js';
import { renderChannelInfo } from './components/channel-info.js';
import { saveChannel } from '../shared/storage.js';
import { initCategoryForm } from './components/category-form.js';
import { initCategoryList } from './components/category-list.js';

function attachTikTokAuthHandlers() {
  const loginButton = document.getElementById('tiktok-login-button');
  if (!loginButton) return;

  loginButton.addEventListener('click', async () => {
    await login();
    const channel = getChannel();
    if (!channel) return;

    const result = await saveChannel(channel);
    // Even if saving fails, we still redirect to admin so the UI remains usable.
    if (!result.success) {
      // In real app we might show a toast; for now we just keep it silent to avoid blocking UX.
    }

    window.location.href = '/admin/admin.html';
  });
}

function attachLogoutHandler() {
  const logoutButton = document.getElementById('logout-button');
  if (!logoutButton) return;

  logoutButton.addEventListener('click', async () => {
    await signOut();
    window.location.href = '/auth/login.html';
  });
}

async function ensureAuthenticated() {
  const session = await getCurrentSession();
  if (!session) {
    window.location.href = '/auth/login.html';
  }
}

function restoreSession() {
  const container = document.getElementById('channel-info');
  renderChannelInfo(container);
}

async function initAdminPage() {
  await ensureAuthenticated();
  attachTikTokAuthHandlers();
  attachLogoutHandler();
  restoreSession();
  const categoryRoot = document.getElementById('category-form-root');
  await initCategoryForm(categoryRoot);
  const categoryListRoot = document.getElementById('category-list-root');
  await initCategoryList(categoryListRoot);
}

initAdminPage();


