"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = exports.activate = exports.createEstudianteMany = exports.createEstudiante = exports.deleteEstudianteById = exports.updateRepresentante = exports.updateEstudianteById = exports.getEstudianteById = exports.getListEstudAulas = exports.getListasEstudiantes = exports.getEstudiantes = void 0;

var _Estudiante = _interopRequireDefault(require("../../models/registros/Estudiante"));

var _Role = _interopRequireDefault(require("../../models/Role"));

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function editarMatricula(_x, _x2) {
  return _editarMatricula.apply(this, arguments);
}

function _editarMatricula() {
  _editarMatricula = _asyncToGenerator(function* (keyEstudiante, modelo) {
    try {
      var estudiante = {
        _id: modelo._id,
        fullname: modelo.fullname,
        cedula: modelo.cedula
      };
      yield _Matriculas.default.updateMany({}, {
        $set: {
          "matriculas.$[perf].estudiante": estudiante
        }
      }, {
        arrayFilters: [{
          "perf.fkestudiante": {
            $eq: keyEstudiante
          }
        }],
        new: true
      });
    } catch (error) {}
  });
  return _editarMatricula.apply(this, arguments);
}

function eliminarMatricula(_x3) {
  return _eliminarMatricula.apply(this, arguments);
}

function _eliminarMatricula() {
  _eliminarMatricula = _asyncToGenerator(function* (array) {
    try {
      yield _Matriculas.default.updateMany({}, {
        $pull: {
          matriculas: {
            fkestudiante: array
          }
        }
      });
    } catch (error) {}
  });
  return _eliminarMatricula.apply(this, arguments);
}

var getEstudiantes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var limit = parseInt(req.query.take);
      var skip = parseInt(req.query.page);
      var total = yield _Estudiante.default.countDocuments();
      var paginas = Math.ceil(total / limit);
      var usuarios = yield _Estudiante.default.find().skip(limit * skip - limit).limit(limit).sort({
        createdAt: -1
      });
      var coleccion = {
        usuarios: usuarios,
        pagina: skip,
        paginas: paginas,
        total: total
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getEstudiantes(_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}(); //--------------------------------LISTA PARA FILTROS [MATRICULAS, ]  --------------------


exports.getEstudiantes = getEstudiantes;

var getListasEstudiantes = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _Estudiante.default.find().lean().select({
        fullname: 1,
        cedula: 1
      });
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getListasEstudiantes(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}(); //--------------------------------LISTA PARA FILTROS [AULAS, ]  --------------------


exports.getListasEstudiantes = getListasEstudiantes;

var getListEstudAulas = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _Estudiante.default.find().lean().select({
        fullname: 1,
        cedula: 1,
        foto: 1,
        telefono: 1
      });
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getListEstudAulas(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}(); //--------------------------------OPTENEMOS UN USUARIO POR ID--------------------


exports.getListEstudAulas = getListEstudAulas;

var getEstudianteById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        id
      } = req.params;
      var usuarios = yield _Estudiante.default.findById(id);
      res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function getEstudianteById(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}(); //--------------------------------EDITAR USUARIO POR EL ID--------------------


exports.getEstudianteById = getEstudianteById;

var updateEstudianteById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var updatedUsuarios = yield _Estudiante.default.findByIdAndUpdate(req.params.usuariosId, req.body, {
        new: true
      });
      yield editarMatricula(req.params.usuariosId, req.body);
      res.status(200).json(updatedUsuarios);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function updateEstudianteById(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}(); //--------------------------------EDITAR USUARIO PARA REPRESENTANTE-------------------


exports.updateEstudianteById = updateEstudianteById;

var updateRepresentante = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var updatedUsuarios = yield _Estudiante.default.findByIdAndUpdate(req.params.usuariosId, req.body, {
        new: true
      });
      res.status(200).json(updatedUsuarios);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function updateRepresentante(_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}(); //--------------------------------ELIMINAR USUARIOS POR EL ID--------------------


exports.updateRepresentante = updateRepresentante;

var deleteEstudianteById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _Estudiante.default.deleteMany({
        _id: {
          $in: array
        }
      });
      yield eliminarMatricula(array);
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  });

  return function deleteEstudianteById(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}(); //--------------------------------CREAR ESTUDIANTE--------------------


exports.deleteEstudianteById = deleteEstudianteById;

var createEstudiante = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        email,
        password,
        roles,
        status,
        cedula,
        foto,
        fullname,
        ifPassword
      } = req.body;
      var newUser = new _Estudiante.default({
        email,
        status,
        foto,
        cedula,
        fullname,
        ifPassword,
        password: yield _Estudiante.default.encryptPassword(password)
      });
      var role = yield _Role.default.findOne({
        name: "Estudiante"
      });
      newUser.roles = [role._id];
      var savedUser = yield newUser.save();
      return res.status(200).json({
        savedUser
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Problem'
      });
    }
  });

  return function createEstudiante(_x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}(); //--------------------------------CREAR ESTUDIANTE--------------------


exports.createEstudiante = createEstudiante;

var createEstudianteMany = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;
      var docs = [];
      var duplicados = [];
      var role = yield _Role.default.findOne({
        name: "Estudiante"
      });

      for (var i = 0; i < array.length; i++) {
        var ifcedula = yield _Estudiante.default.findOne({
          cedula: array[i].cedula
        });

        if (ifcedula) {
          duplicados.push(array[i]);
        } else {
          array[i].password = yield _Estudiante.default.encryptPassword(array[i].password);
          array[i].roles = [role._id];
          docs.push(array[i]);
        }
      }

      if (docs) {
        var options = {
          ordered: false
        };
        yield _Estudiante.default.insertMany(docs, options);
      }

      return res.status(200).json({
        duplicados
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Problem'
      });
    }
  });

  return function createEstudianteMany(_x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}();

exports.createEstudianteMany = createEstudianteMany;

var activate = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res, next) {
    try {
      var reg = yield _Estudiante.default.findByIdAndUpdate({
        _id: req.params.id
      }, {
        status: req.query.state
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
      next(e);
    }
  });

  return function activate(_x22, _x23, _x24) {
    return _ref10.apply(this, arguments);
  };
}();

exports.activate = activate;

var query = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(function* (req, res) {
    try {
      var querys = req.query.querys;
      var result = yield _Estudiante.default.find({
        fullname: {
          '$regex': querys,
          "$options": "i"
        }
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
    }
  });

  return function query(_x25, _x26) {
    return _ref11.apply(this, arguments);
  };
}();

exports.query = query;