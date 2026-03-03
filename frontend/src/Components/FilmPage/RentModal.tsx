import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface RentModalProps {
  filmId: number;
  open: boolean;
  onClose: () => void;
}

const RentModal = ({ filmId, open, onClose }: RentModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [customerId, setCustomerId] = useState("");

  async function handleRequest() {
    await axios.post("http://localhost:8080/rentFilm", {
      filmId: filmId,
      customerId: Number(customerId),
    });

    setCustomerId("");
    onClose();
  }

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className="modal backdrop-blur-[8px]">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Rental</h3>
        <p className="py-4">Enter the Customer's ID</p>

        <input
          type="number"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Customer ID"
          className="input input-bordered w-full"
        />

        <div className="modal-action">
          <button className="btn p-4" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn bg-red-600 text-white p-4"
            onClick={handleRequest}
          >
            Confirm Rent
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RentModal;
