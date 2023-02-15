import { UserModel } from "../model/users.js";
import { generateToken } from "../utils.js";
import bcrypt from "bcryptjs";
import { registerUserSchema } from "../helpers/validation_schema.js";
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    // const today = moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a");
    // const expDate = moment(new Date(req.user.exp * 1000)).format(
    //   "dddd, MMMM Do YYYY, h:mm:ss a"
    // );
    // console.log(today);
    // console.log(expDate);
    // console.log(today < expDate);
    res.send(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.send({
        fullName: user.fullName,
        department: user.department,
        avatar: user.avatar,
        role: user.role,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const loginUsers = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        fullName: user.fullName,
        department: user.department,
        avatar: user.avatar,
        role: user.role,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
};

export const loginGoogleUsers = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    user.fullName = req.body.fullName;
    user.avatar = req.body.avatar;
    await user.save();
    res.send({
      _id: user._id,
      // fullName: user.fullName,
      // department: user.department,
      // avatar: user.avatar,
      // role: user.role,
      token: generateToken(user),
    });
    return;
  }
  res
    .status(401)
    .send({ message: "Cannot find your email! Please sign up a new one" });
};

export const registerUsers = async (req, res, next) => {
  try {
    await registerUserSchema.validateAsync(req.body);
    // console.log(result);
    const newUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      fullName: user.fullName,
      department: user.department,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    if (err.isJoi === true) {
      res.status(422).send({ message: `${err.details[0].message}` });
    }
    next(err);
  }
};
export const registerGoogleUsers = async (req, res) => {
  try {
    // const result = await userSchema.validateAsync(req.body);
    // console.log(result);
    const newUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatar: req.body.avatar,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      fullName: user.fullName,
      department: user.department,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      if (user.role === "Admin") {
        res.send({ message: "Can not delete admin" });
        return;
      }
      await user.remove();
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    console.log(user);
    if (user) {
      user.department = req.body.department || user.department;
      await user.save();
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
