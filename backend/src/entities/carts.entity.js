const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const usersEntity = require("./users.entity.js");
const productsEntity = require("./products.entity.js");

// ---------------------------------------------------------

const cartsEntity = sequelize.define(
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
usersEntity.hasMany(cartsEntity, {
  foreignKey: "user_id",
});
cartsEntity.belongsTo(usersEntity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

productsEntity.hasMany(cartsEntity, {
  foreignKey: "product_id",
});
cartsEntity.belongsTo(productsEntity, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// cartsEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = cartsEntity;
