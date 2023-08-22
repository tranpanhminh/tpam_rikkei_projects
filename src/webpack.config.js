const path = require("path");

module.exports = {
  entry: "./src/index.js", // Đường dẫn tới file chính của ứng dụng
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
    ],
  },
};

// module: {
//   rules: [
//     {
//       test: /\.module\.css$/,
//       use: [
//         'style-loader',
//         {
//           loader: 'css-loader',
//           options: {
//             modules: true,
//           },
//         },
//       ],
//     },
//   ],
// }
