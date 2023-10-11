const sequelize = require("../configs/db.config.js");
const productsEntity = require("../entities/products.entity.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const productImagesEntity = sequelize.define(
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
productsEntity.hasMany(productImagesEntity, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

productImagesEntity.belongsTo(productsEntity, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// productImagesEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = productImagesEntity;
