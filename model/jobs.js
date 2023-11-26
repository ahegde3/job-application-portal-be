const findJobsByKeyword = async (keyword) => {
  if (!keyword) throw new Error("Empty keyword");

  return await db
    .raw("call get_jobs_by_keyword(?)", [keyword])
    .then((res) => checkValidation(res))
    .catch(() => {
      throw new Error("Some error");
    });
};

const findJobOpeningDetails = async (jobId) => {
  console.log("findJobOpeningDetails");
  if (!jobId) throw new Error("Empty jobId");

  return await db
    .raw(
      `select job_opening_id,job_location,job_title,job_desc,requirements ,c.company_name,c.company_desc
      from job_openings jo 
      inner join company c 
      on jo.company_id = c.company_id
      where jo.job_opening_id=?`,
      [jobId]
    )
    .then((res) => checkValidation(res))
    .catch((e) => {
      console.log(e);
      throw new Error("Some error");
    });
};

const findJobApplicationQuestion = async (jobId) => {
  console.log("findJobOpeningDetails");
  if (!jobId) throw new Error("Empty jobId");

  return await db
    .raw(
      `select app_ques_id as appQuestionId,app_question_desc as appQuestionDesc
      from application_questions
      where job_opening_id =?`,
      [jobId]
    )
    .then((res) => res[0])
    .catch((e) => {
      console.log(e);
      throw new Error("Some error");
    });
};

const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

module.exports = {
  findJobsByKeyword,
  findJobOpeningDetails,
  findJobApplicationQuestion,
};
