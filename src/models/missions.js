const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const MissionAssignment = require("./missionAssignment");


const Mission = sequelize.define("Mission", {
  id_mis: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title_mis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description_mis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  statut_mis: {
    type: DataTypes.ENUM("planned","in progress", "pending","completed"),
    allowNull: false,
    defaultValue: "planned"
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  

}, {
  tableName:"missions",
  timestamps: true,
});






module.exports = Mission;
