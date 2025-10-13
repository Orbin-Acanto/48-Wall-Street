import Image from 'next/image';

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
            <h2 className="font-primary mb-8 text-3xl tracking-[0.3em] text-white uppercase md:text-4xl lg:text-6xl">
              THE Wall Street best kept secret
            </h2>

            <p className="font-secondary mx-auto mb-10 max-w-3xl text-base leading-relaxed text-gray-200 md:text-lg">
              This space has retained much of its original 1920's architectural
              detail; from the 30-foot ceilings to its beautiful Palladian
              windows. The Grand Mezzanine can host and accommodate a variety of
              events, which include seated dinners for 350 guests or a cocktail
              reception for 500 guests. The space can also be divided to your
              liking to create a more intimate setting for smaller events and
              meetings.
            </p>

            <button className="border-primary text-dark-black bg-primary cursor-pointer border px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black">
              Booking INQUIRES
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for scrolling effect */}
      <div className="h-screen"></div>
    </section>
  );
}
