// const fs = require("fs");
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
// );

const { findByIdAndUpdate } = require('./../models/tourModel');
const Tour = require('./../models/tourModel')
// exports.checkId = (req, res, next, val) => {
//   if (val > tours.length) {
//     return res.status(404).json({
//       messsage: "not found",
//     });
//   }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   const name = req.body.name;
//   const price = req.body.price;
//   if (!name || !price) {
//     return res.status(404).json({
//       message: "invalid input",
//     });
//   }
//   next();
// };
exports.getALLTour = async (req, res) => {
  // console.log(req.requestTime);
  try {

    const query_obj = { ...req.query }
    const excluded_query = ['page', 'sort', 'limit', 'fields']
    excluded_query.forEach((el) => {
      delete query_obj[el]

    })
    // const id = query_obj * 1
    console.log(query_obj)

    let query_str = JSON.stringify(query_obj)
    // console.log(query_str)
    query_str = query_str.replace(/\(gte|gt|lte|lt)\b/g, (match) => `$${match}`

    )
    console.log(JSON.parse(query_str))
    const query = Tour.find(JSON.parse(query_str))

    const tours = await query

    res.status(200).json({
      messsage: "success",

      data: {
        tours,
      },
    });
  }
  catch {
    (err) => {
      res.status(201).json({
        messsage: "fail",
        error: err
      });
    }
  }
}
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(
      req.body
    )
    res.status(201).json({
      messsage: 'success',
      data: {
        newTour
      }

    })



  }
  catch {
    (err) => {
      res.status(200).json({
        message: "fail",
        error: err
      })
    }
  }
};

exports.getTour = async (req, res) => {
  //   console.log(req.params);
  // const x = req.params.id * 1;
  // const tour = tours.find((el) => el.id == x);
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      messsage: "success",
      data: {
        tour,
      },
    });
  }
  catch {
    (err) => {
      res.status(404).json({
        messsage: "fail",

        error: err
      });
    }


  }
};
exports.updateTour = async (req, res) => {
  //   console.log(req.params);
  // const x = req.params.id * 1;
  // const tour = tours.find((el) => el.id == x);
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      messsage: "success",
      data: {
        tour
      }
    });
  }
  catch {
    (err) => {
      res.status(404).json({
        messsage: "fail",

        error: err
      });
    }


  }
  //   data: {
  //     tours,
  //   },
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    console.log(tour)
    res.status(204).json({
      messsage: "success",
      data: null,
    });
  }
  catch {
    (err) => {
      res.status(404).json({
        messsage: "fail",

        error: err
      });
    }

  }
}
