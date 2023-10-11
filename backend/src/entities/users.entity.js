const sequelize = require("../configs/db.config.js");
const userRolesEntity = require("./userRoles.entity.js");
const userStatusesEntity = require("./userStatuses.entity.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const usersEntity = sequelize.define(
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
userRolesEntity.hasMany(usersEntity, {
  foreignKey: "role_id",
  onDelete: "NO ACTION",
});
usersEntity.belongsTo(userRolesEntity, {
  foreignKey: "role_id",
  onDelete: "NO ACTION",
});

// Mối quan hệ giữa User và User Status
userStatusesEntity.hasMany(usersEntity, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});
usersEntity.belongsTo(userStatusesEntity, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});

// usersEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = usersEntity;
