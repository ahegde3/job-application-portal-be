const { findJobsByKeyword } = require("../model/jobs");

const getJobByKeyword = (keyword) => {
  if (!keyword) throw new Error("Empty keyword");

  return findJobsByKeyword(keyword);
};

module.exports = { getJobByKeyword };
