const server = require("./app");

server.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
});
