const cartsRepo = require("../repository/carts.repository.js");

class CartsService {
  // 1. Get All Carts
  async getAllCarts() {
    const listCarts = await cartsRepo.getAllCarts();
    if (listCarts.length === 0) {
      return { data: "No Data Carts", status: 404 };
    } else {
      return { data: listCarts, status: 200 };
    }
  }

  // 2. Get Detail Cart By User
  async getDetailCart(userId) {
    const detailUserCart = await cartsRepo.getDetailCart(userId);
    if (detailUserCart.length === 0) {
      return { data: "This User ID Has No Products In Cart", status: 404 };
    } else {
      return {
        status: 200,
        data: detailUserCart,
      };
    }
  }

  // 3. Add To Cart
  async addCart(userId, productId, quantity, authHeader) {
    console.log(userId, ":ADSDASd");
    // Check Product
    const findProduct = await cartsRepo.findProductId(productId);
    if (!findProduct) {
      return { message: "Product ID Not Found", status: 404 };
    }
    const dataProduct = findProduct.dataValues;
    console.log(dataProduct, "dataProduct");

    // /**
    // User Status:
    // 1. Active
    // 2. Inactive

    // Role:
    // 1. Super Admin
    // 2. Admin
    // 3. Customer
    // */

    // Check User
    const findUser = await cartsRepo.findUserId(userId);
    if (!findUser) {
      return { message: "User ID Not Found", status: 404 };
    }

    const dataUser = findUser.dataValues;
    if (dataUser.role_id === 1 || dataUser.role_id === 2) {
      return { message: "Admin can't buy product", status: 406 };
    }
    if (dataUser.status_id === 2) {
      return {
        message: "You can't buy product because your account is Inactive",
        status: 406,
      };
    }

    // Kiểm tra người dùng đã nhập vào số lượng cần mua chưa
    if (!quantity) {
      return {
        message: "Min quantity to buy must be 1",
        status: 406,
      };
    }

    // Kiểm tra số lượng hàng tồn kho
    if (dataProduct.quantity_stock === 0) {
      return {
        message: "This product is out of stock!",
        status: 406,
      };
    }

    // Kiểm tra số lượng người dùng nhập vào và hàng tồn kho
    if (quantity > dataProduct.quantity_stock) {
      return {
        message: `You can't add more than product stocks: ${dataProduct.quantity_stock}`,
        status: 406,
      };
    }

    // Kiểm tra số lượng mà người dùng đã thêm trước đó và số lượng mới
    const checkUserCart = await cartsRepo.checkUserCart(userId, productId);

    if (!checkUserCart) {
      const cartInfo = {
        user_id: userId,
        product_id: productId,
        quantity: quantity,
        price: dataProduct.price,
      };

      const newCart = await cartsRepo.newCart(cartInfo);
      return {
        message: `${quantity} Product Added`,
        data: newCart,
        status: 200,
      };
    }
    const dataUserCart = checkUserCart.dataValues;
    const updatedQuantity = dataUserCart.quantity + quantity;
    if (updatedQuantity > dataProduct.quantity_stock) {
      return {
        message: `You can't add more than product stocks: ${dataProduct.quantity_stock}, you have added ${dataUserCart.quantity} product to cart before`,
        status: 406,
      };
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    // 1. Trường hợp giỏ hàng trống và chưa có sản phẩm nào
    const cartInfo = {
      user_id: userId,
      product_id: productId,
      quantity: quantity,
      price: dataProduct.price,
    };

    const checkCart = await cartsRepo.checkCart(userId);
    if (checkCart.length === 0) {
      const newCart = await cartsRepo.newCart(cartInfo);
      return {
        message: `${quantity} Product Added`,
        data: newCart,
        status: 200,
      };
    }

    // 2. Trường hợp người dùng đã có giỏ hàng, sản phẩm add vào đã tồn tại trong giỏ
    const checkExistProduct = await cartsRepo.checkUserCart(userId, productId);
    if (!checkExistProduct) {
      const newProductToCart = await cartsRepo.newCart(cartInfo);
      return {
        message: `${quantity} Product Added`,
        data: newProductToCart,
        status: 200,
      };
    }

    const dataExistProduct = checkExistProduct.dataValues;
    const updatedExistProductInfo = {
      ...dataExistProduct,
      quantity: dataExistProduct.quantity + quantity,
    };
    const updatedExistProduct = await cartsRepo.updatedExistProduct(
      updatedExistProductInfo,
      userId,
      productId
    );

    return {
      message: `${quantity} Product Added`,
      data: updatedExistProduct,
      status: 200,
    };
  }

  // 4. Delete Product From Cart
  async deleteProductFromCart(userId, productId, authHeader) {
    // Check Login
    if (!authHeader) {
      return { data: "Please Login", status: 401 };
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

    const findUser = await cartsRepo.findUserId(userId);
    if (!findUser) {
      return { data: "User Not Found", status: 404 };
    }

    const deleteProduct = await cartsRepo.deleteProductFromCart(
      userId,
      productId
    );
    if (!deleteProduct) {
      return { data: "Product ID Not Found In Cart", status: 404 };
    }
    return { data: "Product Deleted", status: 200 };
  }

  // 5. Delete All Products From Cart
  async deleteAllProductsFromCart(userId, authHeader) {
    // Check Login
    if (!authHeader) {
      return { data: "Please Login", status: 401 };
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

    const findUser = await cartsRepo.findUserId(userId);
    if (!findUser) {
      return { data: "User Not Found", status: 404 };
    }

    const deleteAllProducts = await cartsRepo.deleteAllProductsFromCart(userId);
    if (!deleteAllProducts) {
      return { data: "No Products In User Cart", status: 404 };
    }
    return { data: "All Products Deleted From Cart", status: 200 };
  }

  // 6. Update Cart
  async updateCart(userId, productId, quantity, authHeader) {
    // Check Login
    if (!authHeader) {
      return { data: "Please Login", status: 401 };
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
    const findProduct = await cartsRepo.findProductId(productId);
    if (!findProduct) {
      return { data: "Product ID Not Found", status: 404 };
    }
    const dataProduct = findProduct.dataValues;

    // Check Product From Cart
    const findProductFromCart = await cartsRepo.checkUserCart(
      userId,
      productId
    );
    if (!findProductFromCart) {
      return {
        data: "Not Found Product ID From Cart of this User ID",
        status: 404,
      };
    }

    if (!quantity) {
      return {
        data: "Min quantity to buy must be 1",
        status: 406,
      };
    }

    const dataProductFromCart = findProductFromCart.dataValues;

    const newQuantity = quantity;
    // Check số lượng mới so với số lượng hàng tồn kho
    if (newQuantity > dataProduct.quantity_stock) {
      return {
        data: `You can't add more than product stock: ${dataProduct.quantity_stock}, you have typed ${newQuantity} products`,
        status: 406,
      };
    }
    const updatedProductInfo = {
      ...dataProductFromCart,
      quantity: newQuantity,
    };
    const updatedProduct = await cartsRepo.updateCart(
      updatedProductInfo,
      userId,
      productId
    );
    return {
      data: "Product Updated",
      status: 200,
    };
  }
}

module.exports = new CartsService();
