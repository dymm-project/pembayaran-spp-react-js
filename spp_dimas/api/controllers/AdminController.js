import Admin from "../models/Admin.js";
import argon2 from "argon2";
import Pembayaran from "../models/Pembayaran.js";
import {Op} from "sequelize";

export const getAdmins = async (req,res) => {
    try {
      const response = await Admin.findAll({
        include: [
          Pembayaran
        ],
      });
      if (response.length > 0) {
        res.status(200).json({
            message: "Data Semua Admin",
            data: response
        })
      } else {
        res.status(200).json({
            message: "Tidak Ada Data Admin",
            data: []
        })
      }
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
}

//ambil data semua admin
export const getAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Admin.count({
    where: {
      [Op.or]: [
        {
          nama_admin: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          username: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(limit / totalRows);
  const result = await Admin.findAll({
    include: [
      Pembayaran
    ],
    where: {
      [Op.or]: [
        {
          nama_admin: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          username: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id_admin", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      include: [
        Pembayaran
      ],
      where: {
        id_admin: req.params.id_admin,
      },
    });
    res.status(200).json({
      message: "Data Admin Di Temukan",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createAdmin = async (req, res) => {
  const namaAdmin = await Admin.findOne({
    where: {
      nama_admin: req.body.nama_admin,
    },
  });
  const usernameAdmin = await Admin.findOne({
    where: {
      username: req.body.username,
    },
  });

  const { nama_admin, username, password, confPassword } = req.body;

  if (namaAdmin)
    return res.status(400).json({ message: "Nama Admin Sudah Terdaftar" });
  if (usernameAdmin)
    return res.status(400).json({ message: "Usernane Admin Sudah Terdaftar" });

  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);

  try {
    const response = await Admin.create({
      nama_admin: nama_admin,
      username: username,
      password: hashPassword,
    });
    res.status(201).json({
      message: "Data Admin Berhasil Di Tambahkan",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id_admin: req.params.id_admin,
    },
  });
  const namaAdmin = await Admin.findOne({
    where: {
      nama_admin: req.body.nama_admin,
    },
  });
  const usernameAdmin = await Admin.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!admin)
    return res.status(404).json({ message: "Data Admin Tidak Di Temukan" });

  const { nama_admin, username, password, confPassword } = req.body;

  if (namaAdmin)
    return res.status(400).json({ message: "Nama Admin Sudah Terdaftar" });
  if (usernameAdmin)
    return res.status(400).json({ message: "Usernane Admin Sudah Terdaftar" });

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  try {
    await Admin.update(
      {
        nama_admin: nama_admin,
        username: username,
        password: hashPassword,
      },
      {
        where: {
          id_admin: req.params.id_admin,
        },
      }
    );
    res.status(201).json({
      message: "Data Admin Berhasil Di Update",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id_admin: req.params.id_admin,
    },
  });

  if (!admin)
    return res.status(404).json({ message: "Data Admin Tidak Di Temukan" });
  try {
    await Admin.destroy({
      where: {
        id_admin: req.params.id_admin,
      },
    });
    return res.status(200).json({ message: "Data Admin Berhasil Di Hapus" });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
