// Search Functionality

class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchToggle = document.getElementById('searchToggle');
        this.searchClose = document.getElementById('searchClose');
        
        this.init();
    }

    init() {
        if (this.searchToggle) {
            this.searchToggle.addEventListener('click', () => this.openSearch());
        }

        if (this.searchClose) {
            this.searchClose.addEventListener('click', () => this.closeSearch());
        }

        if (this.searchOverlay) {
            this.searchOverlay.addEventListener('click', (e) => {
                if (e.target === this.searchOverlay) {
                    this.closeSearch();
                }
            });
        }

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });
        }
    }

    openSearch() {
        if (this.searchOverlay && this.searchInput) {
            this.searchOverlay.classList.remove('hidden');
            setTimeout(() => {
                this.searchOverlay.classList.add('opacity-100');
                this.searchInput.focus();
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    closeSearch() {
        if (this.searchOverlay) {
            this.searchOverlay.classList.remove('opacity-100');
            setTimeout(() => {
                this.searchOverlay.classList.add('hidden');
                document.body.style.overflow = '';
                if (this.searchInput) {
                    this.searchInput.value = '';
                }
                if (this.searchResults) {
                    this.searchResults.innerHTML = '';
                }
            }, 300);
        }
    }

    handleSearch(query) {
        if (!query || query.length < 2) {
            this.searchResults.innerHTML = '';
            return;
        }

        const results = this.search(query);
        this.displayResults(results, query);

        // Track search event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
                search_term: query
            });
        }
    }

    search(query) {
        const lowerQuery = query.toLowerCase();
        
        // Search products
        const productResults = productsData.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(lowerQuery);
            const categoryMatch = product.category.toLowerCase().includes(lowerQuery);
            const descriptionMatch = product.description.toLowerCase().includes(lowerQuery);
            const ingredientsMatch = product.ingredients.some(ing => 
                ing.toLowerCase().includes(lowerQuery)
            );
            const concernsMatch = product.concerns.some(concern => 
                concern.toLowerCase().includes(lowerQuery)
            );

            return nameMatch || categoryMatch || descriptionMatch || 
                   ingredientsMatch || concernsMatch;
        });

        return {
            products: productResults.slice(0, 6), // Limit to 6 results
            count: productResults.length
        };
    }

    displayResults(results, query) {
        if (results.products.length === 0) {
            this.searchResults.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-600">No results found for "${query}"</p>
                    <p class="text-sm text-gray-500 mt-2">Try different keywords or browse our categories</p>
                </div>
            `;
            return;
        }

        let html = `
            <div class="mb-4 pb-4 border-b">
                <p class="text-sm text-gray-600">
                    Found ${results.count} product${results.count !== 1 ? 's' : ''}
                </p>
            </div>
        `;

        html += results.products.map(product => `
            <a href="product.html?slug=${product.slug}" 
               class="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition mb-2"
               onclick="search.closeSearch()">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                    <p class="font-medium text-gray-900 mb-1">${product.name}</p>
                    <p class="text-sm text-gray-600 mb-1">${product.shortDescription}</p>
                    <p class="font-semibold text-primary-600">$${product.price.toFixed(2)}</p>
                </div>
            </a>
        `).join('');

        if (results.count > 6) {
            html += `
                <a href="shop.html?search=${encodeURIComponent(query)}" 
                   class="block text-center py-3 text-primary-600 hover:text-primary-700 font-medium"
                   onclick="search.closeSearch()">
                    View all ${results.count} results
                </a>
            `;
        }

        this.searchResults.innerHTML = html;
    }

    // Autocomplete suggestions
    getSuggestions(query) {
        const suggestions = new Set();
        
        productsData.forEach(product => {
            if (product.name.toLowerCase().includes(query.toLowerCase())) {
                suggestions.add(product.name);
            }
            product.concerns.forEach(concern => {
                if (concern.toLowerCase().includes(query.toLowerCase())) {
                    suggestions.add(concern.replace('-', ' '));
                }
            });
        });

        return Array.from(suggestions).slice(0, 5);
    }
}

// Initialize search
const search = new SearchEngine();

// Make search globally accessible
window.search = search;