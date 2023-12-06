const { getCompany, findCompanyByEmail, getCompanyDataById, fetchCompanyInformation, insertCompanyData, insertIntoCredMapping } = require("../model/company");
// const { findUserByEmail } = require("../model/candidate");

const getAllCompany = async () => {
  console.log("inside");
  return await getCompany();
};

const loginCompany = async (emailId, password) => {
  if (!emailId || !password) throw new Error("Invalid params");

  const USER_TYPE = "company";
  const userData = await findCompanyByEmail(emailId, USER_TYPE);
  console.log(userData);
  if (!userData) throw new Error("User not found");

  if (userData.password !== password) throw new Error("password not matching");
  return await getCompanyDataById(userData.company_id);
};

const getCompanyInformation = async (companyId) => {
  if (!companyId) throw new Error("Invalid params");

  return await fetchCompanyInformation(companyId);
};

const registerCompany = async (companyInformation) => {
  console.log(companyInformation);
  if (!companyInformation) throw new Error("Data not available");
  //TODO: Do we need any check ?

  return await insertCompanyData(companyInformation);
};
module.exports = { getAllCompany, loginCompany, registerCompany, getCompanyInformation };

