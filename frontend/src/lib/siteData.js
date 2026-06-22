/* ============================================================
   C.S. SINGHI & ASSOCIATES — Content source-of-truth
   Every block below is placeholder-editable for the client.
   ============================================================ */

export const ASSETS = {
  hero: "https://customer-assets.emergentagent.com/job_himalayan/artifacts/09vnbnxh_hero%20element.png",
  logo: "https://customer-assets.emergentagent.com/job_6eb074fe-1740-4003-b10a-e49bd9643602/artifacts/17tvwskj_logo.png",
  logoIcon: "https://customer-assets.emergentagent.com/job_himalayan/artifacts/vc3ooygl_image.png",
  logoFull: "https://customer-assets.emergentagent.com/job_himalayan/artifacts/jl0u46ay_image.png",
};

/* CONTENT: Architectural photos used for collage + project cards.
   Swap with admin building/ photos when available. */
export const STOCK_PHOTOS = {
  collage1:
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80&auto=format&fit=crop",
  collage2:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  collage3:
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80&auto=format&fit=crop",
  himalayanHeights:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop",
  skylineResidency:
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
  skyGangtok:
    "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&q=80&auto=format&fit=crop",
};

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];

export const VALUES = [
  {
    name: "Radical Transparency",
    desc: "Open books on material costs and structural audits — clients have full visibility into every rupee and every rod of steel.",
  },
  {
    name: "Statutory Integrity",
    desc: "Twenty-five years of unblemished practice. Strict adherence to COA norms and local bye-laws — zero legal liabilities for clients.",
  },
  {
    name: "Contextual Responsibility",
    desc: "Every design respects the fragile Himalayan ecosystem — prioritising slope stability and indigenous materials.",
  },
  {
    name: "Community Trust",
    desc: "Our projects are designed to contribute positively to the urban fabric of Gangtok, and to the lives of the people who inherit them.",
  },
];

export const STATS = [
  { value: 25, suffix: "", label: "Years of Practice" },
  { value: 12, suffix: "+", label: "Projects Developed" },
  { value: 3, suffix: "", label: "Offices Across India" },
  { value: 100, suffix: "%", label: "Turnkey Delivery" },
];

export const PROBONO = [
  {
    name: "Enchey Gumpa",
    location: "Gangtok · Sikkim",
    desc: "One of Gangtok's oldest monasteries — a sacred seat of the Nyingma order. We contributed complete architectural design pro bono, honouring spiritual heritage while ensuring structural resilience.",
  },
  {
    name: "Anjuman Islam Mosque",
    location: "Gangtok · Sikkim",
    desc: "Serving Gangtok's Muslim community for generations. Full architectural services provided at no cost — blending traditional Islamic design principles with locally appropriate construction.",
  },
  {
    name: "Tamang Gumpa",
    location: "Ranka · East Sikkim",
    desc: "A spiritual anchor for the local Tamang community. Designed free of charge — respecting the delicate ecology of the region and the cultural traditions of its people.",
  },
];

export const SERVICES = [
  {
    num: "01",
    name: "Architectural & Interior Design",
    desc: "Complete turnkey execution — from blueprint to final brick, materials and labour included.",
  },
  {
    num: "02",
    name: "Turnkey Projects",
    desc: "Strategic land sourcing and topographic planning for high-value commercial and residential developments.",
  },
  {
    num: "03",
    name: "Property Valuations",
    desc: "Exclusive listings and property management for Gangtok's most sought-after addresses.",
  },
  {
    num: "04",
    name: "Real Estate",
    desc: "Curated portfolio of premium properties — sourced, vetted, and represented end-to-end.",
  },
  {
    num: "05",
    name: "Commercial Development",
    desc: "Mixed-use, retail, and hospitality — engineered to thrive in the Himalayan context.",
  },
  {
    num: "06",
    name: "Site Evaluation & Consultation",
    desc: "Geotechnical, climatic, and statutory analysis before the first line is drawn.",
  },
];

export const PROJECTS = [
  {
    id: "himalayan-heights",
    index: "01",
    title: "The Himalayan Heights",
    location: "Namchi, Sikkim",
    year: "2024",
    status: "SOLD OUT",
    statusVariant: "wood",
    price: "₹85L – ₹1.2 Cr",
    area: "1,800 sq ft",
    config: "45 Villas",
    architect: "C.S. Singhi",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format&fit=crop",
    description:
      "Community living integrated with traditional Sikkimese architecture. Local stone and sustainable timber. Sold out within three months of launch.",
    amenities: [
      "Terraced gardens with native flora",
      "Rainwater harvesting per unit",
      "Central clubhouse with view decks",
      "Stone-faced exteriors, indigenous timber",
    ],
  },
  {
    id: "skyline-residency",
    index: "02",
    title: "The Skyline Residency",
    location: "Gangtok, Sikkim",
    year: "2025",
    status: "FOR SALE",
    statusVariant: "moss",
    price: "₹1.5 Cr – ₹3.2 Cr",
    area: "2,400 sq ft",
    config: "3 & 4 BHK",
    architect: "C.S. Singhi",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
    description:
      "Seismic Zone IV compliant structure with a heated indoor swimming pool, smart home automation, and a panoramic view of Kanchenjunga.",
    amenities: [
      "Private terraces for every apartment",
      "Heated indoor swimming pool",
      "Smart home automation",
      "Seismic Zone IV compliant structure",
    ],
  },
  {
    id: "sky-gangtok",
    index: "03",
    title: "Sky Gangtok",
    location: "Gangtok, Sikkim",
    year: "2026",
    status: "UNDER CONSTRUCTION",
    statusVariant: "construction",
    price: "₹2.1 Cr onwards",
    area: "3,200 sq ft",
    config: "4 BHK Duplex",
    architect: "C.S. Singhi",
    image:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&q=80&auto=format&fit=crop",
    description:
      "A steel-frame exoskeleton inspired by Sikkim's pine forests. The tallest residential structure in the region — with an unhindered 360° Himalayan panorama.",
    amenities: [
      "Rooftop infinity-edge pool",
      "Private elevator access for penthouses",
      "Automated climate control",
      "24/7 concierge service",
    ],
  },
];

export const TEAM_LEADS = {
  principal: {
    eyebrow: "Founding Principal",
    name: "Chhatra S. Singhi",
    role: "Proprietor · Architect",
    initials: "CS",
    quote:
      "True architecture is measured not just in structures, but in the ethical foundation upon which they are built.",
  },
  architect: {
    eyebrow: "Architect",
    name: "Sakshi Singhi",
    role: "Architect · Studio Lead",
    initials: "SS",
    quote:
      "Every building we draw is a quiet promise — to the land that holds it, and the family that will live inside.",
  },
};

export const TEAM_GRID = [
  { name: "Abhiraj Sharma", role: "Architect", initials: "AS" },
  { name: "Yorika Moktan", role: "Architect", initials: "YM" },
  { name: "Chelsea Palmo Bhutia", role: "Architect", initials: "CB" },
  { name: "Rikzum Rinchen Bhutia", role: "Architect", initials: "RB" },
  { name: "Jessica Tiruwa", role: "Civil Engineer", initials: "JT" },
  { name: "Tenzing Palkye Bhutia", role: "Civil Engineer", initials: "TB" },
];

export const SUPPORT_TEAM = [
  { name: "Prakash Subba", role: "Site Inspector" },
  { name: "Shalini Upadhay", role: "Accountant" },
  { name: "Aruna Chettri", role: "Assistant Accountant" },
  { name: "Puspa Nirola", role: "Receptionist" },
];

export const JOBS = [
  {
    title: "Junior Architect",
    type: "Full-Time",
    location: "Gangtok, Sikkim",
    responsibilities: [
      "Develop architectural drawings and technical documentation",
      "Collaborate on design concepts from brief to construction",
      "Conduct site visits and coordinate with contractors",
    ],
    requirements: [
      "B.Arch or M.Arch degree",
      "Proficiency in AutoCAD, Revit, or ArchiCAD",
      "Strong portfolio demonstrating spatial thinking",
    ],
  },
  {
    title: "Senior Interior Designer",
    type: "Full-Time",
    location: "Gangtok, Sikkim",
    responsibilities: [
      "Lead end-to-end interior design projects",
      "Develop material palettes, furniture specs, and lighting plans",
      "Client presentations and design iteration",
    ],
    requirements: [
      "5+ years of interior design experience",
      "Mastery of SketchUp, 3ds Max, or equivalent",
      "Experience with high-end residential or hospitality",
    ],
  },
  {
    title: "Project Execution Manager",
    type: "Contract",
    location: "On-Site · Gangtok",
    responsibilities: [
      "Oversee on-site construction and quality compliance",
      "Coordinate between design team, contractors, and clients",
      "Track milestones, budgets, and material delivery",
    ],
    requirements: [
      "Civil engineering background preferred",
      "5+ years of site execution experience",
      "Strong communication and problem-solving",
    ],
  },
];

export const CONTACT = {
  address: "Lal Market Rd, Gangtok, Sikkim 737101, India",
  phone: "+91 98765 43210",
  email: "info@cssinghi.com",
  whatsapp: "+91 98765 43210",
};

/* CONTENT: About narrative paragraph (editable) */
export const ABOUT_BODY = `Founded in 2001 in Gangtok, Sikkim, C.S. Singhi & Associates has spent twenty-five years shaping the Himalayan skyline with integrity, innovation, and trust. From sacred monasteries to luxury residences, every project begins with a single commitment: architecture must serve the land, the people, and the generations that follow.`;
