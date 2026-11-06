// Product Listing Page (PLP) View (Slides 17, 18, 19, 20)
import { store } from '../store.js';
import { SPACES, PRODUCTS } from '../data.js';
import { renderFilters } from '../components/filters.js';
import { createProductCard } from '../components/productCard.js';

export function renderPLPView(container, params) {
  function render() {
    const currentSpaceId = store.state.activeSpace || 'bathroom';
    const activeSpaceObj = SPACES.find(s => s.id === currentSpaceId) || SPACES[0];
    const filteredProducts = store.getFilteredProducts();
    const activeFilterCount = store.getActiveFilterCount();

    container.innerHTML = `
      <!-- 1. Top Horizontal Space Switcher (Slide 19, 20: Visual Space Navigation) -->
      <section class="plp-space-nav">
        <div class="container space-nav-inner">
          <span class="space-nav-label">Explore by Space</span>
          <div class="space-nav-scroll">
            ${SPACES.map(s => `
              <div class="space-nav-item ${s.id === currentSpaceId ? 'active' : ''}" data-space-id="${s.id}" role="button" tabindex="0" aria-label="${s.name}">
                <div class="space-nav-thumb-wrap">
                  <img src="${s.thumb}" alt="${s.name}" class="space-nav-thumb" loading="lazy" />
                </div>
                <span class="space-nav-title">${s.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 2. Relevant Hero Banner (Slide 20: Contextual and Immersive) -->
      <section class="plp-hero-banner" style="background-image: url('${activeSpaceObj.image}');">
        <div class="plp-hero-overlay"></div>
        <div class="container plp-hero-content">
          <nav class="breadcrumb" style="color: #cbd5e1; margin-bottom: 12px;">
            <a href="#home" style="color: #e2e8f0;">Home</a>
            <span class="breadcrumb-sep">›</span>
            <span class="breadcrumb-current" style="color: #ffffff;">${activeSpaceObj.name}</span>
          </nav>
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #93c5fd; display: block; margin-bottom: 4px;">
            TILES FOR EVERY SPACE
          </span>
          <h1 class="plp-hero-title">${activeSpaceObj.name}</h1>
          <p class="plp-hero-desc">${activeSpaceObj.description}</p>
        </div>
      </section>

      <!-- 3. PLP Body with Toolbar, Filters, and Product Grid -->
      <main class="container plp-layout">
        <!-- PLP Toolbar -->
        <div class="plp-toolbar">
          <div class="plp-count-context">
            <span>Filter By ${activeSpaceObj.count} tiles available</span>
            <span title="Inventory demonstration count based on Kajaria collection catalog">ⓘ</span>
            ${activeFilterCount > 0 ? `
              <span class="badge badge-accent" style="margin-left: 8px;">${activeFilterCount} active filters</span>
            ` : ''}
          </div>

          <div class="plp-toolbar-controls">
            <!-- Mobile Filter Trigger Button (Slide 18) -->
            <button class="btn btn-secondary btn-sm" id="open-mobile-filters-btn" style="display: none;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              Filter ${activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </button>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.85rem; color: var(--kj-text-muted);">Sort by:</span>
              <select id="plp-sort-select" class="sort-select">
                <option value="relevant" ${store.state.sortBy === 'relevant' ? 'selected' : ''}>Most Relevant</option>
                <option value="name-asc" ${store.state.sortBy === 'name-asc' ? 'selected' : ''}>Name (A to Z)</option>
                <option value="name-desc" ${store.state.sortBy === 'name-desc' ? 'selected' : ''}>Name (Z to A)</option>
              </select>
            </div>

            <div class="view-mode-toggle">
              <button class="view-mode-btn ${store.state.viewMode === 'grid' ? 'active' : ''}" id="view-mode-standard" title="Standard Grid">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button class="view-mode-btn ${store.state.viewMode === 'compact' ? 'active' : ''}" id="view-mode-compact" title="Compact Grid">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- PLP Grid Layout: Filters + Product Grid -->
        <div class="plp-grid-container">
          <!-- Desktop Sidebar Filters -->
          <aside id="desktop-filters-container"></aside>

          <!-- Products Listing Grid -->
          <div class="products-grid-column">
            ${filteredProducts.length === 0 ? `
              <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-md); padding: 48px; text-align: center;">
                <h3 style="margin-bottom: 8px;">No Tiles Match Your Selected Filters</h3>
                <p style="color: var(--kj-text-muted); margin-bottom: 20px;">
                  Try clearing some filter criteria to expand your results.
                </p>
                <button class="btn btn-primary" id="empty-reset-filters">Reset All Filters</button>
              </div>
            ` : `
              <div class="products-grid ${store.state.viewMode === 'compact' ? 'compact' : ''}" id="products-list-wrap">
                ${filteredProducts.map(p => createProductCard(p)).join('')}
              </div>
            `}
          </div>
        </div>
      </main>

      <!-- Mobile Filter Drawer Backdrop (Slide 18) -->
      <div class="mobile-drawer-overlay" id="mobile-filter-drawer-overlay">
        <div class="mobile-drawer" style="width: 90%; max-width: 400px; padding: 0;">
          <div class="mobile-drawer-header">
            <span style="font-weight: 700; font-size: 1.1rem;">Filters</span>
            <button class="btn-icon" id="close-mobile-filters-btn">✕</button>
          </div>
          <div id="mobile-filters-inner" style="padding: 16px; overflow-y: auto;"></div>
        </div>
      </div>
    `;

    // Render filter widgets
    renderFilters('desktop-filters-container', false);
    renderFilters('mobile-filters-inner', true);

    attachPLPEvents();
  }

  function attachPLPEvents() {
    // Space switcher click
    container.querySelectorAll('.space-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const spaceId = item.dataset.spaceId;
        store.setActiveSpace(spaceId);
        window.location.hash = `#products?space=${spaceId}`;
      });
    });

    // Sort select
    const sortSelect = container.querySelector('#plp-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        store.state.sortBy = e.target.value;
        render();
      });
    }

    // View mode
    container.querySelector('#view-mode-standard')?.addEventListener('click', () => {
      store.state.viewMode = 'grid';
      render();
    });
    container.querySelector('#view-mode-compact')?.addEventListener('click', () => {
      store.state.viewMode = 'compact';
      render();
    });

    // Empty state reset
    container.querySelector('#empty-reset-filters')?.addEventListener('click', () => {
      store.resetFilters();
      render();
    });

    // Mobile filter drawer triggers
    const openMobileBtn = container.querySelector('#open-mobile-filters-btn');
    const closeMobileBtn = container.querySelector('#close-mobile-filters-btn');
    const drawerOverlay = container.querySelector('#mobile-filter-drawer-overlay');

    if (window.innerWidth <= 1024 && openMobileBtn) {
      openMobileBtn.style.display = 'inline-flex';
    }

    openMobileBtn?.addEventListener('click', () => {
      drawerOverlay?.classList.add('active');
    });
    closeMobileBtn?.addEventListener('click', () => {
      drawerOverlay?.classList.remove('active');
    });

    // Card events: Favourite toggle & Compare checkbox delegation
    const listWrap = container.querySelector('#products-list-wrap');
    if (listWrap) {
      listWrap.addEventListener('click', (e) => {
        const favBtn = e.target.closest('.card-fav-btn');
        if (favBtn) {
          e.preventDefault();
          const pId = favBtn.dataset.favId;
          store.toggleFavourite(pId);
          render();
          return;
        }

        const compInput = e.target.closest('.compare-toggle-input');
        if (compInput) {
          const pId = compInput.dataset.compareId;
          store.toggleCompare(pId);
        }
      });
    }
  }

  // Subscribe to store updates for filtering
  const unsubscribe = store.subscribe(() => {
    // If we're currently on the products page, re-render
    if (window.location.hash.startsWith('#products')) {
      render();
    }
  });

  render();
}
