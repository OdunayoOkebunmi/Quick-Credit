"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/', function (req, res) {
  return res.status(200).send({
    'message': 'YAY! Congratulations! Your first endpoint is working'
  });
});
app.listen(3000);
console.log('app running on port ', 3000);