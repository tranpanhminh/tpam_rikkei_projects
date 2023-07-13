// Database Accounts
let accounts = [
  {
    id: 1,
    email: "admin.petshop@gmail.com",
    fullName: "Admin",
    password: "adminpassword1",
    role: "admin",
    status: "Active",
    cart: [],
    order_history: [],
  },
  {
    id: 2,
    email: "mohamed1972@hotmail.com",
    fullName: "James Mohamed",
    password: "customerpassword1",
    role: "customer",
    status: "Active",
    cart: [],
    order_history: [],
  },
  {
    id: 3,
    email: "davidhelms1987@yahoo.com",
    fullName: "David Helms",
    password: "customerpassword2",
    role: "customer",
    status: "Active",
    cart: [],
    order_history: [],
  },
  {
    id: 4,
    email: "kevinlee1997@yahoo.com",
    fullName: "Kevin Lee",
    password: "customerpassword3",
    role: "customer",
    status: "Inactive",
    cart: [],
    order_history: [],
  },
];

// Database Products
let products = [
  {
    id: 1,
    productImage: [
      (productImage_1 = "../assets/images/product images/blueberry-pet-01.jpg"),
      (productImage_2 = "../assets/images/product images/blueberry-pet-02.jpg"),
      (productImage_3 = "../assets/images/product images/blueberry-pet-03.jpg"),
      (productImage_4 = "../assets/images/product images/blueberry-pet-04.jpg"),
    ],
    name: "Blueberry Pet Essentials Zoo Fun Dog Collars",
    description:
      "These vibrant and playful collars are both fashionable and functional, featuring durable materials and adjustable sizing. Make walks more enjoyable with these eye-catching and comfortable collars for your beloved furry friend.",
    price: 40,
    vendor: "Nike",
    sku: "P0001",
    quantity_stock: 230,
  },
  {
    id: 2,
    productImage: [
      (productImage_1 = "../assets/images/product images/dog-brush-01.jpg"),
      (productImage_2 = "../assets/images/product images/dog-brush-02.jpg"),
      (productImage_3 = "../assets/images/product images/dog-brush-03.jpg"),
      (productImage_4 = "../assets/images/product images/dog-brush-04.jpg"),
      ,
    ],
    name: "Glendan Dog Brush Cat Brush Slicker",
    description:
      "A high-quality slicker grooming brush designed for effective shedding control. Keep your pets' coat clean, healthy, and tangle-free with this essential grooming tool. Perfect for dogs and cats of all sizes, it ensures a comfortable grooming experience for your furry companions.",
    price: 9,
    vendor: "Nike",
    sku: "P0002",
    quantity_stock: 220,
  },
  {
    id: 3,
    productImage: [
      (productImage_1 = "../assets/images/product images/dog-leash-01.jpg"),
      (productImage_2 = "../assets/images/product images/dog-leash-02.jpg"),
      (productImage_3 = "../assets/images/product images/dog-leash-03.jpg"),
      (productImage_4 = "../assets/images/product images/dog-leash-04.jpg"),
    ],
    name: "Senye Retractable Dog Leash 16ft Dog Traction Rope",
    description:
      "This reliable and durable traction rope provides control and flexibility during walks. With its ergonomic design and smooth retractable mechanism, it ensures a comfortable grip and effortless handling. Enjoy outdoor adventures with your canine companion using the Senye Retractable Dog Leash.",
    price: 70,
    vendor: "Nike",
    sku: "P0003",
    quantity_stock: 500,
  },
  {
    id: 4,
    productImage: [
      (productImage_1 = "../assets/images/product images/dog-poop-bags-01.jpg"),
      (productImage_2 = "../assets/images/product images/dog-poop-bags-02.jpg"),
      (productImage_3 = "../assets/images/product images/dog-poop-bags-03.jpg"),
      (productImage_4 = "../assets/images/product images/dog-poop-bags-04.jpg"),
    ],
    name: "My Alphapet Dog Poop Bags Refill Rolls",
    description:
      "These durable and leak-proof bags ensure clean and easy disposal. With their compact design, they easily fit into standard dispensers for on-the-go use. Keep your surroundings clean and hygienic while being a responsible pet owner.",
    price: 28,
    vendor: "Nike",
    sku: "P0004",
    quantity_stock: 200,
  },
  {
    id: 5,
    productImage: [
      (productImage_1 = "../assets/images/product images/pet-bed-01.jpg"),
      (productImage_2 = "../assets/images/product images/pet-bed-02.jpg"),
      (productImage_3 = "../assets/images/product images/pet-bed-03.jpg"),
      (productImage_4 = "../assets/images/product images/pet-bed-04.jpg"),
    ],
    name: "Cuddler Pet Bed Soft And Comforting",
    description:
      "This soft and comforting bed provides a cozy retreat for your furry friend, ensuring they have a restful sleep. Its plush design and padded walls offer support and security, making it the perfect spot for relaxation. Treat your pet to a luxurious and comforting resting place with this Cuddler Pet Bed.",
    price: 37,
    vendor: "Nike",
    sku: "P0005",
    quantity_stock: 300,
  },
  {
    id: 6,
    productImage: [
      (productImage_1 =
        "../assets/images/product images/pet-feeder-bowl-01.jpg"),
      (productImage_2 =
        "../assets/images/product images/pet-feeder-bowl-02.jpg"),
      (productImage_3 =
        "../assets/images/product images/pet-feeder-bowl-03.jpg"),
      (productImage_4 =
        "../assets/images/product images/pet-feeder-bowl-04.jpg"),
    ],
    name: "Meal Automatic Pet Feeder Bowl",
    description:
      "This innovative feeder ensures timely and portion-controlled feeding for your furry friend. With customizable settings and a built-in timer, you can easily schedule multiple meals throughout the day. The spill-proof design and easy-to-clean bowl make feeding effortless and mess-free. Provide your pet with a consistent and convenient feeding experience with the Meal Automatic Pet Feeder Bowl.",
    price: 30,
    vendor: "Nike",
    sku: "P0006",
    quantity_stock: 560,
  },
  {
    id: 7,
    productImage: [
      (productImage_1 = "../assets/images/product images/pet-food-bowl-01.jpg"),
      (productImage_2 = "../assets/images/product images/pet-food-bowl-02.jpg"),
      (productImage_3 = "../assets/images/product images/pet-food-bowl-03.jpg"),
      (productImage_4 = "../assets/images/product images/pet-food-bowl-04.jpg"),
    ],
    name: "Qpey Pet Food Bowl Stainless Steel",
    description:
      "A durable stainless steel bowl designed for your pet's mealtime. Ensure a hygienic and convenient feeding experience with this easy-to-clean and long-lasting bowl. Keep your furry friend happy and satisfied during every meal.",
    price: 34,
    vendor: "Nike",
    sku: "P0007",
    quantity_stock: 450,
  },
  {
    id: 8,
    productImage: [
      (productImage_1 =
        "../assets/images/product images/tribal-leather-01.jpg"),
      (productImage_2 =
        "../assets/images/product images/tribal-leather-02.jpg"),
      (productImage_3 =
        "../assets/images/product images/tribal-leather-03.jpg"),
      (productImage_4 =
        "../assets/images/product images/tribal-leather-04.jpg"),
    ],
    name: "Gaucho Goods Tribal Leather Dog Collar",
    description:
      "Elevate your dog's style with the Gaucho Goods Tribal Leather Dog Collar. Crafted with premium leather and adorned with tribal-inspired designs, this collar combines fashion with durability. Ensure a secure and comfortable fit for your furry friend while adding a touch of uniqueness to their look. Let your dog stand out in style with the Gaucho Goods Tribal Leather Dog Collar.",
    price: 45,
    vendor: "Nike",
    sku: "P0008",
    quantity_stock: 100,
  },
];

// Database Orders
let orders = [
  {
    id: 1,
    user_id: 0,
    name: "	James Mohamed",
    email: "mohamed1972@hotmail.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Processing",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: "../assets/images/product images/tribal-leather-01.jpg",
        productName: "Gaucho Goods Tribal Leather Dog Collar",
        productQuantity: 2,
        productPrice: 444,
      },
    ],
  },
  {
    id: 2,
    user_id: 0,
    name: "	James Mohamed",
    email: "mohamed1972@hotmail.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Shipped",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: "../assets/images/product images/tribal-leather-01.jpg",
        productName: "Gaucho Goods Tribal Leather Dog Collar",
        productQuantity: 4,
        productPrice: 520,
      },
    ],
  },
  {
    id: 3,
    user_id: 0,
    name: "	James Mohamed",
    email: "mohamed1972@hotmail.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Cancel",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: "../assets/images/product images/tribal-leather-01.jpg",
        productName: "Gaucho Goods Tribal Leather Dog Collar",
        productQuantity: 10,
        productPrice: 500,
      },
    ],
  },
  {
    id: 4,
    user_id: 0,
    name: "David Helms",
    email: "davidhelms1987@yahoo.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Processing",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: "../assets/images/product images/tribal-leather-01.jpg",
        productName: "Gaucho Goods Tribal Leather Dog Collar",
        productQuantity: 2,
        productPrice: 100,
      },
    ],
  },
  {
    id: 5,
    user_id: 0,
    name: "David Helms",
    email: "davidhelms1987@yahoo.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Processing",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: "../assets/images/product images/tribal-leather-01.jpg",
        productName: "Gaucho Goods Tribal Leather Dog Collar",
        productQuantity: 2,
        productPrice: 252,
      },
      {
        productID: 2,
        productImage:
          "http://127.0.0.1:5501/assets/images/product%20images/dog-leash-01.jpg",
        productName: "Senye Retractable Dog Leash 16ft Dog Traction Rope",
        productQuantity: 5,
        productPrice: 212,
      },
    ],
  },
];

// Đẩy dữ liệu lên Local Storage

// 1. Đẩy dữ liệu của Accounts lên Local Storage

// let accountsToDatabase = JSON.parse(localStorage.getItem("accountsDatabase"));
// if (accountsToDatabase) {
//   [];
// }
// localStorage.setItem("accountsDatabase", JSON.stringify(accounts));

// <--------------------------->

// 2. Đẩy dữ liệu của Products lên Local Storage

// let productsToDatabase = JSON.parse(localStorage.getItem("productsDatabase"));
// if (productsToDatabase) {
//   [];
// }
// localStorage.setItem("productsDatabase", JSON.stringify(products));

// 3. Đẩy dữ liệu của orders lên Local Storage
let authDatabase = JSON.parse(localStorage.getItem("auth"));
// if (authDatabase && authDatabase.role == "admin") {
// localStorage.setItem("ordersDatabase", JSON.stringify(orders));
// }

// Xây dựng hàm Build In
function getDataFromLocal(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

function setDataToLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
