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
-- Table structure for table `service_comments`
--

DROP TABLE IF EXISTS `service_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_comments` (
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
  CONSTRAINT `service_comments_ibfk_1` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `service_comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `service_comments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_comments`
--

LOCK TABLES `service_comments` WRITE;
/*!40000 ALTER TABLE `service_comments` DISABLE KEYS */;
INSERT INTO `service_comments` VALUES (1,'I\'ve gifted this service to multiple friends, and they\'ve all been impressed. It\'s a crowd-pleaser.',5.0,2,2,1,1,'2023-10-12 07:10:58','2023-10-12 07:10:58'),(2,'I love the versatility of this service. It adapts to various situations effortlessly.',5.0,2,2,2,2,'2023-10-12 07:11:06','2023-10-12 07:11:06'),(3,'This service arrived earlier than expected, and the packaging was perfect. A great buying experience.',4.0,2,2,4,3,'2023-10-12 07:11:13','2023-10-12 07:11:13'),(4,'I can\'t get over how great this service is. It\'s an investment in convenience and quality.',3.0,2,2,5,3,'2023-10-12 07:11:19','2023-10-12 07:11:19'),(5,'I\'ve compared similar services, and this one stands out for its performance and durability.',4.0,2,2,6,3,'2023-10-12 07:11:24','2023-10-12 07:11:24'),(6,'The user manual for this service is easy to follow, making setup a breeze.',5.0,2,1,5,3,'2023-10-12 07:11:37','2023-10-12 07:11:37'),(7,'This service has simplified my daily routine. I wonder how I managed without it before.',5.0,2,1,4,3,'2023-10-12 07:11:42','2023-10-12 07:11:42'),(8,'I\'m thrilled with this purchase. It\'s a fantastic addition to my collection of gadgets.',4.0,2,1,7,3,'2023-10-12 07:11:47','2023-10-12 07:11:47'),(10,'I\'ve recommended this service to colleagues, and they\'ve all had positive experiences. Thumbs up!',4.0,2,1,4,3,'2023-10-12 07:11:58','2023-10-12 07:11:58'),(13,'<p>Good Service</p>',5.0,2,1,1,1,'2023-10-15 14:20:51','2023-10-15 14:20:51'),(14,'<p>Qu&aacute; tuyệt vời <img src=\"http://localhost:7373/uploads/1696923364216-veterinary-service.jpg\"></p>',5.0,2,1,1,1,'2023-10-15 14:20:58','2023-10-15 14:20:58'),(16,'<p>G&ocirc;d</p>',5.0,2,1,1,1,'2023-10-15 14:21:44','2023-10-15 14:21:44'),(17,'<p>Dịch vụ tuyệt vời</p>',4.0,2,1,4,3,'2023-10-15 14:22:54','2023-10-15 14:22:54'),(19,'<p>Hay qu&aacute; <img src=\"https://i.ibb.co/3BtQdVD/pet-shop.png\"></p>',4.0,2,1,4,3,'2023-10-18 07:24:06','2023-10-18 07:24:06');
/*!40000 ALTER TABLE `service_comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-26 11:25:43
