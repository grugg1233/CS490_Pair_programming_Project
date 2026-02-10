import { useEffect, useMemo, useState } from "react";
import type { AllCustomers } from "../utils/types";

const PAGE_SIZE = 20;

const CustomerPagination = () => {
  const [customers, setCustomers] = useState<AllCustomers[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function loadCustomers() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("http://localhost:8080/customersAll", {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const data: AllCustomers[] = await res.json();

        if (!cancelled) {
          setCustomers(Array.isArray(data) ? data : []);
          setPage(1);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCustomers();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(customers.length / PAGE_SIZE));

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, customers.length);

  const pagedCustomers = useMemo(() => {
    return customers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [customers, startIndex]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    if (totalPages <= maxButtons)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - maxButtons + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* header */}
        <div className="relative h-64 border-b border-white/10 bg-gradient-to-br from-red-900/30 to-black">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600')] bg-cover bg-center" />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-5xl font-bold">Customers</h1>
            <p className="text-gray-400 text-lg mt-3">
              Manage your customer database
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {pagedCustomers.map((c) => (
                <div key={c.customer_id} className="border p-6 rounded-xl">
                  {c.first_name} {c.last_name}
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="join">
                <button
                  className={`join-item btn btn-ghost ${
                    !canPrev ? "pointer-events-none opacity-40" : ""
                  }`}
                  onClick={() => canPrev && setPage((p) => p - 1)}
                >
                  &lt; Previous
                </button>

                {pageNumbers.map((p) => (
                  <button
                    key={p}
                    className={`join-item btn ${
                      p === page
                        ? "bg-white text-black"
                        : "btn-ghost text-gray-200"
                    }`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}

                <button
                  className={`join-item btn btn-ghost ${
                    !canNext ? "pointer-events-none opacity-40" : ""
                  }`}
                  onClick={() => canNext && setPage((p) => p + 1)}
                >
                  Next &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
          <h1 className="text-white">Add A user</h1>
      <form
        method="POST"
        action="http://localhost:8080/addCustomer"
        className="bg-black text-white"
      >
        <div>
          <label>customer_id: <input type="number" name="customer_id" /></label>
        </div>
        <div>
          <label>store_id: <input type="number" name="store_id" /></label>
        </div>
        <div>
          <label>first_name: <input type="text" name="first_name" /></label>
        </div>
        <div>
          <label>last_name: <input type="text" name="last_name" /></label>
        </div>
        <div>
          <label>email: <input type="text" name="email" /></label>
        </div>
        <div>
          <label>address_id: <input type="number" name="address_id" /></label>
        </div>
        <div>
          <label>active: <input type="number" name="active" /></label>
        </div>
        <div>
          <label>address: <input type="text" name="address" /></label>
        </div>
        <div>
          <label>address2: <input type="text" name="address2" /></label>
        </div>
        <div>
          <label>district: <input type="text" name="district" /></label>
        </div>
        <div>
          <label>city_id: <input type="number" name="city_id" /></label>
        </div>
        <div>
          <label>postal_code: <input type="number" name="postal_code" /></label>
        </div>
        <div>
          <label>phone: <input type="number" name="phone" /></label>
        </div>
        <div>
          <label>location: <input type="text" name="location" /></label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default CustomerPagination;
