const {
  getCompany,
  findCompanyByEmail,
  getCompanyDataById,
  fetchCompanyInformation,
  insertCompanyData,
  insertIntoCredMapping,
  updateCompanyData,
  updateCredMapping,
  deleteJobListing
} = require("../model/company");
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

  //check if company is already present
  const USER_TYPE = "company";
  const userData = await findCompanyByEmail(
    companyInformation.companyEmailId,
    USER_TYPE
  );

  console.log(userData);
  if (userData) {
    console.log("update data calling");
    return updateCompanyData(companyInformation, userData.company_id).then(
      updateCredMapping(companyInformation, userData.company_id)
    );
  }
  console.log("insert again calling");
  return insertCompanyData(companyInformation).then((res) =>
    insertIntoCredMapping(companyInformation, res)
  );
};

const deleteListing = async (jobId) => {
  if (!jobId) throw new Error("Invalid job opening id");

  return await deleteJobListing(jobId);
};
module.exports = { getAllCompany, loginCompany, registerCompany, getCompanyInformation, deleteListing};

