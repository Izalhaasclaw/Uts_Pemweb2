import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  //menangkap data yang dikirimkan client
  const { email, password } = req.body;

  //lakukan validasi data
  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  //cek existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  //jika user tidak ditemukan, kembalikan response error
  if (!existingUser) {
    return res.status(400).json({ message: "Email tidak ditemukan" });
  }

  //jika user ditemukan, cek password
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  //jika password tidak valid, kembalikan response error
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Password salah" });
  }

  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const token = jwt.sign(
    {
      userId: existingUser.Id,
      email: existingUser.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );

  //jika password valid, kembalikan response sukses
  res.status(200).json({
    message: "Login berhasil",
    user: existingUser.name,
    email: existingUser.email,
    token,
  });
};

export const register = async (req: Request, res: Response) => {
  //menangkap data yang dikirimkan client
  const { name, email, password, image } = req.body;

  //lakukan validasi data
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nama, email, dan password harus diisi" });
  }

  //cek existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  //jika user sudah ada, kembalikan response error
  if (existingUser) {
    return res.status(400).json({ message: "Email sudah terdaftar" });
  }

  //jika user belum ada, buat user baru dan simpan ke database
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image,
    },
  });

  //kembalikan response sukses
  res.status(201).json({
    message: "User berhasil didaftarkan",
    user: newUser.name,
    email: newUser.email,
  });
};
