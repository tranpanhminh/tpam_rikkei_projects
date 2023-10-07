const checkAddProductForm = async (req, res, next) => {
  const { name, description, price, quantity_stock, vendor_id } = req.body;
  try {
    if (!name) {
      return res
        .status(406)
        .json({ message: "Product Name must not be blank" });
    }
    if (!description) {
      return res.status(406).json({ message: "Description must not be blank" });
    }
    if (!price) {
      return res.status(406).json({ message: "Price must not be blank" });
    }
    if (price < 0) {
      return res.status(406).json({ message: "Price must not be < 0" });
    }
    if (!quantity_stock) {
      return res
        .status(406)
        .json({ message: "Quantity Stock must not be blank" });
    }
    if (quantity_stock < 0) {
      return res
        .status(406)
        .json({ message: "Quantity Stock must not be < 0" });
    }
    if (!vendor_id) {
      return res.status(406).json({ message: "Vendor ID must not be blank" });
    }
    if (req.files.length < 4 || req.files.length > 4) {
      return res
        .status(406)
        .json({ message: "Please upload product 4 images" });
    }
    next();
  } catch (error) {
    console.log(error, "ERROR");
  }
};
module.exports = checkAddProductForm;
