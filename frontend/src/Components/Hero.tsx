const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-65px)] w-full">
      <div className="absolute inset-0 bg-[url('./assets/cinema.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-2xl px-10 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Your favorite films,
            <br />
            just one click away.
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            Browse our collection of classics and discover your next favorite
            film.
          </p>

          <button className="mt-6 rounded bg-red-600 px-6 py-3 text-sm font-semibold hover:bg-red-700 transition">
            Get 
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
