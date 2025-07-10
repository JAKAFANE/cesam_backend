require('dotenv').config();


const express = require('express');
const { initDB } = require("./src/models")
const auditorRoutes = require("./src/controllers/auditorController");
const missionRoutes = require("./src/controllers/missionController");
const auditRoutes = require("./src/controllers/auditController");
const adminRoutes = require("./src/controllers/adminController");
// const reportRoutes = require("./src/controllers/reportController");


const app = express();
app.use(express.json());

// Import controllers (not shown in this example)
// app.use("/api/users", require("./controllers/userController"));
app.use("/api/auditor", auditorRoutes);

app.use("/api/mission", missionRoutes);

app.use("/api/audit", auditRoutes);

app.use("/api/admin", adminRoutes);

// app.use("/api/report", reportRoutes);

const PORT = process.env.PORT || 5000;

// Start the database and then launch the server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
