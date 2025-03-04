const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
//const MissionAssignment = require("./missionAssignment");


const Auditor = sequelize.define("Auditor", {
  id_aud: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  matricule: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_aud: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  tableName:"auditors",
  timestamps: true, // Adds createdAt and updatedAt columns
});



module.exports = Auditor;