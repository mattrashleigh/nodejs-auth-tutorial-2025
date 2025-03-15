"use strict";

require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const imageRoutes = require("./routes/image-routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB();

// Middleware
app.use(express.json());
// Ensure the user is logged in with role user or admin

// Ensure the user has role admin for adminRoutes

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/home/", homeRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/image/", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
