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
      //Foreach to pass the id of each section as string
      commentas.forEach(element => {
        element._id = element._id.toString();
      });
    })
    .catch(err => {
      console.log(err);
    });

  User.findOne({
    id: 1,
  })
    .then(user => {
      const data = {
        userr: user,
        coment: commentas,
      };
      //console.log("The data is:", data);
      res.render("index", data);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/test", (req, res, next) => {
  const data = {
    name: "jesus",
  };
  res.render("test", data);
});

// @route   POST /comments
// @desc    Insert a new comment on existing section or creates a new Section with comment
// @access  Private
router.post("/comments", (req, res, next) => {
  //Get the request body
  const {
    authorAvatarUrl,
    authorId,
    authorName,
    authorUrl,
    comment,
    sectionId,
    id,
  } = req.body;

  const data = {
    authorAvatarUrl,
    authorId,
    authorName,
    authorUrl,
    comment,
    sectionId,
    id,
  };

  //Here we create the new Comment object with the data of req.body
  const newComment = {
    authorAvatarUrl,
    authorName,
    authorId,
    authorUrl,
    comment,
    id,
    deleted: false,
    replies: [],
  };

  //Query
  const query = {
      sectionId: sectionId,
    },
    update = {
      $push: {
        comments: newComment,
      },
    },
    options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };

  //if the document is not found, then create a new one, else update comments and push the newComment
  Section.findOneAndUpdate(query, update, options)
    .then(comment => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

// @route   POST /delete
// @desc    Marks the recievied comment id as deleted
// @access  Private

router.post("/delete", (req, res, next) => {
  const commentId = req.body.id;
  Section.update(
    { "comments.id": commentId },
    { $set: { "comments.$.deleted": true } },
  )
    .then(comment => {
      console.log(comment);
      res.redirect(200, "/");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
