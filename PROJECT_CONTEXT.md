# Kajaria Ceramics UX Strategy Pitch — Prototype Context

> **Project**: Kajaria Ceramics Website UX Strategy Pitch & Interactive Prototype  
> **Lead UX/UI Designer**: Arbaaz (6+ years experience)  
> **Engineering Partner**: Senior Frontend Engineer & UX Implementation Partner (Antigravity)  
> **Date**: October / November 2026  
> **Status**: High-Fidelity Interactive Prototype (Phase 1: Core Connected Flow)

---

## 1. Project Background & Strategic Vision

Kajaria Ceramics is India's No. 1 tile company with massive brand equity, 1.75M+ monthly sessions, and 42.8% organic search traffic. However, website analytics and user journey analysis reveal crucial friction points:
- **Direct traffic bounce rate**: 77.9%
- **Catalogue page bounce rates**: 93.9% - 96.9%
- **Mobile vs Desktop share**: 233,232 mobile active users vs 89,377 desktop (72% mobile), yet mobile PageSpeed scores are 45–58.
- **Search & Mental Models**: Users search heavily by **Room/Space** (Living room ~80k, Bathroom ~75k, Bedroom ~52k, Kitchen ~38k), yet the existing website prioritised technical tile classifications ("Glazed Vitrified", "Ceramic Wall") rather than room contexts.
- **High-intent dead ends**: High "Find a Dealer" searches (21,472 sessions) often encounter dead ends when no dealer is located in the user's PIN code.

The objective of this prototype is to translate Arbaaz's approved UX Strategy Pitch into a tangible, high-fidelity, interactive coded prototype for executive stakeholders and design reviews.

---

## 2. Agreed UX Decisions & Core Principles

### A. Navigation & Architecture
- **Official Brand SVG & 3D Flipping Tagline**:
  - Logo height set to **42px** (`.brand-logo-img { height: 42px; }`).
  - **Left-aligned 3D Flip Tagline**: True 3D perspective right-to-left flip animation with 2-sided flipper (front face and counter-rotated back face) so text is **always forward-facing, non-mirrored, and 100% readable**. Clean pure text (*"INDIA'S NO.1 / TILE COMPANY"* without star icon), slightly increased font size (`0.78rem`), normal letter-spacing, subtle continuous metallic shimmer, and interactive 3D spin on hover.
- **Header Navigation Bar**:
  - Menu typography set to `13px`, `font-weight: 500` (regular), and `letter-spacing: normal;` with left/right padding removed from `.header-nav-container` (`padding-left: 0; padding-right: 0;`) so the first item (`PRODUCTS`) aligns flush with the Kajaria logo.
  - Balanced menu sequence: `Products` → `Browse By` → `Tools` → `Catalogues` → `Resources` → `About Us` → `Investor`.
  - **About Us & Investor positioned as the last two items** in the main navigation.
  - "About Us" dropdown opens cleanly with `right: 0` alignment (Company Info, Chairman's Message, Manufacturing, Export, CSR, Awards).
  - "Investor" mega-menu opens full-width with the 4-column *"Reports and details"* layout.
- **Products Dropdown Layout (Mockup Match - Clean 4-Column Architecture with Dynamic Preview)**:
  - Harmonious 4-column balanced architecture combining clean typography with interactive visual previews:
    - Column 1 (`Tiles by Space`): Unified `<h3 class="prod-col-title">` sharing exact baseline with Columns 2 & 3. 2-column room list with subtle line icons, chevrons that reveal smoothly on hover, and a minimal inline helper link ("Need help choosing? Find your tiles →").
    - Column 2 (`Tiles by Material` & `Bathroom and Installation`): Ultra-clean, editorial typographic architecture:
      - 4 material categories (**Glazed Vitrified Tiles** · Eternity, **Gres Floor & Wall Tiles** · Grès, **Polished Vitrified Tiles** · Vitronite, **Ceramic Wall Tiles** · Ceramic Tiles) with clean hierarchy (bold category on top, subtle brand subtext below) and zero boxed border clutter.
      - Subtle 1px divider leading to **Bathroom & Installation** with clean inline links (**Tile Adhesives** · Grèsbond ↗, **Faucets & Sanitaryware** · Kerovit ↗).
      - Smooth background wash on hover (`#f8fafc`) with dynamic lifestyle preview updates in Column 4 and instant PLP category filtering on click.
    - Column 3 (`Collections`): 8-item vertical typographic list (The Ultima, Grestough, Vitronite, Kasamood, Gres Art, Duratech, UniTerra, DuRock) matching the editorial rhythm of Column 2.
    - Column 4 (`Dynamic Preview Image Frame`): Architectural lifestyle preview cropped cleanly to true bleed without white letterboxing, maintaining smooth crossfades on hover.
    - Subtle 1px vertical borders cleanly divide each section over a unified, pure white backdrop. (Image column yields gracefully on laptops <1240px to keep text spacious).
- **Shop By Dropdown Layout (Mockup Match)**:
  - 3-column balanced architecture:
    - *Finishes* (Matt active state, Glossy, Polished, Satin + "View all finishes →").
    - *Colors* (2-column palette swatches: White, Beige, Brown, Blue / Ivory, Grey, Black, Green + "View all colors →").
    - *Texture* (Visual swatch reliefs: Smooth, Lightly Textured, Structured, Relief + "View all textures →").
- **Visual Polish**: Warm heritage gold underline indicator (`#A68740`) for active open mega-menu tabs matching Arbaaz's visual reference.
- **Homepage Hero Multi-Scroll Slider (Mockup Match)**:
  - Multi-slide interactive carousel with circular prev/next arrow controls (`<` and `>`), pagination dots, touch swipe, and auto-slide timer.
  - Features the official Kajaria high-res living room banner (`kajaria-living-desktop-2.avif` / local fallback) with headline *"Shaping Dreams Into Living Spaces"*, subheadline, and the circular chevron CTA *"EXPLORE RANGE"*.
  - Right-edge floating utility tabs (`ENQUIRE NOW 💬` and `3D Visualiser ⬡`) directly matching the mockup.
- **Brand Palette Integration**:
  - Primary Signature Blue: `#15508B` (buttons, active pills, icons, links)
  - Pure White: `#FFFFFF`
  - Black: `#000000` (headings, high-contrast text)
  - Deep Midnight Navy: `#082038` (hero gradients, dark footers)
  - Heritage Gold / Brass: `#A68740` (nav underlines, badges, accents)
  - Slate Mist: `#C2CCD6` (subtle borders, dividers, outlines)

### B. Prominent Exploration by Space
- Users think room-first (Bathroom, Kitchen, Living Room, Bedroom, Outdoor, Commercial).
- Homepage features an interactive switcher inspired by Marazzi benchmarks: `Spaces`, `Finishes`, `Colours`.
- Context preservation: Selecting a space (e.g. Bathroom) carries through the entire flow (Hero banner, filtered listings, PDP recommendations, dealer inquiry).

### C. Smart Filtering (PLP)
- **Batch Selection**: Users can select multiple checkboxes across multiple categories without disruptive page reloads.
- **Explicit Commit**: Dedicated "Apply (N)" and "Reset" buttons (on both desktop and mobile drawer).
- **Active Filter Counter**: Compact badge (e.g. "3 Filters Active Now") rather than messy external chips.
- **Prioritised Taxonomy**: `Colours` (with visual swatches) placed above `Collections`.
- **Elimination of Redundancy**: Suppress or pre-filter "Application" when a specific room/space is already active.

### D. Product Evaluation & Comparison (PDP)
- Introduce explicit "Evaluate and Compare" step before dealer contact.
- Clear technical specifications (Sizes, Finishes, Colours, Surface, Water Absorption, Slip Resistance).
- Integrated "Explore with our tools" banner (`View in My Room`, `360° View`, `Tile Calculator`).
- Direct action routes: `Where to Buy ⌖ →`, `Compare ⧉`, `Add to Favourites ♡`.
- Side-by-side comparison modal with diff highlights.

### E. Where to Buy & Graceful Fallback
- Dual search: City / PIN code autocomplete or "Use my current location".
- Interactive map view + showroom directory cards with type tags (Exclusive Showroom, Experience Centre, Authorised Dealer).
- **Graceful Fallback**: "Didn't find a centre near your location? Please get in touch with us and our team will help you find the nearest Kajaria authorised dealer."
- Seamless link to an assisted dealer enquiry modal with state retention.

---

## 3. Scope of Phase 1 Prototype

The prototype implements the end-to-end connected golden journey:
`Homepage` → `Explore by Space (Bathroom)` → `Product Listing Screen` → `Product Detail (Calcuta Imperial A)` → `Compare / Shortlist` → `Where to Buy` → `Assisted Enquiry Form & Confirmation`

### Included Features:
1. **Interactive Global Header**:
   - Brand logo & India's #1 tagline
   - Universal search with instant autocomplete & sample query tags
   - Visual search / camera upload simulation
   - Responsive mega-menu (Products, Shop By Spaces/Finishes/Colours, Catalogues, Resources, Tools)
   - Real-time Favourites counter badge (♡)
   - Mobile navigation drawer
2. **Interactive Homepage**:
   - Strategic Hero with direct exploration CTAs
   - "Find Tiles by Category" interactive switcher (Spaces, Finishes, Colours)
   - Unified Tools Hub with interactive demo modals
   - Interactive Inspiration Room Lookbook with clickable product hotspots
   - Testimonials & Prestigious Projects preview
3. **Product Listing Page (PLP)**:
   - Horizontal space switcher with active room pill/thumbnail
   - Contextual hero banner with dynamic tile counts
   - Batch multi-select sidebar / mobile drawer with `Apply (N)` and `Reset All`
   - Visual colour swatches with dynamic inventory counts
   - Card interactions: 360° preview tag, Add to Favourites, Add to Compare dock
4. **Product Detail Page (PDP)**:
   - Breadcrumb navigation preserving space context
   - High-fidelity image gallery with thumbnail preview and 360° interactive viewer
   - Specification cards & "Explore with our tools" launcher
   - Sticky bottom action bar on mobile
   - Related & Complementary tiles carousel
5. **Comparison Engine**:
   - Floating comparison dock (1–4 items)
   - Full side-by-side comparison matrix modal
6. **Unified Tools Demonstrators**:
   - **Interactive Tile Calculator**: Computes room area (sq ft / sq m), tile dimensions, wastage %, and exact box requirements.
   - **360° Interactive Visualiser**: Interactive room/tile view.
   - **Tile Quiz & Design Assistant (`#tile-quiz`)**: 8-step rules-based design assistant that translates non-technical room preferences into verified Kajaria product palettes, coordinated wall-and-floor combinations, editable answer chips, in-page dealer lookup, assisted enquiries, and print-ready PDF specification sheets.
7. **Where to Buy & Assisted Enquiry**:
   - City and PIN code store search
   - Filter by store type (Experience Centre, Showroom, Dealer)
   - Verified no-results state with one-click fallback
   - Assisted dealer enquiry modal with form validation & confirmation ticket

---

## 4. Documented Assumptions

1. **Demonstration Data**: All inventory counts (e.g. "625 tiles available") and dealer locations are representative mock data matching real Kajaria product series (Calcuta Imperial A, Bianco Onduluto, Lithico Beige, Crema Marfil, UniTerra).
2. **Tool Integrations**: 3D Visualiser and Virtual Showroom are represented as high-fidelity interactive simulation dialogs without requiring heavy 3rd-party WebGL backends.
3. **No External Dependencies / Server**: Built with modern vanilla ES Modules, native CSS custom properties, and semantic HTML5 for maximum speed, offline resilience, and ease of demonstration on any browser without node_modules friction.

---

## 5. Pending Questions for Arbaaz

1. **Brand Typography**: The heading font family is integrated directly from Kajaria brand assets as **Layfort** (`layfort-light.otf`, `layfort-regular.otf`, `layfort-regularitalic.otf`, `layfort-medium.otf`, `layfort-bold.otf`). Body text uses a clean system/geometric sans-serif stack for readability and performance.
2. **3D Visualiser Entry Points**: In the Tools hub, should the "View in Room" tool launch directly into room selection or prompt for a photo upload first? (Currently modelled with pre-curated room templates + tile swap).
3. **Catalogue Downloads**: For the catalogue experience (Slide 24), should "Download" trigger a sample PDF or open an interactive digital flipbook preview modal?
