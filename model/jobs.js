const findJobsByKeyword = async (keyword) => {
  if (!keyword) throw new Error("Empty keyword");

  return await db
    .raw("call get_jobs_by_keyword(?)", [keyword])
    .then((res) => checkValidation(res))
    .catch(() => {
      throw new Error("Some error");
    });
};

const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

module.exports = { findJobsByKeyword };
