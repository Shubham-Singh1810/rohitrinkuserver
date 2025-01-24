const express = require("express");
const { sendResponse } = require("../utils/common");
require("dotenv").config();
const Booking = require("../model/booking.Schema");
const bookingController = express.Router();
const { isReadable } = require("stream");
const multer = require("multer");
const upload = multer();
const { addNotification } = require("../utils/addNotificationService");
const moment = require("moment");
const Kundali = require("../model/kundali.Schema");
bookingController.post("/store", upload.none(), async (req, res) => {
  try {
    const { location, fullName, contact, yourCity, noOfKundali, extraTime, bookingDate } = req.body;

    // Parse bookingDate if sent as a stringified array
    const parsedBookingDate = JSON.parse(bookingDate);

    // Create booking record in the database
    const booking = await Booking.create({
      location,
      fullName,
      contact,
      yourCity,
      noOfKundali,
      extraTime,
      bookingDate: parsedBookingDate,
    });
    addNotification({
      title: "You got a new appointment request",
      message: fullName + " from " + yourCity + " has booked a appointment",
      category: "appointment",
      subCategory: "appointment_request",
    });
    sendResponse(res, 200, "Success", {
      success: true,
      message: "Booking placed successfully",
      data: booking,
      statusCode: 200,
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});
bookingController.post("/list", async (req, res) => {
  try {
    const { status } = req.body;

    // Validate the status input
    const allowedStatuses = ["requested", "scheduled", "confirmed", "token_generated"];
    if (status && !allowedStatuses.includes(status)) {
      return sendResponse(res, 400, "Invalid Status", {
        success: false,
        message: "The provided status is not valid.",
      });
    }
    // Check if status is "confirmed" and filter by today's date
    if (status === "confirmed") {
      const currentDate = moment().format("YYYY-MM-DD"); // Get today's date in YYYY-MM-DD format
      let bookings = await Booking.find({
        // status: "confirmed",
        bookingDate: currentDate, // Match with today's date
      }).sort({ createdAt: -1 });
      // Fetch kundali details for each booking
      const bookingsWithKundali = await Promise.all(
        bookings.map(async (booking) => {
          const kundaliDetails = await Kundali.find({ bookingId: booking._id });
          return {
            ...booking.toObject(),
            kundaliDetails, // Add kundali details to the booking object
          };
        })
      );
      return sendResponse(res, 200, "Success", {
        success: true,
        message: "Booking list retrieved successfully",
        data: bookingsWithKundali,
      });
    }
    // Query based on status (or get all if no status is provided)
    const filter = status ? { status } : {};
    let bookings = await Booking.find(filter).sort({ createdAt: -1 });

    sendResponse(res, 200, "Success", {
      success: true,
      message: "Booking list retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", {
      success: false,
      message: error.message || "Internal server error",
    });
  }
});
bookingController.put("/update/:id", upload.none(), async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, req.body, { new: true });
    if (!updatedBooking) {
      return sendResponse(res, 404, "Failed", {
        success: false,
        message: "Booking not found",
        statusCode: 404,
      });
    }
    sendResponse(res, 200, "Success", {
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
      statusCode: 200,
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
      statusCode: 500,
    });
  }
});

module.exports = bookingController;
