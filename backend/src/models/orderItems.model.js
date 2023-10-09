const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const ordersModel = require("../models/orders.model.js");
const productsModel = require("../models/products.model.js");

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
    order_id: {
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
// Order Item và Order
ordersModel.hasMany(orderItemsModel, {
  foreignKey: "order_id",
});
orderItemsModel.belongsTo(ordersModel, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Order Item và Product
productsModel.hasMany(orderItemsModel, {
  foreignKey: "product_id",
});
orderItemsModel.belongsTo(productsModel, {
  foreignKey: "product_id",
});

// orderItemsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = orderItemsModel;
