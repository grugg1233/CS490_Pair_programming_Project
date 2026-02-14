import axios from "axios";
import { useState } from "react";
import type { AddFormData } from "../utils/types";

const AddUserForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [formData, setFormData] = useState<AddFormData>({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    district: "",
    city: "",
    postal_code: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");

    await axios.post("http://localhost:8080/addCustomer", {
      ...formData,
      postal_code: formData.postal_code ? Number(formData.postal_code) : null,
      phone: formData.phone ? Number(formData.phone) : null,
    });

    onSuccess?.();

    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      district: "",
      city: "",
      postal_code: "",
      phone: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <h2 className="col-span-full text-2xl font-semibold mb-4">
        Add Customer
      </h2>

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
          value={(formData as any)[id]}
          onChange={handleChange}
          placeholder={name}
          className="input input-bordered bg-black text-white p-2"
        />
      ))}

      <button
        type="submit"
        className="rounded-[12px] py-2 text-[20px] font-bold bg-red-600 text-white col-span-full mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default AddUserForm;
