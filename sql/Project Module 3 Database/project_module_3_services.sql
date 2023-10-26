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
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int NOT NULL,
  `service_image` text NOT NULL,
  `working_time_id` int NOT NULL,
  `post_type_id` int NOT NULL DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `working_time_id` (`working_time_id`),
  KEY `post_type_id` (`post_type_id`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`working_time_id`) REFERENCES `working_times` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Veterinarian','<p>The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.</p>',300,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg',1,2,'2023-10-10 07:36:04','2023-10-14 04:54:37'),(2,'Pet Grooming','<p>Our Pet Grooming service offers your furry companions a professional pampering experience. Our pet care team will clean their coat, trim their nails, and style their fur, ensuring they look and feel their best, radiating a fresh and delightful appearance.</p>',300,'http://localhost:7373/uploads/1696923407529-dog-grooming-service.jpg',1,2,'2023-10-10 07:36:47','2023-10-12 16:57:40'),(3,'Pet Sitting','When you require personal time away from your pet, our Pet Sitting service ensures they receive attentive care. Our dedicated team will visit your home to tend to your pets, providing feeding, walks, and all the love and attention they need, bridging the gap in your absence.',200,'http://localhost:7373/uploads/1696923422191-pet-sitting-service.png',1,2,'2023-10-10 07:37:02','2023-10-10 07:37:02');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
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
