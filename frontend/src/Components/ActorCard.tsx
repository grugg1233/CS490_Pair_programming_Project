import type { ActorData } from "../utils/types";

interface ActorCardProps {
  actor: ActorData;
  rank: number;
  onOpen: () => void;
}

const ActorCard = ({ actor, rank, onOpen }: ActorCardProps) => {
  return (
    <section
      onClick={onOpen}
      className="rounded-xl transition p-5 flex items-center m-5
            bg-[radial-gradient(circle_at_top_left,rgba(180,210,255,0.2),transparent_65%)]
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]
            ring-2 ring-white/30"
    >
      <div className="text-[48px] font-thin opacity-30 tabular-nums mr-2">
        {rank.toString()}
      </div>

      <div className="flex-1">
        <div className="font-semibold text-lg">
          {actor.first_name} {actor.last_name}
        </div>
        <div className="text-sm opacity-60">{actor.count} rentals</div>
      </div>
    </section>
  );
};

export default ActorCard;
