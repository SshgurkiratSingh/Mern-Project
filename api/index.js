const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const User = require("./models/User.js");
const salt = bcryptjs.genSaltSync(10);
const app = express();
const path = require("path");
const Post = require("./models/Post");
const secret = "fadv555v6a2dvdfv9d2vd9fv89d7f";
const storage = multer.diskStorage({
  destination: "./public/upload/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
app.use("/image", express.static(__dirname + "/public/upload"));
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
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
      jwt.sign(
        {
          username,
          id: UserDetal._id,
          MemberSince: UserDetal.dateJoined,
          articlePublished: UserDetal.articlePublished,
        },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          // console.log(token);
          res.cookie("token", token).json({
            id: UserDetal._id,
            username,
          });
        }
      );
    } else {
      res.status(400).json({ err: "Wrong Credentials" });
    }
  }
});

app.get("/validate", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});
app.post("/post", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    console.log(info);
    upload(req, res, async (err) => {
      if (err) {
        res.json({ err });
      } else {
        const { title, summary, content } = req.body;
        const filename = req.file.filename;
        const postDo = await Post.create({
          title,
          summary,
          cover: filename,
          content,
          publisher: info.id,
        });
        res.json(postDo);
      }
    });
  });
});

app.get("/postlist", async (req, res) => {
  const post = await Post.find()
    .populate("publisher", ["username"])
    .sort({ createdAt: -1 });
  res.json(post);
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const respo = await Post.findById(id).populate("publisher", ["username"]);
  res.json(respo);
});
app.listen(4000);
//
