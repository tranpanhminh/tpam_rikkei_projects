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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_comments`
--

LOCK TABLES `product_comments` WRITE;
/*!40000 ALTER TABLE `product_comments` DISABLE KEYS */;
INSERT INTO `product_comments` VALUES (1,'I\'m really impressed with this product. It\'s well-made and exceeded my expectations.',5.0,1,1,4,3,'2023-10-12 02:23:28','2023-10-12 02:23:28'),(2,'The quality of this product is outstanding. I couldn\'t be happier with my purchase.',5.0,1,1,1,1,'2023-10-12 02:23:41','2023-10-12 02:23:41'),(4,'I\'ve been using this product for a while now, and it\'s still in perfect condition. Great durability!',3.0,1,1,5,3,'2023-10-12 02:23:49','2023-10-12 02:23:49'),(6,'I love the design of this product. It\'s sleek and stylish, adding a touch of elegance to my space.',5.0,1,2,2,2,'2023-10-12 02:24:05','2023-10-12 02:24:05'),(7,'This product has become an essential part of my daily life. I can\'t imagine living without it.',5.0,1,2,4,3,'2023-10-12 02:24:09','2023-10-12 02:24:09'),(8,'I purchased this product as a gift, and the recipient absolutely loved it. Great choice!',4.0,1,2,7,3,'2023-10-12 02:24:14','2023-10-12 02:24:14'),(9,'The performance of this product is top-notch. It delivers on its promises and then some.',4.0,1,2,8,3,'2023-10-12 02:24:18','2023-10-12 02:24:18'),(10,'I\'m so glad I found this product. It\'s made a noticeable difference in my overall well-being.',4.0,1,2,9,3,'2023-10-12 02:24:21','2023-10-12 02:24:21'),(11,'<p>Anh Minh</p>',5.0,1,1,1,1,'2023-10-15 13:25:05','2023-10-15 13:25:05'),(12,'<p>Tony Teo</p>',5.0,1,1,1,1,'2023-10-15 13:25:41','2023-10-15 13:25:41'),(13,'<p>Tony Teo</p>',5.0,1,1,1,1,'2023-10-15 13:26:07','2023-10-15 13:26:07'),(14,'<p>Tony Teo</p>',5.0,1,1,1,1,'2023-10-15 13:26:30','2023-10-15 13:26:30'),(15,'<p>Tony Teo</p>',5.0,1,1,1,1,'2023-10-15 13:27:18','2023-10-15 13:27:18'),(16,'<p>Tony Teo</p>',5.0,1,1,1,1,'2023-10-15 13:27:41','2023-10-15 13:27:41'),(17,'<p>Test</p>',5.0,1,1,1,1,'2023-10-15 13:27:49','2023-10-15 13:27:49'),(18,'<p>Test</p>',5.0,1,1,1,1,'2023-10-15 13:31:50','2023-10-15 13:31:50'),(19,'<p>test</p>',5.0,1,1,1,1,'2023-10-15 13:32:53','2023-10-15 13:32:53'),(20,'<p>test</p>',5.0,1,1,1,1,'2023-10-15 13:32:53','2023-10-15 13:32:53'),(21,'<p>test</p>',5.0,1,1,1,1,'2023-10-15 13:33:41','2023-10-15 13:33:41'),(22,'<p>test</p>',5.0,1,1,1,1,'2023-10-15 13:33:41','2023-10-15 13:33:41'),(23,'<p>Test</p>',5.0,1,1,1,1,'2023-10-15 13:33:46','2023-10-15 13:33:46'),(24,'<p>Test</p>',5.0,1,1,1,1,'2023-10-15 13:34:02','2023-10-15 13:34:02'),(25,'<p>Test</p>',5.0,1,1,1,1,'2023-10-15 13:34:05','2023-10-15 13:34:05'),(26,'<p>test</p>',5.0,1,1,1,1,'2023-10-15 13:36:12','2023-10-15 13:36:12'),(31,'<p>Good</p>',4.0,1,1,4,3,'2023-10-15 13:43:31','2023-10-15 13:43:31'),(32,'<p>Sản phẩm qu&aacute; tuyệt vời</p>',4.0,1,1,4,3,'2023-10-15 13:43:47','2023-10-15 13:43:47'),(33,'<p>Good Product</p>',4.0,1,1,4,3,'2023-10-15 13:44:04','2023-10-15 13:44:04'),(34,'<p>T</p>',4.0,1,1,4,3,'2023-10-15 13:45:36','2023-10-15 13:45:36'),(35,'<p>ok</p>',3.0,1,1,4,3,'2023-10-15 13:45:45','2023-10-15 13:45:45'),(36,'<p>dstset</p>',4.5,1,1,4,3,'2023-10-15 13:51:24','2023-10-15 13:51:24'),(37,'<p>Good</p>',4.0,1,1,4,3,'2023-10-15 13:52:08','2023-10-15 13:52:08'),(38,'<p>Goood</p>',4.0,1,1,4,3,'2023-10-15 14:24:15','2023-10-15 14:24:15');
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

-- Dump completed on 2023-10-16 23:14:49
