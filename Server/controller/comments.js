import { CommentModel } from '../model/comments.js'
import { PostModel } from '../model/posts.js'
import { transporter } from '../utils.js'

let conditionID
export const getComment = async (req, res) => {
  try {
    const newcomment = req.body
    const comment = await CommentModel.find({ postID: newcomment._id })
      .populate('author')
      .populate('postID')
      .exec()
    conditionID = newcomment._id
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewCmtByMostLikes = async (req, res) => {
  const CDID = conditionID
  try {
    const comments = await CommentModel.find({ postID: CDID })
      .sort({ likeCount: -1 })
      .populate('author')
      .populate('postID')
      .lean()
    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewRecentlyCmt = async (req, res) => {
  try {
    const CDID = conditionID
    const comments = await CommentModel.find({ postID: CDID })
      .sort({ createdAt: -1 })
      .populate('author')
      .populate('postID')
      .lean()
    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const createComment = async (req, res) => {
  try {
    const newComment = req.body
    const post = await PostModel.findOne({ _id: req.body.postID })
      .populate('author')
      .exec()
    const addcomment = new CommentModel(newComment)
    await addcomment.save()
    const comment = await CommentModel.findOne({ postID: req.body.postID, _id: addcomment._id })
      .populate('author')
      .populate('postID')
      .exec()
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: `${post.author.email}`,
      subject: 'Someone has commented on your idea',
      text: 'Hello there, your idea received a new comment. Check it now',
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred: ' + error.message)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
    console.log(post)
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const deleteComment = async (req, res) => {
  try {
    const deleteComment = req.params.id
    const comment = await CommentModel.findByIdAndDelete(deleteComment, {
      new: true,
    })
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updateComment = async (req, res) => {
  try {
    const updateComment = req.body
    const comment = await CommentModel.findByIdAndUpdate(
      { _id: updateComment._id },
      updateComment,
      { new: true }
    )
    .populate('author')
    .populate('postID')
    res.status(200).json(comment)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
