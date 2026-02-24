const catchAsyncError = require("../middlewares/catchAsyncError");
const { ErrorHandler } = require("../middlewares/error");
const User = require("../models/user.model");
const sendToken = require("../utils/sendToken");

// ! Register Controller
const register = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Check existing user
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 409));
  }

  // Create user
  const newUser = await User.create({ username, password });

  // Send token
  sendToken(newUser, 201, "User Registered Successfully", res);
});

// ! Login Controller
const login = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Find user
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  // Compare password
  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  // Send token
  sendToken(user, 200, "User logged in successfully", res);
});

module.exports = { register, login };
