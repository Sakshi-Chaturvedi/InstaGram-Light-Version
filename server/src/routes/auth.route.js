const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

// ! Register API
router.post("/register", register);

// ! Login API
router.post("/login", login);

module.exports = router;
