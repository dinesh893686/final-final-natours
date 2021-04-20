const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

exports.getALLUsers = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
exports.getUser = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
exports.updateUser = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
exports.deleteUser = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
exports.createUser = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
