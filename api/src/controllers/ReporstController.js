/*
 * Imports Definition
 */
const { PagedResults } = require("../library/PagedResults");
const { Mailer } = require("../mails/Mailer");
const api = require("../library/ApiFunctions");
const fs = require("fs");

/*
 * Controller Definition
 */
const Router = require("express").Router();
const FilePath = "./datasets/reports.json";
const OtherPaths = {
  sensors: "./datasets/sensors.json",
  sensor_types: "./datasets/sensor_types.json",
};
exports.ReporstController = Router;

// <RETURN>PagedResults</RETURN>
// [GET] Reports
Router.get("/", (request, response) => {
  const pagination = {
    page: request.query?.page || 1,
    size: request.query?.size || 10,
  };

  fs.readFile(FilePath, "utf8", (err, content) => {
    if (err) return api.error(response.send, err);
    const out = new PagedResults(JSON.parse(content).reverse(), pagination);
    return response.send(out);
  });
});

// <RETURN>CreatedItem</RETURN>
// [SET] Report
Router.post("/", (request, response) => {
  if (!Object.entries(request.body).length) {
    return response.status(400).send();
  }

  try {
    const newItem = {};
    const sensors = JSON.parse(fs.readFileSync(OtherPaths.sensors, "utf8"));
    const sensorTypes = JSON.parse(
      fs.readFileSync(OtherPaths.sensor_types, "utf8")
    );

    const sensor = sensors[request.body.sensor];
    newItem.device = request.body.device;
    newItem.sensor = sensor.name;
    newItem.detail = request.body.detail || "Action perfomed";

    const description = sensorTypes[sensor.type].replace("${}", newItem.sensor);
    newItem.description = description;
    newItem.created_at = newStringDate();

    const content = fs.readFileSync(FilePath, "utf8");
    const rows = [...JSON.parse(content), newItem];

    fs.writeFileSync(FilePath, JSON.stringify(rows, null, 4));

    const mail = new Mailer();
    mail.setConfig({
      to: "yorsethrv@hotmail.com",
      subject: `[ALERT] ${newItem.detail}`,
      template: "index",
    });
    mail.send({ ...newItem, quickDetails: newItem.detail });
    return response.send(newItem);
  } catch (err) {
    return api.error(response.send, err);
  }
});

/*
 * Handlers Functions
 */
function newStringDate() {
  const dateTime = new Date();
  const date = `${dateTime.getFullYear()}/${twoDigits(
    dateTime.getMonth()
  )}/${twoDigits(dateTime.getDate())}`;
  const time = `${twoDigits(dateTime.getHours())}:${twoDigits(
    dateTime.getMinutes()
  )}:${twoDigits(dateTime.getSeconds())}`;
  return `${date} ${time}`;
}

function twoDigits(value) {
  let response = String(value);
  if (response.length < 2) response = "0" + response;
  return response;
}
