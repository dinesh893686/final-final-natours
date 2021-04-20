const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});
app.use((req, res, next) => {
  // console.log("hello from the middleware2");
  req.requestTime = new Date().toISOString();
  //
  //   console.log(req.requestTime);
  next();
});
const tourRouter = express.Router();
const userRouter = express.Router();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// console.log(tours);
// all handlers
// users handler

//tour handler

// all route

// user router

// mounting the router

app.use("/api/v1/tours", require("./router/tourRouter"));

app.use("/api/v1/users", require("./router/userRouter"));

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
});
