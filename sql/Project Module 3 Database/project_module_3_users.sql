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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status_id` int NOT NULL,
  `role_id` int NOT NULL,
  `image_avatar` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `status_id` (`status_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `user_statuses` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin.petshop@gmail.com','Admin','$2a$10$rJHIwL2p4PNxGSIME1rTKeDyoptuWitFMn1S.Mo.xdTMtXM5vhs3K',1,1,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:43:49','2023-10-10 07:43:49'),(2,'admin2@gmail.com','Chielse Vip','$2a$10$taTUMUqUfXHq8s5v7TRm3ez9DOaAZ8Qd7WaqIId22/jSNdqhz/YZG',1,2,'http://localhost:7373/uploads/1697424864024-shiba - Copy.jpg','2023-10-10 07:43:54','2023-10-10 07:43:54'),(3,'admin3@gmail.com','Johnson','$2a$10$yJuisMRlDsCOjgtYKNfM4OzGCRj4b3poH93w4HZQ7A525NnrLohdG',2,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:43:58','2023-10-10 07:43:58'),(4,'mohamed1972@hotmail.com','James Mohamed','$2a$10$Vxse4cc0PFHESYvvVgbREO5XlePrCxoFkTP1gWrs6nHyrwt8YenHe',1,3,'http://localhost:7373/uploads/1697349434280-shiba - Copy.jpg','2023-10-10 07:44:03','2023-10-10 07:44:03'),(5,'davidhelms1987@yahoo.com','David Helms','$2a$10$sFJ9eCusDQXg76IxjTrlxOeGMFEAGJRq7JL8J/Fem7U1urSie5Bru',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:08','2023-10-10 07:44:08'),(6,'kevinlee1997@yahoo.com','Kevin Lee','$2a$10$De6Qjlx3lRsU78GnBsRHe.IeBgSy7zekiwLlsfu5.7gA6qrEQDcMK',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:12','2023-10-10 07:44:12'),(7,'leonardo2009@yahoo.com','Leonardo','$2a$10$vWs6BlSkAexD2HIWJnXuYerx.NdXznRK/ocA6DwGBSdEYcu2IaNnO',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:20','2023-10-10 07:44:20'),(8,'moses_decko9@hotmail.com','Moses Sharon','$2a$10$julvx3oQUj/K/lfltSMJmefwVD8BktZU8qf63dIz7XfKQsFf2/0ZS',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:36','2023-10-10 07:44:36'),(9,'velma.greenho@gmail.com','Velma Marinelli','$2a$10$34i7ZEY/cP62ltaeOHnM5OZl29mOqgSOJX4aBMpZ2IYtYi3bzY82i',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:40','2023-10-10 07:44:40'),(10,'tonyteo@gmail.com','Tony Teo','$2a$10$yTZo9SNKbXQvaWV7RLslv.9uIoFlGFKc9EYVmPk8ICQYmJ9nJGS5W',2,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:45','2023-10-10 07:44:45'),(11,'newuser@gmail.com','New User','$2a$10$RfkYEg1ZR2GHSY8r6ea/DupEygvp1KjWMmpMVnpBFPKA9tuSKEbvy',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-11 03:09:27','2023-10-11 03:09:27'),(12,'newuser2@gmail.com','New User','$2a$10$IjYOB0YmBmnq7Ppz43VNcee9HKOfUWu5cvP4K1qxJLJs0nS8TeaFi',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-11 03:18:05','2023-10-11 03:18:05'),(13,'admin2.petshop@gmail.com','Admin','$2a$10$RANcTdW/mPHk0a.SNx7Ice7zzjd8b4y.S3SdR8pYrS66k25OxsEUu',1,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-11 03:23:37','2023-10-11 03:23:37'),(14,'test@gmail.com','Andy Wang','$2a$10$yD6uVJ/clF0S8T1ZIocYue72oHy.q4v/rGzdjXGLcRwDOkhz6W6F6',2,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-11 03:27:56','2023-10-11 03:27:56'),(15,'admin3.petshop@gmail.com','Admin','$2a$10$j8j3ibDuh6zHWiA1v5ote.iwqGWdcCrp46YWhEXE1R/r3vzvIVZA2',1,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-11 03:42:26','2023-10-11 03:42:26'),(16,'admin4.petshop@gmail.com','Admin','$2a$10$Jvh0h0vhg5m4vlNT9ld13ucU2vN5.tk0PQlyBkIAS9bplmAQ83ghO',1,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-11 03:43:24','2023-10-11 03:43:24'),(17,'newuser5@gmail.com','New User','$2a$10$bS6Y8Ld6.ifQJIiGy0H.WeEesIflVNDkBhz4YU5gxuqHXp8ddtyFO',1,3,'http://localhost:7373/uploads/1696999592515-shiba.jpg','2023-10-11 03:51:53','2023-10-11 03:51:53'),(19,'test2@gmail.com','Andy Wang','$2a$10$WIesJx47ZIY7q4jghIh2meIzw5rH8iNYYzNsL7Bv9qLw2ekElQBfW',2,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-11 04:57:14','2023-10-11 04:57:14'),(21,'admin5.petshop@gmail.com','Admin','$2a$10$Hzm5bBBH61dVILEtT7SBROmIN5kziTofb8vV23THK7iaT7DuUYFBa',1,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-12 09:00:52','2023-10-12 09:00:52'),(22,'anminh@gmail.com','Anh Minh','$2a$10$xFRGZ5hzSLzfhTLih33dgOvpN7hdnE0pk7LtDThXk0zppHCuKKqUy',1,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-12 09:03:29','2023-10-12 09:03:29'),(23,'anminhd@gmail.com','Anh','$2a$10$Ug.hX40yalnmOGCO5JOdN.0pDLjcNhS.ilLRtui3hLMN3DNsWe/bW',1,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-12 09:05:03','2023-10-12 09:05:03'),(26,'anhminh@gmail.com','Anh Minh','$2a$10$be193gqNk/BjsiL7iwu.IOIHcJ0LW5yI/bqEMglHZhh/fxpEuPTSK',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-16 12:06:00','2023-10-16 12:06:00');
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

-- Dump completed on 2023-10-16 23:14:49
