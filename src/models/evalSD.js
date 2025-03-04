const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EvaluationSubdomain = sequelize.define("EvaluationSubDomain", {
    id_esd: {
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
    subdomainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subdomains', 
            key: 'id_sdom',
        }
    },
    score_sd: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    criticality_sd: {
        type: DataTypes.STRING,
        allowNull: true // Will be filled based on evaluation
    },
    
}, {
    indexes: [
        {
            unique: true,
            fields: ["missionId", "subdomainId" ]
        }
    ]
}
);

module.exports = EvaluationSubdomain;
