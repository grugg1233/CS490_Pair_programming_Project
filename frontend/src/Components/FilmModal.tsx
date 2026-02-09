import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { FilmDetails } from "../utils/types";

interface FilmModalProps {
  filmId: number | null;
  onClose: () => void;
}

const FilmModal = ({ filmId, onClose }: FilmModalProps) => {
  const [film, setFilm] = useState<FilmDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!filmId) return;

    setLoading(true);
    setError(false);

    axios
      .get<FilmDetails>(`http://localhost:8080/filminfo/${filmId}`)
      .then((res) => {setFilm(res.data);
                  console.log('data: :', res.data); 

      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [filmId]);

  useEffect(() => {
    if (!filmId) return;

    dialogRef.current?.showModal();
  }, [filmId]);

  return (
    <div>
      <dialog
        ref={dialogRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error...</p>}
            {!loading && !error && film && (
              <h3 className="font-bold text-lg">{film.description}</h3>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn p-2" onClick={onClose}>
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
