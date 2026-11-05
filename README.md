# Kajaria Ceramics — Website UX Strategy Pitch Interactive Prototype

A high-fidelity, interactive coded prototype designed and built to bring Arbaaz's **Kajaria Ceramics Website UX Strategy Pitch** to life for stakeholder presentations, design reviews, and validation testing.

---

## 🎯 Strategic Purpose

Translates real web analytics (1.75M+ monthly sessions, 72% mobile traffic, high bounce on catalogues and direct search) into an intuitive, friction-free customer journey:

> **Discover** *(Inspiration by Room & Style)*  
> ➔ **Evaluate** *(Specifications, 360° Visualisation & Side-by-Side Comparison)*  
> ➔ **Take Action** *(Dealer Locator, Seamless Fallback & Assisted Enquiries)*

---

## 🚀 Quick Start (Zero Build Step, Zero Dependencies)

This prototype is built using native **HTML5**, **CSS Custom Properties (Variables)**, and modern **ES Modules**. No `npm install`, Node.js, or complex build tooling is required.

### Option 1: Python Local Server (Recommended for Module Loading)
Run in your terminal:
```bash
cd /Users/arbaz/.gemini/antigravity/scratch/kajaria-ux-prototype
python3 -m http.server 8080
```
Then open your browser at:  
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 🌟 The Primary Connected Flow

Follow this guided walkthrough during stakeholder demonstrations:

1. **Homepage (`#home`)**:
   - Notice the refined header with clean typography, universal search bar with autocomplete suggestions, visual search camera trigger, and saved Favourites badge.
   - Hover the `PRODUCTS` and `SHOP BY` mega-menus to view category links where **product labels precede brand logos** and the **"Need help choosing?"** CTA card assists uncertain buyers.
   - Scroll to **"Find Tiles by Category"** (Slide 16): toggle between `Spaces`, `Finishes`, and `Colours` (Marazzi-inspired benchmark with Kajaria identity).
   - Click the **Bathroom** space card (or `"EXPLORE ALL SPACES →"`).

2. **Product Listing Page (PLP) (`#products?space=bathroom`)**:
   - **Horizontal Space Switcher** (Slide 19, 20): Notice how Bathroom is highlighted and you can switch rooms with one click without leaving context.
   - **Contextual Space Hero**: Displays room photography, description, and live inventory count (*"Filter By 625 tiles available ⓘ"*).
   - **Batch Multi-Select Filters** (Slide 18, 20):
     - Select multiple filter checkboxes across categories without irritating immediate page reloads.
     - Notice **Colors** (with visual circular swatches) is prioritised above Collections.
     - Redundant *"Application"* filter is eliminated because the active room context already provides it.
     - Click **`Apply (N)`** to commit selections, or **`Reset All`** to restore defaults.

3. **Product Detail Page (PDP) (`#product-detail?id=calcuta-imperial-a`)**:
   - Open **Calcuta Imperial A** (Slide 22).
   - View the gallery, 360° View badge, and specifications summary.
   - Interact with the **"Explore with our tools"** banner:
     - Click **`View in My Room`** or **`360° View`** to launch the interactive room visualizer simulator.
     - Click **`Tile Calculator`** to open the live volume estimator (calculates net sq.ft, 10% wastage reserve, and recommended boxes).
   - Click **`Compare`** to dock the tile into the persistent bottom comparison bar.
   - Click **`WHERE TO BUY ⌖ →`** to continue the journey directly to local dealer fulfillment.

4. **Evaluate & Compare Drawer / Modal (`Slide 29`)**:
   - Select 2 to 4 tiles for comparison.
   - Click **`Compare Now`** on the floating bottom dock.
   - Review the complete side-by-side specification matrix (dimensions, thickness, slip rating, water absorption, and space suitability).

5. **Where to Buy & Dealer Locator (`#where-to-buy`) (Slide 26, 28)**:
   - Search by city (e.g. *New Delhi*, *Mumbai*, *Bengaluru*) or PIN code.
   - View interactive store pins and showroom badges (*Experience Centre*, *Exclusive Showroom*, *Authorised Dealer*).
   - **Crucial Fallback Experience (Slide 28)**:
     - Search a location with no store (e.g. *999999*) or scroll down to the fallback card:
     - *"Didn't find a centre near your location? Please get in touch with us and our team will help you find the nearest Kajaria authorised dealer."*
     - Click **`[ CONTACT US > ]`**.
     - Fill the assisted enquiry modal (with pre-filled tile and location context).
     - Submit to receive an instant confirmation ticket (`KJ-ENQ-2026-XXXX`) and callback assurance!

6. **Catalogues Experience (`#catalogues`) (Slide 24)**:
   - Category navigation on the left with the embedded assistance card.
   - High-fidelity collection covers with triple-action routes (`View`, `Enquire Now`, `Explore Collection`).

---

## 📁 Repository Structure

```
kajaria-ux-prototype/
├── index.html                  # Single Page Application root shell
├── PROJECT_CONTEXT.md          # Strategy decisions, UX rationale & pending questions
├── README.md                   # Quickstart, flow guide & architecture
├── css/
│   ├── variables.css           # Design tokens: Kajaria navy, stone tones, shadows
│   ├── base.css                # Resets, typography, accessible button primitives
│   ├── components.css          # Mega-menu, mobile drawer, filters, compare dock, modals
│   └── pages.css               # Homepage, PLP, PDP, Where to Buy, Catalogues
├── js/
│   ├── app.js                  # App bootstrap and component coordinator
│   ├── data.js                 # Curated demonstration dataset matching Kajaria lines
│   ├── store.js                # Central reactive state (staged filters, compare, favs)
│   ├── router.js               # Client hash router with browser history support
│   ├── components/
│   │   ├── header.js           # Mega-menu, universal search autocomplete, mobile drawer
│   │   ├── filters.js          # Batch multi-selection with Apply/Reset controls
│   │   ├── productCard.js      # Card markup with 360 tag, fav heart & compare toggle
│   │   ├── compareModal.js     # Floating dock & side-by-side spec comparison table
│   │   ├── calculatorModal.js  # Interactive room area & box requirement calculator
│   │   ├── visualiserModal.js  # 360° Room tile-swap visualizer simulator
│   │   └── enquiryModal.js     # Assisted dealer connect form with validation
│   └── views/
│       ├── homeView.js         # Hero, category switcher tabs, tools hub, lookbook
│       ├── plpView.js          # Space switcher, banner, toolbar, filter grid
│       ├── pdpView.js          # Gallery, tools banner, specs table, similar tiles
│       ├── wtbView.js          # Store search, map, store list, fallback card
│       └── cataloguesView.js   # Filtered catalogues grid with assistance CTA
```

---

## 🎨 Design Tokens & Visual Fidelity (Official Brand Spec)

- **Kajaria Signature Blue (`#15508B`)**: Primary brand identity, primary CTA buttons, active pills, links
- **Pure White (`#FFFFFF`)**: Crisp card surfaces, clean whitespace
- **Deep Black (`#000000`)**: Strong typographic hierarchy and high-contrast titles
- **Midnight Dark Navy (`#082038`)**: Hero backdrop gradients, dark containers, luxury framing
- **Heritage Gold / Brass (`#A68740`)**: Active navigation indicator, subtle luxury accents
- **Slate Mist Grey (`#C2CCD6`)**: Refined borders, subtle separators, swatch frames
- **Heading Typography**: Custom brand font **Layfort** (`assets/fonts/layfort-*.otf`)
- **Responsive Viewports Tested**: Desktop (1440px+), Laptop (1024px), Tablet (768px), Mobile (375px–420px).
