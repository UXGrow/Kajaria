// Catalogues Page View (Slides 23 & 24)
import { CATALOGUES } from '../data.js';
import { store } from '../store.js';

export function renderCataloguesView(container) {
  let activeCat = 'Glazed Vitrified Tiles';

  const categories = [
    'Glazed Vitrified Tiles',
    'Gres Tiles',
    'Polished Vitrified Tiles',
    'Ceramic Wall Tiles - EXPORTS',
    'Nepal Catalogues'
  ];

  function render() {
    container.innerHTML = `
      <section class="container" style="padding: 40px 0 80px;">
        <div class="section-intro" style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 2.2rem; color: var(--kj-text-heading); margin-bottom: 8px;">
            View and Download Our Catalogues
          </h1>
          <p style="color: var(--kj-text-muted); font-size: 1rem; max-width: 640px; margin: 0 auto;">
            Explore our wide range of products and discover the perfect tiles for every space, available for easy viewing and enquiry.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 260px 1fr; gap: 36px;">
          <!-- Left Navigation Column (Slide 24) -->
          <div>
            <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 24px;">
              ${categories.map(cat => `
                <div class="cat-nav-item ${cat === activeCat ? 'active' : ''}" data-cat="${cat}" style="padding: 14px 18px; border-bottom: 1px solid var(--kj-border-subtle); cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-weight: ${cat === activeCat ? '700' : '500'}; color: ${cat === activeCat ? 'var(--kj-primary)' : 'var(--kj-text-heading)'}; background: ${cat === activeCat ? 'var(--kj-accent-subtle)' : 'transparent'}; border-left: ${cat === activeCat ? '3px solid var(--kj-primary)' : '3px solid transparent'}; font-size: 0.9rem;">
                  <span>${cat}</span>
                  <span style="color: var(--kj-text-muted);">›</span>
                </div>
              `).join('')}
            </div>

            <!-- "Need help choosing?" Card (Slide 24) -->
            <div class="need-help-card" style="margin-top: 0;">
              <img src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=150&q=80" class="need-help-thumb" alt="Need help choosing?" />
              <div class="need-help-content">
                <h5>Need help choosing?</h5>
                <p>Answer a few simple questions to find your personalized tile palette.</p>
                <a href="#tile-quiz" class="need-help-cta">TAKE TILE QUIZ →</a>
              </div>
            </div>
          </div>

          <!-- Catalogues Grid (Slide 24) -->
          <div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
              ${CATALOGUES.map(cat => `
                <div style="background: white; border: 1px solid var(--kj-border); border-radius: var(--radius-md); overflow: hidden; display: flex; flex-direction: column; box-shadow: var(--shadow-sm); transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                  <div style="aspect-ratio: 3 / 4; overflow: hidden; background: #e2e8f0; position: relative;">
                    <img src="${cat.coverImage}" alt="${cat.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                    <div style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.7); color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 600;">
                      ${cat.fileSize}
                    </div>
                  </div>

                  <div style="padding: 16px; display: flex; flex-direction: column; flex-grow: 1;">
                    <div style="font-size: 0.75rem; color: var(--kj-text-muted); margin-bottom: 4px;">${cat.date}</div>
                    <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; color: var(--kj-text-heading);">${cat.title}</h3>
                    <p style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 16px; flex-grow: 1;">${cat.subTitle}</p>

                    <!-- Triple Action Row (Slide 24) -->
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      <div style="display: flex; gap: 8px;">
                        <button class="btn btn-secondary btn-sm cat-view-btn" style="flex: 1;" data-title="${cat.title}">
                          👁 View
                        </button>
                        <button class="btn btn-primary btn-sm cat-enquire-btn" style="flex: 1;" data-title="${cat.title}">
                          ✉ Enquire
                        </button>
                      </div>
                      <a href="#products" class="btn btn-outline btn-sm" style="text-align: center;">
                        Explore Collection →
                      </a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;

    attachCataloguesEvents();
  }

  function attachCataloguesEvents() {
    container.querySelectorAll('.cat-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        activeCat = item.dataset.cat;
        render();
      });
    });

    container.querySelectorAll('.cat-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert(`📖 Digital Flipbook Viewer: Opening ${btn.dataset.title} in full-screen reader.`);
      });
    });

    container.querySelectorAll('.cat-enquire-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        store.setModal('enquiry', true, {
          tile: btn.dataset.title,
          city: store.state.dealerSearch.query || 'Local Region'
        });
      });
    });
  }

  render();
}
