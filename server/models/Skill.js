const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Programming Languages",
        "Frontend",
        "Backend",
        "Real-Time & Authentication",
        "Databases",
        "Developer Tools",
        "Core Concepts",
      ],
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    featured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);