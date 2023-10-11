const connectMySQL = require("../configs/db.config.js");
const productImagesEntity = require("../entities/productImages.entity.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class ProductImagesController {
  // 1. Get All Product Images
  async getAllProductImages(req, res) {
    try {
      const listAllProductImages = await productImagesEntity.findAll(); // include: <Tên bảng>
      res.status(200).json(listAllProductImages);
      console.log(listAllProductImages, "listAllProductImages");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new ProductImagesController();
