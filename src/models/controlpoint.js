const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ControlPoint = sequelize.define('ControlPoint', {
    id_cp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_cp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subDomainId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'subdomains', // Link to SubDomain model
        key: 'id_sdom'
      }
    },
    poids_cp: {
      type: DataTypes.FLOAT,
      allowNull: false 
    },
    evaluationType: {
      type: DataTypes.ENUM('manuelle', 'automatique', 'hybride'),
      defaultValue: 'manuelle' // Will be filled based on evaluation
    },
    outilEvaluation: {
      type: DataTypes.STRING,
      allowNull: true // Will be filled based on evaluation
    },
  
  });
  
  module.exports = ControlPoint;
  