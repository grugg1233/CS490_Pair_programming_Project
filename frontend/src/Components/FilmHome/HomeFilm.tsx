import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./FilmCard";
import FilmModal from "./FilmModal";
import type { FilmData } from "../../utils/types";

const HomeFilm = () => {
  const [films, setFilms] = useState<FilmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<FilmData[]>("http://localhost:8080/topFilms")
      .then((res) => {
        setFilms(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-black pt-12 p-6 px-16">
      <h1 className="font-bold mb-5 text-[32px]">Top 5 Films</h1>
      <div className="flex flex-wrap gap-6 ">
        {films.map((FilmData, index) => {
          const film: FilmData = {
            film_id: FilmData.film_id,
            title: FilmData.title,
            category: FilmData.category,
            count: FilmData.count,
            rank: index + 1,
          };

          return (
            <Card film={film} onClick={setSelectedFilmId} showFilmId={true} />
          );
        })}
      </div>
      <FilmModal
        filmId={selectedFilmId}
        onClose={() => setSelectedFilmId(null)}
        rentFilm={false}
      />
    </div>
  );
};

export default HomeFilm;
