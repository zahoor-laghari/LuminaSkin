// Shop Page Functionality

class ShopManager {
    constructor() {
        this.products = [...productsData];
        this.filteredProducts = [...this.products];
        this.currentView = 'grid';
        this.filters = {
            categories: [],
            skinTypes: [],
            concerns: [],
            maxPrice: 100,
            special: []
        };
        this.sortBy = 'featured';
        
        this.init();
    }

    init() {
        this.loadFilterOptions();
        this.attachEventListeners();
        this.parseURLParams();
        this.applyFilters();
        this.renderProducts();
    }

    loadFilterOptions() {
        // Load categories
        const categoryFilters = document.getElementById('categoryFilters');
        if (categoryFilters) {
            categoryFilters.innerHTML = categories.map(cat => `
                <label class="filter-option">
                    <div class="filter-checkbox" data-filter="category" data-value="${cat.id}">
                        <i class="fas fa-check text-white text-xs hidden"></i>
                    </div>
                    <span>${cat.name} (${cat.count})</span>
                </label>
            `).join('');
        }

        // Load skin types
        const skinTypeFilters = document.getElementById('skinTypeFilters');
        if (skinTypeFilters) {
            skinTypeFilters.innerHTML = skinTypes.map(type => `
                <label class="filter-option">
                    <div class="filter-checkbox" data-filter="skinType" data-value="${type.id}">
                        <i class="fas fa-check text-white text-xs hidden"></i>
                    </div>
                    <span>${type.name}</span>
                </label>
            `).join('');
        }

        // Load concerns
        const concernFilters = document.getElementById('concernFilters');
        if (concernFilters) {
            concernFilters.innerHTML = skinConcerns.map(concern => `
                <label class="filter-option">
                    <div class="filter-checkbox" data-filter="concern" data-value="${concern.id}">
                        <i class="fas fa-check text-white text-xs hidden"></i>
                    </div>
                    <span>${concern.name}</span>
                </label>
            `).join('');
        }
    }

    attachEventListeners() {
        // Filter checkboxes
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                const filterType = e.currentTarget.dataset.filter;
                const value = e.currentTarget.dataset.value;
                this.toggleFilter(filterType, value, e.currentTarget);
            });
        });

        // Price range slider
        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');
        if (priceRange && priceValue) {
            priceRange.addEventListener('input', (e) => {
                const value = e.target.value;
                priceValue.textContent = value >= 100 ? '$100+' : `$${value}`;
                this.filters.maxPrice = parseInt(value);
                this.applyFilters();
                this.renderProducts();
            });
        }

        // Sort select
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.applyFilters();
                this.renderProducts();
            });
        }
    }

    toggleFilter(filterType, value, checkbox) {
        const icon = checkbox.querySelector('i');
        
        if (checkbox.classList.contains('checked')) {
            checkbox.classList.remove('checked');
            icon.classList.add('hidden');
            this.removeFilter(filterType, value);
        } else {
            checkbox.classList.add('checked');
            icon.classList.remove('hidden');
            this.addFilter(filterType, value);
        }

        this.applyFilters();
        this.renderProducts();
    }

    addFilter(filterType, value) {
        switch(filterType) {
            case 'category':
                if (!this.filters.categories.includes(value)) {
                    this.filters.categories.push(value);
                }
                break;
            case 'skinType':
                if (!this.filters.skinTypes.includes(value)) {
                    this.filters.skinTypes.push(value);
                }
                break;
            case 'concern':
                if (!this.filters.concerns.includes(value)) {
                    this.filters.concerns.push(value);
                }
                break;
            case 'new':
            case 'bestseller':
            case 'sale':
                if (!this.filters.special.includes(filterType)) {
                    this.filters.special.push(filterType);
                }
                break;
        }
    }

    removeFilter(filterType, value) {
        switch(filterType) {
            case 'category':
                this.filters.categories = this.filters.categories.filter(c => c !== value);
                break;
            case 'skinType':
                this.filters.skinTypes = this.filters.skinTypes.filter(s => s !== value);
                break;
            case 'concern':
                this.filters.concerns = this.filters.concerns.filter(c => c !== value);
                break;
            case 'new':
            case 'bestseller':
            case 'sale':
                this.filters.special = this.filters.special.filter(s => s !== filterType);
                break;
        }
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            if (this.filters.categories.length > 0 && 
                !this.filters.categories.includes(product.category)) {
                return false;
            }

            // Skin type filter
            if (this.filters.skinTypes.length > 0) {
                const hasMatchingSkinType = this.filters.skinTypes.some(type => 
                    product.skinTypes.includes(type)
                );
                if (!hasMatchingSkinType) return false;
            }

            // Concern filter
            if (this.filters.concerns.length > 0) {
                const hasMatchingConcern = this.filters.concerns.some(concern => 
                    product.concerns.includes(concern)
                );
                if (!hasMatchingConcern) return false;
            }

            // Price filter
            const price = product.variants[0].salePrice || product.variants[0].price;
            if (price > this.filters.maxPrice && this.filters.maxPrice < 100) {
                return false;
            }

            // Special filters
            if (this.filters.special.length > 0) {
                const meetsSpecial = this.filters.special.some(special => {
                    if (special === 'new') return product.new;
                    if (special === 'bestseller') return product.bestseller;
                    if (special === 'sale') return product.variants[0].salePrice !== null;
                    return false;
                });
                if (!meetsSpecial) return false;
            }

            return true;
        });

        this.sortProducts();
    }

    sortProducts() {
        switch(this.sortBy) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => {
                    const priceA = a.variants[0].salePrice || a.variants[0].price;
                    const priceB = b.variants[0].salePrice || b.variants[0].price;
                    return priceA - priceB;
                });
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => {
                    const priceA = a.variants[0].salePrice || a.variants[0].price;
                    const priceB = b.variants[0].salePrice || b.variants[0].price;
                    return priceB - priceA;
                });
                break;
            case 'name-asc':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating-desc':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                this.filteredProducts.sort((a, b) => b.new - a.new);
                break;
            case 'featured':
            default:
                this.filteredProducts.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.rating - a.rating;
                });
        }
    }

    renderProducts() {
        const container = document.getElementById('productsContainer');
        const noResults = document.getElementById('noResults');
        const productCount = document.getElementById('productCount');

        if (!container) return;

        if (this.filteredProducts.length === 0) {
            container.innerHTML = '';
            noResults?.classList.remove('hidden');
            if (productCount) productCount.textContent = '0 products';
            return;
        }

        noResults?.classList.add('hidden');
        
        if (productCount) {
            productCount.textContent = `${this.filteredProducts.length} product${this.filteredProducts.length !== 1 ? 's' : ''}`;
        }

        if (this.currentView === 'grid') {
            container.className = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8';
            container.innerHTML = this.filteredProducts.map(product => 
                createProductCard(product)
            ).join('');
        } else {
            container.className = 'space-y-6';
            container.innerHTML = this.filteredProducts.map(product => 
                this.createListViewCard(product)
            ).join('');
        }
    }

    createListViewCard(product) {
        const variant = product.variants[0];
        const price = variant.salePrice || variant.price;
        const hasDiscount = variant.salePrice !== null;
        
        return `
            <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row">
                <a href="product.html?slug=${product.slug}" class="relative sm:w-64 aspect-square flex-shrink-0">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                    ${product.bestseller ? '<span class="badge badge-bestseller absolute top-4 left-4">Bestseller</span>' : ''}
                    ${product.new ? '<span class="badge badge-new absolute top-4 left-4">New</span>' : ''}
                    ${hasDiscount ? '<span class="badge badge-sale absolute top-4 right-4">Sale</span>' : ''}
                </a>
                
                <div class="p-6 flex-1">
                    <a href="product.html?slug=${product.slug}">
                        <h3 class="font-serif text-2xl font-semibold text-gray-900 hover:text-primary-600 transition mb-2">${product.name}</h3>
                    </a>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    
                    <div class="flex items-center gap-2 mb-4">
                        <div class="star-rating">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="text-sm text-gray-500">(${product.reviewCount} reviews)</span>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            ${hasDiscount ? `
                                <span class="text-2xl font-bold text-primary-600">$${price.toFixed(2)}</span>
                                <span class="text-sm text-gray-400 line-through ml-2">$${variant.price.toFixed(2)}</span>
                            ` : `
                                <span class="text-2xl font-bold text-gray-900">$${price.toFixed(2)}</span>
                            `}
                        </div>
                        <div class="flex gap-2">
                            <a href="product.html?slug=${product.slug}" class="btn btn-secondary">
                                View Details
                            </a>
                            <button onclick="addToCartQuick(${product.id})" class="btn btn-primary">
                                <i class="fas fa-shopping-bag mr-2"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    parseURLParams() {
        const params = new URLSearchParams(window.location.search);
        
        // Category from URL
        const category = params.get('category');
        if (category) {
            this.filters.categories.push(category);
            const checkbox = document.querySelector(`[data-filter="category"][data-value="${category}"]`);
            if (checkbox) {
                checkbox.classList.add('checked');
                checkbox.querySelector('i').classList.remove('hidden');
            }
        }

        // Search from URL
        const searchQuery = params.get('search');
        if (searchQuery) {
            // Filter products based on search
            this.products = productsData.filter(product => {
                const searchLower = searchQuery.toLowerCase();
                return product.name.toLowerCase().includes(searchLower) ||
                       product.description.toLowerCase().includes(searchLower) ||
                       product.category.toLowerCase().includes(searchLower);
            });
        }
    }
}

function toggleView(view) {
    shopManager.currentView = view;
    
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    
    if (view === 'grid') {
        gridBtn.classList.add('text-primary-600', 'border-b-2', 'border-primary-600');
        gridBtn.classList.remove('text-gray-400');
        listBtn.classList.add('text-gray-400');
        listBtn.classList.remove('text-primary-600', 'border-b-2', 'border-primary-600');
    } else {
        listBtn.classList.add('text-primary-600', 'border-b-2', 'border-primary-600');
        listBtn.classList.remove('text-gray-400');
        gridBtn.classList.add('text-gray-400');
        gridBtn.classList.remove('text-primary-600', 'border-b-2', 'border-primary-600');
    }
    
    shopManager.renderProducts();
}

function clearFilters() {
    shopManager.filters = {
        categories: [],
        skinTypes: [],
        concerns: [],
        maxPrice: 100,
        special: []
    };
    
    // Reset all checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.classList.remove('checked');
        checkbox.querySelector('i').classList.add('hidden');
    });
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.value = 100;
        priceValue.textContent = '$100+';
    }
    
    shopManager.applyFilters();
    shopManager.renderProducts();
}

// Initialize shop
let shopManager;
document.addEventListener('DOMContentLoaded', () => {
    shopManager = new ShopManager();
});