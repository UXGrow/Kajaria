// Hash Router for Kajaria UX Prototype
import { store } from './store.js';

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  register(route, handler) {
    this.routes[route] = handler;
  }

  navigate(hash) {
    if (window.location.hash === hash) {
      this.handleRoute();
    } else {
      window.location.hash = hash;
    }
  }

  handleRoute() {
    const rawHash = window.location.hash.slice(1) || 'home';
    const [pathWithQuery] = rawHash.split('?');
    const path = pathWithQuery.startsWith('/') ? pathWithQuery.slice(1) : pathWithQuery;

    // Parse query params if any
    const queryString = rawHash.includes('?') ? rawHash.split('?')[1] : '';
    const params = new URLSearchParams(queryString);

    // Context updates based on route
    if (path === 'products' && params.has('space')) {
      store.setActiveSpace(params.get('space'));
    }
    if (path === 'product-detail' && params.has('id')) {
      store.state.selectedProductId = params.get('id');
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handler = this.routes[path] || this.routes['home'];
    if (handler) {
      handler(params);
    }
  }

  init() {
    this.handleRoute();
  }
}

export const router = new Router();
