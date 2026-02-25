const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const route = require("./routes/auth.route");
const { errorMiddleware } = require("./middlewares/error");
const postRoute = require("./routes/posts.route");

const app = express();

//! Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorMiddleware);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api/auth", route);
app.use("/api/posts", postRoute);

module.exports = app;
