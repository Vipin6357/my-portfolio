const About = require("../models/About");

const defaultAbout = {
  heading:
    "Building ideas into digital experiences.",

  role: "MERN Stack Developer",

  mainTitle:
    "I build modern, scalable and interactive web applications.",

  description:
    "I'm a Computer Science and Engineering student and a MERN Stack Developer focused on building responsive full-stack web applications. I enjoy turning ideas into clean, functional and engaging digital experiences using modern web technologies.",

  stats: [
    {
      value: "2+",
      label: "Full Stack Projects",
    },
    {
      value: "50+",
      label: "DSA Problems",
    },
    {
      value: "MERN",
      label: "Primary Stack",
    },
  ],
};


// GET ABOUT
const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    /*
      If About document does not exist,
      create it automatically using the
      current portfolio content.
    */
    if (!about) {
      about = await About.create(
        defaultAbout
      );
    }

    res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    console.error(
      "Get about error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch about information.",
    });
  }
};


// UPDATE ABOUT
const updateAbout = async (
  req,
  res
) => {
  try {
    const {
      heading,
      role,
      mainTitle,
      description,
      stats,
    } = req.body;

    /*
      ABOUT ME is intentionally NOT
      accepted from frontend.

      Image is also intentionally
      not accepted.
    */

    if (
      !heading ||
      !role ||
      !mainTitle ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Heading, role, main title and description are required.",
      });
    }

    if (
      !Array.isArray(stats) ||
      stats.length !== 3
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Exactly 3 stats are required.",
      });
    }

    const cleanedStats = stats.map(
      (stat) => ({
        value: String(
          stat.value || ""
        ).trim(),

        label: String(
          stat.label || ""
        ).trim(),
      })
    );

    const invalidStat =
      cleanedStats.some(
        (stat) =>
          !stat.value ||
          !stat.label
      );

    if (invalidStat) {
      return res.status(400).json({
        success: false,
        message:
          "Every stat must have a value and label.",
      });
    }

    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        heading: heading.trim(),
        role: role.trim(),
        mainTitle:
          mainTitle.trim(),
        description:
          description.trim(),
        stats: cleanedStats,
      });
    } else {
      about.heading =
        heading.trim();

      about.role =
        role.trim();

      about.mainTitle =
        mainTitle.trim();

      about.description =
        description.trim();

      about.stats =
        cleanedStats;

      await about.save();
    }

    res.status(200).json({
      success: true,
      message:
        "About section updated successfully.",
      about,
    });
  } catch (error) {
    console.error(
      "Update about error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update about section.",
    });
  }
};


module.exports = {
  getAbout,
  updateAbout,
};