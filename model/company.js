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
    .catch((e) => console.log(e));
};

const getCompanyDataById = async (id) => {
  console.log("id", id);

  return await db
    .raw(
      "Select company_id as user_id,company_name from company where company_id=?",
      [id]
    )
    .then((res) => checkValidation(res))
    .catch(() => {
      throw new Error("Some error");
    });
};

const fetchCompanyInformation = async (companyId) => {
  return await db
    .raw(
      "select company_name as companyName, company_email_id as companyEmailId, company_phone as companyPhoneNo, street_no as streetNo, street_name as streetName, city,state,country,zipcode, industry, company_desc as companyDesc from company where company_id = ?",
      [companyId]
    )
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

  return await db
    .raw(
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
        company_desc,
      ]
    )
    .then((res) => res[0].insertId);
};

const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

const insertIntoCredMapping = async (credMappingInfo, company_id) => {
  const { companyEmailId: email_id, password } = credMappingInfo;

  if (!email_id || !password || !company_id)
    throw new Error("Some fields are missing");

  const user_type = "company";
  const candidate_id = null;
  const res = await db.raw(
    `insert into cred_mapping(email_id, password, candidate_id, company_id, user_type) values
    (?, ?, ?, ?, ?);`,
    [email_id, password, candidate_id, company_id, user_type]
  );
  console.log(res);

  console.log("cred mapping should have" + email_id, password);
};

const updateCompanyData = async (companyInformation, company_id) => {
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

  return db.raw(
    "update company set company_name = ?, company_email_id = ?, company_phone = ?, street_no = ?, street_name = ?, city = ?,state = ?,country = ?,zipcode = ?, industry = ?, company_desc = ? where company_id = ?",
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
      company_desc,
      company_id,
    ]
  );
};

const updateCredMapping = async (companyInformation, company_id) => {
  const { companyEmailId: email_id, password } = companyInformation;

  if (!email_id || !password) throw new Error("Some fields are missing");

  return db.raw(
    "update cred_mapping set email_id = ?, password = ? where company_id = ?",
    [email_id, password, company_id]
  );
};

<<<<<<< HEAD
const deleteJobListing = async (job_opening_id) => {

  if (
    !job_opening_id
  )
    throw new Error("Job opening id is missing");

  return db.raw(
      "DELETE FROM job_openings WHERE job_opening_id = ?",
    [
      job_opening_id
    ]
  );
};


module.exports = { getCompany, getCompanyDataById, findCompanyByEmail, fetchCompanyInformation, insertCompanyData, insertIntoCredMapping, updateCompanyData, updateCredMapping, deleteJobListing };
=======
module.exports = {
  getCompany,
  getCompanyDataById,
  findCompanyByEmail,
  fetchCompanyInformation,
  insertCompanyData,
  insertIntoCredMapping,
  updateCompanyData,
  updateCredMapping,
};
>>>>>>> 22b31026d212d7f83702b4b3ecbf49ab12bdfd37
