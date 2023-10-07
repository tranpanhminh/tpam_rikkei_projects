const sequelize = require("../configs/db.config.js");
const vendorsModel = require("../models/vendors.model.js");
const postTypesModel = require("../models/postTypes.model.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const productsModel = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Giá trị mặc định
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

// Thiết lập mối quan hệ khóa ngoại với vendors
productsModel.belongsTo(vendorsModel, {
  foreignKey: "vendor_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Thiết lập mối quan hệ khóa ngoại với post_types
productsModel.belongsTo(postTypesModel, {
  foreignKey: "post_type_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// productsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = productsModel;
