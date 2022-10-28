const course = require("../models/Course");
class SiteController {
  // [GET] /home
  index(req, res) {
    res.render("home");
    course.find({}, function (err, courses) {
      if (!err) res.json(courses);
      else {
        res.status(400).json();
      }
    });
  }

  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
