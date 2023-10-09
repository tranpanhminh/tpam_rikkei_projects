const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const orderItemsModel = sequelize.define(
  "order_items",
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
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    discount_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_bill: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE, // Sử dụng kiểu dữ liệu DATE thay thế
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE, // Sử dụng kiểu dữ liệu DATE thay thế
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// orderItemsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = orderItemsModel;
