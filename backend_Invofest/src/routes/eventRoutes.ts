import express from "express";
import { getEvents, createEvent, showEventsById, updateEvents, deleteEvents } from "../controllers/eventConroller";
import { authenticat } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getEvents);
router.post("/", authenticat, createEvent); //menyimpan data event
router.get("/:id", showEventsById); //menampilkan data event berdasarkan id
router.put("/:id", authenticat, updateEvents); //mengupdate data event berdasarkan id
router.delete("/:id", authenticat, deleteEvents); //menghapus data event berdasarkan id

export default router;
