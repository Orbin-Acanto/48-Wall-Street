'use client';
import { useState } from 'react';
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
import { categories, priceRanges, products, themes } from '@/data';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import CartModal from '@/components/CartModal';

export default function RentalsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const { addToCart, itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedRentalDays, setSelectedRentalDays] = useState<{
    [key: number]: number;
  }>({});

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const matchesTheme =
      selectedTheme === 'all' || product.theme === selectedTheme;
    const matchesPrice =
      priceRange === 'all' || product.priceRange === priceRange;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTheme && matchesPrice && matchesSearch;
  });

  const activeFiltersCount = [
    activeCategory !== 'all',
    selectedTheme !== 'all',
    priceRange !== 'all',
  ].filter(Boolean).length;

  const handleAddToCart = (product: Product) => {
    const days = selectedRentalDays[product.id] || 1;
    addToCart(product, days);
    alert(`${product.name} added to cart for ${days} day(s)!`);
  };

  const handleRentalDaysChange = (productId: number, days: number) => {
    setSelectedRentalDays((prev) => ({
      ...prev,
      [productId]: days,
    }));
  };

  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&auto=format&fit=crop')",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="from-dark-black/80 via-dark-black/60 to-primary/30 absolute inset-0 bg-gradient-to-br" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-primary text-whitesmoke mb-4 text-5xl tracking-wider md:text-7xl lg:text-8xl">
              RENTAL CATALOG
            </h1>
            <div className="bg-primary mx-auto mb-6 h-[2px] w-32" />
            <p className="font-secondary text-whitesmoke/90 mx-auto max-w-2xl text-lg md:text-xl">
              Transform your event with our curated collection of furniture,
              props, and interactive experiences
            </p>
          </motion.div>
        </div>
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
                  <div>
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
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setSelectedTheme('all');
                        setPriceRange('all');
                        setSearchQuery('');
                      }}
                      className="border-dark-black font-secondary text-dark-black hover:bg-primary hover:text-whitesmoke w-full cursor-pointer rounded-lg border-1 px-4 py-2 text-sm font-semibold transition-all hover:border-none"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group font-secondary hover:bg-primary flex cursor-pointer items-center gap-3 px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-all ${
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-whitesmoke hover:text-whitesmoke text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* Results Info */}
          <div className="mb-8 flex items-center justify-between">
            <p className="font-secondary text-sm text-gray-600">
              <span className="text-dark-black font-bold">
                {filteredProducts.length}
              </span>{' '}
              items found
            </p>
          </div>

          {/* Products */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                onClick={() => setSelectedProduct(product)}
                className="group relative cursor-pointer overflow-hidden bg-white shadow-lg transition-all hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={
                      hoveredProduct === product.id
                        ? product.sceneImage
                        : product.image
                    }
                    alt={product.name}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="from-dark-black/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.popular && (
                      <span className="bg-primary font-secondary text-dark-black flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider uppercase">
                        <Star className="h-3 w-3 fill-current" />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button className="hover:bg-primary/70 bg-primary cursor-pointer p-2 shadow-lg transition-all">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="hover:bg-primary/70 bg-primary cursor-pointer p-2 shadow-lg transition-all">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-secondary text-primary text-xl font-bold">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-end">
                      <span className="font-primary text-primary text-2xl">
                        ${product.price}
                      </span>
                      <span className="font-secondary text-xs text-gray-600">
                        per day
                      </span>
                    </div>
                  </div>

                  <p className="font-secondary mb-4 text-sm text-gray-600">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-primary text-primary'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-secondary text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {product.features.slice(0, 2).map((feature, i) => (
                      <span
                        key={i}
                        className="bg-primary/10 font-secondary text-dark-black px-3 py-1 text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  {/* RENTAL DAYS SELECTOR */}
                  {/* <div className="mb-4">
                    <label className="font-secondary mb-2 block text-xs font-bold text-gray-600 uppercase">
                      Rental Days
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
                  <button
                    className="bg-primary font-secondary text-whitesmoke hover:bg-primary/90 w-full cursor-pointer py-3 text-sm font-semibold tracking-wider uppercase transition-all hover:shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
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

                  <div className="mb-4 flex items-center gap-2">
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
                  </div>

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

                  <div className="bg-primary/10 mb-6 p-6">
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
                  </div>

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
          <h2 className="font-primary text-whitesmoke mb-6 text-4xl tracking-wide md:text-5xl">
            Can&apos;t Find What You Need?
          </h2>
          <p className="font-secondary text-whitesmoke/80 mb-8 text-lg">
            Our team can source custom rentals and create bespoke experiences
            for your event
          </p>
          <Link href="/contact">
            <button className="bg-primary font-secondary text-dark-black hover:bg-whitesmoke cursor-pointer px-10 py-5 text-sm font-semibold tracking-wider uppercase transition-all hover:shadow-2xl">
              Request Custom Quote
            </button>
          </Link>
        </motion.div>
      </section>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
