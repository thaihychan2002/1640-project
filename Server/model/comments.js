import mongoose from 'mongoose'
const Schema = mongoose.Schema
const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postID: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    likeCount: {
      type: Number,
      default: 0,
    },
    isAnonymous: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)
export const CommentModel = mongoose.model('Comment', schema)
