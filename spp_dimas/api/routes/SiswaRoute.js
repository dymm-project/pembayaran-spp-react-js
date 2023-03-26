import express from "express";
import { createSiswa, deleteSiswa, getSiswa, getSiswaByNisn, getSiswas, updateSiswa } from "../controllers/SiswaController.js";
import { verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/siswaall', verifyAdmin, getSiswas);
router.get('/siswa', verifyAdmin, getSiswa);
router.get('/siswa/:nisn',verifyAdmin, getSiswaByNisn);
router.post('/siswa', verifyAdmin, createSiswa);
router.patch('/siswa/:nisn',verifyAdmin, updateSiswa);
router.delete('/siswa/:nisn',verifyAdmin, deleteSiswa);

export default router;