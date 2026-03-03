import axios from "axios";
import { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm";
import type { AddFormData } from "../../utils/types";

const EditCustomerModal = ({
  open,
  onClose,
  customerId,
}: {
  open: boolean;
  onClose: () => void;
  customerId: number | null;
}) => {
  const [customerData, setCustomerData] = useState<AddFormData | null>(null);

  useEffect(() => {
    if (!open) return;

    axios.get(`http://localhost:8080/customers/${customerId}`).then((res) => {
      setCustomerData(res.data[0]);
    });
  }, [open, customerId]);

const handleEdit = async (data: AddFormData) => {
  await axios.put(`http://localhost:8080/updateCustomer/${customerId}`, {
    ...data,
    postal_code: data.postal_code || null,
    phone: data.phone || null,
  });
};

  if (!open) return null;

  return (
    <dialog
      open
      className="modal modal-middle w-100vh h-100vh backdrop-blur-[8px]"
    >
      <div className="modal-box bg-zinc-900 text-white border border-white/10 relative">
        <button
          className="btn btn-ghost w-6 h-6 rounded-full absolute top-5 right-5"
          onClick={onClose}
        >
          ✕
        </button>

        {customerData && (
          <AddUserForm
            title="Edit Customer"
            initialData={customerData}
            onSubmit={handleEdit}
            onSuccess={onClose}
          />
        )}
      </div>
    </dialog>
  );
};

export default EditCustomerModal;
