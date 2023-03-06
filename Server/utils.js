import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from './model/users.js'
import nodemailer from 'nodemailer'
dotenv.config()
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  )
}
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'No token' })
  }
}
export const isAdmin = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' })
      } else {
        try {
          const userID = decode._id
          const user = await UserModel.findById(userID).populate('role')
          if (user.role.name === 'Admin') {
            req.user = decode
            next()
          } else {
            res.status(403).send({ message: 'User do not have permission' })
          }
        } catch (err) {
          res.status(500).send({ message: err.message })
        }
      }
    })
  } else {
    res.status(401).send({ message: 'No token' })
  }
}
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export const levenshteinDistance = (str1, str2) => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null))
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      )
    }
  }
  return track[str2.length][str1.length]
}
export const slug = (title) => {
  return (
    title
      .toLowerCase()
      .split(/[ ]/)
      .filter((item) => item)
      .join('-') +
    '-' +
    Math.floor(Math.random() * 1000)
  )
}
