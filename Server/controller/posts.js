import { PostModel } from '../model/posts.js'
import { transporter } from '../utils.js'
import nodemailer from 'nodemailer'
export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
    // console.log("posts", posts);
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const createPosts = async (req, res) => {
  try {
    const newPost = req.body
    const post = new PostModel(newPost)
    console.log(post)
    await post.save()
    // send email
    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'lyhungphat25@gmail.com',
      subject: 'New idea posted',
      text: 'Hello there, one idea of user has been sent',
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred: ' + error.message)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const updatePosts = async (req, res) => {
  try {
    const updatePosts = req.body
    const post = await PostModel.findOneAndUpdate(
      { _id: updatePosts._id },
      updatePosts,
      { new: true }
    )
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
