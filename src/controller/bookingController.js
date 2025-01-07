const express = require("express");
const { sendResponse } = require("../utils/common");
require("dotenv").config();
const Booking = require("../model/booking.Schema");
const bookingController = express.Router();
const { isReadable } = require("stream");

bookingController.post("/store", async (req, res) => {
  try {
    let booking = await Booking.create(req.body);
    sendResponse(res, 200, "Success", {
      success: true,
      message: "Booking placed successfully",
      data: booking,
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});
bookingController.post("/list", async (req, res) => {
  try {
    let booking = await Booking.find({}).sort({ createdAt: -1 });
    sendResponse(res, 200, "Success", {
      success: true,
      message: "Booking list retrived successfully",
      data: booking,
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});

module.exports = bookingController;
