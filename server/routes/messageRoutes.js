const express = require("express");

const {
  createPublicMessage,
  getMessages,
  getMessage,
  createAdminMessage,
  updateMessage,
  toggleMessageStatus,
  deleteMessage,
} = require("../controllers/messageController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();




router.post(
  "/",
  createPublicMessage
);




router.get(
  "/",
  protect,
  getMessages
);

router.get(
  "/:id",
  protect,
  getMessage
);

router.post(
  "/admin",
  protect,
  createAdminMessage
);

router.put(
  "/:id",
  protect,
  updateMessage
);

router.patch(
  "/:id/status",
  protect,
  toggleMessageStatus
);

router.delete(
  "/:id",
  protect,
  deleteMessage
);


module.exports = router;