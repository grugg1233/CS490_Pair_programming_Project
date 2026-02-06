import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ActorCard from "./ActorCard";
import type { ActorData } from "../utils/types";

type ActorTuple = [number, string, string, number, string, number];
// [actor_id, first_name, last_name, store_id, address, count]

interface TopActorsProps {
  storeId: number;
  title?: string;
}

const TopActors = ({ storeId, title = "Top Actors" }: TopActorsProps) => {
  const [actors, setActors] = useState<ActorTuple[]>([]);
  const [loading, setLoading] = useState(true);

  const url = useMemo(
    () => `http://localhost:8080/topactors/${storeId}`,
    [storeId]
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get<ActorTuple[]>(url)
      .then((res) => setActors(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) return <p>Loading...</p>;

  return (
    <ul className="list bg-base-100 shadow-md">
      <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">{title}</li>

      {actors.map((a, idx) => {
        const actor: ActorData = {
          actor_id: a[0],
          first_name: a[1],
          last_name: a[2],
          count: a[5],
        };

        return <ActorCard key={actor.actor_id} actor={actor} rank={idx + 1} />;
      })}
    </ul>
  );
};

export default TopActors;
