const sequelize = require("../configs/db.config.js");
const productsModel = require("../models/products.model.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const productImagesModel = sequelize.define(
  "product_images",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_id: {
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

// Mối quan hệ giữa Product và Product Image
productsModel.hasMany(productImagesModel, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

productImagesModel.belongsTo(productsModel, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// productImagesModel.sync().then(() => {
//   console.log("OK");
// });

module.exports = productImagesModel;
