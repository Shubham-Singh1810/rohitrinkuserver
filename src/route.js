const express = require("express");
const router = express.Router();
const bookingController = require("./controller/bookingController");
const kundaliController = require("./controller/kundaliController");


router.use("/booking", bookingController);
router.use("/kundali", kundaliController);


module.exports = router;