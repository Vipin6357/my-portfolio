const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    technologies: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    githubUrl: {
      type: String,
      default: "",
      trim: true,
    },

    liveUrl: {
      type: String,
      default: "",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Project",
  projectSchema
);