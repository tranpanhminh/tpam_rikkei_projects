const cartsService = require("../services/carts.service.js");

// ---------------------------------------------------------
class CartsController {
  // 1. Get All Carts
  async getAllCarts(req, res) {
    console.log("ASDSADS");
    const result = await cartsService.getAllCarts();
    res.status(result.status).json(result.data);
  }

  // 2. Get Detail Cart By User
  async getDetailCart(req, res) {
    const userId = req.params.userId;
    const result = await cartsService.getDetailCart(userId);
    res.status(result.status).json(result.data);
  }

  // 3. Add Product To Cart
  async addCart(req, res) {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;
    const authHeader = req.header("Authorization");

    const result = await cartsService.addCart(
      userId,
      productId,
      quantity,
      authHeader
    );
    res.status(result.status).json(result);
  }

  // 4. Delete Product From Cart
  async deleteProductFromCart(req, res) {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const authHeader = req.header("Authorization");
    const result = await cartsService.deleteProductFromCart(
      userId,
      productId,
      authHeader
    );
    res.status(result.status).json(result.data);
  }

  // 5. Delete All Products From Cart
  async deleteAllProductsFromCart(req, res) {
    const userId = req.params.userId;
    const authHeader = req.header("Authorization");
    const result = await cartsService.deleteProductFromCart(userId, authHeader);
    res.status(result.status).json(result.data);
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
