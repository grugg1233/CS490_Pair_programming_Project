import type { ActorWithMovies } from "../utils/types";

interface ActorModalProps {
  actor: ActorWithMovies | null;
}

const ActorModal = ({ actor }: ActorModalProps) => {
  if (actor == null) return null;

  const modalId = `actor_modal_${actor.actor_id}`;
  const initials = actor.first_name.charAt(0) + actor.last_name.charAt(0);

  return (
    <dialog
      id={modalId}
      className="modal modal-bottom sm:modal-middle w-100vh h-100vh backdrop-blur-[8px]"
    >
      <div
        className="
          modal-box
          p-0
          bg-gradient-to-b from-red-900 via-zinc to-black
          text-white
          overflow-hidden
          border border-white/10
        "
      >
        <div className="relative p-6 pb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-transparent" />

          <div className="relative flex items-center gap-5">
            <div
              className="
                w-16 h-16 rounded-full
                bg-black
                border-2 border-red-600
                flex items-center justify-center
                text-xl font-bold text-red-500
              "
            >
              {initials}
            </div>

            <div>
              <h3 className="text-2xl font-bold tracking-wide">
                {actor.first_name} {actor.last_name}
              </h3>
              <p className="mt-1 text-white/70 flex items-center gap-2">
                {actor.movies.length} films in catalog
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <h4 className="text-lg font-semibold mb-4">Top Rented Films</h4>

          <div className="space-y-3">
            {actor.movies.map((movie) => (
              <div
                key={`${movie.actor_id}-${movie.title}`}
                className="
                  flex items-center justify-between
                  p-4 rounded-xl
                  bg-white/5
                  border border-white/10
                  hover:bg-white/10
                  transition
                "
              >
                <div>
                  <p className="font-semibold">{movie.title}</p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold tabular-nums">
                    {movie.rental_count}
                  </p>
                  <p className="text-xs text-white/60">rentals</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-action px-6 pb-6">
          <form method="dialog">
            <button
              className="
                btn
                bg-black/80
                hover:bg-black
                text-white
                border border-white/10
                p-2
              "
            >
              Close
            </button>
          </form>
        </div>
      </div>

    </dialog>
  );
};

export default ActorModal;
