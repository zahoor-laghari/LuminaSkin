// Shopping Cart Management

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartUI();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Cart toggle
        const cartToggle = document.getElementById('cartToggle');
        const cartClose = document.getElementById('cartClose');
        const cartOverlay = document.getElementById('cartOverlay');

        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.openCart());
        }

        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeCart());
        }

        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => this.closeCart());
        }
    }

    loadCart() {
        try {
            const cart = localStorage.getItem('luminaskin_cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('luminaskin_cart', JSON.stringify(this.items));
            this.updateCartUI();
            
            // Trigger cart update event for other pages
            window.dispatchEvent(new CustomEvent('cartUpdated', { 
                detail: { items: this.items, total: this.getTotal() } 
            }));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    addItem(product, variantId = null, quantity = 1) {
        const variant = variantId 
            ? product.variants.find(v => v.id === variantId)
            : product.variants[0];

        const price = variant.salePrice || variant.price;
        
        const existingItem = this.items.find(
            item => item.productId === product.id && item.variantId === variant.id
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                productId: product.id,
                variantId: variant.id,
                name: product.name,
                image: product.image,
                price: price,
                size: variant.size,
                quantity: quantity,
                slug: product.slug
            });
        }

        this.saveCart();
        this.showToast('Product added to cart!', 'success');
        
        // Track add to cart event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'add_to_cart', {
                currency: 'USD',
                value: price * quantity,
                items: [{
                    item_id: product.id,
                    item_name: product.name,
                    price: price,
                    quantity: quantity
                }]
            });
        }

        return true;
    }

    removeItem(productId, variantId) {
        const index = this.items.findIndex(
            item => item.productId === productId && item.variantId === variantId
        );

        if (index !== -1) {
            const removedItem = this.items[index];
            this.items.splice(index, 1);
            this.saveCart();
            this.showToast('Product removed from cart', 'info');
            
            // Track remove from cart event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'remove_from_cart', {
                    currency: 'USD',
                    value: removedItem.price * removedItem.quantity,
                    items: [{
                        item_id: removedItem.productId,
                        item_name: removedItem.name,
                        price: removedItem.price,
                        quantity: removedItem.quantity
                    }]
                });
            }
        }
    }

    updateQuantity(productId, variantId, quantity) {
        const item = this.items.find(
            item => item.productId === productId && item.variantId === variantId
        );

        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId, variantId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.showToast('Cart cleared', 'info');
    }

    openCart() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
            document.body.style.overflow = 'hidden';
        }
    }

    closeCart() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            setTimeout(() => {
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    }

    updateCartUI() {
        this.updateCartCount();
        this.updateCartSidebar();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    updateCartSidebar() {
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');

        if (!cartItems || !cartSubtotal) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <p class="text-gray-600 mb-4">Your cart is empty</p>
                    <a href="shop.html" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            cartSubtotal.textContent = '$0.00';
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="flex gap-4 mb-4 pb-4 border-b">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <a href="product.html?slug=${item.slug}" class="font-medium hover:text-primary-600 block mb-1">${item.name}</a>
                    <p class="text-sm text-gray-500 mb-2">${item.size}</p>
                    <div class="flex items-center justify-between">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.productId}, '${item.variantId}', ${item.quantity - 1})">
                                <i class="fas fa-minus text-xs"></i>
                            </button>
                            <input type="number" value="${item.quantity}" class="quantity-input" readonly>
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.productId}, '${item.variantId}', ${item.quantity + 1})">
                                <i class="fas fa-plus text-xs"></i>
                            </button>
                        </div>
                        <p class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
                <button onclick="cart.removeItem(${item.productId}, '${item.variantId}')" class="text-gray-400 hover:text-red-500 transition">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        cartSubtotal.textContent = `$${this.getTotal().toFixed(2)}`;
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                     type === 'error' ? 'fa-exclamation-circle' : 
                     'fa-info-circle';
        
        const color = type === 'success' ? 'text-green-600' : 
                      type === 'error' ? 'text-red-600' : 
                      'text-blue-600';

        toast.innerHTML = `
            <i class="fas ${icon} ${color} text-xl"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Apply promo code
    applyPromoCode(code) {
        // Simulated promo code validation
        const validCodes = {
            'WELCOME10': { type: 'percent', value: 10, description: '10% off your order' },
            'SAVE20': { type: 'percent', value: 20, description: '20% off your order' },
            'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping' }
        };

        const promo = validCodes[code.toUpperCase()];
        
        if (promo) {
            this.showToast(`Promo code applied: ${promo.description}`, 'success');
            return promo;
        } else {
            this.showToast('Invalid promo code', 'error');
            return null;
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Make cart globally accessible
window.cart = cart;