const router = require("express").Router();
require("dotenv").config();
const dir = require('./utils')
router.get("/", (req, res, next) => {
    console.log("Dirname", process.cwd())
    const fileName =`${process.cwd()}/images/360/CASA_1/living_01.jpg`;
    res.sendFile(fileName, (err) => {
      if (err) {
        next(err);
      } else {
          console.log("Sent: ", fileName)
      }
    });
  });

  router.get("/dir", (req,res)=>{
      res.send(dir.dirTree('./projects'))
  })
module.exports = router;