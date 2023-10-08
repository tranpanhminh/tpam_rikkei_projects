const sequelize = require("../configs/db.config.js");
const usersModel = require("../models/users.model.js");
const servicesModel = require("../models/services.model.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const bookingsModel = sequelize.define(
  "bookings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    calendar: {
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

// Thiết lập quan hệ giữa các mô hình
usersModel.hasMany(bookingsModel, {
  foreignKey: "user_id",
});
bookingsModel.belongsTo(usersModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

servicesModel.hasMany(bookingsModel, {
  foreignKey: "service_id",
});
bookingsModel.belongsTo(servicesModel, {
  foreignKey: "service_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// bookingsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = bookingsModel;
