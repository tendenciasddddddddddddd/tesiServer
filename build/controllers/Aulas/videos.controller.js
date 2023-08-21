"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Aulasvirtuales = _interopRequireDefault(require("../../models/Aulasvirtuales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function removeFiles(_x, _x2) {
  return _removeFiles.apply(this, arguments);
}

function _removeFiles() {
  _removeFiles = _asyncToGenerator(function* (ids, modelo) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: ids
      }, {
        $pull: {
          "videos.$[].archivo": {
            "_id": modelo.mod
          }
        }
      });
    } catch (error) {}
  });
  return _removeFiles.apply(this, arguments);
}

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.findByIdAndUpdate(req.params.id, {
          $push: {
            videos: req.body.videos
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

    function create(_x3, _x4) {
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
            videos: {
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

    function _delete(_x5, _x6) {
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
              "videos.$[perf].title": req.body.videos.title,
              "videos.$[perf].archivo": req.body.videos.archivo,
              "videos.$[perf].disponibilidad": req.body.videos.disponibilidad,
              "videos.$[perf].fechad": req.body.videos.fechad
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
        res.status(500).json("error");
      }
    });

    function update(_x7, _x8) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  //======================EDITAR TAREA FOROS=================================
  updateForo: function () {
    var _updateForo = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $push: {
            "videos.$[perf].foro": req.body.foro
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
      } catch (e) {
        res.status(500).json(e);
      }
    });

    function updateForo(_x9, _x10) {
      return _updateForo.apply(this, arguments);
    }

    return updateForo;
  }(),
  updateSubForo: function () {
    var _updateSubForo = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $push: {
            "videos.$[perf].foro.$[est].subForo": req.body.subForo
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }, {
            "est._id": {
              $eq: array[2]
            }
          }],
          new: true
        });
        res.status(200).json("req.params.aulaId");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function updateSubForo(_x11, _x12) {
      return _updateSubForo.apply(this, arguments);
    }

    return updateSubForo;
  }(),
  updateLike: function () {
    var _updateLike = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          key
        } = req.body;
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $push: {
            "videos.$[perf].foro.$[est].like": key
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }, {
            "est._id": {
              $eq: array[2]
            }
          }],
          new: true
        });
        res.status(200).json("req.params.aulaId");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function updateLike(_x13, _x14) {
      return _updateLike.apply(this, arguments);
    }

    return updateLike;
  }(),
  updateNoLike: function () {
    var _updateNoLike = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          key
        } = req.body;
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $push: {
            "videos.$[perf].foro.$[est].nolike": key
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }, {
            "est._id": {
              $eq: array[2]
            }
          }],
          new: true
        });
        res.status(200).json("req.params.aulaId");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function updateNoLike(_x15, _x16) {
      return _updateNoLike.apply(this, arguments);
    }

    return updateNoLike;
  }(),
  removeForo: function () {
    var _removeForo = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $pull: {
            "videos.$[perf].foro": {
              _id: array[2]
            }
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
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function removeForo(_x17, _x18) {
      return _removeForo.apply(this, arguments);
    }

    return removeForo;
  }(),
  removeLikeForo: function () {
    var _removeLikeForo = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          key
        } = req.body;
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $pull: {
            "videos.$[perf].foro.$[est].like": key
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }, {
            "est._id": {
              $eq: array[2]
            }
          }],
          new: true
        });
        res.status(200).json("req.params.aulaId");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function removeLikeForo(_x19, _x20) {
      return _removeLikeForo.apply(this, arguments);
    }

    return removeLikeForo;
  }(),
  removeNoLikeForo: function () {
    var _removeNoLikeForo = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          key
        } = req.body;
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $pull: {
            "videos.$[perf].foro.$[est].nolike": key
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }, {
            "est._id": {
              $eq: array[2]
            }
          }],
          new: true
        });
        res.status(200).json("req.params.aulaId");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function removeNoLikeForo(_x21, _x22) {
      return _removeNoLikeForo.apply(this, arguments);
    }

    return removeNoLikeForo;
  }(),
  removeSubForo: function () {
    var _removeSubForo = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $pull: {
            "videos.$[perf].foro.$[est].subForo": {
              _id: array[3]
            }
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }, {
            "est._id": {
              $eq: array[2]
            }
          }],
          new: true
        });
        res.status(200).json("req.params.aulaId");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function removeSubForo(_x23, _x24) {
      return _removeSubForo.apply(this, arguments);
    }

    return removeSubForo;
  }(),
  updateRemoveFile: function () {
    var _updateRemoveFile = _asyncToGenerator(function* (req, res) {
      try {
        yield removeFiles(req.params.paramsId, req.body);
        res.status(200).json();
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateRemoveFile(_x25, _x26) {
      return _updateRemoveFile.apply(this, arguments);
    }

    return updateRemoveFile;
  }()
};
exports.default = _default;