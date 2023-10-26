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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin.petshop@gmail.com','Admin','$2a$10$awK5OHdtBtA8Ml/qxVkyt.f2P8y4oEZwCOMcBtSPjbC5WLLvipWAW',1,1,'http://localhost:7373/uploads/1697775314064-pet-shop.65ea4230eb0de89d73a4.png','2023-10-10 07:43:49','2023-10-10 07:43:49'),(2,'admin2@gmail.com','Chielse Vip','$2a$10$taTUMUqUfXHq8s5v7TRm3ez9DOaAZ8Qd7WaqIId22/jSNdqhz/YZG',1,2,'http://localhost:7373/uploads/1697424864024-shiba - Copy.jpg','2023-10-10 07:43:54','2023-10-10 07:43:54'),(3,'admin3@gmail.com','Johnson','$2a$10$yJuisMRlDsCOjgtYKNfM4OzGCRj4b3poH93w4HZQ7A525NnrLohdG',2,2,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:43:58','2023-10-10 07:43:58'),(4,'mohamed1972@hotmail.com','James Mohamed','$2a$10$GbUZBUCp3PiqSnR2xOYZgOSGxrTWzsjXynja2bNQlYO346X38aheS',1,3,'http://localhost:7373/uploads/1697349434280-shiba - Copy.jpg','2023-10-10 07:44:03','2023-10-10 07:44:03'),(5,'davidhelms1987@yahoo.com','David Helms','$2a$10$t23SHNCay5WinguQo8L.G.NN7g0.UVoEIU1BQOE4vfkY9XWaw9vWq',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:08','2023-10-10 07:44:08'),(6,'kevinlee1997@yahoo.com','Kevin Lee','$2a$10$qtcaPrwR7K1vC7ZRCvZ6i.fjT5lsV40msM6Huv6HSdSnZblNCE0GS',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:12','2023-10-10 07:44:12'),(7,'leonardo2009@yahoo.com','Leonardo','$2a$10$vWs6BlSkAexD2HIWJnXuYerx.NdXznRK/ocA6DwGBSdEYcu2IaNnO',1,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:20','2023-10-10 07:44:20'),(9,'velma.greenho@gmail.com','Velma Marinelli','$2a$10$34i7ZEY/cP62ltaeOHnM5OZl29mOqgSOJX4aBMpZ2IYtYi3bzY82i',2,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:40','2023-10-10 07:44:40'),(10,'tonyteo@gmail.com','Tony Teo','$2a$10$yTZo9SNKbXQvaWV7RLslv.9uIoFlGFKc9EYVmPk8ICQYmJ9nJGS5W',2,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-10 07:44:45','2023-10-10 07:44:45'),(27,'andywang@gmail.com','Andy Wang','$2a$10$To8mqQCUFMPeNAx6lMPkAenIH/xvKyOAh3vNN2l8yyRBU/iG2m4.W',2,3,'https://i.ibb.co/3BtQdVD/pet-shop.png','2023-10-19 08:52:45','2023-10-19 08:52:45'),(29,'anhminh@gmail.com','Minh','$2a$10$7Xat09MiYN2KjshKPh2lQ.uB0rRPXgQWitdJ2yZstFmpHZnNX/7Ii',1,3,'http://localhost:7373/uploads/1697772581548-a-happy-shiba-inu-dog-standing-in-a-garden.jpg','2023-10-20 03:28:52','2023-10-20 03:28:52');
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

-- Dump completed on 2023-10-23 15:27:45
