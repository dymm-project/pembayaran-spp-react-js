import {Sequelize} from "sequelize";

const db = new Sequelize('sekolah_spp', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;