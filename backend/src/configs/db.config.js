const sequelize = require("sequelize");
const connectMySQL = new sequelize(
  "project_module_3", // Tên Database
  "tranpanhminh", // Tên username
  "1234567890", // Tên Password
  {
    host: "localhost",
    dialect: "mysql",
  }
);
module.exports = connectMySQL;
