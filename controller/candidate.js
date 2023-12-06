const {
  getCandidate,
  findUserByEmail,
  getCandidateById,
  fetchCandidateInformation,
  insertCandidateData,
  insertIntoCredMapping,
  insertIntoEducation,
  insertIntoWorkEx,
  updateCandidateData,
  updateWorkEx,
  updateEducationData,
} = require("../model/candidate");

const getAllCandidate = async () => {
  console.log("inside");
  return await getCandidate();
};

const loginCandidate = async (emailId, password) => {
  if (!emailId || !password) throw new Error("Invalid params");

  const USER_TYPE = "candidate";
  const userData = await findUserByEmail(emailId, USER_TYPE);
  // console.log(userData);
  if (!userData) throw new Error("User not found");

  if (userData.password !== password) throw new Error("password not matching");
  return await getCandidateById(userData.candidate_id);
};

const getCandidateInformation = async (candidateId) => {
  if (!candidateId) throw new Error("Invalid params");

  return await fetchCandidateInformation(candidateId);
};

const registerCandidate = async (
  candidateInformation,
  educationInformation,
  workExperienceInformation
) => {
  console.log(workExperienceInformation);

  //check if candidate is already present
  const USER_TYPE = "candidate";
  const userData = await findUserByEmail(
    candidateInformation.emailId,
    USER_TYPE
  );
  console.log(userData);
  if (userData) {
    return updateCandidateData(candidateInformation, userData.candidate_id)
      .then(updateWorkEx(workExperienceInformation, userData.candidate_id))
      .then(updateEducationData(educationInformation, userData.candidate_id));
  }

  return insertCandidateData(candidateInformation)
    .then((res) => insertIntoCredMapping(candidateInformation, res))
    .then((res) => insertIntoEducation(educationInformation, res))
    .then((res) => insertIntoWorkEx(workExperienceInformation, res));
};

module.exports = {
  getAllCandidate,
  loginCandidate,
  getCandidateInformation,
  registerCandidate,
};
