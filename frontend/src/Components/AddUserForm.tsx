const AddUserForm = () => (
  <form
    method="POST"
    action="http://localhost:8080/addCustomer"
    className="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <h2 className="col-span-full text-2xl font-semibold mb-4">Add Customer</h2>

    {[
      ["First Name", "first_name", "text"],
      ["Last Name", "last_name", "text"],
      ["Email", "email", "text"],
      ["Address", "address", "text"],
      ["District", "district", "text"],
      ["City", "city", "text"],
      ["Postal Code", "postal_code", "number"],
      ["Phone", "phone", "number"],
    ].map(([name, id, type]) => (
      <input
        key={id}
        name={id}
        type={type}
        placeholder={name.replace("_", " ")}
        className="input input-bordered bg-black text-white p-2"
      />
    ))}

    <button className="btn bg-red-600 text-white col-span-full mt-4">
      Submit
    </button>
  </form>
);

export default AddUserForm;
