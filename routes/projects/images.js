const router = require("express").Router();
require("dotenv").config();
const fs = require("fs");
const path = require("path")
const { dirTree } = require("./utils");
const { Project, ProjectImage } = require("./objects");
const { getDirectories } = require("../../index_utils");

router.get("/image", (req, res, next) => {
  console.log("Dirname", process.cwd());
  const fileName = `${process.cwd()}/images/360/CASA_1/living_01.jpg`;
  res.sendFile(fileName, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: ", fileName);
    }
  });
});



router.get("/:project_name", (req, res) => {
  const path = `projects/${req.params.project_name}/images/`;
  const rooms = getDirectories(path);
  const imageObjectsList = [];
  rooms.forEach((room, i) => {
    const pathToRoom = path + room;
    const imgTypes = getDirectories(pathToRoom);
    const tempObject = new Object()
    tempObject[room]={};
    imgTypes.forEach((imgType, i) => {
      fs.readdirSync(pathToRoom + "/" + imgType).forEach((file, i) => {
        const fileName = file.split(".")
        const fileType = fileName[fileName.length - 1]
        const supportedFiles = ["jpg", "jpeg", "png"]
        if (supportedFiles.includes(fileType)) {
          
          tempObject[room][imgType] = file
          tempObject[room][`${imgType}_URL`] = "https://"+ req.headers.host + "/" + pathToRoom + "/" +imgType+ "/" + file
        }
      })
    });
    imageObjectsList.push(tempObject)
  });

  // console.log(imageObjectsList);
  const project = new Project(req.params.project_name, imageObjectsList);
  res.send(project);
});
module.exports = router;
