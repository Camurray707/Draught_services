-- MySQL dump 10.13  Distrib 8.0.11, for macos10.13 (x86_64)
--
-- Host: localhost    Database: draught_services
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `routes` (
  `routeID` int(11) NOT NULL AUTO_INCREMENT,
  `routeName` varchar(50) DEFAULT NULL,
  `employeeID` int(11) NOT NULL,
  `marketID` int(11) NOT NULL,
  `cycleID` int(11) NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  `lastModified` datetime DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`routeID`),
  KEY `routes_routeID` (`routeID`) USING BTREE,
  KEY `routes_employeeID` (`employeeID`) USING BTREE,
  KEY `routes_cycleID` (`cycleID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=130051 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (130008,'Rick #5',140046,110015,332,'Active','2009-06-15 00:00:00','2021-09-27 04:33:20'),(130009,'Sabrina #7',140151,110015,332,'Active','2009-06-15 00:00:00','2021-09-27 04:33:20'),(130010,'Rebecca #3',140123,110015,332,'Active','2009-06-15 00:00:00','2021-09-27 04:33:20'),(130011,'Vicki #2',140126,110015,332,'Active','2009-06-15 00:00:00','2021-09-27 04:33:20'),(130013,'Zach #1',140082,110015,332,'Active','2009-06-15 00:00:00','2021-09-27 04:33:20'),(130015,'Nick J. #12',140137,110015,332,'Active','2009-06-15 00:00:00','2021-09-27 04:33:20'),(130016,'Sha #15',140140,110016,332,'Active','2009-06-15 00:00:00','2021-09-27 04:33:20'),(130017,'Benson #15',140122,110016,332,'Active','2009-08-10 00:00:00','2021-09-27 04:33:20'),(130023,'Jace #20',140149,110018,332,'Active','2009-06-17 00:00:00','2021-09-27 04:33:20'),(130024,'Jordan #21',140148,110017,332,'Active','2009-06-17 00:00:00','2021-09-27 04:33:20'),(130028,'Philip #11',140053,110015,332,'Active','2010-10-01 00:00:00','2021-09-27 04:33:20'),(130029,'James #13',140110,110015,332,'Active','2013-01-12 00:00:00','2021-09-27 04:33:20'),(130030,'John N #10',140146,110017,332,'Active','2013-05-07 00:00:00','2021-09-27 04:33:20'),(130031,'Emily #14',140129,110015,332,'Active','2013-11-07 00:00:00','2021-09-27 04:33:20'),(130032,'Marie #17',140120,110016,332,'Active','2015-04-03 00:00:00','2021-09-27 04:33:20'),(130034,'Adam #18',140072,110015,332,'Active','2016-02-10 00:00:00','2021-09-27 04:33:20'),(130035,'Howard #23',140090,110015,332,'Active','2017-08-03 00:00:00','2021-09-27 04:33:20'),(130036,'Nick #29',140136,110015,332,'Active','2017-09-07 00:00:00','2021-09-27 04:33:20'),(130037,'James C #27',140111,110015,332,'Active','2017-09-07 00:00:00','2021-09-27 04:33:20'),(130038,'Bill #10 I.F',140094,110017,332,'Active','2017-10-22 00:00:00','2021-09-27 04:33:20'),(130039,'Frisco #55',140132,110015,332,'Active','2017-11-17 00:00:00','2021-09-27 04:33:20'),(130040,'John #83',140139,110018,332,'Active','2018-01-28 00:00:00','2021-09-27 04:33:20'),(130042,'Gerald M #66',140134,110015,332,'Active','2018-05-29 00:00:00','2021-09-27 04:33:20'),(130043,'Ashley #31',140118,110015,332,'Active','2018-09-14 00:00:00','2021-09-27 04:33:20'),(130044,'Gerald #65',140103,110015,332,'Active','2018-09-14 00:00:00','2021-09-27 04:33:20'),(130047,'Heather #95',140124,110015,332,'Active','2019-05-10 00:00:00','2021-09-27 04:33:20'),(130048,'Daniel E #83',140093,110017,332,'Active','2019-07-02 00:00:00','2021-09-27 04:33:20'),(130050,'Olivia #16',140141,110016,332,'Active','2021-03-18 00:00:00','2021-09-27 04:33:20');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-27 11:13:21
