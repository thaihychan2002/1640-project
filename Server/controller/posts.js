import { PostModel } from '../model/posts.js'
import { transporter, levenshteinDistance } from '../utils.js'
import joi from 'joi'
import { v2 as cloudinary } from 'cloudinary'
import { DepartmentModel } from '../model/departments.js'
import { UserModel } from '../model/users.js'
export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author').exec()
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
      isAnonymous: joi.boolean().required(),
      likeCount: joi.number().valid(0).allow(),
      view: joi.number().valid(0).allow(),
    })
    await postValidateSchema.validateAsync(req.body)
    const newPost = req.body
    const post = new PostModel(newPost)
    const fileStr = post.attachment
    if (fileStr) {
      const uploadedResponse = await cloudinary.uploader.upload(fileStr)
      post.attachment = uploadedResponse.url
    }
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
      updatePosts,
      { new: true }
    )
    console.log(post)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const deletePosts = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id)
    if (post) {
      if (post.author === req.body.author) {
        await post.remove()
        res.status(200).send({ message: 'Post Deleted' })
      }
    } else {
      res.status(404).send({ message: 'Cannot delete other post' })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const viewPostsByMostViews = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ view: -1 })
      .populate('author', 'fullName avatar _id role department')
      .lean()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewPostsByMostLikes = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ likeCount: -1 })
      .populate('author', 'fullName avatar _id role department')
      .lean()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewRecentlyPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate('author', 'fullName avatar _id role department')
      .lean()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const searchPostsByKeyword = async (req, res) => {
  try {
    // Post can search by title, content and author
    const keyword = req.params.keyword
    const regex = new RegExp(keyword, 'i')

    const authors = await UserModel.find({ fullName: { $regex: regex } })
    const authorNames = authors.map((author) => author.fullName)
    const authorIds = authors.map((author) => author._id)
    const allPosts = await PostModel.find({})
      .populate('author', 'fullName avatar _id role department')
      .lean()
    const posts = await PostModel.find({
      $or: [
        {
          title: { $regex: regex },
        },
        {
          content: { $regex: regex },
        },
        {
          author: { $in: authorIds },
        },
      ],
    })
      .populate('author', 'fullName avatar _id role department')
      .lean()
    const filteredAuthorPosts = allPosts.filter((post) => {
      const authorFullName = post.author.fullName
      const distance = levenshteinDistance(keyword, authorFullName)
      if (distance <= 5) {
        return true
      }
      // }
      // return false
    })
    const filteredTitlePosts = allPosts.filter((post) => {
      const title = post.title
      const distance = levenshteinDistance(keyword, title)
      if (distance <= 10) {
        return true
      }
    })
    const filteredContentPosts = allPosts.filter((post) => {
      const content = post.content
      const distance = levenshteinDistance(keyword, content)
      if (distance <= 10) {
        return true
      }
    })
    res.send([
      ...filteredAuthorPosts,
      ...filteredTitlePosts,
      ...filteredContentPosts,
      ...posts,
    ])
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const viewPostsByDepartment = async (req, res) => {
  try {
    const department = req.params.department
    const posts = await PostModel.find({ department })
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
