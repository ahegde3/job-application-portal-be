const {
  getCandidate,
  findUserByEmail,
  getCandidateById,
  fetchCandidateInformation,
} = require("../model/candidate");

const getAllCandidate = async () => {
  console.log("inside");
  return await getCandidate();
};

const loginCandidate = async (emailId, password) => {
  if (!emailId || !password) throw new Error("Invalid params");

  const USER_TYPE = "candidate";
  const userData = await findUserByEmail(emailId, USER_TYPE);
  if (!userData) throw new Error("User not found");

  if (userData.password !== password) throw new Error("password not matching");
  return await getCandidateById(userData.user_id);
};

const getCandidateInformation = async (candidateId) => {
  if (!candidateId) throw new Error("Invalid params");

  return await fetchCandidateInformation(candidateId);
};

module.exports = {
  getAllCandidate,
  loginCandidate,
  getCandidateInformation,
};
