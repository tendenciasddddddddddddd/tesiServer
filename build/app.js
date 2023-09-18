"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _compression = _interopRequireDefault(require("compression"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _materias = _interopRequireDefault(require("./routes/Registros/materias.routes"));

var _docentes = _interopRequireDefault(require("./routes/Registros/docentes.routes"));

var _estudiantes = _interopRequireDefault(require("./routes/Registros/estudiantes.routes"));

var _cursos = _interopRequireDefault(require("./routes/Registros/cursos.routes"));

var _periodo = _interopRequireDefault(require("./routes/Registros/periodo.routes"));

var _autoridades = _interopRequireDefault(require("./routes/Registros/autoridades.routes"));

var _destrezas = _interopRequireDefault(require("./routes/Registros/destrezas.routes"));

var _fechas = _interopRequireDefault(require("./routes/fechas.routes"));

var _distributivo = _interopRequireDefault(require("./routes/Distributivos/distributivo.routes"));

var _tutores = _interopRequireDefault(require("./routes/Distributivos/tutores.routes"));

var _matriculas = _interopRequireDefault(require("./routes/Matriculas/matriculas.routes"));

var _respaldos = _interopRequireDefault(require("./routes/Matriculas/respaldos.routes"));

var _notas = _interopRequireDefault(require("./routes/Notas/notas.routes"));

var _reportes = _interopRequireDefault(require("./routes/Notas/reportes.routes"));

var _horarios = _interopRequireDefault(require("./routes/horarios.routes"));

var _hora = _interopRequireDefault(require("./routes/hora.routes"));

var _common = _interopRequireDefault(require("./routes/Notas/common.routes"));

var _subnivel = _interopRequireDefault(require("./routes/Notas/subnivel.routes"));

var _cualitativo = _interopRequireDefault(require("./routes/Notas/cualitativo.routes"));

var _elemental = _interopRequireDefault(require("./routes/Notas/elemental.routes"));

var _ = _interopRequireDefault(require("./routes/History/2023.routes"));

var _aulas = _interopRequireDefault(require("./routes/Aulas/aulas.routes"));

var _tareas = _interopRequireDefault(require("./routes/Aulas/tareas.routes"));

var _libros = _interopRequireDefault(require("./routes/Aulas/libros.routes"));

var _lecturas = _interopRequireDefault(require("./routes/Aulas/lecturas.routes"));

var _videos = _interopRequireDefault(require("./routes/Aulas/videos.routes"));

var _youtube = _interopRequireDefault(require("./routes/Aulas/youtube.routes"));

var _evaluacion = _interopRequireDefault(require("./routes/Aulas/evaluacion.routes"));

var _foros = _interopRequireDefault(require("./routes/Aulas/foros.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _upload = _interopRequireDefault(require("./routes/Archivos/upload"));

var _repositorio = _interopRequireDefault(require("./routes/repositorio.routes"));

var _notificacion = _interopRequireDefault(require("./routes/Notifications/notificacion.routes"));

var _logs = _interopRequireDefault(require("./routes/logs.routes"));

var _index = _interopRequireDefault(require("./public/routes/index"));

var _sitemap = _interopRequireDefault(require("./service/sitemap"));

var _initialSetup = require("./libs/initialSetup");

var _migrarDB = require("./libs/migrarDB");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var app = (0, _express.default)(); //createRoles();
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

var corsOptions = {
  origin: '*',
  // http://localhost:8080
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use((0, _cors.default)(corsOptions));
//app.use((0, _morgan.default)("dev"));
app.use(_express.default.json({
  limit: '50mb'
}));
app.use(_express.default.urlencoded({
  limit: '50mb'
})); // settings

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');
app.use((0, _compression.default)());
app.use('/uploads', _express.default.static(path.join(__dirname, '..', 'videos')));
app.use(_express.default.static(path.join(__dirname, "public")));
app.use('/', _index.default);
app.use("/api/auth", _auth.default);
app.use("/api/upload", _upload.default);
app.use("/api/users", _user.default);
app.use("/api/estudiantes", _estudiantes.default);
app.use("/api/docentes", _docentes.default);
app.use("/api/cursos", _cursos.default);
app.use("/api/autoridades", _autoridades.default);
app.use("/api/materias", _materias.default);
app.use("/api/periodo", _periodo.default);
app.use("/api/destrezas", _destrezas.default);
app.use("/api/notificacion", _notificacion.default);
app.use("/api/distributivo", _distributivo.default);
app.use("/api/tutores", _tutores.default);
app.use("/api/matriculas", _matriculas.default);
app.use("/api/respaldos", _respaldos.default);
app.use("/api/notas", _notas.default);
app.use("/api/repositorio", _repositorio.default);
app.use("/api/fechas", _fechas.default);
app.use("/api/horarios", _horarios.default);
app.use("/api/hora", _hora.default);
app.use("/api/aulas", _aulas.default);
app.use("/api/tareas", _tareas.default);
app.use("/api/libros", _libros.default);
app.use("/api/lecturas", _lecturas.default);
app.use("/api/videos", _videos.default);
app.use("/api/youtube", _youtube.default);
app.use("/api/eva", _evaluacion.default);
app.use("/api/foros", _foros.default);
app.use("/api/logs", _logs.default);
app.use("/api/reportes", _reportes.default);
/* CALIFICACIONES */

app.use("/api/common", _common.default);
app.use("/api/subnivel", _subnivel.default);
app.use("/api/cualitativo", _cualitativo.default);
app.use("/api/elemental", _elemental.default);
/* HISTORIAL REPORTES */

app.use("/api/rep2023", _.default); //sitemap

app.use("/sitemap.xml", _sitemap.default);
var _default = app;
exports.default = _default;