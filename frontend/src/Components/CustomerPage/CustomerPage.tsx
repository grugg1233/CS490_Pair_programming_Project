import { useEffect, useState } from "react";
import type { AllCustomers } from "../../utils/types";
import AddCustomerButton from "./AddUserButton";
import CustomersGrid from "./CostumersGrid";
import AddCustomerModal from "./CustomerFormModal";
import CustomerModal from "./CustomerModal";
import axios from "axios";
import EditCustomerModal from "./EditCustomer";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<AllCustomers[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormOpen, setFormOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [searchCustomers, setSearchCustomer] = useState<AllCustomers[]>([]);
  const displayedCustomers = query ? searchCustomers : customers;
  const [editModalOpen, setEditModalOpen] = useState(false);

  const openModal = () => setEditModalOpen(true);
  const closeModal = () => setEditModalOpen(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCustomers() {
      setLoading(true);
      setError("");

      const res = await axios.get<AllCustomers[]>(
        "http://localhost:8080/customersAll",
      );
      if (!cancelled) setCustomers(res.data);

      if (!cancelled) setLoading(false);
    }

    loadCustomers();

    return () => {
      cancelled = true;
    };
  }, []);

  const deleteCustomer = async (customer_id: number) => {
    await axios.post(`http://localhost:8080/customerDelete/${customer_id}`);

    setCustomers((prev) => prev.filter((c) => c.customer_id !== customer_id));

    setSearchCustomer((prev) =>
      prev.filter((c) => c.customer_id !== customer_id),
    );

    setInfoOpen(false);
    setSelectedCustomerId(null);
  };

  useEffect(() => {
    if (!query) {
      setSearchCustomer([]);
      return;
    }
    axios
      .get<AllCustomers[]>(`http://localhost:8080/searchcustomers/${query}`)
      .then((res) => setSearchCustomer(res.data));
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white">
      <form
        className="w-full px-20 pb-4 pt-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block mb-2.5 text-sm font-medium text-heading sr-only ">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-body"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={query}
            onChange={(text) => setQuery(text.target.value)}
            className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder="Search"
            required
          />
        </div>
      </form>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AddCustomerButton onClick={() => setFormOpen(true)} />

        <CustomersGrid
          customers={displayedCustomers}
          loading={loading}
          error={error}
          page={page}
          setPage={setPage}
          onClick={(id) => {
            setSelectedCustomerId(id);
            setInfoOpen(true);
          }}
        />
      </div>

      <AddCustomerModal open={isFormOpen} onClose={() => setFormOpen(false)} />

      {selectedCustomerId && (
        <CustomerModal
          customer_id={selectedCustomerId}
          open={isInfoOpen}
          onClose={() => setInfoOpen(false)}
          onDelete={deleteCustomer}
          onEditOpen={openModal}
        />
      )}

      {editModalOpen && (
        <EditCustomerModal
          open={editModalOpen}
          onClose={closeModal}
          customerId={selectedCustomerId}
        />
      )}
    </div>
  );
};

export default CustomersPage;
