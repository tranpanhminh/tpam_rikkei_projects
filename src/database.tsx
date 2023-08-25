export interface Account {
  id: number;
  email: string;
  fullName: string;
  password: string;
  role: string;
  status: string;
  cart: any[];
  order_history: any[];
  newsletter: string[];
  booking: any[];
  booking_history: any[];
}
export interface Product {
  id: number;
  productImage: string[];
  name: string;
  description: string;
  price: number;
  vendor: string;
  sku: string;
  quantity_stock: number;
}

export interface Service {
  id: number;
  name: string;
  serviceImage: string;
  description: string;
  price: number;
  time: {
    id: number;
    calendar: string;
    seat: number;
  }[];
}

export interface Order {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: string;
  address: string;
  cart: {
    productID: number;
    productImage: string;
    productName: string;
    productQuantity: number;
    productPrice: number;
  }[];
}

export interface Booking {
  bookingId: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: string;
  booking: {
    serviceID: number;
    serviceName: string;
    serviceImage: string;
    serviceTime: string;
    servicePrice: number;
  }[];
}

export interface Coupon {
  id: number;
  name: string;
  code: string;
  discount: number;
  slot?: number | string;
  startDate?: string;
  endDate?: string;
  usage?: number;
}

let accounts: Account[] = [
  {
    id: 1,
    email: "admin.petshop@gmail.com",
    fullName: "Super Admin",
    password: "adminpassword1",
    role: "admin",
    status: "Active",
    cart: [],
    order_history: [],
    newsletter: [],
    booking: [],
    booking_history: [],
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
    newsletter: [],
    booking: [],
    booking_history: [],
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
    newsletter: [],
    booking: [],
    booking_history: [],
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
    newsletter: [],
    booking: [],
    booking_history: [],
  },
];
let products: Product[] = [
  {
    id: 1,
    productImage: [
      "blueberry-pet-01.jpg",
      "blueberry-pet-02.jpg",
      "blueberry-pet-03.jpg",
      "blueberry-pet-04.jpg",
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
      "dog-brush-01.jpg",
      "dog-brush-02.jpg",
      "dog-brush-03.jpg",
      "dog-brush-04.jpg",
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
      "dog-leash-01.jpg",
      "dog-leash-02.jpg",
      "dog-leash-03.jpg",
      "dog-leash-04.jpg",
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
      "dog-poop-bags-01.jpg",
      "dog-poop-bags-02.jpg",
      "dog-poop-bags-03.jpg",
      "dog-poop-bags-04.jpg",
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
      "pet-bed-01.jpg",
      "pet-bed-02.jpg",
      "pet-bed-03.jpg",
      "pet-bed-04.jpg",
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
      "pet-feeder-bowl-01.jpg",
      "pet-feeder-bowl-02.jpg",
      "pet-feeder-bowl-03.jpg",
      "pet-feeder-bowl-04.jpg",
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
      "pet-food-bowl-01.jpg",
      "pet-food-bowl-02.jpg",
      "pet-food-bowl-03.jpg",
      "pet-food-bowl-04.jpg",
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
      "tribal-leather-01.jpg",
      "tribal-leather-02.jpg",
      "tribal-leather-03.jpg",
      "tribal-leather-04.jpg",
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

let services: Service[] = [
  {
    id: 1,
    name: "Veterinarian",
    serviceImage: "veterinary-service.jpg",
    description:
      "The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.",
    price: 500,
    time: [
      { id: 1, calendar: "9:00 AM - 11:00 AM", seat: 25 },
      { id: 2, calendar: "13:00 PM - 17:00 PM", seat: 10 },
    ],
  },
  {
    id: 2,
    name: "Pet Grooming",
    serviceImage: "dog-grooming-service.jpg",
    description:
      "Our Pet Grooming service offers your furry companions a professional pampering experience. Our pet care team will clean their coat, trim their nails, and style their fur, ensuring they look and feel their best, radiating a fresh and delightful appearance.",
    price: 300,
    time: [
      { id: 1, calendar: "9:00 AM - 11:00 AM", seat: 10 },
      { id: 2, calendar: "13:00 PM - 17:00 PM", seat: 10 },
    ],
  },
  {
    id: 3,
    name: "Pet Sitting",
    serviceImage: "pet-sitting-service.png",
    description:
      "When you require personal time away from your pet, our Pet Sitting service ensures they receive attentive care. Our dedicated team will visit your home to tend to your pets, providing feeding, walks, and all the love and attention they need, bridging the gap in your absence.",
    price: 200,
    time: [
      { id: 1, calendar: "9:00 AM - 11:00 AM", seat: 10 },
      { id: 2, calendar: "13:00 PM - 17:00 PM", seat: 10 },
    ],
  },
];

let orders: Order[] = [
  {
    id: 1,
    user_id: 0,
    name: "James Mohamed",
    email: "mohamed1972@hotmail.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Processing",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: require("../src/assets/images/product-images/tribal-leather-01.jpg"),
        productName: "Gaucho Goods Tribal Leather Dog Collar",
        productQuantity: 2,
        productPrice: 444,
      },
    ],
  },
  {
    id: 2,
    user_id: 0,
    name: "James Mohamed",
    email: "mohamed1972@hotmail.com",
    phone: "0905932123",
    date: "02/08/2023",
    status: "Shipped",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: require("../src/assets/images/product-images/tribal-leather-01.jpg"),
        productName: "Gaucho Goods Tribal Leather Dog Collar",
        productQuantity: 4,
        productPrice: 520,
      },
    ],
  },
  {
    id: 3,
    user_id: 0,
    name: "James Mohamed",
    email: "mohamed1972@hotmail.com",
    phone: "0905932123",
    date: "03/09/2023",
    status: "Cancel",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: require("../src/assets/images/product-images/tribal-leather-01.jpg"),
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
    date: "10/10/2023",
    status: "Processing",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: require("../src/assets/images/product-images/tribal-leather-01.jpg"),
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
    date: "11/11/2023",
    status: "Processing",
    address: "Đà Nẵng",
    cart: [
      {
        productID: 1,
        productImage: require("../src/assets/images/product-images/tribal-leather-01.jpg"),
        productName: "Gaucho Goods Tribal Leather Dog Collar",
        productQuantity: 2,
        productPrice: 252,
      },
      {
        productID: 2,
        productImage: require("../src/assets/images/product-images/dog-leash-01.jpg"),
        productName: "Senye Retractable Dog Leash 16ft Dog Traction Rope",
        productQuantity: 5,
        productPrice: 212,
      },
    ],
  },
];

let bookings: Booking[] = [
  {
    bookingId: 1,
    user_id: 1,
    name: "James Mohamed",
    email: "mohamed1972@hotmail.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Processing",
    booking: [
      {
        serviceID: 1,
        serviceName: "Veterinarian",
        serviceImage: require("../src/assets/images/veterinary-service.jpg"),
        serviceTime: "9:00 AM - 11:00 AM",
        servicePrice: 500,
      },
    ],
  },
  {
    bookingId: 2,
    user_id: 1,
    name: "James Mohamed",
    email: "mohamed1972@hotmail.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Processing",
    booking: [
      {
        serviceID: 1,
        serviceName: "Veterinarian",
        serviceImage: require("../src/assets/images/veterinary-service.jpg"),
        serviceTime: "13:00 PM - 17:00 PM",
        servicePrice: 500,
      },
    ],
  },
  {
    bookingId: 3,
    user_id: 2,
    name: "David Helms",
    email: "davidhelms1987@yahoo.com",
    phone: "0905932123",
    date: "01/07/2023",
    status: "Processing",
    booking: [
      {
        serviceID: 1,
        serviceName: "Veterinarian",
        serviceImage: require("../src/assets/images/veterinary-service.jpg"),
        serviceTime: "13:00 PM - 17:00 PM",
        servicePrice: 500,
      },
    ],
  },
];

let coupons: Coupon[] = [
  {
    id: 1,
    name: "SALEOFF25%",
    code: "saleoff25",
    discount: 25,
    slot: 10,
    startDate: "18/09/2023",
    endDate: "21/09/2023",
    usage: 5,
  },
  {
    id: 2,
    name: "SALEOFF50%",
    code: "saleoff50",
    discount: 50,
    slot: 5,
    startDate: "18/02/2023",
    endDate: "21/02/2023",
    usage: 5,
  },
  {
    id: 4,
    name: "SALEOFF5%",
    code: "saleoff5",
    discount: 5,
    slot: 0,
    startDate: "18/09/2023",
    endDate: "21/09/2023",
    usage: 5,
  },
  {
    id: 5,
    name: "SALEOFF2%",
    code: "saleoff2",
    discount: 5,
    slot: "unlimited",
    startDate: "18/09/2023",
    endDate: "21/09/2023",
    usage: 5,
  },
];

export function initializeDatabase() {
  const accountsToDatabase = localStorage.getItem("accountsDatabase");
  const productsToDatabase = localStorage.getItem("productsDatabase");
  const ordersToDatabase = localStorage.getItem("ordersDatabase");
  const servicesToDatabase = localStorage.getItem("servicesDatabase");
  const bookingToDatabase = localStorage.getItem("bookingDatabase");
  const couponToDatabase = localStorage.getItem("couponsDatabase");

  if (!accountsToDatabase) {
    localStorage.setItem("accountsDatabase", JSON.stringify(accounts));
  }

  if (!productsToDatabase) {
    localStorage.setItem("productsDatabase", JSON.stringify(products));
  }

  if (!ordersToDatabase) {
    localStorage.setItem("ordersDatabase", JSON.stringify(orders));
  }

  if (!servicesToDatabase) {
    localStorage.setItem("servicesDatabase", JSON.stringify(services));
  }

  if (!bookingToDatabase) {
    localStorage.setItem("bookingDatabase", JSON.stringify(bookings));
  }

  if (!couponToDatabase) {
    localStorage.setItem("couponsDatabase", JSON.stringify(coupons));
  }
}

export function initProductsDatabase() {
  const productsToDatabase = localStorage.getItem("productsDatabase");
  if (!productsToDatabase) {
    localStorage.setItem("productsDatabase", JSON.stringify(products));
  }
}

export function initAccountsDatabase() {
  const accountsToDatabase = localStorage.getItem("accountsDatabase");
  if (!accountsToDatabase) {
    localStorage.setItem("accountsDatabase", JSON.stringify(accounts));
  }
}

export function initOrdersDatabase() {
  const ordersToDatabase = localStorage.getItem("ordersDatabase");
  if (!ordersToDatabase) {
    localStorage.setItem("ordersDatabase", JSON.stringify(orders));
  }
}

export function initServicesDatabase() {
  const servicesToDatabase = localStorage.getItem("servicesDatabase");
  if (!servicesToDatabase) {
    localStorage.setItem("servicesDatabase", JSON.stringify(services));
  }
}

export function initBookingDatabase() {
  const bookingToDatabase = localStorage.getItem("bookingDatabase");
  if (!bookingToDatabase) {
    localStorage.setItem("bookingDatabase", JSON.stringify(bookings));
  }
}

export function initCouponDatabase() {
  const couponToDatabase = localStorage.getItem("couponsDatabase");
  if (!couponToDatabase) {
    localStorage.setItem("bookingDatabase", JSON.stringify(coupons));
  }
}

export function getDataFromLocal<T>(key: string): T {
  const data = JSON.parse(localStorage.getItem(key) || "null");
  return data;
}

export function setDataToLocal(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
