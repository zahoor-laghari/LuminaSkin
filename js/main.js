// Main JavaScript File

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar?.classList.add('shadow-md');
    } else {
        navbar?.classList.remove('shadow-md');
    }
    
    lastScroll = currentScroll;
});

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Simulate newsletter signup
        cart.showToast('Thank you for subscribing!', 'success');
        e.target.reset();
        
        // Track newsletter signup
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                email: email
            });
        }
    });
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = productsData.filter(p => p.featured).slice(0, 4);
    
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    const variant = product.variants[0];
    const price = variant.salePrice || variant.price;
    const hasDiscount = variant.salePrice !== null;
    
    return `
        <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm">
            <a href="product.html?slug=${product.slug}" class="block relative overflow-hidden aspect-square group">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="w-full h-full object-cover"
                     loading="lazy">
                ${product.bestseller ? '<span class="badge badge-bestseller absolute top-4 left-4">Bestseller</span>' : ''}
                ${product.new ? '<span class="badge badge-new absolute top-4 left-4">New</span>' : ''}
                ${hasDiscount ? '<span class="badge badge-sale absolute top-4 right-4">Sale</span>' : ''}
                
                <!-- Quick View Overlay -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onclick="openQuickView(${product.id}); event.preventDefault();" 
                            class="px-6 py-3 bg-white text-gray-900 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Quick View
                    </button>
                </div>
            </a>
            
            <div class="p-6">
                <a href="product.html?slug=${product.slug}" class="block mb-2">
                    <h3 class="font-serif text-xl font-semibold text-gray-900 hover:text-primary-600 transition">${product.name}</h3>
                </a>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">${product.shortDescription}</p>
                
                <!-- Rating -->
                <div class="flex items-center gap-2 mb-3">
                    <div class="star-rating">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="text-sm text-gray-500">(${product.reviewCount})</span>
                </div>
                
                <!-- Price -->
                <div class="flex items-center justify-between">
                    <div>
                        ${hasDiscount ? `
                            <span class="text-lg font-bold text-primary-600">$${price.toFixed(2)}</span>
                            <span class="text-sm text-gray-400 line-through ml-2">$${variant.price.toFixed(2)}</span>
                        ` : `
                            <span class="text-lg font-bold text-gray-900">$${price.toFixed(2)}</span>
                        `}
                    </div>
                    <button onclick="addToCartQuick(${product.id})" 
                            class="btn-icon bg-primary-600 text-white hover:bg-primary-700"
                            aria-label="Add to cart">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let html = '';
    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star star filled"></i>';
    }
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt star filled"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="fas fa-star star"></i>';
    }
    return html;
}

// Add to cart quick function
function addToCartQuick(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
        cart.openCart();
    }
}

// Quick view modal
function openQuickView(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const modal = createQuickViewModal(product);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createQuickViewModal(product) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal p-0 max-w-4xl">
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Product Image -->
                <div class="relative bg-cream rounded-l-2xl p-8">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain">
                </div>
                
                <!-- Product Info -->
                <div class="p-8">
                    <button onclick="this.closest('.modal-overlay').remove()" 
                            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    
                    <h2 class="font-serif text-3xl font-semibold mb-2">${product.name}</h2>
                    <p class="text-gray-600 mb-4">${product.shortDescription}</p>
                    
                    <!-- Rating -->
                    <div class="flex items-center gap-2 mb-4">
                        <div class="star-rating">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="text-sm text-gray-500">(${product.reviewCount} reviews)</span>
                    </div>
                    
                    <!-- Price -->
                    <div class="mb-6">
                        ${product.variants[0].salePrice ? `
                            <span class="text-3xl font-bold text-primary-600">$${product.variants[0].salePrice.toFixed(2)}</span>
                            <span class="text-xl text-gray-400 line-through ml-2">$${product.variants[0].price.toFixed(2)}</span>
                        ` : `
                            <span class="text-3xl font-bold text-gray-900">$${product.variants[0].price.toFixed(2)}</span>
                        `}
                    </div>
                    
                    <!-- Variants -->
                    ${product.variants.length > 1 ? `
                        <div class="mb-6">
                            <label class="block text-sm font-semibold mb-2">Size</label>
                            <div class="flex gap-2">
                                ${product.variants.map((v, i) => `
                                    <button class="px-4 py-2 border-2 rounded-lg ${i === 0 ? 'border-primary-600 text-primary-600' : 'border-gray-300'} hover:border-primary-600 transition" 
                                            onclick="selectVariant(this, '${v.id}')">
                                        ${v.size}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Benefits -->
                    <div class="mb-6">
                        <h4 class="font-semibold mb-2">Key Benefits</h4>
                        <ul class="space-y-1 text-sm text-gray-600">
                            ${product.benefits.slice(0, 3).map(b => `
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>${b}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex gap-3">
                        <button onclick="addToCartQuick(${product.id}); this.closest('.modal-overlay').remove();" 
                                class="flex-1 btn btn-primary">
                            <i class="fas fa-shopping-bag mr-2"></i>
                            Add to Cart
                        </button>
                        <a href="product.html?slug=${product.slug}" 
                           class="btn btn-secondary">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    return modalOverlay;
}

// Select variant in quick view
function selectVariant(button, variantId) {
    // Remove active class from all variant buttons
    button.parentElement.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('border-primary-600', 'text-primary-600');
        btn.classList.add('border-gray-300');
    });
    
    // Add active class to selected button
    button.classList.add('border-primary-600', 'text-primary-600');
    button.classList.remove('border-gray-300');
    
    // Store selected variant
    button.closest('.modal').setAttribute('data-selected-variant', variantId);
}

// Hero Canvas Animation (Simple particles)
function initHeroAnimation() {
    const heroCanvas = document.getElementById('heroCanvas');
    if (!heroCanvas) return;

    const canvas = document.createElement('canvas');
    canvas.width = heroCanvas.offsetWidth;
    canvas.height = heroCanvas.offsetHeight;
    heroCanvas.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(198, 118, 95, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = heroCanvas.offsetWidth;
        canvas.height = heroCanvas.offsetHeight;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    initHeroAnimation();
    
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Accessibility: Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);