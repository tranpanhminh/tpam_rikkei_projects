require("env").config();
const databaseName = process.env.DB_NAME;
const databaseUserName = process.env.DB_USERNAME;
const databasePassword = process.env.DB_PASSWORD;
const databaseHost = process.env.DB_HOST;

// const sequelize = require("sequelize");
// const connectMySQL = new sequelize(
//   "project_module_3", // Tên Database
//   "tranpanhminh", // Tên username
//   "1234567890", // Tên Password
//   {
//     host: "localhost",
//     dialect: "mysql",
//   }
// );
// module.exports = connectMySQL;

const sequelize = require("sequelize");
const connectMySQL = new sequelize(
  databaseName, // Tên Database
  databaseUserName, // Tên username
  databasePassword, // Tên Password
  {
    host: databaseHost,
    dialect: "mysql",
  }
);
module.exports = connectMySQL;
