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
      `select job_opening_id as jobOpeningId,job_location as jobLocation,job_title as jobTitle,job_desc as jobDesc,requirements ,c.company_name as companyName,c.company_desc as companyDesc
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
      `select app_ques_id as appQuestionId,app_question_desc as appQuestionDesc``
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
