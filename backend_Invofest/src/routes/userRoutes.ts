import express from  "express";
import { deleteUserById, getUser, saveUser, showUserById, updateUserById } from "../controllers/userController.js";
import { authenticat } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getUser)
router.post("/", authenticat, saveUser)
router.get("/:id", showUserById)
router.put("/:id", authenticat, updateUserById)
router.delete("/:id", authenticat, deleteUserById)

export default router;