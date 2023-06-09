const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  date: Date,
  resumes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume'
  }]
});

const modelName = "Profile";

module.exports = mongoose.models[modelName] || mongoose.model(modelName, profileSchema);
