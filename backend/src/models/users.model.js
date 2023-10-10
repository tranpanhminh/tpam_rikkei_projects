const sequelize = require("../configs/db.config.js");
const userRolesModel = require("../models/userRoles.model.js");
const userStatusesModel = require("../models/userStatuses.model.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const usersModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE, // Sử dụng kiểu dữ liệu DATE thay thế
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE, // Sử dụng kiểu dữ liệu DATE thay thế
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// Mối quan hệ giữa User và User Role
userRolesModel.hasMany(usersModel, {
  foreignKey: "role_id",
  onDelete: "NO ACTION",
});
usersModel.belongsTo(userRolesModel, {
  foreignKey: "role_id",
  onDelete: "NO ACTION",
});

// Mối quan hệ giữa User và User Status
userStatusesModel.hasMany(usersModel, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});
usersModel.belongsTo(userStatusesModel, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});

// usersModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = usersModel;
