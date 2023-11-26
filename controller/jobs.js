const { findJobsByKeyword, findJobOpeningDetails,findJobApplicationQuestion } = require("../model/jobs");

const getJobByKeyword = (keyword) => {
  if (!keyword) throw new Error("Empty keyword");

  return findJobsByKeyword(keyword);
};

const getJobOpeningDetails = (jobId) => {
  console.log("getJonb", jobId);
  if (!jobId) throw new Error("");

  return findJobOpeningDetails(jobId);
};

const getJobApplicationQuestions =(jobId) => {
  console.log("getJonb", jobId);
  if (!jobId) throw new Error("");

  return findJobApplicationQuestion(jobId);
};


module.exports = { getJobByKeyword, getJobOpeningDetails,getJobApplicationQuestions };
