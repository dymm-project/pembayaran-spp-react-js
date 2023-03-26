import express from "express";
import { createPembayaran, deletePembayaran, getPembayaranAdmin, getPembayaranById, getPembayarans, updatePembayaran} from "../controllers/PembayaranController.js";
import { verifyAdmin, verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/pembayaranall', verifyAdmin, getPembayarans);
router.get('/pembayaran', verifyAdmin, getPembayaranAdmin);
router.get('/pembayaran/:id_pembayaran', verifyAdmin, getPembayaranById);
router.post('/pembayaran', verifyAdmin, createPembayaran);
router.patch('/pembayaran/:id_pembayaran', verifyAdmin, updatePembayaran);
router.delete('/pembayaran/:id_pembayaran', verifyAdmin, deletePembayaran);

export default router;