const { Sequelize } = require("sequelize");
// const Auditor = require("../models/auditor");
// const Mission = require("../models/missions")
// const MissionAssignment = require("../models/missionAssignment");

const sequelize = new Sequelize("cesam_test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: true, // Set to true if you want SQL queries to be logged
});

// Sync database (create tables if they don’t exist)
// sequelize.sync({ alter: true }) // Ensures tables are updated safely
//   .then(() => console.log("Database & tables synced"))
//   .catch(err => console.error("Error syncing database:", err));

module.exports = sequelize;
