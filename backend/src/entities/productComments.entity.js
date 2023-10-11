const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const usersEntity = require("./users.entity.js");
const postTypesEntity = require("./postTypes.entity.js");
const productsEntity = require("./products.entity.js");

// ---------------------------------------------------------

const productCommentsEntity = sequelize.define(
  "product_comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    post_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_role_id: {
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
    timestamps: false, // Bỏ đi các trường timestamps
  }
);

// Mối quan hệ giữa User và Product Comment
usersEntity.hasMany(productCommentsEntity, {
  foreignKey: "user_id",
});

productCommentsEntity.belongsTo(usersEntity, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Mối quan hệ giữa Post Type và Product Comment
postTypesEntity.hasMany(productCommentsEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});
productCommentsEntity.belongsTo(postTypesEntity, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// Mối quan hệ giữa Product và Product Comment
productsEntity.hasMany(productCommentsEntity, {
  foreignKey: "post_id",
});
productCommentsEntity.belongsTo(productsEntity, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// productCommentsEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = productCommentsEntity;
