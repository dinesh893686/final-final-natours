const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./utils/appError");
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
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});


const errInDevelopment = (err, res) => {

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err

  });
}

const errInProduction = (err, res) => {


  if (isOperational) {

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  else {
    res.status().json({
      message: "Something happened very wrong!"
    })
  }

}

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";



  if (process.env.NODE_ENV == "development") {
    errInDevelopment(err, res);

  }
  else if (process.env.NODE_ENV == "production") {
    errInProduction(err, res);
  }

});

module.exports = app;
