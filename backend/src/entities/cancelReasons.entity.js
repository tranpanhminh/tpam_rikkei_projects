const sequelize = require("../configs/db.config.js");
const { DataTypes } = require("sequelize");

// ---------------------------------------------------------

const cancelReasonsEntity = sequelize.define(
  "cancel_reasons",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE, // Sử dụng kiểu dữ liệu DATE thay thế
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE, // Sử dụng kiểu dữ liệu DATE thay thế
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// cancelReasonsEntity.sync().then(() => {
//   console.log("OK");
// });

module.exports = cancelReasonsEntity;
