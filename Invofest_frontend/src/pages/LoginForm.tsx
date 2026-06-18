import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { Link, type ErrorResponse } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import type { LoginInput, LoginResponse } from "../types/auth"
import { api } from "../lib/axios"


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
    const queryClient = useQueryClient();

    const login = useAuthStore((state) => state.login);

    const { register, handleSubmit, formState:{errors} } = useForm<FormData>({
        resolver : zodResolver(schema)
    });

const LoginMutation = useMutation({
  mutationFn: async(credentials: LoginInput) => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);

    return response.data
  },

  onSuccess: (data) => {
    login({
      user: data.user,
      token: data.token

    });

    queryClient.setQueryData(["user"], data.user);

    navigate("/dashboard");
  },
  
  onError: (error: AxiosError<ErrorResponse>) => {
    const message = error.message || "Terjadi kesalahan "

    alert(`login Gagal : ${message}`)
  }
})
    // console.log(errors  )
const onSubmit = async (data: FormData) => {
  LoginMutation.mutate(data)

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