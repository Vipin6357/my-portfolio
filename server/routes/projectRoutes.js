const express = require("express");
const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

const uploadProjectImages = (
  req,
  res,
  next
) => {
  upload.array("images", 10)(
    req,
    res,
    (error) => {
      if (error) {
        console.error(
          "IMAGE UPLOAD ERROR:",
          error
        );

        return res.status(500).json({
          success: false,
          message:
            error.message ||
            "Image upload failed.",
        });
      }

      next();
    }
  );
};



router.get("/", getProjects);

router.get("/:id", getProject);



router.post(
  "/",
  protect,
  uploadProjectImages,
  createProject
);

router.put(
  "/:id",
  protect,
  uploadProjectImages,
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

module.exports = router;