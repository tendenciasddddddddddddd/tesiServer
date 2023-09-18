const path = require('path');
import express from 'express';
import morgan from "morgan";
import compression from "compression"

import authRoutes from "./routes/auth.routes";

//---------------------REGISTROS---------------------
import materiasRoutes from "./routes/Registros/materias.routes"
import docentesRoutes from "./routes/Registros/docentes.routes"
import estudiantesRoutes from "./routes/Registros/estudiantes.routes"
import cursosRoutes from "./routes/Registros/cursos.routes"
import periodoRoutes from "./routes/Registros/periodo.routes"
import autoridadesRoutes from "./routes/Registros/autoridades.routes"
import destrezasRoutes from "./routes/Registros/destrezas.routes"
import fechasRoutes from "./routes/fechas.routes"
//---------------------DISTRIBUTIVOS--------------------
import distributivoRoutes from './routes/Distributivos/distributivo.routes';
import tutoresRoutes from './routes/Distributivos/tutores.routes'
//---------------------MATRICULAS--------------------
import matriculasRoutes from './routes/Matriculas/matriculas.routes';
import respaldosRoutes from './routes/Matriculas/respaldos.routes';
import notasRoutes from './routes/Notas/notas.routes';
import reportesRoutes from './routes/Notas/reportes.routes';
//---------------------HORARIOS--------------------
import horariosRoutes from './routes/horarios.routes';
import horaRoutes from './routes/hora.routes';

/*  CALIFICACIONES  */
import commonRoutes from './routes/Notas/common.routes';
import subnivelRoutes from './routes/Notas/subnivel.routes';
import cualitativoRoutes from './routes/Notas/cualitativo.routes';
import elementalRoutes from './routes/Notas/elemental.routes';

/*  HISTORIAL REPORTES  */
import r2023Routes from './routes/History/2023.routes';

//---------------------AULAS VIRTUALES--------------------
import aulasRoutes from './routes/Aulas/aulas.routes';
import tareasRoutes from './routes/Aulas/tareas.routes';
import librosRoutes from './routes/Aulas/libros.routes';
import lecturasRoutes from './routes/Aulas/lecturas.routes';
import videosRoutes from './routes/Aulas/videos.routes';
import youtubeRoutes from './routes/Aulas/youtube.routes';
import evaluacionRoutes from './routes/Aulas/evaluacion.routes';
import forosRoutes from './routes/Aulas/foros.routes';

import usuarios from "./routes/user.routes"
import uploads from "./routes/Archivos/upload"
import repositorioRoutes from "./routes/repositorio.routes"

import notificacionRoutes from "./routes/Notifications/notificacion.routes"
import logsRoutes from "./routes/logs.routes"
//PUBLIC
import publico from "./public/routes/index"

//SITEMA
import sitemapRouter from "./service/sitemap"

import { createRoles, createAdmin, config, aplicaciones, apertura, iniciarSecuencia} from "./libs/initialSetup";
import {migracionMatricula,migracionDistributivo, temporalMatricula, deleteMatriculasMany } from "./libs/migrarDB";
const app = express();
//createRoles();
//createAdmin();
//aplicaciones();
//config()
//apertura()
//iniciarSecuencia()

//===========0=PELIGRO =================================
//migracionMatricula();
//migracionDistributivo()
//temporalMatricula();
//deleteMatriculasMany();

import cors from "cors";

var corsOptions = {
  origin: '*', // http://localhost:8080
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// settings
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

app.use(compression())
//app.use('/uploads', express.static(__dirname +'../videos'));
app.use('/uploads', express.static(path.join(__dirname, '..', 'videos')))
app.use('/images', express.static(path.join(__dirname, '..', 'images')))
//app.use(express.static(__dirname + '/public/assets'));
app.use('/assets', express.static(__dirname + '/public/assets'))
app.use('/', publico);

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploads);
app.use("/api/users", usuarios);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/docentes", docentesRoutes);
app.use("/api/cursos", cursosRoutes)
app.use("/api/autoridades", autoridadesRoutes)
app.use("/api/materias", materiasRoutes)
app.use("/api/periodo", periodoRoutes)
app.use("/api/destrezas", destrezasRoutes)
app.use("/api/notificacion", notificacionRoutes)
app.use("/api/distributivo", distributivoRoutes)
app.use("/api/tutores", tutoresRoutes)
app.use("/api/matriculas", matriculasRoutes)
app.use("/api/respaldos", respaldosRoutes)
app.use("/api/notas", notasRoutes)
app.use("/api/repositorio",repositorioRoutes)
app.use("/api/fechas",fechasRoutes)
app.use("/api/horarios",horariosRoutes)
app.use("/api/hora",horaRoutes)
app.use("/api/aulas",aulasRoutes)
app.use("/api/tareas",tareasRoutes)
app.use("/api/libros",librosRoutes)
app.use("/api/lecturas",lecturasRoutes)
app.use("/api/videos",videosRoutes)
app.use("/api/youtube",youtubeRoutes)
app.use("/api/eva",evaluacionRoutes)
app.use("/api/foros",forosRoutes)
app.use("/api/logs",logsRoutes)
app.use("/api/reportes",reportesRoutes)

/* CALIFICACIONES */
app.use("/api/common",commonRoutes)
app.use("/api/subnivel",subnivelRoutes)
app.use("/api/cualitativo",cualitativoRoutes)
app.use("/api/elemental",elementalRoutes)

/* HISTORIAL REPORTES */
app.use("/api/rep2023",r2023Routes)

//sitemap
app.use("/sitemap.xml", sitemapRouter);
export default app;