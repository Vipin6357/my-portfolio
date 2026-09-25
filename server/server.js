const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const educationRoutes = require("./routes/educationRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const messageRoutes = require("./routes/messageRoutes");



const app = express();

const PORT = process.env.PORT || 5000;



connectDB();



app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/messages", messageRoutes);




app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully.",
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});



app.use((error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message || "Something went wrong.",
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});