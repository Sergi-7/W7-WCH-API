const express = require("express");
const auth = require("../middlewares/auth");
const { getUsers } = require("../controllers/usersController");

const router = express.Router();

router.get("/users", auth, getUsers);

module.exports = router;
