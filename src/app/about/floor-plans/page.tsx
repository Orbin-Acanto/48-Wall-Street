'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Maximize2,
  Wifi,
  Music,
  Sparkles,
  ArrowRight,
  Download,
  Eye,
  Layers,
  Grid3x3,
  Box,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  Check,
  Info,
} from 'lucide-react';
import { floors, layouts } from '@/data';
import ThreeD from '@/components/ThreeD';
import CustomButton from '@/components/CustomButton';

export default function FloorPlansPage() {
  const [activeFloor, setActiveFloor] = useState('second');
  const [activeLayout, setActiveLayout] = useState('cocktail');
  const [viewMode, setViewMode] = useState('2d');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentFloor = floors.find((f) => f.id === activeFloor) || floors[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop')",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="from-dark-black/90 via-dark-black/70 to-primary/20 absolute inset-0 bg-gradient-to-br" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="text-primary mb-4 flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="font-secondary text-sm font-semibold tracking-widest uppercase">
                48 Wall Street, New York
              </span>
            </div>
            <h1 className="font-primary text-whitesmoke mb-4 text-5xl tracking-wider md:text-7xl lg:text-8xl">
              FLOOR PLANS
            </h1>
            <div className="bg-primary mx-auto mb-6 h-[2px] w-32" />
            <p className="font-secondary text-whitesmoke/90 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
              Explore our versatile event spaces and visualize your perfect
              layout with our interactive floor plan designer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 backdrop-blur-md">
              <Users className="text-primary h-5 w-5" />
              <span className="font-secondary text-whitesmoke text-sm">
                Up to 600 guests
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 backdrop-blur-md">
              <Maximize2 className="text-primary h-5 w-5" />
              <span className="font-secondary text-whitesmoke text-sm">
                14,500 total sq ft
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 backdrop-blur-md">
              <Layers className="text-primary h-5 w-5" />
              <span className="font-secondary text-whitesmoke text-sm">
                2 event floors
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floor Selector */}
      <section className="sticky top-0 z-40 border-b border-gray-600/20 bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              {floors.map((floor) => (
                <button
                  key={floor.id}
                  onClick={() => setActiveFloor(floor.id)}
                  className={`font-secondary cursor-pointer px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-all ${
                    activeFloor === floor.id
                      ? 'bg-primary hover:bg-primary/80 text-white shadow-lg'
                      : 'bg-whitesmoke hover:text-whitesmoke hover:bg-primary text-gray-600'
                  }`}
                >
                  {floor.name}
                </button>
              ))}
            </div>
            {/* view mode  */}
            <div className="bg-whitesmoke flex items-center gap-2 p-1">
              <button
                onClick={() => setViewMode('2d')}
                className={`font-secondary cursor-pointer px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
                  viewMode === '2d'
                    ? 'text-dark-black bg-white shadow'
                    : 'text-gray-600'
                }`}
              >
                <Grid3x3 className="inline h-4 w-4" /> 2D
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`font-secondary cursor-pointer px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
                  viewMode === '3d'
                    ? 'text-dark-black bg-white shadow'
                    : 'text-gray-600'
                }`}
              >
                <Box className="inline h-4 w-4" /> 3D
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Floor Plan Viewer */}
      <section className="px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Floor Details */}
            <motion.div
              key={activeFloor}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-primary text-dark-black mb-2 text-4xl tracking-wide">
                  {currentFloor.name}
                </h2>
                <p className="font-secondary text-primary text-lg">
                  {currentFloor.size}
                </p>
              </div>

              {/* Capacity Cards */}
              <div className="space-y-3">
                <h3 className="font-secondary text-sm font-bold tracking-wider text-gray-600 uppercase">
                  Capacity
                </h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between bg-white p-4 shadow-md">
                    <span className="font-secondary text-sm text-gray-600">
                      Theater Style
                    </span>
                    <span className="font-secondary text-primary text-lg font-bold">
                      {currentFloor.capacity.max}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-4 shadow-md">
                    <span className="font-secondary text-sm text-gray-600">
                      Banquet Seated
                    </span>
                    <span className="font-secondary text-primary text-lg font-bold">
                      {currentFloor.capacity.seated}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-4 shadow-md">
                    <span className="font-secondary text-sm text-gray-600">
                      Cocktail Reception
                    </span>
                    <span className="font-secondary text-primary text-lg font-bold">
                      {currentFloor.capacity.cocktail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-secondary text-sm font-bold tracking-wider text-gray-600 uppercase">
                  Key Features
                </h3>
                <div className="space-y-2">
                  {currentFloor.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white p-3 shadow-md"
                    >
                      <Check className="text-primary h-4 w-4 flex-shrink-0" />
                      <span className="font-secondary text-sm text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 bg-white p-3 shadow-md">
                    <Check className="text-primary h-4 w-4 flex-shrink-0" />
                    <span className="font-secondary text-sm text-gray-600">
                      Ceiling Height: {currentFloor.ceiling}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <CustomButton className="font-secondary flex w-full cursor-pointer items-center justify-center gap-2 py-4 text-sm font-semibold tracking-wider text-white uppercase transition-all hover:shadow-xl">
                  <Download className="h-4 w-4" />
                  Download PDF
                </CustomButton>
                <CustomButton className="bg- bg-whitesmoke font-secondary text-dark-black hover:bg-dark-black hover:text-whitesmoke flex w-full cursor-pointer items-center justify-center gap-2 border-none py-4 text-sm font-semibold tracking-wider uppercase transition-all">
                  <Calendar className="h-4 w-4" />
                  Schedule Tour
                </CustomButton>
              </div>
            </motion.div>

            {/* Interactive Floor Plan */}
            <div className="lg:col-span-2">
              <motion.div
                key={`${activeFloor}-${viewMode}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Before/After Slider */}
                {viewMode === '2d' && (
                  <div className="relative overflow-hidden bg-white shadow-2xl">
                    <div className="relative aspect-[16/10]">
                      {/* Before Image (Blueprint) */}
                      <div className="absolute inset-0">
                        <img
                          src={currentFloor.blueprint}
                          alt="Floor plan blueprint"
                          className="h-full w-full object-cover"
                        />
                        <div className="bg-dark-black/80 absolute bottom-4 left-4 px-4 py-2 backdrop-blur-sm">
                          <span className="font-secondary text-whitesmoke text-xs font-semibold tracking-wider uppercase">
                            Empty Floor Plan
                          </span>
                        </div>
                      </div>

                      {/* After Image (Furnished) */}
                      <div
                        className="absolute inset-0"
                        style={{
                          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                        }}
                      >
                        <img
                          src={currentFloor.furnished}
                          alt="Furnished floor plan"
                          className="h-full w-full object-cover"
                        />
                        <div className="bg-primary/90 absolute right-4 bottom-4 px-4 py-2 backdrop-blur-sm">
                          <span className="font-secondary text-dark-black text-xs font-semibold tracking-wider uppercase">
                            Furnished Setup
                          </span>
                        </div>
                      </div>

                      {/* Slider Handle */}
                      <div
                        ref={sliderRef}
                        className="absolute inset-0 cursor-ew-resize"
                        onMouseMove={handleMouseMove}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                      >
                        <div
                          className="bg-primary/70 absolute top-0 bottom-0 w-1 shadow-2xl"
                          style={{ left: `${sliderPosition}%` }}
                        >
                          <div className="bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 shadow-2xl">
                            <div className="flex items-center gap-1">
                              <ChevronLeft className="text-dark-black h-4 w-4" />
                              <ChevronRight className="text-dark-black h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-primary absolute top-4 right-4 flex items-center gap-2 px-4 py-2 backdrop-blur-sm">
                      <Info className="h-4 w-4 text-white" />
                      <span className="font-secondary text-xs text-white">
                        Drag slider to compare
                      </span>
                    </div>
                  </div>
                )}

                {viewMode === '3d' && (
                  <ThreeD
                    emptyModelPath={currentFloor.model3DEmpty}
                    furnishedModelPath={currentFloor.model3DFurnished}
                    initialFurnished={false}
                  />
                )}

                {/* Layout Options */}
                <div>
                  <h3 className="font-secondary text-dark-black mb-4 text-lg font-semibold">
                    Popular Layouts
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {layouts.map((layout) => {
                      const Icon = layout.icon;
                      return (
                        <motion.button
                          key={layout.id}
                          onClick={() => setActiveLayout(layout.id)}
                          whileHover={{ scale: 1.02 }}
                          className={`group relative cursor-pointer overflow-hidden p-6 text-left transition-all ${
                            activeLayout === layout.id
                              ? 'bg-primary shadow-xl'
                              : 'bg-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 ${
                                activeLayout === layout.id
                                  ? 'bg-white'
                                  : 'bg-primary/10'
                              }`}
                            >
                              <Icon
                                className={`h-6 w-6 ${
                                  activeLayout === layout.id
                                    ? 'text-primary'
                                    : 'text-primary'
                                }`}
                              />
                            </div>
                            <div className="flex-1">
                              <h4
                                className={`font-secondary mb-1 text-lg font-bold ${
                                  activeLayout === layout.id
                                    ? 'text-white'
                                    : 'text-dark-black'
                                }`}
                              >
                                {layout.name}
                              </h4>
                              <p
                                className={`font-secondary mb-2 text-xs ${
                                  activeLayout === layout.id
                                    ? 'text-white'
                                    : 'text-gray-600'
                                }`}
                              >
                                {layout.description}
                              </p>
                              <div
                                className={`font-secondary flex items-center gap-2 text-sm font-semibold ${
                                  activeLayout === layout.id
                                    ? 'text-white'
                                    : 'text-primary'
                                }`}
                              >
                                <Users className="h-4 w-4" />
                                Up to {layout.capacity} guests
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Visualize CTA */}
      <section className="from-dark-black to-dark-black relative overflow-hidden bg-gradient-to-br via-gray-900 px-6 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="bg-primary absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-primary absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="text-primary mx-auto mb-6 h-16 w-16" />
            <h2 className="font-primary text-whitesmoke mb-6 text-4xl tracking-wide md:text-6xl">
              Visualize Your Event
            </h2>
            <p className="font-secondary text-whitesmoke/80 mb-8 text-lg leading-relaxed">
              Use our interactive 3D designer to place furniture, experiment
              with layouts, and see your vision come to life before your event
              day
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Layers, text: 'Drag & Drop Furniture' },
                { icon: Eye, text: '3D Walkthrough' },
                { icon: Download, text: 'Export & Share' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <feature.icon className="text-primary h-8 w-8" />
                  <span className="font-secondary text-whitesmoke text-sm">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button className="group bg-primary font-secondary hover:bg-whitesmoke hover:text-dark-black inline-flex cursor-pointer items-center gap-3 px-10 py-5 text-base font-semibold tracking-wider text-white uppercase transition-all hover:shadow-2xl">
              Launch Designer Tool
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="font-secondary text-whitesmoke/60 mt-6 text-sm">
              No account required • Free to use • Save and share designs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-whitesmoke p-8">
              <Clock className="text-primary mb-4 h-10 w-10" />
              <h3 className="font-secondary text-dark-black mb-2 text-xl font-bold">
                Flexible Timing
              </h3>
              <p className="font-secondary text-sm text-gray-600">
                Choose from morning, afternoon, or full-day bookings with
                flexible setup times
              </p>
            </div>
            <div className="bg-whitesmoke p-8">
              <Wifi className="text-primary mb-4 h-10 w-10" />
              <h3 className="font-secondary text-dark-black mb-2 text-xl font-bold">
                Premium Amenities
              </h3>
              <p className="font-secondary text-sm text-gray-600">
                High-speed WiFi, professional A/V systems, and on-site tech
                support included
              </p>
            </div>
            <div className="bg-whitesmoke p-8">
              <Music className="text-primary mb-4 h-10 w-10" />
              <h3 className="font-secondary text-dark-black mb-2 text-xl font-bold">
                Full Service Options
              </h3>
              <p className="font-secondary text-sm text-gray-600">
                Catering, bar service, entertainment, and event coordination
                available
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
