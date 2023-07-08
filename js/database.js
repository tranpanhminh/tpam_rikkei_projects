// Database Accounts
let accountsDatabase = [
  {
    user_id: 1,
    email: "admin.petshop@gmail.com",
    fullName: "Admin",
    password: "adminpassword1",
    role: "admin"
    cart: []
  },
  {
    user_id: 2,
    email: "mohamed1972@hotmail.com",
    fullName: "James Mohamed",
    password: "customerpassword1",
    role: "customer"
    cart: []
  },
  {
    user_id: 3,
    email: "davidhelms1987@yahoo.com,
    fullName: "David Helms",
    password: "customerpassword2",
    role: "customer"
    cart: []
  },
];

// Products DataBase
let productsDatabase = [
    {
      product_id: 1,
      productImage: [
        {
          productImage_1: "../assets/images/product images/blueberry-pet-01.jpg",
          productImage_2: "../assets/images/product images/blueberry-pet-02.jpg",
          productImage_3: "../assets/images/product images/blueberry-pet-03.jpg",
          productImage_4: "../assets/images/product images/blueberry-pet-04.jpg"
        }
      ],
      name: "Blueberry Pet Essentials Zoo Fun Dog Collars",
      description: "These vibrant and playful collars are both fashionable and functional, featuring durable materials and adjustable sizing. Make walks more enjoyable with these eye-catching and comfortable collars for your beloved furry friend.",
      price: 45,
      vendor: "Nike",
      sku: "P0001",
      quantity_stock: 100
    },
    {
      product_id: 2,
      productImage: [
        {
          productImage_1: "../assets/images/product images/dog-brush-01.jpg",
          productImage_2: "../assets/images/product images/dog-brush-02.jpg",
          productImage_3: "../assets/images/product images/dog-brush-03.jpg",
          productImage_4: "../assets/images/product images/dog-brush-04.jpg"
        }
      ],
      name: "Glendan Dog Brush Cat Brush Slicker Pet Grooming Brush Shedding Grooming Tools",
      description: "A high-quality slicker grooming brush designed for effective shedding control. Keep your pets' coat clean, healthy, and tangle-free with this essential grooming tool. Perfect for dogs and cats of all sizes, it ensures a comfortable grooming experience for your furry companions.",
      price: 45,
      vendor: "Nike",
      sku: "P0002",
      quantity_stock: 100
    },
    {
      product_id: 3,
      productImage: [
        {
          productImage_1: "../assets/images/product images/dog-leash-01.jpg",
          productImage_2: "../assets/images/product images/dog-leash-02.jpg",
          productImage_3: "../assets/images/product images/dog-leash-03.jpg",
          productImage_4: "../assets/images/product images/dog-leash-04.jpg"
        }
      ],
      name: "Senye Retractable Dog Leash 16ft Dog Traction Rope",
      description: "This reliable and durable traction rope provides control and flexibility during walks. With its ergonomic design and smooth retractable mechanism, it ensures a comfortable grip and effortless handling. Enjoy outdoor adventures with your canine companion using the Senye Retractable Dog Leash.",
      price: 45,
      vendor: "Nike",
      sku: "P0003",
      quantity_stock: 100
    },
    {
      product_id: 4,
      productImage: [
        {
          productImage_1: "../assets/images/product images/dog-poop-bags-01.jpg",
          productImage_2: "../assets/images/product images/dog-poop-bags-02.jpg",
          productImage_3: "../assets/images/product images/dog-poop-bags-03.jpg",
          productImage_4: "../assets/images/product images/dog-poop-bags-04.jpg"
        }
      ],
      name: "My Alphapet Dog Poop Bags Refill Rolls",
      description: "These durable and leak-proof bags ensure clean and easy disposal. With their compact design, they easily fit into standard dispensers for on-the-go use. Keep your surroundings clean and hygienic while being a responsible pet owner.",
      price: 45,
      vendor: "Nike",
      sku: "P0004",
      quantity_stock: 100
    },
    {
      product_id: 5,
      productImage: [
        {
          productImage_1: "../assets/images/product images/pet-bed-01.jpg",
          productImage_2: "../assets/images/product images/pet-bed-02.jpg",
          productImage_3: "../assets/images/product images/pet-bed-03.jpg",
          productImage_4: "../assets/images/product images/pet-bed-04.jpg"
        }
      ],
      name: "Cuddler Pet Bed Soft And Comforting",
      description: "This soft and comforting bed provides a cozy retreat for your furry friend, ensuring they have a restful sleep. Its plush design and padded walls offer support and security, making it the perfect spot for relaxation. Treat your pet to a luxurious and comforting resting place with this Cuddler Pet Bed.",
      price: 45,
      vendor: "Nike",
      sku: "P0005",
      quantity_stock: 100
    },
    {
      product_id: 6,
      productImage: [
        {
          productImage_1: "../assets/images/product images/pet-feeder-bowl-01.jpg",
          productImage_2: "../assets/images/product images/pet-feeder-bowl-02.jpg",
          productImage_3: "../assets/images/product images/pet-feeder-bowl-03.jpg",
          productImage_4: "../assets/images/product images/pet-feeder-bowl-04.jpg"
        }
      ],
      name: "Meal Automatic Pet Feeder Bowl",
      description: "This innovative feeder ensures timely and portion-controlled feeding for your furry friend. With customizable settings and a built-in timer, you can easily schedule multiple meals throughout the day. The spill-proof design and easy-to-clean bowl make feeding effortless and mess-free. Provide your pet with a consistent and convenient feeding experience with the Meal Automatic Pet Feeder Bowl.",
      price: 45,
      vendor: "Nike",
      sku: "P0006",
      quantity_stock: 100
    },
    {
      product_id: 7,
      productImage: [
        {
          productImage_1: "../assets/images/product images/pet-food-bowl-01.jpg",
          productImage_2: "../assets/images/product images/pet-food-bowl-02.jpg",
          productImage_3: "../assets/images/product images/pet-food-bowl-03.jpg",
          productImage_4: "../assets/images/product images/pet-food-bowl-04.jpg"
        }
      ],
      name: "Qpey Pet Food Bowl Stainless Steel",
      description: "A durable stainless steel bowl designed for your pet's mealtime. Ensure a hygienic and convenient feeding experience with this easy-to-clean and long-lasting bowl. Keep your furry friend happy and satisfied during every meal.",
      price: 45,
      vendor: "Nike",
      sku: "P0007",
      quantity_stock: 100
    },
    {
      product_id: 8,
      productImage: [
        {
          productImage_1: "../assets/images/product images/tribal-leather-01.jpg",
          productImage_2: "../assets/images/product images/tribal-leather-02.jpg",
          productImage_3: "../assets/images/product images/tribal-leather-03.jpg",
          productImage_4: "../assets/images/product images/tribal-leather-04.jpg"
        }
      ],
      name: "Gaucho Goods Tribal Leather Dog Collar",
      description: "Elevate your dog's style with the Gaucho Goods Tribal Leather Dog Collar. Crafted with premium leather and adorned with tribal-inspired designs, this collar combines fashion with durability. Ensure a secure and comfortable fit for your furry friend while adding a touch of uniqueness to their look. Let your dog stand out in style with the Gaucho Goods Tribal Leather Dog Collar.",
      price: 45,
      vendor: "Nike",
      sku: "P0008",
      quantity_stock: 100
    }
    
  ];
  