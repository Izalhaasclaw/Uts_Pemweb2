import express from "express";
import { createCategories, getCategories, showCategoriesbyId, updateCategories, deleteCategories } from "../controllers/categoryController";
import { authenticat } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getCategories);
router.post("/", authenticat, createCategories); //menyimpan data category
router.get("/:id", showCategoriesbyId); //menampilkan data category berdasarkan id
router.put("/:id", authenticat, updateCategories); //mengupdate data category berdasarkan id
router.delete("/:id", authenticat, deleteCategories); //menghapus data category berdasarkan id

export default router;