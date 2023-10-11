const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const ordersEntity = require("../entities/orders.entity.js");
const productsEntity = require("../entities/products.entity.js");

// ---------------------------------------------------------

const orderItemsEntity = sequelize.define(
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
      allowNull: true,
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_thumbnail: {
      type: DataTypes.TEXT,
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
ordersEntity.hasMany(orderItemsEntity, {
  foreignKey: "order_id",
});
orderItemsEntity.belongsTo(ordersEntity, {
  foreignKey: "order_id",
});

// Order Item và Product
productsEntity.hasMany(orderItemsEntity, {
  foreignKey: "product_id",
});
orderItemsEntity.belongsTo(productsEntity, {
  foreignKey: "product_id",
});

// orderItemsEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = orderItemsEntity;
