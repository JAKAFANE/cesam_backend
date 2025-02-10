const express = require("express");
const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const { Administrator, Mission, MissionAssignment, Auditor,Report } = require("../models");

const router = express.Router();

// Secret key for JWT
// const SECRET_KEY = "your_secret_key";

/**
 * @route POST /api/admin/register
 * @desc Register the administrator
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

     // Check if user already exists
     const existingAdministrator = await Administrator.findOne({ where: { email_ad: email } });
     if (existingAdministrator) {
       return res.status(400).json({ message: "admin already in use" });
     }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create administrator user
    const admin = await Administrator.create({
      username: username,
      email_ad: email,
      password: hashedPassword,
      
    });

    return res.status(201).json({
      message: "Administrator registered successfully",
      admin,
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route POST /api/admin/login
 * @desc Authenticate the administrator
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    const admin = await Administrator.findOne({ where: { username: username } });
    if (!admin) {
      return res.status(404).json({ error: "Administrator not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // // Generate JWT
    // const token = jwt.sign({ id_admin: admin.id_admin }, SECRET_KEY, {
    //   expiresIn: "24h",
    // });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});






 
 

module.exports = router;
