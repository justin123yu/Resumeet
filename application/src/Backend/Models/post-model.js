const mongoose = require("mongoose")

const postSchema = {
    username: String,
    date: Date,
    comment: String,
    email: String
}

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
