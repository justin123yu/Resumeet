const express = require("express");
const router = express.Router();
const Resume = require("../Models/resume-model.js");

router.route("/api/resume/:username").get((req, res) => {
  const username = req.params.username;
  Resume.find({ username: username }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving Resumes" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "No Resumes found for the requested user" });
      } else {
        res.json(result);
      }
    }
  });
});

router.route("/api/resume").get((req, res) => {
  Resume.find((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving Resumes" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "No Resumes found" });
      } else {
        res.json(result);
      }
    }
  });
});

router.route("/api/resume").post((req, res) => {
  const username = req.body.username;
  const text = req.body.text; // Text uploaded by the user

  const newResume = new Resume({
    username: username,
    text: text,
    date: new Date(),
  });

  newResume.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "Resume added successfully!" });
    }
  });
});

// New DELETE route for deleting a resume
router.route("/api/resume/:id").delete((req, res) => {
  const resumeId = req.params.id;

  Resume.findByIdAndDelete(resumeId, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error deleting Resume" });
    } else {
      res.json({ message: "Resume deleted successfully!" });
    }
  });
});

// Update the POST route to save the keywords in the filter array
router.route("/api/resume").post((req, res) => {
  const username = req.body.username;
  const text = req.body.text;
  const filter = req.body.filter; // Get the filter array from the request body

  const newResume = new Resume({
    username: username,
    text: text,
    date: new Date(),
    filter: filter, // Save the filter array
  });

  // Save the new resume to the database
  newResume.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error saving resume" });
    } else {
      res.status(200).json({ message: "Resume added successfully!", newResume });
    }
  });
});


// New PATCH route for adding a keyword to the filter array
router.route("/api/resume/:id/add_keyword").patch((req, res) => {
  const resumeId = req.params.id;
  const keyword = req.body.keyword;

  Resume.findByIdAndUpdate(resumeId, { $addToSet: { filter: keyword } }, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error adding keyword" });
    } else {
      res.json({ message: "Keyword added successfully!" });
    }
  });
});

// New PATCH route for removing a keyword from the filter array
router.route("/api/resume/:id/remove_keyword").patch((req, res) => {
  const resumeId = req.params.id;
  const keyword = req.body.keyword;

  Resume.findByIdAndUpdate(resumeId, { $pull: { filter: keyword } }, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error removing keyword" });
    } else {
      res.json({ message: "Keyword removed successfully!" });
    }
  });
});


module.exports = router;
