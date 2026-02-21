import type { Pagination } from "../../utils/types";

const PaginationControls = ({
  page,
  totalPages,
  canPrev,
  canNext,
  pageNumbers,
  setPage,
}: Pagination) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center pb-12">
      <div className="join gap-2">
        <button
          className={`join-item btn p-2 ${
            !canPrev ? "pointer-events-none opacity-40" : ""
          }`}
          onClick={() => canPrev && setPage((p) => p - 1)}
        >
          &lt; Previous
        </button>

        {pageNumbers.map((p) => (
          <button
            key={p}
            className={`join-item btn pl-1 pr-1 ${
              p === page ? "bg-white text-black" : "btn-ghost text-gray-200"
            }`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          className={`join-item btn p-2 ${
            !canNext ? "pointer-events-none opacity-40" : ""
          }`}
          onClick={() => canNext && setPage((p) => p + 1)}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
