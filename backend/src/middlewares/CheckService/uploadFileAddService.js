// Import Multer
const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { name, description, price, morning_time, afternoon_time } = req.body;
    if (!name) {
      return cb(new Error("Service Name must not be blank"));
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
    if (!morning_time) {
      return cb(new Error("Morning Time must not be blank"));
    }
    if (!afternoon_time) {
      return cb(new Error("Afternoon Time must not be blank"));
    }
    cb(null, "src/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;