const cartsService = require("../services/carts.service.js");

// ---------------------------------------------------------
class CartsController {
  // 1. Get All Carts
  async getAllCarts(req, res) {
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
    const result = await cartsService.deleteProductFromCart(userId, productId);
    res.status(result.status).json(result.message);
  }

  // 5. Delete All Products From Cart
  async deleteAllProductsFromCart(req, res) {
    const userId = req.params.userId;
    const authHeader = req.header("Authorization");
    const result = await cartsService.deleteAllProductsFromCart(
      userId,
      authHeader
    );
    res.status(result.status).json(result);
  }

  // 6. Update Cart (Update Quantity From Cart Page)
  async updateCart(req, res) {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;
    const authHeader = req.header("Authorization");
    const result = await cartsService.updateCart(
      userId,
      productId,
      quantity,
      authHeader
    );
    res.status(result.status).json(result);
  }
}
module.exports = new CartsController();
