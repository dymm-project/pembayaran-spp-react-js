import express from "express";
import { LoginAdmin, logoutAdmin, MeAdmin } from "../controllers/AuthAdminController.js";

const router = express.Router();

router.get('/meadmin', MeAdmin);
router.post('/loginadmin', LoginAdmin);
router.delete('/logoutadmin', logoutAdmin);

export default router;