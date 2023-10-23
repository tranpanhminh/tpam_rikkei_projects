-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_module_3
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
  `comment` text NOT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT '5.0',
  `post_type_id` int NOT NULL DEFAULT '1',
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `user_role_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `post_type_id` (`post_type_id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_comments_ibfk_1` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `product_comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_comments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_comments`
--

LOCK TABLES `product_comments` WRITE;
/*!40000 ALTER TABLE `product_comments` DISABLE KEYS */;
INSERT INTO `product_comments` VALUES (1,'I\'m really impressed with this product. It\'s well-made and exceeded my expectations.',5.0,1,1,4,3,'2023-10-12 02:23:28','2023-10-12 02:23:28'),(2,'The quality of this product is outstanding. I couldn\'t be happier with my purchase.',5.0,1,1,1,1,'2023-10-12 02:23:41','2023-10-12 02:23:41'),(4,'I\'ve been using this product for a while now, and it\'s still in perfect condition. Great durability!',3.0,1,1,5,3,'2023-10-12 02:23:49','2023-10-12 02:23:49'),(39,'<p>Good</p>',5.0,1,3,1,1,'2023-10-17 06:44:11','2023-10-17 06:44:11'),(40,'<p>This product is so good</p>',5.0,1,3,4,3,'2023-10-18 15:08:59','2023-10-18 15:08:59'),(41,'<p>I very love it</p>',5.0,1,3,9,3,'2023-10-18 15:09:35','2023-10-18 15:09:35'),(42,'<p>Dịch vụ tốt</p>',5.0,1,1,1,1,'2023-10-20 03:40:51','2023-10-20 03:40:51'),(43,'<p>Sản phẩm chất lượng&nbsp;</p>\n<p><img src=\"http://localhost:7373/uploads/1697349434280-shiba%20-%20Copy.jpg\"></p>',5.0,1,1,4,3,'2023-10-20 03:41:13','2023-10-20 03:41:13'),(44,'<p>Tesst</p>',4.0,1,1,4,3,'2023-10-20 03:41:25','2023-10-20 03:41:25'),(45,'<p>&lt;h1&gt;Heading&lt;/h1&gt;</p>',5.0,1,1,4,3,'2023-10-20 03:51:21','2023-10-20 03:51:21'),(46,'<p><em><strong>Heading&nbsp;</strong></em></p>',5.0,1,1,4,3,'2023-10-20 03:52:08','2023-10-20 03:52:08'),(47,'<p>Test</p>',5.0,1,1,4,3,'2023-10-20 03:53:47','2023-10-20 03:53:47'),(48,'<p>Good Game</p>',3.5,1,1,6,3,'2023-10-20 03:54:17','2023-10-20 03:54:17');
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

-- Dump completed on 2023-10-23 15:27:46
