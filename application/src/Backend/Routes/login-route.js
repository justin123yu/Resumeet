const express = require("express");
const router = express.Router();
const Profile = require("../Models/profile-model");
const bcrypt = require("bcrypt");

//Verify login information
router.route("/api/login").post((req, res) => {
    let filter = {
        username: req.body.username,
    };
    Profile.findOne(filter, async (err, result) => {
        if (err) throw err;
        if(result != null ){
            // Compare the client's password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(req.body.password, result.password);
            if (isPasswordValid) {
                res.json(result);
            } else {
                // Send null if the password is incorrect
                res.json(null);
            }
        } else {
            // Send null if no object is found
            res.json(null);
        }
    })
});

module.exports = router;
