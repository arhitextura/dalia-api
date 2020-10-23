const express = require("express");
const fs = require("fs");
require("dotenv").config();
const api = express();


//Routes
const imagesRoute = require('./routes/images')
api.use('/projects', imagesRoute);



api.listen(process.env.PORT, () =>
  console.log("The dalia-api is runnign just fine.")
);
