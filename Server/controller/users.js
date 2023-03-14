import { UserModel } from '../model/users.js'
import {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
} from '../utils.js'
import bcrypt from 'bcryptjs'
import {
  registerUserSchema,
  updateUserByAdminSchema,
  updateUserSchema,
} from '../helpers/validation_schema.js'
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .populate('role')
      .populate('department')
      .exec()
    console.log(users)
    res.send(users)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID)
      .populate('role')
      .populate('department')
      .exec()
    if (user) {
      res.send({
        _id: user._id,
        fullName: user.fullName,
        department: user.department,
        avatar: user.avatar,
        role: user.role.name,
      })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
export const refresh = async (req, res) => {
  if (req.cookies.refresh) {
    const refreshToken = req.cookies.refresh
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(406).json({ message: 'Unauthorized' })
      } else {
        const accessToken = generateAccessToken(decoded)
        console.log(accessToken)
        res.cookie('refresh', refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
          path: '/',
        })
        return res.json({ _id: decoded._id, token: accessToken })
      }
    })
  } else {
    return res.status(406).json({ message: 'Unauthorized' })
  }
}
export const loginUsers = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email })
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)
      res.cookie('refresh', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
        sameSite: false,
      })
      return res.status(200).json({
        _id: user._id,
        token: accessToken,
      })
    }
  }
  res.status(401).send({ message: 'Invalid email or password' })
}

export const loginGoogleUsers = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email })
  if (user) {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    })
    return res.status(200).json({
      _id: user._id,
      token: accessToken,
    })
  }
  res.status(401).send({ message: 'Cannot find your email!' })
}

export const registerUsers = async (req, res, next) => {
  try {
    await registerUserSchema.validateAsync(req.body)
    const newUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      role: req.body.roleUser,
      department: req.body.department,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    res.send({
      _id: user._id,
      token: generateToken(user),
    })
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` })
    }
    next(err)
  }
}
export const registerGoogleUsers = async (req, res) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatar: req.body.avatar,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    res.send({
      _id: user._id,
      token: generateToken(user),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
export const logout = async (req, res) => {
  res.cookie('refresh', '', {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: '/',
    sameSite: false,
  })
  res.status(200).json({ message: 'Logged out successfully' })
}
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate('role')
    if (user) {
      if (user.role.name === 'Admin') {
        return res.status(403).send({ message: 'Cannot delete admin' })
      }
      await user.remove()
      res.send({ message: 'User Deleted' })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
export const updateUser = async (req, res) => {
  try {
    await updateUserByAdminSchema.validateAsync(req.body)
    const updatedUser = req.body
    const user = await UserModel.findByIdAndUpdate(
      { _id: updatedUser.userID },
      {
        ...(updatedUser.departmentID && {
          department: updatedUser.departmentID,
        }),
        ...(updatedUser.roleID && { role: updatedUser.roleID }),
      },
      { new: true }
    )
    console.log(user)
    if (user) {
      res.send({ message: 'User updated' })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    await updateUserSchema.validateAsync(req.body)
    const user = await UserModel.findById(req.body.userID)
    if (user) {
      const fileStr = req.body.data || req.data
      if (fileStr) {
        const uploadedResponse = await cloudinary.uploader.upload(fileStr)
        user.avatar = uploadedResponse.url
      }
      user.fullName = req.body.fullName || user.fullName
      await user.save()
      res.status(200).send({ message: 'User updated' })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
