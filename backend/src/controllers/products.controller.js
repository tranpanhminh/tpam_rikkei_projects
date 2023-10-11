const connectMySQL = require("../configs/db.config.js");
const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const productsEntity = require("../entities/products.entity.js");
const productCommentsEntity = require("../entities/productComments.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");
const vendorsEntity = require("../entities/vendors.entity.js");
const productImagesEntity = require("../entities/productImages.entity.js");
const productCommentsController = require("../controllers/productComments.controller.js");
const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;

// Import Service
const productsService = require("../services/products.service.js");

// ---------------------------------------------------------
class ProductsController {
  // 1. Get All Products
  async getAllProducts(req, res) {
    const result = await productsService.getAllProducts();
    return res.status(result.status).json(result.data);
  }
  // 2. Get Detail Product
  async getDetailProduct(req, res) {
    const productId = req.params.productId;
    const result = await productsService.getDetailProduct(productId);
    return res.status(result.status).json(result.data);
  }

  // 3. Add Payment
  async addProduct(req, res) {
    const data = req.body;
    const productImages = req.files;
    const result = await productsService.addProduct(data, productImages);
    return res.status(result.status).json(result.data);
  }

  // 4. Delete Product
  async deleteProduct(req, res) {
    const productId = req.params.productId;
    const result = await productsService.deleteProduct(productId);
    return res.status(result.status).json(result.data);
  }

  // 5. Update Product
  async updateProduct(req, res) {
    const productId = req.params.productId;
    const dataBody = req.body;
    const result = await productsService.updateProduct(productId, dataBody);
    return res.status(result.status).json(result.data);
  }

  // 6. Update Product Image
  async updateProductImage(req, res) {
    const productId = req.params.productId;
    const imageId = req.params.imageId;
    const newImage = req.file.filename;
    const result = await productsService.updateProductImage(
      productId,
      imageId,
      newImage
    );
    return res.status(result.status).json(result.data);
  }

  // 7. Change Thumbnail
  async changeThumbnail(req, res) {
    const productId = req.params.productId;
    const imageId = req.params.imageId;
    const result = await productsService.changeThumbnail(productId, imageId);
    return res.status(result.status).json(result.data);
  }
}
module.exports = new ProductsController();
