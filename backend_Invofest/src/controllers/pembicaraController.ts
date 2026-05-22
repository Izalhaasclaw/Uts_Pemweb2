import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";
import { prisma } from "../lib/db";

let pembicara: Pembicara[] = [];

///1. menampilkan data pembicara
export const getPembicara = async (req: Request, res: Response) => {
    //mngambil data dari database
    try {
        ///jika berhasil
        const allpembicara = await prisma.pembicara.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(allpembicara);
    } catch (error) {
        ///jika error
        res.status(500).json({
            message: "gagal mengambil data pembicara",
            error,
        });
    }
};

///2. menyimpan data pembicara
export const createPembicara = async (req: Request, res: Response) => {
    const { name, role, image, createdAt } = req.body;

    //buat validasi sederhana, jika namabelum diisi
    if (!name || !role || !image || !createdAt) {
        res.status(500).json({ message: "All fields must be filled" });
    }
    //jika validasi berhasil
    const newPembicara = await prisma.pembicara.create({
        data: {
            name,
            role,
            image,
            createdAt: new Date(),
        },
    });

    res.status(201).json(newPembicara);
};  

///3. meanmpilkan data pembicara berdasarkan id
export const showPembicaraById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const pembicaraItem = await prisma.pembicara.findUnique({
            where: { id },
        });
        if (!pembicaraItem) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }
        res.json(pembicaraItem);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail pembicara",
            error,
        });
    }
}

///4. mengupdate data pembicara berdasarkan id
export const updatePembicara = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingPembicara = await prisma.pembicara.findUnique({
            where: { id },
        });
        if (!existingPembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }
        const { name } = req.body;
        const updatedPembicara = await prisma.pembicara.update({
            where: { id },
            data: {
                name: name ?? existingPembicara.name,
            },
        });
        res.json({
            message: "Pembicara berhasil diupdate",
            data: updatedPembicara,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update pembicara",
            error,
        });
    }
};

///5. menghapus data pembicara berdasarkan id
export const deletePembicara = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingPembicara = await prisma.pembicara.findUnique({
            where: { id },
        });
        if (!existingPembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }
        await prisma.pembicara.delete({
            where: { id },
        });
        res.json({
            message: "Pembicara berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus pembicara",
            error,
        });
    }
};