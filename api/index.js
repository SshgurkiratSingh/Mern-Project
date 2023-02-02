const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// mongoose
// import UserModel from "./models/User";
const app = express();
app.use(cors());
dotenv.config();
console.log(process.env.MONGO);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  res.json({ reqData: { username, password } });
});
app.listen(400);
