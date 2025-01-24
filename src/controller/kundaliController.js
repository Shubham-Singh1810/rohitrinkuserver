const express = require("express");
const { sendResponse } = require("../utils/common");
require("dotenv").config();
const Kundali = require("../model/kundali.Schema");
const kundaliController = express.Router();
const { isReadable } = require("stream");
const multer = require("multer");
const upload = multer();

kundaliController.post("/store", upload.none(), async (req, res) => {
  try {
    const kundaliData = await Kundali.create(req.body)
    sendResponse(res, 200, "Success", {
      success: true,
      message: "Kundali created successfully",
      data: kundaliData,
      statusCode: 200,
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});


module.exports = kundaliController;
