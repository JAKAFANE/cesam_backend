const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EvaluationAnswer = sequelize.define("EvaluationAnswer", {
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
      model: 'questions', 
      key: 'id_qst',
    }
  },
  missionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'missions', 
      key: 'id_mis',
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
      fields: ["subjectId", "questionId", "missionId"]
    }
  ]
}
);

module.exports = EvaluationAnswer;
