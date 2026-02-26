const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialMediaUser",
      required: true,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
