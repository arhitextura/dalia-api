const express = require("express");
const fs = require("fs");
require("dotenv").config();
const {getDirectories} = require('./index_utils')
const api = express();


//Routes
const imagesRoute = require('./routes/projects/images')
api.use('/projects', imagesRoute);
api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.get("/projects", (req,res)=>{
    res.send(getDirectories('./projects'))
})

api.listen(process.env.PORT, () =>
  console.log("The dalia-api is runnign just fine.")
);
