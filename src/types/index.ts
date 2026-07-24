import * as THREE from 'three';

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

export type ServiceSection = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  imageAlts: string[];
  link?: { text: string; url: string };
};

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
  attachments?: File[];
  page?: string;
  website?: string;
  additionalDates?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  theme: string;
  price: number;
  priceRange: string;
  image: string;
  // sceneImage temporarily removed with the hover-swap effect; restore when the effect returns
  sceneImage?: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  popular: boolean;
}

export interface PerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export interface Hotspot {
  id: string;
  position: THREE.Vector3;
  title: string;
  description: string;
  category?: 'room' | 'furniture' | 'feature' | 'appliance';
}

export type PerformanceTier = 'high' | 'medium' | 'low';
export type NetworkSpeed = 'slow' | 'medium' | 'fast';

export interface OptimizationSettings {
  enablePerformanceMode: boolean;
  maxTextureSize: number;
  enableShadows: boolean;
  antialias: boolean;
  pixelRatio: number;
  shadowMapSize: number;
  anisotropy: number;
}

export interface ViewPoint {
  id: string;
  name: string;
  position: THREE.Vector3;
  target: THREE.Vector3;
  icon?: string;
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
  size: 'large' | 'tall' | 'wide' | 'medium' | 'small';
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
  images: string[];
  title: string;
  category: string;
  location?: string;
  tagline?: string;
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

export interface InitialsData {
  [sectionId: string]: {
    initials: string;
    timestamp: string;
  };
}

export interface LocationData {
  city: string;
  region: string;
  country: string;
  ip: string;
}

export interface AVProductionFormData {
  nameCompany: string;
  eventDate: string;
  email: string;
  phone: string;
  numberOfMics: string;
  micTypes: string[];
  audienceQAMics: string;
  audienceQAMicsCount: string;
  liveMusic: string;
  liveMusicDetails: string;
  stageMonitor: string;
  backgroundAudio: string;
  backgroundAudioSource: string;
  presentations: string;
  presentationFormat: string[];
  presentationFormatOther: string;
  aspectRatio: string;
  displayEquipment: string[];
  displayEquipmentOther: string;
  screenPositioning: string;
  confidenceMonitor: string;
  videoPlayback: string;
  videoPlaybackSource: string;
  liveVideoIMAG: string;
  streaming: string;
  streamingPlatform: string[];
  streamingPlatformOther: string;
  multiCamera: string;
  multiCameraCount: string;
  multiCameraAngles: string;
  visualBranding: string;
  lightingType: string[];
  lightingTone: string;
  specialLighting: string;
  specialLightingDetails: string;
  lightingAreas: string[];
  outdoorLighting: string;
  outdoorLightingDetails: string;
  stagePlatform: string;
  stageSizeHeight: string;
  stageFeatures: string[];
  stageFeaturesOther: string;
  maxPeopleOnStage: string;
  setDesign: string;
  setDesignDetails: string;
  stageFurniture: string[];
  stageFurnitureOther: string;
  internetWifi: string;
  bandwidthSpecs: string;
  tempPowerOutlets: string;
  tempPowerPurpose: string;
  eventSchedule: string;
  eventScheduleDetails: string;
  breakoutRooms: string;
  breakoutRoomsCount: string;
  breakoutRoomsAV: string;
  rehearsals: string;
  rehearsalsTiming: string;
  specialPerformances: string;
  specialPerformancesDetails: string;
  timeSensitiveCues: string;
  timeSensitiveCuesDetails: string;
  recordingServices: string;
  recordingServicesDetails: string;
  technicalRider: string;
  technicalRiderDetails: string;
  onSiteContactName: string;
  onSiteContactPhone: string;
  avBudget: string;
  otherNotes: string;
}

export interface CreditCardAuthFormData {
  cardType: string;
  creditCardNumber: string;
  expirationDate: string;
  cvvCode: string;
  cardholderName: string;
  billingAddress: string;
  homePhone: string;
  workPhone: string;
  cellPhone: string;
  eventDate: string;
  typeOfEvent: string;
  eventLocation: string;
  authorizedAmount: string;
}

export interface SubmitRequestBody {
  clientName: string;
  clientEmail: string;
  documentType: string;
  viewTime: string;
  signTime: string;
  location: string;
  ipAddress: string;
  initials: InitialsData;
  signature: string;
  signedDate: string;
  typedName: string;
  deadline: string;
  docId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: Record<string, any>;
}
