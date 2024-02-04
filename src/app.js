const path = require('path');
import express from 'express';
import morgan from "morgan";
import compression from "compression"
import authRoutes from "./routes/auth.routes";

//---------------------REGISTROS---------------------
import usuarioRoutes from "./routes/user.routes"
import clienteRoutes from "./routes/cliente.routes"

import archivadorRoutes from "./routes/archivador.routes"
import serviciosRoutes from "./routes/servicios.routes"

import uploads from "./routes/Archivos/upload"
import repositorioRoutes from "./routes/repositorio.routes"
import notificacionRoutes from "./routes/Notifications/notificacion.routes"

import agenciaRoutes from "./routes/Registros/agencia.routes.js"
import driveRoutes from "./routes/drive.routes.js"

import { createRoles, createAdmin,createAgencia } from "./libs/initialSetup";
const app = express();
//createRoles();
//createAdmin();
//createAgencia()

import cors from "cors";

var corsOptions = {
  origin: '*', // http://localhost:8080
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(compression())

app.use('/uploads', express.static(path.join(__dirname, '..', 'archivoss')))

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploads);
app.use("/api/users", usuarioRoutes);
app.use("/api/cliente", clienteRoutes);

app.use("/api/archivador", archivadorRoutes);
app.use("/api/servicios", serviciosRoutes);

app.use("/api/notificacion", notificacionRoutes)
app.use("/api/repositorio",repositorioRoutes)
app.use("/api/agencia", agenciaRoutes)
app.use("/api/drive",driveRoutes)

export default app;