const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  const safeUser = {
    _id: user._id,
    username: user.username,
  };

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() +
          Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({
      success: true,
      user: safeUser,
      message,
    });
};

module.exports = sendToken;