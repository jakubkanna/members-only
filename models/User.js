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
  password: { type: String, required: true },
  membership: Boolean,
  hash: String,
  salt: String,
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

UserSchema.pre("save", function (next) {
  this.username = this.email;
  next();
});

module.exports = mongoose.model("User", UserSchema);
