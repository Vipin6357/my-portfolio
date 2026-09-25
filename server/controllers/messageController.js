const Message = require("../models/Message");

const {
  sendContactEmail,
} = require("../services/emailService");




const createPublicMessage = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and message are required.",
      });
    }

    const cleanedName =
      String(name).trim();

    const cleanedEmail =
      String(email).trim().toLowerCase();

    const cleanedMessage =
      String(message).trim();

    if (
      !cleanedName ||
      !cleanedEmail ||
      !cleanedMessage
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required.",
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(cleanedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address.",
      });
    }

    
    const newMessage =
      await Message.create({
        name: cleanedName,
        email: cleanedEmail,
        message: cleanedMessage,
        status: "unread",
        emailSent: false,
      });

  
    try {
      await sendContactEmail({
        name: cleanedName,
        email: cleanedEmail,
        message: cleanedMessage,
      });

      newMessage.emailSent =
        true;

      await newMessage.save();
    } catch (emailError) {
      console.error(
        "Contact email error:",
        emailError
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully.",
      emailSent:
        newMessage.emailSent,
    });
  } catch (error) {
    console.error(
      "Create public message error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to send your message.",
    });
  }
};




const getMessages = async (
  req,
  res
) => {
  try {
    const messages =
      await Message.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error(
      "Get messages error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch messages.",
    });
  }
};




const getMessage = async (
  req,
  res
) => {
  try {
    const message =
      await Message.findById(
        req.params.id
      );

    if (!message) {
      return res.status(404).json({
        success: false,
        message:
          "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error(
      "Get message error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch message.",
    });
  }
};




const createAdminMessage = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      message,
      status,
    } = req.body;

    if (
      !name ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and message are required.",
      });
    }

    const newMessage =
      await Message.create({
        name: String(name).trim(),

        email: String(email)
          .trim()
          .toLowerCase(),

        message: String(message).trim(),

        status:
          status === "read"
            ? "read"
            : "unread",

        emailSent: false,
      });

    res.status(201).json({
      success: true,
      message:
        "Message added successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error(
      "Create admin message error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to add message.",
    });
  }
};




const updateMessage = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      message,
      status,
    } = req.body;

    if (
      !name ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and message are required.",
      });
    }

    const updatedMessage =
      await Message.findByIdAndUpdate(
        req.params.id,

        {
          name: String(name).trim(),

          email: String(email)
            .trim()
            .toLowerCase(),

          message:
            String(message).trim(),

          status:
            status === "read"
              ? "read"
              : "unread",
        },

        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message:
          "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Message updated successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error(
      "Update message error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update message.",
    });
  }
};




const toggleMessageStatus =
  async (req, res) => {
    try {
      const message =
        await Message.findById(
          req.params.id
        );

      if (!message) {
        return res.status(404).json({
          success: false,
          message:
            "Message not found.",
        });
      }

      message.status =
        message.status === "read"
          ? "unread"
          : "read";

      await message.save();

      res.status(200).json({
        success: true,
        message:
          "Message status updated.",
        data: message,
      });
    } catch (error) {
      console.error(
        "Toggle message status error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update message status.",
      });
    }
  };



const deleteMessage = async (
  req,
  res
) => {
  try {
    const message =
      await Message.findByIdAndDelete(
        req.params.id
      );

    if (!message) {
      return res.status(404).json({
        success: false,
        message:
          "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Message deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete message error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete message.",
    });
  }
};


module.exports = {
  createPublicMessage,
  getMessages,
  getMessage,
  createAdminMessage,
  updateMessage,
  toggleMessageStatus,
  deleteMessage,
};