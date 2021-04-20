const express = require("express");
// const app = express();

const tourRouter = express.Router();

const tourController = require("./../controller/tourController");

// app.param('id',(req,res,next,val)=>{
//   console.log(val);sa

// })

// tourRouter.param("id", tourController.checkId);
tourRouter
  .route("/")
  .get(tourController.getALLTour)
  .post( tourController.createTour);

tourRouter
  .route("/:id?")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = tourRouter;
