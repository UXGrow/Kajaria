// Where to Buy & Dealer Locator View (Slides 25, 26, 27, 28)
import { store } from '../store.js';

export function renderWTBView(container) {
  function render() {
    const results = store.getDealerResults();
    const query = store.state.dealerSearch.query;
    const selectedDealerId = store.state.dealerSearch.selectedDealerId;

    container.innerHTML = `
      <!-- 1. Hero & Location Search Header (Slide 26) -->
      <section class="wtb-hero">
        <div class="container">
          <div class="wtb-hero-grid">
            <div>
              <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #93c5fd; display: block; margin-bottom: 8px;">
                WHERE TO BUY
              </span>
              <h1 style="color: #ffffff; font-size: clamp(2rem, 3.5vw, 2.8rem); margin-bottom: 12px;">
                Locate a Store Near You
              </h1>
              <p style="color: #cbd5e1; font-size: 1rem; max-width: 520px;">
                Find authorised Kajaria dealers, exclusive showrooms and experience centres in your city.
              </p>

              <!-- Search Bar -->
              <div class="wtb-search-box">
                <input 
                  type="text" 
                  id="wtb-search-input" 
                  placeholder="Enter your city or PIN code (e.g. New Delhi, 110049, Mumbai)" 
                  value="${query}"
                />
                <button class="btn btn-primary" id="wtb-search-submit">
                  FIND STORES →
                </button>
              </div>

              <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px;">
                <button id="wtb-geo-btn" style="color: #93c5fd; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                  Use my current location
                </button>
              </div>

              <!-- Stats Bar (Slide 26) -->
              <div class="wtb-stats-bar">
                <div>
                  <div class="wtb-stat-number">1,800+</div>
                  <div class="wtb-stat-text">Operating Dealers</div>
                </div>
                <div>
                  <div class="wtb-stat-number">450+</div>
                  <div class="wtb-stat-text">Exclusive Showrooms</div>
                </div>
                <div>
                  <div class="wtb-stat-number">20+</div>
                  <div class="wtb-stat-text">Experience Centres</div>
                </div>
              </div>
            </div>

            <!-- Experience Centre Callout Card -->
            <div style="background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: var(--radius-lg); padding: 24px; color: white;">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80" style="border-radius: var(--radius-md); height: 180px; width: 100%; object-fit: cover; margin-bottom: 16px;" />
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span class="badge badge-accent">Flagship</span>
                <h4 style="color: #ffffff; font-size: 1.15rem;">Find an Experience Centre</h4>
              </div>
              <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 16px;">
                Experience our latest large-format vitrified collections in person with 1:1 architectural consultation.
              </p>
              <button class="btn btn-secondary btn-sm" id="wtb-exp-filter-btn" style="background: white; color: var(--kj-primary); width: 100%;">
                Show Experience Centres Only →
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Interactive Map & Store List Layout (Slide 28) -->
      <section class="container wtb-locator-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="font-size: 1.4rem; color: var(--kj-text-heading);">Locate a Store Around You</h3>
            <p style="font-size: 0.88rem; color: var(--kj-text-muted);">
              Showing ${results.length} authorised locations for "${query || 'All Regions'}"
            </p>
          </div>

          <div style="display: flex; gap: 10px;">
            <select id="wtb-type-filter" class="sort-select">
              <option value="all" ${store.state.dealerSearch.typeFilter === 'all' ? 'selected' : ''}>All Locations</option>
              <option value="Experience Centre" ${store.state.dealerSearch.typeFilter === 'Experience Centre' ? 'selected' : ''}>Experience Centres Only</option>
              <option value="Exclusive Showroom" ${store.state.dealerSearch.typeFilter === 'Exclusive Showroom' ? 'selected' : ''}>Exclusive Showrooms</option>
              <option value="Authorised Dealer" ${store.state.dealerSearch.typeFilter === 'Authorised Dealer' ? 'selected' : ''}>Authorised Dealers</option>
            </select>
          </div>
        </div>

        <div class="wtb-locator-grid">
          <!-- Left: Map Mock with Interactive Pins -->
          <div class="wtb-map-mock">
            <div style="position: absolute; top: 16px; left: 16px; background: white; padding: 6px 12px; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 700; box-shadow: var(--shadow-sm); z-index: 5;">
              🗺️ Interactive Store Map
            </div>

            <!-- Simulated Map Pins -->
            ${results.map((d, index) => {
              const offsets = [
                { top: '35%', left: '48%' },
                { top: '48%', left: '55%' },
                { top: '28%', left: '60%' },
                { top: '65%', left: '40%' },
                { top: '75%', left: '52%' }
              ];
              const pos = offsets[index % offsets.length];
              const isSel = d.id === selectedDealerId;

              return `
                <div class="map-pin ${isSel ? 'active' : ''}" style="top: ${pos.top}; left: ${pos.left};" data-dealer-id="${d.id}" title="${d.name}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
                  </svg>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Right: Dealers Directory List -->
          <div class="wtb-dealer-list">
            ${results.length === 0 ? `
              <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-md); padding: 32px; text-align: center;">
                <h4 style="margin-bottom: 8px;">No Dealer Found For This Location</h4>
                <p style="color: var(--kj-text-muted); font-size: 0.9rem; margin-bottom: 16px;">
                  We couldn't locate an active store matching "${query}".
                </p>
                <button class="btn btn-primary" id="zero-result-contact-btn">
                  Connect with Regional Representative →
                </button>
              </div>
            ` : results.map(d => {
              const isSel = d.id === selectedDealerId;
              return `
                <div class="dealer-card ${isSel ? 'selected' : ''}" data-dealer-id="${d.id}">
                  <div class="dealer-card-header">
                    <h4 class="dealer-name">${d.name}</h4>
                    <span class="dealer-dist">${d.distance}</span>
                  </div>
                  <div style="margin-bottom: 8px;">
                    <span class="badge ${d.type === 'Experience Centre' ? 'badge-primary' : 'badge-subtle'}">${d.type}</span>
                  </div>
                  <p class="dealer-address">${d.address}</p>
                  <div style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 12px;">
                    📞 ${d.phone} &nbsp;·&nbsp; 🕒 ${d.timing}
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-primary btn-sm dealer-enquire-btn" data-dealer-id="${d.id}">
                      Enquire with Store
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="alert('Launching directions for ${d.name} in Google Maps...')">
                      Get Directions
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 3. Crucial Fallback Component (Slide 28) -->
        <div class="wtb-fallback-card">
          <div class="fallback-content">
            <div class="fallback-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div class="fallback-text">
              <h4>Didn't find a centre near your location?</h4>
              <p>Please get in touch with us and our dedicated regional team will help you find the nearest Kajaria authorised dealer.</p>
            </div>
          </div>

          <button class="btn btn-primary btn-lg" id="wtb-fallback-contact-btn">
            CONTACT US &gt;
          </button>
        </div>
      </section>
    `;

    attachWTBEvents();
  }

  function attachWTBEvents() {
    const searchInput = container.querySelector('#wtb-search-input');
    const searchSubmit = container.querySelector('#wtb-search-submit');
    const typeFilter = container.querySelector('#wtb-type-filter');

    const doSearch = () => {
      store.state.dealerSearch.query = searchInput.value.trim();
      render();
    };

    searchSubmit?.addEventListener('click', doSearch);
    searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSearch();
    });

    typeFilter?.addEventListener('change', (e) => {
      store.state.dealerSearch.typeFilter = e.target.value;
      render();
    });

    // Geolocation simulation
    container.querySelector('#wtb-geo-btn')?.addEventListener('click', () => {
      searchInput.value = 'New Delhi';
      doSearch();
    });

    // Experience centre quick filter
    container.querySelector('#wtb-exp-filter-btn')?.addEventListener('click', () => {
      store.state.dealerSearch.typeFilter = 'Experience Centre';
      render();
    });

    // Pin click
    container.querySelectorAll('.map-pin').forEach(pin => {
      pin.addEventListener('click', () => {
        store.state.dealerSearch.selectedDealerId = pin.dataset.dealerId;
        render();
      });
    });

    // Dealer card select
    container.querySelectorAll('.dealer-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          store.state.dealerSearch.selectedDealerId = card.dataset.dealerId;
          render();
        }
      });
    });

    // Enquire with store button
    container.querySelectorAll('.dealer-enquire-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dealer = store.getDealerResults().find(d => d.id === btn.dataset.dealerId);
        store.setModal('enquiry', true, {
          dealer: dealer ? dealer.name : null,
          city: dealer ? dealer.city : null,
          tile: 'Calcuta Imperial A'
        });
      });
    });

    // Fallback CTA triggers (Slide 28)
    const fallbackBtn = container.querySelector('#wtb-fallback-contact-btn');
    const zeroResultBtn = container.querySelector('#zero-result-contact-btn');

    const openFallback = () => {
      store.setModal('enquiry', true, {
        city: store.state.dealerSearch.query || 'Local Region',
        tile: 'Calcuta Imperial A'
      });
    };

    fallbackBtn?.addEventListener('click', openFallback);
    zeroResultBtn?.addEventListener('click', openFallback);
  }

  render();
}
