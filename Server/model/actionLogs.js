import mongoose from 'mongoose'
const Schema = mongoose.Schema
const schema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postID: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
)
export const ActionLogModel = mongoose.model('ActionLog', schema)