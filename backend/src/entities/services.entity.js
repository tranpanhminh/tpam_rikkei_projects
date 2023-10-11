const sequelize = require("../configs/db.config.js");
const postTypesEntity = require("./postTypes.entity.js");
const workingTimeEntity = require("./workingTime.entity.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const servicesEntity = sequelize.define(
  "services",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    working_time_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_type_id: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
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

// Mối quan hệ giữa Service và Post Type
postTypesEntity.hasMany(servicesEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

servicesEntity.belongsTo(postTypesEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// Mối quan hệ giữa Service và Working Time
workingTimeEntity.hasMany(servicesEntity, {
  foreignKey: "working_time_id",
  onDelete: "NO ACTION",
});

servicesEntity.belongsTo(workingTimeEntity, {
  foreignKey: "working_time_id",
  onDelete: "NO ACTION",
});

// servicesEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = servicesEntity;
