const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Section = require("../models/section");

/* GET home page */
router.get("/", (req, res, next) => {
  var commentas = [];

  Section.findOne({
      sectionId: 2
    })
    .then(comment => {
      console.log(comment);
      commentas = comment;
    })
    .catch(err => {
      console.log(err);
    });

  User.findOne({
      id: 1
    })
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
    id,
    sectionId
  } = req.body;


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
    replies: []
  }

  //Search the requested section on the database
  Section.findOne({
      sectionId: sectionId
    })
    .then(sectionFound => {

      sectionFound.comments.push(newComment);

      Section.update({
          _id: sectionFound._id
        }, {
          $set: {
            sectionId: sectionId,
            comments: sectionFound.comments
          }
        })
        .then((book) => {
          console.log(book)
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch(err => {
      console.log(err);
    });
});


// //if this sectionId already exists on the database, we need to push the comment to the array 
// Section.findOne({
//     sectionId: sectionId
//   })
//   .then(section => {

//     //the section Id was found on the database, push the new comment inside it's array
//     section.comments.push(data);
//     var newComment = section.comments;

//     //then update the schema on the database
//     Section.update({
//         sectionId: sectionId
//       }, {
//         $set: {
//           sectionId: "que tranza",

//         }
//       })
//       .then((book) => {
//         console.log(book)
//       })
//       .catch((error) => {
//         console.log(error);
//       })



//   })
//   .catch(err => console.log(err));

// const {
//   sectionId,
//   comment,
//   authorAvatarUrl,
//   authorName,
//   authorId,
//   authorUrl,
//   id
// } = req.body;

// const newComment = {
//   id: id,
//   authorAvatarUrl: authorAvatarUrl,
//   authorName: authorName,
//   authorId: authorId,
//   authorUrl: authorUrl,
//   comment: comment
// };
// const newSection = new Section({
//   sectionId: req.body.sectionId
// });

// newSection.comments.push(newComment);

// console.log(newSection);

// newSection
//   .save()
//   .then(comment => {
//     res.redirect("/test");
//   })
//   .catch(err => {
//     console.log(err);
//   });

module.exports = router;