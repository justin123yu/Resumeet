const mongoose = require("mongoose")

const profileSchema = {
    username: String,
    password: String,
    date: Date
}

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;