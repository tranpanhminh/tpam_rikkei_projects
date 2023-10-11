const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const usersEntity = require("./users.entity.js");
const postTypesEntity = require("./postTypes.entity.js");
const servicesEntity = require("./services.entity.js");

// ---------------------------------------------------------

const serviceCommentsEntity = sequelize.define(
  "service_comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    post_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_role_id: {
      type: DataTypes.INTEGER,
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
    timestamps: false, // Bỏ đi các trường timestamps
  }
);

// Mối quan hệ giữa User và Service Comment
usersEntity.hasMany(serviceCommentsEntity, {
  foreignKey: "user_id",
});
serviceCommentsEntity.belongsTo(usersEntity, {
  foreignKey: "user_id",
});

// Mối quan hệ giữa Post Type và Service Comment

postTypesEntity.hasMany(serviceCommentsEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});
serviceCommentsEntity.belongsTo(postTypesEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// Mối quan hệ giữa Services và Service Comment

servicesEntity.hasMany(serviceCommentsEntity, {
  foreignKey: "post_id",
});
serviceCommentsEntity.belongsTo(servicesEntity, {
  foreignKey: "post_id",
});

// serviceCommentsEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = serviceCommentsEntity;
