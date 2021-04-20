const express = require("express");
if (process.env.NODE_ENV === "production") const morgan = require("morgan");
const app = express();
app.use(express.json());

app.use(morgan("dev"));

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
