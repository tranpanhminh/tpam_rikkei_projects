const cartsEntity = require("../entities/carts.entity.js");
const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const usersEntity = require("../entities/users.entity.js");
const productsEntity = require("../entities/products.entity.js");

// ---------------------------------------------------------
class CartsController {
  // 1. Get All Carts
  async getAllCarts(req, res) {
    try {
      // const listCarts = await cartsEntity.findAll();
      const listCarts = await cartsEntity.findAll({
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
            model: usersEntity,
            attributes: ["email"],
          },
          {
            model: productsEntity,
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
      const detailUserCart = await cartsEntity.findAll({
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
            model: usersEntity,
            attributes: ["email"],
          },
          {
            model: productsEntity,
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
      const findProduct = await productsEntity.findOne({
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
      const findUser = await usersEntity.findOne({ where: { id: userId } });
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
      if (!quantity) {
        return res
          .status(406)
          .json({ message: "Min quantity to buy must be 1" });
      }

      // Kiểm tra số lượng hàng tồn kho
      if (dataProduct.quantity_stock === 0) {
        return res.status(406).json({
          message: "This product is out of stock!",
        });
      }

      // Kiểm tra số lượng người dùng nhập vào và hàng tồn kho
      if (quantity > dataProduct.quantity_stock) {
        return res.status(406).json({
          message: `You can't add more than product stocks: ${dataProduct.quantity_stock}`,
        });
      }

      // Kiểm tra số lượng mà người dùng đã thêm trước đó và số lượng mới
      const checkUserCart = await cartsEntity.findOne({
        where: {
          user_id: userId,
          product_id: productId,
        },
      });
      if (!checkUserCart) {
        const cartInfo = {
          user_id: userId,
          product_id: productId,
          quantity: quantity,
          price: dataProduct.price,
        };

        const newCart = await cartsEntity.create(cartInfo);
        res.status(200).json({ message: "Product Added", data: newCart });
      }
      const dataUserCart = checkUserCart.dataValues;
      const updatedQuantity = dataUserCart.quantity + quantity;
      if (updatedQuantity > dataProduct.quantity_stock) {
        return res.status(406).json({
          message: `You can't add more than product stocks: ${dataProduct.quantity_stock}, you have added ${dataUserCart.quantity} product to cart before`,
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

      const checkCart = await cartsEntity.findAll({
        where: {
          user_id: userId,
        },
      });
      if (checkCart.length === 0) {
        const newCart = await cartsEntity.create(cartInfo);
        res.status(200).json({ message: "Product Added", data: newCart });
      }

      // 2. Trường hợp người dùng đã có giỏ hàng, sản phẩm add vào đã tồn tại trong giỏ
      const checkExistProduct = await cartsEntity.findOne({
        where: {
          user_id: userId,
          product_id: productId,
        },
      });
      if (!checkExistProduct) {
        const newProductToCart = await cartsEntity.create(cartInfo);
        return res
          .status(200)
          .json({ message: "Product Added", data: newProductToCart });
      }

      const dataExistProduct = checkExistProduct.dataValues;
      const updatedExistProductInfo = {
        ...dataExistProduct,
        quantity: dataExistProduct.quantity + quantity,
      };
      const updatedExistProduct = await cartsEntity.update(
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

      const deleteProduct = await cartsEntity.destroy({
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

  // 5. Delete All Products From Cart
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

      const deleteAllProducts = await cartsEntity.destroy({
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

  // 5. Update Cart (Update Quantity From Cart Page)
  async updateCart(req, res) {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;
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

      // Check Product
      const findProduct = await productsEntity.findOne({
        where: { id: productId },
      });
      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      }
      const dataProduct = findProduct.dataValues;
      console.log(dataProduct, "dataProduct");

      // Check Product From Cart
      const findProductFromCart = await cartsEntity.findOne({
        where: { user_id: userId, product_id: productId },
      });
      if (!findProductFromCart) {
        return res
          .status(404)
          .json({ message: "Not Found Product ID From Cart of this User ID" });
      }

      if (!quantity) {
        return res
          .status(406)
          .json({ message: "Min quantity to buy must be 1" });
      }

      const dataProductFromCart = findProductFromCart.dataValues;

      const newQuantity = quantity;
      console.log(newQuantity, "NEW QUANTITY ");
      // Check số lượng mới so với số lượng hàng tồn kho
      if (newQuantity > dataProduct.quantity_stock) {
        return res.status(406).json({
          message: `You can't add more than product stock: ${dataProduct.quantity_stock}, you have typed ${newQuantity} products`,
        });
      }
      const updatedProductInfo = {
        ...dataProductFromCart,
        quantity: newQuantity,
      };
      const updatedProduct = await cartsEntity.update(updatedProductInfo, {
        where: {
          user_id: userId,
          product_id: productId,
        },
      });
      return res.status(200).json({
        message: "Product Quantity Updated",
        dataUpdate: updatedProduct,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new CartsController();
