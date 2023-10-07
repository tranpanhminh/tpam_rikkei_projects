const connectMySQL = require("../configs/db.config.js");
const productsModel = require("../models/products.model.js");
const productImagesModel = require("../models/productImages.model.js");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------
class ProductsController {
  // 1. Get All Payments
  async getAllProducts(req, res) {
    try {
      const listProducts = await productsModel.findAll(); // include: <Tên bảng>
      res.status(200).json(listProducts);
      console.log(listProducts, "listProducts");
    } catch (error) {
      console.log(error, "ERROR");
    }
  }

  // 2. Get Detail Payment
  async getDetailProduct(req, res) {
    try {
      const productId = req.params.productId;
      const detailProduct = await productsModel.findOne({
        where: { id: productId },
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
    const { cardholder_name, card_number, expiry_date, cvv, balance } =
      req.body;
    try {
      const productId = req.params.productId;
      const findProduct = await paymentsModel.findOne({
        where: { id: productId },
      });

      if (!findProduct) {
        return res.status(404).json({ message: "Product ID Not Found" });
      }
      const dataProduct = findProduct.dataValues;

      if (card_number.toString().length !== 16) {
        return res
          .status(406)
          .json({ message: "Card Number length must = 16" });
      }

      if (cvv.toString().length !== 3) {
        return res.status(406).json({ message: "CVV length must = 3" });
      }
      if (balance < 0) {
        return res.status(406).json({ message: "Balance must not be < 0" });
      }

      const paymentInfo = {
        cardholder_name: !cardholder_name
          ? dataPayment.cardholder_name
          : cardholder_name,
        card_number: !card_number ? dataPayment.card_number : card_number,
        expiry_date: !expiry_date ? dataPayment.expiry_date : expiry_date,
        cvv: !cvv ? dataPayment.cvv : cvv,
        balance: !balance ? dataPayment.balance : balance,
        updated_at: Date.now(),
      };

      const updatedPayment = await paymentsModel.update(paymentInfo, {
        where: { id: productId },
      });
      return res
        .status(200)
        .json({ message: "Payment Updated", dateUpdated: paymentInfo });
    } catch (error) {
      console.log(error, "ERROR");
    }
  }
}
module.exports = new ProductsController();
