import { getCategories, updateCategory, deleteCategory } from '../shared/storage.js';
import { openCategoryEditModal, openCategoryDeleteModal } from './category-modal.js';

let listRootEl = null;

async function renderList() {
  if (!listRootEl) return;

  listRootEl.innerHTML = '<p class="category-list-message">Loading categories...</p>';

  const { success, data, error } = await getCategories();

  if (!success) {
    listRootEl.innerHTML = `<p class="category-list-message category-list-error">Failed to load categories: ${
      error || 'Unknown error'
    }</p>`;
    return;
  }

  if (!data || data.length === 0) {
    listRootEl.innerHTML =
      '<p class="category-list-message">No categories yet. Create your first category above.</p>';
    return;
  }

  const items = data
    .map(
      (cat) => `
      <li class="category-list-item" data-id="${cat.id}">
        <div class="category-list-text">
          <div class="category-list-name">${cat.name}</div>
          <div class="category-list-description">${
            cat.description || '<span class="category-list-empty">No description</span>'
          }</div>
        </div>
        <div class="category-list-actions">
          <button type="button" class="category-list-button category-list-button-edit">Edit</button>
          <button type="button" class="category-list-button category-list-button-delete">Delete</button>
        </div>
      </li>
    `,
    )
    .join('');

  listRootEl.innerHTML = `
    <ul class="category-list">
      ${items}
    </ul>
  `;

  listRootEl.querySelectorAll('.category-list-button-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.category-list-item');
      if (!item) return;
      const id = Number(item.getAttribute('data-id'));
      const name = item.querySelector('.category-list-name')?.textContent || '';
      const descriptionEl = item.querySelector('.category-list-description');
      const description =
        descriptionEl && !descriptionEl.classList.contains('category-list-empty')
          ? descriptionEl.textContent || ''
          : '';

      openCategoryEditModal({
        id,
        name,
        description,
        async onSave(values) {
          await updateCategory(id, values);
          await renderList();
        },
      });
    });
  });

  listRootEl.querySelectorAll('.category-list-button-delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.category-list-item');
      if (!item) return;
      const id = Number(item.getAttribute('data-id'));
      const name = item.querySelector('.category-list-name')?.textContent || '';

      openCategoryDeleteModal({
        id,
        name,
        async onConfirm() {
          await deleteCategory(id);
          await renderList();
        },
      });
    });
  });
}

/**
 * Initialize the category list.
 *
 * @param {HTMLElement} root
 */
export async function initCategoryList(root) {
  if (!root) return;
  listRootEl = root;
  await renderList();
}

export async function reloadCategoryList() {
  await renderList();
}


