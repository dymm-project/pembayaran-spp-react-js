import express from "express";
import { createAdmin, deleteAdmin, getAdmin, getAdminById, getAdmins, updateAdmin } from "../controllers/AdminController.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/adminall', getAdmins);
router.get('/admin', getAdmin);
router.get('/admin/:id_admin', verifyAdmin, getAdminById);
router.post('/admin', verifyAdmin, createAdmin);
router.patch('/admin/:id_admin', verifyAdmin, updateAdmin);
router.delete('/admin/:id_admin', verifyAdmin, deleteAdmin);

export default router;