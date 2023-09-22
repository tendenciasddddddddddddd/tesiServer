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
            youtube: req.body.youtube
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
  delete: function () {
    var _delete2 = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.body;
        yield _Aulasvirtuales.default.updateOne({
          _id: req.params.paramId
        }, {
          $pull: {
            youtube: {
              _id: id
            }
          }
        }, {
          new: true
        });
        res.status(200).json({});
      } catch (e) {
        res.status(500).json({
          message: "No mat found"
        });
      }
    });

    function _delete(_x3, _x4) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  //======================EDITAR TAREA =================================
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
              "youtube.$[perf].title": req.body.youtube.title,
              "youtube.$[perf].archivo": req.body.youtube.archivo,
              "youtube.$[perf].disponibilidad": req.body.youtube.disponibilidad,
              "youtube.$[perf].fechad": req.body.youtube.fechad,
              "youtube.$[perf].descripcion": req.body.videos.descripcion
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

    function update(_x5, _x6) {
      return _update.apply(this, arguments);
    }

    return update;
  }()
};
exports.default = _default;