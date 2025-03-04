const sequelize = require("../config/database");
const Auditor = require("./auditor");
const Administrator = require("./administrator");
const Mission = require("./missions");
//const MissionAssignment = require("./missionAssignment")
const Branch = require("./branch");;
const Domain = require("./domain");
const SubDomain = require("./subdomain");
const ControlPoint = require("./controlpoint");
const Question = require("./questions");
const EvaluationAnswer = require("./evaluationAnswers");
const EvaluationControlPoint = require("./evalCp");
const EvaluationSubdomain = require("./evalSD");
const EvaluationDomain = require("./evalD");
const EvaluationBranch = require("./evalB");

// const Recommendation = require("./recommandation");
// const Report = require("./report");



const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected");

        await sequelize.sync({alter: true});

        console.log("Tables synchronized");

    } catch (error) {
        console.error("database connection failed", error);
    }
};

// One mission has many auditors
Mission.hasMany(Auditor, {
    foreignKey: "missionId",
    as: "auditors", // Alias for easier querying
    onDelete: "SET NULL", // Handle cascading behavior
    onUpdate: "CASCADE",
  });
  
  // An auditor belongs to one mission
  Auditor.belongsTo(Mission, {
    foreignKey: "missionId",
    as: "mission",
  });

module.exports = {
    initDB, 
    Auditor,
    Administrator, 
    Mission, 
   // MissionAssignment, 
    Branch, 
    Domain,
    SubDomain, 
    ControlPoint, 
    Question,
    EvaluationAnswer,
    EvaluationControlPoint,
    EvaluationSubdomain,
    EvaluationDomain,
    EvaluationBranch,
    // Recommendation,
    // Report,
    
};
