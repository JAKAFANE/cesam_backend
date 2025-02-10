// const express = require("express");
// const { Report } = require("../models");


// const router = express.Router();

// /** --- REPORT MANAGEMENT --- **/
  
// router.get("/reports", async (req, res) => {
//     try {
//       const { missionId } = req.query;
  
//       const where = missionId ? { missionId: missionId } : {};
//       const reports = await Report.findAll({ where });
  
//       return res.status(200).json(reports);
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//   });
  



// module.exports = router;