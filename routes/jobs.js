const express = require("express");
const router = express.Router();
const {
  getJobByKeyword,
  getJobOpeningDetails,
  getJobApplicationQuestions,
  applyForJobs,
  getListOfAppliedJobsByCandidates,
  getAppliedJobs,
  createNewJobOpening,
  getJobsByCompanyId,
  updateJobApplicationStatus,
} = require("../controller/jobs");

router.get("/searchJobByKeyword", async (req, res) => {
  const keyword = req.query.keyword;
  const candidateId = req.query.candidateId;  

  try {
    const response = await getJobByKeyword(keyword,candidateId);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.get("/getJobOpeningDetails", async (req, res) => {
  const jobId = req.query.jobId;

  try {
    const response = await getJobOpeningDetails(jobId);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.get("/getJobApplicationQuestions", async (req, res) => {
  const jobId = req.query.jobId;

  try {
    const response = await getJobApplicationQuestions(jobId);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.post("/applyForJobs", async (req, res) => {
  const candidateId = req.body.candidateId;
  const jobId = req.body.jobId;
  const answers = req.body.answers;

  try {
    const response = await applyForJobs(candidateId, jobId, answers);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.get("/getJobAppliedCandidates", async (req, res) => {
  const jobId = req.query.jobId;

  try {
    const response = await getListOfAppliedJobsByCandidates(jobId);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.post("/createNewJobOpening", async (req, res) => {
  const companyId = req.body.companyId;
  const jobData = req.body.jobData;

  try {
    const response = await createNewJobOpening(companyId, jobData);
    res.send(response); // Sending the response back on success
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.get("/getAppliedJobsForCandidate", async (req, res) => {
  const candidateId = req.query.candidateId;

  try {
    const response = await getAppliedJobs(candidateId);
    res.send(response);
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.get("/getJobsForCompanyId", async (req, res) => {
  const companyId = req.query.companyId;

  try {
    const response = await getJobsByCompanyId(companyId);
    res.send(response);
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

router.post("/updateJobApplicationStatus", async (req, res) => {
  const jobId = req.body.jobId;
  const candidateId = req.body.candidateId;
  const status = req.body.status;

  try {
    const response = await updateJobApplicationStatus(
      jobId,
      candidateId,
      status
    );
    res.send(response);
  } catch (error) {
    res.status(404).json({ error: error.message }); // Sending error message in JSON format
  }
});

module.exports = router;
