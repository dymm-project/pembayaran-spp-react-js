import express from "express";
import { createSpp, deleteSpp, getSpp, getSppById, getSpps, updateSpp } from "../controllers/SppController.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router()

router.get("/sppall", verifyAdmin, getSpps)
router.get("/spp", verifyAdmin, getSpp)
router.get("/spp/:id_spp", verifyAdmin, getSppById)
router.post("/spp", verifyAdmin, createSpp)
router.patch("/spp/:id_spp", verifyAdmin, updateSpp)
router.delete("/spp/:id_spp", verifyAdmin, deleteSpp)

export default router;