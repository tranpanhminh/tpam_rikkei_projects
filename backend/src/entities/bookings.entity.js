const sequelize = require("../configs/db.config.js");
const usersEntity = require("./users.entity.js");
const servicesEntity = require("./services.entity.js");
const bookingStatusesEntity = require("./bookingStatuses.entity.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const bookingsEntity = sequelize.define(
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
usersEntity.hasMany(bookingsEntity, {
  foreignKey: "user_id",
});
bookingsEntity.belongsTo(usersEntity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Mối quan hệ giữa Service và Booking
servicesEntity.hasMany(bookingsEntity, {
  foreignKey: "service_id",
});
bookingsEntity.belongsTo(servicesEntity, {
  foreignKey: "service_id",
});

// Mối quan hệ giữa Booking Status và Booking
bookingStatusesEntity.hasMany(bookingsEntity, {
  foreignKey: "status_id",
});
bookingsEntity.belongsTo(bookingStatusesEntity, {
  foreignKey: "status_id",
  onDelete: "NO ACTION",
});

// bookingsEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = bookingsEntity;
