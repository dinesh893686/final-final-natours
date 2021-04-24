const { findByIdAndUpdate } = require("./../models/tourModel");
const Tour = require("./../models/tourModel");


const apiFeatures = require("./../utils/apiFeatures");

const catchAsync = require('./../utils/catchAsync')
const appError = require('./../utils/appError')

exports.aliasTopTour = (req, res, next) => {
  (req.query.limit = "5"), (req.query.fields = "name price duration");
  next();
};



exports.getALLTour = catchAsync(async (req, res, next) => {

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
}
)


exports.createTour = catchAsync(async (req, res, next) => {

  const newTour = await Tour.create(req.body);

  res.status(201).json({
    messsage: "success",
    data: {
      newTour,
    },
  });
}
)

exports.getTour = catchAsync(async (req, res, next) => {

  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new appError('No tour find with that ID', 404))

  }
  res.status(200).json({
    messsage: "success",
    data: {
      tour,
    },
  });
}
)
exports.updateTour = catchAsync(async (req, res) => {


  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });


  if (!tour) {
    return next(new appError('No tour find with that ID', 404))

  }
  res.status(200).json({
    messsage: "success",
    data: {
      tour,
    },
  });
}

)
exports.deleteTour = catchAsync(async (req, res, next) => {

  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new appError('No tour find with that ID', 404))

  }
  console.log(tour);
  res.status(204).json({
    messsage: "success",
    data: null,
  });
}

)

exports.getTourStats = catchAsync(async (req, res, next) => {

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
          $sum: 1
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
}

)

exports.monthlyPlan = catchAsync(async (req, res, next) => {

  const year = req.params.year * 1;
  console.log(year)
  const monthlyStats = await Tour.aggregate([
    {
      $unwind: "$startDates"
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {

      $group: {

        _id: {
          $month: '$startDates'
        },
        numTourStarts: {
          $add: 1
        },
        Tour: {
          $push:
            '$name'

        }


      }

    }



  ]);
  res.status(200).json({
    message: "success",
    data: {
      monthlyStats
    },
  });
}
)

