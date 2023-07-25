import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const getUsers = async (req, res) => {
  try {
    const userData = await userModel.find();
    if (userData) {
      return res.status(200).json({
        data: userData,
        msg: "Success!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({
        msg: "User Already Exists!",
      });
    }

    const userData = new userModel({
      email: email,
      password: hashedPassword,
      role: role,
    });
    userData.save();
    if (userData) {
      return res.status(201).json({
        data: userData,
        msg: "Success!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const { email, password, username, role } = req.body;
    const userData = await userModel.findOne({ _id: userID });
    let hashedPassword = userData.password;
    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10);
    }
    const updatedData = await userModel.updateOne(
      { _id: userID },
      {
        $set: {
          email: email,
          password: hashedPassword,
          username: username,
          role: role,
        },
      }
    );
    if (updatedData.acknowledged) {
      return res.status(200).json({
        data: updatedData,
        msg: "Updated!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const removeData = await userModel.deleteOne({ _id: userID });
    if (removeData.acknowledged) {
      return res.status(200).json({
        msg: "User Deleted!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password  } = req.body;
    const existUser = await userModel.findOne({ email: email });
    if (!existUser) {
      return res.status(400).json({
        msg: "User Not Found!",
      });
    }

    const passwordCompare = bcrypt.compare(password, existUser.password);
    if (!passwordCompare) {
      return res.status(400).json({
        msg: "Password is incorrect!",
      });
    }
    const token = jwt.sign(
      {
        id: existUser._id,
        email: existUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      data: existUser,
      token: token,
      msg: "Login Successfull!",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};
