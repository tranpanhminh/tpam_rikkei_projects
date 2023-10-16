const sequelize = require("sequelize");
const productsEntity = require("../entities/products.entity.js");
const orderItemsEntity = require("../entities/orderItems.entity.js");
const orderStatusesEntity = require("../entities/orderStatuses.entity.js");

// ---------------------------------------------------------
class OrderItemsRepo {
  // 1. Get All
  async getAllItemsByOrderId(orderId) {
    const listOrderItems = await orderStatusesEntity.findAll({
      where: { order_id: orderId },
    });
    return listOrderItems;
  }

  // 2. Report Order Items
  async reportOrderItems() {
    const reportOrderItems = await orderItemsEntity.findAll({
      attributes: [
        "product_id",
        [sequelize.col("product.name"), "name"],
        [sequelize.col("product.thumbnail_url"), "thumbnail_url"],
        [sequelize.col("product.price"), "price"],
        [sequelize.fn("COUNT", sequelize.col("product_id")), "sold_count"],
        [sequelize.fn("SUM", sequelize.col("quantity")), "total_quantity_sold"],
      ],
      include: [
        {
          model: productsEntity,
          required: true,
        },
      ],
      order: [sequelize.literal("sold_count DESC")],
      group: ["product_id"],
    });
    return reportOrderItems;
  }
}

module.exports = new OrderItemsRepo();
