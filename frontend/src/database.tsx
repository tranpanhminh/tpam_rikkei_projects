export interface userAccount {
  email: string;
  password: string;
}

export interface Banking {
  id: number;
  cardName: string;
  cardNumber: number;
  expiredDate: string;
  cvv: number;
  balance: number;
  type: string;
}

export interface Account {
  id: number;
  email: string;
  full_name: string;
  password: string;
  role: string;
  status_id: number;
  role_id: number;
  image_avatar: string;
}

// export interface Account {
//   id: number;
//   email: string;
//   fullName: string;
//   password: string;
//   role: string;
//   status: string;
//   cart: any[];
//   order_history: any[];
//   newsletter_register: boolean;
//   newsletter: string[];
//   booking_history: any[];
//   image_avatar: string;
// }

export interface Subscriber {
  id: number;
  user_id: number;
  email: string;
  date: string;
  status: string;
}

// export interface Product {
//   id: number;
//   productImage: string[];
//   name: string;
//   description: string;
//   price: number;
//   vendor: string;
//   sku: string;
//   quantity_stock: number;
// }

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity_stock: number;
  vendor: string;
  thumbnail_url: string;
  vendor_id: number;
  post_type_id: number;
  created_at: string;
  updated_at: string;
}

// export interface Service {
//   id: number;
//   name: string;
//   serviceImage: string;
//   description: string;
//   price: number;
//   morningTime: string;
//   morningSlot: number;
//   afternoonTime: string;
//   afternoonSlot: number;
//   comments: string[];
// }

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  service_image: string;
  working_time_id: number;
  post_type_id: number;
  created_at: string;
  updated_at: string;
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
  status: string;
  // slot?: number | string;
  // usage?: number;
}