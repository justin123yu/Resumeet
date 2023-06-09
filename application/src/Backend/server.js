const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config({path:"../../.env"});
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB);

const profileRoutes = require("./Routes/profile-route");
const logInRoute = require("./Routes/login-route");
const resumeRoute = require("./Routes/resume-route"); // Add this line if you have a resumeRoute.js file
const postRoute = require("./Routes/post-route");

app.use("/", profileRoutes);
app.use("/", logInRoute);
app.use("/", resumeRoute); // Add this line if you have a resumeRoute.js file
app.use("/", postRoute.router);


app.get("/ping", (req, res) => {
  res.json({ msg: "pong" });
});

let port = 8000;

app.listen(port, function () {
  console.log(`express server running on port ${port}!`);
});
