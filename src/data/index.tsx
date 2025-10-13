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
      { name: 'Demo Reel', href: '/event-video' },
      { name: 'Virtual Tour', href: '/virtual-tour-request' },
      { name: 'Digital Brochure', href: '/48wall-brochure' },
      { name: 'Floor Plans', href: '/about/floor-plans' },
      { name: 'Rules & Regulations', href: '/rules-regulations' },
    ],
  },
  {
    name: 'Events',
    href: '/events',
    dropdown: [
      { name: 'Corporate Events', href: '/events-corporate' },
      { name: 'Conferences & Meetings', href: '/conferences' },
      { name: 'Fashion Shows', href: '/events-fashion-shows' },
      { name: 'Film & TV Shoots', href: '/events-film-shoots' },
      { name: 'Non-Profit Events', href: '/events-non-profit' },
      { name: 'Weddings', href: '/weddings' },
      { name: 'Bar & Bat Mitzvahs', href: '/bar-bat-mitzvahs' },
      { name: 'Holiday Events', href: '/holiday-events' },
    ],
  },
  {
    name: 'Services',
    href: '/services',
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
    href: '/our-vendors',
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
