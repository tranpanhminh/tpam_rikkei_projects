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
    thumbnail_url: {
      type: DataTypes.TEXT,
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

// Mối quan hệ khóa ngoại giữa Products và Vendors
vendorsModel.hasMany(productsModel, {
  foreignKey: "vendor_id",
  onDelete: "NO ACTION",
});

productsModel.belongsTo(vendorsModel, {
  foreignKey: "vendor_id",
  onDelete: "NO ACTION",
});

// Mối quan hệ khóa ngoại giữa Products và Post Types
postTypesModel.hasMany(productsModel, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

productsModel.belongsTo(postTypesModel, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// productsModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = productsModel;
