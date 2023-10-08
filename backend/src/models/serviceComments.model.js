const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const usersModel = require("./users.model.js");
const postTypesModel = require("./postTypes.model.js");
const servicesModel = require("./services.model.js");

// ---------------------------------------------------------

const serviceCommentsModel = sequelize.define(
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

// Thiết lập quan hệ giữa các mô hình
usersModel.hasMany(serviceCommentsModel, {
  foreignKey: "user_id",
});
serviceCommentsModel.belongsTo(usersModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

postTypesModel.hasMany(serviceCommentsModel, {
  foreignKey: "post_type_id",
});
serviceCommentsModel.belongsTo(postTypesModel, {
  foreignKey: "post_type_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

servicesModel.hasMany(serviceCommentsModel, {
  foreignKey: "post_id",
});
serviceCommentsModel.belongsTo(servicesModel, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// serviceCommentsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = serviceCommentsModel;
