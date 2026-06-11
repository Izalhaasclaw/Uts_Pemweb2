import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Role = {
  id: number;
  name: string;
};

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const user = data.data ?? data;

        setName(user.name);
        setEmail(user.email);
        setRoleId(String(user.role?.id));
      })
      .catch((error) => {
        console.error("Gagal mengambil user:", error);
      });

    fetch("http://localhost:3000/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(Array.isArray(data) ? data : data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil role:", error);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          roleId: Number(roleId),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui user");
      }

      alert("User berhasil diperbarui");
      navigate("/dashboard/user");
    } catch (error) {
      console.error("UPDATE USER ERROR:", error);
      alert("User gagal diperbarui");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-2">Edit User</h1>
      <p className="text-gray-500 mb-6">Form ubah data user Invofest</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Nama</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Password Baru</label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password baru"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Role</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            required
          >
            <option value="">Pilih Role</option>

            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-red-900 text-white px-5 py-2 rounded-lg hover:bg-red-900"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/user")}
            className="border px-5 py-2 rounded-lg"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}   