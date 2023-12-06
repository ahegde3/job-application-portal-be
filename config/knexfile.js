module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.host,
      port: "3306",
      user: process.env.username,
      password: process.env.password,
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
