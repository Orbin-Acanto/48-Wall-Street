import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="mt-8 bg-white px-6 py-20 md:mt-16 xl:mt-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-primary">Contact 48 Wall Street</h1>
            <h2 className="heading-hero">
              Experience
              <br />
              Timeless Luxury
              <br />
              at 48 Wall Street
            </h2>

            <div className="bg-primary h-0.5 w-16"></div>

            <div className="font-secondary space-y-4 leading-relaxed text-gray-600">
              <p>
                Welcome to 48 Wall Street, one of New York City&apos;s most
                iconic landmark event venues. Nestled in the heart of Lower
                Manhattan&apos;s Financial District, our extraordinary venue
                offers an unrivaled setting where timeless architecture, refined
                elegance, and world-class hospitality create unforgettable
                experiences.
              </p>

              <p>
                Originally built in 1928 as the headquarters of the Bank of New
                York, 48 Wall Street is a masterpiece of Beaux-Arts architecture
                featuring breathtaking 30-foot coffered ceilings, magnificent
                Palladian windows, and a grand marble staircase. Today, the
                venue has been reimagined as one of Manhattan&apos;s premier
                luxury event destinations, seamlessly blending historic prestige
                with modern innovation.
              </p>

              <p>
                Whether hosting an elegant gala, executive conference, luxury
                wedding, or exclusive private celebration, our experienced
                hospitality team delivers exceptional white-glove service,
                personalized event planning, and impeccable execution. We invite
                you to schedule a private tour and experience the timeless
                elegance that defines 48 Wall Street.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-[650px] w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="/about/contactHero.jpg"
                alt="48 Wall Street historic landmark event venue"
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
