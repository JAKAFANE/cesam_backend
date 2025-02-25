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
  answer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},{
  indexes: [
    {
      unique: true,
      fields: ["subjectId", "questionId"]
    }
  ]
}
);

module.exports = Evaluation;
