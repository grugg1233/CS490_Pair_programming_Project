import type { ActorData } from "../utils/types";

interface ActorCardProps {
  actor: ActorData;
  rank: number; // 1..5 (or however many)
}

const ActorCard = ({ actor, rank }: ActorCardProps) => {
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
          {actor.first_name} {actor.last_name}
        </div>
        <div className="text-xs uppercase font-semibold opacity-60">
          Rentals: {actor.count}
        </div>
      </div>

      <button className="btn btn-square btn-ghost" aria-label="play">
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
    </li>
  );
};

export default ActorCard;
