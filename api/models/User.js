const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const UserSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  dateJoined: { type: Date, default: Date.now() },
  articlePublished: { type: Number, Default: 0 },
  fullName: { type: String },
});
const UserModel = model("User", UserSchema);
module.exports = UserModel;
