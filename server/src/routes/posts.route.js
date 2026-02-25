const express = require("express");
const isAuthenticatedUser = require("../middlewares/auth");
const createPosts = require("../controllers/posts.controller");
const multer = require("multer");

const postRoute = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
// ! Post API
postRoute.post("/", isAuthenticatedUser, upload.single("image"), createPosts);

module.exports = postRoute;
