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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `status_id` int NOT NULL,
  `role_id` int NOT NULL,
  `image_avatar` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `FK_a2cecd1a3531c0b041e29ba46e1` (`role_id`),
  KEY `FK_9d295cb2f8df33c080e23acfb8f` (`status_id`),
  CONSTRAINT `FK_9d295cb2f8df33c080e23acfb8f` FOREIGN KEY (`status_id`) REFERENCES `user_statuses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin.petshop@gmail.com','Pet Shop','$2b$10$i3S3KIn0hlhEeTC1GI5uVOXqNqzI155lCagPQDRc4EStxFl5Fz4BG',1,1,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:11:16','2023-11-06 04:16:10'),(2,'admin2@gmail.com','Chelsie Champagne','$2b$10$s0T0UrOb.jlMIqKBVgzYIuKzAMoz4gYKdIjaotTBdaMEbDvjzOEqy',1,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:11:50','2023-11-06 04:16:10'),(3,'admin3@gmail.com','Johnson','$2b$10$QpZNo7dTFxHdKQ8YZQEMsenBBh56kHJxVuqK3IIoUUpL55B145d1G',2,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:11:55','2023-11-06 04:16:10'),(4,'mohamed1972@hotmail.com','James Mohamed','$2b$10$42VvidtqsCy44KeB2M4kI.Ke1LUkeP0HCamCUhNqojO69eHDc41wS',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:11:59','2023-11-06 04:16:19'),(5,'davidhelms1987@yahoo.com','David Helms','$2b$10$W.fUl83rUB7TaY/SYShhpuzCo3sV/hUjkBJyrMzcvntoUV2MxPDxu',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:12:04','2023-11-06 04:16:10'),(6,'kevinlee1997@yahoo.com','Kevin Lee','$2b$10$4Fg2c.BqeLY7xjaPvri5jul1WbWu/BRadGOzx8Q3inX/pZEjeI/3y',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:12:08','2023-11-06 04:16:10'),(7,'leonardo2009@yahoo.com','Leonardo','$2b$10$9hFiUh/wb17oDi57jIlE7.UnaOu9GKoJWsYSPLBFDh3cUU0jEWbZ.',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:12:12','2023-11-06 04:16:10'),(8,'moses_decko9@hotmail.com','Moses Sharon','$2b$10$E1/GfPm4WTaI4NTP0FT7verOOI8pd5J8DBF4bV6GaOYvnS.plfPHi',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:12:20','2023-11-06 04:16:10'),(9,'velma.greenho@gmail.com','Velma Marinelli','$2b$10$pmllMKcx5bmbIRD/lju9pOml4edZVErYzBnuKx49SF73C3bkE7dB2',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:12:23','2023-11-06 04:16:10'),(10,'tonyteo@gmail.com','Tony Teo','$2b$10$l91z/j6fYjw47CLFXOkiaeehUME/GpiSJb04XIJR4hiB1VK2OoQ4u',2,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-11-06 04:12:27','2023-11-06 04:16:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-06 11:46:17
