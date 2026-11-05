// Kajaria Tile Quiz — Questions Configuration, Taxonomy & Rules-Based Recommendation Engine
// Built for Kajaria UX Strategy: Interactive Design Assistant for Homeowners & Designers

export const QUIZ_ANALYTICS_EVENTS = [
  'quiz_started',
  'step_viewed',
  'step_completed',
  'quiz_abandoned',
  'results_viewed',
  'recommendation_selected',
  'answers_edited',
  'pdf_downloaded',
  'profile_save_completed',
  'where_to_buy_selected',
  'dealer_results_viewed',
  'enquiry_started',
  'enquiry_submitted',
  'quiz_restarted'
];

export function logQuizEvent(eventName, payload = {}) {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    payload
  };
  try {
    const existing = JSON.parse(sessionStorage.getItem('kajaria_quiz_events') || '[]');
    existing.push(event);
    sessionStorage.setItem('kajaria_quiz_events', JSON.stringify(existing));
  } catch (e) {
    // sessionStorage fallback
  }
  // Debug log in developer console
  console.log(`[Quiz Analytics] ${eventName}:`, payload);
}

// Visual options and questions structure
export const QUIZ_STEPS_CONFIG = [
  {
    id: 'space',
    title: 'Which space are you planning?',
    subtitle: 'Start with one room. You can explore another space after completing this recommendation.',
    type: 'single-select',
    options: [
      {
        id: 'living-room',
        label: 'Living Room',
        desc: 'Social gathering & family comfort',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
        icon: '🛋️'
      },
      {
        id: 'bedroom',
        label: 'Bedroom',
        desc: 'Tranquil sanctuary & soft acoustic warmth',
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80',
        icon: '🛏️'
      },
      {
        id: 'bathroom',
        label: 'Bathroom',
        desc: 'Spa sanctuary requiring wet-area safety & moisture defense',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80',
        icon: '🚿'
      },
      {
        id: 'kitchen',
        label: 'Kitchen',
        desc: 'High-activity culinary heart needing stain & heat resilience',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        icon: '🍳'
      },
      {
        id: 'outdoor',
        label: 'Balcony / Outdoor Area',
        desc: 'Weather-exposed terraces, verandas & poolside patios',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
        icon: '🌿'
      },
      {
        id: 'commercial',
        label: 'Other Space / Home Office',
        desc: 'Workspaces, corridors, entrance foyers & dining niches',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        icon: '🏢'
      }
    ]
  },
  {
    id: 'application',
    title: 'Where will the tiles go?',
    subtitle: 'Different surfaces bear different weight, moisture, and maintenance needs.',
    type: 'single-select',
    options: [
      {
        id: 'floor',
        label: 'Floor Only',
        desc: 'Requires weight bearing, scratch resilience & foot safety',
        icon: '📐'
      },
      {
        id: 'walls',
        label: 'Walls Only',
        desc: 'Lightweight, wipe-clean vertical beauty & light reflection',
        icon: '🧱'
      },
      {
        id: 'both',
        label: 'Both Walls and Floor',
        desc: 'Complete coordinated room design with matched or contrasting surfaces',
        icon: '🏠'
      }
    ],
    // Conditional sub-question when 'both' is selected
    subQuestion: {
      conditionKey: 'both',
      id: 'coordination',
      title: 'How would you like the walls and floor to work together?',
      options: [
        {
          id: 'coordinated',
          label: 'A coordinated, similar look',
          desc: 'Harmonious continuity using matching stone or marble tones across surfaces'
        },
        {
          id: 'contrasting',
          label: 'Different tiles that complement each other',
          desc: 'Sophisticated contrast (e.g. textured warm wood floor with lighter marble walls)'
        },
        {
          id: 'help-me-decide',
          label: 'Help me decide',
          desc: 'Let our design assistant balance light, contrast, and visual proportion for you'
        }
      ]
    }
  },
  {
    id: 'room-context',
    title: 'Tell us about the room',
    subtitle: 'Room size informs visual proportions and tile scale; natural light shapes color perception.',
    type: 'compound',
    fields: [
      {
        id: 'roomSize',
        label: 'Approximate room size',
        type: 'select-pills',
        options: [
          { id: 'small', label: 'Compact / Small', hint: 'Under 100 sq.ft' },
          { id: 'medium', label: 'Standard / Medium', hint: '100 – 250 sq.ft' },
          { id: 'large', label: 'Spacious / Large', hint: 'Over 250 sq.ft' },
          { id: 'not-sure', label: 'Not sure — guide me', hint: 'We will suggest versatile sizing' }
        ]
      },
      {
        id: 'naturalLight',
        label: 'Natural sunlight in this space',
        type: 'select-pills',
        options: [
          { id: 'limited', label: 'Limited / No direct sunlight', hint: 'Benefits from lighter, reflective surfaces' },
          { id: 'some', label: 'Moderate / Some windows', hint: 'Versatile for warm neutrals and mid-tones' },
          { id: 'plenty', label: 'Plenty / Sun-filled', hint: 'Can comfortably carry deep dramatic veining' }
        ]
      },
      {
        id: 'dimensions',
        label: 'Known dimensions (Optional)',
        type: 'dimensions-input',
        placeholderL: 'Length (ft)',
        placeholderW: 'Width (ft)',
        hint: 'Optional. Exact box quantities will be confirmed by your dealer site measurement.'
      }
    ]
  },
  {
    id: 'mood',
    title: 'What feeling would you like to create?',
    subtitle: 'Choose the emotional atmosphere you want to experience every day.',
    type: 'single-select',
    options: [
      {
        id: 'calm-minimal',
        label: 'Calm & Minimal',
        desc: 'Serene, uncluttered spaces with soft monolithic continuity and quiet elegance.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
        paletteTag: 'Soft Alabaster, Pale Ash, Honed Sand'
      },
      {
        id: 'warm-natural',
        label: 'Warm & Natural',
        desc: 'Earthy textures, organic grain, and welcoming hospitality tones that soothe.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
        paletteTag: 'Honeyed Travertine, Desert Beige, Warm Oak'
      },
      {
        id: 'elegant-refined',
        label: 'Elegant & Refined',
        desc: 'Timeless Italian marble veins, silk polished luster, and architectural grandeur.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
        paletteTag: 'Calacatta Gold, Statuary White, Silk Polished'
      },
      {
        id: 'bold-expressive',
        label: 'Bold & Expressive',
        desc: 'Deep noir monolithic stones, dramatic calcite lightning, and signature luxury accents.',
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
        paletteTag: 'Nero Marquina, Deep Emerald Onyx, Cast Slate'
      },
      {
        id: 'help-me-choose',
        label: 'Help me choose',
        desc: 'We will recommend versatile, balanced aesthetics tailored to your selected room.',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
        paletteTag: 'Designer Curated Balance'
      }
    ]
  },
  {
    id: 'colors',
    title: 'Which colours appeal to you?',
    subtitle: 'Select up to two colour directions that feel right for your personal taste.',
    type: 'multi-select',
    maxSelect: 2,
    options: [
      {
        id: 'white-ivory',
        label: 'White & Ivory',
        desc: 'Airy, light-expanding, timeless pure background',
        hexList: ['#FFFFFF', '#F8F9FA', '#F3F4F6']
      },
      {
        id: 'beige-warm',
        label: 'Beige & Warm Neutrals',
        desc: 'Cozy cream, limestone sand, warm biscuit',
        hexList: ['#F5EBE1', '#E8DCC4', '#D4C3A3']
      },
      {
        id: 'grey-cool',
        label: 'Grey & Cool Neutrals',
        desc: 'Architectural ash, modern concrete, silver fog',
        hexList: ['#E5E7EB', '#9CA3AF', '#6B7280']
      },
      {
        id: 'earthy-tones',
        label: 'Earthy Tones',
        desc: 'Walnut brown, warm terracotta, sedimentary amber',
        hexList: ['#8B5A2B', '#A0522D', '#CD853F']
      },
      {
        id: 'dark-dramatic',
        label: 'Dark & Dramatic',
        desc: 'Deep charcoal, slate nero, rich midnight marble',
        hexList: ['#1F2937', '#111827', '#0F172A']
      },
      {
        id: 'open-suggestions',
        label: 'Open to suggestions',
        desc: 'Let our assistant recommend what best complements your space lighting',
        isWildcard: true
      }
    ],
    // Optional companion question
    furnitureContext: {
      id: 'fittings',
      label: 'Existing cabinets, furniture, or fixtures (Optional)',
      options: [
        { id: 'light', label: 'Light / White' },
        { id: 'dark', label: 'Dark / Black / Charcoal' },
        { id: 'wood', label: 'Natural Wood Tones' },
        { id: 'brass-chrome', label: 'Chrome / Brass Metallic' },
        { id: 'deciding', label: 'Still deciding' }
      ]
    }
  },
  {
    id: 'surface',
    title: 'Which surface look do you prefer?',
    subtitle: 'Surface appearance is the visual pattern and texture. Finish (how light reflects) can be tailored separately.',
    type: 'single-select',
    options: [
      {
        id: 'marble',
        label: 'Marble-inspired',
        tagline: 'Flowing continuous veins',
        desc: 'Recreates the natural grandeur of Italian Calacatta and Statuary marble with organic fluid veining.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'stone',
        label: 'Stone-inspired',
        tagline: 'Natural mineral variation',
        desc: 'Subtle pore patterns, sedimentary limestone, and organic mineral flakes with gentle tactile relief.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'wood',
        label: 'Wood-inspired',
        tagline: 'Warm organic grain',
        desc: 'All the welcoming warmth and knot details of natural oak planks with zero water swelling or termite risk.',
        image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'concrete',
        label: 'Concrete-inspired',
        tagline: 'Understated and contemporary',
        desc: 'Smooth troweled cement textures and industrial brutalist tones for sleek modern interiors.',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'plain',
        label: 'Plain & Subtle',
        tagline: 'A cleaner, quieter look',
        desc: 'Monolithic pure colors with micro-textures that let furniture, lighting, and architecture shine.',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'help-me-choose',
        label: 'Help me choose',
        tagline: 'Design assistant recommendation',
        desc: 'We will suggest surface textures that balance easy maintenance with your chosen mood.',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'usage',
    title: 'What matters most in everyday use?',
    subtitle: 'Practical suitability comes first. We use verified slip ratings and body durability to ensure lasting safety.',
    type: 'single-select',
    options: [
      {
        id: 'easy-cleaning',
        label: 'Easy cleaning & low maintenance',
        desc: 'Smooth glazed surfaces that wipe clean with water and resist soap scum / grease effortlessly.',
        icon: '✨'
      },
      {
        id: 'less-marks',
        label: 'Less visible marks & dust',
        desc: 'Textured matte or natural stone relief that conceals water spots, footprints, and fine dust.',
        icon: '🛡️'
      },
      {
        id: 'frequent-water',
        label: 'Frequent water exposure / Wet areas',
        desc: 'Requires certified R10 or R11 anti-skid grip and ultra-low water absorption (<0.05%).',
        icon: '💧'
      },
      {
        id: 'heavy-use',
        label: 'Heavy everyday traffic',
        desc: 'Full-body vitrified durability engineered to withstand active pets, kids, and outdoor footwear.',
        icon: '👟'
      },
      {
        id: 'comfort-family',
        label: 'Comfort for children & elderly',
        desc: 'Prioritises dependable foot traction, non-reflective glare reduction, and gentle tactile grip.',
        icon: '👨‍👩‍👧'
      },
      {
        id: 'no-preference',
        label: 'No specific preference',
        desc: 'Standard residential suitability with balanced everyday resilience.',
        icon: '⚖️'
      }
    ],
    // Specific wet area safety check
    wetAreaClarification: {
      spaces: ['bathroom', 'outdoor'],
      title: 'Water Exposure Check',
      prompt: 'Will this floor area frequently get wet from showers, pool splashes, or monsoons?',
      options: [
        { id: 'yes-wet', label: 'Yes — Wet zone requiring anti-skid grip (R10 / R11)', verifiedTag: 'Prioritises Anti-Skid Vitrified' },
        { id: 'no-dry', label: 'No — Primarily a dry zone / covered area', verifiedTag: 'Standard Residential Floor' }
      ]
    }
  },
  {
    id: 'preferences',
    title: 'Optional Design Preferences',
    subtitle: 'These refinements are optional. Feel free to skip if you prefer our design assistant to recommend them.',
    type: 'compound-optional',
    isSkippable: true,
    fields: [
      {
        id: 'preferredSize',
        label: 'Preferred Tile Size',
        hint: 'Large-format slabs minimize grout lines for seamless visual flow; standard sizes offer versatile laying flexibility.',
        options: [
          { id: 'recommend', label: 'Recommend for me' },
          { id: 'standard', label: 'Standard (60 x 120 cm)' },
          { id: 'large-format', label: 'Large Format Slab (119 x 240 cm+)' }
        ]
      },
      {
        id: 'preferredFinish',
        label: 'Finish Preference',
        hint: 'Glossy bounces light to expand spaces; Matt & Carving provide soft reflection and hide daily footprints.',
        options: [
          { id: 'recommend', label: 'Recommend for me' },
          { id: 'matt', label: 'Matte / Satin' },
          { id: 'glossy', label: 'Glossy / Polished' },
          { id: 'open', label: 'Open to either' }
        ]
      },
      {
        id: 'budgetNote',
        label: 'Budget Guidance',
        content: 'Tile pricing varies by slab dimensions, finish thickness, and regional dealer logistics. Confirm final delivered pricing with your local authorized Kajaria dealer.'
      }
    ]
  }
];

// Curated verified Kajaria tile database with specific pairings & technical ratings
export const QUIZ_CATALOG_DATA = [
  {
    id: 'calcuta-imperial-a',
    name: 'Calcuta Imperial A',
    collection: 'The Ultima',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    size: '119 x 240 cm',
    thickness: '9 mm',
    finish: 'Riverwash',
    surface: 'Marble',
    surfaceDetail: 'Flowing Carrara Veins',
    color: 'White',
    colorHex: '#F8F9FA',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    application: ['wall', 'floor-dry'],
    spaces: ['living-room', 'bedroom', 'bathroom', 'kitchen', 'commercial'],
    mood: ['elegant-refined', 'calm-minimal'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Grand Italian veining with a silky Riverwash touch creates timeless luxury while remaining effortless to wipe clean on walls and elegant living areas.'
  },
  {
    id: 'lithico-beige',
    name: 'Lithico Beige',
    collection: 'UniTerra',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'FLOOR TILE · WALL TILE',
    size: '119 x 240 cm',
    thickness: '9 mm',
    finish: 'Natural Matt',
    surface: 'Stone',
    surfaceDetail: 'Natural Mineral Sand',
    color: 'Beige',
    colorHex: '#E5D7C3',
    waterAbsorption: '< 0.05%',
    slipRating: 'R10',
    application: ['floor', 'wall'],
    spaces: ['bathroom', 'living-room', 'bedroom', 'kitchen', 'outdoor'],
    mood: ['warm-natural', 'calm-minimal'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Certified R10 anti-skid protection and a non-reflective desert sand finish hide water spots gracefully, making it ideal for wet bathrooms and tranquil living floors.'
  },
  {
    id: 'crema-marfil',
    name: 'Crema Marfil',
    collection: 'The Ultima',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'FLOOR TILE · WALL TILE',
    size: '119 x 240 cm',
    thickness: '9 mm',
    finish: 'Mirror Polished',
    surface: 'Marble',
    surfaceDetail: 'Classic Spanish Amber Vein',
    color: 'Beige',
    colorHex: '#EADBCE',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    application: ['floor-dry', 'wall'],
    spaces: ['living-room', 'bedroom', 'bathroom'],
    mood: ['warm-natural', 'elegant-refined'],
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Honeyed amber warmth and soft veining amplify natural daylight, infusing welcoming hospitality into living rooms and master suites.'
  },
  {
    id: 'statuario-white',
    name: 'Statuario White',
    collection: 'The Ultima',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    size: '119 x 240 cm',
    thickness: '9 mm',
    finish: 'High Gloss Glazed',
    surface: 'Marble',
    surfaceDetail: 'Bold Charcoal Veins on Pure White',
    color: 'White',
    colorHex: '#FFFFFF',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    application: ['wall', 'floor-dry'],
    spaces: ['living-room', 'bathroom', 'kitchen', 'commercial'],
    mood: ['elegant-refined', 'bold-expressive'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Sculptural Carrara veining reflects abundant light to visually expand compact rooms, creating a showstopper vertical focal point.'
  },
  {
    id: 'marquina-black',
    name: 'Marquina Black',
    collection: 'Grestough',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    size: '60 x 120 cm',
    thickness: '9 mm',
    finish: 'High Gloss Mirror',
    surface: 'Marble',
    surfaceDetail: 'Deep Nero Calcite',
    color: 'Black',
    colorHex: '#1F2421',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    application: ['wall', 'floor-dry'],
    spaces: ['bathroom', 'commercial', 'living-room'],
    mood: ['bold-expressive'],
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Jet black vitrified body etched with stark white calcite lightning patterns brings dramatic boutique elegance to accent walls and powder vanity areas.'
  },
  {
    id: 'terrazzo-grigio',
    name: 'Terrazzo Grigio',
    collection: 'UniTerra',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'FLOOR TILE',
    size: '60 x 120 cm',
    thickness: '9.5 mm',
    finish: 'Textured Matt',
    surface: 'Stone',
    surfaceDetail: 'Venetian Mineral Aggregate',
    color: 'Grey',
    colorHex: '#8C92AC',
    waterAbsorption: '< 0.05%',
    slipRating: 'R11',
    application: ['floor'],
    spaces: ['kitchen', 'outdoor', 'commercial', 'bathroom'],
    mood: ['calm-minimal', 'bold-expressive'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Micro-aggregates suspend fine dust and marks gracefully while heavy-duty R11 slip rating guarantees solid traction in wet kitchens, balconies, and bathrooms.'
  },
  {
    id: 'cemento-nero',
    name: 'Cemento Nero',
    collection: 'DuRock',
    category: 'Full Body Vitrified',
    typeBadge: 'FLOOR TILE · HEAVY DUTY',
    size: '80 x 160 cm',
    thickness: '10 mm',
    finish: 'Rustic Relief',
    surface: 'Concrete',
    surfaceDetail: 'Architectural Brutalist Slate',
    color: 'Black',
    colorHex: '#2B2B2B',
    waterAbsorption: '< 0.03%',
    slipRating: 'R11',
    application: ['floor'],
    spaces: ['outdoor', 'commercial', 'bathroom'],
    mood: ['bold-expressive', 'calm-minimal'],
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Full-body vitrified body engineered for outdoor patios, rain-washed balconies, and industrial modern floors with extreme weather and scratch resilience.'
  },
  {
    id: 'travertine-walnut',
    name: 'Travertine Walnut',
    collection: 'UniTerra',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    size: '60 x 120 cm',
    thickness: '9 mm',
    finish: 'Carved Matt',
    surface: 'Stone',
    surfaceDetail: 'Warm Earthy Terracotta Ribbon',
    color: 'Brown',
    colorHex: '#8B5A2B',
    waterAbsorption: '< 0.05%',
    slipRating: 'R10',
    application: ['floor', 'wall'],
    spaces: ['living-room', 'bathroom', 'outdoor', 'bedroom'],
    mood: ['warm-natural'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Subtle pore patterns and warm terracotta-tinted walnut layers create an earthy, tactile backdrop suitable for spa bathrooms and sheltered outdoor verandas.'
  },
  {
    id: 'onyx-verde',
    name: 'Onyx Verde',
    collection: 'The Ultima',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'FEATURE WALL TILE',
    size: '80 x 160 cm',
    thickness: '9 mm',
    finish: 'Crystalline Gloss',
    surface: 'Marble',
    surfaceDetail: 'Deep Emerald Quartz Translucence',
    color: 'Green',
    colorHex: '#2E6F40',
    waterAbsorption: '< 0.05%',
    slipRating: 'R9',
    application: ['wall'],
    spaces: ['bathroom', 'living-room', 'commercial'],
    mood: ['bold-expressive', 'elegant-refined'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Crystalline jade layers with golden quartz threads create a mesmerizing boutique feature wall behind vanities, dining credenzas, and luxury powder rooms.'
  },
  {
    id: 'rovere-natural-oak',
    name: 'Rovere Natural Oak',
    collection: 'Keravit Wood Planks',
    category: 'Glazed Vitrified Planks',
    typeBadge: 'FLOOR TILE · WALL TILE',
    size: '20 x 120 cm',
    thickness: '9.5 mm',
    finish: 'Natural Wood Grain Matt',
    surface: 'Wood',
    surfaceDetail: 'Authentic European Oak Grain',
    color: 'Brown',
    colorHex: '#A06E3B',
    waterAbsorption: '< 0.05%',
    slipRating: 'R10',
    application: ['floor', 'wall'],
    spaces: ['bedroom', 'living-room', 'balcony', 'bathroom'],
    mood: ['warm-natural', 'calm-minimal'],
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=200&q=80',
    whyFits: 'All the soothing warmth and visual comfort of natural timber flooring with complete resistance to termites, moisture warping, and bathroom dampness.'
  },
  {
    id: 'urban-concrete-grigio',
    name: 'Urban Concrete Grigio',
    collection: 'DuRock Architectural',
    category: 'Full Body Vitrified',
    typeBadge: 'FLOOR TILE · WALL TILE',
    size: '80 x 160 cm',
    thickness: '9.5 mm',
    finish: 'Honed Concrete Matt',
    surface: 'Concrete',
    surfaceDetail: 'Smooth Troweled Architectural Cement',
    color: 'Grey',
    colorHex: '#9E9E9E',
    waterAbsorption: '< 0.03%',
    slipRating: 'R10',
    application: ['floor', 'wall'],
    spaces: ['living-room', 'kitchen', 'outdoor', 'commercial', 'bathroom'],
    mood: ['calm-minimal', 'bold-expressive'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Understated monolithic cement tones provide a quiet architectural foundation that allows art, loose furniture, and greenery to stand out.'
  },
  {
    id: 'satin-pure-ivory',
    name: 'Satin Pure Ivory',
    collection: 'UniTerra Monolith',
    category: 'Glazed Vitrified Tiles',
    typeBadge: 'WALL TILE · FLOOR TILE',
    size: '60 x 120 cm',
    thickness: '9 mm',
    finish: 'Silky Matt',
    surface: 'Plain',
    surfaceDetail: 'Quiet Monolithic Warm Off-White',
    color: 'White',
    colorHex: '#FAF7F2',
    waterAbsorption: '< 0.05%',
    slipRating: 'R10',
    application: ['floor', 'wall'],
    spaces: ['bedroom', 'bathroom', 'living-room', 'kitchen'],
    mood: ['calm-minimal', 'warm-natural'],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    swatch: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=200&q=80',
    whyFits: 'Gentle satin sheen without distracting harsh glare. Maximizes diffused light in smaller spaces while remaining exceptionally easy to wipe clean.'
  }
];

// Helper to find a product by ID
export function getQuizProduct(id) {
  return QUIZ_CATALOG_DATA.find(p => p.id === id) || QUIZ_CATALOG_DATA[0];
}

// Transparent Rules-Based Recommendation Engine
export function generateQuizRecommendations(answers) {
  const {
    space = 'bathroom',
    application = 'both',
    coordination = 'coordinated',
    roomSize = 'medium',
    naturalLight = 'some',
    mood = 'warm-natural',
    colors = ['beige-warm'],
    surface = 'stone',
    usage = 'frequent-water',
    wetAreaRisk = 'yes-wet',
    preferredSize = 'recommend',
    preferredFinish = 'recommend'
  } = answers;

  // 1. FILTER CANDIDATES BY PRACTICAL SUITABILITY
  const isWetFloor = (space === 'bathroom' || space === 'outdoor') && 
                     (application === 'floor' || application === 'both') &&
                     (usage === 'frequent-water' || wetAreaRisk === 'yes-wet');

  const isOutdoor = space === 'outdoor';

  // Scoring function for a single product
  function scoreProduct(product, targetSurfaceType = 'floor') {
    let score = 0;
    const reasons = [];

    // HARD SUITABILITY CHECKS:
    // A. Wall vs Floor application
    if (targetSurfaceType === 'floor') {
      if (!product.application.includes('floor') && !product.application.includes('floor-dry')) {
        return { score: -999, reasons }; // Cannot be used on floor!
      }
      // If wet floor, reject R9 / glossy mirror slippery tiles
      if (isWetFloor) {
        if (product.slipRating === 'R9' || product.finish.includes('Mirror') || product.finish.includes('High Gloss')) {
          return { score: -999, reasons }; // Safety violation for wet floor
        }
        if (product.slipRating === 'R10' || product.slipRating === 'R11') {
          score += 35;
          reasons.push(`Certified ${product.slipRating} anti-skid safety for wet floor areas`);
        }
      }
    }

    if (isOutdoor) {
      if (product.slipRating !== 'R11' && product.category !== 'Full Body Vitrified') {
        return { score: -999, reasons }; // Must be outdoor rated
      }
      score += 30;
      reasons.push('Heavy-duty all-weather vitrified construction');
    }

    // B. Space suitability check
    if (product.spaces && product.spaces.includes(space)) {
      score += 20;
    }

    // C. Mood alignment
    if (mood !== 'help-me-choose' && product.mood && product.mood.includes(mood)) {
      score += 25;
      reasons.push(`Embodies the ${mood.replace('-', ' ')} visual atmosphere you selected`);
    }

    // D. Surface preference
    if (surface !== 'help-me-choose') {
      const surfaceMap = {
        'marble': 'Marble',
        'stone': 'Stone',
        'wood': 'Wood',
        'concrete': 'Concrete',
        'plain': 'Plain'
      };
      if (product.surface === surfaceMap[surface]) {
        score += 30;
        reasons.push(`Features the ${surfaceMap[surface]}-inspired texture you requested`);
      }
    }

    // E. Color palette match
    if (colors && colors.length > 0 && !colors.includes('open-suggestions')) {
      const colorMap = {
        'white-ivory': 'White',
        'beige-warm': 'Beige',
        'grey-cool': 'Grey',
        'earthy-tones': 'Brown',
        'dark-dramatic': 'Black'
      };
      const matchedColor = colors.some(c => colorMap[c] === product.color);
      if (matchedColor) {
        score += 25;
        reasons.push(`Matches your preferred ${product.color.toLowerCase()} palette`);
      }
    }

    // F. Natural Light & Room Size compensation
    if (roomSize === 'small' || naturalLight === 'limited') {
      if (product.color === 'White' || product.color === 'Beige') {
        score += 15;
        reasons.push('Lighter tone helps open up the visual boundaries and bounce available light');
      }
    } else if (roomSize === 'large' && naturalLight === 'plenty') {
      if (product.size.includes('119 x 240') || product.size.includes('80 x 160')) {
        score += 15;
        reasons.push('Grand slab format complements spacious architectural proportions');
      }
    }

    // G. Preferred Finish / Size
    if (preferredFinish === 'matt' && product.finish.toLowerCase().includes('matt')) {
      score += 10;
    } else if (preferredFinish === 'glossy' && product.finish.toLowerCase().includes('gloss')) {
      score += 10;
    }

    if (preferredSize === 'large-format' && product.size.includes('240')) {
      score += 10;
    } else if (preferredSize === 'standard' && product.size.includes('120')) {
      score += 10;
    }

    return { score, reasons };
  }

  // Generate Single Product or Complete Wall/Floor Combinations
  const results = [];

  if (application === 'both') {
    // Generate 3 curated pairings (Strongest Match, Coordinated/Harmonious Alternative, Expressive Contrast Alternative)
    
    // 1. STRONGEST MATCH PAIRING:
    let bestFloorCandidate = null;
    let bestWallCandidate = null;

    // Rank all products for floor
    const floorScored = QUIZ_CATALOG_DATA.map(p => ({
      product: p,
      ...scoreProduct(p, 'floor')
    })).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

    // Rank all products for wall
    const wallScored = QUIZ_CATALOG_DATA.map(p => ({
      product: p,
      ...scoreProduct(p, 'wall')
    })).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

    bestFloorCandidate = floorScored[0] || { product: getQuizProduct('lithico-beige'), reasons: ['Anti-skid floor safety'] };
    
    // Choose wall tile based on coordination answer:
    if (coordination === 'coordinated') {
      // Find wall from same color family or same collection
      bestWallCandidate = wallScored.find(w => w.product.color === bestFloorCandidate.product.color) || wallScored[0];
    } else {
      // Contrast: e.g. lighter wall with warm/deep floor or complementary vein
      bestWallCandidate = wallScored.find(w => w.product.id !== bestFloorCandidate.product.id) || wallScored[0];
    }

    // Build Match 1
    results.push({
      id: 'match-1',
      title: 'Option 1: Strongest Direction',
      badge: 'Best Tailored Match',
      summary: `A ${bestFloorCandidate.product.surface.toLowerCase()}-and-${bestWallCandidate.product.surface.toLowerCase()} combination pairing a practical ${bestFloorCandidate.product.finish.toLowerCase()} floor with a lighter ${bestWallCandidate.product.finish.toLowerCase()} wall tile for your ${space.replace('-', ' ')}.`,
      whyFits: `Selected as your top recommendation because the floor tile delivers certified ${bestFloorCandidate.product.slipRating} grip for everyday safety, while the ${bestWallCandidate.product.name} wall expands the room's height and light.`,
      floorTile: bestFloorCandidate.product,
      wallTile: bestWallCandidate.product,
      accentTile: (mood === 'bold-expressive' || space === 'bathroom') ? getQuizProduct('onyx-verde') : null,
      paletteSwatches: [
        bestFloorCandidate.product.colorHex,
        bestWallCandidate.product.colorHex,
        '#E2E8F0',
        '#A68740'
      ],
      reasons: [...bestFloorCandidate.reasons, ...bestWallCandidate.reasons].slice(0, 4)
    });

    // Build Match 2: Harmonious / Natural alternative
    const altFloor1 = floorScored[1] ? floorScored[1].product : getQuizProduct('rovere-natural-oak');
    const altWall1 = (altFloor1.id === 'rovere-natural-oak') ? getQuizProduct('satin-pure-ivory') : getQuizProduct('calcuta-imperial-a');
    results.push({
      id: 'match-2',
      title: 'Option 2: Warm Natural Harmony',
      badge: 'Balanced Natural Palette',
      summary: `A tranquil combination pairing ${altFloor1.name} with ${altWall1.name} to maximize daylight reflection with tactile softness.`,
      whyFits: `Combines authentic ${altFloor1.surface.toLowerCase()} textures underfoot with soft satin wall reflections, creating a cozy and low-maintenance retreat.`,
      floorTile: altFloor1,
      wallTile: altWall1,
      accentTile: null,
      paletteSwatches: [altFloor1.colorHex, altWall1.colorHex, '#F1F5F9', '#D4C3A3'],
      reasons: [
        'Tactile slip resistance hides everyday dust and moisture gracefully',
        'Lighter vertical walls draw daylight deep into interior room corners'
      ]
    });

    // Build Match 3: Modern Architectural Contrast
    const altFloor2 = getQuizProduct('terrazzo-grigio');
    const altWall2 = getQuizProduct('statuario-white');
    results.push({
      id: 'match-3',
      title: 'Option 3: Modern Architectural Contrast',
      badge: 'Contemporary Contrast',
      summary: `An architectural pairing uniting ${altFloor2.name} Venetian terrazzo with ${altWall2.name} Carrara marble slabs.`,
      whyFits: `Delivers a striking designer contrast between rich terrazzo stone texture on the floor and smooth vertical marble veining on feature walls.`,
      floorTile: altFloor2,
      wallTile: altWall2,
      accentTile: getQuizProduct('marquina-black'),
      paletteSwatches: [altFloor2.colorHex, altWall2.colorHex, '#1F2421', '#9CA3AF'],
      reasons: [
        'R11 textured terrazzo floor delivers maximum slip resilience and hides footprints',
        'Glossy marble walls reflect ambient illumination for grand visual scale'
      ]
    });

  } else {
    // Single Surface (Floor only OR Walls only)
    const targetSurface = application === 'walls' ? 'wall' : 'floor';
    const ranked = QUIZ_CATALOG_DATA.map(p => ({
      product: p,
      ...scoreProduct(p, targetSurface)
    })).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

    const top1 = ranked[0] || { product: getQuizProduct('lithico-beige'), reasons: ['Balanced residential durability'] };
    const top2 = ranked[1] || { product: getQuizProduct('calcuta-imperial-a'), reasons: ['Refined timeless aesthetic'] };
    const top3 = ranked[2] || { product: getQuizProduct('terrazzo-grigio'), reasons: ['High wear resistance'] };

    results.push({
      id: 'match-1',
      title: 'Option 1: Strongest Direction',
      badge: 'Best Tailored Match',
      summary: `A ${top1.product.surface.toLowerCase()} ${targetSurface} surface in ${top1.product.name} with certified ${top1.product.slipRating} rating for your ${space.replace('-', ' ')}.`,
      whyFits: top1.product.whyFits,
      floorTile: targetSurface === 'floor' ? top1.product : null,
      wallTile: targetSurface === 'wall' ? top1.product : null,
      mainTile: top1.product,
      paletteSwatches: [top1.product.colorHex, '#E2E8F0', '#F8FAFC', '#15508B'],
      reasons: top1.reasons.slice(0, 3)
    });

    results.push({
      id: 'match-2',
      title: 'Option 2: Warm Natural Alternative',
      badge: 'Natural Harmony',
      summary: `A serene ${top2.product.surface.toLowerCase()} direction in ${top2.product.name} delivering refined luxury with everyday practicality.`,
      whyFits: top2.product.whyFits,
      floorTile: targetSurface === 'floor' ? top2.product : null,
      wallTile: targetSurface === 'wall' ? top2.product : null,
      mainTile: top2.product,
      paletteSwatches: [top2.product.colorHex, '#E5D7C3', '#FFFFFF', '#A68740'],
      reasons: top2.reasons.slice(0, 3)
    });

    results.push({
      id: 'match-3',
      title: 'Option 3: Modern Architectural Character',
      badge: 'Understated Modern',
      summary: `An enduring ${top3.product.surface.toLowerCase()} surface in ${top3.product.name} engineered for exceptional durability.`,
      whyFits: top3.product.whyFits,
      floorTile: targetSurface === 'floor' ? top3.product : null,
      wallTile: targetSurface === 'wall' ? top3.product : null,
      mainTile: top3.product,
      paletteSwatches: [top3.product.colorHex, '#9E9E9E', '#2B2B2B', '#C2CCD6'],
      reasons: top3.reasons.slice(0, 3)
    });
  }

  return results;
}
