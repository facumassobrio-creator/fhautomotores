import { WHATSAPP_CONTACT_NUMBER } from '@/lib/whatsapp';

const DEFAULT_SITE_URL = '';
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

export interface BusinessHour {
  label: string;
  value: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  legalName?: string;
  commercialName?: string;
}

export interface ContactConfig {
  whatsapp: string;
  whatsappDisplay: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  businessHours: BusinessHour[];
}

export interface SocialConfig {
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

export interface SeoConfig {
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  themeColor: string;
  twitterCard: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
  homeTitle: string;
  homeDescription: string;
  vehiclesMetaDescription: string;
  vehiclesSocialDescription: string;
  vehicleNotFoundTitle: string;
  vehicleMetaDescriptionTemplate: string;
  adminTitle: string;
  adminDescription: string;
}

export interface AssetsConfig {
  logo: {
    primary: string;
    secondary?: string;
  };
  logoAlt: string;
  favicon: {
    icon: string;
    shortcut: string;
    apple: string;
  };
  ogImage: string;
  hero: string;
  about: string;
  appIcons: Array<{
    src: string;
    sizes: string;
    type: string;
  }>;
  placeholders: {
    hero: string;
    about: string;
    ogImage: string;
  };
}

export interface MessagesConfig {
  floatingWhatsappMessage: string;
  floatingWhatsappAriaLabel: string;
  whatsappCtaLabel: string;
  siteWhatsappMessage: string;
  vehicleInquiryTemplate: string;
  vehicleInquiryShortTemplate: string;
}

export interface FooterConfig {
  creditText: string;
  creditHighlightText?: string;
  showAgencyCredit: boolean;
  scheduleLabel: string;
  locationLabel: string;
  contactLabel: string;
  socialLabel: string;
  bottomText: string;
  whatsappLabel: string;
  phoneLabel: string;
  emailLabel: string;
  instagramLabel: string;
}

export interface AdminNavigationConfig {
  label: string;
  href: string;
}

export interface ThemeConfig {
  colors: {
    background: string;
    foreground: string;
    brandPrimary: string;
    brandPrimaryDark: string;
    brandSecondary: string;
  };
  surfaces: {
    base: string;
    elevated: string;
    muted: string;
  };
  shadows: {
    brandGlow: string;
    floatingAction: string;
  };
  gradients: {
    pageBackground: string;
    cardBackground: string;
  };
  overlays: {
    heroAccent: string;
    heroDark: string;
  };
}

export interface HomeHeroConfig {
  badge: string;
  titleLines: [string, string];
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  trustBullets: string[];
}

export interface HomeIntroConfig {
  title: string;
  description: string;
  emptyState: string;
}

export interface HomeStatConfig {
  label: string;
  value: string;
}

export type BenefitIconKey = 'shield' | 'search' | 'document';

export interface HomeBenefitConfig {
  iconKey: BenefitIconKey;
  title: string;
  description: string;
}

export interface HomeAboutConfig {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  stats: HomeStatConfig[];
  imageAlt: string;
  imageCaption: string;
}

export interface HomeContactConfig {
  eyebrow: string;
  title: string;
}

export interface HomePermutasConfig {
  title: string;
  description: string;
  ctaLabel: string;
}

export interface HomeLocationConfig {
  eyebrow: string;
  title: string;
  description: string;
  mapCaption: string;
  mapTitle: string;
  mapUrl: string;
  mapEmbedUrl: string;
}

export interface HomeVehicleCardConfig {
  premiumBadge: string;
  noImageLabel: string;
}

export interface CatalogListConfig {
  eyebrow: string;
  title: string;
  description: string;
  emptyState: string;
}

export interface CatalogCardConfig {
  yearLabel: string;
  viewMoreLabel: string;
  inquiryLabel: string;
}

export interface CatalogDetailLabelsConfig {
  yearChipPrefix: string;
  detailsTitle: string;
  brandLabel: string;
  modelLabel: string;
  yearLabel: string;
  variantLabel: string;
  mileageLabel: string;
  fuelLabel: string;
  transmissionLabel: string;
  colorLabel: string;
  descriptionTitle: string;
  emptyDescription: string;
  inquiryCtaLabel: string;
}

export interface CatalogConfig {
  list: CatalogListConfig;
  card: CatalogCardConfig;
  detail: CatalogDetailLabelsConfig;
}

export interface TrackingConfig {
  googleAnalyticsId: string;
  metaPixelId: string;
}

export interface HomeConfig {
  hero: HomeHeroConfig;
  inventoryIntro: HomeIntroConfig;
  about: HomeAboutConfig;
  benefits: HomeBenefitConfig[];
  contact: HomeContactConfig;
  permutas: HomePermutasConfig;
  location: HomeLocationConfig;
  vehicleCard: HomeVehicleCardConfig;
}

export interface SiteConfig {
  brand: BrandConfig;
  contact: ContactConfig;
  social: SocialConfig;
  seo: SeoConfig;
  tracking: TrackingConfig;
  navigation: {
    items: NavigationItem[];
    admin: AdminNavigationConfig;
  };
  assets: AssetsConfig;
  messages: MessagesConfig;
  footer: FooterConfig;
  theme: ThemeConfig;
  home: HomeConfig;
  catalog: CatalogConfig;
}

export const siteConfig = {
  brand: {
    name: 'FH Automotores',
    shortName: 'FH',
    tagline: 'Tu próximo auto está acá',
    legalName: 'FH Automotores',
    commercialName: 'FH Automotores',
  },
  contact: {
    whatsapp: WHATSAPP_CONTACT_NUMBER,
    whatsappDisplay: '+54 3782 444888',
    phone: '+54 11 4000 0000',
    email: 'info@fhautomotores.com',
    addressLine: 'Chacabuco 9921',
    city: 'Corrientes Capital',
    businessHours: [
      { label: 'Lunes a Viernes', value: '10:00 a 13:00 y 15:00 a 19:00' },
      { label: 'Sábados', value: '10:00 a 14:00' },
    ],
  },
  social: {
    instagramHandle: 'fhautomotores',
    instagramUrl: 'https://instagram.com/fhautomotores',
    facebookUrl: '',
    tiktokUrl: '',
    youtubeUrl: '',
    linkedinUrl: '',
  },
  seo: {
    siteUrl,
    defaultTitle: 'FH Automotores',
    titleTemplate: '%s | {{brand}}',
    defaultDescription: 'Concesionaria FH Automotores con vehículos seleccionados y atención personalizada.',
    themeColor: '#121214',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterCreator: '',
    homeTitle: 'FH Automotores - Venta de Vehículos',
    homeDescription: 'Descubre nuestra selección de vehículos de calidad en FH Automotores. Encuentra el auto perfecto para ti.',
    vehiclesMetaDescription: 'Explorá todo el stock disponible de FH Automotores.',
    vehiclesSocialDescription: 'Listado completo de vehículos publicados.',
    vehicleNotFoundTitle: 'Vehículo no encontrado',
    vehicleMetaDescriptionTemplate: 'Vehículo {{brand}} {{model}} {{year}} disponible en {{dealerName}}.',
    adminTitle: 'Admin | FH Automotores',
    adminDescription: 'Panel de administración de FH Automotores',
  },
  tracking: {
    googleAnalyticsId: '',
    metaPixelId: '',
  },
  navigation: {
    items: [
      { label: 'Home', href: '/#home' },
      { label: 'Vehículos', href: '/vehicles' },
      { label: 'Nosotros', href: '/#nosotros' },
      { label: 'Tomamos tu auto', href: '/#permutas' },
      { label: 'Contacto', href: '/#contacto' },
      { label: 'Ubicación', href: '/#ubicacion' },
    ],
    admin: {
      label: 'Admin',
      href: '/admin',
    },
  },
  assets: {
    logo: {
      primary: '/logo.png',
      secondary: '',
    },
    logoAlt: 'FH Automotores',
    favicon: {
      icon: '/flaicon.png',
      shortcut: '/flaicon.png',
      apple: '/flaicon.png',
    },
    ogImage: '/og-fhautomotores.jpg',
    hero: '/hero.jpg', // Placeholder: reemplazar por imagen definitiva del hero
    about: '/nosotros.jpg',
    appIcons: [
      {
        src: '/globe.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    placeholders: {
      hero: '/hero-placeholder.svg',
      about: '/about-placeholder.svg',
      ogImage: '/og-fhautomotores.jpg',
    },
  },
  messages: {
    floatingWhatsappMessage: 'Hola, quiero consultar por un vehículo',
    floatingWhatsappAriaLabel: 'Contactar por WhatsApp',
    whatsappCtaLabel: 'Contactar por WhatsApp',
    siteWhatsappMessage: 'Hola, estoy interesado en un vehículo. ¿Podrían brindarme más información?',
    vehicleInquiryTemplate: 'Hola, estoy interesado en el {{brand}} {{model}} {{year}}. ¿Podrías darme más información?',
    vehicleInquiryShortTemplate: 'Hola, estoy interesado en el vehículo {{vehicleName}}. ¿Sigue disponible?',
  },
  footer: {
    creditText: 'Desarrollado por',
    creditHighlightText: 'FGM Digital',
    showAgencyCredit: true,
    scheduleLabel: 'Horarios',
    locationLabel: 'Ubicación',
    contactLabel: 'Contacto',
    socialLabel: 'Redes',
    bottomText: 'fhautomotores',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Teléfono',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
  },
  theme: {
    colors: {
      background: '#121214',
      foreground: '#f5f5f5',
      brandPrimary: '#1E3A8A',
      brandPrimaryDark: '#1E40AF',
      brandSecondary: '#000000',
    },
    surfaces: {
      base: '#101010',
      elevated: '#1b1b1b',
      muted: '#0a0a0a',
    },
    shadows: {
      brandGlow: '0 20px 50px -20px rgba(30, 58, 138, 1)',
      floatingAction: '0 12px 28px -14px rgba(0,0,0,0.9), 0 8px 20px -12px rgba(30,58,138,0.75)',
    },
    gradients: {
      pageBackground: 'linear-gradient(to bottom, #121214 0%, #0f0f10 50%, #0a0a0a 100%)',
      cardBackground: 'radial-gradient(circle at top, #202020 0%, #0a0a0a 55%)',
    },
    overlays: {
      heroAccent: 'radial-gradient(130% 95% at 18% 12%, rgba(30,58,138,0.2) 0%, rgba(30,58,138,0.09) 34%, rgba(0,0,0,0) 65%)',
      heroDark: 'linear-gradient(to right, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.8) 100%)',
    },
  },
  home: {
    hero: {
      badge: 'Stock Disponible',
      titleLines: ['FH Automotores', 'Tu próximo auto está acá'],
      subtitle: 'Vehículos seleccionados, atención personalizada y las mejores oportunidades del mercado.',
      primaryCtaLabel: 'Ver Vehículos',
      secondaryCtaLabel: 'Contactar por WhatsApp',
      trustBullets: ['Financiación Disponible', 'Garantía', 'Entrega Rápida'],
    },
    inventoryIntro: {
      title: 'Vehículos Disponibles',
      description: 'Explora nuestro stock de vehículos. Cada unidad fue seleccionada para ofrecerte confianza y buen rendimiento.',
      emptyState: 'No hay vehículos disponibles en este momento.',
    },
    about: {
      eyebrow: 'Nuestra Concesionaria',
      title: 'Nosotros',
      paragraphs: [
        'En FH Automotores elegimos vehículos en muy buen estado para que compres con tranquilidad.',
        'Te acompañamos en todo el proceso con atención cercana y asesoramiento claro.',
      ],
      stats: [
        { value: '+10 años', label: 'Experiencia en el rubro automotor' },
        { value: 'Control 360°', label: 'Revisión integral previa' },
      ],
      imageAlt: 'Showroom premium de FH Automotores',
      imageCaption: '',
    },
    benefits: [
      {
        iconKey: 'shield' as const,
        title: 'Garantía',
        description: 'Cobertura para que compres con más seguridad y tranquilidad.',
      },
      {
        iconKey: 'search' as const,
        title: 'Calidad',
        description: 'Seleccionamos cada vehículo para ofrecerte calidad y confianza.',
      },
      {
        iconKey: 'document' as const,
        title: 'Financiamiento',
        description: 'Opciones de financiación para que puedas concretar tu próximo vehículo.',
      },
    ],
    vehicleCard: {
      premiumBadge: 'Destacado',
      noImageLabel: 'Sin imagen',
    },
    contact: {
      eyebrow: 'Atención Personalizada',
      title: 'Contacto',
    },
    permutas: {
      title: 'Tomamos tu auto',
      description: 'Recibimos tu vehículo como parte de pago o lo gestionamos en consignación.',
      ctaLabel: 'Consultar ahora',
    },
    location: {
      eyebrow: 'Visitanos',
      title: 'Ubicación',
      description: 'Chacabuco 9921, Corrientes Capital',
      mapCaption: '',
      mapTitle: 'Mapa FH Automotores',
      mapUrl: 'https://www.google.com/maps/place/Fh+Automotores/@-27.4696898,-58.8117738,17z/data=!4m6!3m5!1s0x94456b696f81afed:0x6a4adffab7508ada!8m2!3d-27.4707798!4d-58.8125033!16s%2Fg%2F11k5lh8brz?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D',
      mapEmbedUrl: 'https://www.google.com/maps?q=-27.4707798,-58.8125033&z=17&output=embed',
    },
  },
  catalog: {
    list: {
      eyebrow: 'Stock disponible',
      title: 'Vehículos',
      description: 'Selección completa de unidades publicadas. Consultanos por financiación, permutas y disponibilidad en tiempo real.',
      emptyState: 'No hay vehículos disponibles en este momento.',
    },
    card: {
      yearLabel: 'Año',
      viewMoreLabel: 'Ver más',
      inquiryLabel: 'Consultar',
    },
    detail: {
      yearChipPrefix: 'Año',
      detailsTitle: 'Detalles',
      brandLabel: 'Marca',
      modelLabel: 'Modelo',
      yearLabel: 'Año',
      variantLabel: 'Versión',
      mileageLabel: 'Kilometraje',
      fuelLabel: 'Combustible',
      transmissionLabel: 'Transmisión',
      colorLabel: 'Color',
      descriptionTitle: 'Descripción',
      emptyDescription: 'Sin descripción disponible.',
      inquiryCtaLabel: 'Consultar por esta unidad',
    },
  },
} satisfies SiteConfig;

export interface VehicleInquiryParams {
  brand: string;
  model: string;
  year: number | string;
}

export function buildVehicleInquiryMessage({ brand, model, year }: VehicleInquiryParams) {
  return siteConfig.messages.vehicleInquiryTemplate
    .replace('{{brand}}', brand)
    .replace('{{model}}', model)
    .replace('{{year}}', String(year));
}

export interface VehicleSeoDescriptionParams {
  brand: string;
  model: string;
  year: number | string;
}

export function buildVehicleSeoDescription({ brand, model, year }: VehicleSeoDescriptionParams) {
  return siteConfig.seo.vehicleMetaDescriptionTemplate
    .replace('{{brand}}', brand)
    .replace('{{model}}', model)
    .replace('{{year}}', String(year))
    .replace('{{dealerName}}', siteConfig.brand.name);
}

export function buildSeoTitle(title: string) {
  return siteConfig.seo.titleTemplate
    .replace('%s', title)
    .replace('{{brand}}', siteConfig.brand.name);
}

export function buildCanonicalUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.seo.siteUrl}${normalizedPath}`;
}

export function getDefaultSeoImage() {
  return resolveAssetPath(siteConfig.assets.ogImage, siteConfig.assets.placeholders.ogImage);
}

export function getContactAddress() {
  return `${siteConfig.contact.addressLine}, ${siteConfig.contact.city}`;
}

export function resolveAssetPath(assetPath: string | undefined, fallbackPath: string) {
  const normalizedPath = assetPath?.trim();
  if (!normalizedPath) {
    return fallbackPath;
  }

  return normalizedPath;
}