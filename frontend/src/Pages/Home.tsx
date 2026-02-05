import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import HomeFilm from "../Components/HomeFilm";
import TopActors from "../Components/TopActors";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <HomeFilm></HomeFilm>
      <TopActors></TopActors>
    </>
  );
}
