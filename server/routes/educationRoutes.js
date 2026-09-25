const express = require("express");

const {
  getEducations,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC
router.get("/", getEducations);

router.get("/:id", getEducation);

// PROTECTED
router.post(
  "/",
  protect,
  createEducation
);

router.put(
  "/:id",
  protect,
  updateEducation
);

router.delete(
  "/:id",
  protect,
  deleteEducation
);

module.exports = router;