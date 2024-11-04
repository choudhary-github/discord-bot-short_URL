import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  authorUsername: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model("Author", authorSchema);
export default Author;
