import { PostModel } from '../model/posts.js'
import { transporter } from '../utils.js'
import joi from 'joi'
import { DepartmentModel } from '../model/departments.js'
export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const createPosts = async (req, res, next) => {
  try {
    const result = await DepartmentModel.distinct('name')
    const postValidateSchema = joi.object({
      title: joi.string().required(),
      content: joi.string().required(),
      author: joi.string().required(),
      department: joi
        .string()
        .valid(...result)
        .required(),
      categories: joi.allow(),
      attachment: joi.allow(),
      // categories: joi.string(),
      // likeCount: joi.string(),
    })
    await postValidateSchema.validateAsync(req.body)
    const newPost = req.body
    const post = new PostModel(newPost)
    // console.log(post)
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
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
export const updatePosts = async (req, res) => {
  try {
    const updatePosts = req.body
    const post = await PostModel.findByIdAndUpdate(
      { _id: updatePosts._id },
      { updatePosts },
      { new: true }
    )
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const deletePosts = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id)
    console.log(post)
    if (post) {
      // if (post.author === req.body.author) {
      await post.remove()
      res.send({ message: 'Post Deleted' })
      // }
    } else {
      res.status(404).send({ message: 'Cannot delete other post' })
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
