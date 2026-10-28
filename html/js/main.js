/**
 * LensBasket — main.js
 * Core shared logic: Product catalog, Cart management (multi-item & quantity),
 * toast notifications, navbar badges, and mobile navigation.
 */

const CART_STORAGE_KEY = 'lensbasket_cart';
const SECURITY_DEPOSIT_FLAT = 2000; // Updated flat refundable deposit: ₹2,000

/**
 * Master catalog of rental gear with high-res authentic images & technical specs.
 * Realistic ratings: 3.5 to 4.5 stars (authentic studio gear feedback).
 */
const PRODUCT_CATALOG = {
  'sony-a7iv': {
    id: 'sony-a7iv',
    name: 'Sony Alpha 7 IV Full-Frame Mirrorless',
    shortName: 'Sony Alpha 7 IV',
    category: 'camera',
    categoryLabel: 'Camera',
    dayRate: 1299,
    threeDayRate: 2999,
    weeklyRate: 6499,
    deposit: 2000,
    mount: 'Sony E mount',
    rating: '4.5',
    reviewCount: 68,
    tagline: '33MP full-frame BSI CMOS · 4K 60fps · 10-bit 4:2:2 internal · 5-axis IBIS · Sony E mount. The industry benchmark for hybrid photography and cinematic video.',
    specs: {
      'Sensor': '33MP full-frame BSI CMOS Exmor R',
      'Video': '4K 60fps (Super 35) / 4K 30fps 7K oversampled · 10-bit 4:2:2',
      'Mount': 'Sony E (Full-Frame)',
      'Stabilisation': '5-axis in-body image stabilization (5.5 stops)',
      'Weight': '659g (with battery and memory card)',
      'Battery': 'NP-FZ100 (~520 shots / 100 mins 4K recording)',
      'Autofocus': '759-point phase detection with Real-time Eye AF (Human/Animal/Bird)',
      'Color Profile': 'S-Cinetone, S-Log3, HLG (Hybrid Log-Gamma)'
    },
    images: {
      front: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80',
      back: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=600&q=80'
    }
  },
  'canon-r6ii': {
    id: 'canon-r6ii',
    name: 'Canon EOS R6 Mark II Mirrorless Body',
    shortName: 'Canon EOS R6 Mark II',
    category: 'camera',
    categoryLabel: 'Camera',
    dayRate: 1499,
    threeDayRate: 3499,
    weeklyRate: 7499,
    deposit: 2000,
    mount: 'Canon RF mount',
    rating: '4.4',
    reviewCount: 52,
    tagline: '24.2MP full-frame CMOS · 40fps electronic shutter · 6K oversampled 4K 60p uncropped · up to 8-stop coordinated IS. High-speed performance for weddings and events.',
    specs: {
      'Sensor': '24.2MP full-frame CMOS sensor',
      'Video': '4K 60p uncropped (6K oversampled) · Canon Log 3 / HDR PQ',
      'Mount': 'Canon RF mount',
      'Stabilisation': 'In-Body IS coordinating with RF lenses up to 8 stops',
      'Weight': '670g (body with LP-E6NH battery)',
      'Battery': 'LP-E6NH (~580 shots / 120 mins video)',
      'Autofocus': 'Dual Pixel CMOS AF II with deep learning subject tracking',
      'Continuous Shoot': '40 fps electronic shutter / 12 fps mechanical'
    },
    images: {
      front: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80',
      back: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=600&q=80'
    }
  },
  'dji-mini4pro': {
    id: 'dji-mini4pro',
    name: 'DJI Mini 4 Pro Drone Fly More Combo',
    shortName: 'DJI Mini 4 Pro',
    category: 'drone',
    categoryLabel: 'Drone',
    dayRate: 2000,
    threeDayRate: 4500,
    weeklyRate: 9500,
    deposit: 2000,
    mount: 'Integrated 3-Axis Gimbal',
    rating: '4.3',
    reviewCount: 74,
    tagline: 'Under 249g ultralight foldable drone. True Vertical Shooting in 4K 60fps HDR, omnidirectional obstacle sensing, and flagship DJI RC 2 display remote.',
    specs: {
      'Sensor': '1/1.3-inch 48MP CMOS sensor with dual native ISO',
      'Video': '4K 60fps HDR · 4K 100fps slow-motion · 10-bit D-Log M & HLG',
      'Weight': '< 249g (Nano category compliant)',
      'Flight Time': 'Up to 34 minutes per battery (3 batteries included)',
      'Transmission': 'DJI O4 video transmission up to 20 km FHD',
      'Obstacle Sensing': 'Omnidirectional binocular vision + 3D infrared sensor',
      'Remote Controller': 'DJI RC 2 with integrated 5.5" 700-nit FHD screen'
    },
    images: {
      front: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
      back: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80'
    }
  },
  'ronin-rs3pro': {
    id: 'ronin-rs3pro',
    name: 'DJI Ronin RS3 Pro Gimbal Stabiliser',
    shortName: 'DJI Ronin RS3 Pro',
    category: 'gimbal',
    categoryLabel: 'Gimbal',
    dayRate: 699,
    threeDayRate: 1599,
    weeklyRate: 3299,
    deposit: 2000,
    mount: 'Arca-Swiss / Manfrotto quick-release',
    rating: '4.1',
    reviewCount: 39,
    tagline: '4.5kg payload carbon fiber gimbal. SuperSmooth stabilization for cinema rigs, automated axis locks, and wireless camera control.',
    specs: {
      'Payload Capacity': '4.5kg (10 lbs) tested payload',
      'Material': 'Extended carbon fiber axis arms',
      'Axis Locks': 'Automated 2nd-gen axis locks (instant sleep/wake)',
      'Touchscreen': '1.8-inch OLED full-color touchscreen',
      'Battery Life': '12 hours with BG30 battery grip (supports 24W fast charging)',
      'Connectivity': 'Dual-mode Bluetooth shutter control & LiDAR focusing ready',
      'Weight': 'Approx 1.5kg (gimbal body and quick release plates)'
    },
    images: {
      front: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1589872782787-8df21b2bbab9?auto=format&fit=crop&w=600&q=80',
      back: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80'
    }
  },
  'godox-ad200': {
    id: 'godox-ad200',
    name: 'Godox AD200 Pro Portable Pocket Strobe',
    shortName: 'Godox AD200 Pro',
    category: 'lighting',
    categoryLabel: 'Lighting',
    dayRate: 499,
    threeDayRate: 1099,
    weeklyRate: 2299,
    deposit: 2000,
    mount: 'Interchangeable Speedlight / Bare-Bulb Head',
    rating: '3.9',
    reviewCount: 47,
    tagline: '200Ws compact battery strobe. TTL, 1/8000s High-Speed Sync, and dual interchangeable heads for dramatic location portrait lighting.',
    specs: {
      'Power Output': '200Ws with 9-stop power adjustment (1/1 to 1/256)',
      'Flash Heads': 'Interchangeable Speedlight Fresnel & Bare-Bulb flash heads',
      'Sync Capability': 'High-Speed Sync up to 1/8000s, 1st & 2nd curtain sync',
      'Recycle Time': 'Ultra-fast 0.01 to 1.8 seconds',
      'Battery Capacity': '14.4V / 2900mAh Li-ion battery (~500 full power flashes)',
      'Wireless System': '2.4G wireless Godox X-System (Canon, Sony, Nikon, Fuji compatible)',
      'Weight': '590g (pocket-sized aluminum alloy chassis)'
    },
    images: {
      front: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80',
      back: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'
    }
  },
  'rode-ntg': {
    id: 'rode-ntg',
    name: 'Rode VideoMic NTG Shotgun Microphone',
    shortName: 'Rode VideoMic NTG',
    category: 'audio',
    categoryLabel: 'Audio',
    dayRate: 299,
    threeDayRate: 699,
    weeklyRate: 1499,
    deposit: 2000,
    mount: 'Integrated Cold Shoe Rycote Lyre Shockmount',
    rating: '3.7',
    reviewCount: 31,
    tagline: 'Broadcast-grade hybrid shotgun microphone. Auto-sensing 3.5mm & USB-C output with stepless analog gain, safety channel, and internal Li-ion battery.',
    specs: {
      'Acoustic Principle': 'Pressure gradient electret condenser with supercardioid pattern',
      'Frequency Range': '20Hz – 20kHz with high-pass filter (75Hz / 150Hz)',
      'Outputs': 'Auto-sensing 3.5mm (TRS/TRRS camera & phone) + USB-C digital audio',
      'Battery Life': 'Rechargeable Li-ion battery (30+ hours continuous recording)',
      'Gain Control': 'Stepless precision analog rotary gain control knob',
      'Safety Features': '-20dB safety channel switchable pad & high frequency boost',
      'Weight': '94g ultra-lightweight aerospace-grade aluminum'
    },
    images: {
      front: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
      side: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
      back: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80'
    }
  }
};

/**
 * Pre-bundled creator kits
 */
const CREATOR_KITS = {
  'wedding': {
    id: 'kit-wedding',
    name: 'Wedding Production Kit',
    dayRate: 3499,
    deposit: 2000,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    items: ['Canon EOS R6 Mark II (x2)', 'Canon RF 50mm f/1.2 L', 'Godox AD200 Pro Strobe', 'DJI Ronin RS3 Pro Gimbal']
  },
  'vlog': {
    id: 'kit-vlog',
    name: 'Travel Vlog Kit',
    dayRate: 2199,
    deposit: 2000,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
    items: ['Sony A7 IV Mirrorless', 'DJI Mini 4 Pro + ND Filters', 'Rode VideoMic NTG', 'Flexible Travel Tripod']
  },
  'realestate': {
    id: 'kit-realestate',
    name: 'Real Estate Media Kit',
    dayRate: 2499,
    deposit: 2000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    items: ['Sony A7 IV Mirrorless', 'Sony FE 16-35mm f/2.8 GM', 'Godox AD200 Pro + Softbox', 'Heavy-Duty Tripod']
  },
  'reels': {
    id: 'kit-reels',
    name: 'Reels & Vertical Creator Kit',
    dayRate: 1999,
    deposit: 2000,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    items: ['Canon EOS R6 Mark II', 'DJI Ronin RS3 Pro (Vertical Mount)', 'Rode VideoMic NTG', 'LED Bi-Color Panel']
  }
};

const RENTAL_DATES_STORAGE_KEY = 'lensbasket_dates';

/**
 * Get active rental dates from localStorage or sensible defaults
 * @returns {{ startDate: string, endDate: string, days: number }}
 */
function getRentalDates() {
  try {
    const raw = localStorage.getItem(RENTAL_DATES_STORAGE_KEY) || localStorage.getItem('lensloan_dates');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read rental dates from storage', e);
  }

  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  const formatD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  return {
    startDate: formatD(today),
    endDate: formatD(threeDaysLater),
    days: 3
  };
}

/**
 * Persist active rental dates
 * @param {Object} dates - { startDate, endDate, days }
 */
function saveRentalDates(dates) {
  try {
    localStorage.setItem(RENTAL_DATES_STORAGE_KEY, JSON.stringify(dates));
  } catch (e) {
    console.warn('Could not save rental dates', e);
  }
}

/**
 * Calculate tiered cost for any gear or kit for given number of days
 * @param {Object|string} itemOrId
 * @param {number} days
 * @returns {number}
 */
function calculateItemCostForDays(itemOrId, days = 1) {
  const d = Math.max(1, Number(days) || 1);
  const id = typeof itemOrId === 'string' ? itemOrId : (itemOrId?.id || '');
  const product = PRODUCT_CATALOG[id];

  if (product) {
    if (d >= 7) {
      const weeks = Math.floor(d / 7);
      const rem = d % 7;
      return (weeks * product.weeklyRate) + (rem * product.dayRate);
    } else if (d >= 3) {
      const threes = Math.floor(d / 3);
      const rem = d % 3;
      return (threes * product.threeDayRate) + (rem * product.dayRate);
    } else {
      return d * product.dayRate;
    }
  }

  // Fallback for accessories / kits without tiered rates
  const baseRate = typeof itemOrId === 'object' && itemOrId?.dayRate ? Number(itemOrId.dayRate) : 0;
  return baseRate * d;
}

/**
 * Load cart items from localStorage
 * @returns {Array}
 */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem('lensloan_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse cart:', e);
    return [];
  }
}

/**
 * Save cart items to localStorage and trigger badge refresh
 * @param {Array} cart
 */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
}

/**
 * Add product to cart. Supports multiple distinct products and quantity accumulation.
 * @param {Object} item - { id, name, dayRate, deposit, start, end, image, qty }
 */
function addToCart(item) {
  if (!item || !item.id) return;
  const cart = getCart();

  // Normalize defaults
  const newItem = {
    id: item.id,
    name: item.name || 'Rental Gear',
    dayRate: Number(item.dayRate || 0),
    deposit: SECURITY_DEPOSIT_FLAT,
    start: item.start || 'Upcoming Weekend',
    end: item.end || 'Following Monday',
    image: item.image || (PRODUCT_CATALOG[item.id] ? PRODUCT_CATALOG[item.id].images.front : 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80'),
    qty: Number(item.qty || 1)
  };

  // Find if identical item with same rental dates already exists
  const existingIdx = cart.findIndex(i => i.id === newItem.id && i.start === newItem.start);
  if (existingIdx > -1) {
    cart[existingIdx].qty = (Number(cart[existingIdx].qty) || 1) + newItem.qty;
  } else {
    cart.push(newItem);
  }

  saveCart(cart);
  showToast(`Added "${newItem.name}" to cart!`);
}

/**
 * 1-Click helper to add gear to cart by catalog ID directly from cards
 * @param {string} id
 */
function addGearToCart(id) {
  const product = PRODUCT_CATALOG[id];
  if (!product) {
    console.warn(`Product ${id} not found in catalog.`);
    return;
  }

  addToCart({
    id: product.id,
    name: product.shortName || product.name,
    dayRate: product.dayRate,
    deposit: SECURITY_DEPOSIT_FLAT,
    start: 'Upcoming Weekend',
    end: 'Following Monday',
    image: product.images.front,
    qty: 1
  });

  // Brief visual feedback on button if clicked
  const btn = document.querySelector(`[data-cart-btn="${id}"]`);
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">check</span> Added!`;
    btn.classList.add('bg-soft-tint', 'border-accent');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('bg-soft-tint', 'border-accent');
    }, 1200);
  }
}

/**
 * 1-Click helper to book a creator kit
 * @param {string} kitKey
 */
function bookKit(kitKey) {
  const kit = CREATOR_KITS[kitKey];
  if (!kit) return;

  addToCart({
    id: kit.id,
    name: kit.name,
    dayRate: kit.dayRate,
    deposit: SECURITY_DEPOSIT_FLAT,
    start: 'Upcoming Weekend',
    end: 'Following Monday',
    image: kit.image,
    qty: 1
  });

  window.location.href = 'booking.html';
}

/**
 * Update quantity of a cart item by index
 * @param {number} idx
 * @param {number} delta - +1 or -1
 */
function updateCartItemQty(idx, delta) {
  const cart = getCart();
  if (cart[idx]) {
    const newQty = (Number(cart[idx].qty) || 1) + delta;
    if (newQty <= 0) {
      cart.splice(idx, 1);
    } else {
      cart[idx].qty = newQty;
    }
    saveCart(cart);
  }
}

/**
 * Remove an item completely by its index
 * @param {number} idx
 */
function removeCartItem(idx) {
  const cart = getCart();
  if (idx >= 0 && idx < cart.length) {
    const removed = cart.splice(idx, 1);
    saveCart(cart);
    if (removed[0]) {
      showToast(`Removed "${removed[0].name}" from cart`);
    }
  }
}

/**
 * Clear the entire cart
 */
function clearCart() {
  saveCart([]);
  showToast('Cart cleared');
}

/**
 * Update cart count badge in navbar (desktop and mobile)
 */
function updateCartBadge() {
  const cart = getCart();
  let totalCount = 0;
  cart.forEach(item => {
    totalCount += Number(item.qty || 1);
  });

  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'inline-flex' : 'none';
  });
}

/**
 * Show a sleek, non-intrusive toast notification
 * @param {string} message
 */
function showToast(message) {
  const existing = document.querySelector('.lensbasket-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'lensbasket-toast';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-accent text-[20px]">check_circle</span>
    <span class="font-label-md text-label-md text-ink">${message}</span>
  `;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #FFF4DE;
    border: 2px solid #2B1B22;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    box-shadow: 4px 4px 0px #2B1B22;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    z-index: 99999;
    animation: toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Add animation keyframes for toast
if (!document.getElementById('toast-styles')) {
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    @keyframes toastSlideUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

// Mobile Hamburger Menu Toggle & initial badge refresh
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  updateCartBadge();
});

// Export globally as LensBasket (with LensLoan backward-compatibility alias)
window.LensBasket = {
  PRODUCT_CATALOG,
  CREATOR_KITS,
  SECURITY_DEPOSIT_FLAT,
  getCart,
  saveCart,
  addToCart,
  addGearToCart,
  bookKit,
  updateCartItemQty,
  removeCartItem,
  clearCart,
  updateCartBadge,
  showToast,
  getRentalDates,
  saveRentalDates,
  calculateItemCostForDays
};

window.LensLoan = window.LensBasket;
