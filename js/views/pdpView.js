// Product Detail Page (PDP) View (Slides 21 & 22)
import { store } from '../store.js';
import { PRODUCTS } from '../data.js';

export function renderPDPView(container, params) {
  const pId = (params && params.get('id')) || store.state.selectedProductId || 'calcuta-imperial-a';
  const product = PRODUCTS.find(p => p.id === pId) || PRODUCTS[0];

  let selectedImage = product.gallery[0] || product.image;
  let activeTab = 'description'; // 'description' | 'specifications' | 'applications' | 'downloads' | 'care'
  let activeRecTab = 'similar'; // 'similar' | 'collection' | 'complementary'

  function render() {
    const isFav = store.isFavourite(product.id);
    const isCompared = store.isInCompare(product.id);

    // Filter recommendations
    let recTiles = PRODUCTS.filter(p => p.id !== product.id);
    if (activeRecTab === 'collection') {
      recTiles = recTiles.filter(p => p.collection === product.collection);
    } else if (activeRecTab === 'complementary') {
      recTiles = recTiles.filter(p => p.color !== product.color);
    }

    container.innerHTML = `
      <div class="pdp-section container">
        <!-- Top Breadcrumb & Actions Bar (Slide 22) -->
        <div class="pdp-top-bar">
          <nav class="breadcrumb">
            <a href="#home">Home</a>
            <span class="breadcrumb-sep">›</span>
            <a href="#products">Products</a>
            <span class="breadcrumb-sep">›</span>
            <a href="#products">${product.category}</a>
            <span class="breadcrumb-sep">›</span>
            <span class="breadcrumb-current">${product.name}</span>
          </nav>

          <div class="pdp-top-actions">
            <button class="btn btn-ghost btn-sm" id="pdp-fav-toggle" style="color: ${isFav ? 'var(--kj-danger)' : 'var(--kj-text-heading)'}; font-weight: 600;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>${isFav ? 'Saved in Favourites' : 'Add to Favourites'}</span>
            </button>

            <button class="btn btn-ghost btn-sm" id="pdp-share-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>

        <!-- Main Product Evaluation Grid -->
        <div class="pdp-main-grid">
          <!-- Left: Gallery -->
          <div class="pdp-gallery-wrap">
            <div class="pdp-thumbs-col">
              ${product.gallery.map(imgUrl => `
                <div class="pdp-thumb-item ${imgUrl === selectedImage ? 'active' : ''}" data-thumb="${imgUrl}">
                  <img src="${imgUrl}" class="pdp-thumb-img" alt="${product.name}" />
                </div>
              `).join('')}
            </div>

            <div class="pdp-main-image-wrap">
              <img src="${selectedImage}" alt="${product.name}" class="pdp-main-img" id="pdp-active-display" />
              
              ${product.has360 ? `
                <div class="pdp-360-badge" id="pdp-360-btn" title="Open 360 Interactive Visualiser">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  360° View
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Right: Info & Actions (Slide 22) -->
          <div class="pdp-info-col">
            <h1 class="pdp-title">${product.name}</h1>
            <div class="pdp-meta-sub">${product.category} &nbsp;|&nbsp; ${product.typeBadge}</div>
            
            <p class="pdp-desc">${product.description}</p>

            <!-- "Explore with our tools" Banner (Slide 22) -->
            <div class="pdp-tools-banner">
              <div class="pdp-tools-heading">Explore with our tools</div>
              <div class="pdp-tools-row">
                <button class="pdp-tool-card-btn pdp-tool-trigger" data-tool="view-in-room">
                  <span>View in My Room</span>
                  <span>›</span>
                </button>
                <button class="pdp-tool-card-btn pdp-tool-trigger" data-tool="3d-visualiser">
                  <span>360° View</span>
                  <span>›</span>
                </button>
                <button class="pdp-tool-card-btn pdp-tool-trigger" data-tool="tile-calculator">
                  <span>Tile Calculator</span>
                  <span>›</span>
                </button>
              </div>
            </div>

            <!-- Specs Summary Table -->
            <div class="pdp-specs-summary">
              <div class="pdp-spec-item">
                <span class="pdp-spec-lbl">Size</span>
                <span class="pdp-spec-val">${product.size}</span>
              </div>
              <div class="pdp-spec-item">
                <span class="pdp-spec-lbl">Thickness</span>
                <span class="pdp-spec-val">${product.thickness}</span>
              </div>
              <div class="pdp-spec-item">
                <span class="pdp-spec-lbl">Finish</span>
                <span class="pdp-spec-val">${product.finish}</span>
              </div>
              <div class="pdp-spec-item">
                <span class="pdp-spec-lbl">Colour</span>
                <span class="pdp-spec-val">${product.colorDetail}</span>
              </div>
            </div>

            <!-- Primary CTAs (Slide 22) -->
            <div class="pdp-cta-row">
              <a href="#where-to-buy" class="btn btn-primary btn-lg" id="pdp-find-store-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Where to Buy →
              </a>

              <button class="btn btn-secondary btn-lg" id="pdp-compare-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>${isCompared ? 'In Comparison' : 'Compare'}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- PDP Tabs Section (Description, Specifications, Applications, Downloads, Care) -->
        <section class="pdp-tabs-wrap">
          <div class="pdp-tabs-nav">
            <button class="pdp-tab-trigger ${activeTab === 'description' ? 'active' : ''}" data-tab="description">Description</button>
            <button class="pdp-tab-trigger ${activeTab === 'specifications' ? 'active' : ''}" data-tab="specifications">Specifications</button>
            <button class="pdp-tab-trigger ${activeTab === 'applications' ? 'active' : ''}" data-tab="applications">Applications</button>
            <button class="pdp-tab-trigger ${activeTab === 'downloads' ? 'active' : ''}" data-tab="downloads">Downloads & Catalogues</button>
            <button class="pdp-tab-trigger ${activeTab === 'care' ? 'active' : ''}" data-tab="care">Care & Maintenance</button>
          </div>

          <div class="pdp-tab-content-area">
            ${renderTabContent(product, activeTab)}
          </div>
        </section>

        <!-- Similar & Complementary Tiles Carousel (Slide 22) -->
        <section style="margin-top: 40px; padding-top: 40px; border-top: 1px solid var(--kj-border);">
          <div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
            <div>
              <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--kj-text-heading); margin-bottom: 4px;">Similar & Complementary Tiles</h3>
              <p style="font-size: 0.9rem; color: var(--kj-text-muted);">Explore tiles that match in style, colour or surface</p>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn btn-sm ${activeRecTab === 'similar' ? 'btn-primary' : 'btn-secondary'} rec-filter-btn" data-rectab="similar">Similar Look</button>
              <button class="btn btn-sm ${activeRecTab === 'collection' ? 'btn-primary' : 'btn-secondary'} rec-filter-btn" data-rectab="collection">Same Collection</button>
              <button class="btn btn-sm ${activeRecTab === 'complementary' ? 'btn-primary' : 'btn-secondary'} rec-filter-btn" data-rectab="complementary">Complementary</button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            ${recTiles.slice(0, 3).map(p => `
              <div class="product-card" onclick="window.location.hash='#product-detail?id=${p.id}'" style="cursor: pointer;">
                <div class="card-media-wrap">
                  <img src="${p.image}" class="card-img" />
                </div>
                <div class="card-body">
                  <h4 class="card-title">${p.name}</h4>
                  <div class="card-category">${p.category}</div>
                  <div class="card-specs">
                    <span>${p.size}</span>
                    <span>·</span>
                    <span>${p.finish}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;

    attachPDPEvents();
  }

  function renderTabContent(product, tab) {
    if (tab === 'description') {
      return `
        <div style="max-width: 800px;">
          <h4 style="font-size: 1.2rem; margin-bottom: 12px;">${product.headline}</h4>
          <p style="line-height: 1.7; color: var(--kj-text-body); margin-bottom: 16px;">
            ${product.description}
          </p>
          <p style="line-height: 1.7; color: var(--kj-text-body);">
            Engineered through high-pressure isostatic compaction and vitrified above 1200°C, this surface boasts an impervious body with water absorption below 0.05%, completely preventing stains, moss growth, or efflorescence.
          </p>
        </div>
      `;
    } else if (tab === 'specifications') {
      return `
        <table class="compare-table" style="max-width: 800px;">
          <tbody>
            <tr><th>Product Code</th><td>KJ-${product.id.toUpperCase()}</td></tr>
            <tr><th>Tile Category</th><td>${product.category}</td></tr>
            <tr><th>Nominal Dimensions</th><td>${product.size}</td></tr>
            <tr><th>Thickness</th><td>${product.thickness}</td></tr>
            <tr><th>Finish & Surface</th><td>${product.finish} (${product.surface})</td></tr>
            <tr><th>Water Absorption</th><td>${product.waterAbsorption} (Impervious)</td></tr>
            <tr><th>Slip Rating</th><td>${product.slipRating} (Certified Safe Wet/Dry)</td></tr>
            <tr><th>Packing</th><td>${product.boxCoverage} / ${product.tilesPerBox} Tile(s) per Box</td></tr>
          </tbody>
        </table>
      `;
    } else if (tab === 'applications') {
      return `
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 900px;">
          <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-sm); padding: 16px;">
            <div style="font-weight: 700; color: var(--kj-primary); margin-bottom: 6px;">Bathrooms & Wet Spas</div>
            <p style="font-size: 0.85rem; color: var(--kj-text-muted);">Impervious to moisture, soap scum, and steam condensation.</p>
          </div>
          <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-sm); padding: 16px;">
            <div style="font-weight: 700; color: var(--kj-primary); margin-bottom: 6px;">Living Room & Salons</div>
            <p style="font-size: 0.85rem; color: var(--kj-text-muted);">Large seamless span with high optical clarity and light bounce.</p>
          </div>
          <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-sm); padding: 16px;">
            <div style="font-weight: 700; color: var(--kj-primary); margin-bottom: 6px;">Commercial Lobbies</div>
            <p style="font-size: 0.85rem; color: var(--kj-text-muted);">Certified high abrasion resistance under high-density foot traffic.</p>
          </div>
        </div>
      `;
    } else if (tab === 'downloads') {
      return `
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-sm); padding: 20px; width: 320px;">
            <div style="font-weight: 700; margin-bottom: 4px;">The Ultima 2026 Catalogue</div>
            <div style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 16px;">PDF · 48 MB · High Resolution</div>
            <button class="btn btn-outline btn-sm" onclick="alert('Downloading catalogue PDF sample...')">Download Catalogue ↓</button>
          </div>
          <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-sm); padding: 20px; width: 320px;">
            <div style="font-weight: 700; margin-bottom: 4px;">Technical Specification Sheet</div>
            <div style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 16px;">PDF · 2.4 MB · Architect Data</div>
            <button class="btn btn-outline btn-sm" onclick="alert('Downloading technical spec sheet...')">Download Spec Sheet ↓</button>
          </div>
        </div>
      `;
    } else {
      return `
        <div style="max-width: 800px; line-height: 1.6;">
          <h4 style="margin-bottom: 10px;">Maintenance Guidelines</h4>
          <p style="margin-bottom: 12px;">Regular cleaning with neutral pH tile detergents and warm water is sufficient to preserve the lustrous finish. Avoid harsh hydrofluoric acid or abrasive wire sponges.</p>
          <p>For grout maintenance, Kajaria Gresbond epoxy grout provides complete stain rejection and zero discolouration over the life of the installation.</p>
        </div>
      `;
    }
  }

  function attachPDPEvents() {
    // Gallery thumbs
    container.querySelectorAll('.pdp-thumb-item').forEach(thumb => {
      thumb.addEventListener('click', () => {
        selectedImage = thumb.dataset.thumb;
        render();
      });
    });

    // 360 view badge
    container.querySelector('#pdp-360-btn')?.addEventListener('click', () => {
      store.setModal('visualiser', true);
    });

    // Tools triggers
    container.querySelectorAll('.pdp-tool-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        if (tool === 'tile-calculator') {
          store.setModal('calculator', true);
        } else if (tool === '3d-visualiser' || tool === 'view-in-room') {
          store.setModal('visualiser', true);
        }
      });
    });

    // Favourites toggle
    container.querySelector('#pdp-fav-toggle')?.addEventListener('click', () => {
      store.toggleFavourite(product.id);
      render();
    });

    // Compare toggle
    container.querySelector('#pdp-compare-btn')?.addEventListener('click', () => {
      store.toggleCompare(product.id);
      render();
    });

    // Share button
    container.querySelector('#pdp-share-btn')?.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({ title: product.name, url: window.location.href });
      } else {
        navigator.clipboard?.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      }
    });

    // Tabs navigation
    container.querySelectorAll('.pdp-tab-trigger').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        activeTab = tabBtn.dataset.tab;
        render();
      });
    });

    // Recommendation tabs
    container.querySelectorAll('.rec-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeRecTab = btn.dataset.rectab;
        render();
      });
    });
  }

  render();
}
