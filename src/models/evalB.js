const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EvaluationBranch = sequelize.define("EvaluationBranch", {
    id_eb: {
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
    branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'branches', 
            key: 'id_br',
          }
    },
    score_br: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    criticality_br: {
        type: DataTypes.STRING,
        allowNull: true // Will be filled based on evaluation
    },
    
}, {
    indexes: [
        {
            unique: true,
            fields: ["missionId", "branchId", ]
        }
    ]
}
);

module.exports = EvaluationBranch;
