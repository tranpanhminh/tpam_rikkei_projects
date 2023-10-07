// Import Multer
const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { name, description, price, quantity_stock, vendor_id } = req.body;
    console.log(req.files, "HHHHHHHHHHHH");
    if (!name) {
      return cb(new Error("Product Name must not be blank"));
    }
    if (!description) {
      return cb(new Error("Description must not be blank"));
    }
    if (!price) {
      return cb(new Error("Price must not be blank"));
    }
    if (price < 0) {
      return cb(new Error("Price must not be < 0"));
    }
    if (!quantity_stock) {
      return cb(new Error("Quantity Stock must not be blank"));
    }
    if (quantity_stock < 0) {
      return cb(new Error("Quantity Stock must not be < 0"));
    }
    if (!vendor_id) {
      return cb(new Error("Vendor ID must not be blank"));
    }

    cb(null, "src/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
