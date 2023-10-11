const connectMySQL = require("../configs/db.config.js");
const ordersEntity = require("../entities/orders.entity.js");
const orderItemsEntity = require("../entities/orderItems.entity.js");
const productsEntity = require("../entities/products.entity.js");
const usersEntity = require("../entities/users.entity.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class OrderItemsController {}
module.exports = new OrderItemsController();
