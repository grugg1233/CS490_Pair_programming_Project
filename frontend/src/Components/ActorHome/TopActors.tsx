import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ActorCard from "./ActorCard";
import ActorModal from "./ActorModal";
import type {
  ActorData,
  ActorMovies,
  ActorWithMovies,
} from "../../utils/types";

interface TopActorsProps {
  storeId: number;
  title?: string;
}

const TopActors = ({ storeId }: TopActorsProps) => {
  const [actors, setActors] = useState<ActorData[]>([]);
  const [movies, setMovies] = useState<ActorMovies[]>([]);
  const [selectedActor, setSelectedActor] = useState<ActorWithMovies | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/topactors/${storeId}`),
      axios.get(`http://localhost:8080/topactorsfilms/${storeId}`),
    ])
      .then(([actorsRes, moviesRes]) => {
        setActors(actorsRes.data);
        setMovies(moviesRes.data);
      })
      .finally(() => setLoading(false));
  }, [storeId]);

  useEffect(() => {
    if (!selectedActor) return;

    const modal = document.getElementById(
      `actor_modal_${selectedActor.actor_id}`,
    ) as HTMLDialogElement | null;

    modal?.showModal();
  }, [selectedActor]);

  const actorsWithMovies: ActorWithMovies[] = useMemo(() => {
    const map = new Map<number, ActorMovies[]>();

    movies.forEach((m) => {
      map.set(m.actor_id, [...(map.get(m.actor_id) ?? []), m]);
    });

    return actors.map((a) => ({
      ...a,
      movies: map.get(a.actor_id) ?? [],
    }));
  }, [actors, movies]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="bg-black p-8 pb-24 md:pb-12">
      <h2 className="text-[32px] font-bold mb-1">Top 5 Actors</h2>
      <ul className="grid grid-cols-1 sm:grid-col-2 lg:grid-cols-3 gap-4">
        {actorsWithMovies.map((actor, idx) => (
          <ActorCard
            key={actor.actor_id}
            actor={actor}
            rank={idx + 1}
            onOpen={() => {
              setSelectedActor(actor);
              (
                document.getElementById(
                  `actor_modal_${actor.actor_id}`,
                ) as HTMLDialogElement
              )?.showModal();
            }}
          />
        ))}
      </ul>

      <ActorModal actor={selectedActor} />
    </section>
  );
};

export default TopActors;
