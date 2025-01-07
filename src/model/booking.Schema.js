const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const bookingSchema = mongoose.Schema({
  location: { type: String },
  fullName: { type: String },
  countryCode:{type: String, default: "+91"},
  contact: { type: String },
  yourCity: { type: String },
  noOfKundali: { type: Number },
  extraTime:{type:String},
  bookingDate:{type:String},
  token:{type:String}
});

bookingSchema.plugin(timestamps);
module.exports = mongoose.model("Booking", bookingSchema);