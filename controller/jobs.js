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
  updateJobOpeningData
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

const getListOfAppliedJobsByCandidates = (jobId) => {
  console.log("reviewListOfAppliedJobsByCandidates", jobId);
  if (!jobId) throw new Error("");

  return reviewListOfAppliedJobsByCandidates(jobId);
}

const getAppliedJobs = async (candidateId) => {
  if (!candidateId) throw new Error("Missing params");

  return findAppliedJobs(candidateId);
};
const createNewJobOpening = (companyId, jobData) => {
  console.log(companyId, jobData);
  if (!jobData || !companyId) throw new Error("Missing params");

  if(jobData.jobOpeningId)
    return updateJobOpeningData(jobData)

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
  getListOfAppliedJobsByCandidates,
  getAppliedJobs,
  createNewJobOpening,
  getJobsByCompanyId,
};
