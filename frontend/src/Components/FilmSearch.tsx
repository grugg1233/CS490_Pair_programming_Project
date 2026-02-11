import React, { useEffect, useState } from "react";
import type { Genre } from "../utils/types";
import type { FilmData } from "../utils/types";
import axios from "axios";
import Card from "./FilmCard";
import FilmModal from "./FilmModal";

const genres: Genre[] = [
  { id: "0", name: "All" },
  { id: "1", name: "Action" },
  { id: "2", name: "Animation" },
  { id: "3", name: "Children" },
  { id: "4", name: "Classics" },
  { id: "5", name: "Comedy" },
  { id: "6", name: "Documentary" },
  { id: "7", name: "Drama" },
  { id: "8", name: "Family" },
  { id: "9", name: "Foreign" },
  { id: "10", name: "Games" },
  { id: "11", name: "Horror" },
  { id: "12", name: "Music" },
  { id: "13", name: "New" },
  { id: "14", name: "Sci-Fi" },
  { id: "15", name: "Sports" },
  { id: "16", name: "Travel" },
];

const FilmSearch = () => {
  const [genre, setGenre] = useState<Genre>(genres[0]);
  const [query, setQuery] = useState<string>("");
  const [films, setFilms] = useState<FilmData[]>();
  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<FilmData[]>("http://localhost:8080/filminfo/${filmId}")
      .then((res) => setFilms(res.data));
  }, [genre]);

  useEffect(() => {});

  return (
    <section className="parent-section pt-12 bg-black block space-y-8 p-12">
      {/* got this from flowbite */}

      <form className="w-full p-4">
        <label className="block mb-2.5 text-sm font-medium text-heading sr-only ">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-body"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={query}
            onChange={(text) => setQuery(text.target.value)}
            className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder="Search"
            required
          />
        </div>
      </form>

      <div className="flex flex-wrap items-center p-4 gap-4 justify-start items-start">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setGenre(genre)}
            className="btn bg-gray-500/50 w-auto p-3 rounded-lg"
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div>
        {films?.map((film)=>
          <Card film={film} onClick = {setSelectedFilmId}/>
        )}
      </div>
       <FilmModal
        filmId={selectedFilmId}
        onClose={() => setSelectedFilmId(null)}
      />
    </section>
  );
};

export default FilmSearch;
