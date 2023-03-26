import Bulan from "../models/Bulan.js";
import Admin from "../models/Admin.js";
import Siswa from "../models/Siswa.js";
import Spp from "../models/Spp.js";
import Pembayaran from "../models/Pembayaran.js";
import Kelas from "../models/Kelas.js";
import { Op } from "sequelize";

export const getHistoryPembayaran = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Pembayaran.count({
    where: {
      id_siswa: req.id_siswa,
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
      id_siswa: req.id_siswa,
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
