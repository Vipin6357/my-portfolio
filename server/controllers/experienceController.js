const Experience = require("../models/Experience");

// GET ALL EXPERIENCE
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .sort({
        order: 1,
        createdAt: 1,
      })
      .lean();

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    console.error(
      "Get experiences error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch experiences.",
    });
  }
};

// GET SINGLE EXPERIENCE
const getExperience = async (req, res) => {
  try {
    const experience =
      await Experience.findById(
        req.params.id
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    console.error(
      "Get experience error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch experience.",
    });
  }
};

// CREATE EXPERIENCE
const createExperience = async (
  req,
  res
) => {
  try {
    const {
      company,
      role,
      duration,
      location,
      type,
      responsibilities,
      order,
    } = req.body;

    if (
      !company ||
      !role ||
      !duration ||
      !location ||
      !type
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Company, role, duration, location and type are required.",
      });
    }

    if (
      !Array.isArray(
        responsibilities
      ) ||
      responsibilities.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one responsibility is required.",
      });
    }

    const cleanedResponsibilities =
      responsibilities
        .map((item) =>
          String(item).trim()
        )
        .filter(Boolean);

    if (
      cleanedResponsibilities.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one valid responsibility is required.",
      });
    }

    const experience =
      await Experience.create({
        company: company.trim(),
        role: role.trim(),
        duration: duration.trim(),
        location: location.trim(),
        type: type.trim(),

        responsibilities:
          cleanedResponsibilities,

        order: Math.max(
          1,
          Number(order) || 1
        ),
      });

    res.status(201).json({
      success: true,
      message:
        "Experience created successfully.",
      experience,
    });
  } catch (error) {
    console.error(
      "Create experience error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create experience.",
    });
  }
};

// UPDATE EXPERIENCE
const updateExperience = async (
  req,
  res
) => {
  try {
    const {
      company,
      role,
      duration,
      location,
      type,
      responsibilities,
      order,
    } = req.body;

    if (
      !company ||
      !role ||
      !duration ||
      !location ||
      !type
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Company, role, duration, location and type are required.",
      });
    }

    if (
      !Array.isArray(
        responsibilities
      ) ||
      responsibilities.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one responsibility is required.",
      });
    }

    const cleanedResponsibilities =
      responsibilities
        .map((item) =>
          String(item).trim()
        )
        .filter(Boolean);

    if (
      cleanedResponsibilities.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "At least one valid responsibility is required.",
      });
    }

    const updateData = {
      company: company.trim(),
      role: role.trim(),
      duration: duration.trim(),
      location: location.trim(),
      type: type.trim(),

      responsibilities:
        cleanedResponsibilities,

      order: Math.max(
        1,
        Number(order) || 1
      ),
    };

    const experience =
      await Experience.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Experience updated successfully.",
      experience,
    });
  } catch (error) {
    console.error(
      "Update experience error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update experience.",
    });
  }
};

// DELETE EXPERIENCE
const deleteExperience = async (
  req,
  res
) => {
  try {
    const experience =
      await Experience.findByIdAndDelete(
        req.params.id
      );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Experience deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete experience error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete experience.",
    });
  }
};

module.exports = {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};