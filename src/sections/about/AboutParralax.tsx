import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutParralax() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Container (relative positioning ensures it's scoped to this section only) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about/wall_st.jpg"
          alt="New York City buildings in black and white"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Scrollable Content */}
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-4xl">
          <div className="bg-dark-black/70 px-8 py-16 text-center backdrop-blur-sm md:px-16 md:py-20">
            <h2 className="heading-hero text-white">
              Wall Street's best kept secret
            </h2>

            <p className="text-lead mb-8 text-gray-300">
              This space has retained much of its original 1920&apos;s
              architectural detail; from the 30-foot ceilings to its beautiful
              Palladian windows. The Grand Mezzanine can host and accommodate a
              variety of events, which include seated dinners for 350 guests or
              a cocktail reception for 500 guests. The space can also be divided
              to your liking to create a more intimate setting for smaller
              events and meetings.
            </p>

            <Link href="/contact">
              <CustomButton variant="primary">Booking INQUIRES</CustomButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for scrolling effect */}
      <div className="h-screen"></div>
    </section>
  );
}
