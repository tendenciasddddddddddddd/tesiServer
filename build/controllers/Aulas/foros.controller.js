"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Aulasvirtuales = _interopRequireDefault(require("../../models/Aulasvirtuales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//======================INSERTAMOS FOROS DE NIVEL 1 ============================
function publishOneVideo(_x, _x2) {
  return _publishOneVideo.apply(this, arguments);
}

function _publishOneVideo() {
  _publishOneVideo = _asyncToGenerator(function* (array, data) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "videos.$[perf].foro": data
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: array[1]
          }
        }],
        new: true
      });
    } catch (e) {}
  });
  return _publishOneVideo.apply(this, arguments);
}

function publishOneTarea(_x3, _x4) {
  return _publishOneTarea.apply(this, arguments);
}

function _publishOneTarea() {
  _publishOneTarea = _asyncToGenerator(function* (array, data) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "tareas.$[perf].foro": data
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: array[1]
          }
        }],
        new: true
      });
    } catch (e) {}
  });
  return _publishOneTarea.apply(this, arguments);
}

function publishOneYoutube(_x5, _x6) {
  return _publishOneYoutube.apply(this, arguments);
}

function _publishOneYoutube() {
  _publishOneYoutube = _asyncToGenerator(function* (array, data) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "youtube.$[perf].foro": data
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: array[1]
          }
        }],
        new: true
      });
    } catch (e) {}
  });
  return _publishOneYoutube.apply(this, arguments);
}

function publishOneForos(_x7, _x8) {
  return _publishOneForos.apply(this, arguments);
} //======================INSERTAMOS FOROS DE NIVEL 2 ============================


function _publishOneForos() {
  _publishOneForos = _asyncToGenerator(function* (array, data) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "foros.$[perf].foro": data
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: array[1]
          }
        }],
        new: true
      });
    } catch (e) {}
  });
  return _publishOneForos.apply(this, arguments);
}

function publishTwoVideo(_x9, _x10) {
  return _publishTwoVideo.apply(this, arguments);
}

function _publishTwoVideo() {
  _publishTwoVideo = _asyncToGenerator(function* (array, data) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "videos.$[perf].foro.$[est].subForo": data
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
    } catch (e) {}
  });
  return _publishTwoVideo.apply(this, arguments);
}

function publishTwoTarea(_x11, _x12) {
  return _publishTwoTarea.apply(this, arguments);
}

function _publishTwoTarea() {
  _publishTwoTarea = _asyncToGenerator(function* (array, data) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "tareas.$[perf].foro.$[est].subForo": data
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
    } catch (e) {}
  });
  return _publishTwoTarea.apply(this, arguments);
}

function publishTwoYoutube(_x13, _x14) {
  return _publishTwoYoutube.apply(this, arguments);
}

function _publishTwoYoutube() {
  _publishTwoYoutube = _asyncToGenerator(function* (array, data) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "youtube.$[perf].foro.$[est].subForo": data
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
    } catch (e) {}
  });
  return _publishTwoYoutube.apply(this, arguments);
}

function publishTwoForos(_x15, _x16) {
  return _publishTwoForos.apply(this, arguments);
} //======================INSERTAMOS LIKE EN FOROS DE NIVEL 1 ============================


function _publishTwoForos() {
  _publishTwoForos = _asyncToGenerator(function* (array, data) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "foros.$[perf].foro.$[est].subForo": data
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
    } catch (e) {}
  });
  return _publishTwoForos.apply(this, arguments);
}

function likeOneVideo(_x17, _x18) {
  return _likeOneVideo.apply(this, arguments);
}

function _likeOneVideo() {
  _likeOneVideo = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "videos.$[perf].foro.$[est].like": like
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
    } catch (e) {}
  });
  return _likeOneVideo.apply(this, arguments);
}

function likeOneTarea(_x19, _x20) {
  return _likeOneTarea.apply(this, arguments);
}

function _likeOneTarea() {
  _likeOneTarea = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "tareas.$[perf].foro.$[est].like": like
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
    } catch (e) {}
  });
  return _likeOneTarea.apply(this, arguments);
}

function likeOneYoutube(_x21, _x22) {
  return _likeOneYoutube.apply(this, arguments);
}

function _likeOneYoutube() {
  _likeOneYoutube = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "youtube.$[perf].foro.$[est].like": like
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
    } catch (e) {}
  });
  return _likeOneYoutube.apply(this, arguments);
}

function likeOneForos(_x23, _x24) {
  return _likeOneForos.apply(this, arguments);
} //======================INSERTAMOS NO LIKE EN FOROS DE NIVEL 1 ============================


function _likeOneForos() {
  _likeOneForos = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "foros.$[perf].foro.$[est].like": like
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
    } catch (e) {}
  });
  return _likeOneForos.apply(this, arguments);
}

function noLikeOneVideo(_x25, _x26) {
  return _noLikeOneVideo.apply(this, arguments);
}

function _noLikeOneVideo() {
  _noLikeOneVideo = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "videos.$[perf].foro.$[est].nolike": like
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
    } catch (e) {}
  });
  return _noLikeOneVideo.apply(this, arguments);
}

function noLikeOneTarea(_x27, _x28) {
  return _noLikeOneTarea.apply(this, arguments);
}

function _noLikeOneTarea() {
  _noLikeOneTarea = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "tareas.$[perf].foro.$[est].nolike": like
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
    } catch (e) {}
  });
  return _noLikeOneTarea.apply(this, arguments);
}

function noLikeOneYoutube(_x29, _x30) {
  return _noLikeOneYoutube.apply(this, arguments);
}

function _noLikeOneYoutube() {
  _noLikeOneYoutube = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "youtube.$[perf].foro.$[est].nolike": like
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
    } catch (e) {}
  });
  return _noLikeOneYoutube.apply(this, arguments);
}

function noLikeOneForos(_x31, _x32) {
  return _noLikeOneForos.apply(this, arguments);
} //======================ELIMINAMOS LIKE EN FOROS DE NIVEL 1 ============================


function _noLikeOneForos() {
  _noLikeOneForos = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $push: {
          "Foros.$[perf].foro.$[est].nolike": like
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
    } catch (e) {}
  });
  return _noLikeOneForos.apply(this, arguments);
}

function removeLikeOneVideo(_x33, _x34) {
  return _removeLikeOneVideo.apply(this, arguments);
}

function _removeLikeOneVideo() {
  _removeLikeOneVideo = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "videos.$[perf].foro.$[est].like": like
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
    } catch (e) {}
  });
  return _removeLikeOneVideo.apply(this, arguments);
}

function removeLikeOneTarea(_x35, _x36) {
  return _removeLikeOneTarea.apply(this, arguments);
}

function _removeLikeOneTarea() {
  _removeLikeOneTarea = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "tareas.$[perf].foro.$[est].like": like
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
    } catch (e) {}
  });
  return _removeLikeOneTarea.apply(this, arguments);
}

function removeLikeOneYoutube(_x37, _x38) {
  return _removeLikeOneYoutube.apply(this, arguments);
}

function _removeLikeOneYoutube() {
  _removeLikeOneYoutube = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "youtube.$[perf].foro.$[est].like": like
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
    } catch (e) {}
  });
  return _removeLikeOneYoutube.apply(this, arguments);
}

function removeLikeOneForos(_x39, _x40) {
  return _removeLikeOneForos.apply(this, arguments);
} //======================ELIMINAMOS LE NOOO LIKE EN FOROS DE NIVEL 1 ============================


function _removeLikeOneForos() {
  _removeLikeOneForos = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "foros.$[perf].foro.$[est].like": like
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
    } catch (e) {}
  });
  return _removeLikeOneForos.apply(this, arguments);
}

function removeNoLikeOneVideo(_x41, _x42) {
  return _removeNoLikeOneVideo.apply(this, arguments);
}

function _removeNoLikeOneVideo() {
  _removeNoLikeOneVideo = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "videos.$[perf].foro.$[est].nolike": like
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
    } catch (e) {}
  });
  return _removeNoLikeOneVideo.apply(this, arguments);
}

function removeNoLikeOneTarea(_x43, _x44) {
  return _removeNoLikeOneTarea.apply(this, arguments);
}

function _removeNoLikeOneTarea() {
  _removeNoLikeOneTarea = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "tareas.$[perf].foro.$[est].nolike": like
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
    } catch (e) {}
  });
  return _removeNoLikeOneTarea.apply(this, arguments);
}

function removeNoLikeOneYoutube(_x45, _x46) {
  return _removeNoLikeOneYoutube.apply(this, arguments);
}

function _removeNoLikeOneYoutube() {
  _removeNoLikeOneYoutube = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "youtube.$[perf].foro.$[est].nolike": like
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
    } catch (e) {}
  });
  return _removeNoLikeOneYoutube.apply(this, arguments);
}

function removeNoLikeOneForos(_x47, _x48) {
  return _removeNoLikeOneForos.apply(this, arguments);
} //======================ELIMINAMOS FORO DE NIVEL  1============================


function _removeNoLikeOneForos() {
  _removeNoLikeOneForos = _asyncToGenerator(function* (array, like) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "foros.$[perf].foro.$[est].nolike": like
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
    } catch (e) {}
  });
  return _removeNoLikeOneForos.apply(this, arguments);
}

function removeForoOneVideo(_x49) {
  return _removeForoOneVideo.apply(this, arguments);
}

function _removeForoOneVideo() {
  _removeForoOneVideo = _asyncToGenerator(function* (array) {
    try {
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
    } catch (e) {}
  });
  return _removeForoOneVideo.apply(this, arguments);
}

function removeForoOneTarea(_x50) {
  return _removeForoOneTarea.apply(this, arguments);
}

function _removeForoOneTarea() {
  _removeForoOneTarea = _asyncToGenerator(function* (array) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "tareas.$[perf].foro": {
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
    } catch (e) {}
  });
  return _removeForoOneTarea.apply(this, arguments);
}

function removeForoOneYoutube(_x51) {
  return _removeForoOneYoutube.apply(this, arguments);
}

function _removeForoOneYoutube() {
  _removeForoOneYoutube = _asyncToGenerator(function* (array) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "youtube.$[perf].foro": {
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
    } catch (e) {}
  });
  return _removeForoOneYoutube.apply(this, arguments);
}

function removeForoOneForos(_x52) {
  return _removeForoOneForos.apply(this, arguments);
} //======================ELIMINAMOS FORO DE NIVEL  2============================


function _removeForoOneForos() {
  _removeForoOneForos = _asyncToGenerator(function* (array) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "foros.$[perf].foro": {
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
    } catch (e) {}
  });
  return _removeForoOneForos.apply(this, arguments);
}

function removeForoTwoVideo(_x53) {
  return _removeForoTwoVideo.apply(this, arguments);
}

function _removeForoTwoVideo() {
  _removeForoTwoVideo = _asyncToGenerator(function* (array) {
    try {
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
    } catch (e) {}
  });
  return _removeForoTwoVideo.apply(this, arguments);
}

function removeForoTwoTarea(_x54) {
  return _removeForoTwoTarea.apply(this, arguments);
}

function _removeForoTwoTarea() {
  _removeForoTwoTarea = _asyncToGenerator(function* (array) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "tareas.$[perf].foro.$[est].subForo": {
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
    } catch (e) {}
  });
  return _removeForoTwoTarea.apply(this, arguments);
}

function removeForoTwoYoutube(_x55) {
  return _removeForoTwoYoutube.apply(this, arguments);
}

function _removeForoTwoYoutube() {
  _removeForoTwoYoutube = _asyncToGenerator(function* (array) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "youtube.$[perf].foro.$[est].subForo": {
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
    } catch (e) {}
  });
  return _removeForoTwoYoutube.apply(this, arguments);
}

function removeForoTwoForos(_x56) {
  return _removeForoTwoForos.apply(this, arguments);
}

function _removeForoTwoForos() {
  _removeForoTwoForos = _asyncToGenerator(function* (array) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: array[0]
      }, {
        $pull: {
          "foros.$[perf].foro.$[est].subForo": {
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
    } catch (e) {}
  });
  return _removeForoTwoForos.apply(this, arguments);
}

var _default = {
  //======================CREA FOROS=================================
  publishOne: function () {
    var _publishOne = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var tipo = req.body.foro.tipo;
        if (tipo === '4') yield publishOneVideo(array, req.body.foro);
        if (tipo === '1') yield publishOneTarea(array, req.body.foro);
        if (tipo === '5') yield publishOneYoutube(array, req.body.foro);
        if (tipo === '7') yield publishOneForos(array, req.body.foro);
        res.status(200).json("ok");
      } catch (e) {
        res.status(500).json(e);
      }
    });

    function publishOne(_x57, _x58) {
      return _publishOne.apply(this, arguments);
    }

    return publishOne;
  }(),
  publishTwo: function () {
    var _publishTwo = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var tipo = req.body.subForo.tipo;
        if (tipo === '4') yield publishTwoVideo(array, req.body.subForo);
        if (tipo === '1') yield publishTwoTarea(array, req.body.subForo);
        if (tipo === '5') yield publishTwoYoutube(array, req.body.subForo);
        if (tipo === '7') yield publishTwoForos(array, req.body.subForo);
        res.status(200).json("ok");
      } catch (e) {
        res.status(500).json(e);
      }
    });

    function publishTwo(_x59, _x60) {
      return _publishTwo.apply(this, arguments);
    }

    return publishTwo;
  }(),
  clickLike: function () {
    var _clickLike = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          key,
          tipo
        } = req.body;
        if (tipo === '4') yield likeOneVideo(array, key);
        if (tipo === '1') yield likeOneTarea(array, key);
        if (tipo === '5') yield likeOneYoutube(array, key);
        if (tipo === '7') yield likeOneForos(array, key);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function clickLike(_x61, _x62) {
      return _clickLike.apply(this, arguments);
    }

    return clickLike;
  }(),
  clickNoLike: function () {
    var _clickNoLike = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          key,
          tipo
        } = req.body;
        if (tipo === '4') yield noLikeOneVideo(array, key);
        if (tipo === '1') yield noLikeOneTarea(array, key);
        if (tipo === '5') yield noLikeOneYoutube(array, key);
        if (tipo === '7') yield noLikeOneForos(array, key);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function clickNoLike(_x63, _x64) {
      return _clickNoLike.apply(this, arguments);
    }

    return clickNoLike;
  }(),
  removeLike: function () {
    var _removeLike = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          key,
          tipo
        } = req.body;
        if (tipo === '4') yield removeLikeOneVideo(array, key);
        if (tipo === '1') yield removeLikeOneTarea(array, key);
        if (tipo === '5') yield removeLikeOneYoutube(array, key);
        if (tipo === '7') yield removeLikeOneForos(array, key);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function removeLike(_x65, _x66) {
      return _removeLike.apply(this, arguments);
    }

    return removeLike;
  }(),
  removeNoLike: function () {
    var _removeNoLike = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          key,
          tipo
        } = req.body;
        if (tipo === '4') yield removeNoLikeOneVideo(array, key);
        if (tipo === '1') yield removeNoLikeOneTarea(array, key);
        if (tipo === '5') yield removeNoLikeOneYoutube(array, key);
        if (tipo === '7') yield removeNoLikeOneForos(array, key);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function removeNoLike(_x67, _x68) {
      return _removeNoLike.apply(this, arguments);
    }

    return removeNoLike;
  }(),
  removeForoOne: function () {
    var _removeForoOne = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          tipo
        } = req.body;
        if (tipo === '4') yield removeForoOneVideo(array);
        if (tipo === '1') yield removeForoOneTarea(array);
        if (tipo === '5') yield removeForoOneYoutube(array);
        if (tipo === '7') yield removeForoOneForos(array);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function removeForoOne(_x69, _x70) {
      return _removeForoOne.apply(this, arguments);
    }

    return removeForoOne;
  }(),
  removeForoTwo: function () {
    var _removeForoTwo = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        var {
          tipo
        } = req.body;
        if (tipo === '4') yield removeForoTwoVideo(array);
        if (tipo === '1') yield removeForoTwoTarea(array);
        if (tipo === '5') yield removeForoTwoYoutube(array);
        if (tipo === '7') yield removeForoTwoForos(array);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });

    function removeForoTwo(_x71, _x72) {
      return _removeForoTwo.apply(this, arguments);
    }

    return removeForoTwo;
  }(),
  //====================================================================================================================
  //======================ENUNCIADO DEL FORO=================================
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.findByIdAndUpdate(req.params.id, {
          $push: {
            foros: req.body.foros
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

    function create(_x73, _x74) {
      return _create.apply(this, arguments);
    }

    return create;
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
              "foros.$[perf].title": req.body.foros.title,
              "foros.$[perf].start": req.body.foros.start,
              "foros.$[perf].fechad": req.body.foros.fechad,
              "foros.$[perf].disponibilidad": req.body.foros.disponibilidad,
              "foros.$[perf].descripcion": req.body.foros.descripcion
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

    function update(_x75, _x76) {
      return _update.apply(this, arguments);
    }

    return update;
  }()
};
exports.default = _default;