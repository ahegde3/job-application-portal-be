const getCandidate = async () => {
  return await db.raw("Select * from candidate").then((res) => res[0]);
};

const findUserByEmail = async (email, user_type) => {
 
  return await db
    .raw("Select * from cred_mapping where email_id=? and user_type=?", [
      email,
      user_type,
    ])
    .then((res) => res[0][0])
    .catch((e) => null);
};

const getCandidateById = async (id) => {


  return await db
    .raw(
      "Select candidate_id as user_id,first_name from candidate where candidate_id=?",
      [id]
    )
    .then((res) => checkValidation(res))
    .catch((e) => {

      throw new Error("Some error");
    });
};

const fetchCandidateInformation = async (candidateId) => {
  return await db
    .raw("call getCandidateInfo(?)", [candidateId])
    .then((res) => checkValidation(res));
};

const insertCandidateData = async (candidateInformation) => {
  const {
    firstName: first_name,
    lastName: last_name,
    emailId: email_id,
    phoneNo: phone_no,
    streetNo: street_no,
    streetName: street_name,
    city,
    state,
    country,
    zipcode,
    highestDegreeAttained: highest_degree_attained,
    gender,
    veteran_status,
    disability_status,
    ethnicity,
  } = candidateInformation;


  if (
    !first_name ||
    !last_name ||
    !email_id ||
    !phone_no ||
    !street_no ||
    !street_name ||
    !city ||
    !state ||
    !country ||
    !zipcode ||
    !gender ||
    !veteran_status ||
    !disability_status ||
    !ethnicity
  )
    throw new Error("Some fields are missing");

  return await db
    .raw(
      `insert into candidate(first_name, last_name, email_id, street_no, street_name, city, state, zipcode, gender,
    veteran_status, disability_status, country, phone_no,ethnicity,highest_degree_attained) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        first_name,
        last_name,
        email_id,
        street_no,
        street_name,
        city,
        state,
        zipcode,
        gender,
        veteran_status,
        disability_status,
        country,
        phone_no,
        ethnicity,
        highest_degree_attained,
      ]
    )
    .then((res) => res[0].insertId);
};
const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

const insertIntoCredMapping = async (credMappingInfo, candidate_id) => {
  const { emailId: email_id, password } = credMappingInfo;

  if (!email_id || !password || !candidate_id)
    throw new Error("Some fields are missing");

  const res = await db.raw(
    `insert into cred_mapping(email_id, password, candidate_id, user_type) values
    (?, ?, ?, ?);`,
    [email_id, password, candidate_id, "candidate"]
  );

  return candidate_id;
};

const insertIntoEducation = async (educationInfo, candidate_id) => {
  const formattedEducationInfo = educationInfo.map((education) => {
    const {
      universityName: university_name,
      degree: degree_type,
      gpa,
      major,
      country,
      startDate: start_date,
      endDate: end_date,
    } = education;
    return {
      university_name,
      degree_type,
      gpa,
      major,
      country,
      start_date,
      end_date,
      candidate_id,
    };
  });

  for (const education of formattedEducationInfo) {
    await db("education").insert(education);
  }
  return candidate_id;
};

const insertIntoWorkEx = async (workExInfo, candidate_Id) => {

  const formattedWorkExInfo = workExInfo.map((workEx) => {
    const {
      position: position,
      organizationName: organization_name,
      responsibilities,
      isCurrentlyWorking: is_currently_working,
      startDate: start_date,
      endDate: end_date,
    } = workEx;
    return {
      position,
      organization_name,
      responsibilities,
      is_currently_working,
      start_date,
      end_date,
      candidate_Id,
    };
  });

  for (const workExpereince of formattedWorkExInfo) {
    await db("work_experience").insert(workExpereince);
  }
};

const updateCandidateData = (candidateInformation, candidate_Id) => {
  const {
    firstName: first_name,
    lastName: last_name,
    emailId: email_id,
    phoneNo: phone_no,
    streetNo: street_no,
    streetName: street_name,
    city,
    state,
    country,
    zipcode,
    highestDegreeAttained: highest_degree_attained,
    gender,
    ethnicity,
    veteran_status,
    disability_status,
  } = candidateInformation;


  if (
    !first_name ||
    !last_name ||
    !email_id ||
    !phone_no ||
    !street_no ||
    !street_name ||
    !city ||
    !state ||
    !country ||
    !zipcode ||
    !gender ||
    !veteran_status ||
    !disability_status ||
    !ethnicity
  )
    throw new Error("Some fields are missing");

  return db.raw(
    "update candidate set first_name= ?,last_name=?,email_id=?,phone_no=?,street_no=?,street_name=?,city=?,state=?,country=?,zipcode=?,gender=?,veteran_status=?,disability_status=?, ethnicity =?,highest_degree_attained=? where candidate_id=?",
    [
      first_name,
      last_name,
      email_id,
      phone_no,
      street_no,
      street_name,
      city,
      state,
      country,
      zipcode,
      gender,
      veteran_status,
      disability_status,
      ethnicity,
      highest_degree_attained,
      candidate_Id,
    ]
  );

};

const updateEducationData = async (educationInfo, candidate_id) => {
  const formattedEducationInfo = educationInfo.map((education) => {
    const {
      university: university_name,
      degreeType: degree_type,
      gpa,
      major,
      country,
      startDate: start_date,
      endDate: end_date,
    } = education;
    return {
      university_name,
      degree_type,
      gpa,
      major,
      country,
      start_date,
      end_date,
      candidate_id,
    };
  });

  for (const education of formattedEducationInfo) {
    await db("education").update(education).where({ candidate_id });
  }
};

const updateWorkEx = async (workExInfo, candidate_id) => {
  const formattedWorkExInfo = workExInfo.map((workEx) => {
    const {
      position: position,
      organization: organization_name,
      responsibilities,
      isCurrentlyWorking: is_currently_working,
      startDate: start_date,
      endDate: end_date,
    } = workEx;
    return {
      position,
      organization_name,
      responsibilities,
      is_currently_working,
      start_date,
      end_date: is_currently_working ? null : end_date,
    };
  });

  for (const workExpereince of formattedWorkExInfo) {

    await db("work_experience")
      .update(workExpereince)
      .where({ candidate_Id: candidate_id });
  }
};

module.exports = {
  getCandidate,
  findUserByEmail,
  getCandidateById,
  fetchCandidateInformation,
  insertIntoWorkEx,
  insertCandidateData,
  insertIntoCredMapping,
  insertIntoEducation,
  updateCandidateData,
  updateWorkEx,
  updateEducationData,
  updateEducationData,
};
