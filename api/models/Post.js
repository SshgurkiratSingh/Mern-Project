const mongoose = require("mongoose");

const { Scheme, model } = mongoose;

const PostScheme = new mongoose.Schema(
  {
    title: { type: String },
    summary: String,
    content: String,
    cover: String,
    published: String,
    datePublished: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
const PostModel = model("Post", PostScheme);
module.exports = PostModel;
