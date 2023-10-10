const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const paymentsModel = sequelize.define(
  "payments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    cardholder_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    card_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.BIGINT,
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

// paymentsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = paymentsModel;
