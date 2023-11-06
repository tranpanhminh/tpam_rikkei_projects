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
-- Table structure for table `product_comments`
--

DROP TABLE IF EXISTS `product_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` longtext NOT NULL,
  `rating` float NOT NULL,
  `post_type_id` int NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK.products.product_comments` (`post_id`),
  KEY `FK.users.product_comments` (`user_id`),
  KEY `FK.post_types.product_comments` (`post_type_id`),
  CONSTRAINT `FK.post_types.product_comments` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK.products.product_comments` FOREIGN KEY (`post_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK.users.product_comments` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_comments`
--

LOCK TABLES `product_comments` WRITE;
/*!40000 ALTER TABLE `product_comments` DISABLE KEYS */;
INSERT INTO `product_comments` VALUES (1,'I\'m really impressed with this product. It\'s well-made and exceeded my expectations.',5,1,2,1,'2023-10-12 00:10:58','2023-10-12 00:10:58'),(2,'The quality of this product is outstanding. I couldn\'t be happier with my purchase.',5,1,2,2,'2023-10-12 00:11:06','2023-10-12 00:11:06'),(3,'This product is a game-changer. It\'s made my life so much easier and more convenient.',4,1,2,4,'2023-10-12 00:11:13','2023-10-12 00:11:13'),(4,'I\'ve been using this product for a while now, and it\'s still in perfect condition. Great durability!',3,1,2,5,'2023-10-12 00:11:19','2023-10-12 00:11:19'),(5,'What a fantastic product! It\'s worth every penny and has improved my daily routine.',4,1,2,6,'2023-10-12 00:11:24','2023-10-12 00:11:24'),(6,'I love the design of this product. It\'s sleek and stylish, adding a touch of elegance to my space.',5,1,1,5,'2023-10-12 00:11:37','2023-10-12 00:11:37'),(7,'This product has become an essential part of my daily life. I can\'t imagine living without it.',5,1,1,4,'2023-10-12 00:11:42','2023-10-12 00:11:42'),(8,'I purchased this product as a gift, and the recipient absolutely loved it. Great choice!',4,1,1,7,'2023-10-12 00:11:47','2023-10-12 00:11:47'),(9,'The performance of this product is top-notch. It delivers on its promises and then some.',4,1,1,4,'2023-10-12 00:11:58','2023-11-06 04:40:09'),(10,'I\'m so glad I found this product. It\'s made a noticeable difference in my overall well-being.',4,1,1,4,'2023-10-15 07:22:54','2023-11-06 04:43:30'),(11,'This product is user-friendly and easy to set up. No complicated instructions to worry about.',4,1,1,4,'2023-10-18 00:24:06','2023-11-06 04:43:30');
/*!40000 ALTER TABLE `product_comments` ENABLE KEYS */;
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
