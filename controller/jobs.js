const {
  findJobsByKeyword,
  findJobOpeningDetails,
  findJobApplicationQuestion,
  insertJobApplication,
  insertIntoApplicationQuestionJobIdMapping,
  reviewListOfAppliedJobsByCandidates
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
};

module.exports = {
  getJobByKeyword,
  getJobOpeningDetails,
  getJobApplicationQuestions,
  applyForJobs,
  getListOfAppliedJobsByCandidates
};
