const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have an name"],
      unique: true
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
    },
    ratingsAverage: {
      type: Number,
      default: 0
    },
    slug: String,
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, "A tour must have an price"],
    },
    summary: {
      type: String,
      required: [true, "A tour must have an summary"],
    },
    description: {
      type: String,

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
  this.pipeline.unshift({
    $match: {
      secretTour: { $ne: true }
    }
  })
  next()
})


const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour