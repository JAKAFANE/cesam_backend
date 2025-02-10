const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Branch = sequelize.define('Branch', {
  id_br: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_br: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description_br: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // missionId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'missions', // Link to mission model
  //     key: 'id_mis'
  //   }
  // },
  // score: { 
  //   type: DataTypes.FLOAT, 
  //   defaultValue: null 
  // },  // Average score from domains
  // criticality: { 
  //   type: DataTypes.STRING, 
  //   defaultValue: null 
  // },  // Assigned based on score
  // recommendations: { 
  //   type: DataTypes.TEXT, 
  //   defaultValue: null 
  // },  // Aggregated recommendations
});

module.exports = Branch;
