import type { ActorWithMovies } from "../utils/types";

interface ActorModalProps {
  actor: ActorWithMovies | null;
}

const ActorModal = ({ actor }: ActorModalProps) => {
  if (!actor) return null;

  const modalId = `actor_modal_${actor.actor_id}`;

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Top rentals for {actor.first_name} {actor.last_name}
        </h3>

        {actor.movies.length === 0 ? (
          <p className="py-4 opacity-70">No rentals found for this actor.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {actor.movies.map((m) => (
              <li
                key={`${m.actor_id}-${m.title}`}
                className="flex justify-between"
              >
                <span>{m.title}</span>
                <span className="opacity-60 tabular-nums">
                  {m.rental_count}
                </span>
              </li>
            ))}
          </ul>
        )}

      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ActorModal;
