const express = require("express");
const app = express();
const tourRouter = express.Router();

const tourController = require("./../controller/tourController");

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
