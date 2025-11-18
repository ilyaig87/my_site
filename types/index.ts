// Template Types
export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: TemplateCategory;
  suitableFor: string[];
  features: TemplateFeature[];
  colors: ColorScheme;
  typography: Typography;
  previewImage: string;
  mobilePreviewImage?: string;
  tabletPreviewImage?: string;
  demoUrl?: string;
  tags: string[];
}

export type TemplateCategory =
  | 'business'
  | 'landing'
  | 'portfolio'
  | 'medical'
  | 'fitness'
  | 'restaurant'
  | 'professional'
  | 'creative'
  | 'ecommerce';

export interface TemplateFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  headingFont: string;
  bodyFont: string;
  style: 'modern' | 'classic' | 'playful' | 'professional';
}

// Site Content Types
export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  whyChooseMe: Benefit[];
  process: ProcessStep[];
  contact: ContactInfo;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
}

export interface AboutContent {
  title: string;
  description: string;
  experience: string;
  technologies: string[];
  highlights: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  priceRange?: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address?: string;
  socialMedia?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Testimonial (for future use)
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}
