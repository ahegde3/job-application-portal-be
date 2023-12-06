const getCompany = async () => {
  return await db.raw("Select * from company").then((res) => res[0]);
};

const findCompanyByEmail = async (email, user_type) => {
  return await db
    .raw("Select * from cred_mapping where email_id=? and user_type=?", [
      email,
      user_type,
    ])
    .then((res) => res[0][0])
    .catch((e) => null);
};

const getCompanyDataById = async (id) => {
  console.log("id", id);

  return await db
    .raw("Select company_id,company_name from company where company_id=?", [id])
    .then((res) => checkValidation(res))
    .catch(() => {
      throw new Error("Some error");
    });
};

const fetchCompanyInformation = async (companyId) => {
  return await db
    .raw("call getCompanyInfo(?)", [companyId])
    .then((res) => checkValidation(res));
};

const insertCompanyData = async (companyInformation) => {
  const {
    companyName: company_name,
    companyEmailId: company_email_id,
    companyPhoneNo: company_phone,
    streetNo: street_no,
    streetName: street_name,
    city,
    state,
    country,
    zipcode,
    industry,
    companyDesc: company_desc,
  } = companyInformation;

  if (
    !company_name ||
    !company_email_id ||
    !company_phone ||
    !street_no ||
    !street_name ||
    !city ||
    !state ||
    !country ||
    !zipcode ||
    !industry ||
    !company_desc
  )
    throw new Error("Some fields are missing");

  return await db.raw(
    `INSERT INTO company
      (company_name, company_email_id, company_phone, street_no, street_name, city, state,country, zipcode, industry, company_desc)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      company_name,
      company_email_id,
      company_phone,
      street_no,
      street_name,
      city,
      state,
      country,
      zipcode,
      industry,
      company_desc
    ]
  );
};

const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

const insertIntoCredMapping = async (credMappingInfo, company_id) => {
  console.log("insertIntoCredMapping")
  console.log(credMappingInfo)
  const { companyEmailId: email_id, password } = credMappingInfo;
  console.log("cred mapping should have" + email_id, password);
  console.log("cred mapping should have" + company_id);
  if (!email_id || !password || !company_id)
    throw new Error("THis Some fields are missing");

  const res = await db.raw(
    `insert into cred_mapping(email_id, password, candidate_id, company_id, user_type) values
    (?, ?, ?, ?, ?);`,
    [email_id, password, null, company_id, "company"]
  );

  console.log("cred mapping should have" + email_id, password);


};

module.exports = { getCompany, getCompanyDataById, findCompanyByEmail, fetchCompanyInformation, insertCompanyData, insertIntoCredMapping };
