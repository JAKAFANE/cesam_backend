// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Report = sequelize.define("Report", {
//     id_report: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     missionId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Missions",
//         key: "id_mis",
//       },
//     },
//     content: {
//       type: DataTypes.TEXT, // Store the report in a structured format (e.g., JSON or plain text)
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   });

//   module.exports = Report;