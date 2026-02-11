const AddCustomerButton = ({ onClick }: { onClick: () => void }) => (
  <div className="mb-8 flex justify-end">
    <button
      className="btn p-3  bg-red-600 hover:bg-red-700 text-white"
      onClick={onClick}
    >
      Add Customer
    </button>
  </div>
);

export default AddCustomerButton;
