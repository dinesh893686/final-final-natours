const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
// ;
const server = require("./app");
// console.log(process.env.DATABASE);
const DB = process.env.DATABASE
// DB.replace()



mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    user: process.env.userName, pass: process.env.userPass
  })
  .then(() => {
    console.log("connection successful");
  });


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

const testTour=new Tour({
    name:"The forest hiker",
    price:500,
    ratings:4.7

})
testTour.save().then((docs)=>{
  console.log(docs);
}).catch((err)=>{
  console.log('error:',err)
})

server.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
});
