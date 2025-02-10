const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evaluation = sequelize.define("Evaluation", {
  id_eval: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'questions', // Link to mission model
      key: 'id_qst',
    }
  },
  // controlPointId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  // auditorId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  answer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Evaluation;
