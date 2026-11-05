// Kajaria Tile Quiz View — Premium Split-Screen Design Assistant Flow
// Incorporates user's reference designs: Segmented dash progress, tactile rounded option rows, and visual cards with floating check indicators.

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
    return renderWelcomeMasterframe(state);
  }

  if (currentStepId === 'results') {
    return renderResultsDossier(state);
  }

  // Questionnaire Steps (1 through 8) inside the Split Masterframe
  return renderQuestionnaireMasterframe(state);
}

// =========================================================================
// 1. WELCOME SCREEN (Split-Screen Masterframe with Terracotta Patio Image)
// =========================================================================
function renderWelcomeMasterframe(state) {
  return `
    <div class="quiz-stack-wrapper">
      <div class="quiz-stack-layer"></div>

      <div class="quiz-masterframe">
        <!-- Left Editorial Stage with User Uploaded Terracotta Patio Photograph -->
        <div class="quiz-stage-panel quiz-welcome-stage">
          <div class="quiz-stage-overlay"></div>
          <div class="quiz-stage-content">
            <div class="quiz-stage-top-meta">
              <span class="quiz-brand-stamp">
                Kajaria
                <span class="quiz-badge-pill">✦ Design Assistant</span>
              </span>
            </div>

            <div class="quiz-stage-middle">
              <div class="quiz-stage-eyebrow">
                <span>✦</span>
                <span>Editorial Room Planning</span>
              </div>
              <h2 class="quiz-stage-headline">
                Every memorable space begins with the foundation beneath your feet.
              </h2>
              <p class="quiz-stage-subtext">
                Explore curated Kajaria vitrified slabs, authentic Mediterranean terracotta relief, and Italian marble veining tailored to your home lighting.
              </p>
            </div>

            <!-- Floating Glassmorphism Tile Feature Card -->
            <div class="stage-floating-card">
              <img src="assets/images/quiz/tile-terracotta-patio.jpg" class="stage-card-thumb" alt="Kajaria DuRock Terracotta" />
              <div class="stage-card-info">
                <h5>DuRock Terracotta Heritage</h5>
                <p>All-weather vitrified outdoor slab · Certified R11 slip rating</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Interactive Welcome Canvas -->
        <div class="quiz-canvas-panel">
          <div>
            <div class="quiz-badge-pill" style="color: var(--kj-primary); background: #edf4fa; border: none; margin-bottom: 14px; display: inline-block;">
              ✨ AI-Guided Tile Consultation
            </div>

            <h1 class="quiz-main-heading" style="font-size: 2.3rem; margin-bottom: 12px;">
              Find tiles that feel right for your space
            </h1>

            <p class="quiz-main-subheading" style="font-size: 1rem; margin-bottom: 24px;">
              Answer a few simple questions. Discover a tile palette, surface finish, and wall-and-floor combinations tailored to your room, style, and everyday needs.
            </p>

            <!-- 3 Benefit Rows (Inspired by References 1 & 3) -->
            <div class="quiz-welcome-benefits">
              <div class="benefit-row">
                <div class="benefit-icon-box">💡</div>
                <div>
                  <div class="benefit-title">Zero Technical Jargon</div>
                  <div class="benefit-desc">No confusing codes or industry terminology. We guide you through everyday room feelings and living habits.</div>
                </div>
              </div>

              <div class="benefit-row">
                <div class="benefit-icon-box">📐</div>
                <div>
                  <div class="benefit-title">Coordinated Wall & Floor Pairings</div>
                  <div class="benefit-desc">Receive balanced architectural combinations that ensure natural daylight harmony and verified anti-skid foot safety.</div>
                </div>
              </div>

              <div class="benefit-row">
                <div class="benefit-icon-box">🏷️</div>
                <div>
                  <div class="benefit-title">Verified Kajaria Collections</div>
                  <div class="benefit-desc">Real catalogue specifications you can touch, inspect, and order directly from your nearest authorized Kajaria dealer.</div>
                </div>
              </div>
            </div>
          </div>

          <div style="padding-top: 10px;">
            <button class="btn-quiz-primary-pill" id="btn-start-quiz" style="width: 100%; justify-content: center; padding: 16px 28px; font-size: 1.05rem;">
              Find My Tiles →
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// =========================================================================
// 2. QUESTIONNAIRE MASTERFRAME (Split-Screen with Segmented Dashes & Tactile Rows)
// =========================================================================
function renderQuestionnaireMasterframe(state) {
  const { currentStepId, answers } = state;
  const stepConfig = QUIZ_STEPS_CONFIG.find(s => s.id === currentStepId);
  if (!stepConfig) return `<div>Step not found</div>`;

  const stepOrder = ['space', 'application', 'room-context', 'mood', 'colors', 'surface', 'usage', 'preferences'];
  const currentIndex = stepOrder.indexOf(currentStepId);

  // Dynamic Left Stage Imagery based on active step and current selections
  let stageBgImage = 'assets/images/quiz/tile-green-octagon.jpg';
  let stageHeadline = 'Balancing natural light and architectural character.';
  let stageSubtext = 'Our design assistant evaluates slip resistance, grout proportions, and light reflection to ensure your space endures gracefully.';
  let featuredTileName = 'Statuario Octagon Verde';
  let featuredTileSub = 'Octagonal stone geometry · Certified R10 anti-skid';

  if (answers.space === 'outdoor' || currentStepId === 'welcome' || answers.mood === 'warm-natural') {
    stageBgImage = 'assets/images/quiz/tile-terracotta-patio.jpg';
    stageHeadline = 'Earthy terracotta warmth and enduring all-weather durability.';
    featuredTileName = 'DuRock Terracotta Heritage';
    featuredTileSub = 'All-weather vitrified slab · Certified R11 slip rating';
  } else if (answers.space === 'bathroom') {
    stageBgImage = 'assets/images/quiz/tile-green-octagon.jpg';
    stageHeadline = 'Sanctuary comfort with certified wet-area safety.';
    featuredTileName = 'Statuario Octagon Verde';
    featuredTileSub = 'Octagonal Carrara Stone with Emerald Cabochons';
  } else if (answers.space === 'living-room') {
    stageBgImage = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';
    stageHeadline = 'Continuous grand slabs that open up natural daylight.';
    featuredTileName = 'The Ultima Slabs';
    featuredTileSub = '119 x 240 cm seamless porcelain continuous veining';
  }

  // Active Question Number (e.g. QUESTION 01)
  const questionNumberStr = `QUESTION 0${currentIndex + 1}`;

  return `
    <div class="quiz-stack-wrapper">
      <div class="quiz-stack-layer"></div>

      <div class="quiz-masterframe">
        <!-- Left Editorial Stage Panel (Dynamic Visual Context) -->
        <div class="quiz-stage-panel" style="background-image: url('${stageBgImage}');">
          <div class="quiz-stage-overlay"></div>
          <div class="quiz-stage-content">
            <div class="quiz-stage-top-meta">
              <span class="quiz-brand-stamp">
                Kajaria
                <span class="quiz-badge-pill">✦ Design Assistant</span>
              </span>
            </div>

            <div class="quiz-stage-middle">
              <div class="quiz-stage-eyebrow">
                <span>✦</span>
                <span>${answers.space ? answers.space.replace('-', ' ').toUpperCase() : 'ROOM'} PLANNING</span>
              </div>
              <h2 class="quiz-stage-headline">${stageHeadline}</h2>
              <p class="quiz-stage-subtext">${stageSubtext}</p>

              <!-- Live Selection Dossier Tags -->
              <div class="quiz-stage-dossier-pills">
                <span class="stage-dossier-chip">Space: ${(answers.space || 'Bathroom').replace('-', ' ')}</span>
                ${answers.application ? `<span class="stage-dossier-chip">Area: ${answers.application}</span>` : ''}
                ${answers.mood ? `<span class="stage-dossier-chip">Mood: ${answers.mood.replace('-', ' ')}</span>` : ''}
              </div>
            </div>

            <!-- Floating Glassmorphism Tile Feature Card -->
            <div class="stage-floating-card">
              <img src="${stageBgImage}" class="stage-card-thumb" alt="${featuredTileName}" />
              <div class="stage-card-info">
                <h5>${featuredTileName}</h5>
                <p>${featuredTileSub}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Interactive Question Canvas -->
        <div class="quiz-canvas-panel">
          <!-- Top Utility Bar: Segmented Dash Progress Bar (Reference 1) -->
          <div class="quiz-top-bar">
            <div class="quiz-dash-progress">
              ${stepOrder.map((stepId, idx) => {
                let statusClass = '';
                if (idx < currentIndex) statusClass = 'completed';
                else if (idx === currentIndex) statusClass = 'active';
                return `<div class="dash-segment ${statusClass}"></div>`;
              }).join('')}
            </div>

            <div class="quiz-meta-row">
              <span class="quiz-question-number">${questionNumberStr}</span>

              <div style="display: flex; align-items: center; gap: 14px;">
                <a href="#" class="quiz-help-link" id="btn-quiz-quick-help">
                  Having trouble? Ask an expert
                </a>
                <button class="quiz-close-x" id="btn-quiz-exit-x" title="Exit to Home">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Active Question Header -->
          <div class="quiz-question-header">
            <span class="quiz-instruction-tag">
              ${stepConfig.type === 'multi-select' ? 'SELECT UP TO TWO' : 'SELECT ONLY ONE'}
            </span>
            <h2 class="quiz-main-heading">${stepConfig.title}</h2>
            <p class="quiz-main-subheading">${stepConfig.subtitle}</p>
          </div>

          <!-- Question Options Body -->
          <div style="flex: 1;">
            ${renderStepForm(stepConfig, answers)}
          </div>

          <!-- Bottom Action Bar (References 1 & 3) -->
          <div class="quiz-bottom-actions">
            <div>
              ${currentIndex > 0 ? `
                <button class="btn-quiz-back-text" id="btn-quiz-back">
                  ‹ Back
                </button>
              ` : `
                <span style="font-size: 0.8rem; color: var(--kj-text-muted);">
                  Auto-saved locally
                </span>
              `}
            </div>

            <div style="display: flex; gap: 12px; align-items: center;">
              ${stepConfig.isSkippable ? `
                <button class="btn-quiz-back-text" id="btn-quiz-skip" style="color: var(--kj-primary);">
                  Skip this step
                </button>
              ` : ''}

              <button class="btn-quiz-primary-pill" id="btn-quiz-continue">
                ${currentIndex === stepOrder.length - 1 ? 'See Recommendations ✨' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
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

// Step 1: Space Planning (Tactile Rows inspired by Reference 3: febf3dbc.png)
function renderSpaceStep(config, answers) {
  const selectedSpace = answers.space || 'bathroom';
  return `
    <div class="quiz-rows-list">
      ${config.options.map(opt => {
        const isSelected = selectedSpace === opt.id;
        return `
          <div class="quiz-row-card ${isSelected ? 'selected' : ''}" data-step="space" data-val="${opt.id}">
            <div class="row-icon-box">${opt.icon}</div>
            <div class="row-text-stack">
              <div class="row-title">${opt.label}</div>
              <div class="row-desc">${opt.desc}</div>
            </div>
            <div class="row-radio-circle">
              <div class="row-radio-dot"></div>
            </div>
            <div class="row-arrow-indicator">→</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Step 2: Application + Sub-question for Both (Tactile Rows)
function renderApplicationStep(config, answers) {
  const selectedApp = answers.application || 'both';
  const selectedCoord = answers.coordination || 'coordinated';

  return `
    <div class="quiz-rows-list">
      ${config.options.map(opt => {
        const isSelected = selectedApp === opt.id;
        return `
          <div class="quiz-row-card ${isSelected ? 'selected' : ''}" data-step="application" data-val="${opt.id}">
            <div class="row-icon-box">${opt.icon}</div>
            <div class="row-text-stack">
              <div class="row-title">${opt.label}</div>
              <div class="row-desc">${opt.desc}</div>
            </div>
            <div class="row-radio-circle">
              <div class="row-radio-dot"></div>
            </div>
            <div class="row-arrow-indicator">→</div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Conditional Sub-Question for Both -->
    ${selectedApp === 'both' ? `
      <div style="background: #f8fafc; border: 1.5px solid var(--kj-border); border-left: 4px solid var(--kj-primary); border-radius: 14px; padding: 20px; margin-top: 18px; animation: fadeIn 0.3s ease;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--kj-primary-dark); margin-bottom: 12px;">
          How would you like the walls and floor to work together?
        </h4>
        <div class="quiz-rows-list" style="margin-bottom: 0;">
          ${config.subQuestion.options.map(subOpt => {
            const isSubSelected = selectedCoord === subOpt.id;
            return `
              <div class="quiz-row-card ${isSubSelected ? 'selected' : ''}" style="padding: 12px 16px;" data-step="coordination" data-val="${subOpt.id}">
                <div class="row-text-stack">
                  <div class="row-title" style="font-size: 0.95rem;">${subOpt.label}</div>
                  <div class="row-desc" style="font-size: 0.8rem;">${subOpt.desc}</div>
                </div>
                <div class="row-radio-circle">
                  <div class="row-radio-dot"></div>
                </div>
              </div>
            `;
          }).join('')}
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
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Room Size -->
      <div>
        <label style="font-size: 0.88rem; font-weight: 700; color: var(--kj-text-body); margin-bottom: 10px; display: block;">
          1. Approximate Room Size
        </label>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${config.fields[0].options.map(opt => `
            <button type="button" class="quiz-pill-btn ${selectedSize === opt.id ? 'selected' : ''}" data-step="roomSize" data-val="${opt.id}">
              <span>${opt.label}</span>
              <span class="quiz-pill-hint">(${opt.hint})</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Natural Light -->
      <div>
        <label style="font-size: 0.88rem; font-weight: 700; color: var(--kj-text-body); margin-bottom: 10px; display: block;">
          2. Natural Sunlight in this Room
        </label>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${config.fields[1].options.map(opt => `
            <button type="button" class="quiz-pill-btn ${selectedLight === opt.id ? 'selected' : ''}" data-step="naturalLight" data-val="${opt.id}">
              <span>${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Optional Dimensions -->
      <div style="background: #f8fafc; padding: 18px 20px; border-radius: 14px; border: 1.5px dashed var(--kj-border);">
        <label style="font-size: 0.88rem; font-weight: 700; color: var(--kj-text-body); margin-bottom: 4px; display: block;">
          3. Room Dimensions (Optional)
        </label>
        <p style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 12px;">
          If you know your room dimensions, enter them below for tailored slab scale recommendations.
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

// Step 4: Mood & Atmosphere (Visual Cards inspired by Reference 2: 5197c7f8.jpg)
function renderMoodStep(config, answers) {
  const selectedMood = answers.mood || 'warm-natural';
  return `
    <div class="quiz-visual-grid visual-cols-2">
      ${config.options.map(opt => {
        const isSelected = selectedMood === opt.id;
        return `
          <div class="quiz-visual-card ${isSelected ? 'selected' : ''}" data-step="mood" data-val="${opt.id}">
            <div class="visual-card-thumb-wrap" style="height: 130px;">
              <img src="${opt.image}" class="visual-card-thumb" alt="${opt.label}" loading="lazy" />
              <div class="visual-check-badge">✓</div>
            </div>
            <div class="visual-card-title">${opt.label}</div>
            <div class="visual-card-desc">${opt.desc}</div>
            <div class="visual-palette-tag">🎨 ${opt.paletteTag}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Step 5: Colors Multi-select + Furniture (References 1 & 2)
function renderColorsStep(config, answers) {
  const selectedColors = answers.colors || ['beige-warm'];
  const selectedFitting = answers.fittings || 'wood';

  return `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
      <span style="font-size: 0.82rem; color: var(--kj-text-muted);">Choose up to 2 colour directions:</span>
      <span style="font-size: 0.78rem; font-weight: 800; color: var(--kj-primary); background: #edf4fa; padding: 3px 10px; border-radius: var(--radius-full);">
        ${selectedColors.length} of 2 selected
      </span>
    </div>

    <div class="quiz-visual-grid visual-cols-3">
      ${config.options.map(opt => {
        const isSelected = selectedColors.includes(opt.id);
        return `
          <div class="quiz-visual-card ${isSelected ? 'selected' : ''}" data-step="colors" data-val="${opt.id}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div class="visual-card-title" style="font-size: 0.94rem;">${opt.label}</div>
              <div class="row-radio-circle" style="width: 18px; height: 18px;">
                <div class="row-radio-dot" style="${isSelected ? 'transform: scale(1);' : ''}"></div>
              </div>
            </div>
            ${opt.hexList ? `
              <div class="color-swatch-list">
                ${opt.hexList.map(hex => `<span class="color-swatch-dot" style="background: ${hex}; width: 18px; height: 18px;"></span>`).join('')}
              </div>
            ` : ''}
            <div class="visual-card-desc" style="font-size: 0.75rem;">${opt.desc}</div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Optional Furniture Context -->
    <div style="background: #f8fafc; border: 1.5px solid var(--kj-border); border-radius: 14px; padding: 18px; margin-top: 14px;">
      <label style="font-size: 0.85rem; font-weight: 700; color: var(--kj-primary-dark); margin-bottom: 10px; display: block;">
        ${config.furnitureContext.label}
      </label>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${config.furnitureContext.options.map(fOpt => `
          <button type="button" class="quiz-pill-btn ${selectedFitting === fOpt.id ? 'selected' : ''}" style="padding: 7px 14px; font-size: 0.8rem;" data-step="fittings" data-val="${fOpt.id}">
            <span>${fOpt.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// Step 6: Surface Look (Reference 2 with user's photograph assets)
function renderSurfaceStep(config, answers) {
  const selectedSurface = answers.surface || 'stone';
  return `
    <div style="background: #edf4fa; border-left: 3px solid var(--kj-primary); padding: 10px 16px; border-radius: 8px; margin-bottom: 18px; font-size: 0.82rem; color: var(--kj-primary);">
      <strong>Surface distinction:</strong> Surface look defines the organic pattern and texture; finish defines light reflection.
    </div>

    <div class="quiz-visual-grid visual-cols-3">
      ${config.options.map(opt => {
        const isSelected = selectedSurface === opt.id;
        return `
          <div class="quiz-visual-card ${isSelected ? 'selected' : ''}" data-step="surface" data-val="${opt.id}">
            <div class="visual-card-thumb-wrap" style="height: 100px;">
              <img src="${opt.image}" class="visual-card-thumb" alt="${opt.label}" loading="lazy" />
              <div class="visual-check-badge">✓</div>
            </div>
            <div class="visual-card-tagline">${opt.tagline}</div>
            <div class="visual-card-title">${opt.label}</div>
            <div class="visual-card-desc">${opt.desc}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Step 7: Everyday Usage & Wet Area Safety
function renderUsageStep(config, answers) {
  const selectedUsage = answers.usage || 'frequent-water';
  const selectedWetRisk = answers.wetAreaRisk || 'yes-wet';
  const showWetCheck = (answers.space === 'bathroom' || answers.space === 'outdoor');

  return `
    <div class="quiz-rows-list">
      ${config.options.map(opt => {
        const isSelected = selectedUsage === opt.id;
        return `
          <div class="quiz-row-card ${isSelected ? 'selected' : ''}" style="padding: 13px 18px;" data-step="usage" data-val="${opt.id}">
            <div class="row-icon-box" style="width: 40px; height: 40px; font-size: 18px;">${opt.icon}</div>
            <div class="row-text-stack">
              <div class="row-title" style="font-size: 0.98rem;">${opt.label}</div>
              <div class="row-desc" style="font-size: 0.8rem;">${opt.desc}</div>
            </div>
            <div class="row-radio-circle">
              <div class="row-radio-dot"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    ${showWetCheck ? `
      <div style="background: #fffbeb; border: 1.5px solid #fef3c7; border-left: 4px solid var(--kj-primary); border-radius: 14px; padding: 18px; margin-top: 14px;">
        <h4 style="font-size: 0.9rem; font-weight: 700; color: #92400e; margin-bottom: 10px;">
          💧 ${config.wetAreaClarification.title}: ${config.wetAreaClarification.prompt}
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${config.wetAreaClarification.options.map(wOpt => {
            const isWetSelected = selectedWetRisk === wOpt.id;
            return `
              <div class="quiz-row-card ${isWetSelected ? 'selected' : ''}" style="padding: 10px 14px; margin-bottom: 0;" data-step="wetAreaRisk" data-val="${wOpt.id}">
                <div class="row-text-stack">
                  <div class="row-title" style="font-size: 0.88rem;">${wOpt.label}</div>
                  <div style="font-size: 0.74rem; font-weight: 700; color: var(--kj-primary); margin-top: 2px;">
                    ✓ ${wOpt.verifiedTag}
                  </div>
                </div>
                <div class="row-radio-circle" style="width: 18px; height: 18px;">
                  <div class="row-radio-dot"></div>
                </div>
              </div>
            `;
          }).join('')}
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
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <label style="font-size: 0.88rem; font-weight: 700; color: var(--kj-text-body); margin-bottom: 6px; display: block;">
          ${config.fields[0].label}
        </label>
        <p style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 10px;">${config.fields[0].hint}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${config.fields[0].options.map(opt => `
            <button type="button" class="quiz-pill-btn ${selectedSize === opt.id ? 'selected' : ''}" data-step="preferredSize" data-val="${opt.id}">
              <span>${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div>
        <label style="font-size: 0.88rem; font-weight: 700; color: var(--kj-text-body); margin-bottom: 6px; display: block;">
          ${config.fields[1].label}
        </label>
        <p style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 10px;">${config.fields[1].hint}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${config.fields[1].options.map(opt => `
            <button type="button" class="quiz-pill-btn ${selectedFinish === opt.id ? 'selected' : ''}" data-step="preferredFinish" data-val="${opt.id}">
              <span>${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div style="background: #f8fafc; padding: 16px 20px; border-radius: 12px; border: 1.5px solid var(--kj-border);">
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

// =========================================================================
// 3. RESULTS EXPERIENCE (Luxury Consultation Dossier)
// =========================================================================
function renderResultsDossier(state) {
  const { answers, results, activeMatchIndex, isSavedToProfile } = state;
  if (!results || results.length === 0) return `<div>Generating recommendations...</div>`;

  const match = results[activeMatchIndex] || results[0];
  const spaceLabel = (answers.space || 'Bathroom').replace('-', ' ');

  return `
    <div class="quiz-results-wrapper">
      <!-- Top Hero Banner with Editable Answer Chips -->
      <div class="results-dossier-hero">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap;">
          <div>
            <div class="results-eyebrow">
              <span>✦</span>
              <span>Personalized Architectural Direction</span>
            </div>
            <h1 class="results-title">Your personalised tile direction</h1>
          </div>
          <button class="btn-quiz-primary-pill" id="btn-results-wtb" style="padding: 10px 24px; font-size: 0.88rem;">
            Find Authorized Dealers ⌖
          </button>
        </div>

        <p class="results-summary-p">${match.summary}</p>

        <!-- Editable Answer Chips -->
        <div class="results-chips-bar">
          <span class="chips-lead-label">Your Choices (Click to edit):</span>
          <button class="dossier-edit-chip" data-edit-step="space" title="Click to edit room space">
            <span>Space: ${spaceLabel}</span>
            <span>✎</span>
          </button>
          <button class="dossier-edit-chip" data-edit-step="application" title="Click to edit application">
            <span>Area: ${(answers.application || 'both')}</span>
            <span>✎</span>
          </button>
          <button class="dossier-edit-chip" data-edit-step="mood" title="Click to edit mood">
            <span>Mood: ${(answers.mood || 'warm-natural').replace('-', ' ')}</span>
            <span>✎</span>
          </button>
          <button class="dossier-edit-chip" data-edit-step="surface" title="Click to edit surface look">
            <span>Look: ${(answers.surface || 'stone')}</span>
            <span>✎</span>
          </button>
          <button class="dossier-edit-chip" data-edit-step="usage" title="Click to edit everyday usage">
            <span>Everyday: ${(answers.usage || 'water-safe').replace('-', ' ')}</span>
            <span>✎</span>
          </button>
        </div>
      </div>

      <!-- Option Switcher Tabs -->
      <div class="results-switcher-tabs">
        ${results.map((r, idx) => `
          <button class="dossier-tab-btn ${activeMatchIndex === idx ? 'active' : ''}" data-match-idx="${idx}">
            <div class="tab-badge-text">${r.badge}</div>
            <div class="tab-title-text">${r.title}</div>
          </button>
        `).join('')}
      </div>

      <!-- Recommendation Cards Grid -->
      <div class="dossier-cards-grid">
        ${match.floorTile ? renderDossierTileCard(match.floorTile, 'Floor Application') : ''}
        ${match.wallTile ? renderDossierTileCard(match.wallTile, 'Wall Application') : ''}
        ${match.accentTile ? renderDossierTileCard(match.accentTile, 'Vanity / Accent Feature') : ''}
      </div>

      <!-- Palette & Reasoning Insight Grid -->
      <div class="dossier-insight-grid">
        <div class="dossier-palette-box">
          <h4>Coordinated Palette Swatches</h4>
          <p style="font-size: 0.8rem; color: var(--kj-text-muted); margin-bottom: 14px;">
            Harmonized color values selected to balance sunlight and lighting tone.
          </p>
          <div class="dossier-palette-chips">
            ${match.paletteSwatches.map(hex => `
              <div class="dossier-swatch" style="background: ${hex};" title="${hex}"></div>
            `).join('')}
          </div>
          <div style="font-size: 0.74rem; color: var(--kj-text-muted);">
            Floor + Wall + Neutral Base + Heritage Brass Accent
          </div>
        </div>

        <div class="dossier-reasoning-box">
          <h4>Why this direction fits your space</h4>
          <p style="font-size: 0.86rem; color: var(--kj-text-muted); margin-bottom: 14px;">
            ${match.whyFits}
          </p>
          <div>
            ${match.reasons.map(r => `<div class="dossier-bullet-item">${r}</div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Connected Actions: Dealer Locator + Enquiry + Utilities -->
      <div class="dossier-actions-panel">
        <div class="dossier-actions-row">
          <!-- Dealer Search Section -->
          <div id="dealer-finder-section">
            <h3 class="dealer-box-title">Find Nearby Authorized Dealers</h3>
            <p style="font-size: 0.85rem; color: var(--kj-text-muted);">
              Enter your city or PIN code to see verified Kajaria Galaxy Experience Centres with this recommendation in stock.
            </p>
            <div class="dealer-search-cluster">
              <input type="text" id="quiz-dealer-input" class="dealer-input-round" placeholder="Enter city (e.g. New Delhi, Mumbai, Bengaluru)" value="${state.dealerSearchQuery || ''}" />
              <button class="btn-quiz-primary-pill" id="btn-quiz-search-dealers" style="padding: 10px 22px;">Find Stores</button>
            </div>
            <div id="quiz-dealer-results" style="margin-top: 16px;"></div>
          </div>

          <!-- Enquiry Section -->
          <div style="background: #f8fafc; border: 1.5px solid var(--kj-border); border-radius: 16px; padding: 22px; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--kj-primary-dark); margin-bottom: 6px;">
              Request Dealer Consultation
            </h4>
            <p style="font-size: 0.82rem; color: var(--kj-text-muted); margin-bottom: 16px; line-height: 1.45;">
              Our regional representative will connect with physical tile samples, box requirement calculations, and direct logistics.
            </p>
            <button class="btn-quiz-primary-pill" id="btn-quiz-open-enquiry" style="width: 100%; justify-content: center;">
              Enquire Now for This Palette →
            </button>
          </div>
        </div>

        <!-- Utility Bar (PDF, Save, Restart) -->
        <div class="dossier-utility-row">
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="dossier-util-btn" id="btn-download-pdf">
              📄 Download Suggestion PDF
            </button>
            <button class="dossier-util-btn ${isSavedToProfile ? 'saved' : ''}" id="btn-save-profile">
              ${isSavedToProfile ? '✓ Saved to Profile' : '💾 Save to My Profile'}
            </button>
            <button class="dossier-util-btn" id="btn-edit-answers">
              ✏️ Edit All Answers
            </button>
          </div>

          <div>
            <button class="dossier-util-btn" id="btn-start-again" style="color: var(--kj-danger); border-color: #fecaca;">
              🔄 Start Again
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Individual Tile Card in Results Dossier
function renderDossierTileCard(tile, roleLabel) {
  return `
    <div class="dossier-tile-card">
      <div class="dossier-img-stage">
        <img src="${tile.image}" class="dossier-img" alt="${tile.name}" loading="lazy" />
        <span class="dossier-role-pill">${roleLabel}</span>
      </div>

      <div class="dossier-card-body">
        <h3 class="dossier-tile-name">${tile.name}</h3>
        <div class="dossier-tile-collection">${tile.collection} · ${tile.category}</div>

        <div class="dossier-specs-table">
          <div><span class="dossier-spec-label">Size:</span> <span class="dossier-spec-val">${tile.size}</span></div>
          <div><span class="dossier-spec-label">Finish:</span> <span class="dossier-spec-val">${tile.finish}</span></div>
          <div><span class="dossier-spec-label">Slip Rating:</span> <span class="dossier-spec-val">${tile.slipRating || 'R9'}</span></div>
          <div><span class="dossier-spec-label">Absorption:</span> <span class="dossier-spec-val">${tile.waterAbsorption || '< 0.05%'}</span></div>
        </div>

        <p class="dossier-why-text">${tile.whyFits}</p>

        <a href="#product-detail?id=${tile.id}" class="dossier-pdp-link">
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
              <button class="btn-quiz-back-text" id="btn-download-before-restart">Download PDF First</button>
              <button class="btn-quiz-primary-pill" id="btn-proceed-restart" style="background: var(--kj-danger);">Yes, Reset Quiz</button>
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
              <button type="submit" class="btn-quiz-primary-pill" style="width: 100%; justify-content: center;">
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

  // Single-select Row Cards
  container.querySelectorAll('.quiz-row-card').forEach(card => {
    card.addEventListener('click', () => {
      const step = card.dataset.step;
      const val = card.dataset.val;
      quizStore.state.answers[step] = val;
      quizStore.notify();
    });
  });

  // Visual Cards (Mood, Surface, Colors)
  container.querySelectorAll('.quiz-visual-card').forEach(card => {
    card.addEventListener('click', () => {
      const step = card.dataset.step;
      const val = card.dataset.val;

      if (step === 'colors') {
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
              currentColors.shift();
            }
            currentColors.push(val);
          }
        }
        quizStore.state.answers.colors = currentColors;
        quizStore.notify();
      } else {
        quizStore.state.answers[step] = val;
        quizStore.notify();
      }
    });
  });

  // Pill buttons
  container.querySelectorAll('.quiz-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.dataset.step;
      const val = btn.dataset.val;
      quizStore.state.answers[step] = val;
      quizStore.notify();
    });
  });

  // Top exit X button
  const exitXBtn = container.querySelector('#btn-quiz-exit-x');
  if (exitXBtn) {
    exitXBtn.addEventListener('click', () => {
      window.location.hash = '#home';
    });
  }

  // Quick expert help link
  const quickHelpBtn = container.querySelector('#btn-quiz-quick-help');
  if (quickHelpBtn) {
    quickHelpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      store.setModal('enquiry', true, {
        tile: 'Tile Quiz Consultation',
        space: quizStore.state.answers.space
      });
    });
  }

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

  // Results: Download PDF
  const pdfBtn = container.querySelector('#btn-download-pdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      generateQuizPDF(quizStore.state);
    });
  }

  // Results: Save to Profile
  const saveBtn = container.querySelector('#btn-save-profile');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      quizStore.state.showProfileModal = true;
      quizStore.notify();
    });
  }

  // Results: Edit All Answers
  const editAllBtn = container.querySelector('#btn-edit-answers');
  if (editAllBtn) {
    editAllBtn.addEventListener('click', () => {
      quizStore.editStep('space');
    });
  }

  // Results: Start Again
  const restartBtn = container.querySelector('#btn-start-again');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      quizStore.confirmRestart(true);
    });
  }

  // Results: Enquire Now
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

  // Results: Dealer Locator Search
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
        <div style="background: #f8fafc; border: 1.5px solid var(--kj-border); border-radius: 12px; padding: 14px; max-height: 220px; overflow-y: auto;">
          <div style="font-size: 0.75rem; font-weight: 800; color: var(--kj-primary); text-transform: uppercase; margin-bottom: 8px;">
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
      logQuizEvent('dealer_results_viewed', { count: 0 });
      dealerResultsBox.innerHTML = `
        <div style="background: #fffbeb; border: 1.5px solid #fef3c7; border-radius: 12px; padding: 14px; font-size: 0.82rem; color: #92400e;">
          <strong>Couldn't find an authorized dealer in "${q}"?</strong><br>
          Share your details and our team will connect you directly with regional logistics.
          <div style="margin-top: 8px;">
            <button class="btn-quiz-primary-pill" id="btn-dealer-fallback-enquire" style="padding: 6px 14px; font-size: 0.78rem;">
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

  // Banner button scroll to dealer finder
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
