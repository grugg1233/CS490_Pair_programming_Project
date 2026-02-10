import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-65px)] w-full">
      <div className="absolute inset-0 bg-[url('./assets/cinema.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-2xl px-10 text-white">
          <h1 className="text-[64px] font-bold leading-tight">
            Your favorite films,
            <br />
            just one click away.
          </h1>

          <p className="mt-8 text-[28px] text-gray-300">
            Browse our collection of classics and discover your next favorite
            film.
          </p>

          <Link
            to="/films"
            className="
              mt-10 p-4 text-[20px] inline-block
              rounded-xl
              bg-red-800 text-white
              hover:bg-red-900
              transition-all duration-300
            "
          >
            Explore Films
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
