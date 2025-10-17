export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  event: string;
  details: string;
  image: string;
  imageLabel: string;
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface Photo {
  src: string;
  alt: string;
  span?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

export interface FormDataType {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  eventStartDate: string;
  eventStartHour: string;
  eventStartMinute: string;
  eventStartPeriod: string;
  eventType: string;
  numberOfGuests: string;
  howDidYouHear: string;
  message: string;
  robotCheck: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  theme: string;
  price: number;
  priceRange: string;
  image: string;
  sceneImage: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  popular: boolean;
}

export interface PhotoGalleryProps {
  galleryPhotos: Photo[];
}
export interface TeamMember {
  name: string;
  title: string;
  image: string;
}

export interface GPhoto {
  src: string;
  alt: string;
  category: string;
  size: 'large' | 'wide' | 'medium' | 'small';
}

export interface ImageItem {
  src: string;
  alt?: string;
}
export interface CTA {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | string;
}
export interface Stat {
  label: string;
  value: string;
}
export interface InfoItem {
  heading: string;
  body: string;
}
export interface SoftFadeInProps {
  children: React.ReactNode;
  delay?: number;
  immediate?: boolean;
}

export interface SplitTitleProps {
  text: string;
  immediate?: boolean;
}

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export interface Image {
  src: string;
  alt?: string;
}

export interface VideoItem {
  id: number;
  title: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
}

export interface LightboxProps {
  images: Image[];
  index: number;
  onClose: () => void;
}

export interface MarqueeProps {
  items?: string[];
}

export interface JourneyEvent {
  src: string;
  title: string;
  category: string;
  location?: string;
  href?: string;
}

export interface CartItem extends Product {
  quantity: number;
  rentalDays: number;
  addedAt: number;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  description: string;
}

export interface CartSummary {
  subtotal: number;
  multiDayDiscount: number;
  promoDiscount: number;
  tax: number;
  total: number;
}

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'FIRST10',
    discount: 10,
    type: 'percentage',
    description: '10% off your first order',
  },
  {
    code: 'WEEKEND20',
    discount: 20,
    type: 'percentage',
    minAmount: 500,
    description: '20% off orders over $500',
  },
  {
    code: 'VIP50',
    discount: 50,
    type: 'fixed',
    description: '$50 off any order',
  },
];

export const MULTI_DAY_DISCOUNTS = [
  { days: 3, discount: 5 },
  { days: 7, discount: 10 },
  { days: 14, discount: 15 },
];

export const TAX_RATE = 0.0875;
