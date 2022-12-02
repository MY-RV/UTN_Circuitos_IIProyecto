const { Router } = require("express");
const { ReporstController } = require("./controllers/ReporstController");
const { SensorsController } = require("./controllers/SensorsController");
const {
  SensorTypesController,
} = require("./controllers/SensorTypesController");

exports.setRoutes = (router = Router()) => {
  router.use("/reports", ReporstController);
  router.use("/sensors", SensorsController);
  router.use("/sensor-types", SensorTypesController);
};
