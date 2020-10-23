const router = require("express").Router();
require("dotenv").config();
const fs = require("fs");
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


router.get("/files", (req, res) => {
  console.log("==================================================");
  res.send(dirTree("./projects"));
});

router.get("/:project_name", (req, res) => {
  const path = `projects/${req.params.project_name}/images/`;
  const rooms = getDirectories(path);
  
  const imageObjectsList = [];
  rooms.forEach((room, i) => {
    const pathToRoom = path + room;
    const imgTypes = getDirectories(pathToRoom);
    const imageObject = new Object();
    imgTypes.forEach((imgType, i) => {
      fs.readdir(pathToRoom + "/" + imgType, (err, files) => {
        if (err) {
          throw Error(err);
        }
        files.forEach((file, i)=>{
          const fileName = file.split(".")
          const fileType = fileName[fileName.length -1 ]
          const supportedFiles = ["jpg", "jpeg", "png"]
          if(supportedFiles.includes(fileType)){
            imageObject[imgType] = file;
          } 
        })
        imageObjectsList.push(imageObject);
      });
    });
  });
  const d = fs.readFileSync(path);
  console.log("readdirsync", d)
  const project = new Project(req.params.project_name, rooms);
  res.send(project);
});
module.exports = router;
