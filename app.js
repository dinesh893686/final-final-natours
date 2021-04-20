const express = require("express");
const morgan = require("morgan");
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}
const app = express();
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
