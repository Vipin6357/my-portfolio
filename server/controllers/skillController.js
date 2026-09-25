const Skill = require("../models/Skill");

// GET ALL SKILLS
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .sort({
        category: 1,
        order: 1,
        createdAt: 1,
      })
      .lean();

    res.status(200).json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills.",
    });
  }
};

// GET SINGLE SKILL
const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    console.error("Get skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skill.",
    });
  }
};

// CREATE SKILL
const createSkill = async (req, res) => {
  try {
    const {
      name,
      category,
      icon,
      level,
      order,
      featured,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Skill name and category are required.",
      });
    }

    const skill = await Skill.create({
      name: name.trim(),
      category: category.trim(),
      icon: icon?.trim() || "",
      level: Math.min(
        100,
        Math.max(0, Number(level) || 80)
      ),
      order: Math.max(
        1,
        Number(order) || 1
      ),
      featured:
        featured === undefined
            ? true
            : featured === true ||
            featured === "true",
    });

    res.status(201).json({
      success: true,
      message: "Skill created successfully.",
      skill,
    });
  } catch (error) {
    console.error("Create skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create skill.",
    });
  }
};

// UPDATE SKILL
const updateSkill = async (req, res) => {
  try {
    const {
      name,
      category,
      icon,
      level,
      order,
      featured,
    } = req.body;

    const updateData = {
      name: name?.trim(),
      category: category?.trim(),
      icon: icon?.trim() || "",
      level: Math.min(
        100,
        Math.max(0, Number(level) || 80)
      ),
      order: Math.max(
        1,
        Number(order) || 1
      ),
      featured:
        featured === undefined
            ? true
            : featured === true ||
            featured === "true",
    };

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      skill,
    });
  } catch (error) {
    console.error("Update skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update skill.",
    });
  }
};

// DELETE SKILL
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(
      req.params.id
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete skill.",
    });
  }
};

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};