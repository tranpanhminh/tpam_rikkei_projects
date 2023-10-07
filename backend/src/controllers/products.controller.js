const connectMySQL = require("../configs/db.config.js");
const { Op, col, fn } = require("sequelize");
const sequelize = require("sequelize");
const productsModel = require("../models/products.model.js");
const postTypesModel = require("../models/postTypes.model.js");
const vendorsModel = require("../models/vendors.model.js");
const productImagesModel = require("../models/productImages.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class ProductsController {
  // 1. Get All Products
  async getAllProducts(req, res) {
    try {
      const listProducts = await productsModel.findAll({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "quantity_stock",
          "created_at",
          "updated_at",
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
            model: postTypesModel,
            attributes: ["name"],
          },
          {
            model: vendorsModel,
            attributes: ["name"],
          },
          {
            model: productImagesModel,
            attributes: [],
          },
        ],
        group: ["products.id", "products.name"],
        raw: true,
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
      const detailProduct = await productsModel.findOne({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "quantity_stock",
          "created_at",
          "updated_at",
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
            model: postTypesModel,
            attributes: ["name"],
          },
          {
            model: vendorsModel,
            attributes: ["name"],
          },
          {
            model: productImagesModel,
            attributes: [],
          },
        ],

        // Lọc theo id của dịch vụ
        where: { id: productId },

        group: ["products.id", "products.name"],
        raw: true,
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
    console.log(req.files, "REQFILESSSSS");
    try {
      const productInfo = {
        name: name,
        description: description,
        price: price,
        quantity_stock: quantity_stock,
        vendor_id: vendor_id,
      };
      console.log(productInfo, "productInfo");
      const newProduct = await productsModel.create(productInfo);
      res.status(200).json({ message: "Product Added", data: newProduct });

      for (let i = 0; i < req.files.length; i++) {
        await productImagesModel.create({
          image_url: req.files[i].filename,
          product_id: newProduct.id,
        });
      }
      res.status(200).json({ message: "Images Added", data: newImages });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 4. Delete Payment
  async deleteProduct(req, res) {
    try {
      const productId = req.params.productId;
      const findProduct = await productsModel.findOne({
        where: { id: productId },
      });
      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      } else {
        const deleteProduct = await productsModel.destroy({
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
      const productId = req.params.productId;
      const findProduct = await productsModel.findOne({
        where: { id: productId },
      });

      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      }
      const dataService = findProduct.dataValues;

      if (price < 0) {
        return res.status(406).json({ message: "Price must not be < 0" });
      }

      const serviceInfo = {
        name: !name ? dataService.name : name,
        description: !description ? dataService.description : description,
        price: !price ? dataService.price : price,
        morning_time: !morning_time ? dataService.morning_time : morning_time,
        afternoon_time: !afternoon_time
          ? dataService.afternoon_time
          : afternoon_time,
        service_image: !req.file
          ? dataService.service_image
          : req.file.filename,
        updated_at: Date.now(),
      };
      console.log(serviceInfo, "serviceInfo");
      const updatedService = await servicesModel.update(serviceInfo, {
        where: { id: serviceId },
      });
      return res
        .status(200)
        .json({ message: "Service Updated", dateUpdated: updatedService });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new ProductsController();
