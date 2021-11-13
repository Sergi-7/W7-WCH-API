const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  const newUser = req.body;
  console.log(newUser);
  const user = await User.findOne({ username: newUser.username });
  console.log(user);
  if (user) {
    const error = new Error("Username already exists");
    error.code = 400;
    next(error);
  } else {
    console.log("hi");
    newUser.name = newUser.username;
    newUser.friends = [];
    newUser.enemies = [];
    newUser.photo = "";
    newUser.bio = "";
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await User.create(newUser);
    res.json(newUser);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("Username does not exist");
    error.code = 404;
    next(error);
  } else {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      const error = new Error("Incorrect password");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.JWT_SECRET
      );
      res.json({ token });
    }
  }
};

module.exports = { registerUser, loginUser };
