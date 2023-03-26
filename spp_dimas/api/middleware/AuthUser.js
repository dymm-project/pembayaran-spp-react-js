import Admin from "../models/Admin.js";
import Siswa from "../models/Siswa.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.id_siswa){
        return res.status(401).json({message: "Mohon login ke akun Anda!"});
    }
    const siswa = await Siswa.findOne({
        where: {
            id_siswa: req.session.id_siswa
        }
    });
    if(!siswa) return res.status(404).json({message: "Siswa Tidak Di Temukan"});
    req.id_siswa = siswa.id_siswa
    next();
}

export const verifyAdmin = async (req, res, next) =>{
    if(!req.session.id_admin){
        return res.status(401).json({message: "Mohon login ke akun Anda!"});
    }
    const admin = await Admin.findOne({
        where: {
            id_admin: req.session.id_admin
        }
    });
    if(!admin) return res.status(404).json({message: "Admin Tidak Di Temukan"});
    req.id_admin = admin.id_admin
    next();
}