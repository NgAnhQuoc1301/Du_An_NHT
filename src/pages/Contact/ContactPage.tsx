import { useState } from "react";

type ContactStatus = "new" | "processing" | "done";

type ContactItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: ContactStatus;
};

type FormError = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export default function ContactPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      phone: "0901234567",
      message: "Cần hỗ trợ hệ thống đơn hàng",
      status: "new",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@gmail.com",
      phone: "0912345678",
      message: "Lỗi thanh toán website",
      status: "processing",
    },
  ]);

  const [form, setForm] = useState<Omit<ContactItem, "id">>({
  name: "",
  email: "",
  phone: "",
  message: "",
  status: "new", // luôn đảm bảo có value
});

  const [editId, setEditId] = useState<number | null>(null);
  const [errors, setErrors] = useState<FormError>({});

  // VALIDATE FUNCTION
  const validate = () => {
    const newErrors: FormError = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{9,11}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 9-11 digits";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ADD
  const handleAdd = () => {
  if (!validate()) return;

  // 👇 TAKE SNAPSHOT trước khi reset form
  const newItem: ContactItem = {
    id: Date.now(),
    name: form.name,
    email: form.email,
    phone: form.phone,
    message: form.message,
    status: form.status,
  };

  setContacts((prev) => [...prev, newItem]);

  setForm({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "new",
  });

  setErrors({});
};

  // DELETE
  const handleDelete = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  // EDIT
  const handleEdit = (contact: ContactItem) => {
    setEditId(contact.id);
    setForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      status: contact.status,
    });
  };

  // UPDATE
  const handleUpdate = () => {
    if (!validate()) return;
    if (editId === null) return;

    setContacts((prev) =>
  prev.map((c) =>
    c.id === editId
      ? {
          ...c,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          status: form.status,
        }
      : c
  )
);

    setEditId(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      status: "new",
    });

    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-4xl font-bold text-cyan-300 mb-10">
          Contact Management
        </h1>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">

          {/* NAME */}
          <div>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/5 border border-cyan-400/10"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/5 border border-cyan-400/10"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/5 border border-cyan-400/10"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <input
              placeholder="Message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/5 border border-cyan-400/10"
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* STATUS */}
          <select
            value={form.status || "new"}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as ContactStatus,
              })
            }
            className="w-full p-3 rounded-xl bg-slate-900 text-white border border-cyan-400/20 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="new" className="bg-slate-900 text-white">
              🆕 New
            </option>
            <option value="processing" className="bg-slate-900 text-white">
              ⚙ Processing
            </option>
            <option value="done" className="bg-slate-900 text-white">
              ✅ Done
            </option>
          </select>

        </div>

        {/* BUTTON */}
        <div className="mb-10">
          {editId ? (
            <button
              onClick={handleUpdate}
              className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold"
            >
              Add Contact
            </button>
          )}
        </div>

        {/* LIST (giữ logic cũ – không đụng) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {contacts.map((c) => (
            <div key={c.id} className="p-6 rounded-2xl bg-white/5 border border-cyan-400/10">

              <b>{c.name}</b>
              <p className="text-sm text-cyan-300">
                {c.status}
              </p>
              <p className="text-sm text-slate-300">{c.email}</p>
              <p className="text-sm text-slate-300">{c.phone}</p>
              <p className="text-sm text-slate-400">{c.message}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(c)}
                  className="flex-1 py-2 rounded-lg border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10 transition"
                >
                  Edit
                </button> 

                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex-1 py-2 rounded-lg bg-red-500/90 hover:bg-red-500 transition"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}