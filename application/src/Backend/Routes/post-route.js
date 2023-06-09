const express = require("express");
const router = express.Router();
const Post = require("../Models/post-model");
const {parseFrontEnd} = require("./postTest");

// Grabbing ALL Data from DB
router.route("/api/post").get((req, res) => {
  // Finds all the documents in our DB profile
  Post.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      // Sends the data to our front end.
      res.json(result);
    }
  });
});

router.route("/api/post").post((req, res) => {
  // Parses the data from the front end
  const postData = parseFrontEnd(req.body);
  if (postData == null) {
    res.sendStatus(404);
    return;
  }

  // Creates a new post using the parsed data
  const newPost = new Post(postData);

  // Saves the post to the database
  newPost.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error saving post" });
    } else {
      console.log("Post created:", newPost);
      res.status(200).json(newPost);
    }
  });
});

module.exports = { router, parseFrontEnd };
