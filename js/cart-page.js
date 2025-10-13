// Cart Page Functionality

function renderCartPage() {
    const cartContent = document.getElementById('cartContent');
    const emptyCart = document.getElementById('emptyCart');

    if (cart.items.length === 0) {
        cartContent.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        return;
    }

    cartContent.classList.remove('hidden');
    emptyCart.classList.add('hidden');

    const subtotal = cart.getTotal();
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    cartContent.innerHTML = `
        <!-- Cart Items -->
        <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl p-6 shadow-sm">
                <h2 class="font-serif text-2xl font-semibold mb-6">Cart Items (${cart.items.length})</h2>
                
                <div class="space-y-6">
                    ${cart.items.map(item => `
                        <div class="flex gap-6 pb-6 border-b last:border-b-0">
                            <a href="product.html?slug=${item.slug}" class="w-32 h-32 flex-shrink-0">
                                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded-lg">
                            </a>
                            
                            <div class="flex-1">
                                <a href="product.html?slug=${item.slug}" class="font-serif text-xl font-semibold text-gray-900 hover:text-primary-600 transition mb-2 block">
                                    ${item.name}
                                </a>
                                <p class="text-gray-600 mb-4">Size: ${item.size}</p>
                                
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
                                    
                                    <div class="text-right">
                                        <p class="text-2xl font-bold text-gray-900">$${(item.price * item.quantity).toFixed(2)}</p>
                                        <p class="text-sm text-gray-500">$${item.price.toFixed(2)} each</p>
                                    </div>
                                </div>
                            </div>
                            
                            <button onclick="cart.removeItem(${item.productId}, '${item.variantId}')" 
                                    class="text-gray-400 hover:text-red-500 transition h-8 w-8"
                                    aria-label="Remove item">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Continue Shopping -->
            <div class="mt-6">
                <a href="shop.html" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                    <i class="fas fa-arrow-left mr-2"></i>
                    Continue Shopping
                </a>
            </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 class="font-serif text-2xl font-semibold mb-6">Order Summary</h2>
                
                <!-- Promo Code -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">Promo Code</label>
                    <div class="flex gap-2">
                        <input type="text" id="promoCode" placeholder="Enter code" class="input-field">
                        <button onclick="applyPromo()" class="btn btn-secondary whitespace-nowrap">Apply</button>
                    </div>
                    <div id="promoMessage" class="mt-2 text-sm"></div>
                </div>

                <!-- Summary -->
                <div class="space-y-3 mb-6 pb-6 border-b">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Subtotal</span>
                        <span class="font-semibold">$${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Shipping</span>
                        <span class="font-semibold ${shipping === 0 ? 'text-green-600' : ''}">
                            ${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    ${shipping > 0 ? `
                        <div class="text-sm text-gray-500">
                            <i class="fas fa-info-circle mr-1"></i>
                            Spend $${(50 - subtotal).toFixed(2)} more for free shipping
                        </div>
                    ` : ''}
                    <div class="flex justify-between">
                        <span class="text-gray-600">Tax (estimated)</span>
                        <span class="font-semibold">$${tax.toFixed(2)}</span>
                    </div>
                </div>

                <!-- Total -->
                <div class="flex justify-between mb-6">
                    <span class="text-xl font-semibold">Total</span>
                    <span class="text-2xl font-bold text-primary-600">$${total.toFixed(2)}</span>
                </div>

                <!-- Checkout Button -->
                <a href="checkout.html" class="block w-full btn btn-primary text-center py-4 mb-4">
                    Proceed to Checkout
                </a>

                <!-- Payment Icons -->
                <div class="flex justify-center gap-3 text-2xl text-gray-400">
                    <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-amex"></i>
                    <i class="fab fa-cc-paypal"></i>
                </div>

                <!-- Trust Badges -->
                <div class="mt-6 pt-6 border-t space-y-3">
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                        <i class="fas fa-lock text-green-600"></i>
                        <span>Secure Checkout</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                        <i class="fas fa-shipping-fast text-primary-600"></i>
                        <span>Free Shipping on Orders $50+</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                        <i class="fas fa-undo text-primary-600"></i>
                        <span>30-Day Returns</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function applyPromo() {
    const input = document.getElementById('promoCode');
    const message = document.getElementById('promoMessage');
    const code = input.value.trim();

    if (!code) {
        message.innerHTML = '<span class="text-red-600">Please enter a promo code</span>';
        return;
    }

    const promo = cart.applyPromoCode(code);
    
    if (promo) {
        message.innerHTML = `<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>${promo.description}</span>`;
        input.value = '';
    } else {
        message.innerHTML = '<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>Invalid promo code</span>';
    }
}

// Listen for cart updates
window.addEventListener('cartUpdated', () => {
    renderCartPage();
});

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});