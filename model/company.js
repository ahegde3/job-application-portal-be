const getCompanyDataById = async (id) => {
  console.log("id", id);

  return await db
    .raw("Select company_id,company_name from company where company_id=?", [id])
    .then((res) => checkValidation(res))
    .catch(() => {
      throw new Error("Some error");
    });
};

const insertCompanyData = async (companyInformation) => {
  const {
    companyName,
    companyEmailId,
    companyPhoneNo,
    streetNo,
    streetName,
    city,
    state,
    country,
    zipcode,
    industry,
    companyDesc,
  } = companyInformation;

  if (
    !companyName ||
    !companyEmailId ||
    !companyPhoneNo ||
    !streetNo ||
    !streetName ||
    !city ||
    !state ||
    !country ||
    !zipcode ||
    !industry ||
    !companyDesc
  )
    throw new Error("Some fields are missing");

  return await db.raw(
    `INSERT INTO company
      (company_name, company_email_id, company_phone, street_no, street_name, city, state,country, zipcode, industry, company_desc)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      companyName,
      companyEmailId,
      companyPhoneNo,
      streetNo,
      streetName,
      city,
      state,
      country,
      zipcode,
      industry,
      companyDesc,
    ]
  );
};

const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

module.exports = { getCompanyDataById, insertCompanyData };
