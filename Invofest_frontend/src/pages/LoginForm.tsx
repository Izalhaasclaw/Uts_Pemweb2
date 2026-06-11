import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
type FormData = {
    email: string;
    password: string;
};

const schema = z.object({
    email: z.string().min(1, "Email harus diisi"),
    password: z.string().min(5, "Password harus diisi"),
});
export default function LoginForm() {

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const { register, handleSubmit, reset, formState:{errors} } = useForm<FormData>({
        resolver : zodResolver(schema)
    });
    // console.log(errors  )
const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    console.log("Login Success", result);

    localStorage.setItem("token", result.token);

    login(result.user.name);

    reset();
    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat login");
  }
};


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    label="Email"
                    nama="email"
                    register={register}
                    error={errors.email?.message}
                />

                <InputPassword
                    label="Password"
                    nama="password"
                    register={register}
                    error={errors.password?.message} 
                />

                <div>
                    
                        <Button type="submit" label="Login" />
                    

                </div>

                <div className="mt-5">
                    Belum punya Akun? <Link to="/registerform" className="text-red-600">Daftar Disini</Link>
                </div>
            </form>
        </div>
    );
};