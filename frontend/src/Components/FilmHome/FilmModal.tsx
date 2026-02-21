import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { FilmDetails, filmActors } from "../../utils/types";
import Info from "./FIlmCardInfo";

interface FilmModalProps {
  filmId: number | null;
  onClose: () => void;
}

const FilmModal = ({ filmId, onClose }: FilmModalProps) => {
  const [film, setFilm] = useState<FilmDetails>();
  const [actors, setFilmActors] = useState<filmActors[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (filmId === null) return;

    setLoading(true);
    setError(false);

    axios
      .get<FilmDetails[]>(`http://localhost:8080/filminfo/${filmId}`)
      .then((res) => setFilm(res.data[0]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [filmId]);

  useEffect(() => {
    if (filmId === null) return;

    axios
      .get<filmActors[]>(`http://localhost:8080/filminfo/actors/${filmId}`)
      .then((res) => setFilmActors(res.data));
  }, [filmId]);

  useEffect(() => {
    if (filmId === null) return;
    dialogRef.current?.showModal();
  }, [filmId]);

  return (
    <div>
      <dialog
        ref={dialogRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle w-100vh h-100vh backdrop-blur-[8px]"
      >
        <div
          className="
            modal-box
            overflow-y-auto
            bg-gradient-to-b from-red-900 via-zinc to-black
            text-white
            border border-white/10
          "
        >
          {loading && <p>Loading...</p>}
          {error && <p>Error...</p>}

          {!loading && !error && film && (
            <>
              <h3 className="font-bold text-lg mb-2">{film.title}</h3>

              <p className="mb-4">{film.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Info label="Runtime" value={`${film.length} min`} />
                <Info label="Rental Rate" value={`$${film.rental_rate}`} />
                <Info label="Release Year" value={film.release_year} />
                <Info label="Rating" value={film.rating} />
                <Info label="Language" value={film.name} />
                <Info
                  label="Rental Duration"
                  value={`${film.rental_duration} days`}
                />
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Cast</h4>
                <div className="flex flex-wrap gap-2">
                  {actors.map((actor) => (
                    <h4
                      key={`${actor.first_name}-${actor.last_name}`}
                      className="badge badge-outline"
                    >
                      {actor.first_name} {actor.last_name}
                    </h4>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button
                className="
                  btn
                  bg-red-600
                  hover:bg-black
                  text-white
                  border border-white/10
                  shadow-md
                  p-2
                "
                onClick={onClose}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FilmModal;
