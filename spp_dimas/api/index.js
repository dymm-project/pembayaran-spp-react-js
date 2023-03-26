import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AdminRoute from "./routes/AdminRoute.js";
import AuthSiswaRoute from "./routes/AuthSiswaRoute.js";
import AuthAdminRoute from "./routes/AuthAdminRoute.js";
import PembayaranRoute from "./routes/PembayaranRoute.js";
import HistoryPembayaranRoute from "./routes/HistoryPembayaranRoute.js";
import SiswaRoute from "./routes/SiswaRoute.js";
import BulanRoute from "./routes/BulanRouter.js";
import KelasRoute from "./routes/KelasRouter.js";
import SppRoute from "./routes/SppRouter.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync({alter: true});
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(SiswaRoute);
app.use(PembayaranRoute);
app.use(AuthSiswaRoute);
app.use(AuthAdminRoute);
app.use(HistoryPembayaranRoute);
app.use(AdminRoute);
app.use(BulanRoute);
app.use(SppRoute);
app.use(KelasRoute);


// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
