import { EventShowcaseProps } from '@/components/EventDetails';
import {
  Amenity,
  GPhoto,
  Photo,
  Product,
  TeamMember,
  Testimonial,
} from '@/types';
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

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'WE HAD OUR WEDDING RECEPTION AT 48 WALL STREET AND WORKING WITH THEIR TEAM WAS INCREDIBLE!',
    author: 'Sarah & Michael',
    event: 'Wedding Reception',
    details:
      '"Our operations manager made wedding planning a breeze - attentive, responsive, and focused on every detail to ensure perfection. She coordinated with all vendors, ran the show on our wedding day, and made it absolutely perfect. The venue itself is stunning with rooftop views, an immaculate reception room, and amazing city views. The food and service were exceptional - comparable to fine dining in Manhattan. The staff went above and beyond, ensuring everyone had a great experience. We wholeheartedly recommend 48 Wall Street - they made our dreams come true!"',
    image: '/testimonial/t_2.jpg',
    imageLabel: 'SARAH & MICHAEL WEDDING AT 48 WALL ST',
  },
  {
    id: 2,
    quote:
      'THE PERFECT VENUE FOR OUR CORPORATE EVENT. EXCEEDED ALL EXPECTATIONS!',
    author: 'Goldman Sachs',
    event: 'Corporate Gala',
    details:
      '"48 Wall Street provided an elegant and professional setting for our annual gala. The attention to detail was impeccable, from the stunning ballroom setup to the world-class catering. Our guests were thoroughly impressed with the venue\'s sophistication and the staff\'s professionalism. The event coordination team made the entire process seamless."',
    image: '/testimonial/t_3.jpg',
    imageLabel: 'GOLDMAN SACHS CORPORATE GALA',
  },
  {
    id: 3,
    quote:
      'AN UNFORGETTABLE BAR MITZVAH CELEBRATION IN A TRULY SPECTACULAR VENUE!',
    author: 'The Cohen Family',
    event: 'Bar Mitzvah',
    details:
      '"We couldn\'t have asked for a better venue for our son\'s Bar Mitzvah. The team at 48 Wall Street went above and beyond to make our celebration special. The space was beautifully decorated, the food was outstanding, and the service was impeccable. Every guest commented on how amazing the venue was. Thank you for making this milestone so memorable!"',
    image: '/testimonial/t_1.jpg',
    imageLabel: 'COHEN FAMILY BAR MITZVAH',
  },
];

export const amenities: Amenity[] = [
  {
    icon: '/icons/square-icon.svg',
    title: '29,000 SQFT.',
    description: 'Usable Space',
  },
  {
    icon: '/icons/ceiling-icon.svg',
    title: 'HIGH CEILING +',
    description: 'pin spot lighting system',
  },
  {
    icon: '/icons/door-icon.svg',
    title: 'PRIVATE ENTRANCE',
    description: 'w/ attended elevators',
  },
  {
    icon: '/icons/coat-icon.svg',
    title: 'COAT CHECK',
    description: 'attendants',
  },
  {
    icon: '/icons/people-icon.svg',
    title: 'EVENT MANAGER',
    description: 'on-site',
  },
  {
    icon: '/icons/dance-icon.svg',
    title: '2,000 SQFT.',
    description: 'Dance Floor',
  },
];

export const photos: Photo[] = [
  { src: '/gallery/6.jpg', alt: 'Wedding celebration', span: 'small' },
  { src: '/gallery/5.jpg', alt: 'Wedding celebration', span: 'tall' },
  { src: '/gallery/4.jpg', alt: 'Wedding celebration', span: 'large' },
  { src: '/gallery/7.jpg', alt: 'Wedding celebration', span: 'tall' },
  { src: '/gallery/8.jpg', alt: 'Wedding celebration', span: 'wide' },
  { src: '/gallery/9.jpg', alt: 'Wedding celebration', span: 'small' },
];

export const navItems = [
  {
    name: 'About',
    href: '/about',
    dropdown: [
      { name: 'About 48 Wall St', href: '/about' },
      { name: 'Demo Reel', href: '/about/event-video' },
      { name: 'Virtual Tour', href: '/about/virtual-tour-request' },
      { name: 'Digital Brochure', href: '/about/digital-brochure' },
      { name: 'Floor Plans', href: '/about/floor-plans' },
      { name: 'Rules & Regulations', href: '/about/rules-regulations' },
    ],
  },
  {
    name: 'Events',
    href: '/events/corporate',
    dropdown: [
      { name: 'Corporate Events', href: '/events/corporate' },
      { name: 'Conferences & Meetings', href: '/events/conferences' },
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
    href: '/rentals',
    dropdown: [
      { name: 'Event Production', href: '/services-production' },
      { name: 'Event Catering', href: '/services-catering' },
      { name: 'Event Rentals', href: '/rentals' },
    ],
  },
  {
    name: 'Rentals',
    href: '/rentals',
    // dropdown: [
    //   {
    //     name: 'Event Decor Rentals',
    //     href: 'https://www.eventdecorrentals.com/',
    //     external: true,
    //   },
    //   {
    //     name: 'Themed Prop Rentals',
    //     href: 'https://www.eventproprentals.com/',
    //     external: true,
    //   },
    //   {
    //     name: 'Interactive Event Rentals',
    //     href: 'https://www.interactiveeventrentals.com/',
    //     external: true,
    //   },
    // ],
  },
  {
    name: 'Gallery',
    href: '/gallery',
    // dropdown: [
    //   { name: 'Corporate Events', href: '/corporate-gallery' },
    //   {
    //     name: 'Conferences & Meetings',
    //     href: '/conferences-meetings-gallery',
    //   },
    //   { name: 'Fashion Shows', href: '/fashion-gallery' },
    //   { name: 'Weddings', href: '/wedding-gallery' },
    //   { name: 'Bar & Bat Mitzvahs', href: '/mitzvah-gallery' },
    //   { name: 'Holiday Events', href: '/holiday-gallery' },
    // ],
  },
  {
    name: 'Vendors',
    href: 'https://www.mmeink.com/',
    external: true,
    dropdown: [
      {
        name: 'MME Worldwide',
        href: 'https://www.mmeink.com/',
        external: true,
      },
      {
        name: 'Mikey Mike Events',
        href: 'https://www.mikeymikeevents.com/',
        external: true,
      },
      {
        name: "Tardi's Catering",
        href: 'https://www.tardiscatering.com/',
        external: true,
      },
    ],
  },
  { name: 'Location', href: '/location' },
  { name: 'Contact', href: '/contact' },
];

export const footerLinks = {
  about: [
    { name: 'Our Story', href: '/our-story' },
    { name: 'The Building', href: '/the-building' },
    { name: 'The Vaults', href: '/the-vaults' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Location', href: '/location' },
  ],
  events: [
    { name: 'Corporate Events', href: '/events-corporate' },
    { name: 'Fashion Shows', href: '/events-fashion-shows' },
    { name: 'Weddings', href: '/weddings' },
    { name: 'Bar & Bat Mitzvahs', href: '/bar-bat-mitzvahs' },
    { name: 'Holiday Events', href: '/holiday-events' },
  ],
  services: [
    { name: 'Event Production', href: '/services-production' },
    { name: 'Event Catering', href: '/services-catering' },
    { name: 'Event Rentals', href: '/services-rentals' },
    { name: 'Photo Gallery', href: '/photo-galleries' },
    { name: 'Virtual Tour', href: '/virtual-tour-request' },
  ],
};

export const socialLinks = [
  {
    icon: '/icons/facebook.svg',
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  { icon: '/icons/x.svg', href: 'https://x.com', label: 'X' },
  {
    icon: '/icons/instagram.svg',
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    icon: '/icons/youtube.svg',
    href: 'https://youtube.com',
    label: 'YouTube',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Micheal Tardi',
    title: 'Managing Partner',
    image: 'https://avatar.iran.liara.run/public/20',
  },
  {
    name: 'Micheal Tardi',
    title: 'General Manager and Operations Manager',
    image: 'https://avatar.iran.liara.run/public/20',
  },
  {
    name: 'Micheal Tardi',
    title: 'Executive Chef',
    image: 'https://avatar.iran.liara.run/public/20',
  },
];

export const galleryPhotos: GPhoto[] = [
  {
    src: '/gallery/14.jpg',
    alt: 'Rooftop ceremony',
    category: 'corporate',
    size: 'large',
  },
  {
    src: '/gallery/13.jpg',
    alt: 'Evening celebration',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/12.jpg',
    alt: 'Night cityscape',
    category: 'corporate',
    size: 'small',
  },
  {
    src: '/gallery/10.jpg',
    alt: 'Reception overview',
    category: 'corporate',
    size: 'small',
  },
  {
    src: '/gallery/9.jpg',
    alt: 'Couple celebration',
    category: 'corporate',
    size: 'small',
  },
  {
    src: '/gallery/8.jpg',
    alt: 'Wedding dance',
    category: 'corporate',
    size: 'small',
  },

  {
    src: '/gallery/15.jpg',
    alt: '360 interior',
    category: 'fashion',
    size: 'medium',
  },
  {
    src: '/gallery/18.jpg',
    alt: 'Event setup',
    category: 'fashion',
    size: 'small',
  },
  {
    src: '/gallery/19.jpg',
    alt: 'Corporate event',
    category: 'fashion',
    size: 'large',
  },
  {
    src: '/gallery/20.jpg',
    alt: 'Interior space',
    category: 'fashion',
    size: 'small',
  },
  {
    src: '/gallery/16.jpg',
    alt: 'Decorated venue',
    category: 'fashion',
    size: 'small',
  },
  {
    src: '/gallery/17.jpg',
    alt: 'Event atmosphere',
    category: 'fashion',
    size: 'large',
  },

  {
    src: '/gallery/21.jpg',
    alt: 'Skyline view',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/22.jpg',
    alt: 'Night lights',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/23.jpg',
    alt: 'City panorama',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/24.jpg',
    alt: 'Riverside view',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/25.jpg',
    alt: 'Sunset over city',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/26.jpg',
    alt: 'Sunset over city',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/27.jpg',
    alt: 'Sunset over city',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/28.jpg',
    alt: 'Sunset over city',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/29.jpg',
    alt: 'Sunset over city',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/30.jpg',
    alt: 'Sunset over city',
    category: 'wedding',
    size: 'large',
  },

  {
    src: '/gallery/31.jpg',
    alt: 'conference img',
    category: 'conference',
    size: 'medium',
  },
  {
    src: '/gallery/32.jpg',
    alt: 'conference img',
    category: 'conference',
    size: 'small',
  },
  {
    src: '/gallery/33.jpg',
    alt: 'conference img',
    category: 'conference',
    size: 'large',
  },
  {
    src: '/gallery/34.jpg',
    alt: 'conference img',
    category: 'conference',
    size: 'medium',
  },
  {
    src: '/gallery/35.jpg',
    alt: 'conference img',
    category: 'conference',
    size: 'small',
  },
  {
    src: '/gallery/36.jpg',
    alt: 'conference img',
    category: 'conference',
    size: 'large',
  },
  {
    src: '/gallery/37.jpg',
    alt: 'conference img',
    category: 'conference',
    size: 'medium',
  },

  {
    src: '/gallery/38.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'large',
  },
  {
    src: '/gallery/39.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'large',
  },
  {
    src: '/gallery/40.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/41.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'medium',
  },
  {
    src: '/gallery/42.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/43.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'wide',
  },
  {
    src: '/gallery/44.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'wide',
  },
  {
    src: '/gallery/45.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'medium',
  },
  {
    src: '/gallery/46.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/47.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },

  {
    src: '/gallery/48.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/49.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/50.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/51.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'small',
  },
  {
    src: '/gallery/52.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/53.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/54.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/55.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/56.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/57.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'small',
  },
  {
    src: '/gallery/58.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/59.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/60.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'small',
  },
];

export const locations = [
  {
    name: 'Metropolitan Grand Hall',
    address: '350 Fifth Avenue, New York, NY 10118',
    capacity: '500 guests',
    features: [
      'Rooftop Terrace',
      'Smart Lighting',
      'A/V Equipment',
      'Catering Kitchen',
    ],
    image: '/location/l1.jpg',
    type: 'Premium Venue',
    sqft: '8,500 sq ft',
  },
  {
    name: 'Riverside Event Center',
    address: '120 Riverside Drive, New York, NY 10024',
    capacity: '300 guests',
    features: [
      'Waterfront Views',
      'Outdoor Patio',
      'Eco-Friendly',
      'Flexible Layout',
    ],
    image:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop',
    type: 'Sustainable Space',
    sqft: '6,000 sq ft',
  },
  {
    name: 'The Industrial Loft',
    address: '88 Bleecker Street, New York, NY 10012',
    capacity: '200 guests',
    features: [
      'Exposed Brick',
      'Natural Light',
      'Modern Amenities',
      'Urban Chic',
    ],
    image:
      'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&auto=format&fit=crop',
    type: 'Boutique Venue',
    sqft: '4,200 sq ft',
  },
];

export const venues = [
  {
    icon: Calendar,
    title: 'Corporate Events',
    desc: 'Professional settings for conferences & meetings',
  },
  {
    icon: Sparkles,
    title: 'Weddings',
    desc: 'Elegant spaces for your special day',
  },
  {
    icon: Users,
    title: 'Social Events',
    desc: 'Perfect venues for celebrations & gatherings',
  },
  {
    icon: Star,
    title: 'Fashion Shows',
    desc: 'Contemporary spaces for runway events',
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
  { id: 'interactive', name: 'Interactive', icon: Dice5 },
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
    name: 'Velvet Lounge Set',
    category: 'furniture',
    theme: 'modern',
    price: 450,
    priceRange: 'mid',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop',
    sceneImage: '/rentals/sofa_1.jpg',
    rating: 4.8,
    reviews: 124,
    description: 'Luxurious velvet sofa set perfect for elegant lounges',
    features: ['Seats 8-10', 'Multiple colors', 'Premium fabric'],
    popular: true,
  },
  {
    id: 2,
    name: 'Gold Chiavari Chairs',
    category: 'furniture',
    theme: 'vintage',
    price: 12,
    priceRange: 'budget',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop',
    sceneImage:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 287,
    description: 'Classic gold chiavari chairs for sophisticated events',
    features: ['Set of 10', 'Cushioned seat', 'Stackable'],
    popular: true,
  },
  {
    id: 3,
    name: 'Neon Sign Collection',
    category: 'props',
    theme: 'modern',
    price: 250,
    priceRange: 'mid',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    sceneImage:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 93,
    description: 'Custom LED neon signs with various phrases',
    features: ['Custom text', 'RGB colors', 'Wireless setup'],
    popular: false,
  },
  {
    id: 4,
    name: 'Rustic Farm Tables',
    category: 'furniture',
    theme: 'rustic',
    price: 85,
    priceRange: 'budget',
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop',
    sceneImage:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 156,
    description: 'Authentic wooden farm tables with natural finish',
    features: ['Seats 8-12', 'Weathered wood', 'Indoor/Outdoor'],
    popular: false,
  },
  {
    id: 5,
    name: 'Casino Gaming Tables',
    category: 'interactive',
    theme: 'casino',
    price: 600,
    priceRange: 'premium',
    image: '/rentals/casino.jpg',
    sceneImage: '/rentals/casino_1.jpg',
    rating: 4.9,
    reviews: 201,
    description: 'Professional casino tables with dealers available',
    features: ['Blackjack, Poker, Roulette', 'Dealer included', 'Full setup'],
    popular: true,
  },
  {
    id: 6,
    name: 'Arcade Game Package',
    category: 'interactive',
    theme: 'arcade',
    price: 800,
    priceRange: 'premium',
    image:
      'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&auto=format&fit=crop',
    sceneImage:
      'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=800&auto=format&fit=crop',
    rating: 5.0,
    reviews: 178,
    description: 'Classic arcade games collection for ultimate fun',
    features: ['5+ games', 'Multiplayer', 'LED displays'],
    popular: true,
  },
  {
    id: 7,
    name: 'Tropical Palm Decor',
    category: 'props',
    theme: 'tropical',
    price: 180,
    priceRange: 'mid',
    image: '/rentals/tropical_decor_1.jpg',
    sceneImage: '/rentals/tropical_decor_2.jpg',
    rating: 4.5,
    reviews: 89,
    description: 'Artificial palm trees and tropical decorations',
    features: ['6-8ft tall', 'Realistic look', 'Easy setup'],
    popular: false,
  },
  {
    id: 8,
    name: 'LED Dance Floor',
    category: 'interactive',
    theme: 'modern',
    price: 1200,
    priceRange: 'premium',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop',
    sceneImage:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 143,
    description: 'Interactive LED dance floor with music sync',
    features: ['20x20ft', 'RGB patterns', 'Sound reactive'],
    popular: true,
  },
  {
    id: 9,
    name: 'Victorian Vintage Props',
    category: 'props',
    theme: 'vintage',
    price: 320,
    priceRange: 'mid',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop',
    sceneImage:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 67,
    description: 'Antique furniture and vintage prop collection',
    features: ['Period pieces', 'Photo-ready', 'Mix & match'],
    popular: false,
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
      'Floor-to-ceiling windows',
      'Built-in bar',
      'Premium A/V',
      'Private terrace',
    ],
    blueprint: '/floor-plans/empty_gm.png',
    furnished: '/floor-plans/furnished_gm.png',
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
      'Panoramic skyline views',
      'Modern lighting',
      'Outdoor access',
      'VIP section',
    ],
    blueprint:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop',
    furnished:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop',
    model3DEmpty: '/floor-plans/e.glb',
    model3DFurnished: '/floor-plans/f.glb',
  },
];

export const weddingData: EventShowcaseProps = {
  title: 'Unforgettable Wedding Celebrations',
  subtitle: 'Bespoke Wedding Planning',
  description:
    'From intimate garden ceremonies to grand ballroom receptions, we orchestrate every detail of your special day. Our expert planners transform your vision into reality with personalized design, seamless coordination, and flawless execution.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
      alt: 'Elegant wedding ceremony setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop',
      alt: 'Wedding reception table settings',
    },
    {
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1600&auto=format&fit=crop',
      alt: 'Beautiful wedding flowers',
    },
    {
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop',
      alt: 'Wedding venue exterior',
    },
    {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop',
      alt: 'Bride and groom first dance',
    },
    {
      src: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=1600&auto=format&fit=crop',
      alt: 'Wedding cake display',
    },
  ],
  tags: [
    'Full-Service Planning',
    'Venue Sourcing',
    'Floral Design',
    'Catering & Bar',
    'Photography & Video',
    'Live Entertainment',
    'Day-of Coordination',
    'Destination Weddings',
  ],
  stats: [
    { value: '500+', label: 'Weddings' },
    { value: '50+', label: 'Venues' },
    { value: '100%', label: 'Satisfaction' },
  ],
  info: [
    {
      heading: "What's included in full-service wedding planning?",
      body: 'Our full-service package covers everything from initial concept development to day-of coordination. This includes venue selection, vendor management, design consultation, budget planning, timeline creation, guest management, and unlimited communication throughout the planning process.',
    },
    {
      heading: 'How far in advance should we book?',
      body: "We recommend booking 12-18 months in advance for peak season dates (May-October). However, we've successfully planned beautiful weddings with as little as 3-6 months notice. The earlier you book, the more venue and vendor options will be available.",
    },
    {
      heading: 'Do you handle destination weddings?',
      body: 'Absolutely! We specialize in destination weddings and have planned celebrations across the globe. We handle all logistics including travel coordination, local vendor sourcing, cultural considerations, and on-site management to ensure your destination wedding is stress-free.',
    },
    {
      heading: 'Can we customize our package?',
      body: "Yes! Every wedding is unique, and we offer flexible packages that can be tailored to your specific needs and budget. Whether you need full planning, partial coordination, or just day-of management, we'll create a custom solution for you.",
    },
  ],
  primaryCta: {
    label: 'Schedule Consultation',
  },
  secondaryCta: {
    label: 'View Wedding Portfolio',
  },
};

export const corporateData: EventShowcaseProps = {
  title: 'Corporate Events That Inspire',
  subtitle: 'Executive Event Production',
  description:
    'Elevate your brand with impactful corporate experiences. From product launches to annual conferences, we deliver professional events that engage audiences, strengthen culture, and drive business results with precision and innovation.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop',
      alt: 'Corporate conference setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop',
      alt: 'Professional networking event',
    },
    {
      src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1600&auto=format&fit=crop',
      alt: 'Corporate presentation stage',
    },
    {
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop',
      alt: 'Business meeting space',
    },
    {
      src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1600&auto=format&fit=crop',
      alt: 'Corporate gala dinner',
    },
    {
      src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=1600&auto=format&fit=crop',
      alt: 'Team building event',
    },
  ],
  tags: [
    'Product Launches',
    'Annual Conferences',
    'Team Building',
    'Awards Ceremonies',
    'Executive Retreats',
    'Trade Shows',
    'Investor Events',
    'Brand Activations',
  ],
  stats: [
    { value: '1000+', label: 'Events' },
    { value: '250K+', label: 'Attendees' },
    { value: '95%', label: 'Client Return' },
  ],
  info: [
    {
      heading: 'What types of corporate events do you handle?',
      body: 'We manage the full spectrum of corporate events including product launches, conferences, trade shows, executive retreats, holiday parties, team building experiences, shareholder meetings, and company milestones. Each event is tailored to your brand identity and business objectives.',
    },
    {
      heading: 'How do you handle multi-city or global events?',
      body: 'Our team has extensive experience coordinating simultaneous events across multiple locations. We use centralized planning systems, local vendor networks, and dedicated regional coordinators to ensure consistency in quality and branding across all venues.',
    },
    {
      heading: 'Can you integrate hybrid and virtual components?',
      body: 'Yes! We specialize in hybrid events that seamlessly blend in-person and virtual experiences. We provide full AV production, live streaming, interactive platforms, and engagement tools to ensure remote attendees have an equally compelling experience.',
    },
    {
      heading: 'How do you measure event ROI?',
      body: 'We work with you to define key performance indicators before the event, then provide comprehensive post-event analytics including attendance metrics, engagement data, lead generation, social media reach, and attendee feedback to demonstrate clear business value.',
    },
  ],
  primaryCta: {
    label: 'Request Proposal',
  },
  secondaryCta: {
    label: 'Case Studies',
  },
};

export const conferenceData: EventShowcaseProps = {
  title: 'Conferences & Meetings Excellence',
  subtitle: 'Professional Meeting Management',
  description:
    'Transform your business gatherings into productive, memorable experiences. We handle every aspect of conference planning—from registration and logistics to breakout sessions and networking events—ensuring smooth execution and maximum attendee engagement.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1600&auto=format&fit=crop',
      alt: 'Conference main stage',
    },
    {
      src: 'https://images.unsplash.com/photo-1511578194003-00c80e42dc9b?q=80&w=1600&auto=format&fit=crop',
      alt: 'Meeting room setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1600&auto=format&fit=crop',
      alt: 'Conference attendees networking',
    },
    {
      src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop',
      alt: 'Panel discussion',
    },
    {
      src: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1600&auto=format&fit=crop',
      alt: 'Registration desk',
    },
    {
      src: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1600&auto=format&fit=crop',
      alt: 'Conference breakout session',
    },
  ],
  tags: [
    'Industry Conferences',
    'Annual Meetings',
    'Symposiums',
    'Workshops',
    'Board Meetings',
    'Summit Events',
    'Training Sessions',
    'Panel Discussions',
  ],
  stats: [
    { value: '350+', label: 'Conferences' },
    { value: '500K+', label: 'Participants' },
    { value: '4.9/5', label: 'Rating' },
  ],
  info: [
    {
      heading: 'What makes a successful conference?',
      body: 'A successful conference combines clear objectives, engaging content, seamless logistics, and meaningful networking opportunities. We focus on attendee experience, speaker coordination, technology integration, and creating memorable moments that drive knowledge sharing and relationship building.',
    },
    {
      heading: 'How do you handle registration and attendee management?',
      body: 'We provide comprehensive registration solutions including custom event websites, online ticketing, badge printing, attendee tracking, and mobile event apps. Our systems integrate with CRM platforms and provide real-time analytics on registration trends and attendee behavior.',
    },
    {
      heading: 'What AV and technology capabilities do you offer?',
      body: 'Our production team delivers full AV support including main stage production, breakout room setups, live streaming, recording services, interactive displays, audience response systems, and technical support staff. We ensure your message is delivered clearly and professionally.',
    },
    {
      heading: 'Can you help with speaker management?',
      body: 'Absolutely! We handle all aspects of speaker coordination including recruitment, travel arrangements, presentation preparation, rehearsals, green room management, and technical support. We ensure every speaker is prepared and positioned for success.',
    },
  ],
  primaryCta: {
    label: 'Plan Your Conference',
  },
  secondaryCta: {
    label: 'Download Brochure',
  },
};

export const fashionData: EventShowcaseProps = {
  title: 'Runway to Reality',
  subtitle: 'Fashion Show Production',
  description:
    'Create unforgettable fashion experiences that captivate audiences and elevate brands. From intimate trunk shows to major runway productions, we deliver flawless execution with dramatic staging, perfect lighting, and impeccable timing that puts your collection center stage.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
      alt: 'Fashion runway show',
    },
    {
      src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
      alt: 'Models backstage',
    },
    {
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
      alt: 'Fashion show audience',
    },
    {
      src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
      alt: 'Runway setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
      alt: 'Fashion presentation',
    },
    {
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
      alt: 'Designer boutique event',
    },
  ],
  tags: [
    'Runway Shows',
    'Fashion Week',
    'Collection Launches',
    'Trunk Shows',
    'Pop-Up Events',
    'Brand Activations',
    'Designer Showcases',
    'Media Events',
  ],
  stats: [
    { value: '200+', label: 'Shows' },
    { value: '1500+', label: 'Models' },
    { value: '50K+', label: 'Audience' },
  ],
  info: [
    {
      heading: 'What goes into producing a fashion show?',
      body: 'Fashion show production is a complex orchestration of runway design, lighting, sound, model casting, choreography, backstage coordination, front row seating, media management, and timing. We handle every detail from concept to curtain call, ensuring your collection makes a powerful statement.',
    },
    {
      heading: 'How do you handle model casting and coordination?',
      body: 'We work with top modeling agencies to cast the perfect faces for your brand. Our team manages all aspects including fittings, rehearsals, backstage logistics, dresser coordination, and real-time show management. We ensure smooth transitions and flawless presentations.',
    },
    {
      heading: 'Can you help with Fashion Week events?',
      body: 'Yes! We have extensive experience producing shows during major fashion weeks in New York, LA, and beyond. We handle venue selection, permit coordination, VIP guest management, press relations, live streaming, and all production elements to ensure your show stands out.',
    },
    {
      heading: 'What about intimate or alternative format events?',
      body: 'We specialize in creative alternatives to traditional runways including pop-up presentations, intimate salon shows, immersive brand experiences, digital fashion shows, and hybrid events. We work with your vision and budget to create impactful fashion moments.',
    },
  ],
  primaryCta: {
    label: 'Book Your Show',
  },
  secondaryCta: {
    label: 'View Past Shows',
  },
};

export const nonprofitData: EventShowcaseProps = {
  title: 'Events That Make a Difference',
  subtitle: 'Non-Profit Event Management',
  description:
    'Maximize your impact and fundraising potential with expertly crafted charity events. We understand the unique challenges of non-profit organizations and deliver meaningful experiences that inspire generosity, engage donors, and amplify your mission.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop',
      alt: 'Charity gala event',
    },
    {
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop',
      alt: 'Fundraising auction',
    },
    {
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop',
      alt: 'Benefit dinner',
    },
    {
      src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop',
      alt: 'Community event',
    },
    {
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop',
      alt: 'Awards ceremony',
    },
    {
      src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1600&auto=format&fit=crop',
      alt: 'Volunteer appreciation',
    },
  ],
  tags: [
    'Charity Galas',
    'Fundraising Events',
    'Benefit Auctions',
    'Donor Cultivation',
    'Awards Dinners',
    'Community Events',
    'Walkathons',
    'Volunteer Events',
  ],
  stats: [
    { value: '$50M+', label: 'Raised' },
    { value: '400+', label: 'Events' },
    { value: '150+', label: 'Organizations' },
  ],
  info: [
    {
      heading: 'How can you help maximize fundraising results?',
      body: 'We employ proven fundraising strategies including strategic donor cultivation, compelling program design, effective auction management, paddle raise coordination, and sponsorship development. Our goal is to create emotionally engaging experiences that inspire generosity while keeping costs efficient.',
    },
    {
      heading: "What's included in non-profit event planning?",
      body: "Our services include budget development, venue selection, sponsor management, auction procurement, ticketing systems, program design, AV production, volunteer coordination, and post-event reporting. We tailor our approach to your organization's size, mission, and fundraising goals.",
    },
    {
      heading: 'Do you offer discounted rates for non-profits?',
      body: "Yes! We're passionate about supporting non-profit missions and offer special pricing structures for charitable organizations. We also help identify cost-saving opportunities through in-kind donations, volunteer support, and strategic vendor partnerships.",
    },
    {
      heading: 'Can you help with virtual or hybrid fundraising events?',
      body: "Absolutely! We've successfully produced virtual galas, hybrid auctions, and online giving campaigns that reach wider audiences and reduce overhead costs. We provide streaming production, virtual bid platforms, and engagement tools that make remote participation meaningful.",
    },
  ],
  primaryCta: {
    label: 'Discuss Your Mission',
  },
  secondaryCta: {
    label: 'Success Stories',
  },
};

export const mitzvahData: EventShowcaseProps = {
  title: 'Bar & Bat Mitzvah Celebrations',
  subtitle: 'Meaningful Coming-of-Age Events',
  description:
    "Honor this sacred milestone with celebrations that blend tradition and personal style. We create unforgettable Bar and Bat Mitzvah experiences that reflect your family's values, your teen's personality, and the joy of this momentous occasion.",
  images: [
    {
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop',
      alt: 'Bar Mitzvah celebration at the Western Wall',
    },
    {
      src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1600&auto=format&fit=crop',
      alt: 'Party decor setup',
    },
    {
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop',
      alt: 'Dance floor celebration',
    },
    {
      src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1600&auto=format&fit=crop',
      alt: 'Teen party atmosphere',
    },
    {
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop',
      alt: 'Themed decorations',
    },
    {
      src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
      alt: 'Dessert table display',
    },
  ],
  tags: [
    'Bar Mitzvahs',
    'Bat Mitzvahs',
    'Theme Design',
    'Teen Entertainment',
    'Custom Decor',
    'Photo Experiences',
    'Catering Services',
    'Full Planning',
  ],
  stats: [
    { value: '300+', label: 'Celebrations' },
    { value: '15K+', label: 'Happy Guests' },
    { value: '4.9/5', label: 'Family Rating' },
  ],
  info: [
    {
      heading: 'How do you balance tradition with teen preferences?',
      body: "We excel at creating celebrations that honor religious traditions while incorporating your teen's interests and style. We work closely with both parents and the bar/bat mitzvah to design an event that feels authentic, age-appropriate, and special—from the service to the party.",
    },
    {
      heading: 'What theme and design options are available?',
      body: "The possibilities are endless! From sports and music themes to elegant soirées, we can bring any vision to life. Popular themes include Hollywood, travel, gaming, music festivals, and custom designs based on your teen's hobbies. We handle all decor, lighting, entertainment, and experiential elements.",
    },
    {
      heading: 'How do you keep teens and adults entertained?',
      body: 'We create programming that engages all generations. This includes age-appropriate entertainment for teens (DJs, dancers, photo experiences, games), comfortable spaces for adults to socialize, and moments that bring everyone together. We carefully curate the energy and flow of the entire event.',
    },
    {
      heading: "What's the typical planning timeline?",
      body: "We recommend starting 12-18 months ahead, especially for popular dates. This ensures venue availability and allows time for custom design elements. However, we've successfully planned beautiful celebrations with shorter timelines when needed.",
    },
  ],
  primaryCta: {
    label: 'Start Planning',
  },
  secondaryCta: {
    label: 'Theme Gallery',
  },
};

export const holidayData: EventShowcaseProps = {
  title: 'Holiday Events That Sparkle',
  subtitle: 'Seasonal Celebration Experts',
  description:
    'Transform the holidays into magical memories with expertly crafted seasonal celebrations. From corporate holiday parties to family gatherings, we infuse every event with festive spirit, creative themes, and meticulous attention to detail that captures the joy of the season.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1600&auto=format&fit=crop',
      alt: 'Holiday party decor',
    },
    {
      src: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?q=80&w=1600&auto=format&fit=crop',
      alt: 'Festive table settings',
    },
    {
      src: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=1600&auto=format&fit=crop',
      alt: 'Christmas celebration',
    },
    {
      src: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?q=80&w=1600&auto=format&fit=crop',
      alt: 'Holiday lights display',
    },
    {
      src: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1600&auto=format&fit=crop',
      alt: 'Winter wonderland theme',
    },
    {
      src: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=1600&auto=format&fit=crop',
      alt: 'New Year celebration',
    },
  ],
  tags: [
    'Corporate Parties',
    'Holiday Galas',
    'New Year Events',
    'Winter Wonderland',
    'Seasonal Themes',
    'Gift Programs',
    'Entertainment',
    'Festive Catering',
  ],
  stats: [
    { value: '600+', label: 'Holiday Events' },
    { value: '100K+', label: 'Guests Served' },
    { value: '98%', label: 'Rebook Rate' },
  ],
  info: [
    {
      heading: 'What holiday events do you specialize in?',
      body: "We plan celebrations for all major holidays including Christmas parties, Hanukkah celebrations, New Year's Eve galas, Thanksgiving dinners, Halloween events, and more. We also create custom seasonal experiences for corporate year-end parties, family reunions, and community gatherings.",
    },
    {
      heading: 'How early should we book for holiday events?',
      body: 'Holiday season is our busiest time! We recommend booking by early summer (June-August) for winter holiday events to secure your preferred venue and vendors. For Thanksgiving and Halloween, booking 3-4 months ahead is ideal.',
    },
    {
      heading: 'Can you incorporate company branding into holiday events?',
      body: 'Absolutely! We seamlessly blend holiday themes with corporate branding for professional yet festive experiences. This includes custom decor elements, branded gift programs, company colors in the design, and recognition moments that celebrate your team and business achievements.',
    },
    {
      heading: 'What makes your holiday events special?',
      body: 'We go beyond typical holiday decorations to create immersive seasonal experiences. Think live ice sculptures, hot chocolate bars, carolers, gift wrapping stations, photo experiences with Santa, interactive activities, and unexpected touches that make your event truly memorable.',
    },
  ],
  primaryCta: {
    label: 'Plan Holiday Event',
  },
  secondaryCta: {
    label: 'Seasonal Ideas',
  },
};

export const filmtvData: EventShowcaseProps = {
  title: 'Film & TV Production Events',
  subtitle: 'Entertainment Industry Specialists',
  description:
    'From red carpet premieres to wrap parties, we bring Hollywood-level production expertise to every entertainment industry event. Our team understands the unique demands of film and television celebrations and delivers flawless execution with style and discretion.',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1600&auto=format&fit=crop',
      alt: 'Red carpet premiere',
    },
    {
      src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
      alt: 'Film screening event',
    },
    {
      src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
      alt: 'Entertainment industry party',
    },
    {
      src: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=1600&auto=format&fit=crop',
      alt: 'Movie theater premiere',
    },
    {
      src: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1600&auto=format&fit=crop',
      alt: 'VIP after party',
    },
    {
      src: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=1600&auto=format&fit=crop',
      alt: 'Production wrap party',
    },
  ],
  tags: [
    'Red Carpet Premieres',
    'Wrap Parties',
    'Screening Events',
    'Industry Showcases',
    'Cast & Crew Events',
    'Awards Shows',
    'Press Junkets',
    'VIP Hospitality',
  ],
  stats: [
    { value: '150+', label: 'Productions' },
    { value: '50+', label: 'Premieres' },
    { value: '25K+', label: 'VIP Guests' },
  ],
  info: [
    {
      heading: 'What makes film and TV events unique?',
      body: 'Entertainment industry events require special expertise in managing high-profile guests, media coordination, security protocols, and creating buzz-worthy moments. We understand the nuances of talent management, press relations, and creating experiences that generate excitement while maintaining professionalism.',
    },
    {
      heading: 'How do you handle red carpet and media logistics?',
      body: 'We coordinate every aspect of media events including step-and-repeat setup, photographer positioning, press line flow, talent escorts, interview coordination, and live streaming. Our team ensures smooth operations while maximizing media coverage and maintaining VIP guest comfort.',
    },
    {
      heading: 'Can you manage confidential or embargoed events?',
      body: "Absolutely. We're experienced in handling sensitive projects with strict NDAs, embargoed content, and confidential guest lists. Our team maintains the highest levels of discretion and implements security measures appropriate for high-profile entertainment industry gatherings.",
    },
    {
      heading: 'What venues do you work with?',
      body: "We have relationships with iconic entertainment venues including theaters, soundstages, Hollywood landmarks, rooftop spaces, and exclusive private venues. Whether you need an intimate screening room or a large-scale premiere venue, we'll find the perfect setting for your production celebration.",
    },
  ],
  primaryCta: {
    label: 'Discuss Your Project',
  },
  secondaryCta: {
    label: 'Production Portfolio',
  },
};

export const brochurePages = [
  { id: 1, image: '/brochures/48Brochure-2025.v7_page-0001.jpg' },
  { id: 2, image: '/brochures/48Brochure-2025.v7_page-0002.jpg' },
  { id: 3, image: '/brochures/48Brochure-2025.v7_page-0003.jpg' },
  { id: 4, image: '/brochures/48Brochure-2025.v7_page-0004.jpg' },
  { id: 5, image: '/brochures/48Brochure-2025.v7_page-0005.jpg' },
  { id: 6, image: '/brochures/48Brochure-2025.v7_page-0006.jpg' },
  { id: 7, image: '/brochures/48Brochure-2025.v7_page-0007.jpg' },
  { id: 8, image: '/brochures/48Brochure-2025.v7_page-0008.jpg' },
  { id: 9, image: '/brochures/48Brochure-2025.v7_page-0009.jpg' },
  { id: 10, image: '/brochures/48Brochure-2025.v7_page-0010.jpg' },
  { id: 11, image: '/brochures/48Brochure-2025.v7_page-0011.jpg' },
  { id: 12, image: '/brochures/48Brochure-2025.v7_page-0012.jpg' },
  { id: 13, image: '/brochures/48Brochure-2025.v7_page-0013.jpg' },
  { id: 14, image: '/brochures/48Brochure-2025.v7_page-0014.jpg' },
  { id: 15, image: '/brochures/48Brochure-2025.v7_page-0015.jpg' },
  { id: 16, image: '/brochures/48Brochure-2025.v7_page-0016.jpg' },
  { id: 17, image: '/brochures/48Brochure-2025.v7_page-0017.jpg' },
  { id: 18, image: '/brochures/48Brochure-2025.v7_page-0018.jpg' },
  { id: 19, image: '/brochures/48Brochure-2025.v7_page-0019.jpg' },
  { id: 20, image: '/brochures/48Brochure-2025.v7_page-0020.jpg' },
  { id: 21, image: '/brochures/48Brochure-2025.v7_page-0021.jpg' },
  { id: 22, image: '/brochures/48Brochure-2025.v7_page-0022.jpg' },
  { id: 23, image: '/brochures/48Brochure-2025.v7_page-0023.jpg' },
  { id: 24, image: '/brochures/48Brochure-2025.v7_page-0024.jpg' },
  { id: 25, image: '/brochures/48Brochure-2025.v7_page-0025.jpg' },
  { id: 26, image: '/brochures/48Brochure-2025.v7_page-0026.jpg' },
  { id: 27, image: '/brochures/48Brochure-2025.v7_page-0027.jpg' },
  { id: 28, image: '/brochures/48Brochure-2025.v7_page-0028.jpg' },
  { id: 29, image: '/brochures/48Brochure-2025.v7_page-0029.jpg' },
  { id: 30, image: '/brochures/48Brochure-2025.v7_page-0030.jpg' },
  { id: 31, image: '/brochures/48Brochure-2025.v7_page-0031.jpg' },
  { id: 32, image: '/brochures/48Brochure-2025.v7_page-0032.jpg' },
];
