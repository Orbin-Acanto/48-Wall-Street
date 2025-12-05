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
      'We had our company holiday party at 48 Wall Street last night. The space is amazing - large and beautifully decorated, with comfortable seating and great lighting. The staff were outstanding and attentive. Highly recommend!',
    author: 'Okone M.',
    event: 'Wedding Reception',
    details:
      '"Our operations manager made wedding planning a breeze - attentive, responsive, and focused on every detail to ensure perfection. She coordinated with all vendors, ran the show on our wedding day, and made it absolutely perfect. The venue itself is stunning with rooftop views, an immaculate reception room, and amazing city views. The food and service were exceptional - comparable to fine dining in Manhattan. The staff went above and beyond, ensuring everyone had a great experience. We wholeheartedly recommend 48 Wall Street - they made our dreams come true!"',
    image: '/testimonial/t_2.jpg',
    imageLabel: 'SARAH & MICHAEL WEDDING AT 48 WALL ST',
  },
  {
    id: 2,
    quote:
      'I was very impressed with the entire 48 Wall Street team. The event always goes so fast and when I replay the evening in my head, what stands out most, are the smiles and support from everyone.',
    author: 'Rose T.',
    event: 'Corporate Gala',
    details:
      '"48 Wall Street provided an elegant and professional setting for our annual gala. The attention to detail was impeccable, from the stunning ballroom setup to the world-class catering. Our guests were thoroughly impressed with the venue\'s sophistication and the staff\'s professionalism. The event coordination team made the entire process seamless."',
    image: '/testimonial/t_3.jpg',
    imageLabel: 'GOLDMAN SACHS CORPORATE GALA',
  },
  {
    id: 3,
    quote:
      'We had a lot of elements at play that made our event sort of tricky to navigate. The night itself went off without a hitch. The food was incredible, the entertainment was excellent, and my entire staff is still talking about it. Highly recommend them.',
    author: 'Taylyn R.',
    event: 'Bar Mitzvah',
    details:
      '"We couldn\'t have asked for a better venue for our son\'s Bar Mitzvah. The team at 48 Wall Street went above and beyond to make our celebration special. The space was beautifully decorated, the food was outstanding, and the service was impeccable. Every guest commented on how amazing the venue was. Thank you for making this milestone so memorable!"',
    image: '/testimonial/t_1.jpg',
    imageLabel: 'COHEN FAMILY BAR MITZVAH',
  },
  {
    id: 4,
    quote:
      '48 Wall Street is beautifully unique and added to the energetic atmosphere.',
    author: 'Shane C.',
    event: 'Bar Mitzvah',
    details:
      '"We couldn\'t have asked for a better venue for our son\'s Bar Mitzvah. The team at 48 Wall Street went above and beyond to make our celebration special. The space was beautifully decorated, the food was outstanding, and the service was impeccable. Every guest commented on how amazing the venue was. Thank you for making this milestone so memorable!"',
    image: '/testimonial/t_1.jpg',
    imageLabel: 'COHEN FAMILY BAR MITZVAH',
  },
  {
    id: 5,
    quote:
      'We recently hosted a conference at the historic 48 Wall Street, and it was outstanding. Every detail was meticulously managed, from the seamless setup to the excellent catering.',
    author: 'Nicholas L.',
    event: 'Bar Mitzvah',
    details:
      '"We couldn\'t have asked for a better venue for our son\'s Bar Mitzvah. The team at 48 Wall Street went above and beyond to make our celebration special. The space was beautifully decorated, the food was outstanding, and the service was impeccable. Every guest commented on how amazing the venue was. Thank you for making this milestone so memorable!"',
    image: '/testimonial/t_1.jpg',
    imageLabel: 'COHEN FAMILY BAR MITZVAH',
  },
  {
    id: 6,
    quote:
      "We held our daughter's wedding at 48 Wall Street and could not have been happier.",
    author: 'Helen W.',
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

export const navItems = [
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

export const galleryPhotos: GPhoto[] = [
  {
    src: '/gallery/corporate/ (2).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },
  {
    src: '/gallery/corporate/ (1).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },

  {
    src: '/gallery/corporate/ (3).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/corporate/ (4).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'wide',
  },
  {
    src: '/gallery/corporate/ (5).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'small',
  },
  {
    src: '/gallery/corporate/ (6).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },
  {
    src: '/gallery/corporate/ (23).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/corporate/ (7).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/corporate/ (8).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'small',
  },
  {
    src: '/gallery/corporate/ (11).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },
  {
    src: '/gallery/corporate/ (9).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'wide',
  },
  {
    src: '/gallery/corporate/ (10).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },

  {
    src: '/gallery/corporate/ (12).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },

  {
    src: '/gallery/corporate/ (18).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },

  {
    src: '/gallery/corporate/ (15).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },
  {
    src: '/gallery/corporate/ (16).JPG',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/corporate/ (13).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'small',
  },
  {
    src: '/gallery/corporate/ (17).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },
  {
    src: '/gallery/corporate/ (25).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/corporate/ (19).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/corporate/ (20).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/corporate/ (21).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'small',
  },
  {
    src: '/gallery/corporate/ (22).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'wide',
  },

  {
    src: '/gallery/corporate/ (24).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },

  {
    src: '/gallery/corporate/ (26).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'medium',
  },
  {
    src: '/gallery/corporate/ (14).jpg',
    alt: 'corporate',
    category: 'corporate',
    size: 'large',
  },
  {
    src: '/gallery/fashion/ (1).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'large',
  },
  {
    src: '/gallery/fashion/ (7).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'medium',
  },
  {
    src: '/gallery/fashion/ (6).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'large',
  },
  {
    src: '/gallery/fashion/ (8).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'medium',
  },

  {
    src: '/gallery/fashion/ (11).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'medium',
  },
  {
    src: '/gallery/fashion/ (1).webp',
    alt: 'fashion',
    category: 'fashion',
    size: 'large',
  },
  {
    src: '/gallery/fashion/ (2).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'medium',
  },
  {
    src: '/gallery/fashion/ (3).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'large',
  },
  {
    src: '/gallery/fashion/ (4).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'small',
  },
  {
    src: '/gallery/fashion/ (1).jpeg',
    alt: 'fashion',
    category: 'fashion',
    size: 'large',
  },
  {
    src: '/gallery/fashion/ (5).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'medium',
  },

  {
    src: '/gallery/fashion/ (9).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'small',
  },
  {
    src: '/gallery/fashion/ (10).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'medium',
  },

  {
    src: '/gallery/fashion/ (12).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'medium',
  },
  {
    src: '/gallery/fashion/ (13).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'small',
  },
  {
    src: '/gallery/fashion/ (14).jpg',
    alt: 'fashion',
    category: 'fashion',
    size: 'medium',
  },

  {
    src: '/gallery/wedding/21.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/22.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/23.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/24.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/25.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/26.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/wedding/27.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/28.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/wedding/29.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/wedding/30.jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/ (1).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/ (2).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/wedding/ (3).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/ (4).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/ (5).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/ (6).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/ (7).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/wedding/ (8).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/ (9).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/ (10).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/ (11).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/wedding/ (12).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'medium',
  },
  {
    src: '/gallery/wedding/ (13).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'wide',
  },
  {
    src: '/gallery/wedding/ (14).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/ (15).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/ (16).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/wedding/ (17).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },
  {
    src: '/gallery/wedding/ (18).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'large',
  },
  {
    src: '/gallery/wedding/ (19).jpg',
    alt: 'wedding',
    category: 'wedding',
    size: 'small',
  },

  {
    src: '/gallery/bar/38.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'large',
  },
  {
    src: '/gallery/bar/39.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'large',
  },
  {
    src: '/gallery/bar/40.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/bar/41.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'medium',
  },
  {
    src: '/gallery/bar/42.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/bar/43.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'wide',
  },
  {
    src: '/gallery/bar/44.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'wide',
  },
  {
    src: '/gallery/bar/45.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'medium',
  },
  {
    src: '/gallery/bar/46.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/bar/47.jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'medium',
  },
  {
    src: '/gallery/bar/ (1).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/bar/ (2).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/bar/ (3).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'medium',
  },
  {
    src: '/gallery/bar/ (4).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'large',
  },
  {
    src: '/gallery/bar/ (5).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/bar/ (6).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'large',
  },
  {
    src: '/gallery/bar/ (7).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },
  {
    src: '/gallery/bar/ (8).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'medium',
  },
  {
    src: '/gallery/bar/ (9).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'medium',
  },
  {
    src: '/gallery/bar/ (10).jpg',
    alt: 'Bar & Bat Mitzvahs img',
    category: 'bar',
    size: 'small',
  },

  {
    src: '/gallery/holiday/48.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/holiday/49.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/holiday/50.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/51.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/holiday/52.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/53.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/54.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/55.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/56.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/57.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'small',
  },
  {
    src: '/gallery/holiday/58.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/holiday/59.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/60.jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'small',
  },
  {
    src: '/gallery/holiday/ (1).jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },

  {
    src: '/gallery/holiday/ (2).jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/holiday/ (3).jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/ (4).jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'large',
  },
  {
    src: '/gallery/holiday/ (5).jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'medium',
  },
  {
    src: '/gallery/holiday/ (6).jpg',
    alt: 'Holiday Events img',
    category: 'holiday',
    size: 'small',
  },
];

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
      'A modern barrel-style chair with a vintage twist — featuring a curved silhouette, rich black velvet, and a gleaming gold base. Comfortable yet chic, it’s a perfect accent for cocktail areas or lounges.',
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
  title: 'Unforgettable Wedding Space on Wall Street',
  subtitle: 'A Historic Downtown Venue for Your Special Day',
  description:
    'From intimate ceremonies to grand ballroom receptions, orchestrate every detail of your celebration in a historic NYC venue defined by timeless romance. 48 Wall Street transforms your vision into reality, offering a breathtaking wedding space on Wall Street that captivates guests from the moment they arrive. Our expert team ensures seamless coordination and flawless execution, providing a unique event space in Lower Manhattan where your love story takes center stage against a backdrop of marble, gold, and history.',
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
    label: 'View Wedding Gallery',
    href: '/gallery?tab=wedding',
  },
  services: [
    {
      title: 'Elegant Ceremonies',
      body: "Exchange your vows in an atmosphere of grandeur. Our soaring ceilings and architectural details create a cathedral-like quality perfect for saying 'I do.' As a premier wedding space on Wall Street, we offer the flexibility to host your ceremony and reception in one seamless location, ensuring comfort for your guests and a dramatic aisle for your entrance in this historic downtown venue.",
    },
    {
      title: 'Grand Receptions',
      body: 'Dance the night away in the best Lower Manhattan event space for an unforgettable celebration. Our ballroom floor plan adapts to your guest count, offering ample room for a band, dining, and dancing. Whether you envision a seated black-tie dinner or a modern cocktail style affair, 48 Wall provides the perfect setting for your wedding day that will be talked about for years to come.',
    },
    {
      title: 'Timeless Photography',
      body: 'Capture your memories against the backdrop of 1920s glamour.. The banking hall’s grand staircase and intricate features make this a one-of-a-kind event space for wedding photography. You won’t need to travel for portraits; the venue itself is a masterpiece. Secure our historic venue and ensure every photo reflects the elegance and joy of your specific occasion.',
    },
  ],
};

export const corporateData: EventShowcaseProps = {
  title: 'Corporate Event Space in the Financial District',
  subtitle: 'A Historic Downtown Venue for Modern Business',
  description:
    'Celebrate your brand at this storied building synonymous with success. As a premier Lower Manhattan corporate event space, 48 Wall Street offers an impressive setting for everything from high-level summits to annual conferences. Whether you need a versatile meeting space on Wall Street or a grand Financial District event venue for a product launch, our team delivers professional experiences that engage audiences and drive business results with precision.',
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
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Photo Gallery',
    href: '/gallery?tab=corporate',
  },
  services: [
    {
      title: 'Conferences & Summits',
      body: 'Secure a lower Manhattan conference space that commands attention. Our historic hall offers the perfect acoustic and architectural backdrop for industry summits, shareholder meetings, and executive presentations. With flexible layouts and dedicated meeting space on Wall Street, we ensure your content, and your company, takes center stage.',
    },
    {
      title: 'Gala Dinners & Awards',
      body: 'Celebrate company milestones in an event venue built for prestige. From black-tie awards dinners to executive galas, the banking hall’s grandeur elevates every toast. We offer a sophisticated corporate event space where your team’s achievements are honored in style, supported by world-class catering and seamless production.',
    },
    {
      title: 'Launches & Networking',
      body: 'Make a lasting impression with a unique event space designed for connection. Perfect for product launches, client mixers, and networking hours, our venue offers a sophisticated environment that sparks conversation. distinct architecture and prime location make us the standout Lower Manhattan corporate event space for impactful brand moments.',
    },
  ],
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
    label: 'Request Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Photo Gallery',
    href: '/gallery?tab=corporate',
  },
};

export const fashionData: EventShowcaseProps = {
  title: 'NYC Fashion Show Event Space',
  subtitle: 'A Dramatic Setting for New York Fashion Week',
  description:
    '48 Wall Street offers a stunning backdrop where historic grandeur meets modern style, making it an ideal choice for New York Fashion Week. With original architecture, elaborate grand marble staircase and 30 foot ceilings, the space provides the perfect backdrop for any fashion event.</br>Our dedicated and professional in-house event services team will provide you with everything you need for your NYC fashion show. From intimate designer presentations to major runway productions, we provide the dramatic staging, impeccable lighting and everything else required to put your collection center stage in a unique event space in New York City. Our in-house event specialists make 48 Wall Street a true turnkey event venue.</br>There is simply no better venue in the financial district to host your fashion show than the iconic 48 Wall Street!',
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
    label: 'Request Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Photo Gallery',
    href: '/gallery?tab=fashion',
  },
  services: [
    {
      title: 'Runway Productions',
      body: 'Transform our sweeping banking hall into a world-class runway. As a top fashion show event space in NYC, we offer the length and layout necessary for a professional catwalk experience. The soaring ceilings and marble detailing provide a cinematic aesthetic that elevates every look, ensuring your fashion show or presentation is as memorable as the designs themselves.',
    },
    {
      title: 'Showrooms & Pop-Ups',
      body: 'Beyond the runway, utilize our historic downtown venue for immersive brand activations and buyer showrooms. Our versatile floor plan allows for curated displays that invite guests to interact with your brand up close. Whether for a seasonal launch or a press day, this unique event space on Wall Street turns a standard viewing into an exclusive experience.',
    },
    {
      title: 'Production & Lighting',
      body: 'We understand that lighting is everything in fashion. Our event venue is equipped to handle complex audiovisual needs, from dramatic spotlights to ambient moods. We work seamlessly with production teams to ensure that our space highlights the texture, color, and movement of your collection with absolute precision.',
    },
  ],
};

export const nonprofitData: EventShowcaseProps = {
  title: 'Non-Profit & Fundraising Event Venue',
  subtitle: 'A Historic Downtown Venue for Meaningful Impact',
  description:
    'Maximize your fundraising potential at a NYC event venue designed to inspire. We understand the unique challenges of non-profit organizations and offer a setting that complements your mission. As a premier Lower Manhattan event venue, 48 Wall Street provides the grandeur necessary to engage donors and amplify your message. From silent auctions to black-tie galas, we deliver experiences that turn a unique event space in Lower Manhattan into a catalyst for generosity.',
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
    label: 'Request Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Photo Gallery',
    href: '/gallery?tab=corporate',
  },
  services: [
    {
      title: 'Galas & Fundraisers',
      body: "Set the stage for a successful campaign in a setting that commands respect. Our Grand Mezzanine and ballroom offer the scale and elegance required for major fundraising galas. By hosting your supporters in one of the best Manhattan event spaces, you create an atmosphere of prestige that encourages giving and celebrates your organization's achievements in style.",
    },
    {
      title: 'Donor Receptions',
      body: 'Cultivate relationships with your most important contributors in an intimate and sophisticated setting. Whether it is a VIP cocktail hour or a seated dinner, our unique event space on Wall Street offers the privacy and ambiance needed for meaningful connection. Impress your board and benefactors with the architectural beauty of a true historic venue.',
    },
    {
      title: 'Auctions & Awareness',
      body: 'Engage your audience with an event flow designed for interaction. Our flexible floor plans are ideal for silent auctions, guest speakers, and awareness campaigns. As a versatile Financial District event venue, we provide the audio-visual infrastructure and logistical support to ensure your message is heard clearly, helping you drive your mission forward in the heart of NYC.',
    },
  ],
};

export const mitzvahData: EventShowcaseProps = {
  title: 'Bar & Bat Mitzvah Venue on Wall Street',
  subtitle: 'A Historic Downtown Venue for Your Milestone',
  description:
    "Honor this sacred milestone with a celebration that blends tradition and personal style in a sophisticated event venue. We create unforgettable experiences that reflect your family's values and your teen's personality. As a unique event space in Lower Manhattan, 48 Wall Street offers the perfect balance of grandeur and fun. From the hora to the final dance, host a seamless event in downtown Manhattan that turns a coming-of-age moment into the party of the year.",
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
    label: 'Request Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Photo Gallery',
    href: '/gallery?tab=bar',
  },
  services: [
    {
      title: 'The Ultimate Celebration',
      body: 'Transform the ballroom into a high-energy club atmosphere that teens love, while maintaining the elegance adults appreciate. As one of the best New York City event spaces, our venue offers high ceilings and state-of-the-art lighting capabilities to match any theme. Create a dynamic environment where generations come together to celebrate in a historic setting unlike any other.',
    },
    {
      title: 'Custom Themes & Decor',
      body: 'Your vision is our blueprint. Whether you are planning a sports-themed bash or a chic sophisticated lounge, our unique Wall Street event space serves as a flexible canvas. The architectural details provide a stunning base that requires minimal dressing, yet allows for total transformation. Make your mark at an event venue that adapts perfectly to your creative concept.',
    },
    {
      title: 'Ceremony & Reception',
      body: 'Simplify the day by hosting both the service and the party under one roof. 48 Wall Street offers distinct areas that can be separated for the religious service and the reception. Enjoy the convenience of an event venue where guests can move seamlessly from a meaningful service to a lavish cocktail hour without ever leaving the building.',
    },
  ],
};

export const holidayData: EventShowcaseProps = {
  title: 'Holiday Event Venue on Wall Street',
  subtitle: 'Seasonal Celebrations in a Historic Downtown Landmark',
  description:
    'Transform the season into magical memories at the premier holiday event venue in Lower Manhattan. From spirited corporate holiday parties to grand social gatherings, 48 Wall Street infuses every event with festive elegance. Celebrate in style, where creative themes and meticulous attention to detail capture the joy of the season, ensuring your end-of-year celebration in downtown NYC is as impressive as the year itself.',
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
    label: 'Request Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Photo Gallery',
    href: '/gallery?tab=holiday',
  },
  services: [
    {
      title: 'Corporate Holiday Parties',
      body: "Toast to the year's success in a corporate event space defined by luxury. Whether it is an employee appreciation night or a client reception, our ballroom offers a sophisticated setting for business celebrations. Secure a holiday event venue on Wall Street that signals prestige and gratitude to your team and partners.",
    },
    {
      title: 'Historic Holiday Charm',
      body: 'Escape the ordinary and embrace the warmth of this historic NYC venue during the holidays. The Grand Mezzanine and banking hall provide a naturally festive backdrop with gold accents and soaring architecture. Add in the perfect touch of holiday decor and your celebration will sparkle with glamour and timeless style.',
    },
    {
      title: 'Grand Seasonal Galas',
      body: 'For large-scale festivities, you need the right event space that can handle the crowd. Our venue comfortably accommodates hundreds of guests for cocktails and dancing. Centrally located in downtown NYC, we are the ideal holiday event venue in Lower Manhattan for gathering diverse groups from across the city to celebrate together.',
    },
  ],
};

export const filmtvData: EventShowcaseProps = {
  title: 'Film Shoots, Holding & Industry Events',
  subtitle: 'A Camera-Ready Historic Downtown Venue',
  description:
    'From major motion pictures to television series, 48 Wall Street serves as a versatile historic NYC venue for the entertainment industry. Whether you require a historic event space in Lower Manhattan for an on-location shoot, a spacious holding area for cast and crew, or a stunning setting for a wrap party, our location delivers. We understand the logistical demands of production and offer the flexibility and discretion required for a seamless experience in the Financial District.',
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
    label: 'Request Proposal',
    href: '/contact',
  },
  secondaryCta: {
    label: 'View Photo Gallery',
    href: '/gallery?tab=fashion',
  },
  services: [
    {
      title: 'On-Location Filming',
      body: 'Capture the essence of Old New York in a historic downtown venue that radiates authenticity. Our 1920s banking hall features soaring ceilings, marble detailing, and period architecture that serves as a turnkey set for period pieces or high-stakes dramas. It is a unique event space on Wall Street that provides high production value and a cinematic aesthetic ready for the camera.',
    },
    {
      title: 'Holding & Catering',
      body: 'Production requires space, and 48 Wall Street offers ample square footage to support your crew. Our space is perfect as a central base camp, featuring designated areas for wardrobe, hair and makeup, and catering. We provide a comfortable, climate-controlled environment that keeps your talent and team ready for action right in the heart of the Financial District.',
    },
    {
      title: 'Premieres & Wrap Parties',
      body: 'When production wraps, celebrate in style. We are a premier Financial District event venue perfectly suited for red carpet premieres, screenings, and cast parties. With a grand entrance and flexible floor plan, we transform from a working set into a high-end social club, offering one of the best NYC event spaces to toast the success of your project.',
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
  title: 'Event Production Services NYC',
  subtitle: 'Spectacular Events at 48 Wall Street',
  heroImage: '/videos/ep.mp4',
  leadTitle: 'Bringing Your Vision to Life',
  leadDescription:
    'MME Worldwide delivers full event production services internally, making us your premier resource when planning your next experience in this historic downtown venue. By providing clients with a turn-key solution, we satisfy all production needs under one roof—from Audio Visual and Staging to Lighting, Decor, and Rentals. As a self-contained event space, our seamless orchestration of services allows us to produce an event that exceeds expectations, ensuring your event in Lower Manhattan is flawless.',
  sections: [
    {
      id: 'design',
      title: 'Design & Decor',
      description:
        "MME Worldwide's inspired designers specialize in providing creative floral accents and unique décor that enhance the architecture of our historic NYC venue. Our team fulfills your vision with a wide range of design services, helping you develop an environment that is on-message for your brand. Assisted by an in-house production team, we maintain an exclusive inventory of décor, allowing us to provide an original look that makes your event truly one-of-a-kind.",
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
        'Our engineers provide a wide range of AV services designed to meet the communication needs of modern business. We develop cost-effective plans based on your objectives and budget. Whether for a keynote presentation or a panel discussion, our technology is effectively managed and delivered by our team to ensure your message is heard clearly.',
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
        "Lighting transforms a room, and MME Worldwide's professionals will help you select the right design to highlight the grandeur of this historic downtown venue. Our services range from simple and sophisticated to extravagant and bold. We use illumination to set the desired ambiance, ensuring the marble and architectural details of our unique event space shine perfectly for your guests.",
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
        "We carry a complete line of professional staging products, ranging from simple platforms to custom runway installations. Whether you are hosting a fashion show or a corporate panel, our team's extensive knowledge provides the guidance needed to execute your vision. We ensure every angle looks professional within our space.",
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
        'Our creative team, accompanied by an in-house design shop, provides limitless state-of-the-art solutions for our event partners. Let us take your next meeting from ordinary to extraordinary by transforming our unique event space with custom builds. From branded set pieces to immersive environments, we deliver flawless execution that aligns with your specific event goals.',
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
        'Whether your preference is a lively dance band, a jazz ensemble, or a world-renowned DJ, our planning professionals will help you select the perfect sound for your Financial District event venue. Our partners have a proven track record of delivering exceptional musical talent. Furthermore, acquiring a celebrity speaker or performer is a powerful way to deliver your message, and we are equipped to manage the rider and requirements for top-tier talent at your event.',
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
};

export const eventCateringData = {
  title: 'Event Catering Services on Wall Street',
  subtitle: 'A Signature Dining Experience in a Historic Setting',
  leadTitle: 'Inspired Gourmet Catering',
  heroImage: '/videos/ec.mp4',
  leadDescription:
    'Tardi’s Catering is a creative food studio that delivers a first-class dining experience for guests at our historic downtown venue. With over 30 years of experience, Tardi’s is designed to deliver the very best in hospitality for both Lower Manhattan corporate events and private social celebrations. Developing an exciting food experience requires more than just satisfying an appetite; the culinary team specializes in designing menus that use the freshest ingredients, accompanied by decor accents that complement our unique event space. Whether for a seated dinner, buffet, or globally inspired stations, we bring your creative vision to life in the heart of the Financial District.',
  sections: [
    {
      id: 'seated-dinner',
      title: 'Seated Dinners',
      description:
        'When hosting a formal dinner at 48 Wall Street, expect a dining experience that matches the grandeur of a historic NYC venue. The executive chef and culinary team will help you create a custom menu tailored to your specific tastes. Whether it is a fundraising gala or an executive banquet, we provide the sophisticated service required for a premier Financial District event venue.',
      images: ['/catering/cd1.jpg', '/catering/cd2.jpg', '/catering/cd3.jpg'],
      imageAlts: [
        'Catering display 1',
        'Catering display 2',
        'Catering display 3',
      ],
    },
    {
      id: 'cocktail-events',
      title: 'Cocktail Events',
      description:
        "Hosting a reception at 48 Wall Street is a truly remarkable experience. Allow your guests to explore the extraordinary architecture of this unique event space in Lower Manhattan while sipping specialty cocktails and enjoying creative hors d'oeuvres. It is the perfect social setting for networking mixers or holiday toasts in a landmark Wall Street location.",
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
      id: 'lunch',
      title: 'Lunch',
      description:
        'Executing a luncheon at 48 Wall Street is seamless with our trusted partners. We provide a myriad of options, including formal sit-down lunches, flexible buffets, or passed plates for networking hours. Our creative culinary team ensures that the food and beverage options keep your attendees energized and engaged throughout your event.',
      images: ['/catering/cl1.jpg', '/catering/cl2.jpg', '/catering/cl3.jpg'],
      imageAlts: [
        'Catering display 1',
        'Catering display 2',
        'Catering display 3',
      ],
    },
    {
      id: 'breakfast',
      title: 'Breakfast',
      description:
        'Start your day right with exceptional breakfast catering services at your meeting space on Wall Street. From light continental spreads to full hot breakfast buffets, we provide morning dining solutions that set the tone for successful corporate meetings and summits.',
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
  ],
  videoSection: {
    title: 'Sneak Peek Video',
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
    category: 'Staging',
    label: '8’X16’ STAGE',
    color: '#00A651',
  },
  {
    category: 'Podium / Mic',
    label: 'PODIUM / MIC',
    color: '#F7941D',
  },
  {
    category: "6' Bar",
    label: '6’ BAR',
    color: '#4B77BE',
  },
  {
    category: "12' Bar",
    label: '12’ BAR',
    color: '#00A79D',
  },
  {
    category: "18' Bar",
    label: '18’ BAR',
    color: '#9E1F63',
  },
  {
    category: "24' Bar",
    label: '24’ BAR',
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
