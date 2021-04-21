const express = require("express");
const app = express();
const morgan = require("morgan");
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use("/api/v1/tours", require("./router/tourRouter"));

app.use("/api/v1/users", require("./router/userRouter"));

module.exports = app;
