import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface RentModalProps {
  open: boolean;
  onClose: () => void;
  customerId: number;
}

interface RentalHistoryItem {
  rental_id: number;
  inventory_id: number;
  film_id: number;
  title: string;
  rental_date: string;
  return_date: string | null;
  returned: boolean;
}

const RentHistory = ({ open, onClose, customerId }: RentModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [history, setHistory] = useState<RentalHistoryItem[]>([]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    async function fetchHistory() {
      const res = await axios.get<RentalHistoryItem[]>(
        `http://localhost:8080/customerRentalHistory/${customerId}`,
      );
      setHistory(res.data);
    }

    fetchHistory();
  }, [open, customerId]);

  async function handleReturn(inventoryId: number) {
    try {
      await axios.post(
        `http://localhost:8080/customerReturnFilm/${customerId}`,
        {
          inventory_id: inventoryId,
        },
      );

      const res = await axios.get<RentalHistoryItem[]>(
        `http://localhost:8080/customerRentalHistory/${customerId}`,
      );

      setHistory(res.data);
    } catch (err) {
      console.error("Return failed");
    }
  }

  return (
    <dialog ref={dialogRef} className="modal backdrop-blur-[8px]">
      <div
        className="modal-box w-11/12 max-w-5xl max-h-[80vh] overflow-y-auto bg-zinc-900 text-gray-200
                  border border-white/10
                  shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                  rounded-2xl"
      >
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-white">Rental History</h3>
          <p className="text-blue-400 text-sm mt-1">
            Customer ID - {customerId}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-zinc-900 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wide">
              <tr>
                <th className="py-3 px-2 text-left">Rental ID</th>
                <th className="py-3 px-2 text-left">Film ID</th>
                <th className="py-3 px-2 text-left">Film Name</th>
                <th className="py-3 px-2 text-left">Rental Date</th>
                <th className="py-3 px-2 text-left">Returned?</th>
                <th className="py-3 px-2 text-left">Return Date</th>
                <th className="py-3 px-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr
                  key={item.rental_id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3 px-2">{item.rental_id}</td>
                  <td className="px-2">{item.film_id}</td>
                  <td className="text-white font-medium px-2">{item.title}</td>
                  <td className="px-2">{item.rental_date}</td>
                  <td className="px-2">
                    {item.returned ? (
                      <span className="text-emerald-400 font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-rose-400 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-2">{item.return_date ?? "Not Returned"}</td>
                  <td className="px-2">
                    {!item.returned && (
                      <button
                        className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                        onClick={() => handleReturn(item.inventory_id)}
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-action">
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RentHistory;
