// Import Multer
const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { name, description, price, morning_time, afternoon_time } = req.body;
    if (!name) {
      return cb(new Error("Please provide a name"));
    }
    if (!description) {
      return cb(new Error("Please provide a name"));
    }
    if (!price) {
      return cb(new Error("Please provide a name"));
    }
    if (!morning_time) {
      return cb(new Error("Please provide a name"));
    }
    if (!afternoon_time) {
      return cb(new Error("Please provide a name"));
    }
    cb(null, "src/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
