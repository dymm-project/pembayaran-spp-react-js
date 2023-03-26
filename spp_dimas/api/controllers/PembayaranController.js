import Bulan from "../models/Bulan.js";
import Admin from "../models/Admin.js";
import Pembayaran from "../models/Pembayaran.js";
import Siswa from "../models/Siswa.js";
import Spp from "../models/Spp.js";
import Kelas from "../models/Kelas.js"
import { Op } from "sequelize";

export const getPembayarans = async (req, res) => {
  try {
    const response = await Pembayaran.findAll({
      include: [
        Admin,
        {
          model: Siswa,
          include: [Kelas, Spp],
        },
        Bulan
      ],
    });
    if (response.length > 0) {
      res.status(200).json({
        message: "Data Semua Pembayaran",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "Tidak Ada Data Pembayaran",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getPembayaranAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Pembayaran.count({
    where: {
      [Op.or]: [
        {
          transaksi_date: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          thn_bayar: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          total: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(limit / totalRows);
  const result = await Pembayaran.findAll({
    include: [
      Admin,
      {
        model: Siswa,
        include: [Kelas, Spp],
      },
      Bulan
    ],
    where: {
      [Op.or]: [
        {
          transaksi_date: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          thn_bayar: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          total: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id_pembayaran", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

export const getPembayaranById = async (req, res) => {
  try {
    const response = await Pembayaran.findOne({
      where: {
        id_pembayaran: req.params.id_pembayaran,
      },
      include: [
        Admin,
        {
          model: Siswa,
          include: [Kelas, Spp],
        },
        Bulan
      ],
    });
    if (!response)
      return res
        .status(404)
        .json({ message: "Data Pembayaran Tidak Di Temukan" });
    res.status(200).json({
      message: "Data Pembayaran Ditemukan",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPembayaran = async (req, res) => {
  const dataSiswa = await Siswa.findOne({
    where: {
      id_siswa: req.body.id_siswa,
    },
  });
  const dataSpp = await Spp.findOne({
    where: {
      id_spp: req.body.id_spp,
    },
  });
  const dataBulan = await Bulan.findOne({
    where: {
      id_bulan: req.body.id_bulan,
    },
  });
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let fulldate = date + "-" + month + "-" + year;

  const { id_siswa, id_spp, id_bulan, thn_bayar, total } = req.body;
  if (!dataSiswa)
    return res.status(404).json({ message: "Data Siswa Tidak Di Temukan" });
  if (!dataSpp)
    return res.status(404).json({ message: "Data Spp Tidak Di Temukan" });
  if (!dataBulan)
    return res.status(404).json({ message: "Data Bulan Tidak Di Temukan" });

  try {
    const response = await Pembayaran.create({
      id_admin: req.id_admin,
      id_siswa: id_siswa,
      id_spp: id_spp,
      id_bulan: id_bulan,
      thn_bayar: thn_bayar,
      transaksi_date: fulldate,
      total: total,
    });
    res.status(201).json({
      message: "Data Pembayaran Berhasil Di Tambahkan",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updatePembayaran = async (req, res) => {
  const findPembayaran = await Pembayaran.findOne({
    where: {
      id_pembayaran: req.params.id_pembayaran,
    },
  });
  const dataSiswa = await Siswa.findOne({
    where: {
      id_siswa: req.body.id_siswa,
    },
  });
  const dataSpp = await Spp.findOne({
    where: {
      id_spp: req.body.id_spp,
    },
  });
  const dataBulan = await Bulan.findOne({
    where: {
      id_bulan: req.body.id_bulan,
    },
  });
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let fulldate = date + "-" + month + "-" + year;

  if (!findPembayaran)
    return res
      .status(404)
      .json({ message: "Data Pembayaran Tidak Di Temukan" });
  if (!dataSiswa)
    return res.status(404).json({ message: "Data Siswa Tidak Di Temukan" });
  if (!dataSpp)
    return res.status(404).json({ message: "Data Spp Tidak Di Temukan" });
  if (!dataBulan)
    return res.status(404).json({ message: "Data Bulan Tidak Di Temukan" });

  const { id_siswa, id_spp, id_bulan, thn_bayar, total } = req.body;
  try {
    await Pembayaran.update(
      {
        id_admin: req.id_admin,
        id_siswa: id_siswa,
        id_spp: id_spp,
        id_bulan: id_bulan,
        thn_bayar: thn_bayar,
        total: total,
      },
      {
        where: {
          id_pembayaran: req.params.id_pembayaran,
        },
      }
    );
    res.status(201).json({
      message: "Data Pembayaran Berhasil Di Update",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const deletePembayaran = async (req, res) => {
  const response = await Pembayaran.findOne({
    where: {
      id_pembayaran: req.params.id_pembayaran,
    },
  });
  if (!response)
    return res
      .status(404)
      .json({ message: "Data Pembayaran Tidak Di Temukan" });

  try {
    await Pembayaran.destroy({
      where: {
        id_pembayaran: req.params.id_pembayaran,
      },
    });
    res.status(201).json({
      message: "Data Pembayaran Berhasil Di Hapus",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
