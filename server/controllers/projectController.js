const Project = require("../models/Project");

const cloudinary = require("../config/cloudinary");


// ==============================
// Upload image to Cloudinary
// ==============================
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/projects",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};


// ==============================
// GET ALL PROJECTS
// ==============================
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({
        order: 1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects.",
    });
  }
};


// ==============================
// GET SINGLE PROJECT
// ==============================
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project.",
    });
  }
};


// ==============================
// CREATE PROJECT
// ==============================
const createProject = async (req, res) => {
  try {
    console.log("CREATE PROJECT BODY:", req.body);
    console.log("CREATE PROJECT FILES:", req.files?.length || 0);

    const {
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      featured,
      order,
    } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    // ------------------------------
    // Technologies
    // ------------------------------
    let projectTechnologies = [];

    if (Array.isArray(technologies)) {
      projectTechnologies = technologies
        .map((technology) => technology.trim())
        .filter(Boolean);
    } else if (technologies) {
      projectTechnologies = [technologies.trim()];
    }

    // ------------------------------
    // Upload images
    // ------------------------------
    let imageUrls = [];

    if (req.files?.length) {
      imageUrls = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file))
      );
    }

    // ------------------------------
    // Create project
    // ------------------------------
    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      technologies: projectTechnologies,
      images: imageUrls,
      githubUrl: githubUrl?.trim() || "",
      liveUrl: liveUrl?.trim() || "",
      featured:
        featured === true ||
        featured === "true",
      order: Math.max(
        1,
        Number(order) || 1
      ),
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project,
    });

  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create project.",
      error: process.env.NODE_ENV === "development"
        ? error.stack
        : undefined,
    });
  }
};
// ==============================
// UPDATE PROJECT
// ==============================
const updateProject = async (req, res) => {
  try {
    const project =
      await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }


    // ==============================
    // Update basic information
    // ==============================
    if (req.body.title !== undefined) {
      project.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      project.description =
        req.body.description;
    }

    if (req.body.githubUrl !== undefined) {
      project.githubUrl =
        req.body.githubUrl;
    }

    if (req.body.liveUrl !== undefined) {
      project.liveUrl =
        req.body.liveUrl;
    }

    if (req.body.featured !== undefined) {
      project.featured =
        req.body.featured === true ||
        req.body.featured === "true";
    }

    if (req.body.order !== undefined) {
      project.order = Math.max(
        1,
        Number(req.body.order) || 1
      );
    }


    // ==============================
    // Update technologies
    // ==============================
    if (req.body.technologies !== undefined) {
      if (Array.isArray(req.body.technologies)) {
        project.technologies =
          req.body.technologies;
      } else {
        project.technologies = [
          req.body.technologies,
        ];
      }
    }


    // ==============================
    // Upload new images
    // ==============================
    if (req.files && req.files.length > 0) {
      const newImageUrls =
        await Promise.all(
          req.files.map((file) =>
            uploadToCloudinary(file)
          )
        );

      project.images = [
        ...(project.images || []),
        ...newImageUrls,
      ];
    }


    await project.save();


    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project,
    });

  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update project.",
    });
  }
};


// ==============================
// DELETE PROJECT
// ==============================
const deleteProject = async (req, res) => {
  try {
    const project =
      await Project.findByIdAndDelete(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });

  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project.",
    });
  }
};


module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};