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

//handling cast error


const handleCastError = (err) => {

  const message = `you have entered wrong ${err.path} with value ${err.value}`;

  return new AppError(message, 404)



}
const handleDuplicationKeyError = (err) => {

  const message = `you have entered duplicate key name as  ${err.keyValue.name} `;
  return new AppError(message, 404)

}

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el =>

    el.message

  )
  const message = `invalid input ${errors.join('. ')}`

  return new AppError(message, 404)







}


const errInDevelopment = (err, res) => {

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err

  });
}

const errInProduction = (err, res) => {
  // err like user entered wrong url or bad input 

  if (err.isOperational) {

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // err like syntax mistkes or express error 
  else {
    console.log(err);
    // console.log(err.message);
    res.json({
      message: "Something happened very wrong!"
    })
  }

}


app.use((err, req, res, next) => {
  console.log(err)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    errInDevelopment(err, res);
  }
  else if (process.env.NODE_ENV === "production") {

    let Error = { ...err }
    if (Error.kind === 'ObjectId') {
      Error = handleCastError(Error);
    }

    else if (Error.code === 11000) {
      Error = handleDuplicationKeyError(Error)
    }

    else if (Error._message === 'Tour validation failed') {
      Error = handleValidationError(Error)
    }
    errInProduction(Error, res)
  }
});

module.exports = app;
