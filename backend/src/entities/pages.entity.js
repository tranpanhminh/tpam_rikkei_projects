const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const postStatusesEntity = require("../entities/postStatuses.entity.js");
const postTypesEntity = require("./postTypes.entity.js");

// ---------------------------------------------------------

const pagesEntity = sequelize.define(
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
postStatusesEntity.hasMany(pagesEntity, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});
pagesEntity.belongsTo(postStatusesEntity, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});

// Post và Post Type
postTypesEntity.hasMany(pagesEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});
pagesEntity.belongsTo(postTypesEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// pagesEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = pagesEntity;
