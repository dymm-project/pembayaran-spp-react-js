import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Admin from "./Admin.js";
import Siswa from "./Siswa.js";

const {DataTypes} = Sequelize;

const Pembayaran = db.define('pembayaran',{
    id_pembayaran: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_admin:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_siswa:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_spp:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_bulan:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    thn_bayar: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    transaksi_date: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    total: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
},{
    freezeTableName: true
});

Siswa.hasMany(Pembayaran, {foreignKey: 'id_siswa'});
Pembayaran.belongsTo(Siswa, {foreignKey: 'id_siswa'});

Admin.hasMany(Pembayaran, {foreignKey: 'id_admin'});
Pembayaran.belongsTo(Admin, {foreignKey: 'id_admin'});


export default Pembayaran;