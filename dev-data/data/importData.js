const dotenv = require("dotenv");
const fs=require('fs')
const mongoose = require("mongoose");
dotenv.config({ path: "./../../config.env" });
const Tour=require(`${__dirname}/../../models/tourModel`)
// ;
// const server = require("./app");
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

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tour-simple.json`,'utf-8'))
//import data into db
const importData=async()=>{
    try{
 const tours=await Tour.create(tours)
   res.status(200).json(
       {
         message:"success",
          data:{
              tours
          }
       }
   )


    }
    catch{  (err)=>
        {
        res.status(404).json(
            {
              message:"fail",
            //    data:{
            //        tours
            //    }
            error:err
            }
        )
        }
     
     

    }

}
//delete data from db
const deleteData=async()=>{


    try{
await Tour.deleteMany()
   res.status(200).json(
       {
         message:"success",
          
       }
   )


    }
    catch{(err)=>{
        res.status(404).json(
            {
              message:"fail",
            //    data:{
            //        tours
            //    }
            err
            }
        )
        }
     

    }





}
if(process.argv[2]=='--import')
{
    importData()
}
else if(process.argv[2]=='--delete')
{
   deleteData()
}
    
  


