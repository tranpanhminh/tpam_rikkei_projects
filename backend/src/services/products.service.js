const bcrypt = require("bcryptjs");
const sourceImage = process.env.BASE_URL_IMAGE;

// Import Repo
const productsRepo = require("../repository/products.repository.js");

// ---------------------------------------------------------
class ProductsService {
  // 1. Get All Products
  async getAllProducts(req, res) {
    const listProducts = await productsRepo.getAllProducts();
    if (listProducts.length === 0) {
      return { data: [], status: 404 };
    } else {
      return { data: listProducts, status: 200 };
    }
  }

  // 2. Get All Products
  async getDetailProduct(productId) {
    const detailProduct = await productsRepo.getDetailProduct(productId);
    if (!detailProduct) {
      return { data: {}, status: 404 };
    } else {
      return { data: detailProduct, status: 200 };
    }
  }

  // 3. Add Product
  async addProduct(data, productImages) {
    const { name, description, price, quantity_stock, vendor_id } = data;

    // if (!name) {
    //   return { message: "Name must not be blank", status: 406 };
    // }
    // if (!description) {
    //   return { message: "Product description must not be blank", status: 406 };
    // }
    // if (!price) {
    //   return { message: "Product price must not be blank", status: 406 };
    // }
    // if (price < 0) {
    //   return { message: "Product price must not be < 0", status: 406 };
    // }
    // if (!quantity_stock) {
    //   return { message: "Product quantity must not be blank", status: 406 };
    // }
    // if (quantity_stock < 0) {
    //   return { message: "Product quantity must not be < 0", status: 406 };
    // }
    // if (!vendor_id) {
    //   return { message: "Please choose Vendor", status: 406 };
    // }

    const productInfo = {
      name: name,
      description: description,
      price: price,
      quantity_stock: quantity_stock,
      vendor_id: vendor_id,
      thumbnail_url: sourceImage + productImages[0].filename,
    };
    const newProduct = await productsRepo.addProduct(productInfo);

    for (let i = 0; i < productImages.length; i++) {
      const imagesInfo = {
        image_url: sourceImage + productImages[i].filename,
        product_id: newProduct.id,
      };

      await productsRepo.uploadProductImages(imagesInfo);
    }
    return { message: "Product Added", status: 200 };
  }

  // 4. Delete Product
  async deleteProduct(productId) {
    const findProduct = await productsRepo.findProductById(productId);
    if (!findProduct) {
      return { message: "Product ID Not Found", status: 404 };
    } else {
      await productsRepo.deleteProduct(productId);
      return { message: "Product Deleted", status: 200 };
    }
  }

  // 5. Update Product
  async updateProduct(productId, dataBody) {
    const { name, description, price, quantity_stock, vendor_id } = dataBody;

    const findProduct = await productsRepo.findProductById(productId);

    if (!findProduct) {
      return { message: "Product ID Not Found", status: 404 };
    }
    const dataProduct = findProduct.dataValues;

    if (price < 0) {
      return { message: "Price must not be < 0", status: 406 };
    }

    if (quantity_stock < 0) {
      return { message: "Quantity Stock must not be < 0", status: 406 };
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
    const updatedProduct = await productsRepo.updateProduct(
      productInfo,
      productId
    );

    return { message: "Product Updated", status: 200 };
  }

  // 6. Update Product Image
  async updateProductImage(productId, imageId, newImage) {
    const findProduct = await productsRepo.findProductById(productId);
    if (!findProduct) {
      return { message: "Product ID Not Found", status: 404 };
    }
    const findImage = await productsRepo.findImageById(imageId);
    if (!findImage) {
      return { message: "Image ID Not Found", status: 404 };
    }
    const imageInfor = {
      image_url: sourceImage + newImage,
      updated_at: Date.now(),
    };
    const updatedImage = await productsRepo.updateProductImage(
      imageInfor,
      imageId
    );
    return { message: "Update Image Successfully", status: 200 };
  }

  // 7. Change Thumbnail
  async changeThumbnail(productId, imageId) {
    const findProduct = await productsRepo.findProductById(productId);

    if (!findProduct) {
      return { message: "Product ID Not Found", status: 404 };
    }

    const findImage = await productsRepo.findImageById(imageId);
    if (!findImage) {
      return { message: "Image ID Not Found", status: 404 };
    }

    const dataImage = findImage.dataValues;

    const thumbnailInfo = {
      thumbnail_url: dataImage.image_url,
    };

    const updatedThumbnail = await productsRepo.updateThumbnail(
      thumbnailInfo,
      productId
    );
    return { message: "Update Thumbnail Successfully", status: 200 };
  }
}

module.exports = new ProductsService();
