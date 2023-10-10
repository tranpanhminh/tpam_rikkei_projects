const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");
const usersModel = require("./users.model.js");
const postTypesModel = require("./postTypes.model.js");
const productsModel = require("./products.model.js");

// ---------------------------------------------------------

const productCommentsModel = sequelize.define(
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
usersModel.hasMany(productCommentsModel, {
  foreignKey: "user_id",
});

productCommentsModel.belongsTo(usersModel, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Mối quan hệ giữa Post Type và Product Comment
postTypesModel.hasMany(productCommentsModel, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});
productCommentsModel.belongsTo(postTypesModel, {
  foreignKey: "post_type_id",
  onDelete: "NO ACTION",
});

// Mối quan hệ giữa Product và Product Comment
productsModel.hasMany(productCommentsModel, {
  foreignKey: "post_id",
});
productCommentsModel.belongsTo(productsModel, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

productCommentsModel.sync().then(() => {
  console.log("OK");
});

module.exports = productCommentsModel;
