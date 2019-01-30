const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Comment = require("../models/comment");

/* GET home page */
router.get("/", (req, res, next) => {
  var commentas = [];

  Comment.findOne({ authorName: "Whiteskullka" })
    .then(comment => {
      commentas = comment;
    })
    .catch(err => {
      console.log(err);
    });

  User.findOne({ id: 4 })
    .then(user => {
      const data = {
        userr: user,
        coment: commentas
      };
      console.log(data.coment);
      res.render("index", data);
    })
    .catch(err => {
      console.log(err);
    });
});

//Test route
router.get("/test", (req, res, next) => {
  const data = {
    name: "jesus"
  };
  res.render("test", data);
});

//Comment posted
router.post("/comments", (req, res, next) => {
  //Save the comment on database
  const test = req.body;
  res.send({ msg: test });

  // newComment
  //   .save()
  //   .then(book => {
  //     res.redirect("/index");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});
module.exports = router;
