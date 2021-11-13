const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

const registerUser = async (req, res, next) => {
  const newUser = req.body;
  const user = await User.findOne({ username: newUser.username });
  if (user) {
    const error = new Error("Username already exists");
    error.code = 400;
    next(error);
  } else {
    newUser.friends = [];
    newUser.enemies = [];
    newUser.photo = "";
    newUser.bio = "";
    newUser.password = await bcrypt.hash(newUser.password, 100);
    User.create(newUser);
    res.json(newUser);
  }
};

module.exports = { registerUser };
