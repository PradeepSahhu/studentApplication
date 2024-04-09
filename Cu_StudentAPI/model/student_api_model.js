const mongoose = require("mongoose");

// Define the validateYear function
function validateYear(value) {
  // Regular expression to match a 4-digit year between 1000 and 9999
  return /^[1-9]\d{3}$/.test(value);
}

const studentSchema = new mongoose.Schema({
  UID: {
    type: String,
    required: [true, "It can't be Empty"],
  },
  Name: {
    type: String,
    required: true,
  },
  Batch: {
    type: String,
    required: false,
    default: "2022",
    validate: [validateYear, "Invalid year"],
  },
  ProgramCode: {
    type: String,
    default: "CS201",
    required: false,
  },
  Section: {
    type: String,
    required: true,
  },
  Group: {
    type: String,
    required: true,
    enum: {
      values: ["A", "B"],
      message: "Invalid Section",
    },
  },
});

module.exports = mongoose.model("Student", studentSchema);
