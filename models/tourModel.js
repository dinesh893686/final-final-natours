const mongoose = require("mongoose");

const tourSchema=new mongoose.Schema(
    {
    name:{
      type:String,
      required:[true,"A tour must have an name"],
      unique:true
    },
    duration:{
         type:Number,
         required:[true,"A tour must have an duration"],
    },
    maxGroupSize:
    {
      type:Number,
     // required:[true,"price field is required"]
     default:5
    },
    difficulty:{
      type:String,
      required:[true,"A tour must have an difficulty"],
    },
    ratingsAverage:{
      type:Number,
      default:0
    },
    ratingsQuantity:{
      type:Number,
      default:0
    },
    price:{
      type:Number,
      required:[true,"A tour must have an price"],
    },
    summary:{
      type:String,
      required:[true,"A tour must have an summary"],
    },
    description:{
      type:String,
      
    },
    imageCover:{
      type:String,
      required:true
    },
    images:[String],
    startDates:[Date],
    // createdAt:Date.now()

  }
  )
  const Tour =mongoose.model('Tour',tourSchema)

module.exports=Tour