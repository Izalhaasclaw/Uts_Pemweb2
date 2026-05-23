import { useEffect, useState } from "react";
import { z } from "zod";
import { InputText } from "../../../components/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";

type Category = {
  id: number;
  name: string;
};

type Pembicara = {
  id: number;
  name: string;
  role: string;
  foto: string;
};

type FormData = {
  name: string;
  description: string;
  location: string;
  dateEvent: string;
  categoryId: string;
  pembicaraId: string;
};

const schema = z.object({
  name: z.string().min(1, "Judul event harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  location: z.string().min(1, "Lokasi harus diisi"),
  dateEvent: z.string().min(1, "Tanggal event harus diisi"),
  categoryId: z.string().min(1, "Kategori event harus dipilih"),
  pembicaraId: z.string().min(1, "Pembicara harus dipilih"),
});

export default function EventUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const getCategories = async () => {
    const response = await fetch("https://backend-uts-pemweb2.vercel.app/category");
    const data = await response.json();
    setCategories(data);
  };

  const getPembicara = async () => {
    const response = await fetch("https://backend-uts-pemweb2.vercel.app/pembicara");
    const data = await response.json();
    setPembicara(data);
  };

  const getDetailEvent = async () => {
    try {
      const response = await fetch(`https://backend-uts-pemweb2.vercel.app/events/${id}`);
      const data = await response.json();
      console.log(data);

      reset({
      name: data.name,
      description: data.description,
      location: data.location,
      dateEvent: data.dateEvent.slice(0, 10),
      categoryId: String(data.categoryId),
      pembicaraId: String(data.pembicaraId),
    });

  } catch (error) {
    console.error(error);
  }
};

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`https://backend-uts-pemweb2.vercel.app/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          location: data.location,
          dateEvent: data.dateEvent,
          categoryId: Number(data.categoryId),
          pembicaraId: Number(data.pembicaraId),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate event");
      }

      alert("Event berhasil diupdate");
      navigate("/dashboard/event");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengupdate event");
    }
  };

  useEffect(() => {
    getCategories();
    getPembicara();
    getDetailEvent();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-[#ffffff] rounded-2xl shadow-md p-8 border border-[#ffffff]">
        <h2 className="text-2xl font-bold text-[#3e2f1c] mb-6 border-b border-[#ffffff] pb-4">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Event Title"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <InputText
            label="Description"
            nama="description"
            register={register}
            error={errors.description?.message}
          />

          <InputText
            label="Location"
            nama="location"
            register={register}
            error={errors.location?.message}
          />

          <InputText
            label="Event Date"
            nama="dateEvent"
            type="date"
            register={register}
            error={errors.dateEvent?.message}
          />

          <div>
            <label className="block mb-2 font-medium text-[#3e2f1c]">
              Category Event
            </label>
            <select
              {...register("categoryId")}
              className="w-full px-4 py-3 rounded-xl border border-[#d6c7b2] bg-white"
            >
              <option value="">Pilih Category Event</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-red-500 mt-1">
              {errors.categoryId?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#3e2f1c]">
              Pembicara
            </label>
            <select
              {...register("pembicaraId")}
              className="w-full px-4 py-3 rounded-xl border border-[#d6c7b2] bg-white"
            >
              <option value="">Pilih Pembicara</option>
              {pembicara.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.role}
                </option>
              ))}
            </select>
            <p className="text-sm text-red-500 mt-1">
              {errors.pembicaraId?.message}
            </p>
          </div>

          <div className="flex justify-start mt-4">
            <Button type="submit" label="Update Event" />
          </div>
        </form>
      </div>
    </div>
  );
}