// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");


// const MissionAssignment = sequelize.define("MissionAssignment", {
//   id_ma: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   auditorId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'auditors',
//       key: "id_aud",
//     },
//     allowNull: false,
//   },
//   missionId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'missions',
//       key: "id_mis",
//     },
//     allowNull: false,
//   },
// }, {
//   tableName: "missionassignments",
//   timestamps: true,
// });





// module.exports = MissionAssignment;
