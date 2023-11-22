const { getCompanyDataById } = require("../model/company");
const { findUserByEmail } = require("../model/candidate");

const loginCompany = async (emailId, password) => {
  if (!emailId || !password) throw new Error("Invalid params");

  const USER_TYPE = "company";
  const userData = await findUserByEmail(emailId, USER_TYPE);
  if (!userData) throw new Error("User not found");

  if (userData.password !== password) throw new Error("password not matching");
  return await getCompanyDataById(userData.user_id);
};

module.exports = { loginCompany };
