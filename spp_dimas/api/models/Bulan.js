import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pembayaran from "./Pembayaran.js";

const { DataTypes } = Sequelize;

const Bulan = db.define("bulan",
  {
    id_bulan: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bulan: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  },
  {
    freezeTableName: true,
  }
);

Bulan.removeAttribute("id")
Bulan.hasMany(Pembayaran, {
  foreignKey: "id_bulan",
});
Pembayaran.belongsTo(Bulan, {
  foreignKey: 'id_bulan'
});

export default Bulan;
