# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.34)
# Database: lrss_2021-10-18
# Generation Time: 2021-10-20 15:06:25 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table appointment_notes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `appointment_notes`;

CREATE TABLE `appointment_notes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `appointment_id` int(11) unsigned NOT NULL,
  `note` text NOT NULL,
  `actions` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table appointments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `appointments`;

CREATE TABLE `appointments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `date` date NOT NULL,
  `time_slot` int(3) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table doctors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `doctors`;

CREATE TABLE `doctors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL DEFAULT '',
  `email` varchar(120) NOT NULL DEFAULT '',
  `mobile` varchar(120) NOT NULL DEFAULT '',
  `hash` varchar(255) NOT NULL DEFAULT '',
  `gender` varchar(30) NOT NULL DEFAULT '',
  `specialism` varchar(120) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;

INSERT INTO `doctors` (`id`, `name`, `email`, `mobile`, `hash`, `gender`, `specialism`)
VALUES
	(2,'Natalie Sharma','Doctor1@email.com','07465499042','$2a$12$kL1O8DBjgkp9PvS8BOmgE.9M4sHBR.iK.3Px2Nt8aR7jHjD1QWIiq','female','General Practice'),
	(3,'Stuart McCann','Doctor2@email.com','07537123487','$2a$12$/6O5Fq9V9FriI8c811uC9.lurv/SpSlr0M5BHA66VcSQETBTOoWV6','male','Emergency Medicine'),
	(4,'Luke Landau','Doctor3@email.com','07654388291','$2a$12$JfCmn2V5/umcxF/sNKmi1uorGoFbrI69rO1PdSvYrSak8HnkNM//2','male','Brain Surgery'),
	(5,'Rosa Droogers','Doctor4@email.com','07563277190','$2a$12$62qxDylaQ7jon5vomUdJ6eevfzZ1RDQZA4O52q79esjkcAuooJpEW','female','Anaesthetist'),
	(6,'Sam Bell','Doctor5@email.com','07465499020','$2a$12$H4cHiPiaTxHGj5KeYOkQ4OSnLHKVXdSxhlchr2f4NdcqHMl5TyHGi','male','Dermatology');

/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table patients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `patients`;

CREATE TABLE `patients` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL DEFAULT '',
  `email` varchar(120) NOT NULL DEFAULT '',
  `mobile` varchar(120) NOT NULL DEFAULT '',
  `hash` varchar(255) NOT NULL DEFAULT '',
  `gender` varchar(30) NOT NULL DEFAULT '',
  `dob` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table prescriptions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `prescriptions`;

CREATE TABLE `prescriptions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `appointment_id` int(11) unsigned NOT NULL,
  `medication` varchar(120) NOT NULL DEFAULT '',
  `details` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
