import type { FilmData } from "../utils/types";

interface FilmCardProps {
  film: FilmData;
  onClick: (filmId: number | null) => void;
  showFilmId : boolean;
}

const Card = ({ film, onClick, showFilmId}: FilmCardProps) => {
  return (
    <div className="justify-center flex w-full md:block md:w-auto lg:block lg:w-auto">
      <div
        onClick={() => onClick(film.film_id)}
        className="card w-64 h-64 shadow-sm  bg-black 
            bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.35),transparent_55%)]
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]
            ring-1 ring-white/20"
      >
        <div className="card-body">
          { showFilmId && ( 
          <div
            className="absolute top-3 left-3 
            flex h-10 w-10 items-center justify-center
            rounded-full bg-red-600
            text-[18px] font-bold text-white"
          >
            {film.rank}
          </div>
          )}
        <div className="pr-2 absolute bottom-3 left-3 text-left">
            <h2 className="card-title font-bold text-[24px]">{film.title}</h2>
            {film.category && <h2>Category: {film.category}</h2>}
            {film.count && <h2>Rental Count: {film.count}</h2>}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Card;
