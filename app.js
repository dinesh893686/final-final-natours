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
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `can't find ${req.originalUrl} on this server`

  // })
  console.log(req.originalUrl);
  const err = new Error(`can't find ${req.originalUrl} on this server`)
  err.status = "fail"
  err.statusCode = 404
  next(err)

})

app.use((err, req, res, next) => {

  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  res.status(err.statusCode).json(
    {
      status: err.status,
      message: err.message
    }
  )


})




module.exports = app;
