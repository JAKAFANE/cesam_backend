const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubDomain = sequelize.define('SubDomain', {
    id_sdom: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_sdom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domainId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'domains', // Link to Domain model
        key: 'id_dom'
      }
    },
    score: { 
      type: DataTypes.FLOAT, 
      defaultValue: null
    },  // Average score from control points
    weight: { 
      type: DataTypes.FLOAT, 
      defaultValue: 1.0 
    },  // Relative importance in the domain
    criticality: { 
      type: DataTypes.STRING, 
      defaultValue: null 
    },  // Assigned based on score
    recommendations: { 
      type: DataTypes.TEXT, 
      defaultValue: null 
    },  // Aggregated recommendations
  });
  
  module.exports = SubDomain;
  