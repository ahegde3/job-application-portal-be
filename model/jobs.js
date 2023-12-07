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

const reviewListOfAppliedJobsByCandidates = async (jobId) => {
  console.log("reviewListOfAppliedJobsByCandidates");
  if (!jobId) throw new Error("Empty jobId in query");

  return await db
    .raw(
      `select c.first_name, c.last_name, c.email_id, c.phone_no, j.app_status from candidate c 
      inner join job_application j on
      c.candidate_id = j.candidate_id
      where j.job_application_id = ?
      order by j.application_updated_at`,
      [jobId]
    )
    .then((res) => checkValidation(res))
    .catch((e) => {
      console.log(e);
      throw new Error("Some error");
    });
};

const findJobApplicationQuestion = async (jobId) => {
  console.log("findJobOpeningDetails", jobId);
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

const insertJobApplication = async (candidate_id, job_opening_id) => {
  console.log("insertJobApplication", candidate_id, job_opening_id);
  const STATUS = "APPLIED";
  const applicationId = await db
    .raw(
      "insert into job_application(candidate_id,job_opening_id,app_status) values(?,?,?)",
      [candidate_id, job_opening_id, STATUS]
    )
    .then((res) => res[0].insertId);

  if (!applicationId) throw new Error("There is some issue");
  return applicationId;
};

const insertIntoApplicationQuestionJobIdMapping = async (
  job_application_id,
  answers
) => {
  const formattedAnswers = answers.map((ans) => {
    return {
      job_application_id,
      app_ques_id: ans.appQuestionId,
      answer: ans.answerDesc,
    };
  });

  for (const answer of formattedAnswers) {
    //await db("application_question_job_id_mapping").insert(answer);
    await db.raw("insert into application_question_job_id_mapping(job_application_id, app_ques_id, answer) values(?,?,?) ",
    [answer.job_application_id, answer.app_ques_id, answer.answer]
    )
    .then((res) => res[0].insertId);
  }
};

const findAppliedJobs = async (candidateId) => {
  return await db
    .raw(
      `select distinct jo.job_opening_id,jo.job_title as title, ja.app_status as status,c.company_name as companyName
   from job_application  ja
   inner join job_openings jo
   on ja.job_opening_id = jo.job_opening_id
   inner join company c
   on jo.company_id =c.company_id
   where candidate_id=?`,
      [candidateId]
    )
    .then((res) => res?.[0]);
};

const insertJobOpening = (
  company_id,
  {
    jobTitle: job_title,
    noOfVacancies: no_of_vacancies,
    jobLocation: job_location,
    jobDescription: job_desc,
    requirements,
  }
) => {
  if (
    !job_title ||
    !no_of_vacancies ||
    !job_desc ||
    !job_location ||
    !requirements
  )
    throw new Error("Some fields are missing");

  return db
    .raw(
      "insert into job_openings(job_title,no_of_vacancies,job_location,job_desc,requirements,company_id)  values(?,?,?,?,?,?)",
      [
        job_title,
        no_of_vacancies,
        job_location,
        job_desc,
        requirements,
        company_id,
      ]
    )
    .then((res) => res[0].insertId);
};

const insertIntoApplicationQuestions = async (
  job_opening_id,
  { questions }
) => {
  questions = questions.map((ques) => ques.appQuestionDesc);
  for (const app_question_desc of questions) {
    await db.raw(
      "insert into application_questions(app_question_desc,job_opening_id) values(?,?)",
      [app_question_desc, job_opening_id]
    );
  }
};

const findJobsByCompanyId = async (company_id) => {
  if (!company_id) throw new Error("Some params missing");

  return db
    .raw(
      "Select job_opening_id as jobId,job_title as title  from job_openings where company_id=? order by job_opening_id desc",
      [company_id]
    )
    .then((res) => res[0]);
};

const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

module.exports = {
  findJobsByKeyword,
  findJobOpeningDetails,
  findJobApplicationQuestion,
  insertJobApplication,
  insertIntoApplicationQuestionJobIdMapping,
  reviewListOfAppliedJobsByCandidates,
  findAppliedJobs,
  insertJobOpening,
  insertIntoApplicationQuestions,
  findJobsByCompanyId,
};
