// MIRAESTA - Main Application JavaScript
// Premium Streetwear E-commerce

import { products, bestsellers, addToCart, getCart, getCartTotal, getCartItemCount, removeFromCart } from './data.js';

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const searchBtn = document.getElementById('searchBtn');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const newsletterForm = document.getElementById('newsletterForm');
const bestsellersGrid = document.getElementById('bestsellersGrid');

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenuOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Cart Drawer Functions
function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCart();
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
}

if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
}

// Render Cart Items
function renderCart() {
    const cart = getCart();
    const itemCount = getCartItemCount();
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="pages/men.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image"></div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button class="qty-btn minus" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn plus" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem('${item.id}')">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    if (cartFooter) {
        cartFooter.style.display = 'block';
        cartTotal.textContent = `₹${getCartTotal().toLocaleString('en-IN')}`;
    }
}

// Global functions for cart item updates
window.updateQuantity = function(productId, quantity) {
    const { updateCartItemQuantity } = require('./data.js');
    updateCartItemQuantity(productId, quantity);
    renderCart();
};

window.removeItem = function(productId) {
    removeFromCart(productId);
    renderCart();
};

// Search Modal
function openSearch() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (searchInput) searchInput.focus();
}

function closeSearch() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (searchBtn) {
    searchBtn.addEventListener('click', openSearch);
}

if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', closeSearch);
}

if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearch();
    });
}

// Search Functionality
function performSearch(query) {
    if (!searchResults) return;
    
    if (!query || query.trim() === '') {
        searchResults.innerHTML = '<p class="search-placeholder">Type to search products...</p>';
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filteredProducts.length === 0) {
        searchResults.innerHTML = '<p class="search-placeholder">No products found</p>';
        return;
    }
    
    searchResults.innerHTML = `
        <div class="search-products-grid">
            ${filteredProducts.map(product => `
                <div class="product-card search-product-card">
                    <div class="product-image">
                        <div class="product-image-placeholder">${product.name.split(' ')[0]}</div>
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">
                            <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
                            ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCartAndClose('${product.id}')">Add to Cart</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
}

// Add to cart and close search
window.addToCartAndClose = function(productId) {
    addToCart(productId);
    closeSearch();
    openCart();
};

// Newsletter Signup
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.email-input');
        const email = emailInput.value;
        
        // Here you would typically send the email to your backend
        console.log('Newsletter signup:', email);
        
        alert('Thank you for joining the MIRAESTA collective! You\'ll receive exclusive updates soon.');
        emailInput.value = '';
    });
}

// Render Bestsellers on Homepage
function renderBestsellers() {
    if (!bestsellersGrid) return;
    
    const displayProducts = bestsellers.slice(0, 8);
    
    bestsellersGrid.innerHTML = displayProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <div class="product-image-placeholder">${product.name.split(' ')[0]}</div>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
                    ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="handleAddToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle add to cart
window.handleAddToCart = function(productId) {
    addToCart(productId);
    openCart();
};

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animation on scroll observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .collection-card, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBestsellers();
    
    // Update cart count
    const countElements = document.querySelectorAll('#cartCount, #cartItemCount');
    const itemCount = getCartItemCount();
    countElements.forEach(el => {
        if (el) el.textContent = itemCount;
    });
    
    console.log('MIRAESTA initialized');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchModal.classList.contains('active')) closeSearch();
        if (cartDrawer.classList.contains('active')) closeCart();
        if (mobileMenuOverlay.classList.contains('active')) toggleMobileMenu();
    }
});
