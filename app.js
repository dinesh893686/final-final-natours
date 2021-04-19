const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// console.log(tours);
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    messsage: "ok",
    data: {
      tours,
    },
  });
});
app.post("/api/v1/tours", (req, res) => {
  //   console.log(req.body());
  //   const newTour=req.body();
  const newId = tours[tours.length - 1].id + 1;
  console.log(newId);
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
});
app.get("/api/v1/tours/:id?", (req, res) => {
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
});

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  }
});
