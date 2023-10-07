"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Configure = _interopRequireDefault(require("../../models/Configure"));

var _rediss = require("../../middlewares/rediss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  getListas: function () {
    var _getListas = _asyncToGenerator(function* (req, res) {
      try {
        var reply = yield _rediss.client.get("".concat(_rediss.claveOnPort, "autoridades"));
        if (reply) return res.json(JSON.parse(reply));
        var result = yield _Configure.default.find().lean();
        yield _rediss.client.set("".concat(_rediss.claveOnPort, "autoridades"), JSON.stringify(result), {
          EX: 36000
        });
        return res.json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getListas(_x, _x2) {
      return _getListas.apply(this, arguments);
    }

    return getListas;
  }(),
  updateById: function () {
    var _updateById = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Configure.default.findByIdAndUpdate(req.params.paramId, req.body, {
          new: true
        });

        _rediss.client.del("".concat(_rediss.claveOnPort, "autoridades"));

        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function updateById(_x3, _x4) {
      return _updateById.apply(this, arguments);
    }

    return updateById;
  }()
};
exports.default = _default;