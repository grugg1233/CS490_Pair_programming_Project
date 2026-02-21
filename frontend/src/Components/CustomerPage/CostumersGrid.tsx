import type { AllCustomers } from "../../utils/types";
import PaginationControls from "./CustomerPagination";
import { useMemo } from "react";

const PAGE_SIZE = 21;

const CustomersGrid = ({
  customers,
  loading,
  error,
  page,
  setPage,
  onClick,
}: {
  customers: AllCustomers[];
  loading: boolean;
  error: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onClick: (id: number) => void;
}) => {
  const totalPages = Math.max(1, Math.ceil(customers.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;

  const visible = customers.slice(startIndex, startIndex + PAGE_SIZE);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - maxButtons + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  if (loading) return <p className="opacity-60">Loading…</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {visible.map((c) => (
          <CustomerCard
            key={c.customer_id}
            customer={c}
            onClick={() => onClick(c.customer_id)}
          />
        ))}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        canPrev={canPrev}
        canNext={canNext}
        pageNumbers={pageNumbers}
        setPage={setPage}
      />
    </>
  );
};

const CustomerCard = ({
  customer,
  onClick,
}: {
  customer: AllCustomers;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="p-6 rounded-xl bg-zinc-900 border border-white/10"
  >
    <h3 className="text-lg o o o o o font-semibold">
      {customer.first_name} {customer.last_name}
    </h3>
    <p className="text-sm text-white/60">{customer.email}</p>
  </div>
);

export default CustomersGrid;
