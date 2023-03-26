import Siswa from "../models/Siswa.js";
import Kelas from "../models/Kelas.js"
import Spp from "../models/Spp.js"
import Pembayaran from "../models/Pembayaran.js";

export const LoginSiswa = async (req, res) =>{
    const siswa = await Siswa.findOne({
        where: {
            nama : req.body.nama
        },
    })
    const match = await Siswa.findOne({
        where: {
            nisn : req.body.nisn
        }
    })
    if(!siswa) return res.status(404).json({message: "User Tidak Di Temukan"});
    if(!match) return res.status(400).json({message: "Password Salah"});
    req.session.id_siswa = siswa.id_siswa;
    const id_siswa = siswa.id_siswa;
    const id_kelas = siswa.id_kelas;
    const id_spp = siswa.id_spp;
    const nisn = siswa.nisn;
    const nama = siswa.nama;
    const alamat = siswa.alamat;
    const no_telp = siswa.no_telp;
    res.status(200).json({id_siswa, id_kelas, id_spp, nisn, nama, alamat, no_telp});
}

export const MeSiswa = async (req, res) =>{
    if(!req.session.id_siswa){
        return res.status(401).json({message: "Mohon login ke akun Anda!"});
    }
    const siswa = await Siswa.findOne({
        attributes:['id_siswa','id_kelas','id_spp','nisn', 'nama', 'alamat', 'no_telp'],
        include: [
            Kelas, Spp, Pembayaran
        ],
        where: {
            id_siswa: req.session.id_siswa
        }
    });
    if(!siswa) return res.status(404).json({message: "siswa tidak ditemukan"});
    res.status(200).json(siswa);
}

export const logOutSiswa = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({message: "Tidak dapat logout"});
        res.status(200).json({message: "Anda telah logout"});
    });
}