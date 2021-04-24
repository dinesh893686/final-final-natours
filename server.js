const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1)


});



const app = require("./app");

const DB = process.env.DATABASE

console.log(process.argv)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    user: process.env.userName, pass: process.env.userPass
  })
  .then(() => {
    console.log("connection successful");
  });

const server = app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);

  server.close(() => {

    process.exit(1)

  })


});



