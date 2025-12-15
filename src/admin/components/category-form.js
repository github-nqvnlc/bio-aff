import { addCategory } from '../shared/storage.js';
import { reloadCategoryList } from './category-list.js';

/**
 * Initialize the category form inside the given container.
 *
 * @param {HTMLElement} container
 */
export async function initCategoryForm(container) {
  if (!container) return;

  try {
    const response = await fetch('/admin/components/category-form.html');
    const html = await response.text();
    container.innerHTML = html;
  } catch {
    container.innerHTML =
      '<p class="form-error">Could not load category form. Please try again later.</p>';
    return;
  }

  const form = container.querySelector('#category-form');
  if (!form) return;

  const nameInput = /** @type {HTMLInputElement|null} */ (
    container.querySelector('#category-name')
  );
  const nameError = container.querySelector('#category-name-error');
  const messageEl = container.querySelector('#category-form-message');

  function setError(el, msg) {
    if (!el) return;
    el.textContent = msg;
  }

  function clearErrors() {
    setError(nameError, '');
  }

  function validate() {
    clearErrors();
    if (!nameInput) return false;
    const value = nameInput.value.trim();
    if (!value) {
      setError(nameError, 'Category name is required.');
      nameInput.focus();
      return false;
    }
    return true;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validate()) return;

    if (!nameInput) return;

    if (messageEl) {
      messageEl.textContent = 'Saving category...';
    }

    const payload = {
      name: nameInput.value,
      description:
        /** @type {HTMLTextAreaElement|null} */ (
          container.querySelector('#category-description')
        )?.value || '',
    };

    const result = await addCategory(payload);

    if (!result.success) {
      setError(nameError, result.error || 'Could not save category.');
      if (messageEl) {
        messageEl.textContent = '';
      }
      return;
    }

    form.reset();
    clearErrors();

    if (messageEl) {
      messageEl.textContent = 'Category saved.';
    }

    try {
      await reloadCategoryList();
    } catch {
      // Ignore list reload errors in form handler.
    }
  });

  form.addEventListener('reset', () => {
    clearErrors();
    if (messageEl) {
      messageEl.textContent = '';
    }
  });
}


