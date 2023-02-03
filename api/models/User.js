const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const UserListSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  dateJoined: { type: Date, default: Date.now() },
  articlePublished: { type: Number, default: 0 },
  fullName: { type: String, default: "Not Added" },
});
const UserModel = model("User", UserListSchema);
module.exports = UserModel;
