const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EvaluationControlPoint = sequelize.define("EvaluationControlPoint", {
    id_ecp: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    missionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'missions', 
            key: 'id_mis',
          }
    },
    controlPointId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'controlpoints', 
            key: 'id_cp',
          }
    },
    score_cp: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    criticality_cp: {
        type: DataTypes.STRING,
        allowNull: true // Will be filled based on evaluation
    },
    
}, {
    indexes: [
        {
            unique: true,
            fields: ["missionId", "controlPointId", ]
        }
    ]
}
);

module.exports = EvaluationControlPoint;
