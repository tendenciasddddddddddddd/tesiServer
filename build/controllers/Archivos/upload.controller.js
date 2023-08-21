"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitImages = exports.eliminar = exports.submitVideos = exports.submitFilesAulas = exports.submitFilesPlanificacion = exports.resizeImages2 = exports.resizeImages = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require("path");

var fs = require('fs');

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'stebann',
  api_key: '271159462412784',
  api_secret: 'xkvBEQuReYikF7WS-_LMHq-ogWs'
});

var storage = _multer.default.diskStorage({
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = (0, _multer.default)({
  storage: storage
});
exports.upload = upload.single("myFile");

var resizeImages = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var ext = path.extname(req.file.filename).toLowerCase();
      var resultado = yield cloudinary.v2.uploader.upload(req.file.path, {
        height: 128,
        crop: "thumb"
      });
      res.json(resultado.secure_url);
      next();
    } catch (error) {
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
    }
  });

  return function resizeImages(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.resizeImages = resizeImages;

var resizeImages2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var resultado = yield cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'tasks',
        height: 350
      });
      res.json(resultado.secure_url);
    } catch (error) {
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
    }
  });

  return function resizeImages2(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.resizeImages2 = resizeImages2;

var submitFilesPlanificacion = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      var resultado = yield cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'planificaciones',
        resource_type: "auto"
      });
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
    }
  });

  return function submitFilesPlanificacion(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.submitFilesPlanificacion = submitFilesPlanificacion;

var submitFilesAulas = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      var resultado = yield cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'aulas',
        resource_type: "auto"
      });
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
      next();
    }
  });

  return function submitFilesAulas(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}(); //================================SUBIR VIDEOS =================================


exports.submitFilesAulas = submitFilesAulas;

var storage2 = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'videos');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});

var upload2 = (0, _multer.default)({
  storage: storage2
});
exports.upload2 = upload2.single('myFile');

var submitVideos = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var ext = path.extname(req.file.filename).toLowerCase();

      if (ext === '.mp4' || ext === '.webm' || ext === '.mov' || ext === '.ogv') {
        res.send(req.file);
      } else {
        var deleteFile = './videos/' + req.file.filename;
        fs.unlink(deleteFile, err => {});
        res.send(null);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
    }
  });

  return function submitVideos(_x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

exports.submitVideos = submitVideos;

var eliminar = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        nombre
      } = req.body;
      var deleteFile = './videos/' + nombre;
      fs.unlink(deleteFile, err => {
        if (err) {}
      });
      res.send('req.file');
    } catch (error) {
      console.log(error);
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
    }
  });

  return function eliminar(_x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}(); //================================SUBIR IMAGES =================================


exports.eliminar = eliminar;

var storage3 = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'images');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "-").concat(file.originalname));
  }
});

var upload3 = (0, _multer.default)({
  storage: storage3
});
exports.upload3 = upload3.single('myFile');

var submitImages = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var ext = path.extname(req.file.filename).toLowerCase();

      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.svg') {
        res.send(req.file);
      } else {
        var deleteFile = './images/' + req.file.filename;
        fs.unlink(deleteFile, err => {});
        res.send(null);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
    }
  });

  return function submitImages(_x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();

exports.submitImages = submitImages;