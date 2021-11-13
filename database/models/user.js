const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: [Types.ObjectId],
    ref: "Users",
  },
  enemies: {
    type: [Types.ObjectId],
    ref: "Users",
  },
  photo: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const User = model("User", userSchema, "users");

module.exports = User;
