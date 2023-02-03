const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const salt = bcryptjs.genSaltSync(10);
const app = express();
const secret = "fadv555v6a2dvdfv9d2vd9fv89d7f";
app.use(cors({ credentials: true, origin: "http://localhost:3000/" }));
dotenv.config();
mongoose.connect(process.env.MONGO, (err, c) => {
  console.log("connected to database");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const pass = bcryptjs.hashSync(password, salt);
  console.log(username, pass);
  try {
    const UserDetail = await User.create({
      username,
      password: pass,
    });
    res.json({ reqData: { UserDetail } });
  } catch (err) {
    res.status(400).json(err);
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const UserDetal = await User.findOne({ username });
  console.log(UserDetal);
  if (UserDetal === null) {
    res.status(400).json({ err: "Wrong Credentials" });
  } else {
    const passOk = bcryptjs.compareSync(password, UserDetal.password);
    if (passOk) {
      //token gen
      jwt.sign({ username, id: UserDetal._id }, secret, {}, (err, token) => {
        if (err) throw err;
        // console.log(token);
        res.cookie("token", token).json("done");
      });
    } else {
      res.status(400).json({ err: "Wrong Credentials" });
    }
  }
});
app.listen(4000);
