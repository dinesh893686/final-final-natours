const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);
exports.checkId = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({
      messsage: "not found",
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  if (!name || !price) {
    return res.status(404).json({
      message: "invalid input",
    });
  }
  next();
};
exports.getALLTour = (req, res) => {
  // console.log(req.requestTime);

  res.status(200).json({
    messsage: "ok",
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};
exports.createTour = (req, res) => {
  //   console.log(req.body());
  //   const newTour=req.body();

  const newId = tours[tours.length - 1].id + 1;
  // console.log(newId);
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  //   JSON.stringify(tours);
  fs.writeFile(
    "./../dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        messsage: "ok",
        data: {
          tours: newTour,
        },
      });
    }
  );
};

exports.getTour = (req, res) => {
  //   console.log(req.params);
  const x = req.params.id * 1;
  const tour = tours.find((el) => el.id == x);

  res.status(200).json({
    messsage: "success",
    data: {
      tour,
    },
  });
  //   data: {
  //     tours,
  //   },
};
exports.updateTour = (req, res) => {
  //   console.log(req.params);
  const x = req.params.id * 1;
  // const tour = tours.find((el) => el.id == x);

  res.status(200).json({
    messsage: "success",
    data: "<h1>updated tour</h1>",
  });
  //   data: {
  //     tours,
  //   },
};
exports.deleteTour = (req, res) => {
  //   console.log(req.params);
  const x = req.params.id * 1;
  // const tour = tours.find((el) => el.id == x);
  if (x > tours.length) {
    return res.status(404).json({
      messsage: "not found",
    });
  }
  res.status(204).json({
    messsage: "success",
    data: null,
  });
  //   data: {
  //     tours,
  //   },
};
