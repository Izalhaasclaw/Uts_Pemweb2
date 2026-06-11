import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

type User = {
  id: number;
  name: string;
  email?: string;
};

export default function UserIndex() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA USER:", data);
         setUsers(data.user || []);
      })
      .catch((error) => {
        console.error("Gagal mengambil user:", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus user ini?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus user");
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));
      alert("User berhasil dihapus");
    } catch (error) {
      console.error("DELETE USER ERROR:", error);
      alert("User gagal dihapus");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User</h1>
          <p className="text-gray-500">Daftar User Invofest</p>
        </div>

        <Link
          to="/dashboard/users/create"
          className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-900"
        >
          + Tambah User
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-red-900 text-white">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email ?? "-"}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link to={`/dashboard/users/edit/${user.id}`}>
                        <Button label="Edit" variant="secondary" type="button" />
                      </Link>

                      <Button
                        label="Delete"
                        variant="primary"
                        type="button"
                        onClick={() => handleDelete(user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Belum ada data user
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}