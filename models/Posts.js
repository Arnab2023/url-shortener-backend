import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    dob: Date,
    gender: String,
    mobile: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model("post", PostSchema);
