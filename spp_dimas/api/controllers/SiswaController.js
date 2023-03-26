import Siswa from "../models/Siswa.js";
import Kelas from "../models/Kelas.js";
import Spp from "../models/Spp.js";
import Pembayaran from "../models/Pembayaran.js";
import {Op} from "sequelize";
import Bulan from "../models/Bulan.js";

export const getSiswas = async (req,res) => {
  try {
    const response = await Siswa.findAll({
      attributes: ["id_siswa", "id_kelas", "id_spp", "nama", "nisn", "alamat", "no_telp"],
      include: [
        Kelas,
        Spp,
        {
          model: Pembayaran,
          include: [Bulan]
        }
      ],
    });
    if (response.length > 0) {
      res.status(200).json({
        message: "Data Semua Siswa",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "Tidak Ada Data Siswa",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getSiswa = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Siswa.count({
    where: {
      [Op.or]: [
        {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          nisn: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(limit / totalRows);
  const result = await Siswa.findAll({
    attributes: ["id_siswa", "id_kelas", "id_spp", "nama", "nisn", "alamat", "no_telp"],
    include: [
      Kelas, Spp, Pembayaran
    ],
    where: {
      [Op.or]: [
        {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          nisn: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id_siswa", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

// Ambil Data Siswa Berdasarkan ID
export const getSiswaByNisn = async (req, res) => {
  try {
    const response = await Siswa.findOne({
      attributes: ["id_siswa", "id_kelas", "id_spp", "nama", "nisn", "alamat", "no_telp"],
      where: {
        nisn: req.params.nisn
      },
      include: [
        Kelas, Spp, Pembayaran
      ],
    });
    if (!response) return res.status(404).json({ message: "Data Siswa Tidak Di Temukan" });
    res.status(200).json({
      message: "Data Siswa Di Temukan",
      data: response
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
};

// Menambahkan Data Siswa
export const createSiswa = async (req, res) => {
  const nisnSiswa = await Siswa.findOne({
    where: {
      nisn: req.body.nisn,
    },
  });
  const namaSiswa = await Siswa.findOne({
    where: {
      nama: req.body.nama,
    },
  });
  const kelasSiswa = await Kelas.findOne({
    where: {
      id_kelas: req.body.id_kelas
    },
  });
  const sppSiswa = await Spp.findOne({
    where: {
      id_spp: req.body.id_spp
    },
  });

  const { id_kelas, id_spp, nama, nisn, alamat, no_telp } = req.body;
  if (!kelasSiswa) return res.status(404).json({ message: "Data Kelas Tidak Di Temukan" });
  if (!sppSiswa) return res.status(404).json({ message: "Data Spp Tidak Di Temukan" });
  if (nisnSiswa) return res.status(400).json({ message: "NISN Sudah Terdaftar" });
  if (namaSiswa) return res.status(400).json({ message: "Nama Siswa Sudah Terdaftar" });

  try {
    const response = await Siswa.create({
      id_kelas: id_kelas,
      id_spp: id_spp,
      nama: nama,
      nisn: nisn,
      alamat: alamat,
      no_telp: no_telp,
    });
    res.status(201).json({
      message: "Data Siswa Berhasil Di Tambahkan",
      data: response
    }) 
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
};

// Mengupdate Data Siswa
export const updateSiswa = async (req, res) => {
  const siswa = await Siswa.findOne({
    where: {
      nisn: req.params.nisn,
    },
  });
  const kelasSiswa = await Kelas.findOne({
    where: {
      id_kelas: req.body.id_kelas
    },
  });
  const sppSiswa = await Spp.findOne({
    where: {
      id_spp: req.body.id_spp
    },
  });

  if (!sppSiswa) return res.status(404).json({ message: "Data Spp Tidak Di Temukan" });
  if (!kelasSiswa) return res.status(404).json({ message: "Data Kelas Tidak Di Temukan" });
  if (!siswa) return res.status(404).json({ message: "Data Siswa Tidak Di Temukan" });

  const { id_kelas, id_spp, nama, nisn, no_telp, alamat } = req.body;

  try {
    await Siswa.update(
      {
        id_kelas: id_kelas,
        id_spp: id_spp,
        nama: nama,
        nisn: nisn,
        alamat: alamat,
        no_telp: no_telp,
      },
      {
        where: {
          nisn: req.params.nisn,
        },
      }
    );
    res.status(201).json({
      message: "Data Siswa Berhasil Di Update"
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
};

// Menghapus Data Siswa
export const deleteSiswa = async (req, res) => {
  const siswa = await Siswa.findOne({
    where: {
      nisn: req.params.nisn,
    },
  });
  if (!siswa) return res.status(404).json({ message: "Data Siswa Tidak Di Temukan" });
  try {
    await Siswa.destroy({
      where: {
        nisn: req.params.nisn,
      },
    });
    return res.status(200).json({ message: "Data Siswa Berhasil Di Hapus" });
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
};