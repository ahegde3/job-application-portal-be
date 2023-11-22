const express = require("express");
const router = express.Router();

router.use("/candidate", require("./candidate"));
router.use("/company", require("./company"));
router.use("/jobs", require("./jobs"));

// Default Routers
router.get("/", function (req, res) {
  res.json({
    status: "Server responding",
    time: req.body.startTimeEpoch,
  });
});

module.exports = router;
