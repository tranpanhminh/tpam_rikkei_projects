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

// Create a custom file filter function to accept only image file types
const imageFileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"]; // Add any other image extensions you want to allow

  // Check the file extension
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error(
        "Only image files with extensions .jpg, .jpeg, .png, and .gif are allowed."
      ),
      false
    ); // Reject the file
  }
};

// Create the multer instance with the custom file filter
const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});

module.exports = upload;

// // Import Multer
// const multer = require("multer");

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "src/public/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// // Create the multer instance
// // const upload = multer({ dest: "./src/public/uploads" }); // Phải có lệnh này xong viết dòng dưới

// const upload = multer({ storage: storage });

// module.exports = upload;
