const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EvaluationDomain = sequelize.define("EvaluationDomain", {
    id_ed: {
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
    domainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'domains', 
            key: 'id_dom',
        }
    },
    score_dom: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    criticality_dom: {
        type: DataTypes.STRING,
        allowNull: true // Will be filled based on evaluation
    },
    
}, {
    indexes: [
        {
            unique: true,
            fields: ["missionId", "domainId", ]
        }
    ]
}
);

module.exports = EvaluationDomain;
