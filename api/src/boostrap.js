const routes = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (app, router) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use(router);

  routes.setRoutes(router);
  /*  router.use((err, req, res, next) => {
    if (err) return res.send(err.message);
  }); */
};
