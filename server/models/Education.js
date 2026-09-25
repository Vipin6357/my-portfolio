const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    duration: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    field: {
      type: String,
      required: true,
      trim: true,
    },

    institute: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      min: 1,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Education",
  educationSchema
);