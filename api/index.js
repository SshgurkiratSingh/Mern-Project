const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User.js");
const app = express();
app.use(cors());
dotenv.config();
mongoose.connect(process.env.MONGO, (err, c) => {
  console.log("connected to database");
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const UserDoc = await User.create({ username, password });
  res.json({ reqData: { UserDoc } });
});
app.listen(4000);
