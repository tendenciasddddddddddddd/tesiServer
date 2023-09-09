"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Aulasvirtuales = _interopRequireDefault(require("../../models/Aulasvirtuales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.findByIdAndUpdate(req.params.id, {
          $push: {
            evaluacion: req.body.evaluacion
          }
        }, {
          new: true
        });
        res.status(200).json(req.params.id);
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");

        if (array[0] != null && array[1] != null) {
          yield _Aulasvirtuales.default.updateOne({
            _id: array[0]
          }, {
            $set: {
              "evaluacion.$[perf].title": req.body.evaluacion.title,
              "evaluacion.$[perf].descripcion": req.body.evaluacion.descripcion,
              "evaluacion.$[perf].archivo": req.body.evaluacion.archivo,
              "evaluacion.$[perf].start": req.body.evaluacion.start,
              "evaluacion.$[perf].end": req.body.evaluacion.end,
              "evaluacion.$[perf].disponibilidad": req.body.evaluacion.disponibilidad,
              "evaluacion.$[perf].fechad": req.body.evaluacion.fechad,
              "evaluacion.$[perf].publicar": req.body.evaluacion.publicar,
              "evaluacion.$[perf].security": req.body.evaluacion.security,
              "evaluacion.$[perf].revisar": req.body.evaluacion.revisar,
              "evaluacion.$[perf].intenAllowed": req.body.evaluacion.intenAllowed,
              "evaluacion.$[perf].tempo": req.body.evaluacion.tempo
            }
          }, {
            arrayFilters: [{
              "perf._id": {
                $eq: array[1]
              }
            }],
            new: true
          });
          res.status(200).json("req.params.aulaId");
        } else {
          res.status(200).json("req.params.aulaId");
        }
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function update(_x3, _x4) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  createPreguntas: function () {
    var _createPreguntas = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.updateOne({
          'evaluacion._id': req.params.paramId
        }, {
          $push: {
            'evaluacion.$.surveys': req.body
          }
        }, {
          new: true
        });
        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function createPreguntas(_x5, _x6) {
      return _createPreguntas.apply(this, arguments);
    }

    return createPreguntas;
  }(),
  updatePreguntas: function () {
    var _updatePreguntas = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.updateOne({
          'evaluacion._id': req.params.paramId
        }, {
          $set: {
            'evaluacion.$.surveys': req.body
          }
        }, {
          new: true
        });
        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function updatePreguntas(_x7, _x8) {
      return _updatePreguntas.apply(this, arguments);
    }

    return updatePreguntas;
  }(),
  resolver: function () {
    var _resolver = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.updateOne({
          "evaluacion._id": req.params.paramId
        }, {
          $push: {
            "evaluacion.$.answers": req.body
          }
        }, {
          new: true
        });
        res.status(200).json("ok");
      } catch (e) {
        res.status(500).json(e);
      }
    });

    function resolver(_x9, _x10) {
      return _resolver.apply(this, arguments);
    }

    return resolver;
  }()
};
exports.default = _default;