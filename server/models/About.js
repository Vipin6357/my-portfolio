const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    mainTitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    stats: {
      type: [
        {
          value: {
            type: String,
            required: true,
            trim: true,
          },

          label: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "About",
  aboutSchema
);