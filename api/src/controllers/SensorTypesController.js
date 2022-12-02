/*
 * Imports Definition
 */
const api = require("../library/ApiFunctions");
const fs = require("fs");

/*
 * Controller Definition
 */
const Router = require("express").Router();
const FilePath = "./datasets/sensor_types.json";
exports.SensorTypesController = Router;

// <RETURN>PagedResults</RETURN>
// [GET] Sensors
Router.get("/", (_, response) => {
  fs.readFile(FilePath, "utf8", (err, content) => {
    if (err) return api.error(response.send, err);
    return response.send(JSON.parse(content));
  });
});
