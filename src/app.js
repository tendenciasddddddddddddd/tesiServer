const path = require('path');
import express from 'express';
import morgan from "morgan";
import compression from "compression"
import authRoutes from "./routes/auth.routes";

//---------------------REGISTROS---------------------
import usuarios from "./routes/user.routes"
import uploads from "./routes/Archivos/upload"
import repositorioRoutes from "./routes/repositorio.routes"
import notificacionRoutes from "./routes/Notifications/notificacion.routes"

import { createRoles, createAdmin, } from "./libs/initialSetup";
const app = express();
//createRoles();
//createAdmin();


import cors from "cors";

var corsOptions = {
  origin: '*', // http://localhost:8080
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(compression())

app.use('/uploads', express.static(path.join(__dirname, '..', 'archivoss')))

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploads);
app.use("/api/users", usuarios);
app.use("/api/notificacion", notificacionRoutes)
app.use("/api/repositorio",repositorioRoutes)

export default app;