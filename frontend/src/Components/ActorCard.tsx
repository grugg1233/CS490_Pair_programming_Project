import type { ActorData, ActorMovies } from "../utils/types";

interface ActorCardProps {
  actor: ActorData;
  rank: number;
  movies: ActorMovies[]; 
}

const ActorCard = ({ actor, rank, movies }: ActorCardProps) => {
  const modalId = `actor_modal_${actor.actor_id}`;

  return (
    <li className="list-row">
      <div className="text-4xl font-thin opacity-30 tabular-nums">
        {rank.toString().padStart(2, "0")}
      </div>

      <div>
        <img
          className="size-10 rounded-box"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_8Vuq1sLf6EZH1P10ZQ8zwy3c8QFcfysI9Q&s"
          alt="actor"
        />
      </div>

      <div className="list-col-grow">
        <div>
          {actor.first_name} {actor.last_name} | actor id: {actor.actor_id}
        </div>
        <div className="text-xs uppercase font-semibold opacity-60">
          Rentals: {actor.count}
        </div>
      </div>

      <button
        className="btn btn-square btn-ghost"
        onClick={() =>
          (document.getElementById(modalId) as HTMLDialogElement | null)?.showModal()
        }
        aria-label="Show actor films"
      >
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Top films for {actor.first_name} {actor.last_name} | actor id: {actor.actor_id}
          </h3>

          {movies.length === 0 ? (
            <p className="py-4 opacity-70">No films found for this actor.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {movies.map((m) => (
                <li key={`${m.actor_id}-${m.title}`} className="flex justify-between">
                  <span>{m.title}</span>
                  <span className="opacity-60 tabular-nums">{m.rental_count}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="py-4 opacity-60">Press ESC key or click outside to close</p>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </li>
  );
};

export default ActorCard;
