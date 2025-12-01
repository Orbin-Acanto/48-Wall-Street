import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="mt-8 bg-white px-6 pb-20 md:mt-16 xl:mt-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="heading-hero">
              A Historic
              <br />
              Downtown
              <br />
              Venue Experience
            </h1>
            <h2 className="text-primary text-lg">
              Timeless Elegance in the Financial District
            </h2>

            <div className="bg-primary h-0.5 w-16"></div>

            <div className="text-lead">
              <p>
                48 Wall Street provides a unique event space in Lower Manhattan
                for those seeking a setting defined by legacy and prestige.
                Located in the heart of the Financial District, our venue
                occupies three grand floors of the former Bank of New York &
                Trust Company Building. This historic NYC venue stands on a site
                rich with narrative; the current structure&apos;s cornerstone
                was laid on January 12, 1928, the 171st birthday of the bank's
                founder, Alexander Hamilton.
              </p>

              <p className="mt-2">
                Today, the venue stands as a preserved masterpiece of American
                architecture. With its soaring ceilings, detailed marble work,
                and the original Grand Mezzanine, it remains one of the best NYC
                event spaces for distinctive gatherings. We have seamlessly
                integrated modern production capabilities into this historic
                downtown venue, ensuring that whether you are hosting a
                corporate summit or a social gala, you experience the perfect
                blend of 1920s grandeur and contemporary convenience.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-[700px] w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="/about/aboutHero-1.jpg"
                alt="Green architectural detail of Manhattan building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
