const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const userSchema = mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "superAdmin"],
  },
  firstName: { type: String },
  lastName: { type: String },
  contact: { type: String },
  email: { type: String },
  password: { type: String },
  token: { type: String },
  
});

userSchema.plugin(timestamps);
module.exports = mongoose.model("User", userSchema);
