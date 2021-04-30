const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/checkImage", controller.upload);
  router.post("/checkText", controller.checkText);
  app.use(router);
};

module.exports = routes;
