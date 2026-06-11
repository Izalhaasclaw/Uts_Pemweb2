import { useForm } from "react-hook-form";
import { InputText } from "../../../components/ui/InputText";
import Button from "../../../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

type FormUser = {
  name: string;
  email: string;
  password: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().min(1, "Email harus diisi").email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export default function UserCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUser>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormUser) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
      });


const result = await response.json();

console.log("STATUS:", response.status);
console.log("RESULT:", result);

if (!response.ok) {
  throw new Error(result.message);
}

      alert("User berhasil ditambahkan");
      reset();
      navigate("/dashboard/users");
    } catch (error) {
      console.error("CREATE USER ERROR:", error);
      alert("User gagal ditambahkan");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-2">Tambah User</h1>
      <p className="text-gray-500 mb-6">Form tambah data user Invofest</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          label="Nama"
          nama="name"
          register={register}
          error={errors.name?.message}
        />

        <InputText
          label="Email"
          nama="email"
          register={register}
          error={errors.email?.message}
        />

        <InputText
          label="Password"
          nama="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <div className="flex gap-3 mt-5">
          <Button label="Simpan" variant="primary" type="submit" />

          <Button
            label="Batal"
            variant="secondary"
            type="button"
            onClick={() => navigate("/dashboard/users")}
          />
        </div>
      </form>
    </div>
  );
}