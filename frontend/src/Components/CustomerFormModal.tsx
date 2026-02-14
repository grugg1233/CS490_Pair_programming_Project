import AddUserForm from "./AddUserForm";

const AddCustomerModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <dialog
      open
      className="modal modal-middle w-100vh h-100vh backdrop-blur-[8px]"
    >
      <div className="modal-box bg-zinc-900 text-white border border-white/10">
        <AddUserForm onSuccess={onClose} />
        <div className="modal-action">
          <button
            className="btn btn-ghost w-6 h-6 rounded-full absolute top-7 right-6"
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
      </div>
    </dialog>
  );
};

export default AddCustomerModal;
