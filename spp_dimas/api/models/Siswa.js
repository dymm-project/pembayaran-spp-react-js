import { Sequelize } from "sequelize"
import db from "../config/Database.js"
const {DataTypes} = Sequelize

const Siswa = db.define("siswa", {
    id_siswa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_kelas:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_spp:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nama: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nisn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    no_telp: {
        type: DataTypes.STRING(13),
        allowNull: false
    },

}, {
    freezeTableName: true
})

export default Siswa