const express = require("express");
const { sendResponse } = require("../utils/common");
require("dotenv").config();
const User = require("../model/user.Schema");
const userController = express.Router();
const { isReadable } = require("stream");
const multer = require("multer");
const jwt = require("jsonwebtoken");

userController.post("/create-admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return sendResponse(res, 422, "Failed", {
        message: "Admin already exists",
        data: user,
        statusCode: 422,
      });
    }
    let admin = await User.create(req.body);
    return sendResponse(res, 200, "Failed", {
      message: "Admin created successfully",
      data: admin,
      statusCode: 200,
    });
  } catch (error) {
    return sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error.",
      statusCode: 500,
    });
  }
});
userController.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    let user = await User.findOne({ email: email, password: password });
    console.log(user)
    if (user) {
      // Generate JWT token for the new user
      const token = jwt.sign({ userId: user._id, phoneNumber: user.phoneNumber }, process.env.JWT_KEY);
      // Store the token in the user object or return it in the response
      user.token = token;
      user = await User.findByIdAndUpdate(user.id, { token }, { new: true });
      return sendResponse(res, 200, "Success", {
        message: "Admin logged in successfully",
        data: user,
        statusCode: 200,
      });
    } else {
      return sendResponse(res, 400, "Success", {
        message: "Invalid Credintials",
        statusCode: 400,
      });
    }
  } catch (error) {
    return sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error.",
      statusCode: 500,
    });
  }
});

module.exports = userController;
