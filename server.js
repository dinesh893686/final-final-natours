const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
// ;
const server = require("./app");
// console.log(process.env.DATABASE);
const DB = process.env.DATABASE
// DB.replace()

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





server.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
});
