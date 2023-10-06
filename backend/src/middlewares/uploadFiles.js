// Import Multer
const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer instance
// const upload = multer({ dest: "./src/public/uploads" }); // Phải có lệnh này xong viết dòng dưới

const upload = multer({ storage: storage });

module.exports = upload;
