const express = require("express");


const tourRouter = express.Router();

const tourController = require("./../controller/tourController");


tourRouter.route("/getTourStats").get(tourController.getTourStats)

tourRouter
  .route("/top-5-cheap-tours").get(tourController.aliasTopTour, tourController.getALLTour)
tourRouter
  .route("/")
  .get(tourController.getALLTour)
  .post(tourController.createTour);

tourRouter
  .route("/:id?")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = tourRouter;
