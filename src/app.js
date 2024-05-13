import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import express from 'express';
import morgan from "morgan";
import compression from "compression"
import authRoutes from "./routes/auth.routes.js";

//---------------------REGISTROS---------------------
import usuarioRoutes from "./routes/user.routes.js"
import clienteRoutes from "./routes/cliente.routes.js"

import cajasRoutes from "./routes/Cajas/cajas.routes.js"
import HistorialRoutes from "./routes/Cajas/historial.routes.js"

import archivadorRoutes from "./routes/archivador.routes.js"
import serviciosRoutes from "./routes/servicios.routes.js"
import reportesRoutes from "./routes/reportes.routes.js"

import agenciaRoutes from "./routes/Registros/agencia.routes.js"

import { createRoles, createAdmin,createAgencia } from "./libs/initialSetup.js";
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

app.set('view engine', 'ejs');

app.use(compression())

app.use('/uploads/documentos_xml/', express.static(path.join(__dirname, '..', 'documentos_xml')))

app.use("/api/auth", authRoutes);
app.use("/api/users", usuarioRoutes);
app.use("/api/cliente", clienteRoutes);

app.use("/api/archivador", archivadorRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/reportes", reportesRoutes);

app.use("/api/agencia", agenciaRoutes)

app.use("/api/cajas", cajasRoutes)
app.use("/api/historial", HistorialRoutes)

export default app;