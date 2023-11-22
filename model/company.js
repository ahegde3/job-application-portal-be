const getCompanyDataById = async (id) => {
  console.log("id", id);

  return await db
    .raw("Select company_id,company_name from company where company_id=?", [id])
    .then((res) => checkValidation(res))
    .catch(() => {
      throw new Error("Some error");
    });
};

const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

module.exports = { getCompanyDataById };
