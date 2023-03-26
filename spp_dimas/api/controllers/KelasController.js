import Kelas from "../models/Kelas.js";
import Siswa from "../models/Siswa.js";
import { Op } from "sequelize";

export const getKelass = async (req, res) => {
  try {
    const response = await Kelas.findAll({
      attributes: ["id_kelas", "kelas", "jurusan"],
      include: {
        model: Siswa,
        attributes: [
          "id_siswa",
          "id_kelas",
          "id_spp",
          "nama",
          "nisn",
          "alamat",
          "no_telp",
        ],
      },
    });
    if (response.length > 0) {
      res.status(200).json({
        message: "Data Semua Kelas",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "Tidak Ada Data Kelas",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getKelas = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Kelas.count({
    where: {
      [Op.or]: [
        {
          kelas: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          jurusan: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(limit / totalRows);
  const result = await Kelas.findAll({
    attributes: ["id_kelas", "kelas", "jurusan"],
    include: {
      model: Siswa,
      attributes: [
        "id_siswa",
        "id_kelas",
        "id_spp",
        "nama",
        "nisn",
        "alamat",
        "no_telp",
      ],
    },
    where: {
      [Op.or]: [
        {
          kelas: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          jurusan: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id_kelas", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

// Ambil Data Kelas Berdasarkan ID
export const getKelasById = async (req, res) => {
  try {
    const response = await Kelas.findOne({
      where: {
        id_kelas: req.params.id_kelas,
      },
      attributes: ["id_kelas", "kelas", "jurusan"],
      include: {
        model: Siswa,
        attributes: [
          "id_siswa",
          "id_kelas",
          "id_spp",
          "nama",
          "nisn",
          "alamat",
          "no_telp",
        ],
      },
    });
    if (!response)
      return res.status(404).json({ message: "Data Kelas Tidak Di Temukan" });
    res.status(200).json({
      message: "Data Kelas Ditemukan",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Menambahkan Data Kelas
export const createKelas = async (req, res) => {
  const { kelas, jurusan } = req.body;
  try {
    const response = await Kelas.create({
      kelas: kelas,
      jurusan: jurusan,
    });
    res.status(201).json({
      message: "Data Kelas Berhasil Di Tambahkan",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Mengupdate Data Kelas
export const updateKelas = async (req, res) => {
  const findKelas = await Kelas.findOne({
    where: {
      id_kelas: req.params.id_kelas,
    },
  });

  if (!findKelas)
    return res.status(404).json({ message: "Data Kelas Tidak Di Temukan" });

  const { kelas, jurusan } = req.body;
  try {
    await Kelas.update(
      {
        kelas: kelas,
        jurusan: jurusan,
      },
      {
        where: {
          id_kelas: req.params.id_kelas,
        },
      }
    );
    res.status(201).json({
      message: "Data Kelas Berhasil Di Update",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Menghapus Data Kelas
export const deleteKelas = async (req, res) => {
  const findKelas = await Kelas.findOne({
    where: {
      id_kelas: req.params.id_kelas,
    },
  });

  if (!findKelas)
    return res.status(404).json({ message: "Data Kelas Tidak Di Temukan" });

  try {
    await Kelas.destroy({
      where: {
        id_kelas: req.params.id_kelas,
      },
    });
    res.status(201).json({
      message: "Data Kelas Berhasil Di Hapus",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
