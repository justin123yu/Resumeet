const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  username: String,
  text: String,
  date: Date,
  filter: Array,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

const modelName = "Resume";


module.exports = mongoose.models[modelName] || mongoose.model(modelName, resumeSchema);
