const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const postStatusesModel = require("../models/postStatuses.model.js");
const postTypesModel = require("./postTypes.model.js");

// ---------------------------------------------------------

const postsModel = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_type_id: {
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
    timestamps: false,
  }
);

// Post và Post Status
postStatusesModel.hasMany(postsModel, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});
postsModel.belongsTo(postStatusesModel, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});

// Post và Post Type
postTypesModel.hasMany(postsModel, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});
postsModel.belongsTo(postTypesModel, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// postsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = postsModel;
