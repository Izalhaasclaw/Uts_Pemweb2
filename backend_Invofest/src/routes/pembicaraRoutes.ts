import express from "express";
import { createPembicara, deletePembicara, getPembicara, showPembicaraById, updatePembicara } from "../controllers/pembicaraController";
import { authenticat } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getPembicara);
router.post("/", authenticat, createPembicara);
router.get("/:id", showPembicaraById);
router.put("/:id", authenticat, updatePembicara);
router.delete("/:id", authenticat, deletePembicara);

export default router;
