const fs = require('fs')

class ProjectImage {

    constructor(name) {
      this.name = name;
      this.url = "";
    }
   
  }
  
  class Project {
    constructor(_name,_imageObjects) {
      this.name = _name;
      this.imagesObjects = _imageObjects; //array of ProjectImages
    }
    insertImage = (object) => {
      this.imagesObjects.push(object)
    }
  }

  module.exports.Project = Project
  module.exports.ProjectImage = ProjectImage