const express = require("express");
const fs = require("fs");
require("dotenv").config();
const {getDirectories} = require('./index_utils')
const api = express();


//Routes
const imagesRoute = require('./routes/projects/images')
api.use('/projects', imagesRoute);

api.get("/projects", (req,res)=>{
    res.send(getDirectories('./projects'))
})

api.listen(process.env.PORT, () =>
  console.log("The dalia-api is runnign just fine.")
);
