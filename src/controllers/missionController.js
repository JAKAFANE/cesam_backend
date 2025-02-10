const express = require("express");
const Mission = require("../models/missions");
const Auditor = require("../models/auditor");
const MissionAssignment  = require("../models/missionAssignment");
const { Op } = require("sequelize");

const router = express.Router();

// Create a new mission
router.post("/addmission", async (req, res) => {
  try {
    
    const { title, description,start_date, end_date } = req.body;
    console.log("Request Body:", req.body);

    // Validate input
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Check if user already exists
    const existingMission = await Mission.findOne({ where: { title_mis: title } });
    if (existingMission) {
        return res.status(400).json({ message: "Misson already exists" });
    }

    // Create the mission
    const newMission = await Mission.create({
      title_mis: title,
      description_mis: description,
      startDate: start_date,
      endDate: end_date,
    });

    res.status(201).json({ message: "Mission created successfully", mission: newMission });
  } catch (error) {
    console.error("Mission creation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// /**
//  * @route POST /api/missions/assignment
//  * @desc Assign a team of auditors to a mission
//  */
// router.post("/assignment", async (req, res) => {
//   try {
//     const {  auditorIds, missionId } = req.body; // Expecting an array of auditor IDs

//     if (!Array.isArray(auditorIds) || auditorIds.length === 0) {
//       return res.status(400).json({ message: "At least one auditor must be assigned" });
//     }

//     // Check if the mission exists
//     const mission = await Mission.findByPk(missionId);
//     if (!mission) {
//       return res.status(404).json({ message: "Mission not found" });
//     }

//     const { start_date, end_date } = mission;
    

//     // Validate auditors
//     for (const auditor_id of auditorIds) {
//       // Check if the auditor exists
//       const auditor = await Auditor.findByPk(auditor_id);
//       if (!auditor) {
//         return res.status(400).json({ message: `Auditor with ID ${auditor_id} does not exist` });
//       }

//       // Check if the auditor is already assigned to overlapping missions
//       const overlappingAssignments = await MissionAssignment.findAll({
//         where: {
//           auditorId: auditor_id,
//         },
//         include: {
//           model: Mission,
//           as: "mission",
//           where: {
//             [Op.or]: [
//               { startDate: { [Op.between]: [start_date, end_date] } },
//               { endDate: { [Op.between]: [start_date, end_date] } },
//               {
//                 [Op.and]: [
//                   { startDate: { [Op.lte]: start_date } },
//                   { endDate: { [Op.gte]: end_date } },
//                 ],
//               },
//             ],
//           },
//         },
//         logging: console.log,
//       });

//       if (overlappingAssignments.length > 0) {
//         return res.status(400).json({
//           message: `Auditor with ID ${auditor_id} is already assigned to a mission during the same period`,
//         });
//       }
//     }

//     // Assign auditors to the mission
//     const assignments = auditorIds.map((auditorId) => ({
//       missionId: missionId,
//       auditorId: auditorId,
//     }));

//     await MissionAssignment.bulkCreate(assignments);

//     res.status(200).json({ message: "Auditors assigned successfully" });
//   } catch (error) {
//     console.error("Assignment error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

//listAllMissions
router.get("/listallmissions", async (_req, res) => {
  try {
    const missions = await Mission.findAll({
      include: {
        model: Auditor,
        as: "auditors",
        attributes: [ "matricule","fullname", "email_aud"],
        through: { attributes: [] }, // Exclude join table fields
      },
    });

    res.status(200).json({ missions });
  } catch (error) {
    console.error("Error fetching missions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

 /** --- MISSION MANAGEMENT --- **/
  
  // Edit Mission
  router.put("/:id_mis", async (req, res) => {
    try {
      const { id_mis } = req.params;
      const { title, description, start_date, end_date } = req.body;
  
      const mission = await Mission.findByPk(id_mis);
      if (!mission) {
        return res.status(404).json({ error: "Mission not found" });
      }
  
      await mission.update({ title_mis: title, description_mis: description, start_date: start_date, end_date: end_date });
      return res.status(200).json({ message: "Mission updated successfully", mission });
    } catch (error) {
      console.error("Error updating mission:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Delete Mission
  router.delete("/:id_mis", async (req, res) => {
    try {
      const { id_mis } = req.params;
  
      const mission = await Mission.findByPk(id_mis);
      if (!mission) {
        return res.status(404).json({ error: "Mission not found" });
      }
  
      await mission.destroy();
      return res.status(200).json({ message: "Mission deleted successfully" });
    } catch (error) {
      console.error("Error deleting mission:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
  

module.exports = router;
