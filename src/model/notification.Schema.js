const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const notificationSchema = mongoose.Schema({
  title: { type: String },
  message: { type: String },
  category:{type: String, default: "+91"},
  subCategory: { type: String },
  isRead: { type: Boolean, default:true }, 
});

notificationSchema.plugin(timestamps);
module.exports = mongoose.model("Notification", notificationSchema);