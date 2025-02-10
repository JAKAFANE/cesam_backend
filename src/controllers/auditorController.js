const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Auditor } = require("../models");
 const { Mission } = require("../models");
// const { MissionAssignment } = require("../models");

const router = express.Router();

const generatePassword = () => {
    const words = ["VIP", "scammer", "Oppa", "Spasa", "chris", "banane", "malware", "Nova"];
    const specialChars = ["!", "@", "#", "$", "%", "&", "*"];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    
    return `${randomWord}${randomNum}${randomChar}`;
  };

// User Signup Endpoint
router.post("/add_auditor", async (req, res) => {
  try {
    const { matricule, fullname, email } = req.body;

    // Check if user already exists
    const existingAuditor = await Auditor.findOne({ where: { matricule: matricule } });
    if (existingAuditor) {
      return res.status(400).json({ message: "auditor already in use" });
    }

    // generer pass
    const pass = generatePassword();

    const hashedPass = await bcrypt.hash(pass, 10);

    // Create new user
    const newAuditor = await Auditor.create({
      matricule:matricule,
      fullname: fullname,
      email_aud: email,
      pass: hashedPass,
    });

    res.status(201).json({ message: "Auditor registered successfully", auditor: newAuditor ,pass });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//User sign in endpoint
router.post("/signin", async (req, res) =>{
    try{
        const {fullname, pass} = req.body;

        const auditor = await Auditor.findOne({ where: { fullname: fullname } });
        if (!auditor) {
            return res.status(404).json({ message: "Auditor not found" });
        }

        const isMatch = await bcrypt.compare(pass, auditor.pass);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid pass" });
        }

        res.status(200).json({ message: "Sign in successful"});
    } catch (error) {
        console.error("Sign in error:", error);
        res.status(500).json({ message: "Internal Server Error"})
    }
});


//List auditors
router.get("/listauditors", async (_req, res) => {
  try {
    // Fetch only users with the role of "auditor"
    const auditors = await Auditor.findAll({
      attributes: ["matricule","fullname", "email_aud"], // Only return relevant fields
    });

    res.status(200).json({ auditors });
  } catch (error) {
    console.error("Error fetching auditors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//User assign to mission
router.post("/assignment", async (req, res) =>{
  const {auditorId, missionId} = req.body;

  try {
    const auditor = await Auditor.findByPk(auditorId);
    if (!auditor) throw new Error("Auditor not found");

    const mission = await Mission.findByPk(missionId);
    if (!mission) throw new Error("Mission not found");

    auditor.missionId = missionId;
    await auditor.save();

    res.status(200).json( "Auditor assigned to mission successfully");
  } catch (error) {
    console.error("Error adding auditor to mission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
});

 
// router.post("/assignment", async (req, res) => {
//   try {
//     const { auditorPasses, missionId } = req.body; // Expecting an array of auditor IDs

//     if (!Array.isArray(auditorPasses) || auditorPasses.length === 0) {
//       return res.status(400).json({ message: "At least one auditor must be assigned" });
//     }

//     // Check if the mission exists
//     const mission = await Mission.findByPk(missionId);
//     if (!mission) {
//       return res.status(404).json({ message: "Mission not found" });
//     }

//     for (const auditorPass of auditorPasses) {
//       // Check if the auditor exists
//       const auditor = await Auditor.findByPk(auditorPass);
//       if (!auditor) {
//         return res.status(400).json({ message: `One or more auditors don't exist` });
//       }

//       // Check if the auditor is already assigned to another mission
//       const existingAssignment = await MissionAssignment.findOne({
//         where: { auditorPass:auditorPass }
//       });

//       if (existingAssignment) {
//         return res.status(400).json({
//           message: `One or more auditors is already assigned to a mission`
//         });
//       }

//       // Assign the auditor to the mission
//       await MissionAssignment.create({ auditorPass: auditorPass, missionId: missionId });
//     }

//     res.status(200).json({ message: "Auditors assigned successfully" });

//   } catch (error) {
//     console.error("Assignment error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


/** --- AUDITOR MANAGEMENT --- **/


  
  // Edit Auditor
  router.put("/:pass", async (req, res) => {
    try {
      const { pass } = req.params;
      const { matricule,fullname, email } = req.body;
  
      const auditor = await Auditor.findByPk(pass);
      if (!auditor) {
        return res.status(404).json({ error: "Auditor not found" });
      }
  
      await auditor.update({ matricule: matricule, fullname:fullname, email_aud: email });
      return res.status(200).json({ message: "Auditor updated successfully", auditor });
    } catch (error) {
      console.error("Error updating auditor:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Delete Auditor
  router.delete("/:pass", async (req, res) => {
    try {
      const { pass } = req.params;
  
      const auditor = await Auditor.findByPk(pass);
      if (!auditor) {
        return res.status(404).json({ error: "Auditor not found" });
      }
  
      await auditor.destroy();
      return res.status(200).json({ message: "Auditor deleted successfully" });
    } catch (error) {
      console.error("Error deleting auditor:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  


module.exports = router;