const {
  getCandidate,
  findUserByEmail,
  getCandidateById,
} = require("../model/candidate");

const getAllCandidate = async () => {
  console.log("inside");
  return await getCandidate();
};

const loginCandidate = async (emailId, password) => {
  if (!emailId || !password) throw new Error("Invalid params");
  console.log(emailId, password);
  const USER_TYPE = "candidate";
  const userData = await findUserByEmail(emailId, USER_TYPE);
  if (!userData) throw new Error("User not found");
  console.log(userData);
  if (userData.password !== password) throw new Error("password not matching");
  return await getCandidateById(userData.user_id);
};

module.exports = { getAllCandidate, loginCandidate };
