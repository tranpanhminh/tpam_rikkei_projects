const connectMySQL = require("../configs/db.config.js");
const ordersModel = require("../models/orders.model.js");
const orderItemsModel = require("../models/orderItems.model.js");
const productsModel = require("../models/products.model.js");
const usersModel = require("../models/users.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class OrderItemsController {}
module.exports = new OrderItemsController();
