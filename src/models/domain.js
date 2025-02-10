const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Domain = sequelize.define('Domain', {
    id_dom: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_dom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    branchId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'branches', // Link to Branch model
        key: 'id_br'
      }
    },
    score: { 
      type: DataTypes.FLOAT, 
      defaultValue: null 
    },  // Average score from sub-domains
    weight: { 
      type: DataTypes.FLOAT, 
      defaultValue: 1.0 
    },  // Relative importance in the branch
    criticality: { 
      type: DataTypes.STRING, 
      defaultValue: null 
    },  // Assigned based on score
    recommendations: { 
      type: DataTypes.TEXT, 
      defaultValue: null 
    },  // Aggregated recommendations
  });
  
  module.exports = Domain;
  