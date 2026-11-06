// Homepage View (Translating Slide 15, 16, 30, 31, 32, 33)
import { SPACES, FINISHES, COLORS, TOOLS_LIST, PRODUCTS } from '../data.js';
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

      <!-- 3. Unified Tools Hub on Homepage (Slide 30) -->
      <section class="tools-hub-section">
        <div class="container">
          <div class="section-intro">
            <span style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--kj-accent);">Design, Visualise & Specify</span>
            <h2 class="section-title">Everything You Need to Specify Right</h2>
            <p class="section-desc">
              Built-in interactive tools and reference calculators to verify capability, calculate tile volumes, and visualize spaces with confidence.
            </p>
          </div>

          <div class="tools-hub-grid">
            ${TOOLS_LIST.map(t => `
              <div class="tool-card">
                <span class="tool-badge">${t.badge}</span>
                <h3 class="tool-name">${t.name}</h3>
                <p class="tool-desc">${t.description}</p>
                <button class="tool-action-btn tool-home-trigger" data-tool="${t.id}">
                  ${t.actionLabel} →
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 4. Interactive Inspiration Lookbook (Slide 31) -->
      <section class="lookbook-section">
        <div class="container">
          <div class="section-intro">
            <span style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--kj-accent);">Interactive Inspiration</span>
            <h2 class="section-title">Curated Spaces & Architectural Lookbook</h2>
            <p class="section-desc">
              Hover over the interactive hotspots below to discover the exact Kajaria vitrified slabs used in this master bathroom suite.
            </p>
          </div>

          <div class="lookbook-stage">
            <img src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80" alt="Master Bathroom Lookbook" class="lookbook-img" />

            <!-- Hotspot 1: Wall Tile (Calcuta Imperial A) -->
            <div class="lookbook-hotspot" style="top: 36%; left: 42%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--kj-primary)" stroke-width="3">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <div class="lookbook-popover">
                <div style="font-size: 0.72rem; font-weight: 700; color: var(--kj-text-muted); text-transform: uppercase;">Wall Surface</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--kj-text-heading); margin-bottom: 4px;">Calcuta Imperial A</div>
                <div style="font-size: 0.78rem; color: var(--kj-text-muted); margin-bottom: 10px;">119 x 240 cm · Riverwash Finish</div>
                <a href="#product-detail?id=calcuta-imperial-a" class="btn btn-primary btn-sm" style="width: 100%;">View Tile Details</a>
              </div>
            </div>

            <!-- Hotspot 2: Floor Tile (Lithico Beige) -->
            <div class="lookbook-hotspot" style="top: 78%; left: 62%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--kj-primary)" stroke-width="3">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <div class="lookbook-popover">
                <div style="font-size: 0.72rem; font-weight: 700; color: var(--kj-text-muted); text-transform: uppercase;">Floor Surface (Anti-Slip R10)</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--kj-text-heading); margin-bottom: 4px;">Lithico Beige</div>
                <div style="font-size: 0.78rem; color: var(--kj-text-muted); margin-bottom: 10px;">119 x 240 cm · Natural Matt</div>
                <a href="#product-detail?id=lithico-beige" class="btn btn-primary btn-sm" style="width: 100%;">View Tile Details</a>
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
              <div class="color-swatch-circle" style="background: ${c.gradient || c.hex}; ${c.border ? `border: 2px solid ${c.border};` : ''}"></div>
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

    // Tools triggers
    container.querySelectorAll('.tool-home-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        if (tool === 'tile-quiz') {
          window.location.hash = '#tile-quiz';
        } else if (tool === 'tile-calculator') {
          store.setModal('calculator', true);
        } else if (tool === '3d-visualiser' || tool === 'view-in-room') {
          store.setModal('visualiser', true);
        } else if (tool === 'virtual-showroom') {
          alert('🏛️ Virtual Showroom: Opening 360° virtual tour.');
        }
      });
    });

    startAutoSlide();
  }

  render();
}
