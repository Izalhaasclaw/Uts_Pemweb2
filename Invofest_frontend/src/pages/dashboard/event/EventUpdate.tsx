import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
};

type Pembicara = {
  id: number;
  name: string;
  role: string;
  image: string;
};

type Event = {
  id: number;
  title: string;
  location: string;
  dateEvent: string;
  description: string;
  category: Category;
  pembicara: Pembicara;
};

export default function EventIndex() {
  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    try {
      const response = await fetch("https://backend-mu-khaki-76.vercel.app/event");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus event ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://backend-mu-khaki-76.vercel.app/event/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus event");
      }

      alert("Event berhasil dihapus");
      getEvents();
    } catch (error) {
      console.error(error);
      alert("Event gagal dihapus");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-[#3e2f1c]">
        Event
      </h1>

      <Link
        to="/dashboard/event/create"
        className="inline-block px-5 py-3 rounded-2xl font-medium bg-[#bfa27a] text-white hover:bg-[#a88c65] transition shadow-sm mb-6"
      >
        Create New
      </Link>

      <div className="flex flex-wrap gap-4">
        {events.map((item) => (
          <div
            key={item.id}
            className="w-80 px-6 py-4 bg-[#f8f5f0] border border-white
             rounded-2xl shadow-sm text-[#3e2f1c] hover:shadow-md transition"
          >
            <p className="font-semibold">{item.title}</p>

            <p className="text-sm text-[#ffffff] mt-1">
              Lokasi: {item.location}
            </p>

            <p className="text-sm text-[#ffffff] mt-1">
              Tanggal: {new Date(item.dateEvent).toLocaleDateString("id-ID")}
            </p>

            <p className="text-sm text-[#ffffff] mt-1">
              Category: {item.category?.name}
            </p>

            <p className="text-sm text-[#ffffff] mt-1">
              Pembicara: {item.pembicara?.name}
            </p>

            <p className="text-sm text-[#ffffff] mt-2">
              {item.description}
            </p>

            <div className="flex gap-2 mt-4">
              <Link
                to={`/dashboard/event/edit/${item.id}`}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}