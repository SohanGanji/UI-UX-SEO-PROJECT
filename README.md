# LensBasket — Camera & Production Gear Rental Platform

> **Nagpur's Premier Cinema & Creator Gear Rental Web Application**  
> Serving Nagpur Hub & Metros (Mumbai, Delhi-NCR, Hyderabad)  
> Website: [https://lensbasket.in](https://lensbasket.in) · Support: `hello@lensbasket.in`

---

## 📁 Project Directory Structure

```
project a/
├── css/
│   └── calendar.css                  # Custom styling for interactive 7-column calendar and viewports
├── js/
│   ├── main.js                       # Central state management, multi-item cart, catalog data & toast notifications
│   ├── calendar.js                   # Interactive date range selector, blocked dates & pricing calculator
│   └── compare.js                    # Equipment comparison module
├── docs/
│   ├── ON_PAGE_SEO_TECHNIQUES_REPORT.md # Question 4: Factor-by-factor On-Page SEO audit report with tool screenshots
│   ├── ON_PAGE_SEO_TECHNIQUES_REPORT.html # Printable / PDF-ready HTML report with embedded screenshot previews
│   ├── SEO_OPTIMIZATION_REPORT.md    # Complete technical SEO architecture, JSON-LD schemas & Core Web Vitals
│   └── WEBSITE_SCREENSHOTS_DOCUMENT.md # Interface walkthrough, UI feature highlights & screenshot guide
├── html/                             # Organized web pages (index, rent, product, booking)
├── website images/                   # High-resolution website interface and audit screenshots
├── robots.txt                        # Search crawler directives and sitemap reference
├── sitemap.xml                       # XML sitemap indexing all canonical routes
└── README.md                         # Project documentation and directory structure
```

---

## 🚀 Key Features

1. **Brand Identity & Viewfinder Theme**
   - Distinctive warm editorial aesthetic: `#FFF4DE` parchment background, `#2B1B22` ink borders, and `#C7385A` film-accent CTA buttons.
   - Camera Viewfinder HUD elements: Corner brackets, REC pulsing dot, aperture/ISO readouts.

2. **Authentic Equipment Ratings**
   - Real-world verified ratings ranging strictly between **3.5 and 4.5 stars** (never unrealistic flat 5.0 stars).
   - Rating and review count displayed consistently across catalog cards, featured sections, and product details.

3. **Live Date-Based Dynamic Pricing**
   - Pricing on `rent.html` and `product.html` dynamically recalculates when rental dates change.
   - 3-day and weekly tier package discounts automatically applied with clear cost breakdown.

4. **Multi-Item Cart System**
   - Add multiple distinct items and accessories to cart.
   - Adjust quantities (`+` / `−`), delete individual items, or clear cart with synchronized storage.
   - Flat ₹2,000 fully refundable security deposit transparently itemized.

5. **Technical SEO & Semantic Architecture**
   - Schema.org JSON-LD structured data (`WebSite`, `Product`, `Offer`, `FAQPage`, `ItemList`).
   - W3C semantic HTML5 landmarks, Open Graph metadata, Twitter Cards, and canonical tags.
   - Fully responsive across desktop, tablet, and mobile viewports.

---

## 🛠️ Local Development & Preview

Start local web server from project root:
```powershell
python -m http.server 8000
```
Open in Google Chrome:
- **Home**: `http://localhost:8000/index.html`
- **Catalog**: `http://localhost:8000/rent.html`
- **Product Detail**: `http://localhost:8000/product.html?id=sony-a7iv`
- **Booking & Checkout**: `http://localhost:8000/booking.html`

