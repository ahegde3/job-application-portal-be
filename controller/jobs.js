const {
  findJobsByKeyword,
  findJobOpeningDetails,
  findJobApplicationQuestion,
  insertJobApplication,
  insertIntoApplicationQuestionJobIdMapping,
  reviewListOfAppliedJobsByCandidates,
  findAppliedJobs,
  insertJobOpening,
  insertIntoApplicationQuestions,
  findJobsByCompanyId,
  updateJobOpeningData,
  updateJobAppStatus,
} = require("../model/jobs");

const getJobByKeyword = (keyword, candidateId) => {
  if (!keyword || !candidateId) throw new Error("Empty keyword");

  return findJobsByKeyword(keyword, candidateId);
};

const getJobOpeningDetails = (jobId) => {

  if (!jobId) throw new Error("");

  return findJobOpeningDetails(jobId);
};

const getJobApplicationQuestions = (jobId) => {

  if (!jobId) throw new Error("");

  return findJobApplicationQuestion(jobId);
};

const applyForJobs = async (candidateId, jobId, answers) => {

  return insertJobApplication(candidateId, jobId).then((applicationId) =>
    insertIntoApplicationQuestionJobIdMapping(applicationId, answers)
  );
};

const getListOfAppliedJobsByCandidates = (jobId) => {

  if (!jobId) throw new Error("");

  return reviewListOfAppliedJobsByCandidates(jobId);
};

const getAppliedJobs = async (candidateId) => {
  if (!candidateId) throw new Error("Missing params");

  return findAppliedJobs(candidateId);
};
const createNewJobOpening = (companyId, jobData) => {

  if (!jobData || !companyId) throw new Error("Missing params");

  if (jobData.jobOpeningId) return updateJobOpeningData(jobData);

  return insertJobOpening(companyId, jobData).then((res) =>
    insertIntoApplicationQuestions(res, jobData)
  );
};

const getJobsByCompanyId = (companyId) => {
  if (!companyId) throw new Error("Missing params");

  return findJobsByCompanyId(companyId);
};

const updateJobApplicationStatus = (jobId, candidateId, status) => {
  if (!jobId || !candidateId || !status) throw new Error("Missing params");

  return updateJobAppStatus(jobId, candidateId, status);
};

module.exports = {
  getJobByKeyword,
  getJobOpeningDetails,
  getJobApplicationQuestions,
  applyForJobs,
  getListOfAppliedJobsByCandidates,
  getAppliedJobs,
  createNewJobOpening,
  getJobsByCompanyId,
  updateJobApplicationStatus,
};
