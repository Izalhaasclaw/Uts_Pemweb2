import express from "express";
import { getEvents, createEvent, showEventsById, updateEvents, deleteEvents } from "../controllers/eventConroller";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent); //menyimpan data event
router.get("/:id", showEventsById); //menampilkan data event berdasarkan id
router.put("/:id", updateEvents); //mengupdate data event berdasarkan id
router.delete("/:id", deleteEvents); //menghapus data event berdasarkan id

export default router;
