const mongoose = require("mongoose");
const validator = require("validator")
const { default: slugify } = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have an name"],
      unique: true,
      trim: true,
      minlength: [10, "A tour must have more than 10 characters"],
      maxlength: [40, "A tour must have more than 40 characters"]
      // validate: [validator.isAlpha, "A "]
    },
    duration: {
      type: Number,
      required: [true, "A tour must have an duration"],
    },
    maxGroupSize:
    {
      type: Number,
      // required:[true,"price field is required"]
      default: 5
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have an difficulty"],
      trim: true,
      enum: {
        values: ["easy", "medium", "difficult"],
        messages: "A tour can only have these three difficulty "
      }
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, "A rating must be greater than 1"],
      max: [5, "A rating must be lower than 5"]
    },
    slug: {
      type: String,

    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, "A tour must have an price"],
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          return this.price > val

        },
        message: "price should be greater than discount price"

      }

    },
    summary: {
      type: String,
      required: [true, "A tour must have an summary"],
    },
    description: {
      type: String,
      trim: true

    },
    imageCover: {
      type: String,
      required: true
    },
    images: [String],
    startDates: [Date],

    secretTour: {
      type: Boolean,
      default: false
    }

    // createdAt:Date.now()

  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }

  }
)
tourSchema.virtual('week').get(function () {
  return this.duration / 7;


})



//document middlewareb works on .save and .create
tourSchema.pre('save', function (next) {


  this.slug = slugify(this.name, { lower: true })
  next()
}
)
// tourSchema.post('save', function (doc, next) {

//   console.log(doc);
//   next()

// }
// )


//query middleware 
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } })
  next()
})

tourSchema.post(/^find/, function (docs, next) {

  console.log(docs)

  next()
})
tourSchema.pre('aggregate', function (next) {

  // console.log(this);
  this.pipeline().unshift({
    $match: {
      secretTour: { $ne: true }
    }
  })
  next()
})


const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour