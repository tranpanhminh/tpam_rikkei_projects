const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectMySQL = require("./src/configs/db.config.js");
const app = express();
const port = process.env.PORT || 5000;
const Router = require("./src/routes/index.js");

// ----- Session Cookie -----
// Importing express-session module
const session = require("express-session");

// Importing file-store module
const filestore = require("session-file-store")(session);

// Creating session
app.use(
  session({
    name: "session-id",
    secret: "GFGEnter", // Secret key,
    saveUninitialized: false,
    resave: false,
    store: new filestore(),
  })
);
// Asking for the authorization
// function auth(req, res, next) {
//   // Checking for the session
//   console.log(req.session);

//   // Checking for the authorization
//   if (!req.session.user) {
//     var authHeader = req.headers.authorization;
//     console.log(authHeader);
//     var err = new Error("You are not authenticated");
//     res.setHeader("WWW-Authenticate", "Basic");
//     err.status = 401;
//     next(err);

//     var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
//       .toString()
//       .split(":");

//     // Reading username and password
//     var username = auth[0];
//     var password = auth[1];
//     if (username == "admin2" && password == "password") {
//       req.session.user = "admin2";
//       next();
//     } else {
//       // Retry incase of incorrect credentials
//       var err = new Error("You are not authenticated!");
//       res.setHeader("WWW-Authenticate", "Basic");
//       err.status = 401;
//       return next(err);
//     }
//   } else {
//     if (req.session.user === "admin2") {
//       next();
//     } else {
//       var err = new Error("You are not authenticated!");
//       res.setHeader("WWW-Authenticate", "Basic");
//       err.status = 401;
//       return next(err);
//     }
//   }
// }
// app.use(auth);
// --------------------------

// MiddleWare
app.use(express.static(__dirname + "/src/public/")); // Lấy đường dẫn của ảnh để show lên trình duyệt
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,DELETE,POST",
  })
);
Router(app);

app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Page Not Found" });
});

// =====================================================
app.listen(port, async () => {
  try {
    await connectMySQL.authenticate();
    console.log(`Listening to http://localhost:${port}`);
  } catch (error) {
    console.error("Server error:", error);
  }
});
