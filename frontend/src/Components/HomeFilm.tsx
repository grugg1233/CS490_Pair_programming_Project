import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import type { FilmData } from "../utils/types";

type FilmTuple = [number, string, string, number];

const HomeFilm = () => {
  const [films, setFilms] = useState<FilmTuple[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<FilmTuple[]>("http://localhost:8080/topFilms")
      .then((res) => {
        setFilms(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-black p-6 ">
      <h1 className="font-bold mb-4 text-[32px]">Top 5 Films</h1>
    <div className="flex flex-wrap gap-6 ">
      {films.map((filmTuple, index) => {
        const film: FilmData = {
          film_id: index+1,
          title: filmTuple[1],
          category: filmTuple[2],
          count: filmTuple[3],
        };

        return <Card key={film.film_id} film={film} />;
      })}
    </div>
     </div>
  );
};

export default HomeFilm;
