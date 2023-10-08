const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const bookingStatusesModel = sequelize.define(
  "booking_statuses",
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

// bookingStatusesModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = bookingStatusesModel;
