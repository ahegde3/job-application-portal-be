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
  console.log("id", id);

  return await db
    .raw(
      "Select candidate_id as user_id,first_name from candidate where candidate_id=?",
      [id]
    )
    .then((res) => checkValidation(res))
    .catch((e) => {
      console.log("error");
      throw new Error("Some error");
    });
};

const fetchCandidateInformation = async (candidateId) => {
  return await db
    .raw("call getCandidateInfo(?)", [candidateId])
    .then((res) => checkValidation(res));
};



const insertCandidateData =(candidateInformation)=>{
 
 const {
  firstName,
  lastName,
  emailId,
  streetNo,
  streetName,
  city,
  state,
  country,
  zipcode,
} =candidateInformation;

  return await db.insert(`insert into candidate(first_name, last_name, email_id, street_no, street_name, city, state, zipcode, highest_degree_attained, gender,
    veteran_status, disability_status, country) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`),
}
const checkValidation = (res) => {
  if (res?.[0]?.[0]) return res[0][0];
  throw new Error("result not found");
};

module.exports = {
  getCandidate,
  findUserByEmail,
  getCandidateById,
  fetchCandidateInformation,
};
