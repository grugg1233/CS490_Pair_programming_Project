import { useState, useEffect } from "react";
import type { AddFormData } from "../../utils/types";

type Props = {
  title: string;
  initialData?: AddFormData;
  onSubmit: (data: AddFormData) => Promise<void>;
  onSuccess?: () => void;
};

const AddUserForm = ({ title, initialData, onSubmit, onSuccess }: Props) => {
  const [formData, setFormData] = useState<AddFormData>({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    district: "",
    city: "",
    postal_code: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmit(formData);

    onSuccess?.();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <h2 className="col-span-full text-2xl font-semibold mb-4">{title}</h2>

      {[
        ["First Name", "first_name", "text"],
        ["Last Name", "last_name", "text"],
        ["Email", "email", "text"],
        ["Address", "address", "text"],
        ["District", "district", "text"],
        ["City", "city", "text"],
        ["Postal Code", "postal_code", "number"],
        ["Country", "country", "country"],
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
