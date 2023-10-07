const sequelize = require("../configs/db.config.js");
const postTypesModel = require("../models/postTypes.model.js");
const workingTimeModel = require("../models/workingTime.model.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const servicesModel = sequelize.define(
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

// Định nghĩa mối quan hệ giữa Service và PostType
servicesModel.belongsTo(postTypesModel, {
  foreignKey: "post_type_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

servicesModel.belongsTo(workingTimeModel, {
  foreignKey: "working_time_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// servicesModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = servicesModel;
