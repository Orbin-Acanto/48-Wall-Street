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
                iconic and prestigious landmark event venues. Nestled in the
                heart of Lower Manhattan&apos;s historic Financial District, our
                extraordinary venue offers an unrivaled setting where timeless
                architecture, refined elegance, and world class hospitality
                create unforgettable experiences.
              </p>

              <p>
                Originally built in 1928 as the distinguished headquarters of
                the Bank of New York, 48 Wall Street is a masterpiece of Beaux
                Arts architecture that has welcomed world leaders, captains of
                industry, and generations of distinguished guests. From its
                breathtaking 30 foot coffered ceilings and magnificent Palladian
                windows to its grand marble staircase and impeccably restored
                historic interiors, every detail reflects the sophistication and
                grandeur of a bygone era.
              </p>

              <p>
                Today, 48 Wall Street has been reimagined as one of
                Manhattan&apos;s premier luxury event destinations, seamlessly
                blending historic prestige with modern innovation. Whether
                hosting an elegant gala, executive conference, luxury wedding,
                fashion show, product launch, charity fundraiser, or exclusive
                private celebration, our venue provides a breathtaking backdrop
                that transforms every occasion into an extraordinary experience.
              </p>

              <p>
                Located at the iconic intersection of Wall Street and William
                Street, just steps from New York&apos;s most celebrated
                landmarks, 48 Wall Street offers more than a venue, it offers a
                legacy. Our experienced hospitality team delivers exceptional
                white glove service, personalized event planning, and impeccable
                execution, ensuring every event is as distinctive as the guests
                who attend.
              </p>

              <p>
                Discover why the world&apos;s leading corporations, luxury
                brands, nonprofit organizations, and private clients choose 48
                Wall Street as the destination for New York City&apos;s most
                exceptional events. We invite you to schedule a private tour and
                experience the timeless elegance, historic prestige, and
                uncompromising luxury that define 48 Wall Street.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-[650px] w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src="/about/contact-hero.jpg"
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
