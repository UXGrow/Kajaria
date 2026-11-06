// Interactive Tile Calculator Modal Component (Slide 30 & 22)
import { store } from '../store.js';

export function initCalculatorComponent() {
  let modalElem = document.getElementById('calculator-modal-backdrop');
  if (!modalElem) {
    modalElem = document.createElement('div');
    modalElem.id = 'calculator-modal-backdrop';
    modalElem.className = 'modal-backdrop';
    document.body.appendChild(modalElem);
  }

  store.subscribe(state => {
    if (state.modals.calculator) {
      renderCalculatorModal(modalElem);
      modalElem.classList.add('active');
    } else {
      modalElem.classList.remove('active');
    }
  });
}

function renderCalculatorModal(modalElem) {
  modalElem.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <div>
          <h3 class="modal-title">Tile Calculator</h3>
          <p style="font-size: 0.85rem; color: var(--kj-text-muted);">Estimate required tile boxes and coverage for your room</p>
        </div>
        <button class="btn-icon" id="close-calc-modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="calc-grid">
          <div class="calc-inputs">
            <div class="input-group">
              <label class="input-label">Room Length (Feet)</label>
              <input type="number" id="calc-length" class="input-field" value="14" min="1" max="100" />
            </div>

            <div class="input-group">
              <label class="input-label">Room Width (Feet)</label>
              <input type="number" id="calc-width" class="input-field" value="12" min="1" max="100" />
            </div>

            <div class="input-group">
              <label class="input-label">Tile Size Specification</label>
              <select id="calc-tile-size" class="input-field">
                <option value="119x240" selected>119 x 240 cm (30.78 sq.ft / box - 1 pc)</option>
                <option value="119x280">119 x 280 cm (35.84 sq.ft / box - 1 pc)</option>
                <option value="80x160">80 x 160 cm (27.55 sq.ft / box - 2 pcs)</option>
                <option value="60x120">60 x 120 cm (15.50 sq.ft / box - 2 pcs)</option>
              </select>
            </div>

            <div class="input-group">
              <label class="input-label">Wastage / Cutting Allowance (%)</label>
              <div style="display: flex; gap: 10px; align-items: center;">
                <input type="range" id="calc-wastage" min="5" max="20" value="10" style="flex-grow: 1;" />
                <span id="calc-wastage-val" style="font-weight: 700; width: 40px;">10%</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--kj-text-muted);">Industry standard: 10% for straight layouts, 15% for herringbone/diagonal.</span>
            </div>
          </div>

          <div class="calc-results-card">
            <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--kj-text-muted); margin-bottom: 12px;">
              Estimation Summary
            </div>

            <div class="calc-stat-row">
              <span class="calc-stat-label">Net Floor Area:</span>
              <span class="calc-stat-value" id="res-area">168.0 sq.ft</span>
            </div>

            <div class="calc-stat-row">
              <span class="calc-stat-label">Total with Wastage:</span>
              <span class="calc-stat-value" id="res-total-area">184.8 sq.ft</span>
            </div>

            <div class="calc-stat-row">
              <span class="calc-stat-label">Recommended Boxes:</span>
              <span class="calc-stat-value" id="res-boxes" style="color: var(--kj-accent);">6 Boxes</span>
            </div>

            <div class="calc-stat-row">
              <span class="calc-stat-label">Total Pieces:</span>
              <span class="calc-stat-value" id="res-pieces">6 Tiles</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="close-calc-modal-footer">Done</button>
        <a href="#where-to-buy" class="btn btn-primary" id="calc-find-dealer-btn">Locate Dealer with Estimate →</a>
      </div>
    </div>
  `;

  const lengthInput = modalElem.querySelector('#calc-length');
  const widthInput = modalElem.querySelector('#calc-width');
  const sizeSelect = modalElem.querySelector('#calc-tile-size');
  const wastageInput = modalElem.querySelector('#calc-wastage');
  const wastageVal = modalElem.querySelector('#calc-wastage-val');

  const resArea = modalElem.querySelector('#res-area');
  const resTotalArea = modalElem.querySelector('#res-total-area');
  const resBoxes = modalElem.querySelector('#res-boxes');
  const resPieces = modalElem.querySelector('#res-pieces');

  const TILE_DATA = {
    '119x240': { sqftPerBox: 30.78, pcsPerBox: 1 },
    '119x280': { sqftPerBox: 35.84, pcsPerBox: 1 },
    '80x160': { sqftPerBox: 27.55, pcsPerBox: 2 },
    '60x120': { sqftPerBox: 15.50, pcsPerBox: 2 }
  };

  function recalculate() {
    const l = parseFloat(lengthInput.value) || 0;
    const w = parseFloat(widthInput.value) || 0;
    const wastage = parseFloat(wastageInput.value) || 10;
    wastageVal.textContent = wastage + '%';

    const netArea = l * w;
    const grossArea = netArea * (1 + wastage / 100);

    const tileInfo = TILE_DATA[sizeSelect.value] || TILE_DATA['119x240'];
    const boxes = Math.ceil(grossArea / tileInfo.sqftPerBox);
    const pieces = boxes * tileInfo.pcsPerBox;

    resArea.textContent = `${netArea.toFixed(1)} sq.ft (${(netArea * 0.092903).toFixed(1)} m²)`;
    resTotalArea.textContent = `${grossArea.toFixed(1)} sq.ft`;
    resBoxes.textContent = `${boxes} Boxes`;
    resPieces.textContent = `${pieces} Tiles`;
  }

  [lengthInput, widthInput, sizeSelect, wastageInput].forEach(inp => {
    inp.addEventListener('input', recalculate);
  });

  recalculate();

  modalElem.querySelector('#close-calc-modal')?.addEventListener('click', () => {
    store.setModal('calculator', false);
  });
  modalElem.querySelector('#close-calc-modal-footer')?.addEventListener('click', () => {
    store.setModal('calculator', false);
  });
  modalElem.querySelector('#calc-find-dealer-btn')?.addEventListener('click', () => {
    store.setModal('calculator', false);
  });
}
