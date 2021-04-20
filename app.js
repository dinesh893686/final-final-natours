const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
app.use(express.json());
console.log;
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});
app.use((req, res, next) => {
  // console.log("hello from the middleware2");
  req.requestTime = new Date().toISOString();
  //
  //   console.log(req.requestTime);
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// console.log(tours);
// all handlers
// users handler
const getALLUsers = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
const getUser = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
const updateUser = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
const deleteUser = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};
const createUser = (req, res) => {
  // console.log(req.requestTime);
  res.status(404).json({
    messsage: "not found",
    data: "<h1>user handler is not implemented yet</h1>",
  });
};

//tour handler
const getALLTour = (req, res) => {
  // console.log(req.requestTime);
  res.status(200).json({
    messsage: "ok",
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};
const createTour = (req, res) => {
  //   console.log(req.body());
  //   const newTour=req.body();
  const newId = tours[tours.length - 1].id + 1;
  // console.log(newId);
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  //   JSON.stringify(tours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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

const getTour = (req, res) => {
  //   console.log(req.params);
  const x = req.params.id * 1;
  const tour = tours.find((el) => el.id == x);
  if (!tour) {
    return res.status(404).json({
      messsage: "not found",
    });
  }
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
const updateTour = (req, res) => {
  //   console.log(req.params);
  const x = req.params.id * 1;
  // const tour = tours.find((el) => el.id == x);
  if (x > tours.length) {
    return res.status(404).json({
      messsage: "not found",
    });
  }
  res.status(200).json({
    messsage: "success",
    data: "<h1>updated tour</h1>",
  });
  //   data: {
  //     tours,
  //   },
};
const deleteTour = (req, res) => {
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
// all route
app.route("/api/v1/tours").get(getALLTour).post(createTour);

app
  .route("/api/v1/tours/:id?")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// user router

app.route("/api/v1/users").get(getALLUsers).post(createUser);
app
  .route("/api/v1/users/:id?")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
});
