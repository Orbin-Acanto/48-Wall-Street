'use client';

import CustomButton from '@/components/CustomButton';
import Image from 'next/image';

interface CTASectionProps {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
}

export default function AboutPlan({
  title = 'PLAN YOUR EVENT AT 48 WALL STREET',
  buttonText = 'CONTACT US',
  buttonLink = '/contact-us',
  imageSrc = '/about/aboutPlan.jpg',
}: CTASectionProps) {
  return (
    <section className="relative h-[60vh] overflow-hidden md:h-[70vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="Event venue"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="bg-dark-black/40 absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <h2 className="font-primary mb-8 max-w-4xl text-center text-3xl tracking-wide text-white md:text-4xl lg:text-5xl">
          {title}
        </h2>

        <a href={buttonLink}>
          <CustomButton variant="primary">{buttonText}</CustomButton>
        </a>
      </div>
    </section>
  );
}
