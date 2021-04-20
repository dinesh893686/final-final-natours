const dotenv = require("dotenv");
dotenv.config({ path: "./env.config" });
// console.log(process.env);
const server = require("./app");

server.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
});
