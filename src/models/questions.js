const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define('Question', {
    id_qst: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    questionText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    controlPointId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'controlpoints', // Link to ControlPoint model
        key: 'id_cp'
      }
    },
   
  });
  
  module.exports = Question;
  