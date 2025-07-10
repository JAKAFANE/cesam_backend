const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ScanAutomatique = sequelize.define("ScanAutomatique", {
  id_sa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  controlPointId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'controlpoints',
        key: 'id_cp'
    }
  },
  outil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  results: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  score_sa: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  dateScan: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
    
  },
},{
  indexes: [
    {
      unique: true,
      fields: [ "controlPointId" ]
    }
  ]
});

module.exports = ScanAutomatique;
