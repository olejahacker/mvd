const express = require("express");

const router = express.Router();
const controller = require("../controller/controller");


let routes = (app) => {
  router.post("/checkImage", controller.upload);
  router.post("/checkText", controller.checkText);
  router.get("/", controller.index)
  router.get("/image", controller.image);
  app.use(router);
};

module.exports = routes;
