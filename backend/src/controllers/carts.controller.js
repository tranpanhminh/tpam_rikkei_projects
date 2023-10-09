const connectMySQL = require("../configs/db.config.js");
const cartsModel = require("../models/carts.model.js");
const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const usersModel = require("../models/users.model.js");
const productsModel = require("../models/products.model.js");

// ---------------------------------------------------------
class CartsController {
  // 1. Get All Carts
  async getAllCarts(req, res) {
    try {
      // const listCarts = await cartsModel.findAll();
      const listCarts = await cartsModel.findAll({
        attributes: [
          "id",
          "user_id",
          "product_id",
          "quantity",
          "price",
          "created_at",
          "updated_at",
        ],
        include: [
          {
            model: usersModel,
            attributes: ["email"],
          },
          {
            model: productsModel,
            attributes: ["thumbnail_url"],
          },
        ],
        group: ["id"],
        raw: true,
      });

      res.status(200).json(listCarts);
      console.log(listCarts, "listCarts");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Cart By User
  async getDetailCart(req, res) {
    const userId = req.params.userId;
    try {
      const detailUserCart = await cartsModel.findAll({
        attributes: [
          "id",
          "user_id",
          "product_id",
          "quantity",
          "price",
          "created_at",
          "updated_at",
        ],
        include: [
          {
            model: usersModel,
            attributes: ["email"],
          },
          {
            model: productsModel,
            attributes: ["thumbnail_url"],
          },
        ],
        where: { user_id: userId },
        group: ["id"],
        raw: true,
      });
      if (detailUserCart.length === 0) {
        return res
          .status(404)
          .json({ message: "This User ID Has No Products In Cart" });
      } else {
        return res.status(200).json(detailUserCart);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Product To Cart
  async addCart(req, res) {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;
    try {
      // Check Login
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        res.status(401).json({ message: "Please login to buy product" });
      }

      // Check Product
      const findProduct = await productsModel.findOne({
        where: { id: productId },
      });
      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      }
      const dataProduct = findProduct.dataValues;
      console.log(dataProduct, "dataProduct");

      // /**
      // User Status:
      // 1. Active
      // 2. Inactive

      // Role:
      // 1. Super Admin
      // 2. Admin
      // 3. Customer
      // */

      // Check User
      const findUser = await usersModel.findOne({ where: { id: userId } });
      if (!findUser) {
        return res.status(404).json({ message: "User ID Not Found" });
      }

      const dataUser = findUser.dataValues;
      if (dataUser.role_id === 1 || dataUser.role_id === 2) {
        return res.status(406).json({ message: "Admin can't buy product" });
      }
      if (dataUser.status_id === 2) {
        return res.status(406).json({
          message: "You can't buy product because your account is Inactive",
        });
      }

      // Kiểm tra người dùng đã nhập vào số lượng cần mua chưa

      // Kiểm tra số lượng hàng tồn kho
      if (dataProduct.quantity_stock === 0) {
        return res.status(406).json({
          message: "This product is out of stock!",
        });
      }

      // Kiểm tra số lượng người dùng nhập vào và hàng tồn kho
      if (quantity > dataProduct.quantity_stock) {
        return res.status(406).json({
          message: "You can't buy more than product stock",
        });
      }

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      // 1. Trường hợp giỏ hàng trống và chưa có sản phẩm nào
      const cartInfo = {
        user_id: userId,
        product_id: productId,
        quantity: quantity,
        price: dataProduct.price,
      };

      const checkCart = await cartsModel.findAll({
        where: {
          user_id: userId,
        },
      });
      if (checkCart.length === 0) {
        const newCart = await cartsModel.create(cartInfo);
        res.status(200).json({ message: "Product Added", data: newCart });
      }

      // 2. Trường hợp người dùng đã có giỏ hàng, sản phẩm add vào đã tồn tại trong giỏ
      const checkExistProduct = await cartsModel.findOne({
        where: {
          user_id: userId,
          product_id: productId,
        },
      });
      if (!checkExistProduct) {
        const newProductToCart = await cartsModel.create(cartInfo);
        return res
          .status(200)
          .json({ message: "Product Added", data: newProductToCart });
      }

      const dataExistProduct = checkExistProduct.dataValues;
      const updatedExistProductInfo = {
        ...dataExistProduct,
        quantity: dataExistProduct.quantity + quantity,
      };
      const updatedExistProduct = await cartsModel.update(
        updatedExistProductInfo,
        {
          where: {
            user_id: userId,
            product_id: productId,
          },
        }
      );

      res
        .status(200)
        .json({ message: "Product Added", data: updatedExistProduct });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Product From Cart
  async deleteProductFromCart(req, res) {
    const userId = req.params.userId;
    const productId = req.params.productId;
    try {
      // Check Login
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        res.status(401).json({ message: "Please login" });
      }

      // /**
      // User Status:
      // 1. Active
      // 2. Inactive

      // Role:
      // 1. Super Admin
      // 2. Admin
      // 3. Customer
      // */

      const deleteProduct = await cartsModel.destroy({
        where: { user_id: userId, product_id: productId },
      });
      if (!deleteProduct) {
        return res
          .status(404)
          .json({ message: "Product ID Not Found In Cart" });
      }
      return res.status(200).json({ message: "Product Deleted From Cart" });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Delete Coupon
  async deleteAllProductsFromCart(req, res) {
    const userId = req.params.userId;
    try {
      // Check Login
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        res.status(401).json({ message: "Please login" });
      }

      // /**
      // User Status:
      // 1. Active
      // 2. Inactive

      // Role:
      // 1. Super Admin
      // 2. Admin
      // 3. Customer
      // */

      const deleteAllProducts = await cartsModel.destroy({
        where: { user_id: userId },
      });
      if (!deleteAllProducts) {
        return res.status(404).json({ message: "User ID Not Found" });
      }
      return res
        .status(200)
        .json({ message: "All Products Deleted From Cart" });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Coupon
  async updateCart(req, res) {
    const { name, code, discount_rate, min_bill } = req.body;
    try {
      const cartId = req.params.cartId;
      const findCoupon = await cartsModel.findOne({
        where: { id: cartId },
      });
      if (!findCoupon) {
        return res.status(404).json({ message: "Coupon ID Not Found" });
      }
      const dataCoupon = findCoupon.dataValues;

      if (discount_rate < 0) {
        return res.status(406).json({
          message: "Discount rate must > 0",
        });
      }
      if (min_bill < 0) {
        return res.status(406).json({
          message: "Min Bill must > 0",
        });
      }

      const couponInfo = {
        name: !name ? dataCoupon.name : name,
        code: !code ? dataCoupon.code : code,
        discount_rate: !discount_rate
          ? dataCoupon.discount_rate
          : discount_rate,
        min_bill: !min_bill ? dataCoupon.min_bill : min_bill,
        updated_at: Date.now(),
      };

      const updatedCoupon = await cartsModel.update(couponInfo, {
        where: { id: cartId },
      });
      return res
        .status(200)
        .json({ message: "Coupon Updated", dateUpdated: updatedCoupon });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new CartsController();
