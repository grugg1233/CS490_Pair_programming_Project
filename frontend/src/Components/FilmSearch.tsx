import { useEffect, useState, useMemo } from "react";
import type { Genre } from "../utils/types";
import type { FilmData } from "../utils/types";
import axios from "axios";
import Card from "./FilmCard";
import FilmModal from "./FilmModal";
import { genres } from "../utils/types";
import PaginationControls from "./CustomerPagination";

const FilmSearch = () => {
  const [genre, setGenre] = useState<Genre>(genres[0]);
  const [query, setQuery] = useState<string>("");
  const [films, setFilms] = useState<FilmData[]>();
  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 16;

  const totalPages = films ? Math.ceil(films.length / pageSize) : 0;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentFilms = films?.slice(startIndex, endIndex);

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - maxButtons + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [films]);

  useEffect(() => {
    axios
      .get<FilmData[]>(`http://localhost:8080/filmgenre/${genre.name}`)
      .then((res) => setFilms(res.data));
  }, [genre]);

  useEffect(() => {
    axios
      .get<FilmData[]>(`http://localhost:8080/searchfilms/${query}`)
      .then((res) => setFilms(res.data));
  }, [query]);

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
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => setGenre(g)}
            className={`w-auto px-3 py-2 rounded-lg 
                        ${
                          genre.id === g.id
                            ? "bg-red-600 text-white"
                            : "bg-gray-500/50 text-white"
                        }
                      `}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-12">
        {currentFilms?.map((film) => (
          <Card film={film} onClick={setSelectedFilmId} showFilmId={false} />
        ))}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        canPrev={page > 1}
        canNext={page < totalPages}
        pageNumbers={pageNumbers}
        setPage={setPage}
      />

      <FilmModal
        filmId={selectedFilmId}
        onClose={() => setSelectedFilmId(null)}
      />
    </section>
  );
};

export default FilmSearch;
