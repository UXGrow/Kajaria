// Floating Compare Dock & Side-by-Side Comparison Modal
import { store } from '../store.js';
import { PRODUCTS } from '../data.js';

export function initCompareComponent() {
  let dockElem = document.getElementById('compare-dock');
  if (!dockElem) {
    dockElem = document.createElement('div');
    dockElem.id = 'compare-dock';
    dockElem.className = 'compare-dock';
    document.body.appendChild(dockElem);
  }

  let modalElem = document.getElementById('compare-modal-backdrop');
  if (!modalElem) {
    modalElem = document.createElement('div');
    modalElem.id = 'compare-modal-backdrop';
    modalElem.className = 'modal-backdrop';
    document.body.appendChild(modalElem);
  }

  store.subscribe(state => {
    renderCompareDock(dockElem, state.compareList);
    if (state.modals.compare) {
      renderCompareModal(modalElem, state.compareList);
      modalElem.classList.add('active');
    } else {
      modalElem.classList.remove('active');
    }
  });

  // Initial render
  renderCompareDock(dockElem, store.state.compareList);
}

function renderCompareDock(dockElem, compareIds) {
  if (compareIds.length === 0) {
    dockElem.classList.remove('visible');
    return;
  }

  dockElem.classList.add('visible');
  const comparedProducts = compareIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  dockElem.innerHTML = `
    <div class="compare-dock-thumbs">
      ${comparedProducts.map(p => `
        <img src="${p.image}" class="compare-dock-thumb" title="${p.name}" />
      `).join('')}
    </div>
    <div class="compare-dock-info">
      ${compareIds.length} of 4 tiles selected
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="btn btn-secondary btn-sm" id="clear-compare-btn">Clear</button>
      <button class="btn btn-accent btn-sm" id="open-compare-btn">Compare Now</button>
    </div>
  `;

  dockElem.querySelector('#clear-compare-btn')?.addEventListener('click', () => {
    store.clearCompare();
  });

  dockElem.querySelector('#open-compare-btn')?.addEventListener('click', () => {
    store.setModal('compare', true);
  });
}

function renderCompareModal(modalElem, compareIds) {
  const items = compareIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  modalElem.innerHTML = `
    <div class="modal-dialog modal-dialog-large">
      <div class="modal-header">
        <div>
          <h3 class="modal-title">Product Comparison</h3>
          <p style="font-size: 0.85rem; color: var(--kj-text-muted);">Comparing technical specifications and spatial suitability</p>
        </div>
        <button class="btn-icon" id="close-compare-modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        ${items.length === 0 ? `
          <div style="text-align: center; padding: 40px;">
            <p>No tiles selected for comparison. Select tiles on the product listing page to compare them side-by-side.</p>
          </div>
        ` : `
          <div style="overflow-x: auto;">
            <table class="compare-table">
              <thead>
                <tr>
                  <th>Product</th>
                  ${items.map(p => `
                    <td class="compare-product-col">
                      <img src="${p.image}" class="compare-product-img" />
                      <div style="font-weight: 700; color: var(--kj-text-heading); font-size: 0.95rem;">${p.name}</div>
                      <div style="font-size: 0.75rem; color: var(--kj-text-muted); margin-bottom: 8px;">${p.category}</div>
                      <button class="btn-ghost btn-sm remove-compare-btn" data-id="${p.id}" style="color: var(--kj-danger); font-size: 0.75rem;">Remove</button>
                    </td>
                  `).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Dimensions</th>
                  ${items.map(p => `<td>${p.size}</td>`).join('')}
                </tr>
                <tr>
                  <th>Thickness</th>
                  ${items.map(p => `<td>${p.thickness}</td>`).join('')}
                </tr>
                <tr>
                  <th>Finish</th>
                  ${items.map(p => `<td><strong>${p.finish}</strong></td>`).join('')}
                </tr>
                <tr>
                  <th>Surface Texture</th>
                  ${items.map(p => `<td>${p.surface}</td>`).join('')}
                </tr>
                <tr>
                  <th>Color / Shade</th>
                  ${items.map(p => `<td>${p.colorDetail}</td>`).join('')}
                </tr>
                <tr>
                  <th>Slip Resistance</th>
                  ${items.map(p => `<td><span class="badge badge-subtle">${p.slipRating}</span></td>`).join('')}
                </tr>
                <tr>
                  <th>Water Absorption</th>
                  ${items.map(p => `<td>${p.waterAbsorption}</td>`).join('')}
                </tr>
                <tr>
                  <th>Ideal Spaces</th>
                  ${items.map(p => `<td>${p.idealSpaces.map(s => s.replace('-', ' ')).join(', ')}</td>`).join('')}
                </tr>
                <tr>
                  <th>Box Coverage</th>
                  ${items.map(p => `<td>${p.boxCoverage}</td>`).join('')}
                </tr>
                <tr>
                  <th>Next Steps</th>
                  ${items.map(p => `
                    <td>
                      <a href="#where-to-buy" class="btn btn-primary btn-sm compare-enquire-btn" data-tile="${p.name}" style="width: 100%; margin-bottom: 6px;">Find Dealer</a>
                      <a href="#product-detail?id=${p.id}" class="btn btn-secondary btn-sm" style="width: 100%;">View Detail</a>
                    </td>
                  `).join('')}
                </tr>
              </tbody>
            </table>
          </div>
        `}
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="close-compare-modal-footer">Close</button>
      </div>
    </div>
  `;

  // Attach modal events
  modalElem.querySelector('#close-compare-modal')?.addEventListener('click', () => {
    store.setModal('compare', false);
  });
  modalElem.querySelector('#close-compare-modal-footer')?.addEventListener('click', () => {
    store.setModal('compare', false);
  });

  modalElem.querySelectorAll('.remove-compare-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.removeFromCompare(btn.dataset.id);
    });
  });

  modalElem.querySelectorAll('.compare-enquire-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.setModal('compare', false);
    });
  });
}
