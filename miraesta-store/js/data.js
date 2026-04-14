// MIRAESTA Product Data
// Premium Streetwear Collection

export const products = [
    // Women Topwear
    {
        id: 'wt001',
        name: 'The "Pain Has Power" Heavyweight Female Tee',
        price: 3499,
        category: 'women-topwear',
        gender: 'women',
        image: 'images/products/pain-has-power-female.jpg',
        badge: null,
        description: 'Premium heavyweight cotton tee with empowering graphic design'
    },
    {
        id: 'wt002',
        name: 'The "MIRAE" Paneled Heavyweight Female Tee (Storm Grey & Off-White)',
        price: 2999,
        originalPrice: 3499,
        category: 'women-topwear',
        gender: 'women',
        image: 'images/products/mirae-paneled-grey-female.jpg',
        badge: 'SALE',
        description: 'Architectural panel design in storm grey and off-white colorway'
    },
    {
        id: 'wt003',
        name: 'The "MIRAE" Paneled Heavyweight Female Tee (Shadow Black & Dark Grey)',
        price: 2999,
        originalPrice: 3499,
        category: 'women-topwear',
        gender: 'women',
        image: 'images/products/mirae-paneled-black-female.jpg',
        badge: 'SALE',
        description: 'Dark urban aesthetic with shadow black and dark grey panels'
    },
    {
        id: 'wt004',
        name: 'The "Lost Messengers" Heavyweight Female Tee',
        price: 3499,
        category: 'women-topwear',
        gender: 'women',
        image: 'images/products/lost-messengers-female.jpg',
        badge: null,
        description: 'Mysterious graphic design celebrating urban storytellers'
    },
    {
        id: 'wt005',
        name: 'Layered Cut & Sew Panel Female Tee (Black & Grey)',
        price: 3499,
        category: 'women-topwear',
        gender: 'women',
        image: 'images/products/layered-black-grey-female.jpg',
        badge: null,
        description: 'Multi-layered construction with premium cut and sew details'
    },
    {
        id: 'wt006',
        name: 'Layered Cut & Sew Panel Female Tee (Brown & Cream)',
        price: 3499,
        category: 'women-topwear',
        gender: 'women',
        image: 'images/products/layered-brown-cream-female.jpg',
        badge: null,
        description: 'Earth tone palette with sophisticated layering'
    },
    
    // Men Topwear
    {
        id: 'mt001',
        name: 'The "Pain Has Power" Heavyweight Male Tee',
        price: 3499,
        category: 'men-topwear',
        gender: 'men',
        image: 'images/products/pain-has-power-male.jpg',
        badge: null,
        description: 'Bold statement piece with premium heavyweight construction'
    },
    {
        id: 'mt002',
        name: 'The "MIRAE" Paneled Heavyweight Male Tee (Storm Grey & Off-White)',
        price: 3499,
        category: 'men-topwear',
        gender: 'men',
        image: 'images/products/mirae-paneled-grey-male.jpg',
        badge: null,
        description: 'Structural design meets urban sophistication'
    },
    {
        id: 'mt003',
        name: 'The "MIRAE" Paneled Heavyweight Male Tee (Shadow Black & Dark Grey)',
        price: 2999,
        originalPrice: 3499,
        category: 'men-topwear',
        gender: 'men',
        image: 'images/products/mirae-paneled-black-male.jpg',
        badge: 'SALE',
        description: 'Monochromatic excellence for the modern urbanite'
    },
    {
        id: 'mt004',
        name: 'The "Lost Messengers" Heavyweight Male Tee',
        price: 3499,
        category: 'men-topwear',
        gender: 'men',
        image: 'images/products/lost-messengers-male.jpg',
        badge: null,
        description: 'Graphic storytelling through premium streetwear'
    },
    {
        id: 'mt005',
        name: 'Layered Cut & Sew Panel Men Tee (Brown & Cream)',
        price: 3499,
        category: 'men-topwear',
        gender: 'men',
        image: 'images/products/layered-brown-cream-male.jpg',
        badge: null,
        description: 'Refined earth tones with architectural construction'
    },
    {
        id: 'mt006',
        name: 'Layered Cut & Sew Panel Men Tee (Black & Grey)',
        price: 3499,
        category: 'men-topwear',
        gender: 'men',
        image: 'images/products/layered-black-grey-male.jpg',
        badge: null,
        description: 'Classic urban colorway with premium detailing'
    }
];

// Collections
export const collections = [
    {
        id: 'men-topwear',
        name: 'Men Topwear',
        slug: 'men-topwear',
        gender: 'men'
    },
    {
        id: 'women-topwear',
        name: 'Women Topwear',
        slug: 'women-topwear',
        gender: 'women'
    },
    {
        id: 'men-bottomwear',
        name: 'Men Bottomwear',
        slug: 'men-bottomwear',
        gender: 'men'
    },
    {
        id: 'women-bottomwear',
        name: 'Women Bottomwear',
        slug: 'women-bottomwear',
        gender: 'women'
    }
];

// Bestsellers (featured products)
export const bestsellers = products.filter(p => p.id.includes('002') || p.id.includes('003') || p.id.includes('001'));

// Cart state management
let cart = JSON.parse(localStorage.getItem('miraesta_cart')) || [];

export function getCart() {
    return cart;
}

export function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity
        });
    }
    
    saveCart();
    updateCartCount();
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
}

export function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
        updateCartCount();
    }
}

export function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}

export function getCartTotal() {
    return cart.reduce((total, item) => {
        const price = item.price || 0;
        return total + (price * item.quantity);
    }, 0);
}

export function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function saveCart() {
    localStorage.setItem('miraesta_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countElements = document.querySelectorAll('#cartCount, #cartItemCount');
    const itemCount = getCartItemCount();
    countElements.forEach(el => {
        if (el) el.textContent = itemCount;
    });
}

// Initialize cart count on page load
if (typeof window !== 'undefined') {
    updateCartCount();
}
