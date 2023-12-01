const { getCompanyDataById, insertCompanyData } = require("../model/company");
const { findUserByEmail } = require("../model/candidate");

const loginCompany = async (emailId, password) => {
  if (!emailId || !password) throw new Error("Invalid params");

  const USER_TYPE = "company";
  const userData = await findUserByEmail(emailId, USER_TYPE);
  if (!userData) throw new Error("User not found");

  if (userData.password !== password) throw new Error("password not matching");
  return await getCompanyDataById(userData.user_id);
};

const registerCompany = async (companyInformation) => {
  console.log(companyInformation);
  if (!companyInformation) throw new Error("Data not available");
  //TODO: Do we need any check ?

  return await insertCompanyData(companyInformation);
};
module.exports = { loginCompany, registerCompany };
