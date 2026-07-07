'use client';
import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  Heart,
  Eye,
  Sparkles,
  X,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { categories, products, themes } from '@/data';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import CartModal from '@/components/CartModal';
import CustomButton from '@/components/CustomButton';

const HERO_SLIDES = [
  '/rentals/rentals-hero-1.jpg',
  '/rentals/rentals-hero-2.jpg',
  '/rentals/rentals-hero-3.jpg',
  '/rentals/rentals-hero-4.jpg',
  '/rentals/rentals-hero-5.jpg',
];

export default function RentalsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('all');
  // const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const { addToCart, itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedRentalDays, setSelectedRentalDays] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((s) => (s + 1) % HERO_SLIDES.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const matchesTheme =
      selectedTheme === 'all' || product.theme === selectedTheme;
    // const matchesPrice =
    //   priceRange === 'all' || product.priceRange === priceRange;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return (
      matchesCategory && matchesTheme && /* matchesPrice && */ matchesSearch
    );
  });

  const activeFiltersCount = [
    activeCategory !== 'all',
    selectedTheme !== 'all',
    // priceRange !== 'all',
  ].filter(Boolean).length;

  const handleAddToCart = (product: Product) => {
    const days = selectedRentalDays[product.id] || 1;
    addToCart(product, days);
    alert(`${product.name} added to cart for ${days} day(s)!`);
  };

  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* Hero Section — venue photo slider */}
      <section className="relative h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${HERO_SLIDES[currentSlide]}')`,
            }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 6, ease: 'linear' },
            }}
          />
        </AnimatePresence>
        <div className="from-dark-black/75 via-dark-black/70 to-primary/30 absolute inset-0 bg-gradient-to-br" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="heading-hero text-white">RENTAL CATALOG</h1>
            <div className="bg-primary mx-auto mb-6 h-[2px] w-32" />
            <p className="text-lead text-gray-200">
              Transform your event with our curated collection of furniture,
              props, and interactive experiences
            </p>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'bg-primary w-8' : 'w-2 bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Intro Copy */}
      <section className="bg-white px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="heading-hero text-primary">
            Curated Event Enhancements
          </h2>
          <div className="bg-primary mx-auto mt-4 mb-8 h-[2px] w-24" />
          <p className="text-lead mb-6">
            Transform your event at 48 Wall Street with our curated collection
            of luxury furniture, statement décor, specialty props, and
            interactive guest experiences. From elegant lounge settings and
            custom scenic moments to branded installations and immersive
            activations, our event specialists can help elevate every detail of
            your celebration.
          </p>
          <p className="text-lead">
            Explore our online catalog to discover available options. If you do
            not see exactly what you are looking for, please speak with one of
            our event specialists. Our team can source, customize, and design
            additional elements to bring your vision to life.
          </p>
        </motion.div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-0 z-40 bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Search rentals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-whitesmoke text-dark-black font-secondary focus:border-primary w-full border-2 border-gray-600/20 py-3 pr-4 pl-12 text-sm transition-all focus:outline-none"
              />
            </div>

            {/* Filter Toggle & Cart */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-dark-black font-secondary text-whitesmoke hover:bg-primary relative flex cursor-pointer items-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:text-white"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-dark-black ml-1 flex h-5 w-5 items-center justify-center text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-primary relative cursor-pointer rounded-full p-3 transition-all hover:shadow-xl"
              >
                <ShoppingCart className="text-dark-black h-5 w-5" />
                {itemCount > 0 && (
                  <span className="bg-dark-black text-whitesmoke absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid gap-4 pt-4 md:grid-cols-3">
                  {/* Theme Filter */}
                  <div>
                    <label className="font-secondary mb-2 block text-xs font-bold tracking-wider text-gray-600 uppercase">
                      Theme
                    </label>
                    <select
                      value={selectedTheme}
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="text-dark-black font-secondary focus:border-primary w-full rounded-lg border-1 border-gray-600/20 px-4 py-2 text-sm transition-all focus:outline-none"
                    >
                      {themes.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                          {theme.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Filter */}
                  {/* <div>
                    <label className="font-secondary mb-2 block text-xs font-bold tracking-wider text-gray-600 uppercase">
                      Price Range
                    </label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="bg-whitesmoke text-dark-black font-secondary focus:border-primary w-full rounded-lg border-1 border-gray-600/20 px-4 py-2 text-sm transition-all focus:outline-none"
                    >
                      {priceRanges.map((range) => (
                        <option key={range.id} value={range.id}>
                          {range.name}
                        </option>
                      ))}
                    </select>
                  </div> */}

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setSelectedTheme('all');
                        // setPriceRange('all');
                      }}
                      className="text-dark-black font-secondary hover:text-primary w-full text-sm font-semibold transition-all"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white px-6 pt-8 pb-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`font-secondary cursor-pointer px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-whitesmoke shadow-xl'
                    : 'bg-whitesmoke text-dark-black hover:bg-primary/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="font-secondary mb-6 flex items-center justify-between">
            <p className="text-dark-black text-sm">
              Showing{' '}
              <span className="font-bold">{filteredProducts.length}</span>{' '}
              rentals
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative cursor-pointer overflow-hidden bg-white shadow-xl transition-all hover:shadow-2xl"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={
                      hoveredProduct === product.id
                        ? product.sceneImage
                        : product.image
                    }
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {product.popular && (
                      <span className="bg-primary font-secondary text-dark-black inline-flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-lg">
                        <Star className="h-3 w-3 fill-current" />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Hover Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      y: hoveredProduct === product.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="from-dark-black/90 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4"
                  >
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="border-whitesmoke text-whitesmoke hover:bg-whitesmoke hover:text-dark-black flex flex-1 cursor-pointer items-center justify-center gap-2 border-2 py-2 text-sm transition-all"
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-primary text-dark-black hover:bg-primary/90 flex flex-1 cursor-pointer items-center justify-center gap-2 py-2 text-sm transition-all"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="font-primary text-dark-black mb-1 text-xl tracking-wide">
                      {product.name}
                    </h3>
                    {/* <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'fill-primary text-primary'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-secondary text-xs text-gray-600">
                        ({product.reviews})
                      </span>
                    </div> */}
                  </div>

                  <p className="font-secondary mb-4 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                  </p>

                  {/* <div className="flex items-baseline gap-2">
                    <span className="font-primary text-primary text-2xl">
                      ${product.price}
                    </span>
                    <span className="font-secondary text-xs text-gray-600">
                      per day
                    </span>
                  </div> */}

                  {/* Rental Duration Selector */}
                  {/* <div className="mt-4">
                    <label className="font-secondary mb-1 block text-xs text-gray-600">
                      Rental Duration
                    </label>
                    <select
                      value={selectedRentalDays[product.id] || 1}
                      onChange={(e) =>
                        handleRentalDaysChange(
                          product.id,
                          parseInt(e.target.value)
                        )
                      }
                      className="font-secondary focus:ring-primary w-full border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value={1}>1 Day</option>
                      <option value={2}>2 Days</option>
                      <option value={3}>3 Days (5% off)</option>
                      <option value={7}>7 Days (10% off)</option>
                      <option value={14}>14 Days (15% off)</option>
                      <option value={30}>30 Days (15% off)</option>
                    </select>
                  </div> */}

                  {/* Add to Cart */}
                  {/* <button
                    className="bg-primary font-secondary text-whitesmoke hover:bg-primary/90 w-full cursor-pointer py-3 text-sm font-semibold tracking-wider uppercase transition-all hover:shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="bg-dark-black/90 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="hover:bg-primary/80 bg-primary absolute top-4 right-4 z-10 cursor-pointer p-2 shadow-lg transition-all hover:shadow-xl"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Images */}
                <div className="relative h-96 md:h-auto">
                  <img
                    src={selectedProduct.sceneImage}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-8">
                  <div className="mb-4">
                    {selectedProduct.popular && (
                      <span className="bg-primary font-secondary text-dark-black inline-flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider uppercase">
                        <Star className="h-3 w-3 fill-current" />
                        Popular Choice
                      </span>
                    )}
                  </div>

                  <h2 className="font-primary text-dark-black mb-2 text-3xl tracking-wide">
                    {selectedProduct.name}
                  </h2>

                  {/* <div className="mb-4 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(selectedProduct.rating)
                              ? 'fill-primary text-primary'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-secondary text-sm text-gray-600">
                      {selectedProduct.rating} ({selectedProduct.reviews}{' '}
                      reviews)
                    </span>
                  </div> */}

                  <p className="font-secondary mb-6 text-gray-600">
                    {selectedProduct.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-secondary text-dark-black mb-3 text-sm font-bold tracking-wider uppercase">
                      Features
                    </h3>
                    <div className="space-y-2">
                      {selectedProduct.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="text-primary h-4 w-4" />
                          <span className="font-secondary text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <div className="bg-primary/10 mb-6 p-6">
                    <div className="mb-2 flex items-baseline gap-2">
                      <span className="font-primary text-primary text-4xl">
                        ${selectedProduct.price}
                      </span>
                      <span className="font-secondary text-sm text-gray-600">
                        per day
                      </span>
                    </div>
                    <p className="font-secondary text-xs text-gray-600">
                      Multi-day discounts available
                    </p>
                  </div> */}

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="bg-primary font-secondary text-whitesmoke hover:bg-primary/90 w-full cursor-pointer py-3 text-sm font-semibold tracking-wider uppercase transition-all hover:shadow-xl"
                    >
                      Add to Cart
                    </button>
                    <button className="border-dark-black hover:bg-dark-black bg-dark-black hover:text-whitesmoke cursor-pointer border-2 p-4 transition-all">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="from-dark-black to-dark-black bg-gradient-to-br via-gray-900 px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <Sparkles className="text-primary mx-auto mb-6 h-12 w-12" />
          <h2 className="heading-hero text-white">
            Looking for Something Extraordinary?
          </h2>
          <p className="text-lead mb-8 text-gray-200">
            If you don&apos;t see exactly what you&apos;re looking for, our
            dedicated event specialists are here to help. Through our extensive
            network of trusted partners and custom fabrication capabilities, we
            can source bespoke rentals, luxury furnishings, specialty décor, and
            one of a kind experiences tailored exclusively to your event.
            Whatever your vision, we&apos;ll bring it to life with exceptional
            creativity and flawless execution.
          </p>
          <Link href="/contact">
            <CustomButton>Speak with an Event Specialist</CustomButton>
          </Link>
        </motion.div>
      </section>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
