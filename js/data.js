// Kajaria Ceramics UX Strategy - Demo Dataset & Taxonomy
// Note: Demonstrator data curated based on Kajaria official series (The Ultima, UniTerra, Gres Tough, etc.)

export const SPACES = [
  {
    id: 'bathroom',
    name: 'Bathroom',
    heroTitle: 'Tiles for Every Space / Bathroom',
    tagline: 'Built for Beauty and Balance',
    description: "Kajaria's bathroom tiles are built for beauty and balance—resistant to moisture, rich in finish, and designed to make even the smallest spaces feel considered, calming, and comfortably yours.",
    image: 'assets/images/spaces/bathroom-preview.jpg',
    thumb: 'assets/images/spaces/bathroom-preview.jpg',
    count: 625
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    heroTitle: 'Tiles for Every Space / Kitchen',
    tagline: 'Enduring Elegance for the Culinary Heart',
    description: 'Stain-resistant, heat-defying vitrified surfaces engineered for daily culinary craft without sacrificing sophisticated aesthetics.',
    image: 'assets/images/spaces/Kitchen-tile.jpg',
    thumb: 'assets/images/spaces/Kitchen-tile.jpg',
    count: 482
  },
  {
    id: 'living-room',
    name: 'Living Room',
    heroTitle: 'Tiles for Every Space / Living Room',
    tagline: 'Expansive Grandeur in Every Footstep',
    description: 'Large-format porcelain slabs that create continuous seamless floors, reflecting natural light and elevating welcoming family spaces.',
    image: 'assets/images/spaces/Livingroom-tile.jpg',
    thumb: 'assets/images/spaces/Livingroom-tile.jpg',
    count: 394
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    heroTitle: 'Tiles for Every Space / Bedroom',
    tagline: 'Warmth, Silence and Restful Textures',
    description: 'Subtle matte and carved surfaces designed for tactile softness, tranquil acoustics, and effortless morning warmth.',
    image: 'assets/images/spaces/Bedroom-tile.jpg',
    thumb: 'assets/images/spaces/Bedroom-tile.jpg',
    count: 410
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    heroTitle: 'Tiles for Every Space / Outdoor & Patio',
    tagline: 'All-Weather Slip-Resistant Resilience',
    description: 'R11 slip-rated vitrified heavy-duty slabs engineered to withstand extreme monsoons, direct sun, and heavy outdoor traffic.',
    image: 'assets/images/spaces/Outdoor-tile.jpg',
    thumb: 'assets/images/spaces/Outdoor-tile.jpg',
    count: 221
  },
  {
    id: 'commercial',
    name: 'Commercial Spaces',
    heroTitle: 'Tiles for Every Space / Commercial & Retail',
    tagline: 'High Traffic Durability Meets Signature Style',
    description: 'Heavy commercial vitrified surfaces certified for hospitality, corporate lobbies, airports, and luxury flagship retail boutiques.',
    image: 'assets/images/spaces/Commercialspace-tile.jpg',
    thumb: 'assets/images/spaces/Commercialspace-tile.jpg',
    count: 318
  },
  {
    id: 'staircases',
    name: 'Staircases',
    heroTitle: 'Tiles for Every Space / Staircases',
    tagline: 'Steadfast Grip & Seamless Edging',
    description: 'Step riser and bullnose vitrified porcelain tiles engineered for high impact, anti-skid safety, and continuous vertical architectural flow.',
    image: 'assets/images/spaces/Staircase-tile.jpg',
    thumb: 'assets/images/spaces/Staircase-tile.jpg',
    count: 145
  },
  {
    id: 'balcony',
    name: 'Balcony & Terrace',
    heroTitle: 'Tiles for Every Space / Balcony & Terrace',
    tagline: 'Sunlit Living, Weatherproof Porcelains',
    description: 'All-weather vitrified terracotta and anti-skid porcelain slabs designed for seamless transitions between indoor living and open-air verandas.',
    image: 'assets/images/quiz/tile-terracotta-patio.jpg',
    thumb: 'assets/images/quiz/tile-terracotta-patio.jpg',
    count: 188
  }
];

export const FINISHES = [
  // ROW 1 (6 Items)
  { id: 'glossy', name: 'Glossy', group: 'Glossy', img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'natural-matt', name: 'Natural Matt', group: 'Matt', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'riverwash-silk', name: 'Riverwash Silk', group: 'Satin', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'carving', name: 'Carving', group: 'Carved', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'brilliant-white-polish', name: 'Brilliant White Polish', group: 'Polished', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'crystal-gloss', name: 'Crystal Gloss', group: 'Glossy', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=300&h=300&q=80' },

  // ROW 2 (6 Items)
  { id: 'double-charge', name: 'Double Charge', group: 'Heavy Duty', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'bush-hammered', name: 'Bush Hammered', group: 'Tactile', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'dead-matt', name: 'Dead-Matt', group: 'Matt', img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'digital-full-body', name: 'Digital Full Body', group: 'Technical', img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'emboss-matt', name: 'Emboss Matt', group: 'Tactile', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=300&h=300&q=80' },
  { id: 'rustic-relief', name: 'Rustic Relief', group: 'Tactile', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=300&h=300&q=80' }
];

export const COLORS = [
  { id: 'white', name: 'White', hex: '#FFFFFF', border: '#D1D5DB', count: '142 designs' },
  { id: 'beige', name: 'Beige', hex: '#E8DCC4', count: '98 designs' },
  { id: 'cream', name: 'Cream', hex: '#F5F0E6', border: '#E2E8F0', count: '84 designs' },
  { id: 'grey', name: 'Grey', hex: '#9CA3AF', count: '112 designs' },
  { id: 'black', name: 'Black', hex: '#1F2937', count: '64 designs' },
  { id: 'brown', name: 'Brown', hex: '#8B5A2B', count: '76 designs' },
  { id: 'blue', name: 'Blue', hex: '#1E3A8A', count: '52 designs' },
  { id: 'green', name: 'Green', hex: '#166534', count: '46 designs' },
  { id: 'gold', name: 'Gold', hex: '#C5A059', count: '38 designs' },
  { id: 'copper', name: 'Copper', hex: '#B87333', count: '32 designs' },
  { id: 'silver', name: 'Silver', hex: '#CBD5E1', count: '68 designs' },
  { id: 'pink', name: 'Pink', hex: '#F472B6', count: '24 designs' },
  { id: 'red', name: 'Red', hex: '#DC2626', count: '28 designs' },
  { id: 'multicolor', name: 'Multicolor', gradient: 'conic-gradient(from 180deg at 50% 50%, #DC2626 0deg, #F59E0B 72deg, #10B981 144deg, #3B82F6 216deg, #8B5CF6 288deg, #DC2626 360deg)', count: '56 designs' }
];

export const COLLECTIONS = [
  {
    id: 'uniterra',
    name: 'UNITERRA',
    query: 'UniTerra',
    tagline: 'Large-Format Sintered Slabs',
    description: 'Precision-engineered large-format slabs with authentic Italian marble veining.',
    img: 'https://www.kajariaceramics.com/storage/product_attributes/unitera.avif?v=1788864823'
  },
  {
    id: 'the-ultima',
    name: 'THE ULTIMA',
    query: 'The Ultima',
    tagline: 'Grand Architectural Slabs',
    description: 'Extra-large format vitrified surfaces for seamless indoor and outdoor transitions.',
    img: 'https://www.kajariaceramics.com/storage/product_attributes/eternity-1.avif?v=1788864861'
  },
  {
    id: 'vitronite',
    name: 'VITRONITE',
    query: 'Vitronite',
    tagline: 'Full-Body Kitchen Slabs',
    description: '15mm continuous full-body vitrified slabs crafted for heavy-duty kitchen countertops.',
    img: 'https://www.kajariaceramics.com/storage/product_attributes/vitronite.avif?v=1788864883'
  },
  {
    id: 'grestough',
    name: 'GRESTOUGH',
    query: 'Grestough',
    tagline: 'Heavy-Duty Digital Ceramic',
    description: 'High-strength load-bearing surfaces built for high-traffic corridors and commercial spaces.',
    img: 'https://www.kajariaceramics.com/storage/product_attributes/grestough.avif?v=1788864908'
  },
  {
    id: 'kasamood',
    name: 'KASAMOOD',
    query: 'Kasamood',
    tagline: 'Designer Contemporary Surfaces',
    description: 'Trendsetting designer tiles crafted to elevate modern interior moods and aesthetics.',
    img: 'https://www.kajariaceramics.com/storage/product_attributes/kasamood.avif?v=1788864938'
  },
  {
    id: 'duratech',
    name: 'DURATECH',
    query: 'Duratech',
    tagline: 'High-Performance Heavy Duty',
    description: 'Heavy-duty technical vitrified tiles engineered for extreme load and durability.',
    img: 'https://www.kajariaceramics.com/storage/product_attributes/duratech-1.avif?v=1788864964'
  },
  {
    id: 'durock',
    name: 'DUROCK',
    query: 'DuRock',
    tagline: 'All-Weather Slip-Resistant Outdoor Slabs',
    description: 'Certified R11 outdoor pavers engineered to endure extreme weather and heavy footfalls.',
    img: 'https://www.kajariaceramics.com/storage/product_attributes/durock-1.avif?v=1788864989'
  }
];

export const PRODUCTS = [
  {
    id: 'calacutta-gold',
    name: 'Calacutta Gold',
    category: 'Bespoke Sintered Surfaces',
    typeBadge: 'WALL TILE · FLOOR TILE · SLAB',
    headline: 'Opulent Warm Veins on Statuario White Sintered Porcelain',
    description: 'Calacutta Gold features majestic amber and warm gold veins sweeping across a luminous alabaster ground. Engineered with Beyond Finish and Colour Body formulation for continuous bookmatched grandeur.',
    size: '119 x 280 cm',
    thickness: '5.5 mm',
    finish: 'Beyond',
    color: 'White',
    colorHex: '#FBF9F5',
    colorDetail: 'Gold & Ash Veins on Pure Alabaster',
    collection: 'UniTerra',
    surface: 'Beyond Silk Granula',
    waterAbsorption: '< 0.05%',
    slipRating: 'R10',
    idealSpaces: ['living-room', 'commercial', 'bathroom'],
    boxCoverage: '3.33 sq.m (35.84 sq.ft)',
    tilesPerBox: 1,
    featured: true,
    has360: true,
    image: 'assets/images/lookbook/cropped/calacutta-slab.jpg',
    gallery: [
      'assets/images/lookbook/cropped/calacutta-room.jpg',
      'assets/images/lookbook/cropped/calacutta-slab.jpg',
      'assets/images/lookbook/calacutta-gold-spread.jpg'
    ]
  },
  {
    id: 'grigio-onduluto',
    name: 'Grigio Onduluto',
    category: 'Bespoke Sintered Surfaces',
    typeBadge: 'WALL TILE · FLOOR TILE · SLAB',
    headline: 'Fluid Architectural Striations in Mineral Greige',
    description: 'Grigio Onduluto embodies the gentle movement of natural sedimentary stone with layered greige strata. Available in grand 119x280 cm slabs and 3D architectural mosaic formats for seamless executive interiors.',
    size: '119 x 280 cm',
    thickness: '5.5 mm',
    finish: 'Beyond',
    color: 'Grey',
    colorHex: '#C5BEB7',
    colorDetail: 'Warm Greige Mineral Waves',
    collection: 'UniTerra',
    surface: 'Beyond Silk Touch',
    waterAbsorption: '< 0.05%',
    slipRating: 'R10',
    idealSpaces: ['commercial', 'living-room', 'bathroom'],
    boxCoverage: '3.33 sq.m (35.84 sq.ft)',
    tilesPerBox: 1,
    featured: true,
    has360: true,
    image: 'assets/images/lookbook/cropped/grigio-slab.jpg',
    gallery: [
      'assets/images/lookbook/cropped/grigio-room.jpg',
      'assets/images/lookbook/cropped/grigio-slab.jpg',
      'assets/images/lookbook/grigio-onduluto-spread.jpg'
    ]
  },
  {
    id: 'evoque-nero',
    name: 'Evoque Nero',
    category: 'Bespoke Sintered Surfaces',
    typeBadge: 'WALL TILE · FLOOR TILE · SLAB',
    headline: 'High-Drama Noir with Radiant Liquid Gold Veins',
    description: 'Evoque Nero commands attention with deep noir obsidian contrasted by dramatic lightning veining in white and burnt gold. Features Ai + DG Technology and Riverwash Finish for tactile geological depth.',
    size: '119 x 280 cm',
    thickness: '5.5 mm',
    finish: 'Riverwash',
    color: 'Black',
    colorHex: '#141416',
    colorDetail: 'Nero Black with Gold & White Strike',
    collection: 'UniTerra',
    surface: 'Riverwash Dry Granula',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    idealSpaces: ['living-room', 'commercial', 'bathroom'],
    boxCoverage: '3.33 sq.m (35.84 sq.ft)',
    tilesPerBox: 1,
    featured: true,
    has360: true,
    image: 'assets/images/lookbook/cropped/evoque-slab.jpg',
    gallery: [
      'assets/images/lookbook/cropped/evoque-room.jpg',
      'assets/images/lookbook/cropped/evoque-slab.jpg',
      'assets/images/lookbook/evoque-nero-spread.jpg'
    ]
  },
  {
    id: 'calcuta-imperial-a',
    name: 'Calcuta Imperial A',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    headline: 'A Statement of Timeless Elegance',
    description: 'Calcuta Imperial A brings the timeless beauty of natural marble to your spaces. With its elegant veins and premium finish, it creates a luxurious yet calming ambience, making it ideal for both residential and commercial spaces.',
    size: '119 x 240 cm',
    thickness: '9 mm',
    finish: 'Riverwash',
    color: 'White',
    colorHex: '#F8F9FA',
    colorDetail: 'White / Grey Marble',
    collection: 'The Ultima',
    surface: 'Polished Silk',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    idealSpaces: ['bathroom', 'living-room', 'commercial'],
    boxCoverage: '2.86 sq.m (30.78 sq.ft)',
    tilesPerBox: 1,
    featured: true,
    has360: true,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'bianco-onduluto',
    name: 'Bianco Onduluto',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    headline: 'Fluid Ripples of Pure Alabaster',
    description: 'Featuring organic curvilinear striations inspired by coastal Mediterranean limestone, Bianco Onduluto provides architectural lightness and an expansive vertical sense of scale.',
    size: '119 x 280 cm',
    thickness: '5.5 mm',
    finish: 'Glossy',
    color: 'White',
    colorHex: '#FFFFFF',
    colorDetail: 'Warm Ivory Wave',
    collection: 'Vitronite',
    surface: 'High Gloss',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    idealSpaces: ['bathroom', 'living-room'],
    boxCoverage: '3.33 sq.m (35.84 sq.ft)',
    tilesPerBox: 1,
    featured: true,
    has360: true,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'lithico-beige',
    name: 'Lithico Beige',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'FLOOR TILE · WALL TILE',
    headline: 'Raw Mineral Harmony',
    description: 'Mined sandstone textures balanced with contemporary warmth. Lithico Beige delivers a tactile, non-reflective sanctuary surface that hides footprints and resists water spots gracefully.',
    size: '119 x 240 cm',
    thickness: '9 mm',
    finish: 'Matt',
    color: 'Beige',
    colorHex: '#E5D7C3',
    colorDetail: 'Warm Desert Sand',
    collection: 'UniTerra',
    surface: 'Natural Matt',
    waterAbsorption: '< 0.05%',
    slipRating: 'R10',
    idealSpaces: ['bathroom', 'living-room', 'bedroom', 'outdoor'],
    boxCoverage: '2.86 sq.m (30.78 sq.ft)',
    tilesPerBox: 1,
    featured: true,
    has360: true,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'crema-marfil',
    name: 'Crema Marfil',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'FLOOR TILE · WALL TILE',
    headline: 'The Heritage of Spanish Warmth',
    description: 'Renowned for its soft cinnamon veining across a honeyed cream base, Crema Marfil brings European salon grandeur into high-traffic everyday spaces.',
    size: '119 x 240 cm',
    thickness: '9 mm',
    finish: 'Polished',
    color: 'Beige',
    colorHex: '#EADBCE',
    colorDetail: 'Classic Amber Cream',
    collection: 'The Ultima',
    surface: 'Mirror Polished',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    idealSpaces: ['living-room', 'bedroom', 'bathroom'],
    boxCoverage: '2.86 sq.m (30.78 sq.ft)',
    tilesPerBox: 1,
    featured: true,
    has360: true,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'statuario-white',
    name: 'Statuario White',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    headline: 'Carrara Purity with Dramatic Veins',
    description: 'Deep charcoal-grey branching veins course across an ultra-pure white ground, recreating the legendary stone favored by Italian Renaissance sculptors.',
    size: '119 x 240 cm',
    thickness: '9 mm',
    finish: 'Glossy',
    color: 'White',
    colorHex: '#FFFFFF',
    colorDetail: 'Carrara Statuary White',
    collection: 'The Ultima',
    surface: 'Glossy Glazed',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    idealSpaces: ['living-room', 'bathroom', 'kitchen'],
    boxCoverage: '2.86 sq.m (30.78 sq.ft)',
    tilesPerBox: 1,
    featured: false,
    has360: true,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'marquina-black',
    name: 'Marquina Black',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    headline: 'Bold Noir Monolith',
    description: 'Jet black vitrified body etched with stark white calcite lightning patterns. Creates dramatic contrast in luxury powder rooms and executive feature walls.',
    size: '60 x 120 cm',
    thickness: '9 mm',
    finish: 'Glossy',
    color: 'Black',
    colorHex: '#1F2421',
    colorDetail: 'Deep Nero Calcite',
    collection: 'Grestough',
    surface: 'High Gloss Mirror',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    idealSpaces: ['bathroom', 'commercial'],
    boxCoverage: '1.44 sq.m (15.50 sq.ft)',
    tilesPerBox: 2,
    featured: false,
    has360: true,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'terrazzo-grigio',
    name: 'Terrazzo Grigio',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'FLOOR TILE',
    headline: 'Modern Venetian Aggregate',
    description: 'Playful micro-aggregates suspended in an ash-grey ceramic matrix. Delivers high acoustic dampening, exceptional scratch resilience, and mid-century chic.',
    size: '60 x 120 cm',
    thickness: '9.5 mm',
    finish: 'Matt',
    color: 'Grey',
    colorHex: '#8C92AC',
    colorDetail: 'Ash Mineral Speckle',
    collection: 'UniTerra',
    surface: 'Textured Matt',
    waterAbsorption: '< 0.05%',
    slipRating: 'R11',
    idealSpaces: ['kitchen', 'outdoor', 'commercial', 'staircases', 'balcony'],
    boxCoverage: '1.44 sq.m (15.50 sq.ft)',
    tilesPerBox: 2,
    featured: false,
    has360: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'cemento-nero',
    name: 'Cemento Nero',
    category: 'Full Body Vitrified',
    typeBadge: 'FLOOR TILE · HEAVY DUTY',
    headline: 'Architectural Brutalist Slate',
    description: 'Through-body uniform pigmented slab engineered for heavy outdoor vehicular pathways, poolside wet areas, and industrial chic living spaces.',
    size: '80 x 160 cm',
    thickness: '10 mm',
    finish: 'Matt',
    color: 'Black',
    colorHex: '#2B2B2B',
    colorDetail: 'Charcoal Cast Slate',
    collection: 'DuRock',
    surface: 'Rustic Relief',
    waterAbsorption: '< 0.03%',
    slipRating: 'R11',
    idealSpaces: ['outdoor', 'commercial', 'bathroom', 'staircases', 'balcony'],
    boxCoverage: '2.56 sq.m (27.55 sq.ft)',
    tilesPerBox: 2,
    featured: false,
    has360: false,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'travertine-walnut',
    name: 'Travertine Walnut',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    headline: 'Warm Organic Sedimentary Ribbon',
    description: 'Subtle pore patterns and warm terracotta-tinted walnut layers create an earthy, tactile backdrop suitable for spa bathrooms and sheltered outdoor verandas.',
    size: '60 x 120 cm',
    thickness: '9 mm',
    finish: 'Carving',
    color: 'Brown',
    colorHex: '#8B5A2B',
    colorDetail: 'Earthy Walnut Ribbon',
    collection: 'UniTerra',
    surface: 'Carved Matt',
    waterAbsorption: '< 0.05%',
    slipRating: 'R10',
    idealSpaces: ['living-room', 'bathroom', 'outdoor', 'balcony'],
    boxCoverage: '1.44 sq.m (15.50 sq.ft)',
    tilesPerBox: 2,
    featured: false,
    has360: false,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'onyx-verde',
    name: 'Onyx Verde',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'FEATURE WALL TILE',
    headline: 'Precious Emerald Translucence',
    description: 'Deep crystalline jade layers interspersed with golden quartz threads. Crafted for statement vanity walls, dining niches, and boutique hotel accents.',
    size: '80 x 160 cm',
    thickness: '9 mm',
    finish: 'Glossy',
    color: 'Green',
    colorHex: '#2E6F40',
    colorDetail: 'Deep Emerald Quartz',
    collection: 'The Ultima',
    surface: 'Crystalline Gloss',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    idealSpaces: ['bathroom', 'living-room', 'commercial'],
    boxCoverage: '2.56 sq.m (27.55 sq.ft)',
    tilesPerBox: 2,
    featured: false,
    has360: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
    ]
  }
];

export const FILTER_OPTIONS = {
  categories: [
    { label: 'Glazed Vitrified Tiles', count: 348 },
    { label: 'Polished Vitrified Tiles', count: 182 },
    { label: 'Ceramic Wall Tiles', count: 142 },
    { label: 'Full Body Vitrified', count: 75 }
  ],
  colors: [
    { label: 'White', hex: '#FFFFFF', border: '#D1D5DB', count: 124 },
    { label: 'Beige', hex: '#E8DCC4', count: 98 },
    { label: 'Grey', hex: '#9CA3AF', count: 112 },
    { label: 'Brown', hex: '#8B5A2B', count: 76 },
    { label: 'Black', hex: '#1F2937', count: 64 },
    { label: 'Green', hex: '#2E6F40', count: 28 }
  ],
  collections: [
    { label: 'The Ultima', count: 186 },
    { label: 'Grestough', count: 110 },
    { label: 'Vitronite', count: 120 },
    { label: 'Kasamood', count: 88 },
    { label: 'Gres Art', count: 65 },
    { label: 'Duratech', count: 96 },
    { label: 'UniTerra', count: 144 },
    { label: 'DuRock', count: 74 }
  ],
  sizes: [
    { label: '119 x 280 cm', count: 84 },
    { label: '119 x 240 cm', count: 196 },
    { label: '80 x 160 cm', count: 172 },
    { label: '60 x 120 cm', count: 215 }
  ],
  finishes: [
    { label: 'Glossy', count: 230 },
    { label: 'Matt', count: 210 },
    { label: 'Riverwash', count: 74 },
    { label: 'Polished', count: 140 },
    { label: 'Carving', count: 62 }
  ],
  textures: [
    { label: 'Mirror Polished', count: 140 },
    { label: 'Natural Matt', count: 185 },
    { label: 'High Gloss', count: 210 },
    { label: 'Polished Silk', count: 95 },
    { label: 'Textured Matt', count: 115 },
    { label: 'Rustic Relief', count: 58 }
  ]
};

export const DEALERS = [
  {
    id: 'del-exp-01',
    name: 'Kajaria Galaxy Experience Centre',
    type: 'Experience Centre',
    city: 'New Delhi',
    state: 'Delhi',
    pin: '110049',
    address: 'A-27, South Extension Part II, Ring Road, New Delhi',
    phone: '+91 11 4710 4000',
    distance: '2.4 km',
    lat: 28.5701,
    lng: 77.2228,
    timing: '10:00 AM - 8:00 PM (Open 7 Days)',
    features: ['The Ultima Large Slab Display', 'Live 3D Room Visualiser', 'Dedicated Architect Lounge']
  },
  {
    id: 'del-shw-02',
    name: 'Sowndarya Ceramics & Bath',
    type: 'Exclusive Showroom',
    city: 'New Delhi',
    state: 'Delhi',
    pin: '110015',
    address: 'Plot 44, Rama Road Industrial Area, Najafgarh Road, New Delhi',
    phone: '+91 11 4552 1100',
    distance: '6.1 km',
    lat: 28.6572,
    lng: 77.1415,
    timing: '10:30 AM - 7:30 PM',
    features: ['Complete Vitrified Range', 'On-site Tile Estimator']
  },
  {
    id: 'del-dlr-03',
    name: 'Vikas Tiles & Sanitary Traders',
    type: 'Authorised Dealer',
    city: 'New Delhi',
    state: 'Delhi',
    pin: '110092',
    address: 'Main Vikas Marg, Shakarpur, Near Metro Station, New Delhi',
    phone: '+91 11 2244 8899',
    distance: '8.3 km',
    lat: 28.6295,
    lng: 77.2786,
    timing: '10:00 AM - 8:00 PM',
    features: ['Direct Contractor Pricing', 'Same-day Sample Dispatch']
  },
  {
    id: 'mum-exp-01',
    name: 'Kajaria Grand Experience Lounge',
    type: 'Experience Centre',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: '400053',
    address: 'Unit 102, Prime Plaza, SV Road, Andheri West, Mumbai',
    phone: '+91 22 6124 9000',
    distance: '3.8 km',
    lat: 19.1254,
    lng: 72.8415,
    timing: '10:00 AM - 8:30 PM',
    features: ['Virtual Reality Headset Studio', 'All 2026 Slabs in Stock']
  },
  {
    id: 'blr-exp-01',
    name: 'Kajaria Flagship Experience Centre',
    type: 'Experience Centre',
    city: 'Bengaluru',
    state: 'Karnataka',
    pin: '560034',
    address: '100 Feet Intermediate Ring Road, Koramangala 4th Block, Bengaluru',
    phone: '+91 80 4321 7890',
    distance: '1.9 km',
    lat: 12.9352,
    lng: 77.6245,
    timing: '10:00 AM - 8:00 PM',
    features: ['Architect Specification Desk', 'Material Mockup Sandbox']
  },
  {
    id: 'hyd-shw-01',
    name: 'Royal Surface Gallery - Kajaria Exclusive',
    type: 'Exclusive Showroom',
    city: 'Hyderabad',
    state: 'Telangana',
    pin: '500033',
    address: 'Road No 36, Jubilee Hills, Near Metro Station, Hyderabad',
    phone: '+91 40 2355 6789',
    distance: '4.2 km',
    lat: 17.4319,
    lng: 78.4073,
    timing: '10:00 AM - 8:00 PM',
    features: ['The Ultima Gallery', 'Designer Consultations']
  }
];

export const CATALOGUES = [
  {
    id: 'cat-uniterra',
    title: 'UNITERRA',
    subTitle: 'Inspired by Nature & Elements',
    date: 'June 2026',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    pages: 148,
    fileSize: '34 MB'
  },
  {
    id: 'cat-ultima-new',
    title: 'THE ULTIMA NEW COLLECTION',
    subTitle: 'Luxury Surfaces for Modern Living (North, East & West India)',
    date: '2026 Edition',
    coverImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80',
    pages: 216,
    fileSize: '48 MB'
  },
  {
    id: 'cat-ultima-south',
    title: 'THE ULTIMA NEW COLLECTION',
    subTitle: 'Timeless Surfaces, Enduring Spaces (South India)',
    date: '2026 Edition',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80',
    pages: 184,
    fileSize: '42 MB'
  }
];

export const TOOLS_LIST = [
  {
    id: 'tile-quiz',
    name: 'Tile Quiz & Design Assistant',
    badge: 'AI Design Matcher',
    icon: 'sparkles',
    description: 'Unsure where to begin? Answer a few everyday lifestyle questions to receive a tailored tile palette, finish, and wall-floor pairing.',
    actionLabel: 'Take Tile Quiz'
  },
  {
    id: 'view-in-room',
    name: 'View in Room',
    badge: 'Augmented Reality',
    icon: 'camera',
    description: 'See how any Kajaria tile looks in your actual room by uploading a phone picture or choosing a 3D designer space.',
    actionLabel: 'Launch Visualiser'
  },
  {
    id: '3d-visualiser',
    name: '3D Tile Visualiser',
    badge: 'Interactive 360°',
    icon: 'cube',
    description: 'Explore panoramic 360° virtual rooms with dynamic grout color options, lighting shifts, and multi-surface mixing.',
    actionLabel: 'Explore 3D Rooms'
  },
  {
    id: 'tile-calculator',
    name: 'Tile Calculator',
    badge: 'Precision Estimator',
    icon: 'calculator',
    description: 'Calculate exact tile count, box requirements, and recommended 10% wastage reserve for your exact room dimensions.',
    actionLabel: 'Calculate Tiles'
  },
  {
    id: 'virtual-showroom',
    name: 'Virtual Showroom',
    badge: 'Virtual Tour',
    icon: 'map-pin',
    description: 'Take a self-guided walkthrough through our flagship Kajaria Galaxy experience centre from the comfort of home.',
    actionLabel: 'Start Walkthrough'
  }
];

export const LOOKBOOKS = [
  {
    id: 'lithico-beige',
    index: '01',
    title: 'Lithico Beige & Natural Strata',
    subtitle: 'Bespoke Sintered Surfaces · Minimalist Sanctuary',
    spaceName: 'Minimalist Architectural Salon',
    spreadImg: 'assets/images/lookbook/lookbook-minimalist-lounge.jpg',
    caption: 'LITHICO BEIGE BEYOND | 1190X2400 MM | 9 MM MATT',
    productId: 'lithico-beige',
    brand: 'UniTerra',
    brandTagline: 'Bespoke Sintered Surfaces',
    specs: {
      size: '1190 x 2400 mm Large Format',
      thickness: '9 mm Slim-Profile Vitrified',
      finish: 'Natural Matt (Sandstone Tactile)',
      bodyType: 'Colour Body Vitrified',
      faces: 'Faces x 6 (Seamless Organic Flow)',
      mosaics: '300x300 mm & Curved Wall Cladding'
    },
    hotspots: [
      {
        id: 'lb1-floor',
        x: 48,
        y: 80,
        title: 'Expansive Floor Surface',
        tile: 'Lithico Beige Beyond',
        detail: '1190 x 2400 mm · 9 mm Natural Matt Vitrified Slab'
      },
      {
        id: 'lb1-wall',
        x: 36,
        y: 34,
        title: 'Architectural Curved Partition',
        tile: 'UniTerra Bone Plaster',
        detail: 'Seamless Sintered Cladding with Ambient Backlighting'
      }
    ]
  },
  {
    id: 'travertine-walnut',
    index: '02',
    title: 'Terracotta Fluted Gloss & Greige',
    subtitle: 'Artisanal Glazed Ceramic · Contemporary Living',
    spaceName: 'Contemporary Living & Media Suite',
    spreadImg: 'assets/images/lookbook/lookbook-terracotta-wall.jpg',
    caption: 'TERRACOTTA GLOSS PICKET | 75X300 MM · FLOOR: GRIGIO 1190X600 MM',
    productId: 'travertine-walnut',
    brand: 'Kasamood',
    brandTagline: 'Artisanal Designer Ceramic',
    specs: {
      size: '75 x 300 mm Wall · 1190 x 600 mm Floor',
      thickness: '8.5 mm Vitreous Ceramic / 9.0 mm Sintered',
      finish: 'High-Gloss Vitreous Glaze (Reflective Luster)',
      bodyType: 'Artisanal White Body Ceramic',
      faces: 'Multi-Tone Handcrafted Variation (V3)',
      mosaics: 'Chevron Picket Interlocking Pattern'
    },
    hotspots: [
      {
        id: 'lb2-wall',
        x: 38,
        y: 40,
        title: 'Vertical Feature Wall',
        tile: 'Kasamood Terracotta Flute Picket',
        detail: '75 x 300 mm · High-Gloss Reflective Vitreous Glaze'
      },
      {
        id: 'lb2-floor',
        x: 46,
        y: 88,
        title: 'Neutral Living Floor',
        tile: 'Grigio Onduluto Beyond',
        detail: '1190 x 600 mm · Matt Sintered Heavy-Duty Slab'
      }
    ]
  },
  {
    id: 'onyx-verde',
    index: '03',
    title: 'Onyx Verde Gloss & Earth Brick',
    subtitle: 'Biophilic Sanctuary · Japandi Spa Suite',
    spaceName: 'Indoor-Outdoor Japandi Wellness Bath',
    spreadImg: 'assets/images/lookbook/lookbook-biophilic-spa.jpg',
    caption: 'ONYX VERDE GLOSS | 150X150 MM · SHOWER: EARTH BRICK 150X150 MM',
    productId: 'onyx-verde',
    brand: 'The Ultima',
    brandTagline: 'Architectural Vitrified Surfaces',
    specs: {
      size: '150 x 150 mm Artisan Square · 300 x 300 mm Floor',
      thickness: '9 mm Vitrified Slab',
      finish: 'Dual Finish: Crystalline Gloss & Tactile Matt',
      bodyType: 'Colour Body Vitrified',
      faces: 'Dynamic Natural Striations (V3)',
      mosaics: 'Micro-Grout Wet Area Grid'
    },
    hotspots: [
      {
        id: 'lb3-green',
        x: 26,
        y: 44,
        title: 'Vanity Statement Wall',
        tile: 'Onyx Verde Artisan Square',
        detail: '150 x 150 mm · Crystalline Wet-Glaze Emerald Ceramic'
      },
      {
        id: 'lb3-shower',
        x: 52,
        y: 44,
        title: 'Open Shower Cladding',
        tile: 'UniTerra Terracotta Matt',
        detail: '150 x 150 mm · Tactile Anti-Skid Ceramic Cladding'
      },
      {
        id: 'lb3-floor',
        x: 44,
        y: 86,
        title: 'Wet-Area Spa Floor',
        tile: 'Lithico Beige R11 Mosaic',
        detail: '300 x 300 mm · High-Traction R11 All-Weather Surface'
      }
    ]
  }
];
