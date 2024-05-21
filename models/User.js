// User.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  username: { type: String, unique: true },
  membership: { type: Boolean, default: false },
  hash: String,
  salt: String,
});

UserSchema.pre("save", function (next) {
  this.username = this.email.split("@")[0];
  next();
});

module.exports = mongoose.model("User", UserSchema);
