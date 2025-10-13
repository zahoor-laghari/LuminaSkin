// Product Detail Page

let currentProduct = null;
let selectedVariant = null;

function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    
    if (!slug) {
        window.location.href = 'shop.html';
        return;
    }

    currentProduct = productsData.find(p => p.slug === slug);
    
    if (!currentProduct) {
        window.location.href = 'shop.html';
        return;
    }

    selectedVariant = currentProduct.variants[0];
    renderProduct();
    initialize3DViewer();
    loadRelatedProducts();
}

function renderProduct() {
    // Update page title
    document.title = `${currentProduct.name} | LuminaSkin`;
    document.getElementById('pageTitle').textContent = `${currentProduct.name} | LuminaSkin`;
    document.getElementById('breadcrumbProduct').textContent = currentProduct.name;

    const container = document.getElementById('productContent');
    const price = selectedVariant.salePrice || selectedVariant.price;
    const hasDiscount = selectedVariant.salePrice !== null;

    container.innerHTML = `
        <!-- 3D Viewer -->
        <div class="relative">
            <div id="viewer3d" class="viewer-3d" style="height: 600px;">
                <!-- 3D model will be loaded here -->
            </div>
            
            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
                ${currentProduct.bestseller ? '<span class="badge badge-bestseller">Bestseller</span>' : ''}
                ${currentProduct.new ? '<span class="badge badge-new">New</span>' : ''}
                ${hasDiscount ? '<span class="badge badge-sale">Sale</span>' : ''}
            </div>

            <!-- Image Gallery Thumbnails -->
            <div class="flex gap-2 mt-4">
                ${currentProduct.images.map((img, index) => `
                    <button onclick="changeImage('${img}')" class="w-20 h-20 rounded-lg overflow-hidden border-2 ${index === 0 ? 'border-primary-600' : 'border-gray-200'} hover:border-primary-600 transition">
                        <img src="${img}" alt="View ${index + 1}" class="w-full h-full object-cover">
                    </button>
                `).join('')}
            </div>
        </div>

        <!-- Product Info -->
        <div>
            <h1 class="font-serif text-4xl md:text-5xl font-semibold text-gray-900 mb-4">${currentProduct.name}</h1>
            <p class="text-xl text-gray-600 mb-6">${currentProduct.shortDescription}</p>

            <!-- Rating -->
            <div class="flex items-center gap-3 mb-6 pb-6 border-b">
                <div class="star-rating">
                    ${generateStars(currentProduct.rating)}
                </div>
                <span class="text-lg text-gray-600">${currentProduct.rating}</span>
                <span class="text-gray-400">|</span>
                <a href="#reviews" class="text-gray-600 hover:text-primary-600 transition">${currentProduct.reviewCount} reviews</a>
            </div>

            <!-- Price -->
            <div class="mb-8">
                ${hasDiscount ? `
                    <div class="flex items-baseline gap-3">
                        <span class="text-4xl font-bold text-primary-600">$${price.toFixed(2)}</span>
                        <span class="text-2xl text-gray-400 line-through">$${selectedVariant.price.toFixed(2)}</span>
                        <span class="badge badge-sale">Save ${Math.round(((selectedVariant.price - price) / selectedVariant.price) * 100)}%</span>
                    </div>
                ` : `
                    <span class="text-4xl font-bold text-gray-900">$${price.toFixed(2)}</span>
                `}
            </div>

            <!-- Variants -->
            ${currentProduct.variants.length > 1 ? `
                <div class="mb-8">
                    <label class="block font-semibold text-lg mb-3">Size</label>
                    <div class="flex gap-3">
                        ${currentProduct.variants.map((variant, index) => `
                            <button onclick="selectVariant('${variant.id}')" 
                                    id="variant-${variant.id}"
                                    class="px-6 py-3 border-2 rounded-xl font-medium transition ${index === 0 ? 'border-primary-600 text-primary-600 bg-primary-50' : 'border-gray-300 text-gray-700 hover:border-primary-600'}">
                                ${variant.size}
                                <span class="block text-sm ${index === 0 ? 'text-primary-600' : 'text-gray-500'}">
                                    $${(variant.salePrice || variant.price).toFixed(2)}
                                </span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Stock Status -->
            <div class="mb-8">
                <div class="flex items-center gap-2 text-green-600">
                    <i class="fas fa-check-circle"></i>
                    <span class="font-medium">In Stock (${currentProduct.stock} units available)</span>
                </div>
            </div>

            <!-- Quantity and Add to Cart -->
            <div class="flex gap-4 mb-8">
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="decreaseQuantity()">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <input type="number" id="quantity" value="1" min="1" max="${currentProduct.stock}" class="quantity-input" readonly>
                    <button class="quantity-btn" onclick="increaseQuantity()">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>
                <button onclick="addToCart()" class="flex-1 btn btn-primary text-lg py-4">
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Add to Cart
                </button>
            </div>

            <!-- Buy Now Button -->
            <button onclick="buyNow()" class="w-full btn btn-secondary text-lg py-4 mb-8">
                Buy Now
            </button>

            <!-- Key Benefits -->
            <div class="bg-cream rounded-2xl p-6 mb-8">
                <h3 class="font-semibold text-lg mb-4">Key Benefits</h3>
                <ul class="space-y-3">
                    ${currentProduct.benefits.map(benefit => `
                        <li class="flex items-start gap-3">
                            <i class="fas fa-check text-green-600 mt-1"></i>
                            <span class="text-gray-700">${benefit}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Product Info Grid -->
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex items-center gap-2 text-gray-600">
                    <i class="fas fa-leaf text-sage"></i>
                    <span>Clean Ingredients</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                    <i class="fas fa-flask text-primary-600"></i>
                    <span>Dermatologist Tested</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                    <i class="fas fa-paw text-primary-600"></i>
                    <span>Cruelty Free</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                    <i class="fas fa-recycle text-sage"></i>
                    <span>Sustainable</span>
                </div>
            </div>
        </div>
    `;

    renderTabs();
}

function renderTabs() {
    const tabButtons = document.querySelectorAll('.tab');
    const tabContent = document.getElementById('tabContent');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Render tab content
            const tab = button.dataset.tab;
            renderTabContent(tab, tabContent);
        });
    });

    // Render initial tab
    renderTabContent('description', tabContent);
}

function renderTabContent(tab, container) {
    switch(tab) {
        case 'description':
            container.innerHTML = `
                <h3 class="font-serif text-2xl font-semibold mb-4">Product Description</h3>
                <p class="text-gray-700 text-lg leading-relaxed mb-6">${currentProduct.description}</p>
                
                <h4 class="font-semibold text-lg mb-3">Suitable For</h4>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${currentProduct.skinTypes.map(type => {
                        const skinType = skinTypes.find(st => st.id === type);
                        return skinType ? `<span class="badge badge-bestseller">${skinType.name}</span>` : '';
                    }).join('')}
                </div>

                <h4 class="font-semibold text-lg mb-3">Targets</h4>
                <div class="flex flex-wrap gap-2">
                    ${currentProduct.concerns.map(concern => {
                        const skinConcern = skinConcerns.find(sc => sc.id === concern);
                        return skinConcern ? `<span class="badge badge-new">${skinConcern.name}</span>` : '';
                    }).join('')}
                </div>
            `;
            break;

        case 'ingredients':
            container.innerHTML = `
                <h3 class="font-serif text-2xl font-semibold mb-4">Full Ingredients List</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${currentProduct.ingredients.map(ingredient => `
                        <li class="flex items-start gap-3 p-3 bg-cream rounded-lg">
                            <i class="fas fa-leaf text-sage mt-1"></i>
                            <span class="text-gray-700">${ingredient}</span>
                        </li>
                    `).join('')}
                </ul>
            `;
            break;

        case 'how-to-use':
            container.innerHTML = `
                <h3 class="font-serif text-2xl font-semibold mb-4">How to Use</h3>
                <div class="bg-cream rounded-xl p-6">
                    <p class="text-gray-700 text-lg leading-relaxed">${currentProduct.howToUse}</p>
                </div>
                
                <div class="mt-8 grid md:grid-cols-3 gap-6">
                    <div class="text-center p-6 bg-blush rounded-xl">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl font-bold text-primary-600">1</span>
                        </div>
                        <h4 class="font-semibold mb-2">Cleanse</h4>
                        <p class="text-sm text-gray-600">Start with clean, dry skin</p>
                    </div>
                    <div class="text-center p-6 bg-blush rounded-xl">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl font-bold text-primary-600">2</span>
                        </div>
                        <h4 class="font-semibold mb-2">Apply</h4>
                        <p class="text-sm text-gray-600">Use recommended amount</p>
                    </div>
                    <div class="text-center p-6 bg-blush rounded-xl">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl font-bold text-primary-600">3</span>
                        </div>
                        <h4 class="font-semibold mb-2">Follow</h4>
                        <p class="text-sm text-gray-600">Continue with your routine</p>
                    </div>
                </div>
            `;
            break;

        case 'reviews':
            renderReviews(container);
            break;
    }
}

function renderReviews(container) {
    const reviews = reviewsData[currentProduct.id] || [];
    
    container.innerHTML = `
        <div class="flex justify-between items-center mb-8">
            <h3 class="font-serif text-2xl font-semibold">Customer Reviews</h3>
            <button class="btn btn-primary">Write a Review</button>
        </div>

        ${reviews.length > 0 ? `
            <div class="space-y-6">
                ${reviews.map(review => `
                    <div class="border-b pb-6">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <div class="flex items-center gap-2 mb-2">
                                    <div class="star-rating">
                                        ${generateStars(review.rating)}
                                    </div>
                                    ${review.verified ? '<span class="badge badge-new text-xs">Verified Purchase</span>' : ''}
                                </div>
                                <h4 class="font-semibold text-lg">${review.title}</h4>
                            </div>
                            <span class="text-sm text-gray-500">${new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p class="text-gray-700 mb-3">${review.comment}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600">By ${review.author}</span>
                            <button class="text-sm text-gray-600 hover:text-primary-600">
                                <i class="fas fa-thumbs-up mr-1"></i> Helpful (${review.helpful})
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : `
            <div class="text-center py-12">
                <i class="fas fa-star text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-600">No reviews yet. Be the first to review this product!</p>
            </div>
        `}
    `;
}

function initialize3DViewer() {
    viewer3d = new Product3DViewer('viewer3d', currentProduct.model3d.url, {
        fallbackImage: currentProduct.model3d.fallbackImage,
        enableControls: true,
        autoRotate: false
    });
}

function selectVariant(variantId) {
    selectedVariant = currentProduct.variants.find(v => v.id === variantId);
    
    // Update variant buttons
    currentProduct.variants.forEach(v => {
        const btn = document.getElementById(`variant-${v.id}`);
        if (btn) {
            if (v.id === variantId) {
                btn.className = 'px-6 py-3 border-2 rounded-xl font-medium transition border-primary-600 text-primary-600 bg-primary-50';
            } else {
                btn.className = 'px-6 py-3 border-2 rounded-xl font-medium transition border-gray-300 text-gray-700 hover:border-primary-600';
            }
        }
    });

    renderProduct();
}

function changeImage(imageUrl) {
    // Update main image (in production, this would update the 3D viewer or main image)
    cart.showToast('Image view updated', 'info');
}

function increaseQuantity() {
    const input = document.getElementById('quantity');
    const current = parseInt(input.value);
    if (current < currentProduct.stock) {
        input.value = current + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    const current = parseInt(input.value);
    if (current > 1) {
        input.value = current - 1;
    }
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    cart.addItem(currentProduct, selectedVariant.id, quantity);
    cart.openCart();
}

function buyNow() {
    const quantity = parseInt(document.getElementById('quantity').value);
    cart.addItem(currentProduct, selectedVariant.id, quantity);
    window.location.href = 'checkout.html';
}

function loadRelatedProducts() {
    const related = productsData
        .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
        .slice(0, 4);
    
    const container = document.getElementById('relatedProducts');
    container.innerHTML = related.map(product => createProductCard(product)).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
});