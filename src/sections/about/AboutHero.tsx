import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="mt-8 bg-white px-6 py-20 md:mt-16 xl:mt-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="font-primary text-5xl tracking-wider text-gray-900 lg:text-6xl">
              A HISTORIC
              <br />
              EVENT
              <br />
              EXPERIENCE
            </h2>

            <div className="bg-primary h-0.5 w-16"></div>

            <div className="font-secondary space-y-4 leading-relaxed text-gray-600">
              <p>
                48 Wall Street provides a unique and historical setting to host
                your next corporate or milestone celebration.
              </p>

              <p>
                Located in the heart of the Financial District, the 48 Wall
                Street event space occupies three floors of the former Bank of
                New York & Trust Company Building. The current structure is the
                third to be erected on the same plot. The cornerstone was laid
                on January 12, 1928, the 171st birthday of the banks founder,
                Alexander Hamilton
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-[500px] w-full max-w-md overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="/about/aboutHero.jpg"
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
