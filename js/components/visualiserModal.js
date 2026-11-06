// 3D Tile Visualiser & "View in Room" Demonstration (Slide 30 & 22)
import { store } from '../store.js';

export function initVisualiserComponent() {
  let modalElem = document.getElementById('visualiser-modal-backdrop');
  if (!modalElem) {
    modalElem = document.createElement('div');
    modalElem.id = 'visualiser-modal-backdrop';
    modalElem.className = 'modal-backdrop';
    document.body.appendChild(modalElem);
  }

  store.subscribe(state => {
    if (state.modals.visualiser) {
      renderVisualiserModal(modalElem);
      modalElem.classList.add('active');
    } else {
      modalElem.classList.remove('active');
    }
  });
}

function renderVisualiserModal(modalElem) {
  const PREVIEWS = [
    {
      id: 'calcuta',
      name: 'Calcuta Imperial A',
      finish: 'Riverwash White Marble',
      roomImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
      badge: 'Marble Luxury'
    },
    {
      id: 'lithico',
      name: 'Lithico Beige',
      finish: 'Natural Matt Sandstone',
      roomImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      badge: 'Tactile Organic'
    },
    {
      id: 'marquina',
      name: 'Marquina Black',
      finish: 'High Gloss Nero Vein',
      roomImg: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      badge: 'Dramatic Noir'
    }
  ];

  modalElem.innerHTML = `
    <div class="modal-dialog modal-dialog-large">
      <div class="modal-header">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h3 class="modal-title">Interactive Room Visualiser</h3>
            <span class="badge badge-accent">Demonstrator</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--kj-text-muted);">
            Experience how different Kajaria large format slabs transform the atmosphere of a modern bathroom.
          </p>
        </div>
        <button class="btn-icon" id="close-vis-modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body" style="padding: 16px;">
        <div style="position: relative; width: 100%; height: 420px; border-radius: var(--radius-md); overflow: hidden; background: #000;">
          <img id="vis-display-img" src="${PREVIEWS[0].roomImg}" style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease;" />
          
          <div style="position: absolute; bottom: 16px; left: 16px; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(6px); color: white; padding: 8px 16px; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase;">Active Visualisation</div>
            <div id="vis-active-name" style="font-weight: 700; font-size: 1rem;">${PREVIEWS[0].name}</div>
            <div id="vis-active-finish" style="font-size: 0.8rem; color: #cbd5e1;">${PREVIEWS[0].finish}</div>
          </div>

          <div style="position: absolute; top: 16px; right: 16px; display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" id="vis-room-swap" style="background: rgba(255,255,255,0.9);">
              🔄 Rotate Angle
            </button>
          </div>
        </div>

        <div style="margin-top: 16px;">
          <div style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; color: var(--kj-text-heading); margin-bottom: 10px;">
            Swap Tile Surface:
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${PREVIEWS.map((p, idx) => `
              <div class="vis-tile-choice ${idx === 0 ? 'selected' : ''}" data-idx="${idx}" style="cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--kj-primary)' : 'var(--kj-border)'}; border-radius: var(--radius-sm); padding: 10px; display: flex; align-items: center; gap: 10px; background: var(--kj-surface);">
                <img src="${p.roomImg}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover;" />
                <div>
                  <div style="font-weight: 700; font-size: 0.85rem;">${p.name}</div>
                  <div style="font-size: 0.75rem; color: var(--kj-text-muted);">${p.badge}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="close-vis-modal-footer">Close Visualiser</button>
        <a href="#where-to-buy" class="btn btn-primary" id="vis-locate-dealer">Locate Dealer for this Tile →</a>
      </div>
    </div>
  `;

  const displayImg = modalElem.querySelector('#vis-display-img');
  const activeName = modalElem.querySelector('#vis-active-name');
  const activeFinish = modalElem.querySelector('#vis-active-finish');
  const choices = modalElem.querySelectorAll('.vis-tile-choice');

  choices.forEach(c => {
    c.addEventListener('click', () => {
      const idx = parseInt(c.dataset.idx, 10);
      const sel = PREVIEWS[idx];

      choices.forEach(ch => {
        ch.style.borderColor = 'var(--kj-border)';
      });
      c.style.borderColor = 'var(--kj-primary)';

      displayImg.style.opacity = '0.4';
      setTimeout(() => {
        displayImg.src = sel.roomImg;
        activeName.textContent = sel.name;
        activeFinish.textContent = sel.finish;
        displayImg.style.opacity = '1';
      }, 150);
    });
  });

  modalElem.querySelector('#close-vis-modal')?.addEventListener('click', () => {
    store.setModal('visualiser', false);
  });
  modalElem.querySelector('#close-vis-modal-footer')?.addEventListener('click', () => {
    store.setModal('visualiser', false);
  });
  modalElem.querySelector('#vis-locate-dealer')?.addEventListener('click', () => {
    store.setModal('visualiser', false);
  });
}
