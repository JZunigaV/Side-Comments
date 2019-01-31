const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Section = require("../models/section");

/* GET home page */
router.get("/", (req, res, next) => {

  var commentas = [];
  Section.find()
    .then(comments => {

      commentas = comments;
    })
    .catch(err => {
      console.log(err);
    })

  User.findOne({
      id: 1
    })
    .then(user => {
    
       commentas.forEach(element => {

       element._id = element._id.toString();

      });


      const data = {
        userr: user,
        coment: commentas
      };

      console.log("The data is:", data);
      res.render("index", data);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/test", (req, res, next) => {
  const data = {
    name: "jesus"
  };
  res.render("test", data);
});

//Comment posted
router.post("/comments", (req, res, next) => {

  //Get the request body
  const {
    authorAvatarUrl,
    authorId,
    authorName,
    authorUrl,
    comment,
    sectionId,
    id
  } = req.body;

  const idComment = id

  //Assign he body to a variable
  const data = {
    authorAvatarUrl,
    authorId,
    authorName,
    authorUrl,
    comment,
    sectionId,
    id
  }

  //Comment object
  const newComment = {
    authorAvatarUrl,
    authorName,
    authorId,
    authorUrl,
    comment,
    id,
    replies: []
  }

  //Query 
  const query = {
      sectionId: sectionId
    },
    update = {
      $push: {
        comments: newComment
      }
    },
    options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };

  //if the document is not found, then create a new one, else update comments and push the newCommen
  Section.findOneAndUpdate(query, update, options)
    .then(comment => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    })
});





module.exports = router;