# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.34)
# Database: lrss
# Generation Time: 2021-10-21 08:05:56 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
  `date` varchar(30) NOT NULL DEFAULT '',
  `time_slot` int(3) unsigned NOT NULL,
  `reason_for_visit` text NOT NULL,
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
  `password` varchar(255) NOT NULL DEFAULT '',
  `gender` varchar(30) NOT NULL DEFAULT '',
  `specialism` varchar(120) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;

INSERT INTO `doctors` (`id`, `name`, `email`, `mobile`, `password`, `gender`, `specialism`)
VALUES
	(1,'Dr Test M\'Balls','test@test.test','numbers','1234','Male','GP'),
	(2,'Dr Nah M\'Gwan','test@doctor.test','numbers','1234','Female','GP'),
	(3,'Dr Evil','evil@evilcorp.com','666','666','Male','Evil Genius'),
	(4,'Dr Stevil','stevil@stevilcorp.com','666','666','Trans','Stevil Genius');

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
  `password` varchar(255) NOT NULL DEFAULT '',
  `gender` varchar(30) NOT NULL DEFAULT '',
  `dob` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;

INSERT INTO `patients` (`id`, `name`, `email`, `mobile`, `password`, `gender`, `dob`)
VALUES
	(1,'Phil McKraken Johnson','phil@phil.phil','numbers','1234','Female','23/10/1990'),
	(2,'Something','sdad','dsadsf','safsd','fdfs','dfsf');

/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;


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
