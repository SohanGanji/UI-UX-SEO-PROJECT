# LensBasket — Website Screenshots & Interface Walkthrough Document

**Project Title:** LensBasket — Premium Camera & Gear Rental Platform  
**Target Market:** Nagpur & Metro Creative Hubs (Mumbai, Delhi-NCR, Hyderabad)  
**Deliverable:** Document Containing Screenshots and Interface Walkthrough of the Developed Website  
**Technology Stack:** Semantic HTML5, CSS3 / Tailwind CSS, Vanilla JavaScript, Schema.org JSON-LD  

---

## 1. Executive Summary & Design Concept

LensBasket is an editorial camera and production gear rental platform designed specifically to eliminate the friction of traditional rental houses. Rather than presenting a generic dark-mode electronics catalog, LensBasket implements:
* **The Viewfinder Identity:** A photographic HUD motif featuring custom L-bracket corner guides, a pulsing REC dot indicator, exposure metadata chips (ISO 800, f/2.8, 1/250s), and a subtle rule-of-thirds compositional grid.
* **Warm Editorial Palette:** A creamy parchment background (`#FFF4DE`), warm card surfaces (`#FFE8C4`), bold retro ink borders (`#2B1B22`), and an energetic film-red accent (`#C7385A`) reserved strictly for booking CTAs.
* **Instant Verification & Trust Signals:** Upfront flat ₹2,000 security deposit disclosures, sanitized sensor badges, authentic real-life equipment star ratings (3.5 to 4.5 stars), and 15-minute digital ID verification.

---

## 2. Page-by-Page Screenshot Showcase

### Screen 1: Home Page (`index.html`)

#### 1.1 Hero Section & Interactive Viewfinder HUD
> **Screenshot Placeholder:**  
> `[Insert Screenshot: Desktop Full-Width View of Hero Section showing Viewfinder HUD with Corner Brackets, Pulsing REC Dot, and Exposure Readouts]`

* **Key Elements Captured:**
  - H1 headline: *"Rent camera gear. Shoot this weekend."*
  - Active Hub pill indicator: *"Hub availability live across Nagpur, Mumbai & Delhi-NCR"*
  - Polaroid-style camera display featuring live metadata HUD (`ISO 800`, `f/2.8`, `1/250s`, `4K 60fps • 10-bit`).
  - Dual call-to-action buttons: *Browse rental gear* and *Book a rental*.
  - Metric assurance row (450+ verified bodies & glass, 15-min instant ID approval, 100% sanitized & test-fired).

---

#### 1.2 "Shoot Type" Finder & Pre-Bundled Kits
> **Screenshot Placeholder:**  
> `[Insert Screenshot: Shoot Type Finder with 4 Interactive Tiles and the Revealed Suggested Kit Card (Wedding, Travel Vlog, Real Estate, Reels)]`

* **Key Elements Captured:**
  - Four quick-select cards: Wedding (`💍`), Travel Vlog (`🎒`), Real Estate (`🏠`), and Reels (`🎬`).
  - Dynamic JavaScript expansion showing suggested equipment, bundled discounts, and 1-click booking.
  - Pre-bundled creator kits: *Vlogger Kit (Save ₹600/day)*, *Wedding Kit (Save ₹1,400/day)*, and *Travel Kit (Save ₹500/day)*.

---

#### 1.3 How It Works & Trust Pillars
> **Screenshot Placeholder:**  
> `[Insert Screenshot: 4-Step Linear Timeline (Pick gear → Book dates → Pickup/delivery → Return) and the 4 Trust Badges Strip]`

* **Key Elements Captured:**
  - 4-step progressive timeline with numbered badges.
  - 4 assurance pillars: *Tested before every rental*, *Flat ₹2,000 refundable deposit*, *Doorstep delivery*, and *Damage cover included*.

---

### Screen 2: Rental Catalog & Equipment Filter (`rent.html`)

#### 2.1 Single-Click Category Switching & Live Search
> **Screenshot Placeholder:**  
> `[Insert Screenshot: Catalog Page showing Quick Category Pill Bar (All Gear, Cameras, Drones, Gimbals, Lighting, Audio), Live Search Input, and Filtered Drone/Camera Card View]`

* **Key Elements Captured:**
  - Dedicated category pills strip: `All Gear (6)`, `Cameras (2)`, `Drones (1)`, `Gimbals (1)`, `Lighting (1)`, `Audio (1)`.
  - Single-click isolation: Selecting "Drones" shows only the DJI Mini 4 Pro Fly More; selecting "Cameras" shows only Sony A7 IV and Canon R6 II.
  - Live real-time search input: Typing keywords like "drone", "sony", "canon" filters instant results with instant clear button.
  - Active category filter badge with 1-click dismiss (`✕`).
  - Sidebar radio selector with item count badges for fast category navigation.
  - Duration-based pricing radio toggles: *Daily rate*, *3-Day rate*, and *Weekly rate*.
  - Real-time gear cards displaying 3-tier rates side by side (`Day`, `3-Day`, `Week`).
  - Realistic verified ratings across products ranging strictly from 3.5 to 4.5 stars (e.g. Sony A7 IV: 4.5 ★, DJI Mini 4 Pro: 4.3 ★, RS3 Pro: 4.1 ★, Godox AD200: 3.9 ★, Rode NTG: 3.7 ★).
  - Direct 1-click *"+ Cart"* and *"View & Book"* actions on every card.

---

#### 2.2 Seamless Multi-Item Package Building
> **Screenshot Placeholder:**  
> `[Insert Screenshot: Catalog Page showing Multi-Item Cart Selection with Live Cart Counter Badge and Instant Toast Notification]`

* **Key Elements Captured:**
  - Real-time cart counter badge in navbar showing active items.
  - Quick "+ Cart" action without page reload.
  - Transparent pricing with flat ₹2,000 refundable security deposit.
  - Synchronized booking parameters (`?category=drone`, `?start=...&days=...`).

---

### Screen 3: Product Detail Page (`product.html`)

#### 3.1 Multi-Angle Visuals & Technical Specifications
> **Screenshot Placeholder:**  
> `[Insert Screenshot: Product Page showing Image Gallery with Viewfinder Overlay, Authentic Star Rating, and Technical Specs Table]`

* **Key Elements Captured:**
  - SEO-rich Breadcrumb: `Home > Cameras > Sony A7 IV`.
  - Condition rating badge: `★★★★½ 4.5 (68 verified reviews) — Checked before every rental`.
  - Interactive multi-angle thumbnail switcher (Front, Side, Back).
  - Detailed camera specifications table (33MP BSI CMOS, 4K60 10-bit, 5-axis IBIS, 659g).

---

#### 3.2 Dynamic 7-Column Availability Calendar & Live Pricing
> **Screenshot Placeholder:**  
> `[Insert Screenshot: Interactive Month Calendar showing Selected Date Range, Blocked Dates, and Live Cost Calculation Breakdown]`

* **Key Elements Captured:**
  - 7-column calendar grid with custom month navigation.
  - Visual status states: Available (`#FFF4DE`), Booked / Unavailable (strikethrough / grey), and Selected Range (Accent Red highlight).
  - Live cost calculation breakdown box:
    - Number of days selected × rate tier.
    - Automatic tier discount (Day vs 3-Day pack vs Weekly rate).
    - Flat ₹2,000 fully refundable security deposit line.
    - Grand total payable today.
  - Cross-sell section: *"Works great with"* (Ronin RS3 Pro, Rode VideoMic NTG, Godox AD200).

---

### Screen 4: Booking & FAQ Page (`booking.html`)

#### 4.1 Transparent Cart & Deposit Summary
> **Screenshot Placeholder:**  
> `[Insert Screenshot: Booking Page showing Sticky Cart Summary Box with Itemized Gear, Delivery Switcher, and Deposit Notice]`

* **Key Elements Captured:**
  - Itemized booking manifest saved from calendar selection via `localStorage`.
  - Multi-item management: dynamically adjust quantity (`+` / `−`) and remove individual items.
  - Dynamic delivery selector: *Hub Pickup (Free)* vs *Doorstep Delivery (₹200)* updating totals in real time.
  - Clear refund transparency callout: *"Flat ₹2,000 deposit is fully refunded within 24 hours of gear return."*

---

#### 4.2 Checkout Form & Collapsible FAQ Accordion
> **Screenshot Placeholder:**  
> `[Insert Screenshot: Digital ID Verification Form and Expanded FAQ Accordion Rows]`

* **Key Elements Captured:**
  - User verification inputs: Name, Email, Phone, ID selection (Aadhaar, Passport, Student ID), Shoot Dates.
  - Seamless form validation with instant confirmation dialog.
  - 8-question collapsible FAQ accordion addressing deposits, insurance, damages, sanitization, and metro hubs.

---

## 3. Mobile Responsiveness Showcase

> **Screenshot Placeholder:**  
> `[Insert Screenshot: Side-by-side Mobile Viewports (iPhone / Android) showing Hamburger Menu, Stacking Product Cards, and Touch Calendar]`

* **Mobile Adaptations Implemented:**
  - Responsive hamburger drawer navigation.
  - Single-column vertical stacking of product cards with horizontal scroll for metadata chips.
  - Touch-friendly calendar cells with condensed weekday labels.
  - Sticky bottom booking bar for instant mobile conversions.

---

## 4. Instructions for Screenshot Capture

To capture pristine, high-resolution screenshots for academic submission:
1. Open Google Chrome and navigate to `http://localhost:8000/index.html` (or `c:\Users\Acer\project a\index.html`).
2. Press `F12` to open Chrome DevTools.
3. Press `Ctrl + Shift + P` (Windows) and type **"Capture full size screenshot"**.
4. Repeat for:
   - `index.html`
   - `rent.html`
   - `product.html` (with calendar range selected)
   - `booking.html` (with 1 FAQ opened)
5. Paste the PNG images into the designated placeholder sections above.

