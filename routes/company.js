const express = require("express");
const router = express.Router();
const { loginCompany, registerCompany } = require("../controller/company");

router.get("/", (req, res) => {
  console.log("inside");
});

router.post("/loginCompany", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const response = await loginCompany(email, password);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.post("/registerCompany", async (req, res) => {
  const companyInformation = req.body.userData;

  try {
    const response = await registerCompany(companyInformation);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

module.exports = router;
