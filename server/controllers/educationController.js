const Education = require("../models/Education");


const getEducations = async (req, res) => {
  try {
    const educations = await Education.find()
      .sort({
        order: 1,
        createdAt: 1,
      })
      .lean();

    res.status(200).json({
      success: true,
      count: educations.length,
      educations,
    });
  } catch (error) {
    console.error(
      "Get education error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch education.",
    });
  }
};


const getEducation = async (req, res) => {
  try {
    const education =
      await Education.findById(
        req.params.id
      );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    console.error(
      "Get education error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch education.",
    });
  }
};

const createEducation = async (
  req,
  res
) => {
  try {
    const {
      duration,
      status,
      degree,
      field,
      institute,
      description,
      order,
    } = req.body;

    if (
      !duration ||
      !status ||
      !degree ||
      !field ||
      !institute ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All education fields are required.",
      });
    }

    const education =
      await Education.create({
        duration: duration.trim(),
        status: status.trim(),
        degree: degree.trim(),
        field: field.trim(),
        institute: institute.trim(),
        description: description.trim(),

        order: Math.max(
          1,
          Number(order) || 1
        ),
      });

    res.status(201).json({
      success: true,
      message:
        "Education created successfully.",
      education,
    });
  } catch (error) {
    console.error(
      "Create education error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create education.",
    });
  }
};


const updateEducation = async (
  req,
  res
) => {
  try {
    const {
      duration,
      status,
      degree,
      field,
      institute,
      description,
      order,
    } = req.body;

    const updateData = {
      duration: duration?.trim(),
      status: status?.trim(),
      degree: degree?.trim(),
      field: field?.trim(),
      institute: institute?.trim(),
      description: description?.trim(),

      order: Math.max(
        1,
        Number(order) || 1
      ),
    };

    const education =
      await Education.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Education updated successfully.",
      education,
    });
  } catch (error) {
    console.error(
      "Update education error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update education.",
    });
  }
};


const deleteEducation = async (
  req,
  res
) => {
  try {
    const education =
      await Education.findByIdAndDelete(
        req.params.id
      );

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Education deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete education error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete education.",
    });
  }
};

module.exports = {
  getEducations,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};