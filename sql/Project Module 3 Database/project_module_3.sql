CREATE DATABASE project_module_3;

use project_module_3;


-- Tạo bảng vendors 
CREATE TABLE vendors (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Tạo bảng coupons 
CREATE TABLE coupons(
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   code VARCHAR(255) NOT NULL,
   discount_rate INT NOT NULL,
   min_bill INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tạo bảng payments
CREATE TABLE payments (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   card_number VARCHAR(255) NOT NULL,
   expiry_date VARCHAR(255) NOT NULL,
   cvv INT NOT NULL,
   balance INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tạo bảng users 
CREATE TABLE users (
  id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  status INT NOT NULL,
  role INT NOT NULL,
  image_avatar LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Tạo bảng post_types 
CREATE TABLE post_types (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Tạo bảng images 
CREATE TABLE images (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   image_url LONGTEXT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tạo bảng services 
CREATE TABLE services (
    id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    price INT NOT NULL,
    morning_time TEXT NOT NULL,
    afternoon_time TEXT NOT NULL,
    post_type VARCHAR(255) DEFAULT "Service" NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng products 
CREATE TABLE products (
    id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    price INT NOT NULL,
    vendor_id INT NOT NULL,
    quantity_stock INT NOT NULL,
    post_type VARCHAR(255) DEFAULT "Product" NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT FK_product_vendor
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


-- Tạo bảng service_image 
CREATE TABLE service_image (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   image_id INT NOT NULL,
   service_id INT NOT NULL,

   CONSTRAINT FK_service_image_image_id
   FOREIGN KEY (image_id) REFERENCES images(id)
   ON UPDATE CASCADE
   ON DELETE CASCADE,

   CONSTRAINT FK_service_image_service_id
   FOREIGN KEY (service_id) REFERENCES services(id)
   ON UPDATE CASCADE
   ON DELETE CASCADE
);


-- Tạo bảng product_image 
CREATE TABLE product_image (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   image_id INT NOT NULL,
   product_id INT NOT NULL,

   CONSTRAINT FK_product_image_image_id
   FOREIGN KEY (image_id) REFERENCES images (id)
   ON UPDATE CASCADE
   ON DELETE CASCADE,

   CONSTRAINT FK_product_image_product_id
   FOREIGN KEY (product_id) REFERENCES products (id)
   ON UPDATE CASCADE
   ON DELETE CASCADE
);

-- Tạo bảng bookings 
CREATE TABLE bookings (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   user_id INT NOT NULL,
   service_id INT NOT NULL,
   name VARCHAR(255) NOT NULL,
   phone TEXT NOT NULL,
   date DATETIME NOT NULL,
   status INT NOT NULL,
   booking_date DATE,
   calendar VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

   CONSTRAINT FK_booking_user
   FOREIGN KEY (user_id) REFERENCES users(id)
   ON UPDATE CASCADE
   ON DELETE CASCADE,

   CONSTRAINT FK_booking_service
   FOREIGN KEY (service_id) REFERENCES services(id)
   ON UPDATE CASCADE
   ON DELETE CASCADE
);


-- Tạo bảng comment_product 
CREATE TABLE comment_product (
  id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
  comment LONGTEXT NOT NULL,
  rate INT NOT NULL DEFAULT 5 NOT NULL,
  post_type VARCHAR(255) DEFAULT "Product" NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  CONSTRAINT FK_comment_product_user
  FOREIGN KEY (user_id) REFERENCES users(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,

  CONSTRAINT FK_comment_product
  FOREIGN KEY (post_id) REFERENCES products( id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);


-- Tạo bảng comment_service 
CREATE TABLE comment_service (
  id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
  comment LONGTEXT NOT NULL,
  rate INT NOT NULL DEFAULT 5 NOT NULL,
  post_type VARCHAR(255) DEFAULT "Service" NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  CONSTRAINT FK_comment_service_user
  FOREIGN KEY (user_id) REFERENCES users (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,

  CONSTRAINT FK_comment_service
  FOREIGN KEY (post_id) REFERENCES services (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);


-- Tạo bảng cart 
CREATE TABLE cart (
  id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  CONSTRAINT FK_cart_user
  FOREIGN KEY (user_id) REFERENCES users (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,

  CONSTRAINT FK_cart_product
  FOREIGN KEY (product_id) REFERENCES products (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);


-- Tạo bảng orders 
CREATE TABLE orders (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   user_id INT NOT NULL,
   status INT NOT NULL,
   address VARCHAR(255) NOT NULL,
   phone VARCHAR(255) NOT NULL,
   coupon_id INT NOT NULL,
   card_number INT NOT NULL,
   cancel_reason VARCHAR(255),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

   CONSTRAINT FK_order_user
   FOREIGN KEY (user_id) REFERENCES users (id)
   ON UPDATE CASCADE
   ON DELETE CASCADE,

  CONSTRAINT FK_order_coupon
  FOREIGN KEY (coupon_id) REFERENCES coupons (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);


-- Tạo bảng order_item 
CREATE TABLE order_item (
   id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
   order_id INT NOT NULL,
   product_id INT NOT NULL,
   quantity INT NOT NULL,
   price INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

   CONSTRAINT FK_order_item_order_id
   FOREIGN KEY (order_id) REFERENCES orders (id)
   ON UPDATE CASCADE
   ON DELETE CASCADE,

   CONSTRAINT FK_order_item_product_
   FOREIGN KEY (product_id) REFERENCES products (id)
   ON UPDATE CASCADE
   ON DELETE CASCADE
);


-- Tạo bảng posts 
CREATE TABLE posts (
  id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  thumbnail INT NOT NULL,
  author VARCHAR(255) NOT NULL,
  status INT NOT NULL,
  post_type VARCHAR (255) DEFAULT "Post",
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Tạo bảng pages 
CREATE TABLE pages (
  id INT UNIQUE AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  thumbnail INT NOT NULL,
  author VARCHAR(255) NOT NULL,
  status INT NOT NULL,
  post_type VARCHAR (255) DEFAULT "Page",
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)