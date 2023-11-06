-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_module_4
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `quantity_stock` int NOT NULL,
  `vendor_id` int DEFAULT NULL,
  `post_type_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` longtext NOT NULL,
  `thumbnail_url` longtext NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK.vendors.products` (`vendor_id`),
  KEY `FK.post_types.products` (`post_type_id`),
  CONSTRAINT `FK.post_types.products` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK.vendors.products` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Blueberry Pet Essentials Zoo Fun Dog Collars',800,1,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','These vibrant and playful collars are both fashionable and functional, featuring durable materials and adjustable sizing. Make walks more enjoyable with these eye-catching and comfortable collars for your beloved furry friend.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/blueberry_pet_essentials_zoo_fun_dog_collars_1_640x_crop_top.jpg?v=1625752583',35),(2,'Hdp Dog Boots Blue Set of 4 Medium',900,2,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','Keep your furry friend\'s paws protected with the HDP Dog Boots in a vibrant blue color. This set includes four medium-sized boots designed for dogs. They provide insulation against hot or cold surfaces, making walks comfortable in any weather. The boots are durable, easy to put on, and designed to stay in place during playtime.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/hdp_dog_boots_blue_set_of_4_medium_1_24144e81-621a-471c-839a-92acb84b49c7_640x_crop_top.png?v=1625817557',25),(3,'Glendan Dog Brush Cat Brush Slicker Pet Grooming Brush Shedding Grooming Tools',700,3,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','A high-quality slicker grooming brush designed for effective shedding control. Keep your pets\' coat clean, healthy, and tangle-free with this essential grooming tool. Perfect for dogs and cats of all sizes, it ensures a comfortable grooming experience for your furry companions.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/glendan_dog_brush_cat_brush_slicker_pet_grooming_brush_shedding_grooming_tools_1_640x_crop_top.jpg?v=1625752641',22),(4,'Senye Retractable Dog Leash 16ft Dog Traction Rope',1000,1,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','This reliable and durable traction rope provides control and flexibility during walks. With its ergonomic design and smooth retractable mechanism, it ensures a comfortable grip and effortless handling. Enjoy outdoor adventures with your canine companion using the Senye Retractable Dog Leash.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/senye_retractable_dog_leash_16ft_dog_traction_rope_1_640x_crop_top.jpg?v=1625752616',10),(5,'My Alphapet Dog Poop Bags Refill Rolls',860,2,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','These durable and leak-proof bags ensure clean and easy disposal. With their compact design, they easily fit into standard dispensers for on-the-go use. Keep your surroundings clean and hygienic while being a responsible pet owner.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/my_alphapet_dog_poop_bags_refill_rolls_1_640x_crop_top.jpg?v=1625752635',5),(6,'Cuddler Pet Bed Soft And Comforting',900,3,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','This soft and comforting bed provides a cozy retreat for your furry friend, ensuring they have a restful sleep. Its plush design and padded walls offer support and security, making it the perfect spot for relaxation. Treat your pet to a luxurious and comforting resting place with this Cuddler Pet Bed.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/cuddler_pet_bed_soft_and_comforting_1_640x_crop_top.jpg?v=1625752662',15),(7,'Meal Automatic Pet Feeder Bowl',700,1,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','This innovative feeder ensures timely and portion-controlled feeding for your furry friend. With customizable settings and a built-in timer, you can easily schedule multiple meals throughout the day. The spill-proof design and easy-to-clean bowl make feeding effortless and mess-free. Provide your pet with a consistent and convenient feeding experience with the Meal Automatic Pet Feeder Bowl.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/andrew_james_4_day_meal_automatic_pet_feeder_bowl_with_voice_recorder_includes_2_volume_reducers_1_adapter_tray_1_640x_crop_top.png?v=1625752682',30),(8,'Qpey Pet Food Bowl Stainless Steel',950,2,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','A durable stainless steel bowl designed for your pet\'s mealtime. Ensure a hygienic and convenient feeding experience with this easy-to-clean and long-lasting bowl. Keep your furry friend happy and satisfied during every meal.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/qpey_pet_food_bowl_stainless_steel_1_640x_crop_top.jpg?v=1625752623',25),(9,'Gaucho Goods Tribal Leather Dog Collar',1000,3,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','Elevate your dog\'s style with the Gaucho Goods Tribal Leather Dog Collar. Crafted with premium leather and adorned with tribal-inspired designs, this collar combines fashion with durability. Ensure a secure and comfortable fit for your furry friend while adding a touch of uniqueness to their look. Let your dog stand out in style with the Gaucho Goods Tribal Leather Dog Collar.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/gaucho_goods_tribal_leather_dog_collar_1_640x_crop_top.jpg?v=1625752646',18),(10,'Dogline Biothane Waterproof Dog Leash Strong Coated Nylon',800,1,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','A strong and durable coated nylon leash that withstands any weather. Perfect for active dogs, it provides a reliable grip and easy control. Keep your furry companion safe and stylish on every adventure.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/dogline_biothan_waterproof_dog_leash_strong_coated_nylon_1_640x_crop_top.jpg?v=1625752576',30),(11,'Best Friends By Sheri OrthoComfort Deep Dish Cuddler',800,2,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','A charming animal world is already waiting for you! Little hearts of those animals we take care of are able to warm us and hide from sad thoughts no matter how big our pets are....','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/best_friends_by_sheri_orthoComfort_deep_dish_cuddler_1_640x_crop_top.jpg?v=1625752589',25),(12,'Halo Pet Microchip Scanner',880,3,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','The Halo Pet Microchip Scanner is an essential tool for pet owners and professionals. This handheld device can read and verify microchip information, helping you locate lost pets and ensure their safety. With its user-friendly interface and compact design, it\'s easy to use and carry. Make pet care a breeze with this reliable scanner.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/halo_pet_microchip_scanner_mid06_pink_in_a_carry_case_with_car_charger_1_640x_crop_top.png?v=1625752570',18),(13,'Hing Designs The Bone Bowl with Non Slip Rubber Feet and Dishwasher Safe Removable Stainless Steel Bowls Pink',990,1,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','The Hing Designs Bone Bowl is both functional and stylish. Its unique bone-shaped design adds a touch of fun to your pet\'s mealtime. The non-slip rubber feet keep the bowl in place, and the stainless steel bowls are easy to remove and dishwasher-safe, ensuring a hygienic eating experience for your pet.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/hing_designs_the_bone_bowl_with_non_slip_rubber_feet_and_dishwasher_safe_removable_stainless_steel_bowls_pink_1_640x_crop_top.png?v=1625752547',16),(14,'Waterproof Non Slip Fda Grade Silicone Cat Pet Bowl Feeding Placemat',809,2,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','This FDA-grade silicone placemat is a must-have for pet owners. It\'s waterproof and non-slip, protecting your floors from spills and messes during mealtime. The high-quality silicone material is safe for pets, and the mat is easy to clean, making your life easier.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/waterproof_non_slip_fda_grade_silicone_cat_pet_bowl_feeding_placemat_1_640x_crop_top.jpg?v=1625752595',17),(15,'Wrapok Compostable Dog Poop Bags',700,3,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','When it comes to pet waste disposal, choose Wrapok Compostable Dog Poop Bags. These eco-friendly bags are made from compostable materials, reducing your environmental footprint. They are strong, leak-proof, and easy to tie securely. Responsible pet ownership meets sustainability with these bags.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/wrapok_compostable_dog_poop_bags_1_640x_crop_top.jpg?v=1625752537',20),(16,'Zehui Pet Dog Cat Sweater Puppy T Shirt Warm Hoodies Coat Clothes Apparel Black S',900,1,1,'2023-10-10 00:10:46','2023-10-10 00:10:46','Keep your furry companion warm and stylish with the Zehui Pet Sweater. This black knitted sweater, available in size S, provides warmth and comfort during colder seasons. It\'s not only functional but also adds a fashionable touch to your pet\'s wardrobe. Dress your pet in comfort and style with this adorable hoodie.','https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/zehui_pet_dog_cat_sweater_puppy_t_shirt_warm_hoodies_coat_clothes_apparel_black_s_1_640x_crop_top.png?v=1625752530',26);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-06 11:46:18
