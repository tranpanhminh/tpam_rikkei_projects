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
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` text NOT NULL,
  `product_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,'http://localhost:7373/uploads/1697170206437-blueberry-pet-01.jpg',1,'2023-10-10 13:42:12','2023-10-13 04:10:06'),(2,'http://localhost:7373/uploads/1696945332677-blueberry-pet-02.jpg',1,'2023-10-10 13:42:12','2023-10-10 13:42:12'),(3,'http://localhost:7373/uploads/1696945332679-blueberry-pet-03.jpg',1,'2023-10-10 13:42:12','2023-10-10 13:42:12'),(4,'http://localhost:7373/uploads/1696945332679-blueberry-pet-04.jpg',1,'2023-10-10 13:42:12','2023-10-10 13:42:12'),(9,'http://localhost:7373/uploads/1697471859554-dog-brush-01.jpg',3,'2023-10-10 13:42:55','2023-10-16 15:57:39'),(10,'http://localhost:7373/uploads/1696945375888-dog-brush-02.jpg',3,'2023-10-10 13:42:55','2023-10-10 13:42:55'),(11,'http://localhost:7373/uploads/1696945375888-dog-brush-03.jpg',3,'2023-10-10 13:42:55','2023-10-10 13:42:55'),(12,'http://localhost:7373/uploads/1696945375888-dog-brush-04.jpg',3,'2023-10-10 13:42:55','2023-10-10 13:42:55'),(13,'http://localhost:7373/uploads/1697471885089-dog-leash-01.jpg',4,'2023-10-10 13:43:03','2023-10-16 15:58:05'),(14,'http://localhost:7373/uploads/1696945383190-dog-leash-02.jpg',4,'2023-10-10 13:43:03','2023-10-10 13:43:03'),(15,'http://localhost:7373/uploads/1696945383191-dog-leash-03.jpg',4,'2023-10-10 13:43:03','2023-10-10 13:43:03'),(16,'http://localhost:7373/uploads/1696945383192-dog-leash-04.jpg',4,'2023-10-10 13:43:03','2023-10-10 13:43:03'),(17,'http://localhost:7373/uploads/1697471897448-dog-poop-bags-01.jpg',5,'2023-10-10 13:43:10','2023-10-16 15:58:17'),(18,'http://localhost:7373/uploads/1696945390710-dog-poop-bags-02.jpg',5,'2023-10-10 13:43:10','2023-10-10 13:43:10'),(19,'http://localhost:7373/uploads/1696945390711-dog-poop-bags-03.jpg',5,'2023-10-10 13:43:10','2023-10-10 13:43:10'),(20,'http://localhost:7373/uploads/1696945390712-dog-poop-bags-04.jpg',5,'2023-10-10 13:43:10','2023-10-10 13:43:10'),(21,'http://localhost:7373/uploads/1697516773814-pet-bed-01.jpg',6,'2023-10-10 13:43:19','2023-10-17 04:26:13'),(22,'http://localhost:7373/uploads/1696945399270-pet-bed-02.jpg',6,'2023-10-10 13:43:19','2023-10-10 13:43:19'),(23,'http://localhost:7373/uploads/1696945399271-pet-bed-03.jpg',6,'2023-10-10 13:43:19','2023-10-10 13:43:19'),(24,'http://localhost:7373/uploads/1696945399272-pet-bed-04.jpg',6,'2023-10-10 13:43:19','2023-10-10 13:43:19'),(25,'http://localhost:7373/uploads/1697472016867-pet-feeder-bowl-01.jpg',7,'2023-10-10 13:43:26','2023-10-16 16:00:16'),(26,'http://localhost:7373/uploads/1696945406819-pet-feeder-bowl-02.jpg',7,'2023-10-10 13:43:26','2023-10-10 13:43:26'),(27,'http://localhost:7373/uploads/1696945406819-pet-feeder-bowl-03.jpg',7,'2023-10-10 13:43:26','2023-10-10 13:43:26'),(28,'http://localhost:7373/uploads/1696945406820-pet-feeder-bowl-04.jpg',7,'2023-10-10 13:43:26','2023-10-10 13:43:26'),(29,'http://localhost:7373/uploads/1697472029036-pet-food-bowl-01.jpg',8,'2023-10-10 13:43:34','2023-10-16 16:00:29'),(30,'http://localhost:7373/uploads/1696945414986-pet-food-bowl-02.jpg',8,'2023-10-10 13:43:34','2023-10-10 13:43:34'),(31,'http://localhost:7373/uploads/1696945414987-pet-food-bowl-03.jpg',8,'2023-10-10 13:43:35','2023-10-10 13:43:35'),(32,'http://localhost:7373/uploads/1696945414987-pet-food-bowl-04.jpg',8,'2023-10-10 13:43:35','2023-10-10 13:43:35'),(33,'http://localhost:7373/uploads/1697471961632-tribal-leather-01.jpg',9,'2023-10-10 13:43:41','2023-10-16 15:59:21'),(34,'http://localhost:7373/uploads/1696945421808-tribal-leather-02.jpg',9,'2023-10-10 13:43:41','2023-10-10 13:43:41'),(35,'http://localhost:7373/uploads/1696945421808-tribal-leather-03.jpg',9,'2023-10-10 13:43:41','2023-10-10 13:43:41'),(36,'http://localhost:7373/uploads/1696945421809-tribal-leather-04.jpg',9,'2023-10-10 13:43:41','2023-10-10 13:43:41'),(37,'http://localhost:7373/uploads/1697471971496-waterproof-dog-leash-01.jpg',10,'2023-10-10 13:43:50','2023-10-16 15:59:31'),(38,'http://localhost:7373/uploads/1696945430157-waterproof-dog-leash-02.jpg',10,'2023-10-10 13:43:50','2023-10-10 13:43:50'),(39,'http://localhost:7373/uploads/1696945430158-waterproof-dog-leash-03.jpg',10,'2023-10-10 13:43:50','2023-10-10 13:43:50'),(40,'http://localhost:7373/uploads/1696945430158-waterproof-dog-leash-04.jpg',10,'2023-10-10 13:43:50','2023-10-10 13:43:50'),(41,'http://localhost:7373/uploads/1697471985449-deep-dish-cuddler-01.jpg',11,'2023-10-10 13:43:56','2023-10-16 15:59:45'),(42,'http://localhost:7373/uploads/1696945436891-deep-dish-cuddler-02.jpg',11,'2023-10-10 13:43:56','2023-10-10 13:43:56'),(43,'http://localhost:7373/uploads/1696945436891-deep-dish-cuddler-03.jpg',11,'2023-10-10 13:43:56','2023-10-10 13:43:56'),(44,'http://localhost:7373/uploads/1696945436891-deep-dish-cuddler-04.jpg',11,'2023-10-10 13:43:56','2023-10-10 13:43:56'),(173,'http://localhost:7373/uploads/1697472112735-pet-scanner-01.jpg',44,'2023-10-16 16:01:52','2023-10-16 16:01:52'),(174,'http://localhost:7373/uploads/1697472112735-pet-scanner-02.jpg',44,'2023-10-16 16:01:52','2023-10-16 16:01:52'),(175,'http://localhost:7373/uploads/1697472112736-pet-scanner-03.jpg',44,'2023-10-16 16:01:52','2023-10-16 16:01:52'),(176,'http://localhost:7373/uploads/1697472112736-pet-scanner-04.jpg',44,'2023-10-16 16:01:52','2023-10-16 16:01:52'),(177,'http://localhost:7373/uploads/1697472201432-bone-bowl-01.jpg',45,'2023-10-16 16:03:21','2023-10-16 16:03:21'),(178,'http://localhost:7373/uploads/1697472201432-bone-bowl-02.jpg',45,'2023-10-16 16:03:21','2023-10-16 16:03:21'),(179,'http://localhost:7373/uploads/1697472201433-bone-bowl-03.jpg',45,'2023-10-16 16:03:21','2023-10-16 16:03:21'),(180,'http://localhost:7373/uploads/1697472201433-bone-bowl-04.jpg',45,'2023-10-16 16:03:21','2023-10-16 16:03:21'),(181,'http://localhost:7373/uploads/1697681228975-pet-placemat-01.jpg',46,'2023-10-16 16:03:56','2023-10-19 02:07:08'),(182,'http://localhost:7373/uploads/1697681238967-pet-placemat-02.jpg',46,'2023-10-16 16:03:56','2023-10-19 02:07:18'),(183,'http://localhost:7373/uploads/1697681239254-pet-placemat-03.jpg',46,'2023-10-16 16:03:56','2023-10-19 02:07:19'),(184,'http://localhost:7373/uploads/1697681239567-pet-placemat-04.jpg',46,'2023-10-16 16:03:56','2023-10-19 02:07:19'),(185,'http://localhost:7373/uploads/1697472302711-poop-bags-01.jpg',47,'2023-10-16 16:05:02','2023-10-16 16:05:02'),(186,'http://localhost:7373/uploads/1697472302711-poop-bags-02.jpg',47,'2023-10-16 16:05:02','2023-10-16 16:05:02'),(187,'http://localhost:7373/uploads/1697472302713-poop-bags-03.jpg',47,'2023-10-16 16:05:02','2023-10-16 16:05:02'),(188,'http://localhost:7373/uploads/1697472302715-poop-bags-04.jpg',47,'2023-10-16 16:05:02','2023-10-16 16:05:02'),(189,'http://localhost:7373/uploads/1697472353639-puppy-shirt-01.jpg',48,'2023-10-16 16:05:53','2023-10-16 16:05:53'),(190,'http://localhost:7373/uploads/1697472353639-puppy-shirt-02.jpg',48,'2023-10-16 16:05:53','2023-10-16 16:05:53'),(191,'http://localhost:7373/uploads/1697472353639-puppy-shirt-03.jpg',48,'2023-10-16 16:05:53','2023-10-16 16:05:53'),(192,'http://localhost:7373/uploads/1697472353640-puppy-shirt-04.jpg',48,'2023-10-16 16:05:53','2023-10-16 16:05:53'),(193,'http://localhost:7373/uploads/1697508865754-hdp-dog-boot-01.jpg',49,'2023-10-17 02:13:59','2023-10-17 02:14:25'),(194,'http://localhost:7373/uploads/1697508866069-hdp-dog-boot-02.jpg',49,'2023-10-17 02:13:59','2023-10-17 02:14:26'),(195,'http://localhost:7373/uploads/1697508866427-hdp-dog-boot-03.jpg',49,'2023-10-17 02:13:59','2023-10-17 02:14:26'),(196,'http://localhost:7373/uploads/1697508866868-hdp-dog-boot-04.jpg',49,'2023-10-17 02:13:59','2023-10-17 02:14:26'),(197,'http://localhost:7373/uploads/1697538802153-shiba - Copy.jpg',50,'2023-10-17 10:33:22','2023-10-17 10:33:22'),(198,'http://localhost:7373/uploads/1697538802155-shiba.jpg',50,'2023-10-17 10:33:22','2023-10-17 10:33:22'),(199,'http://localhost:7373/uploads/1697538802157-a-happy-shiba-inu-dog-standing-in-a-garden.jpg',50,'2023-10-17 10:33:22','2023-10-17 10:33:22'),(200,'http://localhost:7373/uploads/1697538802176-7asha-512.png',50,'2023-10-17 10:33:22','2023-10-17 10:33:22'),(201,'http://localhost:7373/uploads/1697773063428-cat-bag-04.jpg',51,'2023-10-20 03:37:22','2023-10-20 03:37:43'),(202,'http://localhost:7373/uploads/1697773042971-exo-terra-03.jpg',51,'2023-10-20 03:37:22','2023-10-20 03:37:22'),(203,'http://localhost:7373/uploads/1697773042972-exo-terra-02.jpg',51,'2023-10-20 03:37:22','2023-10-20 03:37:22'),(204,'http://localhost:7373/uploads/1697773042974-exo-terra-01.jpg',51,'2023-10-20 03:37:22','2023-10-20 03:37:22');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-23 15:27:45
