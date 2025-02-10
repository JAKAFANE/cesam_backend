// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Recommendation = sequelize.define("Recommendation", {
//   id_rec: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   evalutionId: {
//     type: DataTypes.UUID,
//     references: {
//       model: 'evaluations', // Link to mission model
//       key: 'id_eval'
//     }
//   },
//   controlPointId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'controlPoint', // Link to mission model
//       key: 'id_cp'
//     }
//   },
//   recommendationText: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
// });

// module.exports = Recommendation;
