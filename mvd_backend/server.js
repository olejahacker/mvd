const express = require("express");
const app = express();
const ejs = require('ejs');
global.__basedir = __dirname;

const initRoutes = require("./src/routes"); 
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(process.env.port || 3000);
