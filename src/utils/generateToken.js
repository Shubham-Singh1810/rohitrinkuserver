const Booking = require("../model/booking.Schema");
const generateToken = async (bookingDetails) => {
  let Bookings = await Booking.find({scheduledDate: bookingDetails?.scheduledDate,}).sort({ tokenNo: -1 });
  const last_generatedToken = Bookings[0].tokenNo ? Bookings[0].tokenNo : 0;
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingDetails._id,
    { tokenNo: last_generatedToken + 1 },
    { new: true }
  );
};

module.exports = { generateToken };
