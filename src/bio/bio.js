import { DEFAULT_THEME } from '../shared/constants.js';

function applyDefaultTheme() {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', DEFAULT_THEME.primary);
  root.style.setProperty('--color-secondary', DEFAULT_THEME.secondary);
  root.style.setProperty('--color-background', DEFAULT_THEME.background);
  root.style.setProperty('--color-text', DEFAULT_THEME.text);
  root.style.setProperty('--color-accent', DEFAULT_THEME.accent);
}

function initBioPage() {
  applyDefaultTheme();
}

initBioPage();


