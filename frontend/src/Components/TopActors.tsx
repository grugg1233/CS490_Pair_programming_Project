import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ActorCard from "./ActorCard";
import type { ActorData, ActorMovies } from "../utils/types";

interface TopActorsProps {
  storeId: number;
  title?: string;
}

const TopActors = ({ storeId, title = "Top Actors" }: TopActorsProps) => {
  const [actors, setActors] = useState<ActorData[]>([]);
  const [movies, setMovies] = useState<ActorMovies[]>([]);
  const [loading, setLoading] = useState(true);

  const actorsUrl = useMemo(
    () => `http://localhost:8080/topactors/${storeId}`,
    [storeId]
  );

  const moviesUrl = useMemo(
    () => `http://localhost:8080/topactorsfilms/${storeId}`,
    [storeId]
  );

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axios.get<ActorData[]>(actorsUrl),
      axios.get<ActorMovies[]>(moviesUrl),
    ])
      .then(([actorsRes, moviesRes]) => {
        setActors(actorsRes.data);
        setMovies(moviesRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [actorsUrl, moviesUrl]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul className="list bg-base-100 shadow-md">
      <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">{title}</li>

      {actors.map((actor, idx) => (
        <ActorCard
          key={actor.actor_id}
          actor={actor}
          rank={idx + 1}
          movies={movies}
        />
      ))}
    </ul>
  );
};

export default TopActors;
