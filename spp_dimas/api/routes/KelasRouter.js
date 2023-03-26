import express from "express";
import { createKelas, deleteKelas, getKelas, getKelasById, getKelass, updateKelas } from "../controllers/KelasController.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/kelasall", verifyAdmin, getKelass);
router.get("/kelas", verifyAdmin, getKelas);
router.get("/kelas/:id_kelas", verifyAdmin, getKelasById);
router.post("/kelas", verifyAdmin, createKelas);
router.patch("/kelas/:id_kelas", verifyAdmin, updateKelas);
router.delete("/kelas/:id_kelas", verifyAdmin, deleteKelas);

export default router;
