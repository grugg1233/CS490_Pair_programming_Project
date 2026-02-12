import { useEffect, useState } from "react";
import type { AllCustomers } from "../utils/types";
import AddCustomerButton from "./AddUserButton";
import CustomersGrid from "./CostumersGrid";
import AddCustomerModal from "./CustomerFormModal";
import CustomerModal from "./CustomerModal";

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

  useEffect(() => {
    let cancelled = false;

    async function loadCustomers() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("http://localhost:8080/customersAll");
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data: AllCustomers[] = await res.json();
        if (!cancelled) setCustomers(data);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCustomers();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 py-12">
        <AddCustomerButton onClick={() => setFormOpen(true)} />

        <CustomersGrid
          customers={customers}
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
        />
      )}
    </div>
  );
};

export default CustomersPage;
