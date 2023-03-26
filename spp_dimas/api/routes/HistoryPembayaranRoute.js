import express from "express";
import { getHistoryPembayaran } from "../controllers/HistoryPembayaranController.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/historypembayaran', verifyUser, getHistoryPembayaran);

export default router;