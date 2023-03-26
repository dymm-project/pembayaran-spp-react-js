import Spp from "../models/Spp.js"
import Siswa from "../models/Siswa.js";
import {Op} from "sequelize";

export const getSpps = async (req, res) => {
  try {
    const response = await Spp.findAll({
      include: {
        model: Siswa
      },
    });
    if (response.length > 0) {
      res.status(200).json({
        message: "Data Semua Spp",
        data: response,
      });
    } else {
      res.status(200).json({
        message: "Tidak Ada Data Spp",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getSpp = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Spp.count({
    where: {
      [Op.or]: [
        {
          thn_ajaran: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          nominal: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(limit / totalRows);
  const result = await Spp.findAll({
    include: {
      model: Siswa
    },
    where: {
      [Op.or]: [
        {
          thn_ajaran: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          nominal: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id_spp", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
}

export const getSppById = async (req, res) => {
    try {
        const response = await Spp.findOne({
          where: {
            id_spp: req.params.id_spp,
          },
        });
        if (!response) return res.status(404).json({ message: "Data Spp Tidak Di Temukan" });
        res.status(200).json({
          message: "Data Spp Di Temukan",
          data: response
        })
      } catch (error) {
        res.status(404).json({
          message: error.message
        })
      }
}

export const createSpp = async (req, res) => {
    const sppThn = await Spp.findOne({
        where: {
          thn_ajaran: req.body.thn_ajaran,
        },
      });
    
      if (sppThn) return res.status(400).json({ message: "Data Tahun Ajaran Spp Sudah Terdaftar" });
      
      const { thn_ajaran, nominal } = req.body;
      try {
        const response = await Spp.create({
            thn_ajaran: thn_ajaran,
            nominal: nominal
        });
        res.status(201).json({
          message: "Data spp Berhasil Di Tambahkan",
          data: response
        }) 
      } catch (error) {
        res.status(404).json({
          message: error.message
        })
      }
}

export const updateSpp = async (req, res) => {
    const findSpp = await Spp.findOne({
        where: {
          id_spp: req.params.id_spp,
        },
      });
    
      if (!findSpp) return res.status(404).json({ message: "Data Spp Tidak Di Temukan" });
    
      const { thn_ajaran, nominal } = req.body;
      try {
        await Spp.update(
          {
            thn_ajaran: thn_ajaran,
            nominal: nominal
          },
          {
            where: {
              id_spp: req.params.id_spp,
            },
          }
        );
        res.status(201).json({
          message: "Data Spp Berhasil Di Update"
        }) 
      } catch (error) {
        res.status(404).json({
          message: error.message
        })
      }
}

export const deleteSpp = async (req, res) => {
    const findSpp = await Spp.findOne({
        where: {
          id_spp: req.params.id_spp,
        },
      });
    
      if (!findSpp) return res.status(404).json({ message: "Data Spp Tidak Di Temukan" });
    
      try {
        await Spp.destroy({
          where: {
            id_spp: req.params.id_spp,
          },
        });
        res.status(201).json({
          message: "Data Spp Berhasil Di Hapus",
        }) 
      } catch (error) {
        res.status(404).json({
          message: error.message
        })
    }
}