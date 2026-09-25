const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, setupKey } = req.body;

    if (!setupKey || setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid setup key.",
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingAdmin = await Admin.findOne({
      email: normalizedEmail,
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createAdmin,
};