import axios from "axios";
import { useEffect, useState } from "react";
import type { CustModalData } from "../utils/types";
const CustomerModal = ({
  customer_id,
  open,
  onClose,
  onDelete,
}: {
  customer_id: number;
  open: boolean;
  onClose: () => void;
  onDelete: (customer_id: number) => void;
}) => {
  const [customer, setCustomer] = useState<CustModalData>();

  useEffect(() => {
    axios
      .get<CustModalData[]>(`http://localhost:8080/customers/${customer_id}`)
      .then((res) => {
        setCustomer(res.data[0]);
        console.log(res.data);
      });
  }, [open, customer_id]);

  if (!open) return null;
  return (
    <dialog
      open
      className="modal modal-middle w-100vh h-100vh backdrop-blur-[8px]"
    >
      <div
        className="modal-box bg-zinc-900 text-white border border-white/10
       bg-[radial-gradient(circle_at_top_left,rgba(180,210,255,0.2),transparent_35%)]
        bg-[radial-gradient(circle_at_bottom_right,rgba(180,210,255,0.2),transparent_45%)]
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]
            ring-2 ring-white/30
       
            shadow-[0_12px_30px_rgba(0,0,0,0.5)]
            ring-2 ring-white/30k"
      >
        <div className="modal-action">
          <button
            className="btn  btn-ghost w-6 h-6 rounded-full absolute top-7 right-6"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {customer && (
          <div className="align-left p-2">
            <h2 className="text-2xl pb-2 font-bold text-white">
              {customer.first_name} {customer.last_name}
            </h2>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <p>
                <span className="font-semibold text-white">Email: </span>
                <span className="text-gray-300">{customer.email}</span>
              </p>
              <p>
                <span className="font-semibold text-white">Phone: </span>
                <span className="text-gray-300">{customer.phone}</span>
              </p>
              <p>
                <span className="font-semibold text-white">Address: </span>
                <span className="text-gray-300">{customer.address}</span>
              </p>
              <p>
                <span className="font-semibold text-white">City: </span>
                <span className="text-gray-300">{customer.city}</span>
              </p>
              <p>
                <span className="font-semibold text-white">Country: </span>
                <span className="text-gray-300">{customer.country}</span>
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            onDelete(customer_id);
          }}
          className=" btn bg-red-700 hover:bg-red-900 text-white p-3 mt-8 w-full font-bold"
        >
          Delete Customer
        </button>
      </div>
    </dialog>
  );
};

export default CustomerModal;
