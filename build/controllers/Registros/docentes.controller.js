"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = exports.activate = exports.createDocenteMany = exports.createDocentes = exports.deleteDocenteById = exports.getDocenteById = exports.getListasDocentes = exports.getDocentes = exports.updatePerfil = exports.updateDocenteById = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _Role = _interopRequireDefault(require("../../models/Role"));

var _Tutores = _interopRequireDefault(require("../../models/distributivos/Tutores"));

var _Distributivo = _interopRequireDefault(require("../../models/distributivos/Distributivo"));

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function editarTutores(_x, _x2) {
  return _editarTutores.apply(this, arguments);
}

function _editarTutores() {
  _editarTutores = _asyncToGenerator(function* (iddocente, modelo) {
    try {
      var docente = {
        _id: modelo._id,
        fullname: modelo.fullname
      };
      yield _Tutores.default.updateMany({
        fkdocente: iddocente
      }, {
        $set: {
          docente: docente
        }
      });
    } catch (error) {}
  });
  return _editarTutores.apply(this, arguments);
}

function editarDistributivo(_x3, _x4) {
  return _editarDistributivo.apply(this, arguments);
}

function _editarDistributivo() {
  _editarDistributivo = _asyncToGenerator(function* (iddocente, modelo) {
    try {
      var docente = {
        _id: modelo._id,
        fullname: modelo.fullname
      };
      yield _Distributivo.default.updateMany({}, {
        $set: {
          "carga.$[perf].docente": docente
        }
      }, {
        arrayFilters: [{
          "perf.fkdocentes": {
            $eq: iddocente
          }
        }],
        new: true
      });
    } catch (error) {}
  });
  return _editarDistributivo.apply(this, arguments);
}

function editarMatriculas(_x5, _x6) {
  return _editarMatriculas.apply(this, arguments);
}

function _editarMatriculas() {
  _editarMatriculas = _asyncToGenerator(function* (iddocente, modelo) {
    try {
      var docente = {
        _id: modelo._id,
        fullname: modelo.fullname
      };
      var reg = yield _Matriculas.default.find({
        "matriculas.computo.fkdocentes": iddocente
      });

      if (reg) {
        for (var i = 0; i < reg.length; i++) {
          var element = reg[i].matriculas;

          for (var j = 0; j < element.length; j++) {
            var subElement = element[j].computo;

            for (var m = 0; m < subElement.length; m++) {
              var Inelement = subElement[m];

              if (Inelement.fkdocente == iddocente) {
                yield _Matriculas.default.updateOne({
                  _id: reg[i]._id
                }, {
                  $set: {
                    "matriculas.$[perf].computo.$[est].docente": docente
                  }
                }, {
                  arrayFilters: [{
                    "perf._id": {
                      $eq: element[j]._id
                    }
                  }, {
                    "est.fkdocente": {
                      $eq: iddocente
                    }
                  }],
                  new: true
                });
              }
            }
          }
        }
      }
    } catch (error) {}
  });
  return _editarMatriculas.apply(this, arguments);
}

function eliminarTutores(_x7) {
  return _eliminarTutores.apply(this, arguments);
}

function _eliminarTutores() {
  _eliminarTutores = _asyncToGenerator(function* (array) {
    try {
      yield _Tutores.default.deleteMany({
        fkdocente: {
          $in: array
        }
      });
    } catch (error) {}
  });
  return _eliminarTutores.apply(this, arguments);
}

function eliminarDistributivo(_x8) {
  return _eliminarDistributivo.apply(this, arguments);
} //--------------------------------EDITAR USUARIO POR EL ID--------------------


function _eliminarDistributivo() {
  _eliminarDistributivo = _asyncToGenerator(function* (array) {
    try {
      yield _Distributivo.default.updateMany({}, {
        $pull: {
          carga: {
            fkdocentes: array
          }
        }
      });
    } catch (error) {}
  });
  return _eliminarDistributivo.apply(this, arguments);
}

var updateDocenteById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var updatedUsuarios = yield _User.default.findByIdAndUpdate(req.params.usuariosId, req.body, {
        new: true
      });
      editarTutores(req.params.usuariosId, req.body);
      editarDistributivo(req.params.usuariosId, req.body);
      editarMatriculas(req.params.usuariosId, req.body);
      res.status(200).json(updatedUsuarios);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  return function updateDocenteById(_x9, _x10) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateDocenteById = updateDocenteById;

var updatePerfil = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var updatedUsuarios = yield _User.default.findByIdAndUpdate(req.params.usuario, req.body, {
        new: true
      });
      res.status(200).json(updatedUsuarios);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function updatePerfil(_x11, _x12) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updatePerfil = updatePerfil;

var getDocentes = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var limit = parseInt(req.query.take);
      var skip = parseInt(req.query.page);
      var total = yield _User.default.countDocuments({
        typo: {
          $in: ["DOCS"]
        }
      });
      var paginas = Math.ceil(total / limit);
      var usuarios = yield _User.default.find({
        typo: {
          $in: ["DOCS"]
        }
      }).skip(limit * skip - limit).limit(limit).sort({
        cratedAt: -1
      });
      var coleccion = {
        usuarios: usuarios,
        pagina: skip,
        paginas: paginas,
        total: total
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getDocentes(_x13, _x14) {
    return _ref3.apply(this, arguments);
  };
}(); //--------------------------------LISTA PARA FILTROS [DISTRIBUTIVO, ]  --------------------


exports.getDocentes = getDocentes;

var getListasDocentes = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var arg = yield _User.default.find({
        typo: {
          $in: ["DOCS"]
        }
      }).lean().select({
        fullname: 1,
        cedula: 1
      });

      if (arg) {
        arg.sort(function (a, b) {
          var nameA = a.fullname.toLowerCase(),
              nameB = b.fullname.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      }

      return res.json(arg);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getListasDocentes(_x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}(); //--------------------------------OPTENEMOS UN USUARIO POR ID--------------------


exports.getListasDocentes = getListasDocentes;

var getDocenteById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        id
      } = req.params;
      var usuarios = yield _User.default.findById(id);
      res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json(err);
    }
  });

  return function getDocenteById(_x17, _x18) {
    return _ref5.apply(this, arguments);
  };
}(); //--------------------------------ELIMINAR USUARIOS POR EL ID--------------------


exports.getDocenteById = getDocenteById;

var deleteDocenteById = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var cadenaId = req.params.id;
      var array = cadenaId.split(",");
      yield _User.default.deleteMany({
        _id: {
          $in: array
        }
      });
      eliminarTutores(array);
      eliminarDistributivo(array);
      res.status(200).json();
    } catch (e) {
      console.log(e);
      return res.status(500).json();
    }
  });

  return function deleteDocenteById(_x19, _x20) {
    return _ref6.apply(this, arguments);
  };
}(); //--------------------------------CREAR ESTUDIANTE--------------------


exports.deleteDocenteById = deleteDocenteById;

var createDocentes = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        email,
        password,
        roles,
        status,
        cedula,
        foto,
        fullname,
        ifPassword,
        typo
      } = req.body;
      var newUser = new _User.default({
        email,
        status,
        foto,
        cedula,
        fullname,
        ifPassword,
        typo,
        password: yield _User.default.encryptPassword(password)
      });
      var role = yield _Role.default.findOne({
        name: "Docente"
      });
      newUser.roles = [role._id];
      var savedUser = yield newUser.save();
      return res.status(200).json({
        savedUser
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Problem'
      });
    }
  });

  return function createDocentes(_x21, _x22) {
    return _ref7.apply(this, arguments);
  };
}(); //--------------------------------CREAR DOCENTE--------------------


exports.createDocentes = createDocentes;

var createDocenteMany = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var array = req.body;
      var docs = [];
      var duplicados = [];
      var role = yield _Role.default.findOne({
        name: "Docente"
      });

      for (var i = 0; i < array.length; i++) {
        var ifcedula = yield _User.default.findOne({
          cedula: array[i].cedula
        });

        if (ifcedula) {
          duplicados.push(array[i]);
        } else {
          array[i].password = yield _User.default.encryptPassword(array[i].password);
          array[i].roles = [role._id];
          docs.push(array[i]);
        }
      }

      if (docs) {
        var options = {
          ordered: false
        };
        yield _User.default.insertMany(docs, options);
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

  return function createDocenteMany(_x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

exports.createDocenteMany = createDocenteMany;

var activate = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res, next) {
    try {
      var reg = yield _User.default.findByIdAndUpdate({
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

  return function activate(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

exports.activate = activate;

var query = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    try {
      var querys = req.query.querys;
      var result = yield _User.default.find({
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

  return function query(_x28, _x29) {
    return _ref10.apply(this, arguments);
  };
}();

exports.query = query;