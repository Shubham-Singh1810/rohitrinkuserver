const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const kundaliSchema = mongoose.Schema({
  name: { type: String },
  dob: { type: String },
  birthTime:{type: String,},
  birthLocation: { type: String },
  bookingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Booking", // Refers to the Booking model
    required: true 
  },
});

kundaliSchema.plugin(timestamps);
module.exports = mongoose.model("Kundali", kundaliSchema);