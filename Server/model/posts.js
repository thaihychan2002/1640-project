import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    attachment: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    isAnonymous: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)
export const PostModel = mongoose.model('Post', schema)
