const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const usersModel = require("../models/users.model.js");
const paymentsModel = require("../models/payments.model.js");
const couponsModel = require("../models/coupons.model.js");
const cancelReasonsModel = require("../models/cancelReasons.model.js");
const orderStatusesModel = require("../models/orderStatuses.model.js");

// ---------------------------------------------------------

const ordersModel = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    customer_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coupon_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    bill: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    discounted: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    total_bill: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cancel_reason_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
// Order và User
usersModel.hasMany(ordersModel, {
  foreignKey: "user_id",
});
ordersModel.belongsTo(usersModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Order và Payment
paymentsModel.hasMany(ordersModel, {
  foreignKey: "card_id",
});
ordersModel.belongsTo(paymentsModel, {
  foreignKey: "card_id",
});

// Order và Coupon
couponsModel.hasMany(ordersModel, {
  foreignKey: "coupon_id",
});
ordersModel.belongsTo(couponsModel, {
  foreignKey: "coupon_id",
});

// Order và Order Status
orderStatusesModel.hasMany(ordersModel, {
  foreignKey: "status_id",
});
ordersModel.belongsTo(orderStatusesModel, {
  foreignKey: "status_id",
});

// Order và Cancel Reasons
cancelReasonsModel.hasMany(ordersModel, {
  foreignKey: "cancel_reason_id",
});
ordersModel.belongsTo(cancelReasonsModel, {
  foreignKey: "cancel_reason_id",
});

// ordersModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = ordersModel;
