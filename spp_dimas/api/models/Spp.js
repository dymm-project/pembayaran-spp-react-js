import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Pembayaran from "./Pembayaran.js"
import Siswa from "./Siswa.js"

const {DataTypes} = Sequelize

const Spp = db.define("spp", {
    id_spp: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    thn_ajaran: {
        type: DataTypes.INTEGER(20),
        allowNull: false
    },
    nominal: {
        type: DataTypes.INTEGER(250),
        allowNull: false
    }
}, {
    freezeTableName: true
})


Spp.removeAttribute("id")
Spp.hasMany(Siswa, {
    foreignKey: "id_spp",
})
Siswa.belongsTo(Spp, {
    foreignKey: "id_spp"
})

Spp.hasMany(Pembayaran, {
    foreignKey: "id_spp",
});
Pembayaran.belongsTo(Spp, {
    foreignKey: 'id_spp'
});

export default Spp