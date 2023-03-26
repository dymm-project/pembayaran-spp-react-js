import express from "express";
import { LoginSiswa, logOutSiswa, MeSiswa} from "../controllers/AuthSiswaController.js";

const router = express.Router();

router.get('/mesiswa', MeSiswa);
router.post('/loginsiswa', LoginSiswa);
router.delete('/logoutsiswa', logOutSiswa);

export default router;