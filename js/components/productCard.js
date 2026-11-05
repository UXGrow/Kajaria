// Product Card Component (PLP)
import { store } from '../store.js';

export function createProductCard(product) {
  const isFav = store.isFavourite(product.id);
  const isCompared = store.isInCompare(product.id);

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="card-media-wrap">
        <a href="#product-detail?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" />
        </a>

        ${product.has360 ? `
          <div class="card-badge-360">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            360°
          </div>
        ` : ''}

        <button class="card-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${product.id}" title="${isFav ? 'Remove from Favourites' : 'Add to Favourites'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div class="card-body">
        <a href="#product-detail?id=${product.id}">
          <h3 class="card-title">${product.name}</h3>
        </a>
        <div class="card-category">${product.category}</div>

        <div class="card-specs">
          <span>${product.size}</span>
          <span>·</span>
          <span>${product.thickness}</span>
          <span>·</span>
          <span>${product.finish}</span>
        </div>

        <div class="card-actions">
          <label class="card-compare-label">
            <input type="checkbox" class="compare-toggle-input" data-compare-id="${product.id}" ${isCompared ? 'checked' : ''} />
            <span>Compare</span>
          </label>

          <a href="#product-detail?id=${product.id}" class="btn-ghost btn-sm" style="font-weight: 700; color: var(--kj-primary);">
            View Details →
          </a>
        </div>
      </div>
    </article>
  `;
}
