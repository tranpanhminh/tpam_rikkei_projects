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

// ---------------------------------------------------------
class ProductsController {
  // 1. Get All Products
  async getAllProducts(req, res) {
    try {
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

      res.status(200).json(listProducts);
      console.log(listProducts, "listProducts");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
  // 2. Get Detail Product
  async getDetailProduct(req, res) {
    try {
      const productId = req.params.productId;
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
      if (!detailProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      } else {
        return res.status(200).json(detailProduct);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 3. Add Payment
  async addProduct(req, res) {
    const { name, description, price, quantity_stock, vendor_id } = req.body;
    try {
      const productInfo = {
        name: name,
        description: description,
        price: price,
        quantity_stock: quantity_stock,
        vendor_id: vendor_id,
        thumbnail_url: sourceImage + req.files[0].filename,
      };
      console.log(productInfo, "productInfo");
      const newProduct = await productsEntity.create(productInfo);

      for (let i = 0; i < req.files.length; i++) {
        await productImagesEntity.create({
          image_url: sourceImage + req.files[i].filename,
          product_id: newProduct.id,
        });
      }
      res.status(200).json({ message: "Product Added", data: newProduct });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Payment
  async deleteProduct(req, res) {
    try {
      const productId = req.params.productId;
      const findProduct = await productsEntity.findOne({
        where: { id: productId },
      });
      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      } else {
        const deleteProduct = await productsEntity.destroy({
          where: { id: productId },
        });
        return res
          .status(200)
          .json({ message: "Product Deleted", dataDeleted: findProduct });
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 5. Update Payment
  async updateProduct(req, res) {
    const { name, description, price, quantity_stock, vendor_id } = req.body;
    try {
      console.log(name, "NAME");
      const productId = req.params.productId;
      const findProduct = await productsEntity.findOne({
        where: { id: productId },
      });

      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      }
      const dataProduct = findProduct.dataValues;

      if (price < 0) {
        return res.status(406).json({ message: "Price must not be < 0" });
      }

      if (quantity_stock < 0) {
        return res
          .status(406)
          .json({ message: "Quantity Stock must not be < 0" });
      }

      const productInfo = {
        name: !name ? dataProduct.name : name,
        description: !description ? dataProduct.description : description,
        price: !price ? dataProduct.price : price,
        quantity_stock: !quantity_stock
          ? dataProduct.quantity_stock
          : quantity_stock,
        vendor_id: !vendor_id ? dataProduct.vendor_id : vendor_id,
        updated_at: Date.now(),
      };
      console.log(productInfo, "productInfo");
      const updatedProduct = await productsEntity.update(productInfo, {
        where: { id: productId },
      });
      return res
        .status(200)
        .json({ message: "Product Updated", dataUpdated: updatedProduct });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 6. Update Product Image
  async updateProductImage(req, res) {
    const productId = req.params.productId;
    const imageId = req.params.imageId;
    try {
      const findProduct = await productsEntity.findOne({
        where: { id: productId },
      });
      if (!findProduct) {
        res.status(404).json({ message: "Product ID Not Found" });
      }
      const findImage = await productImagesEntity.findOne({
        where: { id: imageId },
      });
      if (!findImage) {
        res.status(404).json({ message: "Image ID Not Found" });
      }
      console.log(req.file.filename, "ADSDASDSA");
      const imageInfor = {
        image_url: sourceImage + req.file.filename,
        updated_at: Date.now(),
      };
      const updatedImage = await productImagesEntity.update(imageInfor, {
        where: { id: imageId },
      });
      res.status(200).json({
        message: "Update Image Successfully",
        dataUpdated: updatedImage,
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 7. Change Thumbnail
  async changeThumbnail(req, res) {
    const productId = req.params.productId;
    const imageId = req.params.imageId;
    const findProduct = await productsEntity.findOne({
      where: { id: productId },
    });

    if (!findProduct) {
      return res.status(404).json({ message: "Product ID Not Found" });
    }

    const findImage = await productImagesEntity.findOne({
      where: { id: imageId },
    });

    if (!findImage) {
      return res.status(404).json({ message: "Image ID Not Found" });
    }

    const dataImage = findImage.dataValues;

    const thumbnailInfo = {
      thumbnail_url: dataImage.image_url,
    };

    const updatedThumbnail = await productsEntity.update(thumbnailInfo, {
      where: { id: productId },
    });
    return res
      .status(200)
      .json({ message: "Thumbnail Changed", dataUpdated: updatedThumbnail });
  }
}
module.exports = new ProductsController();
