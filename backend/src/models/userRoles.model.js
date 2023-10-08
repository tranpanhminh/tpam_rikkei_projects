const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const userRolesModel = sequelize.define(
  "user_roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// userRolesModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = userRolesModel;
