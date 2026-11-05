// Centralized State Store for Kajaria UX Prototype
import { PRODUCTS, DEALERS } from './data.js';

class Store {
  constructor() {
    this.subscribers = new Set();
    
    // Load persisted favourites from localStorage if available
    let savedFavs = [];
    try {
      savedFavs = JSON.parse(localStorage.getItem('kajaria_favs') || '[]');
    } catch (e) {
      savedFavs = [];
    }

    this.state = {
      // Current active space context (Bathroom, Living Room, etc.)
      activeSpace: 'bathroom',
      
      // Active filters that are currently filtering the PLP
      activeFilters: {
        categories: [],
        colors: [],
        collections: [],
        sizes: [],
        finishes: [],
        textures: []
      },

      // Staged filters (the critical UX pattern: select multiple before hitting "Apply")
      stagedFilters: {
        categories: [],
        colors: [],
        collections: [],
        sizes: [],
        finishes: [],
        textures: []
      },

      // Sort & display options
      sortBy: 'relevant',
      viewMode: 'grid', // 'grid' | 'compact'

      // Shortlisted favourites
      favourites: savedFavs,

      // Comparison tray (up to 4 products)
      compareList: ['calcuta-imperial-a', 'bianco-onduluto'],

      // Active PDP product
      selectedProductId: 'calcuta-imperial-a',

      // Where to Buy state
      dealerSearch: {
        query: 'New Delhi',
        typeFilter: 'all',
        hasSearched: true,
        selectedDealerId: 'del-exp-01'
      },

      // Modals and drawers
      modals: {
        mobileMenu: false,
        mobileFilters: false,
        compare: false,
        calculator: false,
        visualiser: false,
        enquiry: false,
        enquiryContext: null, // e.g. { tile: 'Calcuta Imperial A', dealer: 'Kajaria Galaxy', location: 'New Delhi' }
        quickSearch: false
      }
    };
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    for (const callback of this.subscribers) {
      try {
        callback(this.state);
      } catch (err) {
        console.error('Subscriber notification error:', err);
      }
    }
  }

  // --- Space Navigation ---
  setActiveSpace(spaceId) {
    this.state.activeSpace = spaceId;
    this.notify();
  }

  // --- Staged Filters (UX Pattern: batch selection without immediate reload) ---
  toggleStagedFilter(group, value) {
    const list = this.state.stagedFilters[group] || [];
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(value);
    }
    this.state.stagedFilters[group] = [...list];
    this.notify();
  }

  isStaged(group, value) {
    return (this.state.stagedFilters[group] || []).includes(value);
  }

  getStagedCount() {
    return Object.values(this.state.stagedFilters).reduce((sum, arr) => sum + arr.length, 0);
  }

  getActiveFilterCount() {
    return Object.values(this.state.activeFilters).reduce((sum, arr) => sum + arr.length, 0);
  }

  applyFilters() {
    // Commit staged filters to active filters
    this.state.activeFilters = JSON.parse(JSON.stringify(this.state.stagedFilters));
    this.state.modals.mobileFilters = false;
    this.notify();
  }

  resetFilters() {
    this.state.stagedFilters = {
      categories: [],
      colors: [],
      collections: [],
      sizes: [],
      finishes: [],
      textures: []
    };
    this.state.activeFilters = {
      categories: [],
      colors: [],
      collections: [],
      sizes: [],
      finishes: [],
      textures: []
    };
    this.notify();
  }

  resetStagedFilters() {
    this.state.stagedFilters = JSON.parse(JSON.stringify(this.state.activeFilters));
    this.notify();
  }

  // --- Favourites Management ---
  toggleFavourite(productId) {
    const index = this.state.favourites.indexOf(productId);
    if (index > -1) {
      this.state.favourites.splice(index, 1);
    } else {
      this.state.favourites.push(productId);
    }
    this.state.favourites = [...this.state.favourites];
    try {
      localStorage.setItem('kajaria_favs', JSON.stringify(this.state.favourites));
    } catch (e) {}
    this.notify();
  }

  isFavourite(productId) {
    return this.state.favourites.includes(productId);
  }

  // --- Comparison Management ---
  toggleCompare(productId) {
    const index = this.state.compareList.indexOf(productId);
    if (index > -1) {
      this.state.compareList.splice(index, 1);
    } else {
      if (this.state.compareList.length >= 4) {
        alert('You can compare up to 4 tiles at once. Please remove one to add another.');
        return;
      }
      this.state.compareList.push(productId);
    }
    this.state.compareList = [...this.state.compareList];
    this.notify();
  }

  removeFromCompare(productId) {
    this.state.compareList = this.state.compareList.filter(id => id !== productId);
    this.notify();
  }

  clearCompare() {
    this.state.compareList = [];
    this.notify();
  }

  isInCompare(productId) {
    return this.state.compareList.includes(productId);
  }

  // --- Filtered Products Query ---
  getFilteredProducts() {
    let list = [...PRODUCTS];

    // Filter by Active Space (if space selected and not 'all')
    if (this.state.activeSpace && this.state.activeSpace !== 'all') {
      list = list.filter(p => p.idealSpaces && p.idealSpaces.includes(this.state.activeSpace));
    }

    // Filter by Active Filter Groups
    const af = this.state.activeFilters;

    if (af.categories && af.categories.length > 0) {
      list = list.filter(p => af.categories.includes(p.category));
    }
    if (af.colors && af.colors.length > 0) {
      list = list.filter(p => af.colors.includes(p.color));
    }
    if (af.collections && af.collections.length > 0) {
      list = list.filter(p => af.collections.includes(p.collection));
    }
    if (af.sizes && af.sizes.length > 0) {
      list = list.filter(p => af.sizes.includes(p.size));
    }
    if (af.finishes && af.finishes.length > 0) {
      list = list.filter(p => af.finishes.includes(p.finish));
    }
    if (af.textures && af.textures.length > 0) {
      list = list.filter(p => af.textures.includes(p.surface));
    }

    // Sort
    if (this.state.sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.state.sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }

  // --- Dealers Query ---
  getDealerResults() {
    const q = (this.state.dealerSearch.query || '').trim().toLowerCase();
    const type = this.state.dealerSearch.typeFilter;
    
    return DEALERS.filter(d => {
      const matchesQuery = !q || 
        d.city.toLowerCase().includes(q) || 
        d.pin.includes(q) || 
        d.name.toLowerCase().includes(q) || 
        d.address.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q);

      const matchesType = type === 'all' || d.type === type;
      return matchesQuery && matchesType;
    });
  }

  // --- Modals and Drawers ---
  setModal(modalName, isOpen, context = null) {
    if (this.state.modals.hasOwnProperty(modalName)) {
      this.state.modals[modalName] = isOpen;
      if (modalName === 'enquiry') {
        this.state.modals.enquiryContext = context;
      }
      this.notify();
    }
  }

  closeAllModals() {
    for (const key of Object.keys(this.state.modals)) {
      if (typeof this.state.modals[key] === 'boolean') {
        this.state.modals[key] = false;
      }
    }
    this.notify();
  }
}

export const store = new Store();
