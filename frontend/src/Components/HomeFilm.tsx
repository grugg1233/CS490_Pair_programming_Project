import { useState, useEffect } from "react";

type FilmTuple = [number, string, string, number];

const HomeFilm = () => {
  const [films, setFilms] = useState<FilmTuple[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => {
        console.log("HTTP status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setFilms(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div className="p-6 max-w mx-auto bg-black">
      <h1>Top 5 Films</h1>
      <ul className="space-y-3">
        {films.map((film) => (
          <li
            key={film[0]}
            className="p-4 rounded bg-gray-900 border border-gray-700"
          >
            <h2 className="text-lg font-semibold">{film[1]}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeFilm;
