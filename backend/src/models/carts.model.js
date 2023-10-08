const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const usersModel = require("../models/users.model.js");
const productsModel = require("../models/products.model.js");

// ---------------------------------------------------------

const cartsModel = sequelize.define(
  "carts",
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
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
    timestamps: false, // Bỏ đi các trường timestamps
  }
);

// Thiết lập quan hệ giữa các mô hình
usersModel.hasMany(cartsModel, {
  foreignKey: "user_id",
});
cartsModel.belongsTo(usersModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

productsModel.hasMany(cartsModel, {
  foreignKey: "product_id",
});
cartsModel.belongsTo(productsModel, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// cartsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = cartsModel;
