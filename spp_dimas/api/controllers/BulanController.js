import Bulan from "../models/Bulan.js";

export const getBulan = async (req, res) => {
    try {
      const response = await Bulan.findAll({
        attributes: ["id_bulan", "bulan"],
      });
      if (response.length > 0) {
        res.status(200).json({
            message: "Data Semua Bulan",
            data: response
        })
      } else {
        res.status(200).json({
            message: "Tidak Ada Data Bulan",
            data: []
        })
      }
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  };