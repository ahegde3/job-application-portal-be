const {
  findJobsByKeyword,
  findJobOpeningDetails,
  findJobApplicationQuestion,
  insertJobApplication,
  insertIntoApplicationQuestionJobIdMapping,
  findAppliedJobs,
  insertJobOpening,
  insertIntoApplicationQuestions,
  findJobsByCompanyId
} = require("../model/jobs");

const getJobByKeyword = (keyword) => {
  if (!keyword) throw new Error("Empty keyword");

  return findJobsByKeyword(keyword);
};

const getJobOpeningDetails = (jobId) => {
  console.log("getJonb", jobId);
  if (!jobId) throw new Error("");

  return findJobOpeningDetails(jobId);
};

const getJobApplicationQuestions = (jobId) => {
  console.log("getJonb", jobId);
  if (!jobId) throw new Error("");

  return findJobApplicationQuestion(jobId);
};

const applyForJobs = async (candidateId, jobId, answers) => {
  console.log(candidateId, jobId, answers);
  return insertJobApplication(candidateId, jobId).then((applicationId) =>
    insertIntoApplicationQuestionJobIdMapping(applicationId, answers)
  );
};

const getAppliedJobs = async (candidateId) => {
  if (!candidateId) throw new Error("Missing params");

  return findAppliedJobs(candidateId);
};
const createNewJobOpening = (companyId, jobData) => {
  console.log(companyId, jobData);
  if (!jobData || !companyId) throw new Error("Missing params");

  return insertJobOpening(companyId, jobData).then((res) =>
    insertIntoApplicationQuestions(res, jobData)
  );
};

const getJobsByCompanyId = (companyId) => {
  if (!companyId) throw new Error("Missing params");

  return findJobsByCompanyId(companyId);
};

module.exports = {
  getJobByKeyword,
  getJobOpeningDetails,
  getJobApplicationQuestions,
  applyForJobs,
  getAppliedJobs,
  createNewJobOpening,
  getJobsByCompanyId,
};
