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
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `service_image` text NOT NULL,
  `working_time_id` int DEFAULT NULL,
  `post_type_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK.working_time.services` (`working_time_id`),
  KEY `FK.post_types.services` (`post_type_id`),
  CONSTRAINT `FK.post_types.services` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK.working_time.services` FOREIGN KEY (`working_time_id`) REFERENCES `working_time` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Veterinarian','<p>The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.</p>',300,'https://i.ibb.co/3YZ8rbD/veterinary-service.jpg',1,2,'2023-10-10 00:36:04','2023-10-13 21:54:37'),(2,'Pet Grooming','<p>Our Pet Grooming service offers your furry companions a professional pampering experience. Our pet care team will clean their coat, trim their nails, and style their fur, ensuring they look and feel their best, radiating a fresh and delightful appearance.</p>',300,'https://i.ibb.co/wS3TF7j/dog-grooming-service.jpg',1,2,'2023-10-10 00:36:47','2023-10-12 09:57:40'),(3,'Pet Sitting','When you require personal time away from your pet, our Pet Sitting service ensures they receive attentive care. Our dedicated team will visit your home to tend to your pets, providing feeding, walks, and all the love and attention they need, bridging the gap in your absence.',200,'https://i.ibb.co/PjQbR00/pet-sitting-service.png',1,2,'2023-10-10 00:37:02','2023-10-10 00:37:02');
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

-- Dump completed on 2023-11-06 11:46:16
