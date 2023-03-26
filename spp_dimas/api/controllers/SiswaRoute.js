import express from "express";
import { createSiswa, deleteSiswa, getSiswa, getSiswaByNisn, updateSiswa } from "../controllers/SiswaController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/siswa', verifyUser, getSiswa);
router.get('/siswa/:nisn',verifyUser, getSiswaByNisn);
router.post('/siswa', createSiswa);
router.patch('/siswa/:nisn',verifyUser, updateSiswa);
router.delete('/siswa/:nisn',verifyUser, deleteSiswa);

export default router;