const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const usersEntity = require("./users.entity.js");
const paymentsEntity = require("./payments.entity.js");
const couponsEntity = require("./coupons.entity.js");
const cancelReasonsEntity = require("./cancelReasons.entity.js");
const orderStatusesEntity = require("./orderStatuses.entity.js");

// ---------------------------------------------------------

const ordersEntity = sequelize.define(
  "orders",
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
    discount_rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    card_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cancellation_reason: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coupon_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
usersEntity.hasMany(ordersEntity, {
  foreignKey: "user_id",
});
ordersEntity.belongsTo(usersEntity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Order và Payment
paymentsEntity.hasMany(ordersEntity, {
  foreignKey: "card_id",
});
ordersEntity.belongsTo(paymentsEntity, {
  foreignKey: "card_id",
});

// Order và Coupon
couponsEntity.hasMany(ordersEntity, {
  foreignKey: "coupon_id",
});
ordersEntity.belongsTo(couponsEntity, {
  foreignKey: "coupon_id",
});

// Order và Order Status
orderStatusesEntity.hasMany(ordersEntity, {
  foreignKey: "status_id",
});
ordersEntity.belongsTo(orderStatusesEntity, {
  foreignKey: "status_id",
});

// Order và Cancel Reasons
cancelReasonsEntity.hasMany(ordersEntity, {
  foreignKey: "cancel_reason_id",
});
ordersEntity.belongsTo(cancelReasonsEntity, {
  foreignKey: "cancel_reason_id",
});

// ordersEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = ordersEntity;
