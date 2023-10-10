const sequelize = require("../configs/db.config.js");
const usersModel = require("../models/users.model.js");
const servicesModel = require("../models/services.model.js");
const bookingStatusesModel = require("../models/bookingStatuses.model.js");
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    service_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    service_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    service_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.STRING(255),
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

// Mối quan hệ giữa Users và Booking
usersModel.hasMany(bookingsModel, {
  foreignKey: "user_id",
});
bookingsModel.belongsTo(usersModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Mối quan hệ giữa Service và Booking
servicesModel.hasMany(bookingsModel, {
  foreignKey: "service_id",
});
bookingsModel.belongsTo(servicesModel, {
  foreignKey: "service_id",
});

// Mối quan hệ giữa Booking Status và Booking
bookingStatusesModel.hasMany(bookingsModel, {
  foreignKey: "status_id",
});
bookingsModel.belongsTo(bookingStatusesModel, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});

// bookingsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = bookingsModel;
