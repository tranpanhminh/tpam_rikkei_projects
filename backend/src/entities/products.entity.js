const sequelize = require("../configs/db.config.js");
const vendorsEntity = require("./vendors.entity.js");
const postTypesEntity = require("./postTypes.entity.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const productsEntity = sequelize.define(
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
vendorsEntity.hasMany(productsEntity, {
  foreignKey: "vendor_id",
  onDelete: "NO ACTION",
});

productsEntity.belongsTo(vendorsEntity, {
  foreignKey: "vendor_id",
  onDelete: "NO ACTION",
});

// Mối quan hệ khóa ngoại giữa Products và Post Types
postTypesEntity.hasMany(productsEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

productsEntity.belongsTo(postTypesEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// productsEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = productsEntity;
