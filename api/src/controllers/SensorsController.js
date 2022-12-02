/*
 * Imports Definition
 */
const api = require("../library/ApiFunctions");
const fs = require("fs");

/*
 * Controller Definition
 */
const Router = require("express").Router();
const FilePath = "./datasets/sensors.json";
exports.SensorsController = Router;

// <RETURN>PagedResults</RETURN>
// [GET] Sensors
Router.get("/", (_, response) => {
  fs.readFile(FilePath, "utf8", (err, content) => {
    if (err) return api.error(response.send, err);
    return response.send(JSON.parse(content));
  });
});

// <RETURN>CreatedItem</RETURN>
// [PUT] Sensor
Router.put("/", (request, response) => {
  if (!Object.entries(request.body).length) return response.status(400).send();
  try {
    fs.writeFileSync(FilePath, JSON.stringify(request.body, null, 4));
    return response.send(request.body);
  } catch (err) {
    return api.error(response.send, err);
  }
});
