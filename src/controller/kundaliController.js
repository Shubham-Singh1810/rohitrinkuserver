const express = require("express");
const { sendResponse } = require("../utils/common");
require("dotenv").config();
const Kundali = require("../model/kundali.Schema");
const kundaliController = express.Router();
const { isReadable } = require("stream");
const multer = require("multer");
const Booking = require("../model/booking.Schema");
const upload = multer();

kundaliController.post("/store", upload.none(), async (req, res) => {
  try {
    const { bookingId, ...kundaliDetails } = req.body;

    // Fetch booking details and existing kundali records
    const bookingDetails = await Booking.findOne({_id: bookingId });
    if (!bookingDetails) {
      return sendResponse(res, 404, "Booking not found", {
        success: false,
        message: "No booking found with the provided bookingId.",
        statusCode:404
      });
    }

    const kundaliArr = await Kundali.find({ bookingId });

    // Check if the number of Kundali already matches
    if (parseInt(bookingDetails.noOfKundali) === kundaliArr.length) {
      return sendResponse(res, 403, "Kundali already added", {
        success: false,
        message: "All Kundalis have already been added for this booking.",
      });
    }

    // Create the Kundali
    const kundaliData = await Kundali.create({ bookingId, ...kundaliDetails });

    // If this was the last Kundali to be added, update the booking status
    if (parseInt(bookingDetails.noOfKundali) === kundaliArr.length + 1) {
      await Booking.findByIdAndUpdate(bookingDetails._id, { status: "kundaliAdded" }, { new: true });
    }

    return sendResponse(res, 200, "Kundali created successfully", {
      success: true,
      message: "Kundali created successfully.",
      data: kundaliData,
      statusCode:200
    });
  } catch (error) {
    return sendResponse(res, 500, "Failed", {
      success: false,
      message: error.message || "Internal server error.",
    });
  }
});



module.exports = kundaliController;
