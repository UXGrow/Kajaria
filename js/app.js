// Kajaria UX Prototype - Main Application Entry
import { router } from './router.js';
import { initHeader } from './components/header.js';
import { initCompareComponent } from './components/compareModal.js';
import { initCalculatorComponent } from './components/calculatorModal.js';
import { initVisualiserComponent } from './components/visualiserModal.js';
import { initEnquiryComponent } from './components/enquiryModal.js';

import { renderHomeView } from './views/homeView.js';
import { renderPLPView } from './views/plpView.js';
import { renderPDPView } from './views/pdpView.js';
import { renderWTBView } from './views/wtbView.js';
import { renderCataloguesView } from './views/cataloguesView.js';

document.addEventListener('DOMContentLoaded', () => {
  const appMain = document.getElementById('app-main');
  if (!appMain) return;

  // Initialize interactive components
  initHeader();
  initCompareComponent();
  initCalculatorComponent();
  initVisualiserComponent();
  initEnquiryComponent();

  // Register routes
  router.register('home', () => renderHomeView(appMain));
  router.register('products', (params) => renderPLPView(appMain, params));
  router.register('product-detail', (params) => renderPDPView(appMain, params));
  router.register('where-to-buy', () => renderWTBView(appMain));
  router.register('catalogues', () => renderCataloguesView(appMain));

  // Start routing
  router.init();
});
