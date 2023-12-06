module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: '127.0.0.1',
      port: "3306",
      user: 'root',
      password: 'root12345',
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
