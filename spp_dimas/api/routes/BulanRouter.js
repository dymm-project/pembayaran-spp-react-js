import express from "express";
import { getBulan } from "../controllers/BulanController.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/bulan", verifyAdmin, getBulan);

export default router;
