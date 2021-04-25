// const fs = require("fs");
// const tours = JSON.parse(
//   fs.readFileSync("./../dev-data/data/tours-simple.json")
// );


const User = require("./../models/userModel");


// const apiFeatures = require("./../utils/apiFeatures");

const catchAsync = require('./../utils/catchAsync')
const appError = require('./../utils/appError')


exports.getALLUsers = catchAsync(async (req, res) => {
  // console.log(req.requestTime);


  const Users = await User.find()

  res.status(200).json({
    messsage: "success",
    length: Users.length,
    data: {
      Users
    },
  });
}
)
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
