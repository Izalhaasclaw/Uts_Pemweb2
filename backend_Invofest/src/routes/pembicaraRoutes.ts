import express from "express";
import { createPembicara, deletePembicara, getPembicara, showPembicaraById, updatePembicara } from "../controllers/pembicaraController";

const router = express.Router();

router.get("/", getPembicara);
router.post("/", createPembicara);
router.get("/:id", showPembicaraById);
router.put("/:id", updatePembicara);
router.delete("/:id", deletePembicara);

export default router;
