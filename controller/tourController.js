

const { findByIdAndUpdate } = require('./../models/tourModel');
const Tour = require('./../models/tourModel')

const apiFeatures = require('./../utils/apiFeatures')

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5',
    req.query.fields = 'name price duration'
  next()
}

exports.getALLTour = async (req, res) => {

  try {

    // console.log(req.query)

    const x = new apiFeatures(Tour.find(), req.query).filter().sort().limitFields().pagination();
    const query = x.query
    //filter
    // const query_obj = { ...req.query }
    // const excluded_query = ['page', 'sort', 'limit', 'fields']
    // excluded_query.forEach((el) => {
    //   delete query_obj[el]

    // })

    // let query_str = JSON.stringify(query_obj)

    // query_str = query_str.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`
    // )

    // let query = Tour.find(JSON.parse(query_str))


    //sort 
    // if (req.query.sort) {
    //   let sortBy = req.query.sort.split(',').join(' ')
    //   query = query.sort(sortBy)
    // }

    //limitFields
    // if (req.query.fields) {
    //   let limitBy = req.query.fields.split(',').join(' ')
    //   query = query.select(limitBy)
    // }
    // else {
    //   query = query.select('-__v')
    // }

    //pagination
    // const page = req.query.page * 1 || 1
    // const limit = req.query.limit * 1 || 100
    // const skip_page = (page - 1) * limit
    // // if (req.query.page) {
    // if (req.query.page) {
    //   if (skip_page >= await Tour.countDocuments) {
    //     throw new Error('This page does not exist')
    //   }
    // }

    // else {
    //   query = query.skip(skip_page).limit(limit)
    // }
    const tours = await query

    res.status(200).json({
      messsage: "success",
      length: tours.length,
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
