const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Recommendation = sequelize.define("Recommendation", {
  id_rec: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  missionId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'missions',
        key: 'id_mis'
    }
  },
  controlPointId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'controlpoints', // Link to mission model
      key: 'id_cp'
    }
  },
  recommendationText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},{
  indexes: [
    {
      unique: true,
      fields: ["missionId", "controlPointId" ]
    }
  ]
});

module.exports = Recommendation;
