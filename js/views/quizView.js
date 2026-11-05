// Kajaria Tile Quiz View — Interactive Design Assistant Flow & Results Experience
import { quizStore } from '../quiz/quizStore.js';
import { QUIZ_STEPS_CONFIG, logQuizEvent } from '../quiz/quizData.js';
import { generateQuizPDF } from '../quiz/quizPdf.js';
import { store } from '../store.js';
import { DEALERS } from '../data.js';

export function renderQuizView(container) {
  let unsubscribe = null;

  function updateView(state) {
    container.innerHTML = `
      <div class="quiz-page-container">
        <div class="container">
          ${renderQuizContent(state)}
        </div>
      </div>
      ${renderModalOverlays(state)}
    `;

    bindQuizEvents(container, state);
  }

  // Subscribe to changes in quiz state
  unsubscribe = quizStore.subscribe(state => {
    updateView(state);
  });

  // Initial render
  updateView(quizStore.state);

  return () => {
    if (unsubscribe) unsubscribe();
  };
}

// Router for Current Quiz Step
function renderQuizContent(state) {
  const { currentStepId } = state;

  if (currentStepId === 'welcome') {
    return renderWelcomeStep(state);
  }

  if (currentStepId === 'results') {
    return renderResultsStep(state);
  }

  // Questionnaire Steps (1 through 8)
  return renderQuestionnaireShell(state);
}

// 1. Welcome / Entry Screen
function renderWelcomeStep(state) {
  return `
    <div class="quiz-welcome-shell">
      <div class="welcome-badge">
        <span>✨</span>
        <span>AI-Guided Design Assistant</span>
      </div>
      <h1 class="welcome-title">Find tiles that feel right for your space</h1>
      <p class="welcome-sub">
        Answer a few simple questions. Discover a tile palette and combinations tailored to your room, style, and everyday needs.
      </p>

      <div class="welcome-pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon">💡</div>
          <div class="pillar-title">Zero Jargon Needed</div>
          <div class="pillar-desc">No complicated technical codes. We speak in everyday room feelings, colors, and lifestyle habits.</div>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">📐</div>
          <div class="pillar-title">Wall & Floor Pairings</div>
          <div class="pillar-desc">Get coordinated surfaces that look beautiful together, complete with verified anti-skid ratings.</div>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">🏷️</div>
          <div class="pillar-title">Verified Kajaria Products</div>
          <div class="pillar-desc">Real collection specifications you can touch, sample, and order at your nearest dealer.</div>
        </div>
      </div>

      <div>
        <button class="btn-quiz-primary" id="btn-start-quiz" style="padding: 16px 42px; font-size: 1.1rem;">
          Find My Tiles →
        </button>
      </div>
    </div>
  `;
}

// 2. Questionnaire Shell (Progress Bar, Back button, Question Card)
function renderQuestionnaireShell(state) {
  const { currentStepId, answers } = state;
  const stepConfig = QUIZ_STEPS_CONFIG.find(s => s.id === currentStepId);
  if (!stepConfig) return `<div>Step not found</div>`;

  const stepOrder = ['space', 'application', 'room-context', 'mood', 'colors', 'surface', 'usage', 'preferences'];
  const currentIndex = stepOrder.indexOf(currentStepId);
  const progressPct = Math.round(((currentIndex + 1) / stepOrder.length) * 100);

  return `
    <!-- Top Navigation -->
    <div class="quiz-nav-bar">
      <button class="quiz-back-btn" id="btn-quiz-back" title="Go to previous question">
        ‹ Back
      </button>

      <div class="quiz-progress-wrap">
        <div class="quiz-progress-label">
          <span>Step ${currentIndex + 1} of ${stepOrder.length}</span>
          <span>${progressPct}% Completed</span>
        </div>
        <div class="quiz-progress-track">
          <div class="quiz-progress-fill" style="width: ${progressPct}%;"></div>
        </div>
      </div>

      <a href="#home" class="quiz-exit-link">Exit to Home</a>
    </div>

    <!-- Active Question Shell -->
    <div class="quiz-card-shell">
      <div class="quiz-header-block">
        <span class="quiz-step-tag">Step ${currentIndex + 1} · ${stepConfig.title.split(' ')[0]}</span>
        <h2 class="quiz-question-title">${stepConfig.title}</h2>
        <p class="quiz-question-subtitle">${stepConfig.subtitle}</p>
      </div>

      ${renderStepForm(stepConfig, answers)}

      <!-- Bottom Actions -->
      <div class="quiz-actions-bar">
        <div>
          ${stepConfig.isSkippable ? `
            <button class="btn-quiz-secondary" id="btn-quiz-skip">
              Skip this step
            </button>
          ` : `
            <span style="font-size: 0.8rem; color: var(--kj-text-muted);">
              Need to pause? Your answers are saved locally.
            </span>
          `}
        </div>

        <button class="btn-quiz-primary" id="btn-quiz-continue">
          ${currentIndex === stepOrder.length - 1 ? 'See My Recommendations ✨' : 'Continue →'}
        </button>
      </div>
    </div>
  `;
}

// Render dynamic inputs based on step config
function renderStepForm(config, answers) {
  switch (config.id) {
    case 'space':
      return renderSpaceStep(config, answers);
    case 'application':
      return renderApplicationStep(config, answers);
    case 'room-context':
      return renderRoomContextStep(config, answers);
    case 'mood':
      return renderMoodStep(config, answers);
    case 'colors':
      return renderColorsStep(config, answers);
    case 'surface':
      return renderSurfaceStep(config, answers);
    case 'usage':
      return renderUsageStep(config, answers);
    case 'preferences':
      return renderPreferencesStep(config, answers);
    default:
      return '';
  }
}

// Step 1: Space Planning
function renderSpaceStep(config, answers) {
  const selectedSpace = answers.space || 'bathroom';
  return `
    <div class="quiz-options-grid grid-cols-3">
      ${config.options.map(opt => `
        <div class="quiz-opt-card ${selectedSpace === opt.id ? 'selected' : ''}" data-step="space" data-val="${opt.id}">
          <img src="${opt.image}" class="quiz-opt-thumb" alt="${opt.label}" loading="lazy" />
          <div class="quiz-opt-title-row">
            <span class="quiz-opt-name">${opt.icon} ${opt.label}</span>
            <span class="quiz-check-indicator">✓</span>
          </div>
          <p class="quiz-opt-desc">${opt.desc}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// Step 2: Application + Sub-question for Both
function renderApplicationStep(config, answers) {
  const selectedApp = answers.application || 'both';
  const selectedCoord = answers.coordination || 'coordinated';

  return `
    <div class="quiz-options-grid grid-cols-3">
      ${config.options.map(opt => `
        <div class="quiz-opt-card ${selectedApp === opt.id ? 'selected' : ''}" data-step="application" data-val="${opt.id}">
          <div class="quiz-opt-title-row" style="margin-top: 6px;">
            <span class="quiz-opt-name">${opt.icon} ${opt.label}</span>
            <span class="quiz-check-indicator">✓</span>
          </div>
          <p class="quiz-opt-desc">${opt.desc}</p>
        </div>
      `).join('')}
    </div>

    <!-- Conditional Sub-Question for Both -->
    ${selectedApp === 'both' ? `
      <div class="quiz-sub-question-block">
        <h4 class="quiz-sub-title">How would you like the walls and floor to work together?</h4>
        <div class="quiz-options-grid grid-cols-3" style="margin-bottom: 0;">
          ${config.subQuestion.options.map(subOpt => `
            <div class="quiz-opt-card ${selectedCoord === subOpt.id ? 'selected' : ''}" data-step="coordination" data-val="${subOpt.id}">
              <div class="quiz-opt-title-row">
                <span class="quiz-opt-name" style="font-size: 0.95rem;">${subOpt.label}</span>
                <span class="quiz-check-indicator">✓</span>
              </div>
              <p class="quiz-opt-desc" style="font-size: 0.8rem;">${subOpt.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

// Step 3: Room Context (Size, Light, Optional Dimensions)
function renderRoomContextStep(config, answers) {
  const selectedSize = answers.roomSize || 'medium';
  const selectedLight = answers.naturalLight || 'some';

  return `
    <div style="max-width: 760px; margin: 0 auto;">
      <!-- Room Size -->
      <div class="pills-group">
        <label class="pills-label">1. Approximate Room Size</label>
        <div class="pills-row">
          ${config.fields[0].options.map(opt => `
            <button type="button" class="quiz-pill-btn ${selectedSize === opt.id ? 'selected' : ''}" data-step="roomSize" data-val="${opt.id}">
              <span>${opt.label}</span>
              <span class="quiz-pill-hint">(${opt.hint})</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Natural Light -->
      <div class="pills-group">
        <label class="pills-label">2. Natural Sunlight in this Room</label>
        <div class="pills-row">
          ${config.fields[1].options.map(opt => `
            <button type="button" class="quiz-pill-btn ${selectedLight === opt.id ? 'selected' : ''}" data-step="naturalLight" data-val="${opt.id}">
              <span>${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Optional Dimensions -->
      <div class="pills-group" style="background: var(--kj-surface-alt); padding: 18px 20px; border-radius: var(--radius-md); border: 1px dashed var(--kj-border);">
        <label class="pills-label" style="margin-bottom: 6px;">
          3. Room Dimensions (Optional)
        </label>
        <p style="font-size: 0.78rem; color: var(--kj-text-muted); margin-bottom: 12px;">
          If you already have room measurements, enter them below. Otherwise, feel free to leave blank.
        </p>
        <div class="dimensions-row">
          <input type="number" id="input-dim-l" class="dimensions-input" placeholder="Length (ft)" value="${answers.dimensionsL || ''}" />
          <span style="color: var(--kj-text-muted); font-weight: 700;">×</span>
          <input type="number" id="input-dim-w" class="dimensions-input" placeholder="Width (ft)" value="${answers.dimensionsW || ''}" />
        </div>
      </div>
    </div>
  `;
}

// Step 4: Mood & Atmosphere
function renderMoodStep(config, answers) {
  const selectedMood = answers.mood || 'warm-natural';
  return `
    <div class="quiz-options-grid grid-cols-2">
      ${config.options.map(opt => `
        <div class="quiz-opt-card ${selectedMood === opt.id ? 'selected' : ''}" data-step="mood" data-val="${opt.id}">
          <img src="${opt.image}" class="quiz-opt-thumb" alt="${opt.label}" loading="lazy" style="height: 160px;" />
          <div class="quiz-opt-title-row">
            <span class="quiz-opt-name">${opt.label}</span>
            <span class="quiz-check-indicator">✓</span>
          </div>
          <p class="quiz-opt-desc">${opt.desc}</p>
          <div class="quiz-opt-palette-tag">🎨 Palette: ${opt.paletteTag}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// Step 5: Colors Multi-select + Furniture
function renderColorsStep(config, answers) {
  const selectedColors = answers.colors || ['beige-warm'];
  const selectedFitting = answers.fittings || 'wood';

  return `
    <div style="margin-bottom: 14px; font-size: 0.88rem; color: var(--kj-text-muted); display: flex; justify-content: space-between;">
      <span>Choose up to 2 colour directions:</span>
      <span style="font-weight: 700; color: var(--kj-primary);">${selectedColors.length} of 2 selected</span>
    </div>

    <div class="quiz-options-grid grid-cols-3">
      ${config.options.map(opt => {
        const isSelected = selectedColors.includes(opt.id);
        return `
          <div class="quiz-opt-card ${isSelected ? 'selected' : ''}" data-step="colors" data-val="${opt.id}">
            <div class="quiz-opt-title-row">
              <span class="quiz-opt-name" style="font-size: 1rem;">${opt.label}</span>
              <span class="quiz-check-indicator">✓</span>
            </div>
            ${opt.hexList ? `
              <div class="color-swatch-list">
                ${opt.hexList.map(hex => `<span class="color-swatch-dot" style="background: ${hex};"></span>`).join('')}
              </div>
            ` : ''}
            <p class="quiz-opt-desc" style="font-size: 0.8rem;">${opt.desc}</p>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Optional Furniture Context -->
    <div class="quiz-sub-question-block">
      <h4 class="quiz-sub-title" style="margin-bottom: 10px;">${config.furnitureContext.label}</h4>
      <div class="pills-row">
        ${config.furnitureContext.options.map(fOpt => `
          <button type="button" class="quiz-pill-btn ${selectedFitting === fOpt.id ? 'selected' : ''}" data-step="fittings" data-val="${fOpt.id}">
            <span>${fOpt.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// Step 6: Surface Look
function renderSurfaceStep(config, answers) {
  const selectedSurface = answers.surface || 'stone';
  return `
    <div style="background: var(--kj-accent-subtle); padding: 12px 18px; border-radius: var(--radius-sm); margin-bottom: 24px; font-size: 0.84rem; color: var(--kj-primary); border-left: 3px solid var(--kj-primary);">
      <strong>Design Tip:</strong> Surface look defines the organic pattern and texture (like marble veins or stone grain). Finish (how glossy or matte it is) can be customized independently.
    </div>

    <div class="quiz-options-grid grid-cols-3">
      ${config.options.map(opt => `
        <div class="quiz-opt-card ${selectedSurface === opt.id ? 'selected' : ''}" data-step="surface" data-val="${opt.id}">
          <img src="${opt.image}" class="quiz-opt-thumb" alt="${opt.label}" loading="lazy" style="height: 120px;" />
          <div class="quiz-opt-tagline">${opt.tagline}</div>
          <div class="quiz-opt-title-row">
            <span class="quiz-opt-name" style="font-size: 1rem;">${opt.label}</span>
            <span class="quiz-check-indicator">✓</span>
          </div>
          <p class="quiz-opt-desc" style="font-size: 0.8rem;">${opt.desc}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// Step 7: Everyday Usage & Wet Area Clarification
function renderUsageStep(config, answers) {
  const selectedUsage = answers.usage || 'frequent-water';
  const selectedWetRisk = answers.wetAreaRisk || 'yes-wet';
  const showWetCheck = (answers.space === 'bathroom' || answers.space === 'outdoor');

  return `
    <div class="quiz-options-grid grid-cols-3">
      ${config.options.map(opt => `
        <div class="quiz-opt-card ${selectedUsage === opt.id ? 'selected' : ''}" data-step="usage" data-val="${opt.id}">
          <div class="quiz-opt-title-row">
            <span class="quiz-opt-name" style="font-size: 1rem;">${opt.icon} ${opt.label}</span>
            <span class="quiz-check-indicator">✓</span>
          </div>
          <p class="quiz-opt-desc" style="font-size: 0.8rem;">${opt.desc}</p>
        </div>
      `).join('')}
    </div>

    ${showWetCheck ? `
      <div class="quiz-sub-question-block">
        <h4 class="quiz-sub-title" style="color: var(--kj-primary);">
          💧 ${config.wetAreaClarification.title}: ${config.wetAreaClarification.prompt}
        </h4>
        <div class="quiz-options-grid grid-cols-2" style="margin-bottom: 0;">
          ${config.wetAreaClarification.options.map(wOpt => `
            <div class="quiz-opt-card ${selectedWetRisk === wOpt.id ? 'selected' : ''}" data-step="wetAreaRisk" data-val="${wOpt.id}">
              <div class="quiz-opt-title-row">
                <span class="quiz-opt-name" style="font-size: 0.92rem;">${wOpt.label}</span>
                <span class="quiz-check-indicator">✓</span>
              </div>
              <div class="quiz-opt-palette-tag" style="color: var(--kj-primary); font-weight: 700;">
                ✓ ${wOpt.verifiedTag}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

// Step 8: Optional Preferences
function renderPreferencesStep(config, answers) {
  const selectedSize = answers.preferredSize || 'recommend';
  const selectedFinish = answers.preferredFinish || 'recommend';

  return `
    <div style="max-width: 760px; margin: 0 auto;">
      <!-- Preferred Tile Size -->
      <div class="pills-group">
        <label class="pills-label">${config.fields[0].label}</label>
        <p style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 10px;">${config.fields[0].hint}</p>
        <div class="pills-row">
          ${config.fields[0].options.map(opt => `
            <button type="button" class="quiz-pill-btn ${selectedSize === opt.id ? 'selected' : ''}" data-step="preferredSize" data-val="${opt.id}">
              <span>${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Preferred Finish -->
      <div class="pills-group">
        <label class="pills-label">${config.fields[1].label}</label>
        <p style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 10px;">${config.fields[1].hint}</p>
        <div class="pills-row">
          ${config.fields[1].options.map(opt => `
            <button type="button" class="quiz-pill-btn ${selectedFinish === opt.id ? 'selected' : ''}" data-step="preferredFinish" data-val="${opt.id}">
              <span>${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Budget Note -->
      <div style="background: var(--kj-surface-alt); padding: 18px 22px; border-radius: var(--radius-md); border: 1px solid var(--kj-border); margin-top: 24px;">
        <h5 style="font-size: 0.88rem; font-weight: 700; color: var(--kj-primary-dark); margin-bottom: 4px;">
          Pricing Transparency Note
        </h5>
        <p style="font-size: 0.82rem; color: var(--kj-text-muted); line-height: 1.5;">
          ${config.fields[2].content}
        </p>
      </div>
    </div>
  `;
}

// 3. RESULTS EXPERIENCE (Heading, Chips, Switcher, Cards, Actions, PDF)
function renderResultsStep(state) {
  const { answers, results, activeMatchIndex, isSavedToProfile } = state;
  if (!results || results.length === 0) return `<div>Generating recommendations...</div>`;

  const match = results[activeMatchIndex] || results[0];
  const spaceLabel = (answers.space || 'Bathroom').replace('-', ' ');

  return `
    <div class="quiz-results-container">
      <!-- Results Hero Banner -->
      <div class="results-banner">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
          <div>
            <span class="quiz-step-tag">Personalized Design Consultation</span>
            <h1 class="results-main-title">Your personalised tile direction</h1>
          </div>
          <button class="btn-quiz-primary" id="btn-results-wtb" style="padding: 10px 22px; font-size: 0.88rem;">
            Find Authorized Dealers ⌖
          </button>
        </div>

        <p class="results-summary-text">${match.summary}</p>

        <!-- Editable Answer Chips -->
        <div class="answer-chips-wrap">
          <span class="chips-title">Your Inputs (Click to edit):</span>
          <button class="edit-chip-btn" data-edit-step="space" title="Click to edit room space">
            <span>Space: ${spaceLabel}</span>
            <span class="edit-chip-icon">✎</span>
          </button>
          <button class="edit-chip-btn" data-edit-step="application" title="Click to edit application">
            <span>Area: ${(answers.application || 'both')}</span>
            <span class="edit-chip-icon">✎</span>
          </button>
          <button class="edit-chip-btn" data-edit-step="mood" title="Click to edit mood">
            <span>Mood: ${(answers.mood || 'warm-natural').replace('-', ' ')}</span>
            <span class="edit-chip-icon">✎</span>
          </button>
          <button class="edit-chip-btn" data-edit-step="surface" title="Click to edit surface">
            <span>Look: ${(answers.surface || 'stone')}</span>
            <span class="edit-chip-icon">✎</span>
          </button>
          <button class="edit-chip-btn" data-edit-step="usage" title="Click to edit everyday usage">
            <span>Everyday: ${(answers.usage || 'water-safe').replace('-', ' ')}</span>
            <span class="edit-chip-icon">✎</span>
          </button>
        </div>
      </div>

      <!-- Option Switcher Tabs -->
      <div class="results-tabs-bar">
        ${results.map((r, idx) => `
          <button class="option-tab-btn ${activeMatchIndex === idx ? 'active' : ''}" data-match-idx="${idx}">
            <div class="option-tab-badge">${r.badge}</div>
            <div class="option-tab-title">${r.title}</div>
          </button>
        `).join('')}
      </div>

      <!-- Product Showcase Cards Grid -->
      <div class="recommendation-cards-grid">
        ${match.floorTile ? renderTileShowcaseCard(match.floorTile, 'Floor Application', 'slipRating') : ''}
        ${match.wallTile ? renderTileShowcaseCard(match.wallTile, 'Wall Application', 'thickness') : ''}
        ${match.accentTile ? renderTileShowcaseCard(match.accentTile, 'Optional Accent Vanity Tile', 'waterAbsorption') : ''}
      </div>

      <!-- Palette & Reasoning Panel -->
      <div class="palette-reasoning-panel">
        <div class="palette-swatches-box">
          <h4>Coordinated Palette Swatches</h4>
          <p style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 12px;">
            Harmonized tones designed to work in visual equilibrium under natural and artificial light.
          </p>
          <div class="palette-swatches-row">
            ${match.paletteSwatches.map(hex => `
              <div class="palette-swatch-chip" style="background: ${hex};" title="${hex}"></div>
            `).join('')}
          </div>
          <div style="font-size: 0.75rem; color: var(--kj-text-muted);">
            Palette: Floor + Wall + Neutral Accent + Heritage Accent
          </div>
        </div>

        <div class="reasoning-list">
          <h4>Why this direction fits your space</h4>
          <p style="font-size: 0.84rem; color: var(--kj-text-muted); margin-bottom: 12px;">
            ${match.whyFits}
          </p>
          <div>
            ${match.reasons.map(r => `<div class="reason-bullet">${r}</div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Actions Section (Dealer Finder + Enquire Now + Utilities) -->
      <div class="results-actions-card">
        <div class="actions-top-grid">
          <!-- Primary CTA: Where to Buy in-page search -->
          <div class="dealer-cta-box" id="dealer-finder-section">
            <h3>Find Nearby Authorized Dealers</h3>
            <p style="font-size: 0.85rem; color: var(--kj-text-muted);">
              Enter your city or PIN code to see verified Kajaria Galaxy Experience Centres with this recommendation in stock.
            </p>
            <div class="dealer-search-inline">
              <input type="text" id="quiz-dealer-input" class="dealer-search-input" placeholder="Enter city (e.g. New Delhi, Mumbai, Bengaluru)" value="${state.dealerSearchQuery || ''}" />
              <button class="dealer-search-btn" id="btn-quiz-search-dealers">Find Stores</button>
            </div>

            <!-- In-page dealer results container -->
            <div id="quiz-dealer-results" style="margin-top: 16px;"></div>
          </div>

          <!-- Secondary CTA: Enquire Now -->
          <div class="enquiry-cta-box">
            <h4>Request Dealer Consultation</h4>
            <p>Our regional Kajaria representative will connect with you with sample kits, exact box coverage calculation, and delivery timelines.</p>
            <button class="btn-quiz-primary" id="btn-quiz-open-enquiry" style="width: 100%; justify-content: center;">
              Enquire Now for This Palette →
            </button>
          </div>
        </div>

        <!-- Utility Bar: PDF, Profile Save, Edit, Restart -->
        <div class="results-utility-bar">
          <div class="utility-left-links">
            <button class="utility-btn" id="btn-download-pdf">
              📄 Download Suggestion PDF
            </button>
            <button class="utility-btn ${isSavedToProfile ? 'saved' : ''}" id="btn-save-profile">
              ${isSavedToProfile ? '✓ Saved to Profile' : '💾 Save to My Profile'}
            </button>
            <button class="utility-btn" id="btn-edit-answers">
              ✏️ Edit All Answers
            </button>
          </div>

          <div>
            <button class="utility-btn" id="btn-start-again" style="color: var(--kj-danger); border-color: #fecaca;">
              🔄 Start Again
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Individual Tile Showcase Card in Results
function renderTileShowcaseCard(tile, roleLabel, highlightKey) {
  return `
    <div class="showcase-tile-card">
      <div class="showcase-tile-img-wrap">
        <img src="${tile.image}" class="showcase-tile-img" alt="${tile.name}" loading="lazy" />
        <span class="showcase-role-badge">${roleLabel}</span>
      </div>

      <div class="showcase-tile-content">
        <h3 class="showcase-tile-name">${tile.name}</h3>
        <div class="showcase-tile-col">${tile.collection} · ${tile.category}</div>

        <div class="showcase-specs-list">
          <div><span class="spec-item-label">Size:</span> <span class="spec-item-val">${tile.size}</span></div>
          <div><span class="spec-item-label">Finish:</span> <span class="spec-item-val">${tile.finish}</span></div>
          <div><span class="spec-item-label">Slip Rating:</span> <span class="spec-item-val">${tile.slipRating || 'R9'}</span></div>
          <div><span class="spec-item-label">Absorption:</span> <span class="spec-item-val">${tile.waterAbsorption || '< 0.05%'}</span></div>
        </div>

        <p class="showcase-why-fits">${tile.whyFits}</p>

        <a href="#product-detail?id=${tile.id}" class="showcase-details-link">
          Explore Product Details & Specifications →
        </a>
      </div>
    </div>
  `;
}

// Modal Overlays (Restart confirmation & Profile Save)
function renderModalOverlays(state) {
  return `
    <!-- Restart Confirmation Modal -->
    ${state.showConfirmRestart ? `
      <div class="modal-backdrop active" id="quiz-restart-modal">
        <div class="modal-dialog" style="max-width: 440px;">
          <div class="modal-header">
            <h3 class="modal-title">Start a new tile quiz?</h3>
            <button class="btn-icon" id="btn-cancel-restart">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size: 0.9rem; color: var(--kj-text-body); margin-bottom: 20px;">
              Starting again will clear your current answers and recommendations. Would you like to download your suggestion PDF first?
            </p>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
              <button class="btn-quiz-secondary" id="btn-download-before-restart">Download PDF First</button>
              <button class="btn-quiz-primary" id="btn-proceed-restart" style="background: var(--kj-danger);">Yes, Reset Quiz</button>
            </div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Profile Save Modal -->
    ${state.showProfileModal ? `
      <div class="modal-backdrop active" id="quiz-profile-modal">
        <div class="modal-dialog" style="max-width: 460px;">
          <div class="modal-header">
            <h3 class="modal-title">Save to My Profile</h3>
            <button class="btn-icon" id="btn-close-profile-modal">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size: 0.85rem; color: var(--kj-text-muted); margin-bottom: 16px;">
              Save your personalized tile palette so you can access it across devices, present to your interior designer, or take to your dealer visit.
            </p>
            <form id="form-save-profile">
              <div class="input-group" style="margin-bottom: 12px;">
                <label class="input-label" for="profile-name">Your Name</label>
                <input type="text" id="profile-name" class="input-field" placeholder="e.g. Arbaaz Khan" value="${state.userProfile?.name || ''}" required />
              </div>
              <div class="input-group" style="margin-bottom: 20px;">
                <label class="input-label" for="profile-email">Email Address</label>
                <input type="email" id="profile-email" class="input-field" placeholder="e.g. name@example.com" value="${state.userProfile?.email || ''}" required />
              </div>
              <button type="submit" class="btn-quiz-primary" style="width: 100%; justify-content: center;">
                Save Palette to Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    ` : ''}
  `;
}

// Event Bindings
function bindQuizEvents(container, state) {
  // Start Quiz
  const startBtn = container.querySelector('#btn-start-quiz');
  if (startBtn) {
    startBtn.addEventListener('click', () => quizStore.startQuiz());
  }

  // Back Button
  const backBtn = container.querySelector('#btn-quiz-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => quizStore.goBack());
  }

  // Continue Button
  const continueBtn = container.querySelector('#btn-quiz-continue');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      // Collect any inputs in current step
      const dimL = container.querySelector('#input-dim-l')?.value || '';
      const dimW = container.querySelector('#input-dim-w')?.value || '';
      const updates = {};
      if (dimL) updates.dimensionsL = dimL;
      if (dimW) updates.dimensionsW = dimW;

      quizStore.completeStep(state.currentStepId, updates);
    });
  }

  // Skip step button (for preferences)
  const skipBtn = container.querySelector('#btn-quiz-skip');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      quizStore.completeStep(state.currentStepId, {});
    });
  }

  // Single-select Card clicks
  container.querySelectorAll('.quiz-opt-card').forEach(card => {
    card.addEventListener('click', () => {
      const step = card.dataset.step;
      const val = card.dataset.val;

      if (step === 'colors') {
        // Multi-select logic (max 2)
        let currentColors = [...(quizStore.state.answers.colors || [])];
        if (val === 'open-suggestions') {
          currentColors = ['open-suggestions'];
        } else {
          currentColors = currentColors.filter(c => c !== 'open-suggestions');
          const idx = currentColors.indexOf(val);
          if (idx > -1) {
            currentColors.splice(idx, 1);
          } else {
            if (currentColors.length >= 2) {
              currentColors.shift(); // remove oldest
            }
            currentColors.push(val);
          }
        }
        quizStore.state.answers.colors = currentColors;
        quizStore.notify();
      } else {
        // Single select
        quizStore.state.answers[step] = val;
        quizStore.notify();
      }
    });
  });

  // Pill button clicks
  container.querySelectorAll('.quiz-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.dataset.step;
      const val = btn.dataset.val;
      quizStore.state.answers[step] = val;
      quizStore.notify();
    });
  });

  // Editable answer chips in Results
  container.querySelectorAll('[data-edit-step]').forEach(chip => {
    chip.addEventListener('click', () => {
      const targetStep = chip.dataset.editStep;
      quizStore.editStep(targetStep);
    });
  });

  // Option Switcher Tabs in Results
  container.querySelectorAll('[data-match-idx]').forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.matchIdx, 10);
      quizStore.setActiveMatch(idx);
    });
  });

  // Results Actions: Download PDF
  const pdfBtn = container.querySelector('#btn-download-pdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      generateQuizPDF(quizStore.state);
    });
  }

  // Results Actions: Save to Profile
  const saveBtn = container.querySelector('#btn-save-profile');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      quizStore.state.showProfileModal = true;
      quizStore.notify();
    });
  }

  // Results Actions: Edit All Answers
  const editAllBtn = container.querySelector('#btn-edit-answers');
  if (editAllBtn) {
    editAllBtn.addEventListener('click', () => {
      quizStore.editStep('space');
    });
  }

  // Results Actions: Start Again
  const restartBtn = container.querySelector('#btn-start-again');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      quizStore.confirmRestart(true);
    });
  }

  // Results Actions: Enquire Now
  const enqBtn = container.querySelector('#btn-quiz-open-enquiry');
  if (enqBtn) {
    enqBtn.addEventListener('click', () => {
      const currentMatch = quizStore.state.results[quizStore.state.activeMatchIndex];
      const context = {
        tile: `${currentMatch.floorTile ? currentMatch.floorTile.name : ''} & ${currentMatch.wallTile ? currentMatch.wallTile.name : currentMatch.mainTile?.name}`,
        city: quizStore.state.dealerSearchQuery || 'New Delhi',
        space: quizStore.state.answers.space
      };
      logQuizEvent('enquiry_started', context);
      store.setModal('enquiry', true, context);
    });
  }

  // Results Actions: Dealer Locator in-page search
  const dealerSearchBtn = container.querySelector('#btn-quiz-search-dealers');
  const dealerInput = container.querySelector('#quiz-dealer-input');
  const dealerResultsBox = container.querySelector('#quiz-dealer-results');

  function runDealerSearch() {
    const q = (dealerInput?.value || '').trim().toLowerCase();
    quizStore.state.dealerSearchQuery = dealerInput?.value || '';
    logQuizEvent('where_to_buy_selected', { query: q });

    if (!dealerResultsBox) return;

    if (!q) {
      dealerResultsBox.innerHTML = `
        <div style="font-size: 0.82rem; color: var(--kj-text-muted);">
          Please enter a city name (e.g. New Delhi, Mumbai, Bengaluru) to view local dealers.
        </div>
      `;
      return;
    }

    const matches = DEALERS.filter(d => 
      d.city.toLowerCase().includes(q) || 
      d.pin.includes(q) || 
      d.state.toLowerCase().includes(q) ||
      d.name.toLowerCase().includes(q)
    );

    if (matches.length > 0) {
      logQuizEvent('dealer_results_viewed', { count: matches.length });
      dealerResultsBox.innerHTML = `
        <div style="background: var(--kj-surface-alt); border: 1px solid var(--kj-border); border-radius: var(--radius-sm); padding: 14px; max-height: 220px; overflow-y: auto;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--kj-primary); text-transform: uppercase; margin-bottom: 8px;">
            Found ${matches.length} Kajaria Center(s) near "${q}":
          </div>
          ${matches.map(d => `
            <div style="padding: 8px 0; border-bottom: 1px solid var(--kj-border-subtle); font-size: 0.82rem;">
              <strong style="color: var(--kj-primary-dark);">${d.name}</strong> (${d.badge})<br>
              <span style="color: var(--kj-text-muted);">${d.address}, ${d.city} - ${d.pin}</span><br>
              <span style="color: var(--kj-primary); font-weight: 600;">📞 ${d.phone}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      // Empty State Fallback per specification
      logQuizEvent('dealer_results_viewed', { count: 0 });
      dealerResultsBox.innerHTML = `
        <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: var(--radius-sm); padding: 14px; font-size: 0.82rem; color: #92400e;">
          <strong>Couldn't find an authorized dealer in "${q}"?</strong><br>
          Share your details with our team and our regional coordinator will connect you directly with nearest delivery logistics.
          <div style="margin-top: 8px;">
            <button class="btn-quiz-primary" id="btn-dealer-fallback-enquire" style="padding: 6px 14px; font-size: 0.78rem;">
              Contact Assistance Team →
            </button>
          </div>
        </div>
      `;
      const fallbackBtn = dealerResultsBox.querySelector('#btn-dealer-fallback-enquire');
      if (fallbackBtn) {
        fallbackBtn.addEventListener('click', () => {
          store.setModal('enquiry', true, {
            tile: 'Tile Quiz Recommendation',
            city: q,
            space: quizStore.state.answers.space
          });
        });
      }
    }
  }

  if (dealerSearchBtn) {
    dealerSearchBtn.addEventListener('click', runDealerSearch);
  }
  if (dealerInput) {
    dealerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runDealerSearch();
    });
  }

  // Smooth scroll to dealer finder from banner button
  const topWtbBtn = container.querySelector('#btn-results-wtb');
  if (topWtbBtn) {
    topWtbBtn.addEventListener('click', () => {
      const sec = container.querySelector('#dealer-finder-section');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Restart modal listeners
  const cancelRestart = container.querySelector('#btn-cancel-restart');
  if (cancelRestart) {
    cancelRestart.addEventListener('click', () => quizStore.confirmRestart(false));
  }
  const downloadBeforeRestart = container.querySelector('#btn-download-before-restart');
  if (downloadBeforeRestart) {
    downloadBeforeRestart.addEventListener('click', () => {
      generateQuizPDF(quizStore.state);
      quizStore.resetQuiz();
    });
  }
  const proceedRestart = container.querySelector('#btn-proceed-restart');
  if (proceedRestart) {
    proceedRestart.addEventListener('click', () => quizStore.resetQuiz());
  }

  // Profile modal listeners
  const closeProfile = container.querySelector('#btn-close-profile-modal');
  if (closeProfile) {
    closeProfile.addEventListener('click', () => {
      quizStore.state.showProfileModal = false;
      quizStore.notify();
    });
  }
  const profileForm = container.querySelector('#form-save-profile');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = container.querySelector('#profile-name')?.value || 'Guest';
      const email = container.querySelector('#profile-email')?.value || '';
      quizStore.saveToProfile({ name, email });
      quizStore.state.showProfileModal = false;
      quizStore.notify();
    });
  }
}
