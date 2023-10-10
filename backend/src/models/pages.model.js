const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const postStatusesModel = require("../models/postStatuses.model.js");
const postTypesModel = require("./postTypes.model.js");

// ---------------------------------------------------------

const pagesModel = sequelize.define(
  "pages",
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
postStatusesModel.hasMany(pagesModel, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});
pagesModel.belongsTo(postStatusesModel, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});

// Post và Post Type
postTypesModel.hasMany(pagesModel, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});
pagesModel.belongsTo(postTypesModel, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// pagesModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = pagesModel;
