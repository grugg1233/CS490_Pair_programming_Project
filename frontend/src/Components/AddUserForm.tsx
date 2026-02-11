const AddUserForm = () => (
  <form
    method="POST"
    action="http://localhost:8080/addCustomer"
    className="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <h2 className="col-span-full text-2xl font-semibold mb-4">
      Add Customer
    </h2>

    {[
      ["Customer ID", "customer_id", "number"],
      ["Store Id", "store_id", "number"],
      ["First Name", "first_name", "text"],
      ["Last Name", "last_name", "text"],
      ["Email", "email", "text"],
      ["Address Id", "address_id", "number"],
      ["Active", "active", "number"],
      ["Address", "address", "text"],
      ["Address 2", "address2", "text"],
      ["District", "district", "text"],
      ["City Id", "city_id", "number"],
      ["Postal Code", "postal_code", "number"],
      ["Phone", "phone", "number"],
      ["Location", "location", "text"],
    ].map(([name, id, type]) => (
      <input
        key={id}
        name={name}
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