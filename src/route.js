const express = require("express");
const router = express.Router();
const bookingController = require("./controller/bookingController");
const kundaliController = require("./controller/kundaliController");
const userController = require("./controller/userController");


router.use("/booking", bookingController);
router.use("/kundali", kundaliController);
router.use("/user", userController);


module.exports = router;