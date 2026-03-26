// ─────────────────────────────────────────────────────────────
// Shared TypeScript types
// ─────────────────────────────────────────────────────────────

export interface HeroImage {
  src: string;
  alt: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  role: string;
  client: string;
  tools: string;
  desc: string;
  cover: string;
  videoUrl: string;
  gallery: string[];
}

export interface BTSItem {
  title: string;
  location: string;
  img: string;
  desc: string;
  notes: string;
}

export interface Testimonial {
  text: string;
  name: string;
  role: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  type: string;
  details: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export type ModalView = 'grid' | 'detail';

export type ClientId = 'sony' | 'nike' | 'native' | 'vogue' | 'boiler';