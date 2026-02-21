import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import HomeFilm from "../Components/FilmHome/HomeFilm";
import TopActors from "../Components/ActorHome/TopActors";

export default function Home() {
  return (
    <> 
      <Navbar/>
      <Hero/>
      <HomeFilm />
      <TopActors storeId={1} />
    </>
  );
}
