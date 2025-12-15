/**
 * Create or reuse a shared modal container.
 *
 * @returns {HTMLElement}
 */
function getModalRoot() {
  let root = document.getElementById('category-modal-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'category-modal-root';
    document.body.appendChild(root);
  }
  return root;
}

function closeModal() {
  const root = getModalRoot();
  root.innerHTML = '';
}

/**
 * Open edit modal for a category.
 *
 * @param {{ id: number, name: string, description?: string, onSave: (values: { name: string, description?: string }) => Promise<void> }} options
 */
export function openCategoryEditModal(options) {
  const root = getModalRoot();

  root.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="edit-category-title">
        <h3 id="edit-category-title" class="modal-title">Edit category</h3>
        <form class="modal-form">
          <label class="modal-field">
            <span>Name</span>
            <input id="edit-category-name" type="text" value="${options.name || ''}" />
          </label>
          <label class="modal-field">
            <span>Description</span>
            <textarea id="edit-category-description" rows="3">${
              options.description || ''
            }</textarea>
          </label>
          <p class="modal-error" id="edit-category-error" aria-live="polite"></p>
          <div class="modal-actions">
            <button type="button" class="modal-button modal-button-secondary" data-action="cancel">
              Cancel
            </button>
            <button type="submit" class="modal-button modal-button-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = root.querySelector('.modal-form');
  const nameInput = root.querySelector('#edit-category-name');
  const descInput = root.querySelector('#edit-category-description');
  const errorEl = root.querySelector('#edit-category-error');

  function setError(msg) {
    if (errorEl) {
      errorEl.textContent = msg;
    }
  }

  root.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  root.querySelector('[data-action=\"cancel\"]')?.addEventListener('click', () => {
    closeModal();
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = (nameInput?.value || '').trim();
    const description = (descInput?.value || '').trim();

    if (!name) {
      setError('Category name is required.');
      return;
    }

    setError('');
    await options.onSave({ name, description });
    closeModal();
  });
}

/**
 * Open confirmation modal before deleting a category.
 *
 * @param {{ id: number, name: string, onConfirm: () => Promise<void> }} options
 */
export function openCategoryDeleteModal(options) {
  const root = getModalRoot();

  root.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-category-title">
        <h3 id="delete-category-title" class="modal-title">Delete category</h3>
        <p class="modal-body">
          Are you sure you want to delete <strong>${options.name}</strong>? This action cannot be undone.
        </p>
        <p class="modal-error" id="delete-category-error" aria-live="polite"></p>
        <div class="modal-actions">
          <button type="button" class="modal-button modal-button-secondary" data-action="cancel">
            Cancel
          </button>
          <button type="button" class="modal-button modal-button-danger" data-action="confirm">
            Delete
          </button>
        </div>
      </div>
    </div>
  `;

  const errorEl = root.querySelector('#delete-category-error');
  function setError(msg) {
    if (errorEl) {
      errorEl.textContent = msg;
    }
  }

  root.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  root.querySelector('[data-action=\"cancel\"]')?.addEventListener('click', () => {
    closeModal();
  });

  root.querySelector('[data-action=\"confirm\"]')?.addEventListener('click', async () => {
    setError('');
    await options.onConfirm();
    closeModal();
  });
}


