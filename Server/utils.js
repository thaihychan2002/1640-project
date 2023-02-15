import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "./model/users.js";

dotenv.config();
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};
export const isAdmin = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        try {
          const userID = decode._id;
          const user = await UserModel.findById(userID);
          if (user.role === "Admin") {
            req.user = decode;
            next();
          } else {
            res.status(403).send({ message: "User do not have permission" });
          }
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};
