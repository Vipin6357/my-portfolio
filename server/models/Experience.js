const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    responsibilities: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length > 0
          );
        },
        message:
          "At least one responsibility is required.",
      },
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
  "Experience",
  experienceSchema
);