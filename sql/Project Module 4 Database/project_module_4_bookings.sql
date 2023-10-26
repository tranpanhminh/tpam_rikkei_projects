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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` text NOT NULL,
  `user_id` int NOT NULL,
  `service_id` int DEFAULT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_description` text NOT NULL,
  `service_price` int NOT NULL,
  `service_image` text NOT NULL,
  `date` datetime NOT NULL,
  `status_id` int NOT NULL,
  `booking_date` varchar(255) NOT NULL,
  `calendar` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`),
  KEY `service_id` (`service_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `booking_statuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'Mohamed','12345678909',4,1,'Veterinarian','The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.',500,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-10 10:15:39',4,'2023-08-15','09:00 AM - 11:30 AM','2023-10-10 10:15:39','2023-10-15 10:02:19'),(2,'Mohamed','12345678909',4,2,'Pet Grooming','Our Pet Grooming service offers your furry companions a professional pampering experience. Our pet care team will clean their coat, trim their nails, and style their fur, ensuring they look and feel their best, radiating a fresh and delightful appearance.',300,'http://localhost:7373/uploads/1696923407529-dog-grooming-service.jpg','2023-10-10 10:15:51',4,'2023-08-16','09:00 AM - 11:30 AM','2023-10-10 10:15:51','2023-10-15 10:04:25'),(3,'Mohamed','12345678909',4,3,'Pet Sitting','When you require personal time away from your pet, our Pet Sitting service ensures they receive attentive care. Our dedicated team will visit your home to tend to your pets, providing feeding, walks, and all the love and attention they need, bridging the gap in your absence.',200,'http://localhost:7373/uploads/1696923422191-pet-sitting-service.png','2023-10-10 10:16:55',4,'2023-08-17','14:00 PM - 16:30 PM','2023-10-10 10:16:55','2023-10-15 10:04:55'),(4,'Mohamed','12345678909',4,1,'Veterinarian','The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.',500,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-10 10:17:04',3,'2023-08-18','14:00 PM - 16:30 PM','2023-10-10 10:17:04','2023-10-17 13:43:27'),(5,'David Helms','13232233233',5,3,'Pet Sitting','When you require personal time away from your pet, our Pet Sitting service ensures they receive attentive care. Our dedicated team will visit your home to tend to your pets, providing feeding, walks, and all the love and attention they need, bridging the gap in your absence.',200,'http://localhost:7373/uploads/1696923422191-pet-sitting-service.png','2023-10-10 10:17:28',3,'2023-09-19','09:00 AM - 11:30 AM','2023-10-10 10:17:28','2023-10-17 13:47:27'),(6,'David Helms','13232233233',5,1,'Veterinarian','The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.',500,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-10 10:17:44',4,'2023-09-20','14:00 PM - 16:30 PM','2023-10-10 10:17:44','2023-10-17 13:47:33'),(7,'Kevin Lee','14232533443',6,1,'Veterinarian','The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.',500,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-10 10:18:51',3,'2023-09-21','14:00 PM - 16:30 PM','2023-10-10 10:18:51','2023-10-17 13:47:38'),(8,'Leonardo','15232323223',7,2,'Pet Grooming','Our Pet Grooming service offers your furry companions a professional pampering experience. Our pet care team will clean their coat, trim their nails, and style their fur, ensuring they look and feel their best, radiating a fresh and delightful appearance.',300,'http://localhost:7373/uploads/1696923407529-dog-grooming-service.jpg','2023-10-10 10:19:09',3,'2023-09-22','14:00 PM - 16:30 PM','2023-10-10 10:19:09','2023-10-17 13:47:47'),(10,'Velma Marinelli','17546454564',9,1,'Veterinarian','The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.',500,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-10 10:19:49',2,'2023-10-25','14:00 PM - 16:30 PM','2023-10-10 10:19:49','2023-10-13 15:47:41'),(11,'Mohamed','12345678909',4,1,'Veterinarian','The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.',500,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-11 09:55:02',3,'2023-11-25','14:00 PM - 16:30 PM','2023-10-11 09:55:02','2023-10-11 10:05:28'),(12,'Mohamed','12345678909',4,1,'Veterinarian','The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.',500,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-12 07:51:25',2,'2023-11-16','14:00 PM - 16:30 PM','2023-10-12 07:51:25','2023-10-17 15:42:36'),(22,'Anh Minh','12345678909',4,1,'Veterinarian','<p>The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.</p>',300,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-18 07:23:11',1,'2023-10-19','09:00 AM - 11:30 AM','2023-10-18 07:23:11','2023-10-18 07:23:11'),(23,'Anh Minh','12345678902',29,1,'Veterinarian','<p>The health of your pets is our utmost priority. Our Veterinarian service provides health check-ups, vaccinations, diagnoses, and treatments as needed. Our experienced veterinary team ensures your pets are in prime condition, offering peace of mind for their well-being.</p>',300,'http://localhost:7373/uploads/1696923364216-veterinary-service.jpg','2023-10-20 03:33:16',4,'2023-10-23','09:00 AM - 11:30 AM','2023-10-20 03:33:16','2023-10-20 03:33:58');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-26 11:25:42
