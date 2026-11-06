// Homepage View (Translating Slide 15, 16, 30, 31, 32, 33)
import { SPACES, FINISHES, COLORS, COLLECTIONS, TOOLS_LIST, PRODUCTS, LOOKBOOKS } from '../data.js';
import { store } from '../store.js';

const HERO_SLIDES = [
  {
    id: 'living',
    imageAvif: 'https://www.kajariaceramics.com/storage/banner/kajaria-living-desktop-2.avif',
    imageFallback: 'assets/images/banners/kajaria-living-desktop.jpg',
    title: 'Shaping Dreams<br>Into Living Spaces',
    subtitle: 'Set the tone of your space with tiles that go beyond function.',
    ctaText: 'EXPLORE RANGE',
    ctaLink: '#products?space=living-room'
  },
  {
    id: 'bathroom',
    imageAvif: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=85',
    imageFallback: 'assets/images/spaces/bathroom-preview.jpg',
    title: 'Crafted for Everyday<br>Indulgence',
    subtitle: 'Transform personal spaces into spa-like sanctuaries of calm.',
    ctaText: 'EXPLORE BATHROOM TILES',
    ctaLink: '#products?space=bathroom'
  },
  {
    id: 'ultima',
    imageAvif: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85',
    title: 'Expansive Grandeur,<br>Seamless Scale',
    subtitle: 'Large-format architectural vitrified slabs engineered with Italian technology.',
    ctaText: 'DISCOVER THE ULTIMA',
    ctaLink: '#products?collection=The+Ultima'
  },
  {
    id: 'outdoor',
    imageAvif: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=85',
    imageFallback: 'assets/images/spaces/Outdoor-tile.jpg',
    title: 'Resilience for Modern<br>Outdoor Living',
    subtitle: 'Heavy-duty anti-skid surfaces that withstand all weather conditions.',
    ctaText: 'EXPLORE OUTDOOR RANGE',
    ctaLink: '#products?space=outdoor'
  }
];

export function renderHomeView(container) {
  let activeTab = 'spaces'; // 'spaces' | 'finishes' | 'colours'
  let currentSlide = 0;
  let sliderTimer = null;

  function render() {
    container.innerHTML = `
      <!-- 1. Hero Multi-Scroll Slider (Matches Mockup media_1793867196102_06052362.jpg) -->
      <section class="hero-slider-section" id="hero-slider" tabindex="0" aria-label="Hero Showcase">
        <div class="hero-slider-track">
          ${HERO_SLIDES.map((slide, idx) => `
            <div class="hero-slide ${idx === currentSlide ? 'active' : ''}" data-slide-index="${idx}">
              <div class="hero-slide-bg" style="background-image: url('${slide.imageAvif}'), url('${slide.imageFallback}');"></div>
              <div class="hero-slide-overlay"></div>
              <div class="hero-slide-content">
                <h1 class="hero-slide-title">${slide.title}</h1>
                <p class="hero-slide-subtitle">${slide.subtitle}</p>
                <a href="${slide.ctaLink}" class="hero-slide-cta">
                  <span>${slide.ctaText}</span>
                  <span class="hero-cta-circle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Circular Navigation Arrows (Left / Right) -->
        <button class="hero-slider-arrow hero-slider-prev" id="hero-prev-btn" aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="hero-slider-arrow hero-slider-next" id="hero-next-btn" aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <!-- Pagination Dots -->
        <div class="hero-slider-pagination" id="hero-pagination">
          ${HERO_SLIDES.map((_, idx) => `
            <button class="hero-page-dot ${idx === currentSlide ? 'active' : ''}" data-goto-slide="${idx}" aria-label="Slide ${idx + 1}"></button>
          `).join('')}
        </div>

        <!-- Floating Side Utility Tabs (From Mockup media_1793867196102_06052362.jpg) -->
        <aside class="hero-floating-tabs" aria-label="Quick Actions">
          <button class="floating-tab-btn floating-tab-enquire" id="floating-enquire-btn" title="Quick Assistance / Enquire Now">
            <span class="floating-tab-text">ENQUIRE NOW</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button class="floating-tab-btn floating-tab-3d" id="floating-3d-btn" title="3D Visualiser & Showroom">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </button>
        </aside>
      </section>

      <!-- 2. "Find Tiles by Category" Section (Slide 16 - Marazzi inspired) -->
      <section class="category-section">
        <div class="container">
          <div class="section-intro">
            <h2 class="section-title">Find Tiles by Category</h2>
            <p class="section-desc">
              Explore our wide range of tiles across spaces, finishes and colours. Discover surfaces that bring style, strength and lasting beauty to every space.
            </p>
          </div>

          <!-- Category Switching Tabs -->
          <div class="category-tabs-nav">
            <button class="cat-tab-btn ${activeTab === 'spaces' ? 'active' : ''}" data-tab="spaces">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              Spaces
            </button>
            <button class="cat-tab-btn ${activeTab === 'finishes' ? 'active' : ''}" data-tab="finishes">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              Finishes
            </button>
            <button class="cat-tab-btn ${activeTab === 'colours' ? 'active' : ''}" data-tab="colours">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a7 7 0 0 0 0 14 7 7 0 0 0 0-14z"></path>
              </svg>
              Colours
            </button>
          </div>

          <!-- Tab Content Display -->
          <div id="category-tab-content">
            ${renderTabContent(activeTab)}
          </div>
        </div>
      </section>

      <!-- 3. Curated Collections Showcase (Pinned 100vh Sticky Horizontal Scroll) -->
      <section class="collections-scroll-container" id="collections-scroll-container" aria-label="Curated Collections Showcase">
        <div class="collections-sticky-wrapper">
          <div class="container collections-header-container">
            <div class="section-intro text-center">
              <h2 class="collections-heading">Collections</h2>
              <p class="collections-desc">
                Explore our curated selection of stylish and innovative tile designs, crafted to elevate every space with the latest trends.
              </p>
            </div>
          </div>

          <!-- Edge-to-Edge Cards Stage -->
          <div class="collections-stage">
            <div class="collections-track" id="collections-track" role="region" aria-label="Collections Carousel">
              ${COLLECTIONS.map((c, idx) => `
                <div class="collection-card" data-collection-query="${c.query}" data-index="${idx}" role="button" tabindex="0" aria-label="Explore ${c.name} collection">
                  <div class="collection-card-img-wrap">
                    <img src="${c.img}" alt="${c.name} Collection" class="collection-card-img" loading="lazy" />
                  </div>
                  <div class="collection-card-overlay"></div>
                  <div class="collection-card-footer">
                    <span class="collection-card-title">${c.name}</span>
                    <span class="collection-card-arrow" aria-hidden="true">&gt;</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="container">
            <!-- Pagination Indicators (Active pill + dots as in screenshot) -->
            <div class="collections-pagination" id="collections-pagination" aria-label="Collections Pagination">
              ${COLLECTIONS.map((_, idx) => `
                <button class="coll-indicator-pill ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to collection ${idx + 1}"></button>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Unified Tools Hub Bento Grid (Design, Visualise & Specify) -->
      <section class="tools-hub-section" id="tools-section">
        <div class="container">
          <div class="section-intro" style="text-align: center; max-width: 720px; margin: 0 auto 12px;">
            <span style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--kj-accent);">Design, Visualise & Specify</span>
            <h2 class="section-title">Everything You Need to <em style="font-style: italic; font-family: var(--font-heading); color: var(--kj-primary);">Specify Right</em></h2>
            <p class="section-desc">
              Built-in interactive tools and reference calculators to verify capability, calculate tile volumes, and visualize spaces with confidence.
            </p>
          </div>

          <div class="tools-bento-grid">
            <!-- COLUMN 1: AR LIVE PREVIEW (Tool 1) -->
            <div class="bento-col bento-col-1">
              <!-- Card 1: View in Room (AR) Photo Hero Card -->
              <div class="bento-card bento-card-photo bento-card-ar tool-home-trigger" data-tool="view-in-room" role="button" tabindex="0">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="View in Room AR" class="bento-photo-img" />
                <div class="bento-photo-overlay"></div>
                <div class="bento-pill-badge bento-pill-top">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                  <span>Live AR Camera</span>
                </div>
                <div class="bento-card-content bento-content-bottom">
                  <h3 class="bento-card-title bento-title-light">View in Your Room</h3>
                  <p class="bento-card-desc bento-desc-light">
                    Experience any Kajaria slab directly in your actual space with instant phone AR projection or photo upload.
                  </p>
                  <span class="bento-action-link bento-link-light">Launch AR Visualiser →</span>
                </div>
              </div>
            </div>

            <!-- COLUMN 2: CALCULATOR & AI QUIZ SWITCHER (Tools 2 & 3) -->
            <div class="bento-col bento-col-2">
              <!-- Card 2: Precision Tile Calculator -->
              <div class="bento-card bento-card-tinted bento-card-ice tool-home-trigger" data-tool="tile-calculator" role="button" tabindex="0">
                <div class="bento-graphic-header">
                  <div class="bento-icon-graphic">
                    <svg class="bento-doodle-spark doodle-spark-tl" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--kj-primary)" stroke-width="2.5"><path d="M12 2v4M2 12h4M4.93 4.93l2.83 2.83M19.07 4.93l-2.83 2.83"></path></svg>
                    <div class="bento-calculator-glyph">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--kj-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="0"></rect>
                        <line x1="8" y1="6" x2="16" y2="6"></line>
                        <line x1="8" y1="11" x2="10" y2="11"></line>
                        <line x1="14" y1="11" x2="16" y2="11"></line>
                        <line x1="8" y1="15" x2="10" y2="15"></line>
                        <line x1="14" y1="15" x2="16" y2="15"></line>
                      </svg>
                    </div>
                    <svg class="bento-doodle-spark doodle-spark-br" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--kj-primary)" stroke-width="2.5"><path d="M12 18v4M18 12h4M16.24 16.24l2.83 2.83"></path></svg>
                  </div>
                </div>
                <div class="bento-card-content">
                  <h3 class="bento-card-title">Precision Tile Calculator</h3>
                  <p class="bento-card-desc">
                    Calculate exact tile count, box volume, and recommended 10% wastage reserve for your room dimensions in seconds.
                  </p>
                  <span class="bento-action-link bento-link-primary">Calculate Tiles →</span>
                </div>
              </div>

              <!-- Card 3: AI Tile Quiz & Interactive Segmented Switcher -->
              <div class="bento-card bento-card-tinted bento-card-gold" id="bento-quiz-card">
                <div class="bento-switcher-header">
                  <div class="bento-segmented-pill" role="tablist">
                    <button class="bento-seg-btn active" data-space="bathroom" type="button">Bathroom</button>
                    <button class="bento-seg-btn" data-space="living" type="button">Living</button>
                    <button class="bento-seg-btn" data-space="kitchen" type="button">Kitchen</button>
                  </div>
                  <div class="bento-seg-spark">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--kj-gold)" stroke-width="2.5"><path d="M12 2v6M2 12h6M16 12h6M12 16v6"></path></svg>
                  </div>
                </div>
                <div class="bento-card-content">
                  <div class="bento-dynamic-preview" id="bento-quiz-preview">
                    <span class="bento-preview-tag">R10 Anti-Skid · Slabs & Wall Vitrified</span>
                  </div>
                  <h3 class="bento-card-title">AI Tile Quiz & Matcher</h3>
                  <p class="bento-card-desc bento-quiz-desc">
                    Answer a few quick lifestyle questions to receive custom bathroom palettes, slip safety specs, and wet-area pairings.
                  </p>
                  <button class="bento-action-link bento-link-gold tool-home-trigger" data-tool="tile-quiz" type="button">
                    Take Tile Quiz →
                  </button>
                </div>
              </div>
            </div>

            <!-- COLUMN 3: SHOWROOM & 3D VISUALISER (Tools 4 & 5) -->
            <div class="bento-col bento-col-3">
              <!-- Card 4: Virtual Showroom Tour -->
              <div class="bento-card bento-card-tinted bento-card-slate tool-home-trigger" data-tool="virtual-showroom" role="button" tabindex="0">
                <div class="bento-graphic-header bento-graphic-360">
                  <div class="bento-360-badge">
                    <svg class="bento-orbit-ring" width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="var(--kj-primary)" stroke-width="2">
                      <ellipse cx="24" cy="24" rx="20" ry="10" transform="rotate(-20 24 24)"></ellipse>
                      <circle cx="24" cy="24" r="4" fill="var(--kj-primary)"></circle>
                    </svg>
                    <span class="bento-360-val">360°</span>
                  </div>
                </div>
                <div class="bento-card-content">
                  <h3 class="bento-card-title">Virtual Showroom Tour</h3>
                  <p class="bento-card-desc">
                    Walk through our 20,000 sq.ft Kajaria Galaxy experience centre from home with high-definition panoramic navigation.
                  </p>
                  <span class="bento-action-link bento-link-primary">Start Walkthrough →</span>
                </div>
              </div>

              <!-- Card 5: 3D Tile Visualiser Photo Card -->
              <div class="bento-card bento-card-photo bento-card-3d tool-home-trigger" data-tool="3d-visualiser" role="button" tabindex="0">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="3D Tile Visualiser" class="bento-photo-img" />
                <div class="bento-photo-overlay"></div>
                <div class="bento-pill-badge bento-pill-top">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  <span>360° Panoramic Visualiser</span>
                </div>
                <div class="bento-card-content bento-content-bottom">
                  <h3 class="bento-card-title bento-title-light">3D Tile Visualiser</h3>
                  <p class="bento-card-desc bento-desc-light">
                    Explore virtual rooms with dynamic grout colors, lighting conditions, and multi-surface slab mixing.
                  </p>
                  <span class="bento-action-link bento-link-light">Explore 3D Rooms →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Curated Spaces & Architectural Lookbook (Centered Carousel with Annotations) -->
      <section class="lookbook-section" id="lookbook">
        <div class="container">
          <div class="section-intro" style="text-align: center; max-width: 680px; margin: 0 auto 36px;">
            <span style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--kj-accent);">Interactive Inspiration</span>
            <h2 class="section-title">Curated Spaces & Architectural Lookbook</h2>
            <p class="section-desc">
              Explore Kajaria UniTerra bespoke sintered surfaces in luxury spaces. Hover over the interactive hotspots on the spread to view technical specifications.
            </p>
          </div>

          <!-- Centered Carousel Container with Left/Right Arrows -->
          <div class="lookbook-carousel-container">
            <button class="lookbook-arrow-btn lookbook-arrow-prev" id="lookbook-prev-btn" aria-label="Previous Look" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="lookbook-arrow-btn lookbook-arrow-next" id="lookbook-next-btn" aria-label="Next Look" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <div class="lookbook-viewport">
              <div class="lookbook-track" id="lookbook-track">
                ${LOOKBOOKS.map((lb, i) => `
                  <div class="lookbook-card" data-index="${i}">
                    <div class="lookbook-media-wrap">
                      <img src="${lb.spreadImg}" alt="${lb.title} Sintered Surface Lookbook" class="lookbook-media-img" loading="lazy" />

                      <!-- Interactive Hotspots directly on the image -->
                      ${lb.hotspots.map(h => `
                        <div class="lookbook-hotspot" style="top: ${h.y}%; left: ${h.x}%;" data-tile="${h.tile}">
                          <div class="hotspot-pulse"></div>
                          <div class="hotspot-trigger-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kj-primary)" stroke-width="3">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </div>
                          <!-- Hotspot Popover -->
                          <div class="lookbook-popover">
                            <div class="popover-role">${h.title}</div>
                            <div class="popover-tile-name">${h.tile}</div>
                            <div class="popover-tile-detail">${h.detail}</div>
                            <a href="#product-detail?id=${lb.productId}" class="btn btn-primary btn-sm popover-cta">
                              View Product Details →
                            </a>
                          </div>
                        </div>
                      `).join('')}

                      <!-- Floating Bottom Product Annotation Bar -->
                      <div class="lookbook-bottom-annotation">
                        <div class="annotation-text">
                          <div class="annotation-eyebrow">Look ${lb.index} of 03 · ${lb.spaceName}</div>
                          <h3 class="annotation-title">${lb.title}</h3>
                          <div class="annotation-specs">${lb.specs.size} · ${lb.specs.thickness} · ${lb.specs.finish} · ${lb.specs.bodyType}</div>
                        </div>
                        <div class="annotation-actions">
                          <a href="#product-detail?id=${lb.productId}" class="btn btn-primary btn-sm">
                            View Product Details →
                          </a>
                          <button class="btn btn-secondary btn-sm tool-home-trigger" data-tool="3d-visualiser" type="button">
                            📱 View in Room (AR)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Slide Indicator Dots & Counter Below Stage -->
            <div class="lookbook-pagination">
              <div class="lookbook-dots">
                ${LOOKBOOKS.map((_, i) => `
                  <span class="lb-dot ${i === 0 ? 'active' : ''}" data-index="${i}" role="button" tabindex="0"></span>
                `).join('')}
              </div>
              <div class="lookbook-slide-counter">
                <span class="lb-current-num">01</span> / 03
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Tile Quiz Conversion CTA Banner (Slide 30 / Reference Inspired) -->
      <section class="quiz-cta-banner-section" id="quiz-cta-banner">
        <div class="container">
          <div class="quiz-cta-card">
            <!-- Left: Editorial Copy & CTAs -->
            <div class="quiz-cta-content">
              <span class="quiz-cta-eyebrow">
                <span class="quiz-cta-spark">✦</span> AI Design Matcher & Assistant
              </span>
              <h2 class="quiz-cta-heading">
                Still confused? <br>
                <em class="quiz-cta-highlight">Find what you like.</em>
              </h2>
              <p class="quiz-cta-desc">
                With over 3,000+ tile designs, finding the perfect combination can feel overwhelming. Take our 60-second lifestyle quiz to discover your tailored palette, ideal finish, and slip ratings.
              </p>
              
              <div class="quiz-cta-actions">
                <a href="#tile-quiz" class="btn btn-primary quiz-cta-btn">
                  <span>Start Tile Quiz</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
                <span class="quiz-cta-hint">Takes only 60 seconds · No sign-up required</span>
              </div>

              <!-- Trust Micro-Badges -->
              <div class="quiz-cta-trust">
                <div class="quiz-trust-item">
                  <span class="trust-dot"></span>
                  <span>45,000+ Palettes Created</span>
                </div>
                <div class="quiz-trust-item">
                  <span class="trust-dot"></span>
                  <span>Architect & BIS Certified</span>
                </div>
              </div>
            </div>

            <!-- Right: Ambient Visual & Floating Interactive Widget (Reference Inspired) -->
            <div class="quiz-cta-visual">
              <div class="quiz-visual-bg">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" alt="Tile Quiz Room Preview" class="quiz-visual-img" />
                <div class="quiz-visual-overlay"></div>
              </div>

              <!-- Floating Glassmorphic Interactive Widget (like audio pill in Reference 1) -->
              <div class="quiz-interactive-widget" role="region" aria-label="Interactive Tile Quiz Preview">
                <div class="widget-header">
                  <div class="widget-tag">
                    <span class="widget-pulse"></span>
                    <span>Live Matcher Preview</span>
                  </div>
                  <span class="widget-step">Step 01 / 04</span>
                </div>

                <div class="widget-question">
                  Which space are you designing?
                </div>

                <div class="widget-space-chips">
                  <button class="widget-chip active" type="button" data-space="bathroom">
                    <span>🛁 Bathroom</span>
                  </button>
                  <button class="widget-chip" type="button" data-space="living">
                    <span>🛋️ Living Room</span>
                  </button>
                  <button class="widget-chip" type="button" data-space="outdoor">
                    <span>🌿 Patio & Garden</span>
                  </button>
                </div>

                <!-- Match preview result box -->
                <div class="widget-result-box" id="widget-result-box">
                  <div class="widget-result-swatches">
                    <div class="widget-swatch" id="widget-swatch-1" style="background: #fbf9f5;" title="Calacutta Gold"></div>
                    <div class="widget-swatch" id="widget-swatch-2" style="background: #c5beb7;" title="Lithico Beige"></div>
                  </div>
                  <div class="widget-result-text">
                    <div class="result-tile-name" id="result-tile-name">Calacutta Gold + Lithico Beige</div>
                    <div class="result-spec-tag" id="result-spec-tag">Anti-Skid R10 · 98% Lifestyle Match</div>
                  </div>
                </div>

                <a href="#tile-quiz" class="widget-launch-link">
                  <span>Explore Tailored Palette</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Iconic Projects & Landmark Installations (Slide 33) -->
      <section style="padding: 80px 0; background: var(--kj-surface-alt); border-top: 1px solid var(--kj-border-subtle);">
        <div class="container">
          <div class="section-intro">
            <span style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--kj-accent);">Trusted Nationwide & Globally</span>
            <h2 class="section-title">Iconic Projects & Portfolio Showcase</h2>
            <p class="section-desc">
              Discover how architects and developers specify Kajaria high-performance surfaces for international landmark projects.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            <div style="background: white; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--kj-border);">
              <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" style="height: 220px; width: 100%; object-fit: cover;" />
              <div style="padding: 20px;">
                <h4 style="margin-bottom: 4px;">Burj Al Arab</h4>
                <div style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 8px;">Dubai GCC · Hospitality Slabs</div>
                <p style="font-size: 0.85rem; color: var(--kj-text-body);">Specified for ultra-luxury suites and high-moisture private spa chambers.</p>
              </div>
            </div>

            <div style="background: white; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--kj-border);">
              <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80" style="height: 220px; width: 100%; object-fit: cover;" />
              <div style="padding: 20px;">
                <h4 style="margin-bottom: 4px;">Ferrari World</h4>
                <div style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 8px;">Abu Dhabi GCC · Commercial Leisure</div>
                <p style="font-size: 0.85rem; color: var(--kj-text-body);">Heavy-duty high traffic resistance for theme park concourses.</p>
              </div>
            </div>

            <div style="background: white; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--kj-border);">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80" style="height: 220px; width: 100%; object-fit: cover;" />
              <div style="padding: 20px;">
                <h4 style="margin-bottom: 4px;">Atlantis - The Palm</h4>
                <div style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 8px;">Dubai GCC · Resort Architecture</div>
                <p style="font-size: 0.85rem; color: var(--kj-text-body);">Signature marble aesthetics combined with durable impervious vitrification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    attachHomeEvents();
  }

  function renderTabContent(tab) {
    if (tab === 'spaces') {
      return `
        <div class="spaces-grid">
          ${SPACES.map(s => `
            <div class="space-card-home" data-space-id="${s.id}" role="button" tabindex="0" aria-label="Explore ${s.name} tiles">
              <div class="space-card-img-wrap">
                <img src="${s.thumb}" alt="${s.name}" class="space-card-img" loading="lazy" />
              </div>
              <div class="space-card-footer">
                <span class="space-card-title">${s.name}</span>
                <span class="space-card-arrow" aria-hidden="true">→</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align: center;">
          <a href="#products?space=bathroom" class="btn btn-outline btn-lg" style="text-transform: uppercase; font-size: 0.88rem;">
            Explore All Spaces →
          </a>
        </div>
      `;
    } else if (tab === 'finishes') {
      return `
        <div class="finishes-grid">
          ${FINISHES.map(f => `
            <div class="finish-card-home" data-finish-id="${f.id}" data-finish-name="${f.name}" role="button" tabindex="0" title="${f.name} · Kajaria ${f.group} Finish" aria-label="Explore ${f.name} finish tiles">
              <div class="finish-card-thumb-wrap">
                <img src="${f.img}" alt="${f.name}" class="finish-card-img" loading="lazy" />
              </div>
              <span class="finish-card-title">${f.name}</span>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 16px;">
          <a href="#products" class="btn btn-outline btn-lg" style="text-transform: uppercase; font-size: 0.88rem;">
            Explore All Finishes in Catalogue →
          </a>
        </div>
      `;
    } else {
      return `
        <div class="colors-grid">
          ${COLORS.map(c => `
            <div class="color-card-home" data-color-id="${c.id}" role="button" tabindex="0" aria-label="Explore ${c.name} tiles">
              <div class="color-swatch-square" style="background: ${c.gradient || c.hex}; ${c.border ? `border: 1.5px solid ${c.border};` : ''}"></div>
              <span class="color-card-title">${c.name}</span>
              <span class="color-card-count">${c.count}</span>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 16px;">
          <a href="#products" class="btn btn-outline btn-lg" style="text-transform: uppercase; font-size: 0.88rem;">
            Explore All Colours in Catalogue →
          </a>
        </div>
      `;
    }
  }

  function attachHomeEvents() {
    // Hero Slider Functionality
    const slides = container.querySelectorAll('.hero-slide');
    const dots = container.querySelectorAll('.hero-page-dot');

    function goToSlide(idx) {
      if (!slides.length) return;
      currentSlide = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === currentSlide);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    function startAutoSlide() {
      stopAutoSlide();
      sliderTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5500);
    }

    function stopAutoSlide() {
      if (sliderTimer) {
        clearInterval(sliderTimer);
        sliderTimer = null;
      }
    }

    const prevBtn = container.querySelector('#hero-prev-btn');
    const nextBtn = container.querySelector('#hero-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide - 1);
        startAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentSlide + 1);
        startAutoSlide();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const goto = parseInt(dot.dataset.gotoSlide, 10);
        goToSlide(goto);
        startAutoSlide();
      });
    });

    const sliderSection = container.querySelector('#hero-slider');
    if (sliderSection) {
      sliderSection.addEventListener('mouseenter', stopAutoSlide);
      sliderSection.addEventListener('mouseleave', startAutoSlide);

      // Keyboard left/right arrows navigation
      sliderSection.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          goToSlide(currentSlide - 1);
          startAutoSlide();
        } else if (e.key === 'ArrowRight') {
          goToSlide(currentSlide + 1);
          startAutoSlide();
        }
      });

      // Simple Touch swipe support
      let touchStartX = 0;
      let touchEndX = 0;
      sliderSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      sliderSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          goToSlide(currentSlide + 1);
          startAutoSlide();
        } else if (touchEndX - touchStartX > 50) {
          goToSlide(currentSlide - 1);
          startAutoSlide();
        }
      }, { passive: true });
    }

    // Floating side actions (Enquire Now & 3D Visualiser)
    const floatEnquire = container.querySelector('#floating-enquire-btn');
    if (floatEnquire) {
      floatEnquire.addEventListener('click', () => {
        store.setModal('enquiry', true);
      });
    }

    const float3D = container.querySelector('#floating-3d-btn');
    if (float3D) {
      float3D.addEventListener('click', () => {
        store.setModal('visualiser', true);
      });
    }

    // Tab switching in Category Section
    container.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stopAutoSlide();
        activeTab = btn.dataset.tab;
        render();
      });
    });

    // Space card navigation (click & keyboard accessible)
    container.querySelectorAll('.space-card-home').forEach(card => {
      const handleSelect = () => {
        const spaceId = card.dataset.spaceId;
        if (spaceId) {
          store.setActiveSpace(spaceId);
          window.location.hash = `#products?space=${spaceId}`;
        }
      };
      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });

    // Finishes card navigation
    container.querySelectorAll('.finish-card-home').forEach(card => {
      const handleSelect = () => {
        window.location.hash = '#products';
      };
      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });

    // Colours card navigation
    container.querySelectorAll('.color-card-home').forEach(card => {
      const handleSelect = () => {
        const colorId = card.dataset.colorId;
        window.location.hash = colorId ? `#products?color=${colorId}` : '#products';
      };
      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });

    // Collections Pinned 100vh Sticky Horizontal Scroll Engine
    const collContainer = container.querySelector('#collections-scroll-container');
    const collTrack = container.querySelector('#collections-track');
    const collIndicators = container.querySelectorAll('.coll-indicator-pill');
    const collCards = container.querySelectorAll('.collection-card');

    if (collContainer && collTrack && collCards.length) {
      let currentX = 0;
      let targetX = 0;
      let isVisible = false;
      let rafId = null;

      function calculateBounds() {
        const rect = collContainer.getBoundingClientRect();
        const maxScrollY = collContainer.offsetHeight - window.innerHeight;
        
        if (maxScrollY > 0) {
          // Progress is 0 when container top reaches top of viewport, 1 when bottom reaches bottom of viewport
          const progress = Math.max(0, Math.min(1, -rect.top / maxScrollY));
          
          // Calculate total horizontal travel distance
          const trackWidth = collTrack.scrollWidth;
          const maxHorizontal = Math.max(0, trackWidth - window.innerWidth);
          targetX = progress * maxHorizontal;
        }
      }

      function updatePagination(x) {
        if (!collIndicators.length) return;
        const trackWidth = collTrack.scrollWidth;
        const maxHorizontal = Math.max(1, trackWidth - window.innerWidth);
        const progress = Math.max(0, Math.min(1, x / maxHorizontal));
        const activeIndex = Math.min(Math.round(progress * (collCards.length - 1)), collCards.length - 1);
        
        collIndicators.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIndex);
        });
      }

      function renderLoop() {
        if (!isVisible) return;
        
        // Fluid LERP easing: 0.12 gives silky smooth momentum (zero hard-freezly stops!)
        const diff = targetX - currentX;
        if (Math.abs(diff) > 0.05) {
          currentX += diff * 0.12;
          collTrack.style.transform = `translate3d(${-currentX}px, 0, 0)`;
          updatePagination(currentX);
        } else if (currentX !== targetX) {
          currentX = targetX;
          collTrack.style.transform = `translate3d(${-currentX}px, 0, 0)`;
          updatePagination(currentX);
        }
        
        rafId = requestAnimationFrame(renderLoop);
      }

      const onScroll = () => {
        calculateBounds();
        if (isVisible && !rafId) {
          rafId = requestAnimationFrame(renderLoop);
        }
      };

      const onResize = () => {
        calculateBounds();
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });

      // Intersection Observer to run RAF loop only when in or near viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            calculateBounds();
            if (!rafId) {
              rafId = requestAnimationFrame(renderLoop);
            }
          } else if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        });
      }, { rootMargin: '100px 0px' });

      observer.observe(collContainer);

      // Pagination Click Navigation
      collIndicators.forEach(dot => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.dataset.index, 10);
          const maxScrollY = collContainer.offsetHeight - window.innerHeight;
          const containerTop = collContainer.getBoundingClientRect().top + window.scrollY;
          const targetScrollY = containerTop + (idx / (collCards.length - 1)) * maxScrollY;
          window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
        });
      });

      // Card Click Navigation
      collCards.forEach(card => {
        const handleCardSelect = () => {
          const query = card.dataset.collectionQuery;
          if (query) {
            window.location.hash = `#products?collection=${encodeURIComponent(query)}`;
          }
        };
        card.addEventListener('click', handleCardSelect);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardSelect();
          }
        });
      });

      // Initial calculation
      calculateBounds();
      currentX = targetX;
      collTrack.style.transform = `translate3d(${-currentX}px, 0, 0)`;
      updatePagination(currentX);
    }

    // Tools Bento Triggers & Interactive Segmented Switcher
    container.querySelectorAll('.tool-home-trigger').forEach(trigger => {
      const handleTrigger = (e) => {
        // If clicking a sub-button inside this trigger, let the sub-button handle it
        if (e.target !== trigger && e.target.closest('.tool-home-trigger') && e.target.closest('.tool-home-trigger') !== trigger) {
          return;
        }
        const tool = trigger.dataset.tool;
        if (tool === 'tile-quiz') {
          window.location.hash = '#tile-quiz';
        } else if (tool === 'tile-calculator') {
          store.setModal('calculator', true);
        } else if (tool === '3d-visualiser' || tool === 'view-in-room' || tool === 'virtual-showroom') {
          store.setModal('visualiser', true);
        } else if (tool === 'where-to-buy') {
          window.location.hash = '#where-to-buy';
        } else if (tool === 'enquiry-advisory') {
          store.setModal('enquiry', true, { source: 'Senior Design Advisory' });
        }
      };

      trigger.addEventListener('click', handleTrigger);
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTrigger(e);
        }
      });
    });

    // Bento Quiz Interactive Switcher
    const quizCard = container.querySelector('#bento-quiz-card');
    if (quizCard) {
      const segButtons = quizCard.querySelectorAll('.bento-seg-btn');
      const previewEl = quizCard.querySelector('#bento-quiz-preview');
      const descEl = quizCard.querySelector('.bento-quiz-desc');

      const spaceData = {
        bathroom: {
          tag: 'R10 Anti-Skid · Slabs & Wall Vitrified',
          desc: 'Answer a few quick lifestyle questions to receive custom bathroom palettes, slip safety specs, and wet-area pairings.'
        },
        living: {
          tag: '120x240 cm · High Gloss & Satin Porcelain',
          desc: 'Match your lighting and interior aesthetic with grand seamless vitrified slabs and bookmatched feature walls.'
        },
        kitchen: {
          tag: 'Stain & Heat Resistant · Full Body Countertop',
          desc: 'Discover heavy-duty Vitronite slabs engineered for zero water absorption, knife scratch resistance, and easy cleaning.'
        }
      };

      segButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          segButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const space = btn.dataset.space;
          if (spaceData[space]) {
            if (previewEl) {
              previewEl.innerHTML = `<span class="bento-preview-tag">${spaceData[space].tag}</span>`;
            }
            if (descEl) {
              descEl.textContent = spaceData[space].desc;
            }
          }
        });
      });
    }

    // Centered Lookbook Carousel Controller
    const lookbookSection = container.querySelector('#lookbook');
    if (lookbookSection) {
      let currentLbIdx = 0;
      const totalLb = LOOKBOOKS.length;
      const track = lookbookSection.querySelector('#lookbook-track');
      const dots = lookbookSection.querySelectorAll('.lb-dot');
      const counterIdx = lookbookSection.querySelector('.lb-current-num');
      const prevBtn = lookbookSection.querySelector('#lookbook-prev-btn');
      const nextBtn = lookbookSection.querySelector('#lookbook-next-btn');

      function updateLookbook(index) {
        currentLbIdx = (index + totalLb) % totalLb;
        if (track) {
          track.style.transform = `translateX(-${currentLbIdx * 100}%)`;
        }
        if (counterIdx) {
          counterIdx.textContent = String(currentLbIdx + 1).padStart(2, '0');
        }
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentLbIdx);
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => updateLookbook(currentLbIdx - 1));
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => updateLookbook(currentLbIdx + 1));
      }
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.dataset.index, 10);
          updateLookbook(idx);
        });
      });

      // Swipe support on carousel
      let startX = 0;
      let isDragging = false;
      const viewport = lookbookSection.querySelector('.lookbook-viewport');
      if (viewport) {
        viewport.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          isDragging = true;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
          if (!isDragging) return;
          isDragging = false;
          const endX = e.changedTouches[0].clientX;
          const diff = startX - endX;
          if (Math.abs(diff) > 40) {
            if (diff > 0) updateLookbook(currentLbIdx + 1);
            else updateLookbook(currentLbIdx - 1);
          }
        }, { passive: true });
      }
    }

    // Tile Quiz CTA Banner Widget Controller
    const quizCtaBanner = container.querySelector('#quiz-cta-banner');
    if (quizCtaBanner) {
      const chips = quizCtaBanner.querySelectorAll('.widget-chip');
      const swatch1 = quizCtaBanner.querySelector('#widget-swatch-1');
      const swatch2 = quizCtaBanner.querySelector('#widget-swatch-2');
      const nameEl = quizCtaBanner.querySelector('#result-tile-name');
      const specEl = quizCtaBanner.querySelector('#result-spec-tag');

      const spaceProfiles = {
        bathroom: {
          color1: '#fbf9f5',
          color2: '#c5beb7',
          name: 'Calacutta Gold + Lithico Beige',
          spec: 'Anti-Skid R10 · 98% Lifestyle Match'
        },
        living: {
          color1: '#141416',
          color2: '#fbf9f5',
          name: 'Evoque Nero + Calacutta Gold',
          spec: 'High-Gloss 120x240 cm · 96% Match'
        },
        outdoor: {
          color1: '#54585a',
          color2: '#8b8579',
          name: 'Durock Stone + Mineral Concrete',
          spec: 'All-Weather R11 · 99% Durability Match'
        }
      };

      chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.preventDefault();
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');

          const space = chip.dataset.space;
          const prof = spaceProfiles[space];
          if (prof) {
            if (swatch1) swatch1.style.background = prof.color1;
            if (swatch2) swatch2.style.background = prof.color2;
            if (nameEl) nameEl.textContent = prof.name;
            if (specEl) specEl.textContent = prof.spec;
          }
        });
      });
    }

    startAutoSlide();
  }

  render();
}
