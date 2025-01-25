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
  bookingDate:[{type:String}],
  token:{type:String},
  status: {
    type: String,
    enum: ["requested", "scheduled", "kundaliAdded", "completed"], // Define the allowed values
    default: "requested", // Set a default value if needed
  },
  scheduledDate:{type:String},
  scheduledTime:{type:String},
  tokenNo:{type:Number},
});

bookingSchema.plugin(timestamps);
module.exports = mongoose.model("Booking", bookingSchema);