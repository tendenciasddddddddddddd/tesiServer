"use strict";

var _app = _interopRequireDefault(require("./app.js"));

require("./database.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(process.env.PORT || 3000);

console.log('Port', 3000);