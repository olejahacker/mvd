const express = require("express");
const app = express();
global.__basedir = __dirname;

const initRoutes = require("./src/routes"); 

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(process.env.port || 3000);
