const express = require("express");
const { validate } = require("express-validation");
const { registerUser, loginUser } = require("../controllers/userController");
const {
  userLoginSchema,
  userRegisterSchema,
} = require("../schemas/userSchema");

const router = express.Router();

router.post("/register", validate(userRegisterSchema), registerUser);
router.post("/login", validate(userLoginSchema), loginUser);

module.exports = router;
