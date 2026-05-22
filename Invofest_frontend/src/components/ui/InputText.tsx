import type React from "react";

interface InputTextProps{
    label:string;
    nama:string;
    type?:string;
    error?:string;
    register:any;
}

export const InputText: React.FC <InputTextProps> = ({
    label,
    nama,
    type="text",
    error,
    register,
}) => {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label htmlFor={label}>{label}</label>
            <input
                type={type}
                {...register(nama)}className="border p-2"
                placeholder={label} />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};