const connectMySQL = require("../configs/db.config.js");
const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const productsEntity = require("../entities/products.entity.js");
const productCommentsEntity = require("../entities/productComments.entity.js");
const postTypesEntity = require("../entities/postTypes.entity.js");
const vendorsEntity = require("../entities/vendors.entity.js");
const usersEntity = require("../entities/vendors.entity.js");
const productImagesEntity = require("../entities/productImages.entity.js");
const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;

// ---------------------------------------------------------

class ProductsRepo {
  // Find Product By Id
  async findProductById(productId) {
    const findProduct = await productsEntity.findOne({
      where: { id: productId },
    });
    return findProduct;
  }

  // Find Product By Id
  async findImageById(imageId) {
    const findImage = await productImagesEntity.findOne({
      where: { id: imageId },
    });
    return findImage;
  }

  // 1. Get All Products
  async getAllProducts(req, res) {
    const listProducts = await productsEntity.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "quantity_stock",
        "thumbnail_url",
        "vendor_id",
        "post_type_id",
        "created_at",
        "updated_at",
        [
          sequelize.literal(
            `IFNULL((SELECT ROUND(AVG(rating), 1) FROM product_comments WHERE product_comments.post_id = products.id AND product_comments.user_role_id NOT IN (1, 2)), 0)`
          ),
          "avg_rating",
        ],
        [
          sequelize.fn(
            "JSON_ARRAYAGG",
            sequelize.fn(
              "JSON_OBJECT",
              "id",
              col("product_images.id"),
              "image_url",
              col("product_images.image_url")
            )
          ),
          "image_url",
        ],
        // [
        //   sequelize.fn(
        //     "JSON_ARRAYAGG",
        //     sequelize.fn(
        //       "JSON_OBJECT",
        //       "id",
        //       col("product_comments.id"),
        //       "comment",
        //       col("product_comments.comment")
        //     )
        //   ),
        //   "comment",
        // ],
      ],
      include: [
        {
          model: postTypesEntity,
          attributes: ["name"],
        },
        {
          model: vendorsEntity,
          attributes: ["name"],
        },
        {
          model: productImagesEntity,
          attributes: [],
        },
      ],
      group: ["products.id", "products.name"],
      // raw: true,
    });

    return listProducts;
  }

  // 2. Get Detail Product
  async getDetailProduct(productId) {
    const detailProduct = await productsEntity.findOne({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "quantity_stock",
        "thumbnail_url",
        "vendor_id",
        "post_type_id",
        "created_at",
        "updated_at",
        [
          sequelize.literal(
            `IFNULL((SELECT ROUND(AVG(rating), 1) FROM product_comments WHERE product_comments.post_id = products.id AND product_comments.user_role_id NOT IN (1, 2)), 0)`
          ),
          "avg_rating",
        ],
        [
          sequelize.fn(
            "JSON_ARRAYAGG",
            sequelize.fn(
              "JSON_OBJECT",
              "id",
              col("product_images.id"),
              "image_url",
              col("product_images.image_url")
            )
          ),
          "image_url",
        ],
      ],
      include: [
        {
          model: postTypesEntity,
          attributes: ["name"],
        },
        {
          model: vendorsEntity,
          attributes: ["name"],
        },
        {
          model: productImagesEntity,
          attributes: [],
        },
      ],
      // Lọc theo id của dịch vụ
      where: { id: productId },
      group: ["products.id", "products.name"],
      // raw: true,
    });

    return detailProduct;
  }

  // 3. Add Product
  async addProduct(productInfo) {
    const newProduct = await productsEntity.create(productInfo);
    return newProduct;
  }

  // 3.1. Upload Image to product
  async uploadProductImages(imagesInfo) {
    const uploadImages = await productImagesEntity.create(imagesInfo);
    return uploadImages;
  }

  // 4. Delete Product
  async deleteProduct(productId) {
    const deleteProduct = await productsEntity.destroy({
      where: { id: productId },
    });
    return deleteProduct;
  }

  // 5. Update Product
  async updateProduct(productInfo, productId) {
    const updatedProduct = await productsEntity.update(productInfo, {
      where: { id: productId },
    });
    return updatedProduct;
  }

  // 6. Update Product Image
  async updateProductImage(imageInfor, imageId) {
    const updatedImage = await productImagesEntity.update(imageInfor, {
      where: { id: imageId },
    });
    return updatedImage;
  }

  // 7. Update Thumbnail
  async updateThumbnail(thumbnailInfo, productId) {
    const updateThumbnail = await productsEntity.update(thumbnailInfo, {
      where: { id: productId },
    });
    return updateThumbnail;
  }
}

module.exports = new ProductsRepo();
