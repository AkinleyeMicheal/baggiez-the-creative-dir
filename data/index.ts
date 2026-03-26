// ─────────────────────────────────────────────────────────────
// Static data — separated from component logic (Open/Closed)
// Components consume this data without needing modification
// when content changes.
// ─────────────────────────────────────────────────────────────

import type { HeroImage, Project, BTSItem, Testimonial, ClientId } from '../types';

export const HERO_IMAGES: HeroImage[] = [
  {
    src: '/images/image-with-glasses-1.png',
    alt: 'Neon city night',
  },
  {
      src: '/images/hero-img-3.jpg',
      alt: 'Film set lighting',
    },
    {
      src: '/images/hero-img-2.png',
    alt: 'Cinematic frame',
  },
  {
    src: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?q=80&w=1887&auto=format&fit=crop',
    alt: 'Urban movement',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 0,
    title: 'Midnight City',
    category: 'Music Video',
    year: '2024',
    role: 'Director / Edit',
    client: 'Davido Worldwide',
    tools: 'Arri Alexa Mini LF, DaVinci Resolve',
    desc: 'A neon-soaked visual journey exploring the pulse of Lagos nightlife intertwined with high-fashion aesthetics. Shot over three intense nights capturing raw, kinetic energy.',
    cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    gallery: [
      'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
    ],
  },
  {
    id: 1,
    title: 'Echoes',
    category: 'Short Film',
    year: '2023',
    role: 'Writer / Director',
    client: 'Independent',
    tools: 'RED Komodo, Premiere Pro',
    desc: 'A poignant narrative exploring themes of isolation and ancestral memory within the modern African diaspora. Premiered at selection of European independent film festivals.',
    cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
    videoUrl: 'https://vimeo.com/148751763',
    gallery: [
      'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=2073&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Aura',
    category: 'Commercial',
    year: '2023',
    role: 'Creative Director',
    client: 'Nike London',
    tools: '35mm Film, Custom Rigs',
    desc: 'A dynamic, movement-focused campaign highlighting the intersection of athletic performance and urban streetwear. Conceptualized to bridge London grit with global appeal.',
    cover: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?q=80&w=1887&auto=format&fit=crop',
    videoUrl: '',
    gallery: [
      'https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=2036&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'Onyx Nights',
    category: 'Event Visuals',
    year: '2022',
    role: 'Director / Color',
    client: 'Boiler Room',
    tools: 'Sony FX9, Resolume',
    desc: 'Immersive, live-reactive visual setups designed for underground electronic and afrobeats sets. A symphony of shadow and stark lighting.',
    cover: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    videoUrl: '',
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop',
    ],
  },
];

export const BTS_DATA: BTSItem[] = [
  {
    title: 'Arri Alexa Mini LF Setup',
    location: 'London Studio',
    img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
    desc: 'Rigging the primary A-Cam for the high-speed tracking shots required for the Midnight City opening sequence. The large format sensor gave us that crucial depth of field drop-off.',
    notes: 'Lenses: Signature Primes. Handled exclusively by 1st AC Markus.',
  },
  {
    title: 'Blocking Scene 4',
    location: 'On Location, Essex',
    img: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1974&auto=format&fit=crop',
    desc: 'Working closely with lead talent to nail the emotional beat before losing natural light. The wind added an unscripted intensity to the performance.',
    notes: 'Shoot time window: 45 minutes of golden hour. We got it on take 3.',
  },
  {
    title: 'Grade & Finish Session',
    location: 'Post-House, Soho',
    img: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
    desc: 'Finalizing the look for the Nike Aura campaign. Pushing the mid-tones into a cooler, metallic space while preserving natural skin tones for the athletes.',
    notes: 'Node structure pushed to limits. Print film emulation applied at timeline level.',
  },
  {
    title: 'Stage Prep',
    location: 'Lagos, Nigeria',
    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop',
    desc: 'Pre-lighting the massive soundstage for the pivotal concert scene. Managing over 50 extras and coordinating volumetric lighting cues.',
    notes: 'Haze machines running at 40%. Custom DMX profiles built on set.',
  },
];

export const TESTIMONIALS: Record<ClientId, Testimonial> = {
  sony: {
    text: '"Ezekiel brings an unparalleled cinematic eye to everything he touches. His ability to translate raw emotion into stunning visual sequences elevated our entire campaign."',
    name: 'Sarah Jenkins',
    role: 'EP, Sony Music UK',
  },
  nike: {
    text: '"Working with Baggiez is seamless. The attention to detail from pre-production through to the final color grade is meticulous. A true visionary director."',
    name: 'Marcus Thorne',
    role: 'Creative Dir, Nike',
  },
  native: {
    text: '"His eye for capturing the raw essence of Afro-culture and translating it into a globally resonant, premium format is unmatched right now."',
    name: 'Seni Saraki',
    role: 'Co-Founder, The Native',
  },
  vogue: {
    text: '"A masterclass in visual storytelling. Ezekiel understands light and movement in a way that turns standard fashion film into compelling cinema."',
    name: 'Elena Rossi',
    role: 'Visual Editor, Vogue Italia',
  },
  boiler: {
    text: '"Baggiez completely redefined how we capture the energy of the room. The aesthetic is grimy yet undeniably high-end."',
    name: 'James K.',
    role: 'Head of Video, Boiler Room',
  },
};

export const CLIENT_TABS: { id: ClientId; label: string; className: string }[] = [
  { id: 'sony',   label: 'Sony Music',  className: 'font-medium' },
  { id: 'nike',   label: 'Nike',        className: 'font-medium italic font-serif' },
  { id: 'native', label: 'The Native',  className: 'font-normal' },
  { id: 'vogue',  label: 'Vogue',       className: 'font-light tracking-widest' },
  { id: 'boiler', label: 'BOILER ROOM', className: 'font-light' },
];

export const NAV_LINKS = [
  { href: '#about',    label: 'About Me?' },
  { href: '#services', label: 'Services' },
  { href: '#work',     label: 'Work' },
  { href: '#bts',      label: 'BTS' },
  { href: '#clients',  label: 'Clients' },
];

export const SERVICES = [
  {
    title: 'Creative Direction',
    body: 'Developing the overarching vision and aesthetic for campaigns, music videos, and brand films. From initial concept generation and mood boarding to final execution, ensuring a cohesive and powerful visual language.',
    delay: 0.1,
  },
  {
    title: 'Directing & Production',
    body: 'Leading sets with precision and artistic intent. Managing talent, coordinating with cinematography departments, and overseeing the entire physical production process to capture compelling, cinematic footage.',
    delay: 0.2,
  },
  {
    title: 'Post-Production',
    body: 'Refining the narrative through expert offline editing and elevating the visual impact with high-end color grading. Delivering a finalized product that meets premium industry standards.',
    delay: 0.3,
  },
];