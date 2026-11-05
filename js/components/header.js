// Header & Navigation Component
import { store } from '../store.js';
import { router } from '../router.js';
import { PRODUCTS, SPACES } from '../data.js';

export function initHeader() {
  const headerElem = document.getElementById('site-header');
  if (!headerElem) return;

  renderHeader(headerElem);
  attachHeaderEvents(headerElem);

  // Subscribe to store updates for favourites count
  store.subscribe(state => {
    updateFavouritesCount(state.favourites.length);
  });
}

function renderHeader(container) {
  const favCount = store.state.favourites.length;

  container.innerHTML = `
    <!-- Top Utility Bar -->
    <div class="header-top container">
      <div class="brand-wrapper">
        <button class="mobile-nav-toggle" id="mobile-nav-open" aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <a href="#home" class="brand-logo-wrap" title="Kajaria Ceramics Home">
          <img src="assets/images/kajaria-logo.svg" alt="Kajaria" class="brand-logo-img" />
        </a>
        <div class="brand-tagline-3d-wrap" title="India's #1 Tile Company">
          <div class="brand-tagline-flipper">
            <div class="tagline-face tagline-front">
              India's No.1<br>Tile Company
            </div>
            <div class="tagline-face tagline-back">
              India's No.1<br>Tile Company
            </div>
          </div>
        </div>
      </div>

      <!-- Universal Search Bar -->
      <div class="header-search">
        <div class="search-input-wrap">
          <span class="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input 
            type="text" 
            id="global-search-input" 
            class="search-input" 
            placeholder="Search tiles by color, finish, size, spaces etc." 
            autocomplete="off"
          />
          <button class="search-visual-btn" id="search-camera-btn" title="Search with an image">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </button>
        </div>

        <!-- Search Autocomplete Dropdown -->
        <div class="search-results-dropdown" id="search-dropdown">
          <div class="search-section-title">Popular Searches</div>
          <div class="search-tags">
            <span class="search-tag-chip" data-search="Marble">Marble</span>
            <span class="search-tag-chip" data-search="Bathroom">Bathroom Tiles</span>
            <span class="search-tag-chip" data-search="Calcuta">Calcuta Imperial</span>
            <span class="search-tag-chip" data-search="Riverwash">Riverwash Finish</span>
            <span class="search-tag-chip" data-search="119 x 240">Large Slabs</span>
            <span class="search-tag-chip" data-search="Beige">Warm Beige</span>
          </div>
          <div id="search-dynamic-results"></div>
        </div>
      </div>

      <!-- Header Quick Actions -->
      <div class="header-actions">
        <a href="#where-to-buy" class="action-link" title="Locate a Store">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Where to Buy</span>
        </a>

        <a href="#catalogues" class="action-link" title="Catalogues">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span>Catalogues</span>
        </a>

        <button class="action-link" id="header-fav-btn" title="Saved Favourites">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span class="fav-badge" id="fav-count-badge">${favCount}</span>
        </button>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <nav class="header-nav">
      <div class="container header-nav-container">
        <ul class="nav-menu">
          <!-- Products Mega-Menu (Matches Mockup media_1793862262481_2f981cf8.jpg) -->
          <li class="nav-item has-mega" id="nav-item-products">
            <button class="nav-trigger">
              <span>Products</span>
              <span class="nav-arrow">▾</span>
            </button>
            <div class="mega-menu mega-menu-products">
              <div class="mega-products-container">
                <!-- Column 1: Tiles by Space -->
                <div class="mega-prod-space-col">
                  <h3 class="prod-col-title">Tiles by Space</h3>

                  <div class="spaces-two-col">
                    <div class="space-links-col">
                      <a href="#products?space=bathroom" class="space-nav-pill" data-space-key="bathroom">
                        <span class="space-pill-left">
                          <span class="space-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                              <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"></path>
                              <path d="M6 12V6a3 3 0 0 1 6 0v6"></path>
                              <line x1="5" y1="20" x2="5" y2="22"></line>
                              <line x1="19" y1="20" x2="19" y2="22"></line>
                            </svg>
                          </span>
                          <span class="space-name">Bathroom</span>
                        </span>
                        <span class="space-chevron">›</span>
                      </a>

                      <a href="#products?space=kitchen" class="space-nav-pill" data-space-key="kitchen">
                        <span class="space-pill-left">
                          <span class="space-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                              <path d="M3 10h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z"></path>
                              <path d="M6 10V6a2 2 0 0 1 2-2h2"></path>
                              <circle cx="10" cy="4" r="1"></circle>
                            </svg>
                          </span>
                          <span class="space-name">Kitchen</span>
                        </span>
                        <span class="space-chevron">›</span>
                      </a>

                      <a href="#products?space=living-room" class="space-nav-pill" data-space-key="living-room">
                        <span class="space-pill-left">
                          <span class="space-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                              <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"></path>
                              <path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5z"></path>
                              <path d="M6 18v2M18 18v2"></path>
                            </svg>
                          </span>
                          <span class="space-name">Living Room</span>
                        </span>
                        <span class="space-chevron">›</span>
                      </a>

                      <a href="#products?space=bedroom" class="space-nav-pill" data-space-key="bedroom">
                        <span class="space-pill-left">
                          <span class="space-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                              <path d="M2 9v11M22 9v11M2 13h20M7 9v4M12 9v4"></path>
                              <path d="M2 14h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z"></path>
                            </svg>
                          </span>
                          <span class="space-name">Bedroom</span>
                        </span>
                        <span class="space-chevron">›</span>
                      </a>
                    </div>

                    <div class="space-links-col">
                      <a href="#products?space=outdoor" class="space-nav-pill" data-space-key="outdoor">
                        <span class="space-pill-left">
                          <span class="space-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                              <circle cx="12" cy="12" r="4"></circle>
                              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                            </svg>
                          </span>
                          <span class="space-name">Outdoor</span>
                        </span>
                        <span class="space-chevron">›</span>
                      </a>

                      <a href="#products?space=commercial" class="space-nav-pill" data-space-key="commercial">
                        <span class="space-pill-left">
                          <span class="space-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                              <line x1="9" y1="6" x2="9" y2="6.01"></line>
                              <line x1="15" y1="6" x2="15" y2="6.01"></line>
                              <line x1="9" y1="10" x2="9" y2="10.01"></line>
                              <line x1="15" y1="10" x2="15" y2="10.01"></line>
                              <line x1="9" y1="14" x2="9" y2="14.01"></line>
                              <line x1="15" y1="14" x2="15" y2="14.01"></line>
                              <path d="M10 22v-4h4v4"></path>
                            </svg>
                          </span>
                          <span class="space-name">Commercial Spaces</span>
                        </span>
                        <span class="space-chevron">›</span>
                      </a>

                      <a href="#products?space=living-room" class="space-nav-pill" data-space-key="staircases">
                        <span class="space-pill-left">
                          <span class="space-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                              <path d="M4 19h4v-4h4v-4h4V7h4"></path>
                            </svg>
                          </span>
                          <span class="space-name">Staircases</span>
                        </span>
                        <span class="space-chevron">›</span>
                      </a>
                    </div>
                  </div>

                  <!-- Need help choosing banner -->
                  <div class="mega-help-banner">
                    <span class="help-label">Need help choosing?</span>
                    <a href="#products?space=bathroom" class="help-link">Find your tiles →</a>
                  </div>
                </div>

                <!-- Column 2: Tiles by Material & Bathroom and Installation (Minimalist & Clean) -->
                <div class="mega-prod-mat-col">
                  <h3 class="prod-col-title">Tiles by Material</h3>

                  <div class="material-clean-list">
                    <a href="#products" class="mat-clean-item" data-cat="Glazed Vitrified Tiles" data-cat-img="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80">
                      <span class="mat-clean-name">Glazed Vitrified Tiles</span>
                      <span class="mat-clean-sub">Eternity</span>
                    </a>

                    <a href="#products" class="mat-clean-item" data-cat="Gres Floor & Wall Tiles" data-cat-img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80">
                      <span class="mat-clean-name">Gres Floor & Wall Tiles</span>
                      <span class="mat-clean-sub">Grès</span>
                    </a>

                    <a href="#products" class="mat-clean-item" data-cat="Polished Vitrified Tiles" data-cat-img="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80">
                      <span class="mat-clean-name">Polished Vitrified Tiles</span>
                      <span class="mat-clean-sub">Vitronite</span>
                    </a>

                    <a href="#products" class="mat-clean-item" data-cat="Ceramic Tiles" data-cat-img="assets/images/spaces/bathroom-preview.jpg">
                      <span class="mat-clean-name">Ceramic Wall Tiles</span>
                      <span class="mat-clean-sub">Ceramic Tiles</span>
                    </a>
                  </div>

                  <div class="mat-clean-divider"></div>

                  <div class="mat-subhead-title">Bathroom &amp; Installation</div>
                  <div class="install-clean-list">
                    <a href="https://www.gresbondbykajaria.com/" target="_blank" rel="noopener" class="install-clean-item">
                      <span class="install-clean-name">Tile Adhesives</span>
                      <span class="install-clean-dot">·</span>
                      <span class="install-clean-brand">Grèsbond <span class="ext-icon">↗</span></span>
                    </a>

                    <a href="https://www.kerovit.com/" target="_blank" rel="noopener" class="install-clean-item">
                      <span class="install-clean-name">Faucets &amp; Sanitaryware</span>
                      <span class="install-clean-dot">·</span>
                      <span class="install-clean-brand">Kerovit <span class="ext-icon">↗</span></span>
                    </a>
                  </div>
                </div>

                <!-- Column 3: Collections (Matches Mockup media_1793865703896_edd003e1.jpg) -->
                <div class="mega-prod-col-col">
                  <h3 class="prod-col-title">Collections</h3>
                  <div class="collections-vertical-list">
                    <a href="#products" class="collection-nav-link" data-collection="The Ultima">The Ultima</a>
                    <a href="#products" class="collection-nav-link" data-collection="Grestough">Grestough</a>
                    <a href="#products" class="collection-nav-link" data-collection="Vitronite">Vitronite</a>
                    <a href="#products" class="collection-nav-link" data-collection="Kasamood">Kasamood</a>
                    <a href="#products" class="collection-nav-link" data-collection="Gres Art">Gres Art</a>
                    <a href="#products" class="collection-nav-link" data-collection="Duratech">Duratech</a>
                    <a href="#products" class="collection-nav-link" data-collection="UniTerra">UniTerra</a>
                    <a href="#products" class="collection-nav-link" data-collection="DuRock">DuRock</a>
                  </div>
                </div>

                <!-- Column 4: Dynamic Hover Preview (Retained from Mockup media_1793866329194_6f05d2b6.jpg) -->
                <div class="mega-prod-image-col">
                  <div class="mega-image-frame">
                    <img id="mega-preview-img" src="assets/images/spaces/bathroom-preview.jpg" alt="Lifestyle Surface Preview" />
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!-- Browse By Mega-Menu (Matches Mockup media_1793862272741_a0b464e2.jpg) -->
          <li class="nav-item has-mega" id="nav-item-shopby">
            <button class="nav-trigger">
              <span>Browse By</span>
              <span class="nav-arrow">▾</span>
            </button>
            <div class="mega-menu mega-menu-shopby">
              <div class="mega-shopby-container">
                <!-- Column 1: Finishes -->
                <div class="shopby-col">
                  <h3 class="shopby-title">Finishes</h3>
                  <p class="shopby-subtitle">Choose the surface sheen</p>

                  <div class="shopby-list">
                    <a href="#products" class="shopby-pill active" data-filter-finish="Matt">
                      <span class="shopby-pill-left">
                        <span class="shopby-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                          </svg>
                        </span>
                        <span class="shopby-name">Matt</span>
                      </span>
                      <span class="shopby-arrow">→</span>
                    </a>

                    <a href="#products" class="shopby-pill" data-filter-finish="Glossy">
                      <span class="shopby-pill-left">
                        <span class="shopby-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83"></path>
                          </svg>
                        </span>
                        <span class="shopby-name">Glossy</span>
                      </span>
                    </a>

                    <a href="#products" class="shopby-pill" data-filter-finish="Polished">
                      <span class="shopby-pill-left">
                        <span class="shopby-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <path d="M6 3h12l4 6-10 13L2 9z"></path>
                            <path d="M2 9h20M10 3l2 6 2-6M7.5 9l4.5 13 4.5-13"></path>
                          </svg>
                        </span>
                        <span class="shopby-name">Polished</span>
                      </span>
                    </a>

                    <a href="#products" class="shopby-pill" data-filter-finish="Riverwash">
                      <span class="shopby-pill-left">
                        <span class="shopby-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <path d="M2 10c3-3 7-3 10 0s7 3 10 0"></path>
                            <path d="M2 14c3-3 7-3 10 0s7 3 10 0"></path>
                            <path d="M2 18c3-3 7-3 10 0s7 3 10 0"></path>
                          </svg>
                        </span>
                        <span class="shopby-name">Satin</span>
                      </span>
                    </a>
                  </div>

                  <a href="#products" class="shopby-bottom-link" data-filter-type="finishes">View all finishes →</a>
                </div>

                <!-- Column 2: Colors -->
                <div class="shopby-col">
                  <h3 class="shopby-title">Colors</h3>
                  <p class="shopby-subtitle">Find your palette</p>

                  <div class="shopby-colors-grid">
                    <div class="color-subcol">
                      <a href="#products" class="color-item" data-filter-color="White">
                        <span class="color-circle" style="background: #ffffff; border: 1px solid #d1d5db;"></span>
                        <span class="color-label">White</span>
                      </a>
                      <a href="#products" class="color-item" data-filter-color="Beige">
                        <span class="color-circle" style="background: #e8dcc4;"></span>
                        <span class="color-label">Beige</span>
                      </a>
                      <a href="#products" class="color-item" data-filter-color="Brown">
                        <span class="color-circle" style="background: #8b5a2b;"></span>
                        <span class="color-label">Brown</span>
                      </a>
                      <a href="#products" class="color-item" data-filter-color="Blue">
                        <span class="color-circle" style="background: #1d4ed8;"></span>
                        <span class="color-label">Blue</span>
                      </a>
                    </div>

                    <div class="color-subcol">
                      <a href="#products" class="color-item" data-filter-color="Ivory">
                        <span class="color-circle" style="background: #fbf7ee; border: 1px solid #e5e7eb;"></span>
                        <span class="color-label">Ivory</span>
                      </a>
                      <a href="#products" class="color-item" data-filter-color="Grey">
                        <span class="color-circle" style="background: #9ca3af;"></span>
                        <span class="color-label">Grey</span>
                      </a>
                      <a href="#products" class="color-item" data-filter-color="Black">
                        <span class="color-circle" style="background: #111827;"></span>
                        <span class="color-label">Black</span>
                      </a>
                      <a href="#products" class="color-item" data-filter-color="Green">
                        <span class="color-circle" style="background: #477659;"></span>
                        <span class="color-label">Green</span>
                      </a>
                    </div>
                  </div>

                  <a href="#products" class="shopby-bottom-link" data-filter-type="colors">View all colors →</a>
                </div>

                <!-- Column 3: Texture -->
                <div class="shopby-col">
                  <h3 class="shopby-title">Texture</h3>
                  <p class="shopby-subtitle">Explore surface relief</p>

                  <div class="shopby-list">
                    <a href="#products" class="shopby-pill" data-filter-texture="Mirror Polished">
                      <span class="shopby-pill-left">
                        <span class="texture-box texture-smooth"></span>
                        <span class="shopby-name">Smooth</span>
                      </span>
                    </a>

                    <a href="#products" class="shopby-pill" data-filter-texture="Natural Matt">
                      <span class="shopby-pill-left">
                        <span class="texture-box texture-dots"></span>
                        <span class="shopby-name">Lightly Textured</span>
                      </span>
                    </a>

                    <a href="#products" class="shopby-pill" data-filter-texture="Textured Matt">
                      <span class="shopby-pill-left">
                        <span class="texture-box texture-lines"></span>
                        <span class="shopby-name">Structured</span>
                      </span>
                    </a>

                    <a href="#products" class="shopby-pill" data-filter-texture="Rustic Relief">
                      <span class="shopby-pill-left">
                        <span class="texture-box texture-relief"></span>
                        <span class="shopby-name">Relief</span>
                      </span>
                    </a>
                  </div>

                  <a href="#products" class="shopby-bottom-link" data-filter-type="textures">View all textures →</a>
                </div>
              </div>
            </div>
          </li>

          <!-- Unified Tools -->
          <li class="nav-item has-mega dropdown-relative" id="nav-item-tools">
            <button class="nav-trigger">
              <span>Tools</span>
              <span class="nav-arrow">▾</span>
            </button>
            <div class="mega-menu" style="min-width: 380px; max-width: 440px; padding: 24px;">
              <div class="mega-column-title" style="margin-bottom: 12px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; color: var(--kj-text-muted);">
                Planning & Visualisation Tools
              </div>
              <ul class="mega-link-list">
                <li><a href="#" class="mega-link tool-trigger" data-tool="view-in-room">View in Room (AR) <span>›</span></a></li>
                <li><a href="#" class="mega-link tool-trigger" data-tool="3d-visualiser">3D Tile Visualiser <span>›</span></a></li>
                <li><a href="#" class="mega-link tool-trigger" data-tool="tile-calculator">Tile Calculator <span>›</span></a></li>
                <li><a href="#" class="mega-link tool-trigger" data-tool="virtual-showroom">Virtual Showroom Walkthrough <span>›</span></a></li>
              </ul>
            </div>
          </li>

          <!-- Catalogues Direct Route -->
          <li class="nav-item">
            <a href="#catalogues" class="nav-trigger">
              <span>Catalogues</span>
            </a>
          </li>

          <!-- Resources -->
          <li class="nav-item has-mega dropdown-relative" id="nav-item-resources">
            <button class="nav-trigger">
              <span>Resources</span>
              <span class="nav-arrow">▾</span>
            </button>
            <div class="mega-menu" style="min-width: 380px; max-width: 440px; padding: 24px;">
              <div class="mega-column-title" style="margin-bottom: 12px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; color: var(--kj-text-muted);">
                Knowledge Hub
              </div>
              <ul class="mega-link-list">
                <li><a href="#home" class="mega-link">Blogs & Tile Trends <span>›</span></a></li>
                <li><a href="#home" class="mega-link">Ideas & Installation Guides <span>›</span></a></li>
                <li><a href="#home" class="mega-link">Technical Tile Specifications <span>›</span></a></li>
              </ul>
            </div>
          </li>

          <!-- About Us (Matches Mockup media_1793874797858_9485245f.png) -->
          <li class="nav-item has-mega dropdown-relative" id="nav-item-about">
            <button class="nav-trigger">
              <span>About Us</span>
              <span class="nav-arrow">▾</span>
            </button>
            <div class="mega-menu about-dropdown-menu">
              <ul class="about-links-list">
                <li><a href="#about" class="about-link">Company Information</a></li>
                <li><a href="#about" class="about-link">Chairman's Message</a></li>
                <li><a href="#about" class="about-link">Manufacturing Facilities</a></li>
                <li><a href="#about" class="about-link">Our Export</a></li>
                <li><a href="#about" class="about-link">Corporate Social Responsibility</a></li>
                <li><a href="#about" class="about-link">Awards and Certification</a></li>
              </ul>
            </div>
          </li>

          <!-- Investor Mega-Menu (Matches Mockup media_1793874803205_ad4a75e2.jpg) -->
          <li class="nav-item has-mega" id="nav-item-investor">
            <button class="nav-trigger">
              <span>Investor</span>
              <span class="nav-arrow">▾</span>
            </button>
            <div class="mega-menu mega-menu-investor">
              <div class="investor-container">
                <h3 class="investor-title">Reports and details</h3>
                <div class="investor-grid">
                  <div class="investor-col">
                    <ul class="investor-list">
                      <li><a href="#investor" class="investor-link">Important Information to the Shareholders - Dematerialization of physical shares</a></li>
                      <li><a href="#investor" class="investor-link">Capital History</a></li>
                      <li><a href="#investor" class="investor-link">Composition of BOD and its Committees</a></li>
                      <li><a href="#investor" class="investor-link">Share Holder Query</a></li>
                      <li><a href="#investor" class="investor-link">Corporate Governance</a></li>
                      <li><a href="#investor" class="investor-link">Shareholding Pattern</a></li>
                    </ul>
                  </div>

                  <div class="investor-col">
                    <ul class="investor-list">
                      <li><a href="#investor" class="investor-link">Financial Results</a></li>
                      <li><a href="#investor" class="investor-link">Trading Window</a></li>
                      <li><a href="#investor" class="investor-link">Annual Reports</a></li>
                      <li><a href="#investor" class="investor-link">AGM/EGM/Postal Ballot</a></li>
                      <li><a href="#investor" class="investor-link">Investor Release</a></li>
                      <li><a href="#investor" class="investor-link">Financial At a Glance</a></li>
                    </ul>
                  </div>

                  <div class="investor-col">
                    <ul class="investor-list">
                      <li><a href="#investor" class="investor-link">Corporate Presentation</a></li>
                      <li><a href="#investor" class="investor-link">Unclaimed Dividend/IEPF</a></li>
                      <li><a href="#investor" class="investor-link">Subsidiary Companies</a></li>
                      <li><a href="#investor" class="investor-link">Board Meeting Notices</a></li>
                      <li><a href="#investor" class="investor-link">Disclosures/Intimation</a></li>
                      <li><a href="#investor" class="investor-link">Investors Meet</a></li>
                    </ul>
                  </div>

                  <div class="investor-col">
                    <ul class="investor-list">
                      <li><a href="#investor" class="investor-link">ESOP</a></li>
                      <li><a href="#investor" class="investor-link">Scheme of Arrangement</a></li>
                      <li><a href="#investor" class="investor-link">3 Year Mission Statement</a></li>
                      <li><a href="#investor" class="investor-link">Conference Call</a></li>
                      <li><a href="#investor" class="investor-link">Buyback 2026</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Mobile Drawer Overlay & Drawer (Slide 14) -->
    <div class="mobile-drawer-overlay" id="mobile-drawer-overlay">
      <div class="mobile-drawer">
        <div class="mobile-drawer-header">
          <span class="brand-logo" style="font-size: 1.4rem;">Kajaria</span>
          <button class="btn-icon" id="mobile-drawer-close" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <ul class="mobile-drawer-menu">
          <li class="mobile-menu-item">
            <a href="#home" class="mobile-menu-link drawer-nav-link">Home <span>›</span></a>
          </li>
          <li class="mobile-menu-item">
            <a href="#about" class="mobile-menu-link drawer-nav-link">About Us <span>›</span></a>
          </li>
          <li class="mobile-menu-item">
            <a href="#products" class="mobile-menu-link drawer-nav-link">Products <span>›</span></a>
          </li>
          <li class="mobile-menu-item">
            <a href="#products" class="mobile-menu-link drawer-nav-link">Browse By Finishes & Colours <span>›</span></a>
          </li>
          <li class="mobile-menu-item">
            <a href="#products" class="mobile-menu-link drawer-nav-link">Collections (The Ultima, UniTerra...) <span>›</span></a>
          </li>
          <li class="mobile-menu-item">
            <a href="#catalogues" class="mobile-menu-link drawer-nav-link">Catalogues <span>›</span></a>
          </li>
          <li class="mobile-menu-item">
            <a href="#investor" class="mobile-menu-link drawer-nav-link">Investor Reports <span>›</span></a>
          </li>
          <li class="mobile-menu-item">
            <button class="mobile-menu-link tool-trigger drawer-nav-link" data-tool="tile-calculator" style="width: 100%; text-align: left;">Tile Calculator <span>›</span></button>
          </li>
        </ul>

        <div class="mobile-drawer-quick-actions">
          <a href="#where-to-buy" class="btn btn-primary drawer-nav-link" style="width: 100%;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Locate Showrooms
          </a>
          <button class="btn btn-secondary tool-trigger drawer-nav-link" data-tool="3d-visualiser" style="width: 100%;">
            3D Room Visualiser
          </button>
        </div>
      </div>
    </div>
  `;
}

function attachHeaderEvents(container) {
  // Mega-menu hover & toggle behavior
  const navItems = container.querySelectorAll('.has-mega');
  navItems.forEach(item => {
    let timeoutId;

    item.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
      navItems.forEach(i => i !== item && i.classList.remove('open'));
      item.classList.add('open');
    });

    item.addEventListener('mouseleave', () => {
      timeoutId = setTimeout(() => {
        item.classList.remove('open');
      }, 150);
    });

    // Touch click for tablets
    const trigger = item.querySelector('.nav-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // Mobile Drawer toggles
  const mobileOpenBtn = container.querySelector('#mobile-nav-open');
  const mobileCloseBtn = container.querySelector('#mobile-drawer-close');
  const drawerOverlay = container.querySelector('#mobile-drawer-overlay');

  if (mobileOpenBtn && drawerOverlay) {
    mobileOpenBtn.addEventListener('click', () => {
      drawerOverlay.classList.add('active');
    });
  }

  if (mobileCloseBtn && drawerOverlay) {
    mobileCloseBtn.addEventListener('click', () => {
      drawerOverlay.classList.remove('active');
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) {
        drawerOverlay.classList.remove('active');
      }
    });

    // Close on navigation link click
    drawerOverlay.querySelectorAll('.drawer-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        drawerOverlay.classList.remove('active');
      });
    });
  }

  // Universal Search Autocomplete
  const searchInput = container.querySelector('#global-search-input');
  const searchDropdown = container.querySelector('#search-dropdown');
  const dynamicResults = container.querySelector('#search-dynamic-results');

  if (searchInput && searchDropdown) {
    searchInput.addEventListener('focus', () => {
      searchDropdown.classList.add('active');
    });

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        dynamicResults.innerHTML = '';
        return;
      }

      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.color.toLowerCase().includes(q) || 
        p.finish.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 4);

      if (matches.length > 0) {
        dynamicResults.innerHTML = `
          <div class="search-section-title" style="margin-top: 12px;">Matching Tiles</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${matches.map(p => `
              <a href="#product-detail?id=${p.id}" class="mega-link search-item-match" style="display: flex; align-items: center; gap: 12px; padding: 6px;">
                <img src="${p.image}" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover;" />
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem;">${p.name}</div>
                  <div style="font-size: 0.75rem; color: var(--kj-text-muted);">${p.category} · ${p.finish}</div>
                </div>
              </a>
            `).join('')}
          </div>
        `;
      } else {
        dynamicResults.innerHTML = `
          <div style="padding: 12px 0; font-size: 0.85rem; color: var(--kj-text-muted);">
            No direct tile match found for "${q}". Press enter to search all collections.
          </div>
        `;
      }
    });

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search')) {
        searchDropdown.classList.remove('active');
      }
    });

    // Search chip clicks
    searchDropdown.querySelectorAll('.search-tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        searchInput.value = chip.dataset.search;
        searchInput.dispatchEvent(new Event('input'));
      });
    });

    // Camera visual search demo trigger
    const cameraBtn = container.querySelector('#search-camera-btn');
    if (cameraBtn) {
      cameraBtn.addEventListener('click', () => {
        alert('📷 Visual Search Demo: In the production app, you can upload or photograph any tile sample or magazine photo to find matching Kajaria vitrified slabs.');
      });
    }
  }

  // Space preview hover in Products Mega-Menu (Mockup media_1793866329194_6f05d2b6.jpg)
  const spacePreviews = {
    'bathroom': 'assets/images/spaces/bathroom-preview.jpg',
    'kitchen': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'living-room': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    'bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
    'outdoor': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    'commercial': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    'staircases': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  };

  const collectionPreviews = {
    'The Ultima': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'Grestough': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'Vitronite': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    'Kasamood': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    'Gres Art': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    'Duratech': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'UniTerra': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'DuRock': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
  };

  const previewImg = container.querySelector('#mega-preview-img');

  const updatePreviewWithAnimation = (src) => {
    if (!previewImg || !src) return;
    previewImg.style.opacity = '0.35';
    previewImg.style.transform = 'scale(0.97)';
    setTimeout(() => {
      previewImg.src = src;
      previewImg.style.opacity = '1';
      previewImg.style.transform = 'scale(1)';
    }, 120);
  };

  const spacePills = container.querySelectorAll('.space-nav-pill');

  spacePills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      spacePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const key = pill.dataset.spaceKey;
      if (spacePreviews[key]) {
        updatePreviewWithAnimation(spacePreviews[key]);
      }
    });

    pill.addEventListener('click', () => {
      const key = pill.dataset.spaceKey;
      if (key && key !== 'staircases') {
        store.setActiveSpace(key);
      }
      container.querySelectorAll('.has-mega').forEach(m => m.classList.remove('open'));
    });
  });

  // Material click & hover in Products Dropdown
  container.querySelectorAll('.mat-clean-item[data-cat], .mat-logo-card[data-cat], .material-text-item[data-cat], .material-card[data-cat]').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const imgUrl = card.dataset.catImg;
      if (imgUrl) {
        updatePreviewWithAnimation(imgUrl);
      }
    });

    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      if (cat) {
        store.resetFilters();
        store.state.activeFilters.categories = [cat];
        store.state.stagedFilters.categories = [cat];
        store.notify();
      }
      container.querySelectorAll('.has-mega').forEach(m => m.classList.remove('open'));
    });
  });

  // Collections link click & hover in Products Dropdown (Mockup Match)
  container.querySelectorAll('.collection-nav-link[data-collection], .collection-link[data-collection]').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const col = link.dataset.collection;
      if (collectionPreviews[col]) {
        updatePreviewWithAnimation(collectionPreviews[col]);
      }
    });

    link.addEventListener('click', () => {
      const col = link.dataset.collection;
      if (col) {
        store.resetFilters();
        store.state.activeFilters.collections = [col];
        store.state.stagedFilters.collections = [col];
        store.notify();
      }
      container.querySelectorAll('.has-mega').forEach(m => m.classList.remove('open'));
    });
  });

  // Shop By filters click
  container.querySelectorAll('[data-filter-finish]').forEach(link => {
    link.addEventListener('click', () => {
      const finish = link.dataset.filterFinish;
      if (finish) {
        store.resetFilters();
        store.state.activeFilters.finishes = [finish];
        store.state.stagedFilters.finishes = [finish];
        store.notify();
      }
      container.querySelectorAll('.has-mega').forEach(m => m.classList.remove('open'));
    });
  });

  container.querySelectorAll('[data-filter-color]').forEach(link => {
    link.addEventListener('click', () => {
      const color = link.dataset.filterColor;
      if (color) {
        store.resetFilters();
        store.state.activeFilters.colors = [color];
        store.state.stagedFilters.colors = [color];
        store.notify();
      }
      container.querySelectorAll('.has-mega').forEach(m => m.classList.remove('open'));
    });
  });

  container.querySelectorAll('[data-filter-texture]').forEach(link => {
    link.addEventListener('click', () => {
      const tex = link.dataset.filterTexture;
      if (tex) {
        store.resetFilters();
        store.state.activeFilters.textures = [tex];
        store.state.stagedFilters.textures = [tex];
        store.notify();
      }
      container.querySelectorAll('.has-mega').forEach(m => m.classList.remove('open'));
    });
  });

  // Tools triggers
  container.querySelectorAll('.tool-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tool = btn.dataset.tool;
      if (tool === 'tile-calculator') {
        store.setModal('calculator', true);
      } else if (tool === '3d-visualiser' || tool === 'view-in-room') {
        store.setModal('visualiser', true);
      } else if (tool === 'virtual-showroom') {
        alert('🏛️ Virtual Showroom Tour: Launching 360° interactive walkthrough of the Kajaria Galaxy Experience Centre.');
      }
    });
  });

  // Favourites quick drawer / notification
  const favBtn = container.querySelector('#header-fav-btn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (store.state.favourites.length === 0) {
        alert('Your shortlist is empty. Click the heart icon (♡) on any tile to save it for comparison or dealer inquiry.');
      } else {
        router.navigate('#products');
      }
    });
  }
}

function updateFavouritesCount(count) {
  const badge = document.getElementById('fav-count-badge');
  if (badge) {
    badge.textContent = count;
  }
}
