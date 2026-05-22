import { Request, Response } from "express";
import { Category } from "../types/category";
import { prisma } from "../lib/db";

let categories: Category[] = [];

//1 menapilkan list category
export const getCategories = async (req: Request, res: Response) => {
    //mngambil data dari database
    try {
        ///jika berhasil
        const allevents = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(allevents);
    } catch (error) {
        ///jika error
        res.status(500).json({
            message: "gagal mengambil data categories",
            error,
        });
    }
};

//2 menyimpan data category
export const createCategories = async (req : Request, res : Response) => {
    const { name, createdAt } = req.body;
        //buat validasi sederhana, apabila nama belum diisi
        if (!name !) {
            res.status(500).json({ message: "Nama category dan createdAt harus diisi" });
        }
        // jika validasi berhasil
        const newCategory = await prisma.category.create({
            data: {
                name,
                createdAt,
            },
        })

        res.status(200).json(newCategory);
};



//3 menampilkan data category berdasarkan id
export const showCategoriesbyId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const category = await prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail category",
            error,
        });
    }
}

//4 mengupdate data category
export const updateCategories = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        const { name } = req.body;
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: name ?? existingCategory.name,
            },
        });
        res.json({
            message: "Category berhasil diupdate",
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update category",
            error,
        });
    }
};

//5 menghapus data category
export const deleteCategories = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        await prisma.category.delete({
            where: { id },
        });
        res.json({
            message: "Category berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus category",
            error,
        });
    }
};
