const mongoose = require("mongoose");

const tourSchema=new mongoose.Schema(
    {
    name:{
      type:String,
      required:[true,"name field is required"]
    },
    price:
    {
      type:Number,
      required:[true,"price field is required"]
    },
    ratings:{
      type:Number,
      default:4.5
    }

  }
  )
  const Tour =mongoose.model('Tour',tourSchema)

module.exports=Tour