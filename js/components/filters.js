// Filter Component with Batch Multi-Selection (Slides 18 & 20)
import { store } from '../store.js';
import { FILTER_OPTIONS } from '../data.js';

export function renderFilters(containerId, isMobileDrawer = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stagedCount = store.getStagedCount();
  const activeCount = store.getActiveFilterCount();

  container.innerHTML = `
    <div class="filter-sidebar">
      <div class="filter-header">
        <div>
          <span class="filter-header-title">Filters</span>
          ${activeCount > 0 ? `<span class="active-filter-indicator" style="margin-left: 8px;">${activeCount} Active</span>` : ''}
        </div>
        <button class="btn-reset-text" id="${isMobileDrawer ? 'mobile-' : ''}filter-reset-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          Reset All
        </button>
      </div>

      <!-- Categories Filter Group -->
      <div class="filter-group">
        <div class="filter-group-header" data-toggle="cat">
          <span>Categories</span>
          <span class="filter-arrow">▾</span>
        </div>
        <div class="filter-options-list" id="filter-group-categories">
          ${FILTER_OPTIONS.categories.map(c => `
            <label class="checkbox-item ${store.isStaged('categories', c.label) ? 'checked' : ''}" data-group="categories" data-val="${c.label}">
              <div class="checkbox-box"></div>
              <span class="checkbox-label">${c.label}</span>
              <span class="checkbox-count">(${c.count})</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Colors Filter Group (Placed Above Collections as per UX requirement!) -->
      <div class="filter-group">
        <div class="filter-group-header" data-toggle="colors">
          <span>Colors</span>
          <span class="filter-arrow">▾</span>
        </div>
        <div class="color-swatch-list" id="filter-group-colors">
          ${FILTER_OPTIONS.colors.map(col => `
            <div class="color-swatch-item ${store.isStaged('colors', col.label) ? 'checked' : ''}" data-group="colors" data-val="${col.label}">
              <div class="color-swatch-circle" style="background-color: ${col.hex}; ${col.border ? `border-color: ${col.border};` : ''}"></div>
              <span class="checkbox-label">${col.label}</span>
              <span class="checkbox-count">(${col.count})</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Collections Filter Group -->
      <div class="filter-group">
        <div class="filter-group-header" data-toggle="colls">
          <span>Collections</span>
          <span class="filter-arrow">▾</span>
        </div>
        <div class="filter-options-list" id="filter-group-collections">
          ${FILTER_OPTIONS.collections.map(c => `
            <label class="checkbox-item ${store.isStaged('collections', c.label) ? 'checked' : ''}" data-group="collections" data-val="${c.label}">
              <div class="checkbox-box"></div>
              <span class="checkbox-label">${c.label}</span>
              <span class="checkbox-count">(${c.count})</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Sizes Filter Group -->
      <div class="filter-group">
        <div class="filter-group-header" data-toggle="sizes">
          <span>Sizes</span>
          <span class="filter-arrow">▾</span>
        </div>
        <div class="filter-options-list" id="filter-group-sizes">
          ${FILTER_OPTIONS.sizes.map(s => `
            <label class="checkbox-item ${store.isStaged('sizes', s.label) ? 'checked' : ''}" data-group="sizes" data-val="${s.label}">
              <div class="checkbox-box"></div>
              <span class="checkbox-label">${s.label}</span>
              <span class="checkbox-count">(${s.count})</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Finishes Filter Group -->
      <div class="filter-group">
        <div class="filter-group-header" data-toggle="finishes">
          <span>Finishes</span>
          <span class="filter-arrow">▾</span>
        </div>
        <div class="filter-options-list" id="filter-group-finishes">
          ${FILTER_OPTIONS.finishes.map(f => `
            <label class="checkbox-item ${store.isStaged('finishes', f.label) ? 'checked' : ''}" data-group="finishes" data-val="${f.label}">
              <div class="checkbox-box"></div>
              <span class="checkbox-label">${f.label}</span>
              <span class="checkbox-count">(${f.count})</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Textures Filter Group -->
      <div class="filter-group">
        <div class="filter-group-header" data-toggle="textures">
          <span>Texture / Surface</span>
          <span class="filter-arrow">▾</span>
        </div>
        <div class="filter-options-list" id="filter-group-textures">
          ${FILTER_OPTIONS.textures.map(t => `
            <label class="checkbox-item ${store.isStaged('textures', t.label) ? 'checked' : ''}" data-group="textures" data-val="${t.label}">
              <div class="checkbox-box"></div>
              <span class="checkbox-label">${t.label}</span>
              <span class="checkbox-count">(${t.count})</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Staged Filter Action Bar (Slide 18) -->
      <div class="filter-actions-bar">
        <button class="btn btn-secondary" id="${isMobileDrawer ? 'mobile-' : ''}filter-cancel-btn">
          Reset
        </button>
        <button class="btn btn-primary" id="${isMobileDrawer ? 'mobile-' : ''}filter-apply-btn">
          Apply ${stagedCount > 0 ? `(${stagedCount})` : ''}
        </button>
      </div>
    </div>
  `;

  attachFilterEvents(container, isMobileDrawer);
}

function attachFilterEvents(container, isMobileDrawer) {
  // Checkbox & Swatch clicks: update staged filters WITHOUT immediate page reload!
  const items = container.querySelectorAll('.checkbox-item, .color-swatch-item');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const group = item.dataset.group;
      const val = item.dataset.val;
      store.toggleStagedFilter(group, val);

      // Re-render UI to update counts and checked styling
      renderFilters(container.id, isMobileDrawer);
    });
  });

  // Reset All
  const prefix = isMobileDrawer ? 'mobile-' : '';
  const resetBtn = container.querySelector(`#${prefix}filter-reset-btn`);
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      store.resetFilters();
      renderFilters(container.id, isMobileDrawer);
    });
  }

  // Cancel/Reset staged
  const cancelBtn = container.querySelector(`#${prefix}filter-cancel-btn`);
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      store.resetFilters();
      renderFilters(container.id, isMobileDrawer);
    });
  }

  // Apply filters commit!
  const applyBtn = container.querySelector(`#${prefix}filter-apply-btn`);
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      store.applyFilters();
    });
  }
}
