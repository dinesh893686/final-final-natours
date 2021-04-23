const { findByIdAndUpdate } = require("./../models/tourModel");
const Tour = require("./../models/tourModel");

const apiFeatures = require("./../utils/apiFeatures");

exports.aliasTopTour = (req, res, next) => {
  (req.query.limit = "5"), (req.query.fields = "name price duration");
  next();
};

exports.getALLTour = async (req, res) => {
  try {
    // console.log(req.query)

    const x = new apiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const query = x.query;

    const tours = await query

    res.status(200).json({
      messsage: "success",
      length: tours.length,
      data: {
        tours,
      },
    });
  } catch {
    (err) => {
      res.status(201).json({
        messsage: "fail",
        error: err,
      });
    };
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      messsage: "success",
      data: {
        newTour,
      },
    });
  } catch {
    (err) => {
      res.status(200).json({
        message: "fail",
        error: err,
      });
    };
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      messsage: "success",
      data: {
        tour,
      },
    });
  } catch {
    (err) => {
      res.status(404).json({
        messsage: "fail",

        error: err,
      });
    };
  }
};
exports.updateTour = async (req, res) => {
  //   console.log(req.params);
  // const x = req.params.id * 1;
  // const tour = tours.find((el) => el.id == x);
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      messsage: "success",
      data: {
        tour,
      },
    });
  } catch {
    (err) => {
      res.status(404).json({
        messsage: "fail",

        error: err,
      });
    };
  }
  //   data: {
  //     tours,
  //   },
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    console.log(tour);
    res.status(204).json({
      messsage: "success",
      data: null,
    });
  } catch {
    (err) => {
      res.status(404).json({
        messsage: "fail",

        error: err,
      });
    };
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const tourStats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gt: 4.5 } },
      },
      {
        $group: {
          _id: "$difficulty",
          max_price: {
            $max: "$price",
          },
          Average_price: {
            $avg: "$price",
          },
          min_price: {
            $min: "$price",
          },

          tourNumbers: {
            $add: 1
          }
        },
      },
    ]);

    res.status(200).json({
      message: "success",
      data: {
        tourStats,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "fail",
      error: err,
    });
  }
};

exports.monthlyPlan = async (req, res) => {
  try {
    // console.log()
    const year = req.params.year * 1;
    console.log(year)
    const monthlyStats = await Tour.aggregate([
      {
        $unwind: "$startDates"
      },




    ]);
    res.status(200).json({
      message: "success",
      data: {
        monthlyStats
      },
    });
  }
  catch (err) {
    res.status(404).json({
      message: "fail",
      error: err,
    });
  }
};
