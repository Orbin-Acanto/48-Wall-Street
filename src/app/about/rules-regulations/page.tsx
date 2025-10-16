'use client';
import React, { useState } from 'react';
import {
  ChevronDown,
  MapPin,
  Phone,
  Download,
  Clock,
  Package,
  Truck,
  Zap,
  Wifi,
  Music,
  Video,
  Lightbulb,
  Flower,
  Utensils,
  Shield,
  AlertCircle,
  Mail,
  ArrowRight,
} from 'lucide-react';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';

const RulesRegulations = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string | null) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: AlertCircle,
      content: (
        <div className="space-y-4">
          <p className="font-secondary leading-relaxed text-gray-600">
            48 Wall Street is a landmark building with exclusive vendor
            privileges for event planning and production services including
            audio visual, lighting, staging, custom fabrication, décor, floral,
            entertainment, all rentals, musical entertainment, printing, and
            tenting.
          </p>
          <div className="border-l-4 border-amber-400 bg-amber-50 p-6">
            <p className="font-secondary font-medium text-amber-800">
              Important: As a landmark building, restrictions apply. Nothing can
              be placed on walls, columns, or revolving doors without prior
              consent.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'deliveries',
      title: 'Deliveries & Load In/Out',
      icon: Package,
      content: (
        <div className="space-y-6">
          <div className="border border-gray-200 bg-white p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-3 text-lg font-bold">
              Standard Deliveries
            </h4>
            <p className="font-secondary text-gray-600">
              140 Florida St., Farmingdale, NY 11735
            </p>
          </div>
          <div className="border border-gray-200 bg-white p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-3 text-lg font-bold">
              Venue Deliveries
            </h4>
            <p className="font-secondary mb-4 text-gray-600">
              48 Wall St., New York, NY 10005
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <span className="font-secondary text-gray-600">
                  Monday to Friday, 10 AM – 5 PM only
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <span className="font-secondary text-gray-600">
                  Large deliveries (over 100 lbs) must use William Street
                  service entrance
                </span>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <span className="font-secondary text-gray-600">
                  All items must be removed by 12:00 PM the following day
                </span>
              </div>
            </div>
          </div>
          <div className="bg-whitesmoke p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-4 text-lg font-bold">
              Freight Elevator Specifications
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-secondary mb-1 text-sm text-gray-600">
                  Door Opening
                </p>
                <p className="font-secondary text-dark-black font-semibold">
                  83&quot; H × 48&quot; W
                </p>
              </div>
              <div>
                <p className="font-secondary mb-1 text-sm text-gray-600">
                  Cab Floor
                </p>
                <p className="font-secondary text-dark-black font-semibold">
                  70&quot; W × 51&quot; D
                </p>
              </div>
              <div>
                <p className="font-secondary mb-1 text-sm text-gray-600">
                  Max Weight
                </p>
                <p className="font-secondary text-dark-black font-semibold">
                  2,500 lbs
                </p>
              </div>
              <div>
                <p className="font-secondary mb-1 text-sm text-gray-600">
                  Schedule Required
                </p>
                <p className="font-secondary text-dark-black font-semibold">
                  1 week advance
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'production',
      title: 'Audio, Video & Lighting',
      icon: Music,
      content: (
        <div className="space-y-6">
          <div className="border-primary border-l-4 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 p-3">
                <Music className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-secondary text-dark-black text-lg font-bold">
                Audio/Sound
              </h4>
            </div>
            <ul className="font-secondary space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Must be handled by exclusive vendors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>No outside equipment permitted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Client may bring technical director and A1 to supervise
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>48 Wall Street A1 is required</span>
              </li>
            </ul>
          </div>

          <div className="border-primary border-l-4 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 p-3">
                <Video className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-secondary text-dark-black text-lg font-bold">
                Video Production
              </h4>
            </div>
            <ul className="font-secondary space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Exclusive vendors handle all video production</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Media content due 1 week prior (.MOV H.264, PowerPoint, or
                  Keynote)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Built-in screens: 62&quot;×100&quot; with 4:3 aspect ratio
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Video not released without full payment</span>
              </li>
            </ul>
          </div>

          <div className="border-primary border-l-4 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 p-3">
                <Lightbulb className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-secondary text-dark-black text-lg font-bold">
                Lighting
              </h4>
            </div>
            <ul className="font-secondary space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Exclusive vendors handle all lighting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>No outside equipment permitted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Provide specific needs/colors 2 weeks prior</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'power',
      title: 'Power & WiFi',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div className="bg-whitesmoke p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/20 p-3">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-secondary text-dark-black text-lg font-bold">
                Power Requirements
              </h4>
            </div>
            <ul className="font-secondary space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Must be approved 2 weeks prior to event</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Exclusive vendors handle all power requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Additional power drops available at extra cost</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>No plugging into outlets without approval</span>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 p-3">
                <Wifi className="text-primary h-6 w-6" />
              </div>
              <h4 className="font-secondary text-dark-black text-lg font-bold">
                WiFi Network
              </h4>
            </div>
            <p className="font-secondary text-gray-600">
              Shared network available throughout the space. Private network
              setup available at additional cost.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'decor',
      title: 'Décor, Floral & Rentals',
      icon: Flower,
      content: (
        <div className="space-y-6">
          <div className="border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <Flower className="text-primary h-6 w-6" />
              <h4 className="font-secondary text-dark-black text-lg font-bold">
                Décor & Floral
              </h4>
            </div>
            <p className="font-secondary mb-3 text-gray-600">
              Exclusive vendors handle all aspects. They can work with your
              event designer or our design team will meet your vision.
            </p>
            <p className="font-secondary font-semibold text-red-600">
              No outside décor or floral allowed
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-3 text-lg font-bold">
              Rentals
            </h4>
            <p className="font-secondary text-gray-600">
              Exclusive vendors provide all rental tables, chairs, linens,
              lounge furniture, kitchen items, and props.
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-3 text-lg font-bold">
              Staging & Fabrication
            </h4>
            <p className="font-secondary mb-3 text-gray-600">
              Exclusive vendors handle all fabrication and staging.
            </p>
            <div className="border-l-4 border-amber-400 bg-amber-50 p-4">
              <p className="font-secondary text-dark-black font-medium">
                ⚠️ Requires 3 weeks&apos; notice
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'catering',
      title: 'Catering',
      icon: Utensils,
      content: (
        <div className="space-y-6">
          <div className="border-primary border-l-4 bg-white p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-4 text-lg font-bold">
              In-House Caterer
            </h4>
            <ul className="font-secondary space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Finalize menu 2 weeks prior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Kitchen equipment through exclusive vendors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  48 Wall Street handles liquor licenses and COI&apos;s
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Only electric equipment allowed</span>
              </li>
            </ul>
          </div>

          <div className="border-primary border-l-4 bg-white p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-4 text-lg font-bold">
              Outside Caterers
            </h4>
            <ul className="font-secondary space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Provide COI and liquor permits 2 weeks prior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>All equipment through exclusive vendors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Submit floor plan 2 weeks prior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Only electric equipment allowed</span>
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-6">
            <p className="font-secondary text-lg font-bold text-red-700">
              🚫 No open flame, gas, or propane - NO EXCEPTIONS
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'safety',
      title: 'Safety & Insurance',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-red-500 bg-red-50 p-6">
            <h4 className="font-secondary text-dark-black mb-4 text-lg font-bold">
              Prohibited Items
            </h4>
            <div className="font-secondary space-y-2 text-gray-700">
              <p className="font-medium">
                🚫 Pyrotechnics - Not permitted at any time
              </p>
              <p className="font-medium">
                🚫 Open flame - Not permitted at any time
              </p>
              <p className="font-medium">
                🚫 Sterno fuel - Not permitted at any time
              </p>
            </div>
          </div>

          <div className="border border-gray-200 bg-white p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-4 text-lg font-bold">
              Certificates & Insurance
            </h4>
            <ul className="font-secondary space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  All drape and soft goods must have fire retardant certificates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>COI required from all vendors 3 weeks prior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Performances require liability release and insurance
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Email to: info@48WallNYC.com</span>
              </li>
            </ul>
          </div>

          <div className="bg-whitesmoke p-6 shadow-lg">
            <h4 className="font-secondary text-dark-black mb-4 text-lg font-bold">
              General Safety
            </h4>
            <ul className="font-secondary space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>All egress and emergency exits must remain clear</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>All cables must be taped down and matted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Marble floors must be protected with pads or fabric</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>All visitors must check in with security</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="from-dark-black/70 via-dark-black/50 to-dark-black/80 absolute inset-0 bg-gradient-to-b" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div>
            <h1 className="font-primary text-whitesmoke mb-4 text-5xl tracking-wider md:text-7xl lg:text-8xl">
              48 WALL STREET
            </h1>
            <div className="bg-primary mx-auto mb-6 h-[2px] w-32" />
            <p className="font-secondary text-whitesmoke/90 mx-auto max-w-2xl text-lg md:text-xl">
              Venue Rules & Regulations
            </p>
            <p className="font-secondary text-whitesmoke/70 mx-auto mt-4 max-w-3xl text-base">
              Please review all guidelines carefully as you plan your event at
              this landmark building
            </p>
          </div>

          <div className="mt-8">
            <CustomButton
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/brochures/regulations.pdf';
                link.download = 'regulations.pdf';
                link.click();
              }}
              className="group bg-primary hover:bg-whitesmoke hover:text-dark-black inline-flex cursor-pointer items-center gap-2 border-none px-8 py-4 text-sm font-semibold tracking-wider text-white uppercase shadow-lg transition-all"
            >
              <Download className="h-5 w-5" />
              Download PDF
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-dark-black px-6 py-6">
        <div className="text-whitesmoke mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary h-5 w-5" />
            <span className="font-secondary text-sm">
              48 Wall St, New York, NY 10005
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-primary h-5 w-5" />
            <span className="font-secondary text-sm">212.971.5353</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-primary h-5 w-5" />
            <span className="font-secondary text-sm">info@48WallNYC.com</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <div className="p-8 shadow-lg">
            <p className="font-secondary text-center text-lg leading-relaxed text-gray-700">
              Our exclusive vendors are here to bring your creative vision to
              life while maintaining the integrity of this landmark building.
              All production services must be coordinated through our approved
              vendor partners to ensure seamless execution and compliance with
              building regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion Sections */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-primary text-primary/80 mb-12 text-center text-4xl tracking-wide uppercase md:text-5xl">
            Event Guidelines
          </h2>

          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isOpen = openSection === section.id;

              return (
                <div
                  key={section.id}
                  className="overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="hover:bg-whitesmoke flex w-full items-center justify-between px-8 py-6 text-left transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 flex h-12 w-12 items-center justify-center">
                        <Icon className="text-primary h-6 w-6" />
                      </div>
                      <h3 className="font-primary text-dark-black text-xl tracking-wide uppercase">
                        {section.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`text-primary h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[3000px]' : 'max-h-0'}`}
                  >
                    <div className="px-8 pt-2 pb-8">{section.content}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important Deadlines */}
      <section className="bg-white px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-primary text-primary mb-16 text-center text-4xl tracking-wide uppercase md:text-5xl">
            Important Deadlines
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden bg-white p-8 shadow-lg transition-all hover:shadow-2xl">
              <div className="bg-primary/10 mb-6 inline-flex p-4">
                <Clock className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-secondary text-dark-black mb-3 text-xl font-bold">
                3 Weeks Prior
              </h3>
              <p className="font-secondary text-sm text-gray-600">
                COI, Rigging Approval, Staging Requests
              </p>
              <div className="bg-primary/80 absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="group relative overflow-hidden bg-white p-8 shadow-lg transition-all hover:shadow-2xl">
              <div className="bg-primary/10 mb-6 inline-flex p-4">
                <Package className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-secondary text-dark-black mb-3 text-xl font-bold">
                2 Weeks Prior
              </h3>
              <p className="font-secondary text-sm text-gray-600">
                Menu, Graphics, Power, Lighting, Run of Show
              </p>
              <div className="bg-primary/80 absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="group relative overflow-hidden bg-white p-8 shadow-lg transition-all hover:shadow-2xl">
              <div className="bg-primary/10 mb-6 inline-flex p-4">
                <Video className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-secondary text-dark-black mb-3 text-xl font-bold">
                1 Week Prior
              </h3>
              <p className="font-secondary text-sm text-gray-600">
                Media Content, Load In/Out Schedule
              </p>
              <div className="bg-primary/80 absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="group relative overflow-hidden bg-white p-8 shadow-lg transition-all hover:shadow-2xl">
              <div className="bg-primary/10 mb-6 inline-flex p-4">
                <MapPin className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-secondary text-dark-black mb-3 text-xl font-bold">
                Getting There
              </h3>
              <p className="font-secondary text-sm text-gray-600">
                Located by 2,3 Subway. Parking garages nearby.
              </p>
              <div className="bg-primary/80 absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-dark-black px-6 py-16 text-center md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-primary text-primary mb-6 text-4xl tracking-wide md:text-5xl">
            Questions About Your Event?
          </h2>
          <p className="font-secondary text-whitesmoke/80 mb-8 text-lg">
            Our event team is here to help you navigate the planning process
          </p>

          <div className="text-whitesmoke mb-10 flex flex-wrap items-center justify-center gap-6">
            <a
              href="tel:+12129715353"
              className="font-secondary hover:text-primary flex items-center gap-2 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>212.971.5353</span>
            </a>
            <a
              href="mailto:info@48WallNYC.com"
              className="font-secondary hover:text-primary flex items-center gap-2 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>info@48WallNYC.com</span>
            </a>
            <div className="font-secondary flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Mon-Fri: 10AM-5PM</span>
            </div>
          </div>

          <div>
            <Link href="/contact">
              <button className="bg-primary font-secondary hover:bg-whitesmoke hover:text-dark-black cursor-pointer border-none px-10 py-5 text-sm font-semibold tracking-wider text-white uppercase transition-all hover:shadow-2xl">
                Contact Event Team
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RulesRegulations;
