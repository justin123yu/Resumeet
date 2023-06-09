const express = require("express");
const router = express.Router();
const Profile = require("../Models/profile-model.js");
const Resume = require("../Models/resume-model.js");
const bcrypt = require("bcrypt");

//Add old code to handle Unique Username

router.route("/api/profile").post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const date = new Date().toLocaleString();

  //Check for dubplicate username.
  let filter = {
      username: username
  }
  Profile.find(filter, async (err, result) => {
      if(err) throw err;
      if(result.length !== 0 ) {
        console.log("user Found already");
        res.status(300).json({message: "Username is already used"});
        return;
      }else if(password.length <= 6) {
        console.log("Password is less then 6 characters");
        res.status(301).json({message: "Password is less then 6 characters"});
        return;
      } else {
        try {
          // Hash and salt the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
      
          const newProfile = new Profile({
            username,
            password: hashedPassword,
            email,
            date
          });
      
          // Save the signup model into the database connection.
          const savedProfile = await newProfile.save();
          console.log("Profile created:", savedProfile);
          res.status(200).send(savedProfile);
        } catch (err) {
          console.error("Error creating profile:", err);
          res.status(500).send("Error creating profile");
        }
      }
  }); 


});

 
router.route("/profile/:username").get((req, res) => {
  const username = req.params.username;
  console.log("Fetching profile for:", username);
  Profile.findOne({ username }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error fetching profile data" });
    } else {
      res.json(result);
    }
  });
});


router.route("/api/profile/:username").delete(async (req, res) => {
  const username = req.params.username;

  try {
    // Delete all resumes related to the user
    await Resume.deleteMany({ username });

    // Delete the profile
    const deletedProfile = await Profile.findOneAndDelete({ username });
    if (!deletedProfile) {
      res.status(404).send("Profile not found");
      return;
    }

    console.log("Profile deleted:", deletedProfile);
    res.status(200).send({ message: "Profile and related resumes deleted successfully" });
  } catch (err) {
    console.error("Error deleting profile:", err);
    res.status(500).send("Error deleting profile");
  }
});
module.exports = router;
