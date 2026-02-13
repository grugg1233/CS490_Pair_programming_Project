import axios from "axios";
import { useEffect, useState } from "react";
import type { CustModalData } from "../utils/types";
const CustomerModal = ({
  customer_id,
  open,
  onClose,
}: {
  customer_id: number;
  open: boolean;
  onClose: () => void;
}) => {

    const [customer, setCustomer] = useState<CustModalData>();
    
    useEffect(()=>{
        axios
        .get<CustModalData[]>(`http://localhost:8080/customers/${customer_id}`)
        .then((res)=> {
          setCustomer(res.data[0]);
          console.log(res.data);
        })
    }, [open, customer_id]);

  if (!open) return null;
  return (
    <dialog
      open
      className="modal modal-middle w-100vh h-100vh backdrop-blur-[8px]"
    >
      <div className="modal-box bg-zinc-900 text-white border border-white/10">
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
          {customer && <h2> {customer.first_name}</h2>}
        </div>
      </div>
    </dialog>
  );
};

export default CustomerModal;
