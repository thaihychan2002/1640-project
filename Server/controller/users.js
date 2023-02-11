import { UserModel } from "../model/users.js";
import { generateToken } from "../utils.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
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
        role: user.role,
        token: generateToken(user),
      });
      return;
    }
  }
};

export const registerUsers = async (req, res) => {
  try {
    // const result = await userSchema.validateAsync(req.body);
    // console.log(result);
    const newUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      password: bcrypt.hashSync(req.body.password),
    });
    console.log(newUser);
    const user = await newUser.save();
    res.send({
      _id: user._id,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
