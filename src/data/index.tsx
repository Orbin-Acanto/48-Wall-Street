import { EventShowcaseProps } from '@/components/EventDetails';
import {
  Amenity,
  GPhoto,
  Hotspot,
  Photo,
  Product,
  TeamMember,
  Testimonial,
  VideoItem,
  ViewPoint,
} from '@/types';
import { ExportFormat, LegendItemConfig, Tool } from '@/types/floorplan.types';
import {
  Calendar,
  Users,
  Sparkles,
  Star,
  Crown,
  Dice5,
  PartyPopper,
  Layers,
  Grid3x3,
  Box,
} from 'lucide-react';
import * as THREE from 'three';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Michael, Lauren, Andrew, and the entire 48 Wall Street event team were absolutely incredible. From day one, they became a true extension of our team while helping us plan our first conference on Wall Street. Their professionalism, experience, and attention to detail played a pivotal role in the enormous success of our event, and we are truly thankful. Michael’s recommendations on everything from sound and staging to the overall vibe and flow of the event were second to none. You can immediately tell why this team has been a leader in the event space for over 30 years. If you’re looking to host a world-class event in New York City, there’s nobody better.',
    author: 'Anthony Gallo',
    event: '',
    details: '',
    image: '',
    imageLabel: '',
  },
  {
    id: 2,
    quote:
      'Cannot recommend enough 48 Wall Street as an event venue. Not only is the space spectacular, but Michael & team could not have been more supportive, helpful and professional throughout the event. The service was exceptional, and we really treated like part of the family. If you’re looking for a high class venue in the heart of the financial district - 48 Wall Street is your best bet.',
    author: 'Michelle Fotopoulou',
    event: '',
    details: '',
    image: '',
    imageLabel: '',
  },
  {
    id: 3,
    quote:
      'A Remarkable Wedding Venue. What an amazing venue. Grand but intimate, this venue offers the best of both worlds. It’s old world charm made this the perfect venue for my wife and I to celebrate our wedding. The hospitality team MMEink the runs the venue took care of everything thing for us from start to finish. MMEink took care of all the hospitality and production needs all the way down to the wedding favors which made planning an out of state wedding super easy. I highly recommend 48 Wall Street for anyone looking to host a first-class NYC style wedding!',
    author: 'Joe and C',
    event: '',
    details: '',
    image: '',
    imageLabel: '',
  },
];

export const amenities: Amenity[] = [
  {
    icon: '/icons/square-icon.svg',
    title: '30,000 SQFT.',
    description: 'Usable Space',
  },
  {
    icon: '/icons/ceiling-icon.svg',
    title: 'HIGH CEILING +',
    description: 'pin spot lighting system',
  },
  {
    icon: '/icons/additional-space.svg',
    title: 'ADDITIONAL SPACE',
    description: 'concourse level',
  },
  {
    icon: '/icons/coat-icon.svg',
    title: 'COAT CHECK',
    description: 'attendants',
  },
  {
    icon: '/icons/door-icon.svg',
    title: 'PRIVATE ENTRANCE',
    description: 'attended elevators',
  },

  {
    icon: '/icons/people-icon.svg',
    title: 'EVENT MANAGER',
    description: 'on-site',
  },
];

export const photos: Photo[] = [
  { src: '/gallery/6.jpg', alt: 'Wedding celebration', span: 'small' },
  { src: '/gallery/5.jpg', alt: 'Wedding celebration', span: 'tall' },
  { src: '/gallery/4.jpg', alt: 'Wedding celebration', span: 'large' },
  { src: '/gallery/7.jpg', alt: 'Wedding celebration', span: 'tall' },
  { src: '/gallery/8.jpg', alt: 'Wedding celebration', span: 'wide' },
  {
    src: '/gallery/corporate/ (3).jpg',
    alt: 'Wedding celebration',
    span: 'small',
  },
];

export const emptyFashionVenue: Photo[] = [
  { src: '/empty/3.jpg', alt: 'Empty 48 Wall Street', span: 'small' },
  { src: '/empty/2.jpg', alt: 'Empty 48 Wall Street', span: 'tall' },
  { src: '/empty/1.jpg', alt: 'Empty 48 Wall Street', span: 'large' },
  { src: '/empty/4.jpg', alt: 'Empty 48 Wall Street', span: 'tall' },
  { src: '/empty/6.jpg', alt: 'Empty 48 Wall Street', span: 'wide' },
  { src: '/empty/5.jpg', alt: 'Empty 48 Wall Street', span: 'small' },
];

export const portfolioVideos: VideoItem[] = [
  {
    id: 1,
    title: 'Elegant Corporate Gala 2024',
    category: 'corporate',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://placehold.co/800x450',
    description:
      'A stunning corporate gala featuring 300+ guests in our Grand Mezzanine',
  },
  {
    id: 2,
    title: 'Sarah & Michael Wedding',
    category: 'wedding',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://placehold.co/800x450',
    description: 'An unforgettable wedding celebration at 48 Wall Street',
  },
  {
    id: 3,
    title: 'Tech Summit 2024',
    category: 'corporate',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://placehold.co/800x450',
    description: 'Leading technology conference with 500+ attendees',
  },
  {
    id: 4,
    title: 'Emily & James Reception',
    category: 'wedding',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://placehold.co/800x450',
    description: 'Romantic wedding reception in our historic venue',
  },
  {
    id: 5,
    title: 'Annual Charity Gala',
    category: 'special',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://placehold.co/800x450',
    description: 'Fundraising gala supporting local communities',
  },
  {
    id: 6,
    title: 'Product Launch Event',
    category: 'corporate',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://placehold.co/800x450',
    description: 'Exclusive product reveal and celebration',
  },
];

type NavSubItem = { name: string; href: string; external?: boolean };
type NavItem = {
  name: string;
  href: string;
  external?: boolean;
  dropdown?: NavSubItem[];
};

export const navItems: NavItem[] = [
  {
    name: 'About',
    href: '/about',
    dropdown: [
      { name: 'About 48 Wall St', href: '/about' },
      { name: 'Video Gallery', href: '/about/event-video' },
      { name: 'Digital Brochure', href: '/about/digital-brochure' },
      { name: 'Virtual Tour', href: '/about/virtual-tour' },
      { name: 'Floor Plans', href: '/about/floor-plans' },
      { name: 'Create Your Floor Plan', href: '/about/customize-plan' },
      { name: 'Rules & Regulations', href: '/about/rules-regulations' },
    ],
  },
  {
    name: 'Spaces',
    href: '/spaces/banking-hall',
    dropdown: [
      { name: 'Banking Hall', href: '/spaces/banking-hall' },
      { name: 'Grand Mezzanine', href: '/spaces/grand-mezzanine' },
      { name: 'The Alexander Hamilton Office', href: '/spaces/hamilton-room' },
      { name: '5th Floor', href: '/spaces/5th-floor' },
      { name: 'Concourse Level', href: '/spaces/concourse-level' },
    ],
  },
  {
    name: 'Events',
    href: '/events/corporate',
    dropdown: [
      { name: 'Corporate Events', href: '/events/corporate' },
      { name: 'Fashion Shows', href: '/events/fashion-shows' },
      { name: 'Film & TV Shoots', href: '/events/film-shoots' },
      { name: 'Non-Profit Events', href: '/events/non-profit' },
      { name: 'Weddings', href: '/events/weddings' },
      { name: 'Bar & Bat Mitzvahs', href: '/events/bar-bat-mitzvahs' },
      { name: 'Holiday Events', href: '/events/holiday-events' },
    ],
  },
  {
    name: 'Services',
    href: '/services/production',
    dropdown: [
      { name: 'Event Production', href: '/services/production' },
      { name: 'Event Catering', href: '/services/catering' },
      { name: 'Event Rentals', href: '/services/rentals' },
    ],
  },
  {
    name: 'Rentals',
    href: '/rentals',
  },
  {
    name: 'Gallery',
    href: '/gallery',
  },
  {
    name: 'Vendors',
    href: '/vendors',
  },
  { name: 'Location', href: '/location' },
  { name: 'Contact', href: '/contact' },
];

export const footerLinks = {
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Video Gallery', href: '/about/event-video' },
    { name: 'Digital Brochure', href: '/about/digital-brochure' },
    { name: 'Virtual Tour', href: '/about/virtual-tour' },
    { name: 'Floor Plans', href: '/about/floor-plans' },
    { name: 'Create Your Floor Plan', href: '/about/customize-plan' },
    { name: 'Rules & Regulations', href: '/about/rules-regulations' },
  ],
  events: [
    { name: 'Corporate Events', href: '/events/corporate' },
    { name: 'Fashion Shows', href: '/events/fashion-shows' },
    { name: 'Non-Profit Events', href: '/events/non-profit' },
    { name: 'Weddings', href: '/events/weddings' },
    { name: 'Bar & Bat Mitzvahs', href: '/events/bar-bat-mitzvahs' },
  ],
  services: [
    { name: 'Event Production', href: '/services/production' },
    { name: 'Event Catering', href: '/services/catering' },
    { name: 'Event Rentals', href: '/services/rentals' },
    { name: 'Photo Gallery', href: '/gallery' },
  ],
};

export const socialLinks = [
  {
    icon: '/icons/facebook.svg',
    href: 'https://www.facebook.com/48wallst/',
    label: 'Facebook',
  },
  // { icon: '/icons/x.svg', href: 'https://x.com', label: 'X' },
  {
    icon: '/icons/instagram.svg',
    href: 'https://www.instagram.com/48wallst/',
    label: 'Instagram',
  },
  // {
  //   icon: '/icons/youtube.svg',
  //   href: 'https://www.youtube.com/@Mmeink1',
  //   label: 'YouTube',
  // },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Micheal Tardi',
    title: 'Owner',
    image: '/headshots/michael.jpg',
  },
  {
    name: 'Lauren Leuci',
    title: 'Director of Sales',
    image: '/headshots/Lauren.png',
  },
  {
    name: 'Andrew Heaton',
    title: 'Director of Operations',
    image: '/headshots/Andy.png',
  },
];

export { galleryPhotos } from './galleryPhotos';

export const locations = [
  {
    name: 'Grand Mezzanine Banking Hall',
    address: '350 Fifth Avenue, New York, NY 10118',
    capacity: '350 seated | 500 cocktail reception',
    features: [
      'Original 30-foot coffered ceilings',
      'Stunning Palladian windows',
      'Grand marble staircase entrance',
      '1920s architectural details',
    ],
    image: '/about/about (3).jpg',
    type: 'Explore Grand Ballroom',
    sqft: '9,000 sq ft',
  },
  {
    name: 'Concourse Level',
    address: '120 Riverside Drive, New York, NY 10024',
    capacity: '200 guests',
    features: [
      'Divisible into six separate breakout rooms',
      'Ideal for meetings, workshops, and lectures',
      'Perfect for cocktail hours and VIP lounges',
      'Climate-controlled environment',
    ],
    image: '/about/c1.jpg',
    type: 'Discover Breakout Spaces',
    sqft: '3,500 sq ft',
  },
];

export const venues = [
  {
    icon: Calendar,
    title: 'Corporate Events',
    desc: 'From executive board meetings and annual conferences to product launches and holiday celebrations, 48 Wall Street provides the perfect corporate event space in the Financial District. Our flexible layouts, state-of-the-art AV capabilities, and prime Wall Street location make us the preferred choice for companies seeking a historic downtown venue that balances sophistication with functionality.',
  },
  {
    icon: Sparkles,
    title: 'Weddings',
    desc: 'Exchange vows beneath soaring 30-foot ceilings and celebrate your love story in a historic NYC venue steeped in elegance. Our grand mezzanine and stunning architectural details create an unforgettable wedding space on Wall Street for ceremonies and receptions, accommodating up to 350 seated guests with impeccable service and timeless beauty.',
  },
  {
    icon: Users,
    title: 'Social Events',
    desc: "Milestone celebrations deserve a unique event space. Whether you're planning a Bar or Bat Mitzvah, anniversary party, or Sweet 16, our versatile historic venue and dedicated event team ensure every detail reflects your vision. Create memories that will last a lifetime in a setting as special as your occasion.",
  },
  {
    icon: Star,
    title: 'Fashion Shows',
    desc: "Make a statement with your next fashion event in our dramatic, high-ceilinged venue. The grand marble staircase provides the perfect runway entrance, while expansive floor plans offer designers the ideal canvas to showcase collections in Lower Manhattan's most distinctive fashion show event space.",
  },
];

export const locationAmenities = [
  'High-Speed WiFi',
  'Professional A/V Systems',
  'Climate Control',
  'Accessible Parking',
  'On-Site Coordination',
  'Custom Lighting',
  'Flexible Seating',
  'Catering Services',
];

export const categories = [
  { id: 'all', name: 'All Rentals', icon: Sparkles },
  { id: 'furniture', name: 'Event Furniture', icon: Crown },
  { id: 'props', name: 'Themed Props', icon: PartyPopper },
  // { id: 'interactive', name: 'Interactive', icon: Dice5 },
];

export const themes = [
  { id: 'all', name: 'All Themes' },
  { id: 'modern', name: 'Modern Luxury' },
  { id: 'rustic', name: 'Rustic Charm' },
  { id: 'vintage', name: 'Vintage Elegance' },
  { id: 'tropical', name: 'Tropical Paradise' },
  { id: 'casino', name: 'Casino Night' },
  { id: 'arcade', name: 'Arcade Fun' },
];

export const priceRanges = [
  { id: 'all', name: 'All Prices' },
  { id: 'budget', name: 'Under $100' },
  { id: 'mid', name: '$100 - $500' },
  { id: 'premium', name: '$500+' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Black Leather Sofa',
    category: 'furniture',
    theme: 'modern',
    price: 450,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-leather-sofa-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/black-leather-lounge-3-500x500-500x500.jpg',
    rating: 4.8,
    reviews: 124,
    description:
      'Luxurious black leather sofa with contemporary design, perfect for corporate events, lounge areas, and upscale gatherings',
    features: [
      'Seats 3-4 people',
      'Premium leather upholstery',
      'Modern aesthetic',
      'Comfortable cushioning',
    ],
    popular: true,
  },
  {
    id: 2,
    name: 'Black Leather Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 12,
    priceRange: 'budget',
    image: '/rentals/rental_item/black-leather-chair-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/black-leather-chair-2-500x500-500x500.jpg',
    rating: 4.9,
    reviews: 287,
    description:
      'Classic black leather chairs with timeless elegance, ideal for dining events, conferences, and formal occasions',
    features: [
      'Sold individually or in sets',
      'Durable leather',
      'Stackable design',
      'Easy to clean',
    ],
    popular: true,
  },
  {
    id: 3,
    name: 'White Club Chair',
    category: 'furniture',
    theme: 'modern',
    price: 250,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-cosmo-club-chair-rental-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/white-cosmo-club-chair-rental3-500x500.jpg',
    rating: 4.7,
    reviews: 93,
    description:
      'Sophisticated white club chair with plush seating, perfect for cocktail parties, photo shoots, and VIP lounge areas',
    features: [
      'Deep cushioned seat',
      'Pristine white upholstery',
      'Statement piece',
      'Photo-friendly',
    ],
    popular: true,
  },
  {
    id: 4,
    name: 'Lucite Highboy Table',
    category: 'furniture',
    theme: 'rustic',
    price: 85,
    priceRange: 'budget',
    image: '/rentals/rental_item/lucite-high-boy-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/lucite-high-boy-with-top-1-500x500-500x500.jpg',
    rating: 4.6,
    reviews: 156,
    description:
      'Modern transparent lucite highboy table with sleek acrylic design, ideal for cocktail receptions and contemporary events',
    features: [
      'Clear acrylic construction',
      'Bar height',
      'RGB lighting compatible',
      'Minimalist aesthetic',
    ],
    popular: true,
  },
  {
    id: 5,
    name: 'White Pump Highboy Table',
    category: 'furniture',
    theme: 'rustic',
    price: 85,
    priceRange: 'budget',
    image: '/rentals/rental_item/modern-pump-highboy-rental-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-bar-table4-500x500.jpg',
    rating: 4.6,
    reviews: 156,
    description:
      'Crisp white highboy table with hydraulic pump mechanism, perfect for cocktail hours and standing receptions',
    features: [
      'Adjustable height',
      'Durable white finish',
      'Easy assembly',
      'Versatile styling',
    ],
    popular: false,
  },
  {
    id: 6,
    name: 'Marble Top Gold Highboy Table',
    category: 'furniture',
    theme: 'rustic',
    price: 85,
    priceRange: 'budget',
    image: '/rentals/rental_item/gold-marble-highboy-rental-500x500.jpg',
    sceneImage: '/rentals/rental_item/71ZzVLDzWaL._AC_SX679_.jpg',
    rating: 4.6,
    reviews: 156,
    description:
      'Luxurious highboy table featuring genuine marble top and gold-finished base, adding elegance to any upscale event',
    features: [
      'Genuine marble surface',
      'Gold metallic base',
      'Bar height',
      'Premium finish',
    ],
    popular: true,
  },
  {
    id: 7,
    name: 'Black Scoop Stool',
    category: 'furniture',
    theme: 'rustic',
    price: 85,
    priceRange: 'budget',
    image: '/rentals/rental_item/black-scoop-stool-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/3 Vanity Mirror and Chair-500x500.jpg',
    rating: 4.6,
    reviews: 156,
    description:
      'Contemporary black scoop stool with ergonomic curved seat, perfect for bars, counters, and modern event spaces',
    features: [
      'Ergonomic scoop design',
      'Matte black finish',
      'Counter height',
      'Stackable',
    ],
    popular: false,
  },
  {
    id: 8,
    name: 'White Modern Stool',
    category: 'furniture',
    theme: 'rustic',
    price: 85,
    priceRange: 'budget',
    image: '/rentals/rental_item/modern-stool-rental-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/modern-stool-rental2-500x500.jpg',
    rating: 4.6,
    reviews: 156,
    description:
      'Sleek white stool with minimalist design, ideal for contemporary events, trade shows, and stylish gatherings',
    features: [
      'Clean white finish',
      'Modern silhouette',
      'Lightweight',
      'Versatile seating',
    ],
    popular: true,
  },
  {
    id: 9,
    name: 'Elegant Ballroom Chair',
    category: 'furniture',
    theme: 'rustic',
    price: 85,
    priceRange: 'budget',
    image: '/rentals/rental_item/elegant-dining-chair1-500x500.jpg',
    sceneImage: '/rentals/rental_item/elegant-dining-chair6-500x500.jpg',
    rating: 4.6,
    reviews: 156,
    description:
      'Sophisticated ballroom chair with refined design, perfect for weddings, galas, and formal dinner events',
    features: [
      'Formal styling',
      'Padded seat',
      'Available in multiple colors',
      'Stackable for storage',
    ],
    popular: true,
  },
  {
    id: 10,
    name: 'Champagne Wall',
    category: 'props',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/champagne.jpg',
    sceneImage: '/rentals/rental_item/champagne.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'Instagram-worthy champagne wall display with individual glass holders, creating an elegant focal point for cocktail receptions',
    features: [
      'Holds 40-60 glasses',
      'Freestanding design',
      'Customizable arrangement',
      'Photo opportunity centerpiece',
    ],
    popular: false,
  },
  {
    id: 11,
    name: 'White Angora Love Seat',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-angora-love-seat-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-angora-love-seat-1-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A cozy vintage-inspired loveseat upholstered in soft angora fabric, perfect for intimate seating or photo backdrops.',
    features: [
      'Plush angora-style upholstery',
      'Seats two comfortably',
      'Elegant vintage frame',
      'Ideal for lounge or bridal setups',
    ],
    popular: false,
  },
  {
    id: 12,
    name: 'White Cleopatra Sofa',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/cleopatra-chair-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/white-cleopatra-sofa-2-500x500-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A luxurious white sofa inspired by regal Egyptian style, featuring graceful curves and tufted detailing for a statement look.',
    features: [
      'Soft velvet-like upholstery',
      'Tufted backrest with gold accent details',
      'Seats three comfortably',
      'Perfect for luxury and themed events',
    ],
    popular: false,
  },
  {
    id: 13,
    name: 'White Conductor Sofa',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-condutor-sofa-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/white-conductor-sofa-3-500x500-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A sleek white sofa with classic tufting and bold arms, blending timeless craftsmanship with modern sophistication.',
    features: [
      'Deep button-tufted design',
      'Structured silhouette',
      'Premium fabric finish',
      'Ideal for modern-vintage event themes',
    ],
    popular: false,
  },
  {
    id: 14,
    name: 'White L Couch',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-l-couch-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-l-couch-1-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A spacious L-shaped white couch offering both comfort and style, ideal for creating cozy lounge areas at events.',
    features: [
      'L-shaped sectional design',
      'Soft fabric seating',
      'Spacious layout for group seating',
      'Perfect for lounge or VIP areas',
    ],
    popular: false,
  },
  {
    id: 15,
    name: 'White Lounge Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-lounge-chair-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-lounge-chair-1-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A chic white lounge chair that combines comfort with timeless elegance, perfect for seating nooks or accent décor.',
    features: [
      'Cushioned seat and backrest',
      'Compact and versatile design',
      'Vintage-inspired upholstery',
      'Ideal as accent or guest seating',
    ],
    popular: false,
  },
  {
    id: 16,
    name: 'White Manhattan Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/manhattan-chair-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/manhattan-chair-1-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A modern-vintage white chair inspired by New York sophistication, featuring a clean silhouette and plush seating.',
    features: [
      'Minimalist modern design',
      'Soft white upholstery',
      'Compact yet comfortable',
      'Perfect for upscale gatherings',
    ],
    popular: false,
  },
  {
    id: 17,
    name: 'White Pixie Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-pixie-chair1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-pixie-chair3-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A charming white chair with whimsical design details, bringing a touch of fairy-tale elegance to any event space.',
    features: [
      'Curved backrest with playful design',
      'Compact and lightweight',
      'Soft cushioned seat',
      'Perfect for bridal or tea party settings',
    ],
    popular: false,
  },
  {
    id: 18,
    name: 'White Roll Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-roll-chair-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-roll-chair-1-500x500-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A classic roll-arm chair in pristine white, combining plush comfort and vintage-inspired charm for any setting.',
    features: [
      'Rolled arms with tufted details',
      'Sturdy wood frame',
      'Soft fabric upholstery',
      'Adds elegance to lounge areas',
    ],
    popular: false,
  },
  {
    id: 19,
    name: 'White Rolled Arm Bench Lounge',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-rolled-arm-bench1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-rolled-arm-bench2-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A graceful bench with rolled arms and elegant white upholstery, perfect for entryways, lounges, or bridal seating.',
    features: [
      'Rolled arm design for added charm',
      'Seats two to three guests',
      'Durable cushioned seating',
      'Ideal for photo setups and waiting areas',
    ],
    popular: false,
  },
  {
    id: 20,
    name: 'White Tufted High Back Ornate Couch',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/ornate-high-back-couch-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/ornate-high-back-couch2-500x500.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'An opulent high-back couch with intricate tufting and carved frame details, ideal for statement lounges and photo ops.',
    features: [
      'High back for dramatic presence',
      'Deep button-tufted upholstery',
      'Ornate carved wood detailing',
      'Perfect for weddings and luxury events',
    ],
    popular: false,
  },
  {
    id: 21,
    name: 'Black and Gold Flared Arm Sofa',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-gold-couch.jpg',
    sceneImage: '/rentals/rental_item/black-gold-couch.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A striking vintage-inspired sofa with flared arms and elegant gold accents. Plush black velvet upholstery contrasts beautifully with its gilded frame, making it a centerpiece for any luxurious lounge or photo shoot.',
    features: [
      'Soft black velvet upholstery',
      'Flared arms with gold detailing',
      'Comfortable cushioned seating',
      'Perfect for upscale lounges and events',
    ],
    popular: false,
  },
  {
    id: 22,
    name: 'Black and Gold Nested Coffee Tables',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/blakc-and-gold-coffee-table.jpg',
    sceneImage: '/rentals/rental_item/blakc-and-gold-coffee-table.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A sophisticated set of nested coffee tables featuring glossy black tops and metallic gold bases. Designed to save space while adding an elegant touch to any vintage or modern décor.',
    features: [
      'Set of two nesting tables',
      'Black lacquered tops with gold frames',
      'Space-saving and versatile design',
      'Ideal for cocktail areas and receptions',
    ],
    popular: false,
  },
  {
    id: 23,
    name: 'Black and Gold Scallop Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-gold-scallop-chair.jpg',
    sceneImage: '/rentals/rental_item/black-gold-scallop-chair.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A glamorous scalloped-back chair wrapped in soft black velvet with gold-trimmed legs. Its seashell silhouette brings a touch of art deco charm to any event space or vanity setup.',
    features: [
      'Distinctive scalloped backrest',
      'Plush velvet upholstery',
      'Gold metal legs for a refined finish',
      'Perfect for bridal lounges and photo booths',
    ],
    popular: false,
  },
  {
    id: 24,
    name: 'Black and Gold Velvet Barrel Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-and-gold-chair.jpg',
    sceneImage: '/rentals/rental_item/black-and-gold-chair.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      "A modern barrel-style chair with a vintage twist — featuring a curved silhouette, rich black velvet, and a gleaming gold base. Comfortable yet chic, it's a perfect accent for cocktail areas or lounges.",
    features: [
      'Curved barrel design for comfort',
      'Luxurious velvet upholstery',
      'Polished gold base accent',
      'Great for cocktail corners and VIP setups',
    ],
    popular: false,
  },
  {
    id: 25,
    name: 'Black and Gold Velvet Sofa',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/blck-gold-sofa.jpg',
    sceneImage: '/rentals/rental_item/blck-gold-sofa.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A plush black velvet sofa accented with sleek gold framing, embodying classic elegance and modern luxury. Perfect for creating a statement lounge or VIP seating area.',
    features: [
      'Premium black velvet fabric',
      'Gold metal frame detailing',
      'Spacious and comfortable seating',
      'Ideal for upscale and formal events',
    ],
    popular: false,
  },
  {
    id: 26,
    name: 'White and Gold Nested Coffee Tables',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-gold-coffee-table.jpg',
    sceneImage: '/rentals/rental_item/white-gold-coffee-table.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A set of elegant white and gold nesting tables that combine timeless charm with practicality. Their smooth white tops and radiant gold frames complement any sophisticated décor theme.',
    features: [
      'Two-tier nesting design',
      'White marble-style surface',
      'Gold metallic base for a luxurious look',
      'Versatile use for modern or vintage events',
    ],
    popular: false,
  },
  {
    id: 27,
    name: 'Gold End Table',
    category: 'furniture',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image: '/rentals/rental_item/Leslie+End+Table-1295136341.jpg',
    sceneImage: '/rentals/rental_item/Leslie+End+Table-1295136341.jpg',
    rating: 4.7,
    reviews: 67,
    description:
      'A sleek and stylish gold end table that adds a touch of refinement to any space. Its compact size and metallic finish make it the perfect accent for seating areas or corners.',
    features: [
      'Lustrous gold finish',
      'Compact and versatile design',
      'Durable metal construction',
      'Ideal as a side or accent table',
    ],
    popular: false,
  },
  {
    id: 28,
    name: 'White Tufted High Bench',
    category: 'furniture',
    theme: 'vintage',
    price: 300,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-tufted-high-bench-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-tufted-high-bench-1-500x500.jpg',
    rating: 4.8,
    reviews: 54,
    description:
      'A striking white leather-look high bench with deep button-tufting and elevated seat height — ideal for VIP lounges or as a stylish ceremony seating option.',
    features: [
      'High bench height for elevated presence',
      'White tufted upholstery with soft padding',
      'Durable frame for event use',
      'Perfect for weddings, lounges, and photo ops',
    ],
    popular: true,
  },
  {
    id: 29,
    name: 'White Tufted Ornate Chaise',
    category: 'furniture',
    theme: 'vintage',
    price: 350,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-tufted-ornate-chaise-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-tufted-ornate-chaise-1-500x500.jpg',
    rating: 4.9,
    reviews: 63,
    description:
      'A graceful chaise lounge in pristine white with ornate carved detailing and deep tufting — the ultimate bridal or luxury lounge piece.',
    features: [
      'Elegant carved wooden frame',
      'Tufted upholstery with plush padding',
      'Perfect for bridal suites or statement lounges',
      'Vintage European styling for upscale décor',
    ],
    popular: true,
  },
  {
    id: 30,
    name: 'White Tufted Ornate Sofa',
    category: 'furniture',
    theme: 'vintage',
    price: 380,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-tufted-ornate-sofa-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-tufted-ornate-sofa-1-500x500.jpg',
    rating: 4.8,
    reviews: 71,
    description:
      'An elegant white tufted sofa framed with ornate carving — blending timeless charm and refined luxury for weddings or upscale events.',
    features: [
      'Button-tufted back and seat',
      'Carved ornate frame with antique finish',
      'Spacious two- to three-seater size',
      'Ideal for high-end events and ceremonies',
    ],
    popular: false,
  },
  {
    id: 31,
    name: 'White Tufted Scoop Chair',
    category: 'furniture',
    theme: 'modern',
    price: 260,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-tufted-scoop-chair-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-tufted-scoop-chair-1-500x500.jpg',
    rating: 4.6,
    reviews: 42,
    description:
      'A sculptural white chair featuring a deep scoop shape and tufted upholstery — elegant, comfortable, and versatile for any lounge setup.',
    features: [
      'Curved scoop silhouette for comfort',
      'White tufted leather-look finish',
      'Compact size for flexible arrangements',
      'Perfect for modern lounges and cocktail areas',
    ],
    popular: false,
  },
  {
    id: 32,
    name: 'White Tufted Rolled Arm Sofa',
    category: 'furniture',
    theme: 'vintage',
    price: 340,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-tufted-rolled-arm-sofa-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/white-tufted-rolled-arm-sofa-1-500x500.jpg',
    rating: 4.7,
    reviews: 56,
    description:
      'A sophisticated sofa with classic rolled arms and tufted back detailing — ideal for creating timeless elegance in any event lounge.',
    features: [
      'Rolled arm design for traditional charm',
      'Deep tufted cushioning for comfort',
      'White upholstery suitable for all themes',
      'Perfect for lounges, ceremonies, and receptions',
    ],
    popular: false,
  },
  {
    id: 33,
    name: 'White Tufted Ottoman',
    category: 'furniture',
    theme: 'vintage',
    price: 220,
    priceRange: 'budget',
    image: '/rentals/rental_item/white-tufted-ottoman-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-tufted-ottoman-1-500x500.jpg',
    rating: 4.5,
    reviews: 31,
    description:
      'A versatile white tufted ottoman ideal for additional seating or as a chic centerpiece in any event lounge area.',
    features: [
      'Tufted top adds elegant detail',
      'Can be used as seating or table surface',
      'Compact and lightweight for easy setup',
      'Matches all tufted white furniture pieces',
    ],
    popular: true,
  },
  {
    id: 34,
    name: 'White Tufted Winged Couch',
    category: 'furniture',
    theme: 'vintage',
    price: 370,
    priceRange: 'mid',
    image: '/rentals/rental_item/white-tufted-winged-couch-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-tufted-winged-couch-1-500x500.jpg',
    rating: 4.9,
    reviews: 79,
    description:
      'A show-stopping white tufted couch with dramatic winged sides and plush seating — designed to make a grand statement at weddings and VIP lounges.',
    features: [
      'Winged back design with high sides',
      'Deep button tufting and rich padding',
      'Elegant and comfortable seating',
      'Perfect for photo ops and luxury events',
    ],
    popular: true,
  },
  {
    id: 35,
    name: 'White Tufted Small Ottoman',
    category: 'furniture',
    theme: 'vintage',
    price: 180,
    priceRange: 'budget',
    image: '/rentals/rental_item/white-tufted-small-ottoman-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/white-tufted-small-ottoman-1-500x500.jpg',
    rating: 4.4,
    reviews: 22,
    description:
      'A compact tufted ottoman in white finish — a great accent for lounge setups or intimate seating clusters.',
    features: [
      'Small footprint fits tight spaces',
      'White tufted upholstery for cohesion',
      'Lightweight and easy to reposition',
      'Pairs beautifully with other tufted furniture',
    ],
    popular: false,
  },
  {
    id: 36,
    name: 'Black Leather Love Seat',
    category: 'furniture',
    theme: 'modern',
    price: 310,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-leather-loveseat-rental2-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/black-leather-loveseat-rental2-500x500.jpg',
    rating: 4.7,
    reviews: 60,
    description:
      'A sleek black leather loveseat that balances comfort and modern minimalism — ideal for upscale lounges and VIP spaces.',
    features: [
      'Smooth black leather upholstery',
      'Comfortable seating for two guests',
      'Compact size for versatile setups',
      'Perfect for cocktail or reception areas',
    ],
    popular: false,
  },
  {
    id: 37,
    name: 'Black Leather Sled',
    category: 'furniture',
    theme: 'modern',
    price: 280,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-leather-sled-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/black-leather-sled-1-500x500.jpg',
    rating: 4.5,
    reviews: 37,
    description:
      'A bold sled-style bench upholstered in black leather — offering modern lines and versatile seating for any event layout.',
    features: [
      'Sled-style low bench design',
      'Durable leather finish with minimalist look',
      'Perfect for group seating',
      'Pairs with modern tables or lounge pieces',
    ],
    popular: false,
  },
  {
    id: 38,
    name: 'Round Tufted Sofa',
    category: 'furniture',
    theme: 'vintage',
    price: 420,
    priceRange: 'high',
    image: '/rentals/rental_item/round-tufted-sofa-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/round-tufted-sofa-1-500x500.jpg',
    rating: 4.9,
    reviews: 83,
    description:
      'A circular tufted sofa designed for social seating — luxurious, dramatic, and perfect as a centerpiece in event lounges or clubs.',
    features: [
      '360° circular seating design',
      'Deep tufted leather upholstery',
      'Ideal for high-traffic lounges',
      'Great as a centerpiece or island seating',
    ],
    popular: true,
  },
  {
    id: 39,
    name: 'Bling Tufted Leather Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 260,
    priceRange: 'mid',
    image: '/rentals/rental_item/bling-tufted-leather-chair-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/bling-tufted-leather-chair-1-500x500.jpg',
    rating: 4.6,
    reviews: 41,
    description:
      'A glamorous tufted leather chair featuring subtle bling accents — a stylish statement for luxury events or fashion-forward lounges.',
    features: [
      'Tufted leather upholstery with crystal details',
      'Comfortable accent chair size',
      'Elegant glam styling for upscale events',
      'Perfect for bridal suites and photo booths',
    ],
    popular: false,
  },
  {
    id: 40,
    name: 'Black Tufted Leather Bling Chair',
    category: 'furniture',
    theme: 'vintage',
    price: 270,
    priceRange: 'mid',
    image:
      '/rentals/rental_item/black-tufted-leather-bling-chair-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/black-tufted-leather-bling-chair-1-500x500.jpg',
    rating: 4.7,
    reviews: 48,
    description:
      'A stunning black tufted leather chair with shimmering bling accents — designed to elevate any VIP or high-end event space.',
    features: [
      'Black leather with button-tufted finish',
      'Crystal or metallic bling accents',
      'Perfect as an accent or focal seating piece',
      'Adds sparkle and luxury to décor',
    ],
    popular: true,
  },
  {
    id: 41,
    name: 'Black Tufted Leather Chair',
    category: 'furniture',
    theme: 'modern',
    price: 250,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-tufted-leather-chair-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/black-tufted-leather-chair-1-500x500.jpg',
    rating: 4.5,
    reviews: 33,
    description:
      'A refined black tufted leather chair offering classic comfort with modern style — versatile for any event setup.',
    features: [
      'Single-seater design for flexible layout',
      'Tufted detailing adds sophistication',
      'Black finish fits most décor styles',
      'Perfect for guest lounges or cocktail spaces',
    ],
    popular: false,
  },
  {
    id: 42,
    name: 'Black Tufted Leather Chaise',
    category: 'furniture',
    theme: 'vintage',
    price: 350,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-tufted-leather-chaise-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/black-tufted-leather-chaise-1-500x500.jpg',
    rating: 4.8,
    reviews: 61,
    description:
      'A luxurious black leather chaise featuring deep tufting — ideal for elegant lounges, photo sets, or modern receptions.',
    features: [
      'Reclined chaise silhouette',
      'Tufted black leather upholstery',
      'Perfect for statement seating or photo ops',
      'Classic design with bold sophistication',
    ],
    popular: true,
  },
  {
    id: 43,
    name: 'Black Tufted Leather Wing Couch',
    category: 'furniture',
    theme: 'vintage',
    price: 390,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-tufted-leather-wing-couch-1-500x500.jpg',
    sceneImage:
      '/rentals/rental_item/black-tufted-leather-wing-couch-1-500x500.jpg',
    rating: 4.9,
    reviews: 77,
    description:
      'A dramatic winged couch upholstered in black tufted leather — the perfect centerpiece for upscale, moody lounge environments.',
    features: [
      'High winged sides with tufted detailing',
      'Spacious and comfortable seating',
      'Black leather upholstery for modern luxury',
      'Ideal for VIP areas and signature setups',
    ],
    popular: true,
  },
  {
    id: 44,
    name: 'Black Leather Couch',
    category: 'furniture',
    theme: 'modern',
    price: 330,
    priceRange: 'mid',
    image: '/rentals/rental_item/black-leather-tufted-couch-500x500.jpg',
    sceneImage: '/rentals/rental_item/black-leather-tufted-couch-500x500.jpg',
    rating: 4.6,
    reviews: 51,
    description:
      'A classic black leather couch offering both style and comfort — perfect for professional or elegant event settings.',
    features: [
      'Smooth black leather surface',
      'Spacious design fits multiple guests',
      'Clean lines suit modern décor themes',
      'Perfect for receptions, waiting areas, or lounges',
    ],
    popular: false,
  },
  {
    id: 45,
    name: 'Tufted Leather Love Seat',
    category: 'furniture',
    theme: 'vintage',
    price: 310,
    priceRange: 'mid',
    image: '/rentals/rental_item/tufted-leather-love-seat-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/tufted-leather-love-seat-1-500x500.jpg',
    rating: 4.7,
    reviews: 58,
    description:
      'A charming tufted leather loveseat combining comfort and elegance — perfect for sweetheart seating or boutique lounge layouts.',
    features: [
      'Tufted detailing on back and seat',
      'Compact two-seater size',
      'Available in versatile leather finishes',
      'Perfect for wedding lounges or small setups',
    ],
    popular: false,
  },
  {
    id: 46,
    name: 'Lucite Low Boy Rectangle Table',
    category: 'furniture',
    theme: 'modern',
    price: 290,
    priceRange: 'mid',
    image: '/rentals/rental_item/lucite-low-boy-rectangle-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/lucite-low-boy-rectangle-1-500x500.jpg',
    rating: 4.8,
    reviews: 47,
    description:
      'A modern rectangular low table crafted from clear lucite — ideal for minimalist lounges or high-end receptions.',
    features: [
      'Transparent lucite design for sleek look',
      'Rectangular shape fits multiple chairs',
      'Low height for lounge areas',
      'Pairs with contemporary seating collections',
    ],
    popular: false,
  },
  {
    id: 47,
    name: 'Lucite Cocktail Table',
    category: 'furniture',
    theme: 'modern',
    price: 270,
    priceRange: 'mid',
    image: '/rentals/rental_item/lucite-cocktail-table-1-500x500.jpg',
    sceneImage: '/rentals/rental_item/lucite-cocktail-table-1-500x500.jpg',
    rating: 4.7,
    reviews: 39,
    description:
      'A sleek clear lucite cocktail table with clean lines and modern form — perfect for chic event setups or contemporary lounges.',
    features: [
      'Clear lucite for seamless styling',
      'Cocktail height ideal for social zones',
      'Minimalist silhouette matches any décor',
      'Durable and lightweight for event use',
    ],
    popular: true,
  },
];

export const layouts = [
  {
    id: 'cocktail',
    name: 'Cocktail Reception',
    capacity: 600,
    description: 'Standing reception with high-top tables and lounge areas',
    icon: Users,
  },
  {
    id: 'banquet',
    name: 'Banquet Seating',
    capacity: 350,
    description: 'Round tables with full dining service',
    icon: Grid3x3,
  },
  {
    id: 'theater',
    name: 'Theater Style',
    capacity: 500,
    description: 'Auditorium seating for presentations',
    icon: Layers,
  },
  {
    id: 'conference',
    name: 'Conference Setup',
    capacity: 80,
    description: 'Boardroom style with AV capabilities',
    icon: Box,
  },
];

export const floors = [
  {
    id: 'second',
    name: 'Grand Mezzanine',
    size: '8,500 sq ft',
    capacity: { max: 500, seated: 350, cocktail: 600 },
    ceiling: '18 ft',
    features: [
      'Grand dual marble staircase',
      'Oversized Crystal chandeliers',
      'Former Bank of New York',
      '30-foot soaring Ceilings',
      'Beautiful Palladian Windows',
      'Original 1920s architecture',
      '500 Guests Capacity',
    ],
    blueprint: '/floor-plans/ground.svg',
    furnished: '/floor-plans/fgm.png',
    model3DEmpty: '/floor-plans/e.glb',
    model3DFurnished: '/floor-plans/f.glb',
  },
  {
    id: 'third',
    name: 'Concourse Level',
    size: '6,000 sq ft',
    capacity: { max: 300, seated: 200, cocktail: 400 },
    ceiling: '14 ft',
    features: [
      'Divisible into 6 breakout rooms',
      'Flexible meeting configurations',
      'Theater and classroom setups',
      '200 Guests Capacity',
      'Professional AV capabilities',
      'Intimate event space option',
      'Perfect for workshops and sessions',
    ],
    blueprint: '/floor-plans/concourse.svg',
    furnished: '/floor-plans/fcl.png',
    model3DEmpty: '/floor-plans/e.glb',
    model3DFurnished: '/floor-plans/f.glb',
  },
];

export const weddingData: EventShowcaseProps = {
  title: 'Historic Wedding Venue in Lower Manhattan',
  subtitle: 'A Timeless Backdrop for Your Most Important Day',
  description:
    'Some venues are simply settings. 48 Wall Street is a story. Built in 1927 as the Bank of New York and Trust Company, this National Register landmark brings a grandeur to your wedding day that no modern ballroom can replicate. The 30-foot ceilings, grand marble staircase, Palladian windows, and original crystal chandeliers create an atmosphere of genuine historic elegance in the heart of the Financial District. Our experienced team handles every detail from concept to final curtain call, so you and your guests can simply be present for the moments that matter.',
  images: [
    {
      src: '/gallery/wedding/22.jpg',
      alt: 'Elegant wedding',
    },
    {
      src: '/gallery/wedding/24.jpg',
      alt: 'Wedding reception',
    },
    {
      src: '/gallery/wedding/23.jpg',
      alt: 'Elegant wedding',
    },
    {
      src: '/gallery/wedding/26.jpg',
      alt: 'Elegant wedding',
    },
    {
      src: '/gallery/wedding/27.jpg',
      alt: 'Elegant wedding',
    },
    {
      src: '/gallery/wedding/29.jpg',
      alt: 'Elegant wedding',
    },
  ],
  tags: [
    'Ceremonies',
    'Receptions',
    'Full Planning',
    'Catering',
    'Custom Decor',
    'AV Production',
    'Day-of Coordination',
    'Rehearsal Dinners',
  ],
  stats: [
    { value: '1000+', label: 'Events Hosted' },
    { value: '30+', label: 'Years of Experience' },
    { value: '500', label: 'Guest Capacity' },
  ],
  info: [
    {
      heading: 'How many guests can 48 Wall Street accommodate for a wedding?',
      body: 'The Grand Mezzanine Banking Hall seats up to 350 guests for a formal dinner reception and accommodates up to 500 for a cocktail style celebration. The Concourse Level can serve as a separate cocktail hour or breakout space, giving you additional flexibility in how you use the venue.',
    },
    {
      heading: 'Can we hold the ceremony and reception in the same venue?',
      body: 'Yes, and many couples choose to do exactly that. The venue has distinct areas that work beautifully as separate ceremony and reception spaces, so your guests never have to leave the building. It makes for a seamless evening and reduces stress on the day.',
    },
    {
      heading: 'How far in advance should we book?',
      body: 'Spring and fall weekends fill up fast, so we recommend reaching out 12 to 18 months ahead if you have a specific date in mind. That said, we do occasionally have availability on shorter notice. Contact us and we will let you know what we have open.',
    },
    {
      heading: 'What is included in your wedding planning services?',
      body: 'We handle everything from initial venue walkthrough and floor plan design to vendor coordination, catering, AV and production setup, and day-of management. Our goal is to make sure you are not managing logistics on your wedding day. You focus on celebrating while our team handles the details.',
    },
  ],
  primaryCta: {
    label: 'Schedule a Tour',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Wedding Gallery',
    href: '/gallery?tab=wedding',
  },
  services: [
    {
      title: 'Ceremonies at 48 Wall Street',
      body: 'Walk down the aisle beneath 30-foot ceilings and original 1920s chandeliers. The grand marble staircase makes for a dramatic processional that photographs unlike anything else in New York City. We can configure the Banking Hall for your ceremony and then transition the space into your reception, all within the same historic downtown venue.',
    },
    {
      title: 'Wedding Receptions',
      body: 'The Grand Mezzanine has held some of the most celebrated events in Lower Manhattan for over 30 years. For your reception, we can arrange round tables for up to 350 seated guests or open the floor for a cocktail celebration of up to 500. Our team coordinates catering, lighting, entertainment, and every detail so the night runs exactly as you imagined.',
    },
    {
      title: 'Photography Worth the Venue Itself',
      body: 'Couples consistently tell us that their 48 Wall Street wedding photos are unlike anything their photographer has shot before. The original Palladian windows, marble columns, crystal chandeliers, and grand staircase give you backgrounds that feel like a film set. You will not need to find a separate portrait location because the venue itself provides more than enough.',
    },
  ],
};

export const corporateData: EventShowcaseProps = {
  title: 'Corporate Event Venue in the Financial District',
  subtitle: 'Where Business Gets Done in Historic Style',
  description:
    'There is something about 48 Wall Street that makes an impression before anyone in the room says a word. The building itself carries decades of New York business history, and that context sets the tone for every corporate event we host. Whether you are bringing together 50 people for a board meeting or 500 for an annual conference, our Financial District event venue gives your gathering the weight and presence that a hotel ballroom or generic conference center simply cannot offer. We handle production, catering, AV, staging, and coordination so your team can focus on the content, not the logistics.',
  images: [
    {
      src: '/gallery/corporate/ (24).jpg',
      alt: 'Corporate conference setup',
    },
    {
      src: '/gallery/corporate/ (10).jpg',
      alt: 'Corporate conference',
    },
    {
      src: '/gallery/corporate/ (19).jpg',
      alt: 'Corporate conference',
    },
    {
      src: '/gallery/corporate/ (9).jpg',
      alt: 'Corporate conference',
    },
    {
      src: '/gallery/corporate/ (6).jpg',
      alt: 'Corporate conference',
    },
    {
      src: '/gallery/corporate/ (2).jpg',
      alt: 'Corporate conference',
    },
  ],
  tags: [
    'Product Launches',
    'Annual Conferences',
    'Awards Ceremonies',
    'Executive Dinners',
    'Investor Events',
    'Town Halls',
    'Brand Activations',
    'Client Receptions',
  ],
  stats: [
    { value: '1000+', label: 'Events Hosted' },
    { value: '30+', label: 'Years of Experience' },
    { value: '500', label: 'Guest Capacity' },
  ],
  info: [
    {
      heading: 'What types of corporate events do you host?',
      body: 'We host the full range of corporate gatherings at 48 Wall Street including product launches, industry conferences, shareholder meetings, executive dinners, company galas, awards ceremonies, investor events, and holiday parties. Each event is planned and produced by our in-house team so you have one point of contact from start to finish.',
    },
    {
      heading: 'What does the venue include for corporate events?',
      body: 'The Grand Mezzanine Banking Hall gives you 9,000 square feet with 30-foot ceilings, flexible seating for up to 350 at round tables or 500 for a standing reception, and full AV infrastructure including projection, sound, and professional lighting. The Concourse Level adds 3,000 additional square feet with breakout room capability for smaller sessions or a separate registration area.',
    },
    {
      heading: 'Do you provide AV and production support?',
      body: 'Yes. Our production partner MME Worldwide operates in-house at the venue and handles everything from basic presentation setups to full stage productions with custom lighting rigs, LED walls, and live streaming. You are not hiring an outside crew who has never seen the space. Our team knows the building and can execute your vision efficiently.',
    },
    {
      heading: 'How do I get pricing for a corporate event?',
      body: 'Pricing depends on the date, event type, guest count, and services required. The best starting point is a quick conversation with our events team. Contact us through the form on this page or call us directly and we will put together a proposal based on your specific needs.',
    },
  ],
  primaryCta: {
    label: 'Request a Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Corporate Gallery',
    href: '/gallery?tab=corporate',
  },
  services: [
    {
      title: 'Conferences and Summits',
      body: 'The Banking Hall at 48 Wall Street has hosted annual conferences, industry summits, and shareholder meetings for some of the most recognized names in finance, technology, and media. The 9,000 square foot hall accommodates theater-style seating, full staging, and every AV need your program requires. When you hold your conference here, the venue reinforces the message that what you are doing matters.',
    },
    {
      title: 'Gala Dinners and Awards Evenings',
      body: 'A company gala or awards ceremony deserves a room that rises to the occasion. The grand marble staircase, crystal chandeliers, and Palladian windows of 48 Wall Street create the kind of atmosphere where every guest feels the significance of the evening before they even sit down. Our team handles catering, decor, entertainment, and production so the night exceeds what your team is expecting.',
    },
    {
      title: 'Product Launches and Client Events',
      body: 'First impressions are everything when you are launching something new or hosting your most important clients. 48 Wall Street gives your brand a setting that communicates credibility and ambition. We configure the space around your brand identity, coordinate catering and production, and make sure the logistics are invisible so your guests experience the product, not the event management.',
    },
  ],
};

export const conferenceData: EventShowcaseProps = {
  title: 'Conference Venue in the Financial District',
  subtitle: 'A Historic Meeting Space on Wall Street',
  description:
    'When a conference is held at 48 Wall Street, attendees notice. The 1927 banking hall carries a gravitas that sets the tone from the moment guests walk through the door, long before the program begins. With 9,000 square feet on the main level and an additional 3,000 square feet of breakout space on the Concourse Level, we accommodate everything from intimate board meetings to full-day industry conferences for up to 500 attendees. Our in-house production team handles all AV, staging, lighting, and catering so your team can focus entirely on the content.',
  images: [
    {
      src: '/gallery/corporate/ (24).jpg',
      alt: 'Conference setup at 48 Wall Street',
    },
    {
      src: '/gallery/corporate/ (10).jpg',
      alt: 'Conference at 48 Wall Street Financial District',
    },
    {
      src: '/gallery/corporate/ (19).jpg',
      alt: 'Corporate meeting in historic NYC venue',
    },
    {
      src: '/gallery/corporate/ (9).jpg',
      alt: 'Panel discussion at 48 Wall Street',
    },
    {
      src: '/gallery/corporate/ (6).jpg',
      alt: 'Business conference in Lower Manhattan',
    },
    {
      src: '/gallery/corporate/ (2).jpg',
      alt: 'Executive meeting at Wall Street venue',
    },
  ],
  tags: [
    'Industry Conferences',
    'Annual Meetings',
    'Board Meetings',
    'Panel Discussions',
    'Symposiums',
    'Workshops',
    'Summit Events',
    'Training Sessions',
  ],
  stats: [
    { value: '1000+', label: 'Events Hosted' },
    { value: '30+', label: 'Years of Experience' },
    { value: '500', label: 'Guest Capacity' },
  ],
  info: [
    {
      heading: 'What is the capacity for conferences at 48 Wall Street?',
      body: 'The Grand Mezzanine Banking Hall accommodates up to 500 guests for a standing conference or networking reception, and up to 350 for a theater or classroom style setup. The Concourse Level beneath it holds up to 200 and divides into six separate breakout rooms, making it ideal for concurrent sessions or smaller working groups running alongside a larger main stage program.',
    },
    {
      heading: 'What AV and production capabilities are available?',
      body: 'Our in-house production team MME Worldwide handles all conference AV needs including main stage sound and presentation systems, projection or LED screens, professional lighting, live streaming setup, and technical support staff on the day. They have worked in this building extensively and can execute complex multi-room setups efficiently.',
    },
    {
      heading: 'Is catering available for conferences?',
      body: 'Yes. Our catering partner provides everything from morning continental spreads and working lunches to full seated dinners for end-of-day networking events. We can configure food and beverage service to fit around your program schedule so meals and breaks keep your attendees energized without disrupting the flow of the day.',
    },
    {
      heading: 'How do I request pricing for a conference?',
      body: 'Pricing is based on your event date, attendee count, program duration, and the services you need. Reach out through our contact form or call us directly. We will follow up with a proposal that reflects your specific requirements.',
    },
  ],
  primaryCta: {
    label: 'Request a Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Conference Gallery',
    href: '/gallery?tab=corporate',
  },
  services: [
    {
      title: 'Main Stage Conferences',
      body: 'The Banking Hall at 48 Wall Street is one of the most architecturally distinctive conference venues in New York City. Theater-style seating, full staging, and a ceiling height that makes every room feel significant. Whether you are hosting 100 or 500 attendees, the space commands attention and keeps your audience engaged. Our production team is on site to handle everything from opening remarks to the final Q and A.',
    },
    {
      title: 'Breakout Sessions and Workshops',
      body: 'The Concourse Level gives your conference a dedicated space for parallel sessions, workshops, and smaller working groups. It divides into six separate rooms and sits directly beneath the main hall, so moving between the two levels is seamless. This setup lets you run a full conference program without needing to rent multiple buildings or shuttle guests across a campus.',
    },
    {
      title: 'Networking and Dining',
      body: 'Some of the most valuable conversations at any conference happen during the meals and breaks. We configure the Grand Mezzanine to encourage that kind of engagement, whether it is a standing cocktail reception after the final session or a seated dinner that gives your speakers and sponsors time to connect with attendees in a more relaxed setting.',
    },
  ],
};

export const fashionData: EventShowcaseProps = {
  title: 'Iconic Fashion Show Venues on Wall Street',
  subtitle: 'A Historic Runway Venue in the Financial District',
  description:
    "Discover the top fashion show venues in NYC, where style transcends boundaries and glamour reigns supreme. Step into the heart of fashion's elite.Fashion is about atmosphere as much as it is about clothing, and few spaces in New York City carry the visual weight of the 48 Wall Street banking hall. The 30-foot ceilings, grand marble staircase, Palladian windows, and original 1920s architecture create a dramatic setting that elevates every collection shown here. Whether you are planning a full New York Fashion Week runway production, an intimate designer presentation, a brand activation, or a showroom event, our in-house team handles staging, lighting, production, and catering so you can focus entirely on the creative work. There is no better runway venue in the Financial District.",
  images: [
    {
      src: '/gallery/fashion/ (6).jpg',
      alt: 'Fashion show',
    },
    {
      src: '/gallery/fashion/ (1).jpeg',
      alt: 'Fashion show',
    },
    {
      src: '/gallery/fashion/ (4).jpg',
      alt: 'Fashion show',
    },
    {
      src: '/gallery/fashion/ (7).jpg',
      alt: 'Fashion show',
    },
    {
      src: '/gallery/fashion/ (12).jpg',
      alt: 'Fashion show',
    },
    {
      src: '/gallery/fashion/ (14).jpg',
      alt: 'Fashion show',
    },
  ],
  tags: [
    'Runway Productions',
    'Fashion Week Shows',
    'Collection Launches',
    'Trunk Shows',
    'Brand Activations',
    'Designer Presentations',
    'Buyer Showrooms',
    'Press Events',
  ],
  stats: [
    { value: '1000+', label: 'Events Hosted' },
    { value: '30+', label: 'Years of Experience' },
    { value: '500', label: 'Guest Capacity' },
  ],
  info: [
    {
      heading: 'What makes 48 Wall Street a strong choice for fashion events?',
      body: 'The architecture does a lot of the work. The 30-foot ceilings give you the vertical space to design dramatic lighting rigs. The long, open floor plan accommodates a proper runway without compromise. The marble and original detailing creates a backdrop that photographs beautifully regardless of the lighting approach. And because our production team works in this building regularly, the technical execution is efficient.',
    },
    {
      heading: 'Can the venue support a full New York Fashion Week production?',
      body: 'Yes. We have hosted runway shows, collection presentations, and brand events during Fashion Week at this venue. Our production partner MME Worldwide has extensive experience with fashion event staging including custom runway builds, specialized lighting configurations, backstage coordination areas, and front-of-house guest management.',
    },
    {
      heading: 'What about smaller presentations and showroom events?',
      body: 'The space works just as well for intimate buyer showrooms, press previews, and collection presentations as it does for full runway productions. We can configure the floor plan around what your event actually needs rather than forcing it into a standard setup.',
    },
    {
      heading: 'Is there space for backstage operations?',
      body: 'Yes. The Concourse Level below the main hall can serve as a dedicated backstage area with space for wardrobe, hair and makeup, and model staging. This keeps the front-of-house experience clean and professional while giving your team everything they need to run a smooth show.',
    },
  ],
  primaryCta: {
    label: 'Request a Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Fashion Gallery',
    href: '/gallery?tab=fashion',
  },
  services: [
    {
      title: 'Runway Productions',
      body: 'The Banking Hall at 48 Wall Street accommodates a full professional runway with room for seated front-row guests and standing audience on either side. The ceiling height allows for serious lighting design, and the marble architecture creates a backdrop that gives every look shown here a different quality than what you see at a standard fashion week venue. Our production team builds the stage, programs the lights, and manages the technical run so the show goes exactly as designed.',
    },
    {
      title: 'Showrooms and Brand Activations',
      body: 'Not every fashion event is a runway show. Buyer showrooms, press days, and brand activations require a different kind of space, one where guests feel like they are somewhere worth being before they have even looked at the product. The financial district address and the historic character of 48 Wall Street provide that context naturally. We configure the floor plan to suit the format and handle catering and production around it.',
    },
    {
      title: 'Lighting and Production',
      body: 'In fashion, lighting is not secondary to the design. It is part of it. Our production partner MME Worldwide specializes in the kind of precise, dramatically designed lighting setups that fashion presentations require, from high-contrast runway spots to full ambient transformation of the hall for a different aesthetic. They work in this space regularly and know how to make the architecture work in your favor.',
    },
  ],
};

export const nonprofitData: EventShowcaseProps = {
  title: 'Non-Profit Event Venue in Lower Manhattan',
  subtitle: 'A Historic Setting That Elevates Your Cause',
  description:
    'The setting of a fundraising gala sends a signal to your donors before the program even begins. At 48 Wall Street, the 1927 banking hall with its grand marble staircase, soaring ceilings, and original architecture communicates that your organization takes itself seriously and your mission deserves to be celebrated with dignity. We have supported non-profit galas, benefit dinners, charity auctions, and awareness events throughout Lower Manhattan for over 30 years. Our team understands the unique demands of fundraising events and works with you to create an atmosphere that inspires generosity.',
  images: [
    {
      src: '/gallery/non/1.jpg',
      alt: 'Corporate conference setup',
    },
    {
      src: '/gallery/non/2.jpg',
      alt: 'Corporate conference',
    },
    {
      src: '/gallery/non/3.jpg',
      alt: 'Corporate conference',
    },
    {
      src: '/gallery/non/4.jpg',
      alt: 'Corporate conference',
    },
    {
      src: '/gallery/non/7.jpg',
      alt: 'Corporate conference',
    },
    {
      src: '/gallery/non/6.jpg',
      alt: 'Corporate conference',
    },
  ],
  tags: [
    'Charity Galas',
    'Fundraising Dinners',
    'Benefit Auctions',
    'Donor Receptions',
    'Awards Evenings',
    'Awareness Events',
    'Foundation Events',
    'Board Receptions',
  ],
  stats: [
    { value: '1000+', label: 'Events Hosted' },
    { value: '30+', label: 'Years of Experience' },
    { value: '500', label: 'Guest Capacity' },
  ],
  info: [
    {
      heading: 'What types of non-profit events do you host?',
      body: 'We host charity galas, fundraising dinners, benefit auctions, donor cultivation receptions, awards ceremonies, foundation events, and awareness evenings at 48 Wall Street. Our team has worked with non-profits of all sizes across many sectors and understands how to structure an event program around both a guest experience and a fundraising goal.',
    },
    {
      heading: 'Do you offer special rates for non-profit organizations?',
      body: 'We recognize that non-profit budgets require more careful management than corporate ones. Contact our events team directly to discuss your organization and what you are planning. We will work with you honestly on what is possible within your budget.',
    },
    {
      heading: 'Can the venue support live auctions and award presentations?',
      body: 'Yes. The Grand Mezzanine is well suited for live auctions and award moments. Our production team can configure staging, sound, and lighting to support a program that moves between dinner service, a live auction, speaker presentations, and entertainment. The grand staircase also makes for a memorable moment during award presentations.',
    },
    {
      heading: 'What is the capacity for a non-profit gala at 48 Wall Street?',
      body: 'We accommodate seated gala dinners for up to 350 guests and cocktail receptions for up to 500 in the Grand Mezzanine. For smaller donor cultivation events or board receptions, the space can be configured to feel appropriately intimate. We have hosted non-profit events ranging from 75 to 450 guests in this venue.',
    },
  ],
  primaryCta: {
    label: 'Request a Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Event Gallery',
    href: '/gallery?tab=corporate',
  },
  services: [
    {
      title: 'Charity Galas and Fundraising Dinners',
      body: 'A fundraising gala at 48 Wall Street gives your donors an evening that reflects the importance of your cause. The 9,000 square foot Banking Hall seats up to 350 for a formal dinner and accommodates 500 for a cocktail reception. Our catering team builds menus that match the formality of the occasion, and our production team handles lighting and entertainment to keep the energy of the room where it needs to be for a successful evening.',
    },
    {
      title: 'Donor Receptions and Cultivation Events',
      body: 'Maintaining relationships with major donors requires more than an annual gala. Smaller receptions and cultivation dinners give your leadership team and board members a chance to connect personally with the people who support your mission. The architectural character of 48 Wall Street creates a setting that feels worthy of those conversations without requiring a large production budget.',
    },
    {
      title: 'Benefit Auctions and Awareness Evenings',
      body: 'Our floor plan supports live and silent auction formats, with enough space to display auction items, maintain clear sightlines to the stage, and keep guests moving and engaged throughout the evening. Our AV team ensures that every bid call and every speaker moment lands clearly across the full room so the program drives results.',
    },
  ],
};

export const mitzvahData: EventShowcaseProps = {
  title: 'Bar and Bat Mitzvah Venue in New York City',
  subtitle: 'A Historic Wall Street Setting for This Sacred Milestone',
  description:
    'A Bar or Bat Mitzvah is one of the most meaningful celebrations a family hosts, and the venue should match that significance. At 48 Wall Street, families find a space that has enough grandeur for the occasion while being flexible enough to become genuinely personal. The 9,000 square foot Grand Mezzanine has hosted Bar and Bat Mitzvahs that range from elegant formal celebrations to high-energy themed parties, and our team has the experience to help you build an event that honors the tradition while reflecting who your teenager actually is. We coordinate every aspect including the service space, decor, catering, entertainment, and production so the day unfolds without you managing logistics.',
  images: [
    {
      src: '/gallery/bar/39.jpg',
      alt: 'Bar Mitzvah celebration at the Western Wall',
    },
    {
      src: '/gallery/bar/48.jpg',
      alt: 'Bar Mitzvah celebration',
    },
    {
      src: '/gallery/bar/43.jpg',
      alt: 'Bar Mitzvah celebration',
    },
    {
      src: '/gallery/bar/49.jpg',
      alt: 'Bar Mitzvah celebration',
    },
    {
      src: '/gallery/bar/46.jpg',
      alt: 'Bar Mitzvah celebration',
    },
    {
      src: '/gallery/bar/47.jpg',
      alt: 'Bar Mitzvah celebration',
    },
  ],
  tags: [
    'Bar Mitzvahs',
    'Bat Mitzvahs',
    'Custom Themes',
    'Teen Entertainment',
    'Ceremony and Reception',
    'Catering',
    'Decor Design',
    'Full Planning',
  ],
  stats: [
    { value: '1000+', label: 'Events Hosted' },
    { value: '30+', label: 'Years of Experience' },
    { value: '500', label: 'Guest Capacity' },
  ],
  info: [
    {
      heading: 'Can we hold the service and the reception at 48 Wall Street?',
      body: 'Yes. The venue has distinct areas on separate levels that work well as a service space and a reception space. Your guests can move from one to the other without leaving the building, which simplifies logistics significantly for the family and keeps the energy of the day flowing naturally from ceremony into celebration.',
    },
    {
      heading: 'What theme and decor options are available?',
      body: 'Our production and decor team has built everything from sports-themed ballrooms to Hollywood glamour setups to classic elegant designs. Because we work in this space regularly, we know how to use the architecture to your advantage and layer your theme on top of it in a way that looks intentional rather than forced. We sit down with the family and the teen early in the planning process to get a real sense of their vision.',
    },
    {
      heading:
        'How do you keep both teens and adults engaged throughout the night?',
      body: 'The best Bar and Bat Mitzvah celebrations have a clear flow that gives each generation what they came for. We help design the programming, entertainment choices, and space configuration so that teens have a high-energy area to celebrate while adults have comfortable space to connect. There are also moments built specifically to bring everyone together.',
    },
    {
      heading: 'How far in advance should we book?',
      body: 'Saturdays in spring and fall go quickly, especially if your date is tied to a religious calendar. We recommend reaching out at least 12 to 18 months before your target date. That also gives our team enough time to properly plan the decor and coordinate all vendors without rushing.',
    },
  ],
  primaryCta: {
    label: 'Request a Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Event Gallery',
    href: '/gallery?tab=bar',
  },
  services: [
    {
      title: 'A Celebration Space Unlike Any Other in New York',
      body: 'The Grand Mezzanine at 48 Wall Street gives a Bar or Bat Mitzvah a sense of occasion that a banquet hall simply cannot match. The 30-foot ceilings, marble staircase, and original chandeliers are a foundation that our decor team builds on to create something completely specific to your family. Whether you want sleek and modern or warm and traditional, the space can become either.',
    },
    {
      title: 'Custom Themes and Decor',
      body: 'We have designed Bar and Bat Mitzvah decor around sports, travel, music, gaming, film, and nearly every other theme imaginable. The architectural bones of the 1927 banking hall provide a dramatic base that makes themed decor look more polished and deliberate. Our in-house decor team maintains an inventory of furniture, props, and lighting equipment that can transform the room around whatever vision the family has in mind.',
    },
    {
      title: 'Ceremony and Reception Under One Roof',
      body: 'Hosting the service and the party at 48 Wall Street means the family is not splitting attention between two different venues, coordinating transportation, or worrying about timing. The Concourse Level works well as a ceremony space while the Grand Mezzanine handles the reception, and guests move between the two with ease. It makes for a day that feels cohesive from start to finish.',
    },
  ],
};

export const holidayData: EventShowcaseProps = {
  title: 'Corporate Holiday Party Venue on Wall Street',
  subtitle: 'End the Year in a Setting That Actually Feels Special',
  description:
    'Most corporate holiday parties feel like an afterthought. The right venue changes that. At 48 Wall Street, the 1920s banking hall with its crystal chandeliers, gold accents, and 30-foot ceilings does most of the decorating before your team even walks in the door. We have hosted hundreds of company holiday parties and end-of-year galas in the Financial District, and we know exactly how to make a large group feel like they are somewhere worth celebrating. Our team handles decor, catering, entertainment, and production so your company gets credit for throwing the best party of the year.',
  images: [
    {
      src: '/gallery/holiday/54.jpg',
      alt: 'Holiday party',
    },
    {
      src: '/gallery/holiday/51.jpg',
      alt: 'Holiday party',
    },
    {
      src: '/gallery/holiday/50.jpg',
      alt: 'Holiday party',
    },
    {
      src: '/gallery/holiday/57.jpg',
      alt: 'Holiday party',
    },
    {
      src: '/gallery/holiday/56.jpg',
      alt: 'Holiday party',
    },
    {
      src: '/gallery/holiday/60.jpg',
      alt: 'Holiday party',
    },
  ],
  tags: [
    'Corporate Holiday Parties',
    'End-of-Year Galas',
    'Client Receptions',
    'Company Celebrations',
    'Themed Decor',
    'Live Entertainment',
    'Holiday Catering',
    'New Year Events',
  ],
  stats: [
    { value: '1000+', label: 'Events Hosted' },
    { value: '30+', label: 'Years of Experience' },
    { value: '500', label: 'Guest Capacity' },
  ],
  info: [
    {
      heading: 'When should we book a holiday party at 48 Wall Street?',
      body: 'November and December book up faster than any other time of year. If your company event is tied to a specific date in that window, we recommend reaching out before summer to lock in your preferred evening. For spring or fall holiday events there is generally more flexibility, but we still suggest contacting us as early as possible.',
    },
    {
      heading: 'Can you handle the decor and entertainment as well?',
      body: 'Yes. Our in-house production team MME Worldwide coordinates themed decor, lighting, and entertainment so you are not managing multiple vendors. We can build out a full holiday atmosphere using the natural grandeur of the banking hall as a foundation, then layer in your specific vision on top of it.',
    },
    {
      heading: 'How many people can attend a holiday party at 48 Wall Street?',
      body: 'The Grand Mezzanine accommodates up to 500 guests for a cocktail style party and up to 350 for a seated dinner. If your event is smaller we can configure the space to feel appropriately intimate rather than oversized. We have hosted company parties of 80 people and company galas of 450 in the same room.',
    },
    {
      heading: 'Can you incorporate company branding into the event design?',
      body: 'Absolutely. We work with companies that want their logo and brand colors woven into the decor, and we can create branded signage, custom lighting projections, and tailored food and beverage programs that reflect your company identity. The goal is to make the event feel genuinely connected to your team.',
    },
  ],
  primaryCta: {
    label: 'Request a Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Holiday Gallery',
    href: '/gallery?tab=holiday',
  },
  services: [
    {
      title: 'Corporate Holiday Parties',
      body: 'The end-of-year party is one of the few times the entire company gathers in one room. It deserves a venue that reflects what the team accomplished. The Banking Hall at 48 Wall Street seats up to 350 for a formal dinner or opens up for 500 at a cocktail reception, with the kind of architectural backdrop that makes the evening feel like an event rather than an obligation.',
    },
    {
      title: 'A Venue That Sets the Mood',
      body: 'During the holidays, the Grand Mezzanine at 48 Wall Street practically decorates itself. The crystal chandeliers, marble detailing, and warm lighting of the 1920s banking hall create a seasonal atmosphere that most venues spend thousands trying to manufacture. We build on that natural elegance with custom decor, themed lighting, and entertainment that fits your company culture.',
    },
    {
      title: 'End-of-Year Galas',
      body: 'For companies that want to close the year with something genuinely impressive, a seated gala at 48 Wall Street delivers. We coordinate every element including multi-course catering, live entertainment, awards or recognition moments, and full production so your leadership team can spend the evening celebrating with the rest of the company instead of managing the event.',
    },
  ],
};

export const filmtvData: EventShowcaseProps = {
  title: 'Film Location and Production Venue in NYC',
  subtitle: 'A Camera-Ready Historic Building in the Financial District',
  description:
    'Productions that need authentic New York architecture come to 48 Wall Street because there is very little elsewhere in the city that replicates what this building looks like on camera. The 1927 banking hall with its 30-foot ceilings, marble columns, grand staircase, and original detailing reads as classic New York financial power, the kind of setting that period pieces, prestige dramas, and commercial productions pay significant location fees to find. We accommodate on-location filming, holding space for cast and crew, and industry events including wrap parties, premieres, and screenings. Our team understands production schedules and handles access, logistics, and coordination with the discretion your project requires.',
  images: [
    {
      src: '/gallery/film/ (1).jpg',
      alt: 'Red carpet premiere',
    },
    {
      src: '/gallery/film/ (2).jpg',
      alt: 'Film screening event',
    },
    {
      src: '/gallery/film/ (3).jpg',
      alt: 'Entertainment industry party',
    },
    {
      src: '/gallery/film/ (4).jpg',
      alt: 'Movie theater premiere',
    },
    {
      src: '/gallery/film/ (5).jpg',
      alt: 'VIP after party',
    },
    {
      src: '/gallery/film/ (6).jpg',
      alt: 'Production wrap party',
    },
  ],
  tags: [
    'Film Location Rentals',
    'TV Production',
    'Holding Space',
    'Wrap Parties',
    'Premieres',
    'Screening Events',
    'Commercial Shoots',
    'Photo Shoots',
  ],
  stats: [
    { value: '1000+', label: 'Events Hosted' },
    { value: '30+', label: 'Years of Experience' },
    { value: '9000', label: 'Sq Ft on Main Level' },
  ],
  info: [
    {
      heading: 'What kinds of productions has 48 Wall Street been used for?',
      body: 'The venue has been used for film and television productions, commercial shoots, photo shoots, and music video productions. The 1920s banking hall architecture is particularly sought after for period pieces, financial industry settings, prestige drama sequences, and any production that needs a location that reads as authentically New York.',
    },
    {
      heading: 'Is there space for holding, wardrobe, and hair and makeup?',
      body: 'Yes. The Concourse Level provides a large separate space below the main hall that works well for production base camp operations including wardrobe, hair and makeup stations, talent holding, and catering. This keeps the filming area clean and organized while giving your crew everything they need in a central location.',
    },
    {
      heading: 'Can 48 Wall Street be used for wrap parties and premieres?',
      body: 'The venue works beautifully for industry events. The grand staircase, high ceilings, and dramatic architecture create the right atmosphere for a premiere or a wrap celebration. We handle catering, lighting, and event production so the crew gets a proper send-off in a space that matches the scale of what they produced.',
    },
    {
      heading:
        'How do I inquire about using the venue for a film or photo shoot?',
      body: 'Contact our events team with your project details including dates, duration, crew size, and what the space will be used for. We will put together a proposal based on your production needs and timeline.',
    },
  ],
  primaryCta: {
    label: 'Request a Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Film Gallery',
    href: '/gallery?tab=fashion',
  },
  services: [
    {
      title: 'On-Location Film and TV Production',
      body: 'The Banking Hall at 48 Wall Street gives productions immediate access to 9,000 square feet of authentic 1920s New York architecture without the need to build a set. The 30-foot ceilings, marble columns, Palladian windows, and grand staircase provide a level of production value that is genuinely difficult to find anywhere else in downtown Manhattan. Our team coordinates access and logistics around your production schedule.',
    },
    {
      title: 'Holding Space and Production Support',
      body: 'The Concourse Level provides a dedicated, climate-controlled base camp area separate from the filming location. It can be configured for talent holding, wardrobe, hair and makeup, and crew catering all in the same building as your set. Keeping the entire production in one location streamlines the day and reduces turnaround time between setups.',
    },
    {
      title: 'Wrap Parties, Premieres, and Industry Events',
      body: 'When a production is finished, the team deserves a celebration worth the work they put in. The Banking Hall at 48 Wall Street is as impressive for a wrap party as it is for a formal premiere. We configure the space, coordinate catering and entertainment, and handle the event production so your production team can actually enjoy the evening.',
    },
  ],
};

export const brochurePages = [
  { id: 1, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt.jpg' },
  { id: 2, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt2.jpg' },
  { id: 3, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt3.jpg' },
  { id: 4, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt4.jpg' },
  { id: 5, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt5.jpg' },
  { id: 6, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt6.jpg' },
  { id: 7, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt7.jpg' },
  { id: 8, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt8.jpg' },
  { id: 9, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt9.jpg' },
  { id: 10, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt10.jpg' },
  { id: 11, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt11.jpg' },
  { id: 12, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt12.jpg' },
  { id: 13, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt13.jpg' },
  { id: 14, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt14.jpg' },
  { id: 15, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt15.jpg' },
  { id: 16, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt16.jpg' },
  { id: 17, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt17.jpg' },
  { id: 18, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt18.jpg' },
  { id: 19, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt19.jpg' },
  { id: 20, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt20.jpg' },
  { id: 21, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt21.jpg' },
  { id: 22, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt22.jpg' },
  { id: 23, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt23.jpg' },
  { id: 24, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt24.jpg' },
  { id: 25, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt25.jpg' },
  { id: 26, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt26.jpg' },
  { id: 27, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt27.jpg' },
  { id: 28, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt28.jpg' },
  { id: 29, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt29.jpg' },
  { id: 30, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt30.jpg' },
  { id: 31, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt31.jpg' },
  { id: 32, image: '/brochures/v1/48Wall.Brochure.9x12.v6-alt32.jpg' },
];

export const menuPages = [
  { id: 1, image: '/menu/catering_Page_01.jpg' },
  { id: 2, image: '/menu/catering_Page_02.jpg' },
  { id: 3, image: '/menu/catering_Page_03.jpg' },
  { id: 4, image: '/menu/catering_Page_04.jpg' },
  { id: 5, image: '/menu/catering_Page_05.jpg' },
  { id: 6, image: '/menu/catering_Page_06.jpg' },
  { id: 7, image: '/menu/catering_Page_07.jpg' },
  { id: 8, image: '/menu/catering_Page_08.jpg' },
  { id: 9, image: '/menu/catering_Page_09.jpg' },
  { id: 10, image: '/menu/catering_Page_10.jpg' },
  { id: 11, image: '/menu/catering_Page_11.jpg' },
  { id: 12, image: '/menu/catering_Page_12.jpg' },
  { id: 13, image: '/menu/catering_Page_13.jpg' },
  { id: 14, image: '/menu/catering_Page_14.jpg' },
  { id: 15, image: '/menu/catering_Page_15.jpg' },
  { id: 16, image: '/menu/catering_Page_16.jpg' },
  { id: 17, image: '/menu/catering_Page_17.jpg' },
  { id: 18, image: '/menu/catering_Page_18.jpg' },
  { id: 19, image: '/menu/catering_Page_19.jpg' },
  { id: 20, image: '/menu/catering_Page_20.jpg' },
  { id: 21, image: '/menu/catering_Page_21.jpg' },
  { id: 22, image: '/menu/catering_Page_22.jpg' },
  { id: 23, image: '/menu/catering_Page_23.jpg' },
  { id: 24, image: '/menu/catering_Page_24.jpg' },
  { id: 25, image: '/menu/catering_Page_25.jpg' },
  { id: 26, image: '/menu/catering_Page_26.jpg' },
  { id: 27, image: '/menu/catering_Page_27.jpg' },
  { id: 28, image: '/menu/catering_Page_28.jpg' },
  { id: 29, image: '/menu/catering_Page_29.jpg' },
  { id: 30, image: '/menu/catering_Page_30.jpg' },
];

export const items = [
  {
    images: [
      '/event/Cornell/1.jpg',
      '/event/Cornell/2.jpg',
      '/event/Cornell/3.jpg',
    ],
    title: 'Cornell Alumni Conference',
    category: 'Conferences',
    location: 'Cornell',
  },
  {
    images: ['/event/FPM/1.jpg', '/event/FPM/2.jpg', '/event/FPM/3.jpg'],
    title: 'World Of Excellence Fund Raising Gala',
    category: 'Galas',
    location: 'FPM US',
  },
  {
    images: [
      '/event/Alice_Oliva/1.jpg',
      '/event/Alice_Oliva/2.jpg',
      '/event/Alice_Oliva/3.jpg',
    ],
    title: 'Immersive Fashion Show',
    category: 'Fashion Shows',
    location: 'Alice + Oliva',
  },

  {
    images: [
      '/event/Nordstrom/1.jpg',
      '/event/Nordstrom/2.jpg',
      '/event/Nordstrom/3.jpg',
    ],
    title: 'Vintage Department Store Activation',
    category: 'Event Activation',
    location: 'Nordstrom',
  },
  {
    images: [
      '/event/Wedding/1.jpg',
      '/event/Wedding/2.jpg',
      '/event/Wedding/3.jpg',
    ],
    title: 'Wedding Ceremony',
    category: 'Wedding',
  },
];

export const eventProductionData = {
  title: 'Luxury Event Production at 48 Wall Street',
  subtitle: 'Where Historic Grandeur Meets World-Class Production',
  heroImage: '/videos/ep.mp4',
  leadTitle: 'Everything Your Event Needs, Under One Roof',
  leadDescription:
    "From intimate executive gatherings to spectacular galas and large-scale corporate productions, 48 Wall Street delivers a seamless fusion of timeless architecture, innovative event technology, and impeccable white-glove service. Our full-service production team transforms historic spaces into extraordinary experiences. We offer bespoke event design, state-of-the-art audiovisual solutions, luxury furnishings, and flawless execution, all under one iconic roof in the heart of New York City's Financial District.",
  leadDescription2:
    'Most event venues require you to hire an outside production company, coordinate their access, manage the relationship between them and the venue, and hope everything works together on the day. At 48 Wall Street, our production partner MME Worldwide operates in-house. They know the building, they know the electrical capacity, they know how the acoustics work, and they have built everything from runway stages to full conference productions in this space. That experience translates directly into cleaner execution and fewer surprises. We offer a complete turn-key solution covering AV, staging, lighting, custom fabrication, decor, and entertainment, all managed by one team in one building.',
  sections: [
    {
      id: 'design',
      title: 'Design & Decor',
      description:
        "Our award-winning in-house design team transforms extraordinary spaces into unforgettable experiences. Inspired by the timeless elegance of 48 Wall Street, our designers create bespoke environments that seamlessly complement the venue's historic architecture while reflecting the unique vision, identity, and objectives of every client.<br><br>From exquisite floral installations and custom furnishings to immersive décor, luxury tablescapes, scenic fabrication, and branded environments, every design element is thoughtfully curated to create a sophisticated and memorable guest experience. Whether your event is an executive conference, luxury wedding, gala, fashion show, or brand activation, our creative team crafts distinctive concepts that leave a lasting impression.<br><br>Supported by our in-house production studio and one of the region's most extensive private inventories of premium décor, furnishings, props, and custom event elements, MME Worldwide offers unparalleled creative flexibility and flawless execution. When your vision calls for something truly exceptional, our designers can also source bespoke luxury rentals and fabricate one-of-a-kind installations tailored exclusively to your event.<br><br>The result is more than beautiful décor, it is a fully immersive experience where inspired design, historic grandeur, and impeccable craftsmanship come together to create events as iconic as the venue itself.",
      images: [
        '/service/design/20231212_155514.jpg',
        '/service/design/20250821_162023.jpg',
        '/service/design/IMG_2638.jpg',
        '/service/design/IMG_2693.jpg',
      ],
      imageAlts: [
        'Production display 1',
        'Production display 2',
        'Production display 3',
        'Production display 4',
      ],
    },
    {
      id: 'audio-visual',
      title: 'Audio Visual',
      description:
        'Our team of experienced audiovisual engineers delivers sophisticated production solutions designed to elevate every presentation, conference, and executive gathering. From immersive keynote experiences to seamless panel discussions and hybrid broadcasts, we curate tailored AV solutions that align with your vision, objectives, and investment. Utilizing state-of-the-art technology and meticulous execution, we manage every element with precision, ensuring flawless delivery, crystal-clear communication, and an unforgettable guest experience.',
      images: [
        '/service/av/20231027_185043.jpg',
        '/service/av/AE2.jpg',
        '/service/av/DJI_0323.jpg',
      ],
      imageAlts: [
        'Production display 1',
        'Production display 2',
        'Production display 3',
      ],
    },
    {
      id: 'lighting',
      title: 'Lighting',
      description:
        'Lighting is the defining element of every extraordinary event, transforming historic architecture into an unforgettable experience.  Award-winning lighting designers craft bespoke environments that enhance the timeless elegance of 48 Wall Street, accentuating its soaring ceilings, marble finishes, and iconic architectural details. From refined ambient illumination to breathtaking, immersive productions, every lighting design is thoughtfully curated to complement your vision and create an atmosphere of sophistication, drama, and lasting impression. Our state-of-the-art technology and expert production team ensure every moment is flawlessly illuminated, leaving your guests captivated from arrival to the final farewell.',
      images: [
        '/service/light/20241115_155551.jpg',
        '/service/light/20250522_170355.jpg',
        '/service/light/DJI_20231212_162444_1529.jpg',
      ],
      imageAlts: [
        'Production display 1',
        'Production display 2',
        'Production display 3',
      ],
    },
    {
      id: 'staging',
      title: 'Staging',
      description:
        "Every remarkable event begins with a commanding stage. We design and fabricate bespoke staging solutions that become the centerpiece of unforgettable experiences. From elegant presentation platforms and executive conference stages to dramatic fashion runways, custom-built environments, and immersive performance spaces, our production specialists bring your vision to life with exceptional craftsmanship and precision. Every stage is thoughtfully engineered to complement the grandeur of 48 Wall Street's historic architecture while delivering flawless sightlines, seamless functionality, and striking visual impact. Whether hosting a global product launch, luxury gala, fashion show, or keynote presentation, our staging solutions create an extraordinary platform where every moment takes center stage.",
      images: [
        '/service/stage/20240910_072701.jpg',
        '/service/stage/IMG_0116.JPG',
        '/service/stage/IMG_5831.jpg',
      ],
      imageAlts: [
        'Production display 1',
        'Production display 2',
        'Production display 3',
      ],
    },
    {
      id: 'custom-fabrication',
      title: 'Custom Fabrication',
      description:
        "At 48 Wall Street, custom fabrication and premium printing services allow every event to become a fully branded, immersive experience. Supported by MME Worldwide’s in-house creative team and design shop, we transform ideas into extraordinary environments through custom-built scenic elements, branded installations, large-format graphics, signage, step-and-repeats, dimensional displays, and bespoke décor features. From executive meetings and product launches to luxury galas, fashion presentations, and private celebrations, every detail is thoughtfully designed, expertly produced, and flawlessly installed to complement the venue's historic grandeur while bringing your brand or vision to life with sophistication and impact.",
      images: [
        '/service/cf/Green Canopy 2.jpg',
        '/service/cf/IMG_2204.jpg',
        '/service/cf/lenovo-stage.jpeg',
      ],
      imageAlts: [
        'Production display 1',
        'Production display 2',
        'Production display 3',
      ],
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      description:
        "Extraordinary entertainment transforms an event into an unforgettable experience. At 48 Wall Street, MME Worldwide curates world-class entertainment tailored to the style and sophistication of your occasion. From elegant solo musicians, jazz ensembles, string quartets, and contemporary bands to high-energy dance orchestras, internationally acclaimed DJs, and immersive themed performers, every act is carefully selected to captivate your guests.<br>Our entertainment specialists also produce bespoke performances featuring cultural artists, aerialists, cirque performers, Broadway-caliber talent, strolling entertainers, interactive characters, and custom-themed experiences that seamlessly complement your event's vision. Whether hosting an intimate executive reception, a luxury wedding, a fashion gala, or a large-scale corporate celebration, we create performances that elevate every moment.<br>For clients seeking an exceptional statement, MME Worldwide also manages celebrity talent, keynote speakers, headline performers, and exclusive artist bookings. From contract negotiations and technical riders to backstage logistics and show production, our experienced team oversees every detail with discretion, precision, and white-glove service, delivering a seamless entertainment experience worthy of one of New York City's most iconic historic venues.",
      images: [
        '/service/entertainment/20250821_184731.jpg',
        '/service/entertainment/entertainment.png',
        '/service/entertainment/IMG_1278.jpg',
      ],
      imageAlts: [
        'Production display 1',
        'Production display 2',
        'Production display 3',
      ],
    },
  ],
  ctaTitle: 'Ready to plan the event',
  ctaDescription:
    'Allow our expert event team to transform your vision into an extraordinary experience, from inspired design and seamless production to the unforgettable moments your guests will remember long after the event ends.',
};

export const eventCateringData = {
  title: 'Event Catering at 48 Wall Street',
  subtitle: 'Elevated Dining. Exceptional Hospitality.',
  leadTitle: 'Culinary Experiences',
  leadSubtitle: 'Elevated Dining. Exceptional Hospitality.',
  heroImage: '/videos/ec.mp4',
  justifyLead: true,
  leadDescription:
    "At 48 Wall Street, every menu is thoughtfully crafted to complement the sophistication of your event. In partnership with one of New York City's premier hospitality teams, we deliver refined culinary experiences as memorable as the venue itself.",
  leadDescription2:
    'From elegant plated dinners and elevated cocktail receptions to chef-curated tasting menus, immersive international food stations, executive breakfasts, and lavish gala banquets, every offering is customized to reflect your vision, brand, and guest experience. Using the finest seasonal ingredients and impeccable presentation, our culinary team creates dining experiences that seamlessly blend creativity, luxury, and exceptional service.',
  leadDescription3:
    'With more than three decades of experience serving distinguished corporate clients, nonprofit organizations, fashion houses, financial institutions, and luxury weddings throughout Lower Manhattan, our hospitality professionals understand that flawless execution extends far beyond the cuisine. Every course is carefully timed, every table meticulously presented, and every guest served with the highest level of professionalism.',
  leadDescription4:
    'At 48 Wall Street, dining is more than a meal. It is an unforgettable experience designed to leave a lasting impression.',
  ctaTitle: "Let's Craft Something Extraordinary",
  ctaDescription:
    'At 48 Wall Street, we believe every event should be as distinctive as the people who host it. Our award-winning team combines exceptional hospitality, bespoke culinary experiences, immersive production, and timeless elegance to create celebrations that leave a lasting impression.\n\nSchedule a private consultation and discover the possibilities.',
  ctaButtonLabel: 'Schedule a Consultation',
  sections: [
    {
      id: 'breakfast',
      title: 'Breakfast',
      subtitle: 'Elevate the Morning Experience',
      description:
        "Begin the day with a thoughtfully curated breakfast designed to inspire productivity, connection, and conversation. At 48 Wall Street, our culinary team transforms the traditional morning meal into an elevated dining experience, featuring artisanal pastries, seasonal fruits, chef-inspired breakfast specialties, gourmet coffee selections, fresh-pressed juices, and elegant hot breakfast presentations.\n\nWhether hosting an executive board meeting, investor summit, leadership conference, or company-wide gathering, our customized breakfast menus are crafted with the finest ingredients and impeccable presentation, ensuring every guest begins the day with exceptional hospitality in one of New York City's most iconic historic venues.",
      images: [
        '/catering/IMG_3248.jpg',
        '/catering/20221020_093758.jpg',
        '/catering/IMG_0242.jpg',
      ],
      imageAlts: [
        'Catering display 1',
        'Catering display 2',
        'Catering display 3',
      ],
    },
    {
      id: 'lunch',
      title: 'Lunch',
      subtitle: 'Elevate the Midday Experience',
      description:
        'Transform your luncheon into a memorable culinary occasion where exceptional cuisine meets impeccable hospitality. At 48 Wall Street, our chefs create seasonally inspired lunch menus that balance sophistication with flavor, featuring beautifully presented plated meals, executive buffets, interactive chef stations, globally inspired cuisine, and fresh market selections.\n\nWhether entertaining clients or hosting executive meetings, corporate conferences, nonprofit galas, or full-day summits, we thoughtfully tailor every lunch experience to your event. Paired with refined service and the timeless elegance of our historic venue, each menu is designed to energize your guests, encourage meaningful connections, and leave a lasting impression long after the final course.',
      images: ['/catering/cl1.jpg', '/catering/cl2.jpg', '/catering/cl3.jpg'],
      imageAlts: [
        'Catering display 1',
        'Catering display 2',
        'Catering display 3',
      ],
    },
    {
      id: 'cocktail-reception',
      title: 'Cocktail Reception ',
      subtitle: 'Elevate the Cocktail Experience',
      description:
        "Celebrate in timeless style with a cocktail reception that blends exceptional cuisine, handcrafted cocktails, and refined hospitality. At 48 Wall Street, our culinary and beverage teams curate sophisticated receptions featuring artfully passed hors d'oeuvres, elegant chef-attended stations, premium charcuterie and seafood displays, seasonal small plates, and expertly crafted signature cocktails.\n\nWhether hosting a corporate reception, product launch, networking event, fashion show, gala, or wedding celebration, every cocktail experience is thoughtfully tailored to reflect your vision and impress your guests. Set against the iconic marble architecture and historic grandeur of 48 Wall Street, our white-glove service, premium bar program, and impeccable presentation create an atmosphere of effortless luxury, where every toast becomes part of an unforgettable evening.",
      images: [
        '/catering/cc1.jpg',
        '/catering/catering1.jpg',
        '/catering/_WWL8154.JPG',
        '/catering/DSC_4304.jpg',
      ],
      imageAlts: [
        'Catering display 1',
        'Catering display 2',
        'Catering display 3',
        'Catering display 4',
      ],
    },
    {
      id: 'seated-dinner',
      title: 'Seated Dinners',
      subtitle: 'An Elevated Fine Dining Experience',
      description:
        "Celebrate life's most memorable occasions with an elegant seated dining experience crafted to impress. At 48 Wall Street, every course is thoughtfully prepared using the finest seasonal ingredients and presented with impeccable attention to detail. From intimate executive dinners and black-tie galas to luxury weddings and charitable celebrations, our culinary team creates bespoke multi-course menus paired with exceptional wines and white-glove service. Surrounded by the timeless grandeur of our historic venue, every dinner becomes an unforgettable expression of sophistication and hospitality.",
      images: [
        '/catering/1.jpg',
        '/catering/2.jpg',
        '/catering/3.jpg',
        '/catering/4.jpg',
        '/catering/5.jpg',
      ],
      imageAlts: [
        'Catering display 1',
        'Catering display 2',
        'Catering display 3',
      ],
    },
    {
      id: 'curated-dining-stations',
      title: 'Curated Dining Stations',
      subtitle: 'Interactive Culinary Experiences',
      description:
        'Redefine traditional dining with a collection of beautifully designed chef-attended culinary stations that encourage guests to explore, engage, and indulge. From premium carving stations and fresh seafood displays to handcrafted pasta, global cuisine, artisan charcuterie, and decadent dessert presentations, each station is thoughtfully curated to deliver an immersive dining experience.\n\nPerfect for corporate receptions, luxury galas, weddings, and social celebrations, our interactive culinary experiences combine exceptional cuisine with elegant presentation, creating a vibrant atmosphere that inspires conversation and unforgettable moments.',
      images: [
        '/catering/3.jpeg',
        '/catering/6.jpg',
        '/catering/7.jpg',
        '/catering/8.jpg',
        '/catering/9.jpg',
      ],
      imageAlts: [
        'Catering display 1',
        'Catering display 2',
        'Catering display 3',
      ],
    },
  ],
  videoSection: {
    title: 'The Art of Exceptional Dining',
    subtitle: 'Where Culinary Excellence Becomes an Unforgettable Experience.',
    description:
      "Every unforgettable event deserves an equally unforgettable culinary experience. Our award-winning chefs and hospitality professionals create refined menus that celebrate craftsmanship, innovation, and impeccable service. Whether hosting a corporate gala, luxury wedding, fundraising event, or private celebration, each dish is designed to elevate your guests' experience while complementing the grandeur of our historic venue.",
    embedUrl: 'https://player.vimeo.com/video/1066736672?h=044c19c168',
    thumbnail: '/service/catering-video-screen-shot.jpg',
  },
};

export const eventRentalsData = {
  title: 'Event Rentals & Decor in Lower Manhattan',
  subtitle: 'Transforming a Historic Downtown Venue',
  leadTitle: 'Premium Event Rentals',
  heroImage: '/videos/er.mp4',
  leadDescription:
    'MME Worldwide is an industry leader for exclusive furniture and prop rentals, bringing over three decades of expertise to our historic downtown venue. They possess an inventory of unique props that can transform 48 Wall Street into anything from a winter wonderland to a tropical escape. Whether you envision a vibrant, modern setting or a sleek, elegant atmosphere, we understand how to complement the architecture of this unique event space. The space is as vast as our imagination, allowing us to outfit your corporate or private event on Wall Street with luxurious furniture and design elements that set the perfect stage.',
  sections: [
    {
      id: 'decor-rentals',
      title: 'Decor Rentals',
      description:
        'When it comes to transforming the space at 48 Wall Street, our team knows how to deliver a breathtaking experience for your guests. With a variety of décor accents and life-like props, MMEink will help you customize the look for your event. MMEink maintains an elite line of scenic décor that allows us to take your event to the next level. Our exclusive inventory is composed of chic lounges and décor accents that offer a variety of exciting furnishings to choose from. With a complete line of luxury rentals our fashionable décor items make styling your next event stress-free.',
      images: [
        '/service/decor/20231214_123920.jpg',
        '/service/decor/DJI_0923.JPG',
        '/service/decor/IMG_3420.jpg',
      ],
      imageAlts: ['decor display 1', 'decor display 2', 'decor display 3'],
    },
    {
      id: 'staging-rentals',
      title: 'Staging Rentals',
      description:
        'We provide a variety of staging services essential for a professional conference space in NYC. Whether it is a basic platform for a keynote speaker, a runway for a fashion show, or an elaborate setup for a musical performance, our design team and in-house custom fabrication shop handcraft the perfect solution. We help you determine the perfect look, ensuring that the focal point of your event commands attention.',
      images: [
        '/service/staging/20240229_134449.jpg',
        '/service/staging/DSC_0248.jpg',
        '/service/staging/IMG_2222.JPG',
      ],
      imageAlts: [
        'staging display 1',
        'staging display 2',
        'staging display 3',
        'staging display 4',
        'staging display 5',
      ],
    },
    {
      id: 'catering-rentals',
      title: 'Catering Rentals',
      description:
        '48 Wall Street accommodates all your service needs with a full line of catering rentals. We provide turnkey solutions for events, ranging from "back of the house" kitchen equipment like ovens and warmers to "front of the house" necessities. We ensure that your linens, tables, chairs, flatware, and stemware exude the style and elegance expected of a premier historic downtown venue, ensuring a seamless dining experience for your guests.',
      images: [
        '/service/catering/20240229_163524.jpg',
        '/service/catering/20241112_164451.jpg',
        '/service/catering/DJI_20231130_164612_1061.jpg',
        '/service/catering/IMG_7900.jpg',
        '/service/catering/JSV_3463.jpg',
      ],
      imageAlts: [
        'catering display 1',
        'catering display 2',
        'catering display 3',
        'catering display 4',
        'catering display 5',
      ],
    },
  ],
};

export const services = [
  {
    title: 'Dedicated Event Experts',
    body: 'Our staff brings decades of hospitality and production expertise to your event, ensuring flawless execution. We assist at every stage, managing complex logistics and operations so you can enjoy a completely stress-free and successful occasion.',
  },
  {
    title: 'Production & AV',
    body: 'Bring your event to life with cutting-edge audio-visual technology, professional lighting, and seamless production management. Our technical experts ensure flawless execution, from sound systems and LED displays to live streaming and immersive stage design.',
  },
  {
    title: 'Culinary & Mixology',
    body: 'Delight your guests with exceptional cuisine and handcrafted cocktails tailored to your event theme. Our culinary partners create memorable dining experiences, from elegant plated dinners to interactive food stations and signature drink menus.',
  },
];

export const videoGallery = [
  {
    src: 'https://vimeo.com/686078385/829c7b3957',
    alt: '48 Wall Sizzle',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/589508161/6fb71525d0',
    alt: '48 Wall Walkthrough',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/192678532/c1ec68adce',
    alt: 'Concourse Walkthrough',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/684435438/aacf6a4c59',
    alt: 'Cena Negra 2021 - 48 Wall',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/769214822/ccfb31f657',
    alt: 'Cena Negra 2022 - 48 Wall',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/795045791/91e67fc4dd',
    alt: 'Mongo DB - NYC Holiday REEL',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/787648338/f4be058968',
    alt: 'OKX - REEL',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/768701775/e039743fe9',
    alt: 'Answer the Call',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/764235747/213ddeb0d7',
    alt: 'Botify',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/762753010/2d966a69ed',
    alt: 'PIMCO - REEL',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/798551991/eef8a509ec',
    alt: 'NYC Juniors',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/868805662/eb1d32f592',
    alt: 'Work-Bench',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/828408575/165c2f95fb',
    alt: 'Cornell',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/839172315/d7befe76de',
    alt: 'SANYFW at 48 Wall Street',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/864819311/0ec3092440',
    alt: 'Alice + Olivia and SANYFW at 48 Wall Street',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/864132997/9fba97afac',
    alt: 'Alice + Olivia - NYFW',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/844376960/19bc7adcb4',
    alt: 'Wedding Walk Through',
    categories: 'wedding',
  },
  {
    src: 'https://vimeo.com/844376623/042e93122f',
    alt: 'Holiday Event Walk Through',
    categories: 'special',
  },
  {
    src: 'https://vimeo.com/1100132573/dd6080d494',
    alt: 'FPM',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/905757796/a0c8c40141',
    alt: 'Wieden+Kennedy Holiday Event',
    categories: 'corporate',
  },
  {
    src: 'https://vimeo.com/1019542531/db334a1c87',
    alt: 'OpenText',
    categories: 'corporate',
  },
];

export const sampleHotspots: Hotspot[] = [
  {
    id: 'hotspot-1',
    position: new THREE.Vector3(5, 1.5, 3),
    title: 'Master Bedroom',
    description:
      'Spacious master bedroom with ensuite bathroom and walk-in closet. Features large windows with natural light and premium hardwood flooring.',
    category: 'room' as const,
  },
  {
    id: 'hotspot-2',
    position: new THREE.Vector3(-4, 1.5, 2),
    title: 'Gourmet Kitchen',
    description:
      'Modern kitchen with stainless steel appliances, granite countertops, and custom cabinetry. Open concept design perfect for entertaining.',
    category: 'room' as const,
  },
  {
    id: 'hotspot-3',
    position: new THREE.Vector3(0, 1.5, -5),
    title: 'Living Room',
    description:
      'Open and bright living room with vaulted ceilings and fireplace. Perfect for family gatherings and relaxation.',
    category: 'room' as const,
  },
  {
    id: 'hotspot-4',
    position: new THREE.Vector3(3, 1, 4),
    title: 'Smart Home System',
    description:
      'Integrated smart home technology including climate control, security system, and automated lighting throughout the property.',
    category: 'feature' as const,
  },
  {
    id: 'hotspot-5',
    position: new THREE.Vector3(-3, 1, 1),
    title: 'Premium Appliances',
    description:
      'High-end appliances including double oven, wine cooler, and professional-grade range. All Energy Star certified.',
    category: 'appliance' as const,
  },
  {
    id: 'hotspot-6',
    position: new THREE.Vector3(2, 1.5, -3),
    title: 'Home Office',
    description:
      'Dedicated home office space with built-in shelving and desk. Perfect for remote work with excellent natural lighting.',
    category: 'room' as const,
  },
];

export const exportFormats = [
  {
    id: 'json' as ExportFormat,
    name: 'JSON',
    description: 'Full floor plan data with all settings',
    recommended: true,
  },
  {
    id: 'svg' as ExportFormat,
    name: 'SVG',
    description: 'Vector format for designers (no header)',
  },
  {
    id: 'png' as ExportFormat,
    name: 'PNG',
    description: 'Presentation-ready image with header & signature line',
  },
  {
    id: 'pdf' as ExportFormat,
    name: 'PDF',
    description: 'Client-ready PDF with header & approval section',
  },
];

export const sampleViewPoints: ViewPoint[] = [
  {
    id: 'view-1',
    name: 'Living Room View',
    position: new THREE.Vector3(-7, 1.5, 0),
    target: new THREE.Vector3(0, 1.5, 0),
  },
];

export const LEGEND_ITEMS: LegendItemConfig[] = [
  {
    category: 'Seating',
    label: 'Seating',
    color: '#2BACE2',
  },
  {
    category: 'Black Highboys',
    label: 'BLACK HIGH BOYS WITH STOOLS',
    color: '#000000',
  },
  {
    category: '36" Round Tables',
    label: '36" ROUND TABLES',
    color: '#2BACE2',
  },
  {
    category: '54" Round Tables',
    label: '54" ROUND TABLES',
    color: '#2BACE2',
  },
  {
    category: '60" Round Tables',
    label: '60" ROUND TABLES',
    color: '#2BACE2',
  },
  {
    category: '72" Round Tables',
    label: '72" ROUND TABLES',
    color: '#2BACE2',
  },
  {
    category: 'Swag Table',
    label: 'SWAG TABLE',
    color: '#2E3192',
  },
  {
    category: 'Award Table',
    label: 'AWARD TABLE',
    color: '#F9ED32',
  },
  {
    category: 'Square Table',
    label: 'Square Table',
    color: '#1E88E5',
  },
  {
    category: 'Auction Tables',
    label: 'AUCTION TABLES',
    color: '#6BC5A8',
  },
  {
    category: 'Registration',
    label: 'REGISTRATION TABLE',
    color: '#662D91',
  },
  {
    category: 'Conference Table',
    label: 'Conference Table',
    color: '#26A69A',
  },
  {
    category: 'Exhibitor Table 6ft',
    label: 'Exhibitor Table 6ft',
    color: '#FFCA28',
  },
  {
    category: 'Exhibitor Table 8ft',
    label: 'Exhibitor Table 8ft',
    color: '#FFA726',
  },
  {
    category: 'Sponsor Table 6ft',
    label: 'Sponsor Table 6ft',
    color: '#FF7043',
  },
  {
    category: 'Sponsor Table 8ft',
    label: 'Sponsor Table 8ft',
    color: '#EC407A',
  },
  {
    category: 'Banquet Table 6ft',
    label: 'Banquet Table 6ft',
    color: '#AB47BC',
  },
  {
    category: 'Banquet Table 8ft',
    label: 'Banquet Table 8ft',
    color: '#7E57C2',
  },
  {
    category: '4 ft Table',
    label: '4 ft Table',
    color: '#66BB6A',
  },
  {
    category: '6 ft Table',
    label: '6 ft Table',
    color: '#9CCC65',
  },
  {
    category: '8 ft Table',
    label: '8 ft Table',
    color: '#D4E157',
  },
  {
    category: 'Staging-1',
    label: "8'X8' STAGE",
    color: '#00A651',
  },
  {
    category: 'Staging-2',
    label: "8'X16' STAGE",
    color: '#00A651',
  },
  {
    category: 'Staging-3',
    label: "8'X24' STAGE",
    color: '#00A651',
  },
  {
    category: 'Podium / Mic',
    label: 'PODIUM / MIC',
    color: '#F7941D',
  },
  {
    category: "6' Bar",
    label: "6' BAR",
    color: '#4B77BE',
  },
  {
    category: "12' Bar",
    label: "12' BAR",
    color: '#00A79D',
  },
  {
    category: "18' Bar",
    label: "18' BAR",
    color: '#9E1F63',
  },
  {
    category: "24' Bar",
    label: "24' BAR",
    color: '#E67E22',
  },
  {
    category: 'Coffee',
    label: 'COFFEE',
    color: '#355855',
  },
  {
    category: 'Red Carpet',
    label: 'RED CARPET',
    color: '#AF2025',
  },
  {
    category: 'Blue Carpet',
    label: 'BLUE CARPET',
    color: '#0000FF',
  },
  {
    category: 'asian station',
    label: 'ASIAN STATION',
    color: '#39B54A',
  },
  {
    category: 'latin station',
    label: 'LATIN STATION',
    color: '#603913',
  },
  {
    category: 'pasta station',
    label: 'PASTA STATION',
    color: '#92278F',
  },
  {
    category: 'kosher station',
    label: 'KOSHER STATION',
    color: '#FFEA00',
  },
];

const USED_COLORS = [
  '#2BACE2', // Tables/Seating
  '#2E3192', // Swag Table
  '#00A651', // Staging
  '#F7941D', // Podium/Mic
  '#F9ED32', // Award Table
  '#355855', // Coffee
  '#39B54A', // Food 1
  '#6BC5A8', // Auction Tables
  '#4B77BE', // 6' Bar
  '#00A79D', // 12' Bar
  '#9E1F63', // 18' Bar
  '#E67E22', // 24' Bar
  '#662D91', // Registration
  '#AF2025', // Red Carpet
  '#603913', // Food 2
  '#92278F', // Food 3
  '#000000', // Black Highboys
];

export const CUSTOM_TABLE_COLORS = [
  '#8B4789',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#607D8B',
  '#E53935',
  '#D81B60',
  '#8E24AA',
  '#5E35B1',
  '#3949AB',
];

export const tools: { id: Tool; label: string; icon: React.ReactElement }[] = [
  // {
  //   id: 'select',
  //   label: 'Select',
  //   icon: (
  //     <svg
  //       className="h-5 w-5"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   id: 'wall',
  //   label: 'Wall',
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <circle cx="19" cy="5" r="2" />
  //       <circle cx="5" cy="19" r="2" />
  //       <path d="M5 17A12 12 0 0 1 17 5" />
  //     </svg>
  //   ),
  // },
  // {
  //   id: 'door',
  //   label: 'Door',
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <path d="M10 12h.01" />
  //       <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
  //       <path d="M2 20h20" />
  //     </svg>
  //   ),
  // },
  // {
  //   id: 'window',
  //   label: 'Window',
  //   icon: (
  //     <svg
  //       className="h-5 w-5"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M12 5v14 M4 12h16"
  //       />
  //     </svg>
  //   ),
  // },

  {
    id: 'pan',
    label: 'Pan',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
        />
      </svg>
    ),
  },
  // {
  //   id: 'curve-wall',
  //   label: 'Curved Wall',
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <path d="M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2" />
  //     </svg>
  //   ),
  // },
];

export const sidebarSocialLinks = [
  {
    name: 'Facebook',
    icon: '/icons/facebook.svg',
    href: 'https://www.facebook.com/48wallst/',
  },
  {
    name: 'Instagram',
    icon: '/icons/instagram.svg',
    href: 'https://www.instagram.com/48wallst/',
  },
];

export const vendorsData = {
  hero: {
    image: '/images/services-hero.jpg',
    eyebrow: '48 Wall Street',
    title: 'Exclusive Event Partners',
  },
  intro: [
    'At 48 Wall Street, extraordinary events are made possible through an exclusive collection of trusted hospitality, culinary, entertainment, and production partners. Together, our preferred partners deliver a seamless, full-service experience, combining world-class cuisine, award-winning production, innovative design, and exceptional entertainment under one historic roof.',
    'From intimate executive gatherings to international conferences, luxury weddings, fashion shows, and gala celebrations, our exclusive partners ensure every detail is executed with precision, creativity, and uncompromising excellence.',
  ],
  vendors: [
    {
      id: 'tardis-catering',
      name: "Tardi's Catering",
      tagline: 'Luxury Catering & Culinary Experiences',
      logo: '/logo/tardis-catering.png',
      href: 'https://www.tardiscatering.com/',
      description: [
        "For more than 30 years, Tardi's Catering has been creating exceptional culinary experiences throughout New York. Renowned for impeccable cuisine and white-glove hospitality, the team specializes in executive meetings, luxury weddings, corporate galas, fundraising events, and private celebrations.",
        "From elegant plated dinners and chef-curated tasting menus to lavish cocktail receptions and custom culinary concepts, every menu is thoughtfully crafted using the finest seasonal ingredients and tailored to each client's vision.",
      ],
      servicesLabel: 'Signature Services',
      services: [
        'Luxury Catering',
        'Corporate Dining',
        'Weddings & Social Celebrations',
        'Cocktail Receptions',
        'Chef Action Stations',
        'Premium Beverage Programs',
        'White-Glove Hospitality',
      ],
    },
    {
      id: 'fidi-hospitality',
      name: 'FiDi Hospitality',
      tagline: 'Hospitality Management & Guest Experience',
      logo: '/logo/fidi-hospitality.png',
      href: 'https://www.fidihospitality.com/',
      description: [
        'FiDi Hospitality is the exclusive hospitality management company for 48 Wall Street, delivering exceptional guest experiences from planning through execution. Every event is supported by experienced hospitality professionals who oversee operations, logistics, staffing, concierge services, and event management with meticulous attention to detail.',
        "Whether hosting an executive conference, luxury wedding, nonprofit gala, or international product launch, FiDi Hospitality ensures flawless execution and personalized service worthy of one of Manhattan's most prestigious event destinations.",
      ],
      servicesLabel: 'Services Include',
      services: [
        'Event Management',
        'Hospitality Operations',
        'Guest Experience',
        'Venue Logistics',
        'Concierge Services',
        'Staffing Solutions',
        'VIP & Executive Hospitality',
      ],
    },
    {
      id: 'mme-worldwide',
      name: 'MME Worldwide',
      tagline: 'Creative Production • Audio Visual • Design',
      logo: '/logo/mme-worldwide.png',
      darkLogoBg: true,
      href: 'https://www.mmeink.com/',
      description: [
        'MME Worldwide is the exclusive creative production partner of 48 Wall Street, providing comprehensive event production, immersive design, and technical execution for extraordinary events. Our award-winning team transforms ideas into unforgettable experiences through innovative technology, custom fabrication, and world-class production services.',
        'From corporate conferences and fashion shows to luxury weddings, brand activations, and experiential marketing events, MME Worldwide delivers every detail with creativity, precision, and flawless execution.',
      ],
      servicesLabel: 'Production & Creative Services',
      services: [
        'Audio Visual Production',
        'Intelligent Lighting Design',
        'Custom Staging & Runways',
        'LED Video Walls & Presentation Technology',
        'Scenic Design & Custom Fabrication',
        'Large Format Printing & Event Branding',
        'Floral Design & Luxury Décor',
        'Event Rentals & Specialty Furnishings',
        'Custom Props & Scenic Elements',
        'Rigging & Production Management',
        'Technical Direction & Show Calling',
      ],
    },
    {
      id: 'mikey-mike-entertainment',
      name: 'Mikey Mike Entertainment',
      tagline: 'Entertainment • Live Music • Interactive Experiences',
      logo: '/logo/mikey-mike-events.png',
      href: 'https://www.mikeymikeevents.com/',
      description: [
        'Mikey Mike Entertainment delivers unforgettable performances and immersive guest experiences that transform every celebration into a one-of-a-kind event. From sophisticated cocktail entertainment to headline performances, our curated roster features exceptional talent for every occasion.',
        "Whether you're seeking an elegant jazz trio, an award-winning dance band, celebrity DJ, cultural performers, strolling entertainers, or interactive themed experiences, our entertainment specialists create unforgettable moments that captivate every audience.",
      ],
      servicesLabel: 'Entertainment Services',
      services: [
        'Live Bands',
        'Solo Musicians',
        'Jazz Ensembles & Classical Performers',
        'International & Celebrity DJs',
        'Themed Strolling Performers',
        'Cultural Entertainment',
        'Interactive Games & Attractions',
        'Casino Nights',
        'Specialty Acts & Cirque Performers',
        'Celebrity Talent & Speakers',
        "Children's Entertainment",
        'Holiday & Seasonal Productions',
        'Custom Entertainment Programming',
      ],
    },
  ],
  closing: {
    title: 'One Venue. One Team. Endless Possibilities.',
    description:
      'With our exclusive collection of hospitality, culinary, entertainment, and production partners, 48 Wall Street offers a truly turnkey event experience, where every service is thoughtfully curated, expertly managed, and delivered with the highest standards of luxury, creativity, and professionalism.',
  },
};
