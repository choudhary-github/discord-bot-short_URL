import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    createdBy: {
      authorUsername: {
        type: String,
        required: true,
      },
      authorId: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;
