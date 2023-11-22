const express = require("express");
const router = express.Router();
const { getJobByKeyword } = require("../controller/jobs");

router.get("/searchJobByKeyword", async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const response = await getJobByKeyword(keyword);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

module.exports = router;
