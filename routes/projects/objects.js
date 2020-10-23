const fs = require('fs')

class ProjectImage {

    constructor(name) {
      this.name = name;
      this.url = "";
    }
   
  }
  
  class Project {
    constructor(_name) {
      this.name = _name;
      this.imagesObjects = []; //array of ProjectImages
    }
    insertImage = (object) => {
      this.images.push(object)
    }
  }

  module.exports.Project = Project
  module.exports.ProjectImage = ProjectImage