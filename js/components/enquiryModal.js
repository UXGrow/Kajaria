// Assisted Dealer Enquiry & Fallback Modal (Slide 28)
import { store } from '../store.js';

export function initEnquiryComponent() {
  let modalElem = document.getElementById('enquiry-modal-backdrop');
  if (!modalElem) {
    modalElem = document.createElement('div');
    modalElem.id = 'enquiry-modal-backdrop';
    modalElem.className = 'modal-backdrop';
    document.body.appendChild(modalElem);
  }

  store.subscribe(state => {
    if (state.modals.enquiry) {
      renderEnquiryModal(modalElem, state.modals.enquiryContext);
      modalElem.classList.add('active');
    } else {
      modalElem.classList.remove('active');
    }
  });
}

function renderEnquiryModal(modalElem, context) {
  const defaultTile = (context && context.tile) || 'Calcuta Imperial A';
  const defaultCity = (context && context.city) || store.state.dealerSearch.query || 'New Delhi';
  const defaultSpace = store.state.activeSpace ? store.state.activeSpace.replace('-', ' ') : 'Bathroom';

  modalElem.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <div>
          <h3 class="modal-title">Assisted Dealer Connect</h3>
          <p style="font-size: 0.85rem; color: var(--kj-text-muted);">
            Can't find a local centre or need direct assistance? Our regional team will connect you with the nearest authorised dealer.
          </p>
        </div>
        <button class="btn-icon" id="close-enquiry-modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body" id="enquiry-form-container">
        <form id="dealer-enquiry-form" novalidate>
          <div style="background: var(--kj-surface-alt); border: 1px solid var(--kj-border); border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 20px;">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--kj-text-muted); margin-bottom: 4px;">Enquiry Context</div>
            <div style="font-size: 0.9rem; font-weight: 600; color: var(--kj-primary);">
              Tile: ${defaultTile} · Space: ${defaultSpace.toUpperCase()}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="input-group">
              <label class="input-label" for="enq-name">Full Name *</label>
              <input type="text" id="enq-name" class="input-field" placeholder="e.g. Arbaaz Khan" required />
              <span class="field-error" id="err-name" style="display:none; color: var(--kj-danger); font-size: 0.75rem;">Please enter your name</span>
            </div>

            <div class="input-group">
              <label class="input-label" for="enq-phone">Mobile Number *</label>
              <input type="tel" id="enq-phone" class="input-field" placeholder="10-digit mobile number" required />
              <span class="field-error" id="err-phone" style="display:none; color: var(--kj-danger); font-size: 0.75rem;">Enter valid 10-digit phone</span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="input-group">
              <label class="input-label" for="enq-email">Email Address</label>
              <input type="email" id="enq-email" class="input-field" placeholder="name@example.com" />
            </div>

            <div class="input-group">
              <label class="input-label" for="enq-city">City or PIN Code *</label>
              <input type="text" id="enq-city" class="input-field" value="${defaultCity}" required />
              <span class="field-error" id="err-city" style="display:none; color: var(--kj-danger); font-size: 0.75rem;">Please provide location</span>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label" for="enq-intent">I am looking for:</label>
            <select id="enq-intent" class="input-field">
              <option value="showroom-visit">Showroom Visit & Tile Inspection</option>
              <option value="price-quote">Price Quotation & Dealer Contact</option>
              <option value="samples">Order Material Samples</option>
              <option value="architect-support">Architect / Commercial Project Specification</option>
            </select>
          </div>

          <div class="input-group">
            <label class="input-label" for="enq-notes">Additional Requirements (Optional)</label>
            <textarea id="enq-notes" class="input-field" rows="3" placeholder="Tell us about your room size, preferred finishes, or timeline..."></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;">
            <button type="button" class="btn btn-secondary" id="cancel-enquiry-btn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="submit-enquiry-btn">
              Submit Enquiry & Find Dealer →
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Attach events
  modalElem.querySelector('#close-enquiry-modal')?.addEventListener('click', () => {
    store.setModal('enquiry', false);
  });
  modalElem.querySelector('#cancel-enquiry-btn')?.addEventListener('click', () => {
    store.setModal('enquiry', false);
  });

  const form = modalElem.querySelector('#dealer-enquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = modalElem.querySelector('#enq-name').value.trim();
      const phone = modalElem.querySelector('#enq-phone').value.trim();
      const city = modalElem.querySelector('#enq-city').value.trim();

      let hasError = false;

      if (!name) {
        modalElem.querySelector('#err-name').style.display = 'block';
        hasError = true;
      } else {
        modalElem.querySelector('#err-name').style.display = 'none';
      }

      if (!phone || phone.length < 10) {
        modalElem.querySelector('#err-phone').style.display = 'block';
        hasError = true;
      } else {
        modalElem.querySelector('#err-phone').style.display = 'none';
      }

      if (!city) {
        modalElem.querySelector('#err-city').style.display = 'block';
        hasError = true;
      } else {
        modalElem.querySelector('#err-city').style.display = 'none';
      }

      if (hasError) return;

      // Simulated success confirmation
      const ticketId = 'KJ-' + Math.floor(100000 + Math.random() * 900000);
      showEnquiryConfirmation(modalElem, { name, phone, city, ticketId, defaultTile });
    });
  }
}

function showEnquiryConfirmation(modalElem, { name, phone, city, ticketId, defaultTile }) {
  const container = modalElem.querySelector('#enquiry-form-container');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align: center; padding: 30px 10px;">
      <div style="width: 64px; height: 64px; background: var(--kj-success-bg); color: var(--kj-success); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--kj-text-heading); margin-bottom: 8px;">
        Enquiry Successfully Submitted
      </h3>
      <p style="font-size: 0.95rem; color: var(--kj-text-body); max-width: 480px; margin: 0 auto 20px;">
        Thank you, <strong>${name}</strong>! Your request regarding <strong>${defaultTile}</strong> in <strong>${city}</strong> has been routed to our regional dealer network.
      </p>

      <div style="background: var(--kj-surface-alt); border: 1px dashed var(--kj-border-strong); border-radius: var(--radius-sm); padding: 14px; max-width: 360px; margin: 0 auto 24px;">
        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--kj-text-muted);">Enquiry Reference ID</div>
        <div style="font-size: 1.25rem; font-weight: 800; color: var(--kj-primary);">${ticketId}</div>
        <div style="font-size: 0.8rem; color: var(--kj-text-muted); margin-top: 4px;">Expected response: Within 24 business hours</div>
      </div>

      <div style="display: flex; justify-content: center; gap: 12px;">
        <button class="btn btn-secondary" id="confirm-done-btn">Done</button>
        <a href="#products" class="btn btn-primary" id="confirm-explore-btn">Browse More Tiles</a>
      </div>
    </div>
  `;

  container.querySelector('#confirm-done-btn')?.addEventListener('click', () => {
    store.setModal('enquiry', false);
  });
  container.querySelector('#confirm-explore-btn')?.addEventListener('click', () => {
    store.setModal('enquiry', false);
  });
}
