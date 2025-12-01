import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="mt-8 bg-white px-6 py-20 md:mt-16 xl:mt-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-primary">Contact 48 Wall Street</h1>
            <h2 className="heading-hero">
              Where History
              <br />
              Meets
              <br />
              Celebration
            </h2>

            <div className="bg-primary h-0.5 w-16"></div>

            <div className="font-secondary space-y-4 leading-relaxed text-gray-600">
              <p>
                48 Wall Street provides a unique event space in Lower Manhattan
                to host your next corporate or milestone celebration. Since
                1928, our building has stood as a landmark of architectural
                excellence in the heart of the Financial District. Once home to
                the Bank of New York, this historic downtown venue retains its
                original grandeur—from the soaring 30-foot ceilings and
                Palladian windows to the grand marble staircase that has
                welcomed generations.
              </p>

              <p>
                Today, as a premier historic NYC venue, we host the city&lsquo;s
                most memorable events, blending timeless elegance with modern
                sophistication. Located at the corner of Wall and William
                Streets, we are ready to bring your vision to life. Reach out to
                our team and discover why 48 Wall Street continues to be one of
                the best Lower Manhattan event spaces for distinguished
                gatherings.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-[650px] w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="/about/contactHero.jpg"
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
