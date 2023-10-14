const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const cartsEntity = require("../entities/carts.entity.js");
const usersEntity = require("../entities/users.entity.js");
const productsEntity = require("../entities/products.entity.js");

class CartsRepo {
  async findOneByEmail(email) {
    const findEmail = await usersEntity.findOne({ where: { email: email } });
    return findEmail;
  }

  async findUserId(userId) {
    const findUser = await usersEntity.findOne({ where: { id: userId } });
    return findUser;
  }

  async findProductId(productId) {
    const findProduct = await productsEntity.findOne({
      where: { id: productId },
    });
    return findProduct;
  }

  // 1. Get All Carts
  async getAllCarts() {
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
          attributes: ["name", "thumbnail_url"],
        },
      ],
      group: ["id"],
      // raw: true,
    });

    return listCarts;
  }

  // 2. Get Detail Cart By User
  async getDetailCart(userId) {
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
          attributes: ["name", "thumbnail_url"],
        },
      ],
      where: { user_id: userId },
      group: ["id"],
      // raw: true,
    });
    return detailUserCart;
  }

  // 3. Add To Cart

  // 3.1 Kiểm tra Cart của User
  async checkUserCart(userId, productId) {
    const checkUserCart = await cartsEntity.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
    return checkUserCart;
  }

  // 3.2. Thêm vào giỏ hàng
  async newCart(cartInfo) {
    const newCart = await cartsEntity.create(cartInfo);
    return newCart;
  }

  // 3.3. Trường hợp giỏ hàng trống và chưa có sản phẩm nào
  async checkCart(userId) {
    const checkCart = await cartsEntity.findAll({
      where: {
        user_id: userId,
      },
    });
    return checkCart;
  }

  // 3.4. Trường hợp người dùng đã có giỏ hàng, sản phẩm add vào đã tồn tại trong giỏ
  async checkExistProduct() {
    const checkExistProduct = await cartsEntity.findOne({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
  }

  // 3.5. Sản phẩm đã add vào rồi và tiếp tục add thêm n sản phẩm nữa
  async updatedExistProduct(updatedExistProductInfo, userId, productId) {
    const updatedExistProduct = await cartsEntity.update(
      updatedExistProductInfo,
      {
        where: {
          user_id: userId,
          product_id: productId,
        },
      }
    );
    return updatedExistProduct;
  }

  // 4. Delete Product From Cart
  async deleteProductFromCart(userId, productId) {
    const deleteProduct = await cartsEntity.destroy({
      where: { user_id: userId, product_id: productId },
    });
    return deleteProduct;
  }

  // 5. Delete All Products From Cart
  async deleteAllProductsFromCart(userId) {
    const deleteAllProducts = await cartsEntity.destroy({
      where: { user_id: userId },
    });
    return deleteAllProducts;
  }

  // 6. Update Cart
  async updateCart(updatedProductInfo, userId, productId) {
    const updatedProduct = await cartsEntity.update(updatedProductInfo, {
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
    return updatedProduct;
  }
}

module.exports = new CartsRepo();
