module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "", //Fill db ip address
      port: "3306",
      user: "", //Fill user name
      password: "", //Fill the password
      database: "job_application_portal",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  // Other environments like 'production', 'testing', etc.
};
