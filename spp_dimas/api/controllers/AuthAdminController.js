import Admin from "../models/Admin.js";
import argon2 from "argon2";

export const LoginAdmin =  async (req,res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                username: req.body.username
            }
        })
        if(!admin) return res.status(404).json({message: "User Tidak Di Temukan"});
        const match = await argon2.verify(admin.password, req.body.password);
        if(!match) return res.status(400).json({message: "Password Salah"});
        req.session.id_admin = admin.id_admin;
        const id_admin = admin.id_admin;
        const nama_admin = admin.nama_admin
        const username = admin.username;
        const password = admin.password;
        res.status(200).json({id_admin, nama_admin, username, password});
    } catch (error) {
        res.status(404).json({
            message: error.message
          })
    }
}

export const MeAdmin = async (req, res) =>{
    if(!req.session.id_admin){
        return res.status(401).json({message: "Mohon Login Ke Akun Anda!"});
    }
    const admin = await Admin.findOne({
        attributes:['id_admin', 'nama_admin', 'username', 'password'],
        where: {
            id_admin: req.session.id_admin
        }
    });
    if(!admin) return res.status(404).json({message: "User Tidak Di Temukan"});
    res.status(200).json(admin);
}

export const logoutAdmin = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({message: "Tidak dapat logout"});
        res.status(200).json({message: "Anda telah logout"});
    });
}