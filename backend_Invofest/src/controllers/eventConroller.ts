import { Request, Response } from "express";
import { Event } from "../types/event";
import { prisma } from "../lib/db";

let events: Event[] = [];

///1. menampilkan data event
export const getEvents = async (req: Request, res: Response) => {
    //mngambil data dari database
    try {
        ///jika berhasil
        const allevents = await prisma.event.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(allevents);
    } catch (error) {
        ///jika error
        res.status(500).json({
            message: "gagal mengambil data events",
            error,
        });
    }
};

///2. menyimpan data event
export const createEvent = async (req: Request, res: Response) => {
    // 1. Kita hapus createdAt dari req.body karena ini urusan database otomatis
    const { name, categoryId, location, dataEvent, description } = req.body;

    // 2. Buat validasi sederhana (Hapus !createdAt dari sini)
    if (!name || !categoryId || !location || !dataEvent || !description) {
        // PENTING: Tambahkan return di depan res agar kode di bawahnya berhenti jika error
        return res.status(400).json({ message: "All fields must be filled" }); 
    }

    try {
        // 3. Simpan ke database (kita tambahkan createdAt karena schema Prisma mengharuskannya)
        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId,
                location,
                dataEvent,
                description,
                createdAt: new Date(),
            }, 
        });

        return res.status(201).json(newEvent);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

///3. menampilkan data event berdasarkan id
export const showEventsById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const event = await prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail event",
            error,
        });
    }
}

///4. mengupdate event berdasarkan id
export const updateEvents = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });
        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        const { name } = req.body;
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name: name ?? existingEvent.name,
            },
        });
        res.json({
            message: "Event berhasil diupdate",
            data: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update event",
            error,
        });
    }
};

///5. menghapus event berdasarkan id
export const deleteEvents = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });
        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        await prisma.event.delete({
            where: { id },
        });
        res.json({
            message: "Event berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus event",
            error,
        });
    }
};