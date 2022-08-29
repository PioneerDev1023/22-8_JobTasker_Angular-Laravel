-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for jobtasker
CREATE DATABASE IF NOT EXISTS `jobtasker` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `jobtasker`;

-- Dumping structure for table jobtasker.disputes
CREATE TABLE IF NOT EXISTS `disputes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filled_by_id` int(11) DEFAULT NULL,
  `against_id` int(11) DEFAULT NULL,
  `job_post_id` int(11) DEFAULT NULL,
  `assign_no` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `status` enum('OPEN','CLOSED','RESOLVED') DEFAULT 'OPEN',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table jobtasker.disputes: ~0 rows (approximately)
INSERT INTO `disputes` (`id`, `filled_by_id`, `against_id`, `job_post_id`, `assign_no`, `title`, `detail`, `status`, `created_at`, `updated_at`) VALUES
	(6, 6, 5, 10, '6_5_10', 'Work Not completed', 'This assign work not completed', 'OPEN', '2022-06-24 17:05:21', '2022-06-24 17:05:21');

-- Dumping structure for table jobtasker.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table jobtasker.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table jobtasker.job_offers
CREATE TABLE IF NOT EXISTS `job_offers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_post_id` int(11) DEFAULT NULL,
  `offer_by_id` int(11) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `detail` longtext DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Dumping data for table jobtasker.job_offers: ~10 rows (approximately)
INSERT INTO `job_offers` (`id`, `job_post_id`, `offer_by_id`, `amount`, `detail`, `delivery_date`, `created_at`, `updated_at`) VALUES
	(1, 6, 2, 400, 'this is test', '2022-05-19 06:20:00', NULL, NULL),
	(2, 6, 3, NULL, 'this is another test', NULL, '2022-05-19 01:42:37', '2022-05-19 01:42:37'),
	(3, 6, 3, 5000, NULL, NULL, '2022-05-19 05:01:54', '2022-05-19 05:01:54'),
	(4, 6, 3, 600, NULL, NULL, '2022-05-19 05:04:07', '2022-05-19 05:04:07'),
	(5, 6, 3, 600, NULL, NULL, '2022-05-19 05:04:17', '2022-05-19 05:04:17'),
	(6, 6, 3, 6000, NULL, NULL, '2022-05-19 06:17:58', '2022-05-19 06:17:58'),
	(7, 6, 3, 300, NULL, NULL, '2022-05-19 06:18:31', '2022-05-19 06:18:31'),
	(8, 5, 3, 600, NULL, NULL, '2022-05-19 06:22:52', '2022-05-19 06:22:52'),
	(9, 7, 3, 1100, NULL, NULL, '2022-05-19 23:16:49', '2022-05-19 23:16:49'),
	(10, 8, 3, 5500, 'This is test note', NULL, '2022-05-25 10:04:35', '2022-05-25 10:04:35'),
	(11, 10, 5, 6000, 'Hello this is testing', NULL, '2022-06-15 06:23:55', '2022-06-15 06:23:55');

-- Dumping structure for table jobtasker.job_posts
CREATE TABLE IF NOT EXISTS `job_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `what_do_you` text DEFAULT NULL,
  `where_do_you` text DEFAULT NULL,
  `required_Date` varchar(50) DEFAULT NULL,
  `required_time_range` varchar(50) DEFAULT NULL,
  `detail` longtext DEFAULT NULL,
  `budget` float DEFAULT NULL,
  `posted_by_id` int(11) DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `job_offer_id` int(11) DEFAULT NULL,
  `assign_to_id` int(11) DEFAULT NULL,
  `payment_request` int(11) DEFAULT NULL,
  `payment_request_date` timestamp NULL DEFAULT NULL,
  `delivery_time` timestamp NULL DEFAULT NULL,
  `status` enum('OPEN','ASSIGNED','COMPLETED') DEFAULT 'OPEN',
  `lat` text DEFAULT NULL,
  `lng` text DEFAULT NULL,
  `place_id` mediumtext DEFAULT NULL,
  `place_url` mediumtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table jobtasker.job_posts: ~9 rows (approximately)
INSERT INTO `job_posts` (`id`, `what_do_you`, `where_do_you`, `required_Date`, `required_time_range`, `detail`, `budget`, `posted_by_id`, `photo`, `job_offer_id`, `assign_to_id`, `payment_request`, `payment_request_date`, `delivery_time`, `status`, `lat`, `lng`, `place_id`, `place_url`, `created_at`, `updated_at`) VALUES
	(1, 'Delivery', '44000', '2022-05-19', '2', 'this is test', 500, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', NULL, NULL, NULL, NULL, '2022-05-17 23:39:06', '2022-05-17 23:39:06'),
	(2, 'Website', '44000', '2022-05-19', '2', 'this is test', 500, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', NULL, NULL, NULL, NULL, '2022-05-17 23:40:13', '2022-05-17 23:40:13'),
	(3, 'Software', '44000', '2022-05-19', '2', 'this is test', 500, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', NULL, NULL, NULL, NULL, '2022-05-17 23:40:21', '2022-05-17 23:40:21'),
	(4, 'Home Cleaning', '44000', '2022-05-19', '2', 'this is test', 500, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', NULL, NULL, NULL, NULL, '2022-05-17 23:40:50', '2022-05-17 23:40:50'),
	(5, 'Car Wash', '44000', '2022-05-19', '2', 'this is test', 500, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', NULL, NULL, NULL, NULL, '2022-05-17 23:41:20', '2022-05-17 23:41:20'),
	(6, 'Kitchen', '45000', '2022-01-01', '3', 'I have a Shopify store selling digital, downloadable products. I want to link it to my Instagram and Facebook and hopefully create shopable links to Shopify website.', 4500, 3, NULL, NULL, 3, NULL, NULL, '2022-05-30 19:00:00', 'ASSIGNED', NULL, NULL, NULL, NULL, '2022-05-18 05:47:43', '2022-05-20 00:35:48'),
	(7, 'Website Development', 'Remote', '2022-05-26', '1', 'I need a website developer', 1000, 3, NULL, NULL, 3, NULL, NULL, '2022-05-30 19:00:00', 'ASSIGNED', NULL, NULL, NULL, NULL, '2022-05-19 08:53:09', '2022-05-25 09:21:26'),
	(8, 'Mobile Application Developement', 'Remote', '2022-05-31', '2', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', 4500, 5, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', '-33.7593015', '151.0860053', 'ChIJQakbumW7woAR9DOcTsLhWjY', NULL, '2022-05-20 16:19:23', '2022-05-20 16:19:23'),
	(9, 'Kitchen Work', '2020 Santa Monica Blvd, Santa Monica, CA 90404, USA', '2022-05-31', '3', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 550, 5, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', '-33.8482439', '150.9319747', 'ChIJQakbumW7woAR9DOcTsLhWjY', 'https://maps.google.com/?q=2020+Santa+Monica+Blvd,+Santa+Monica,+CA+90404,+USA&ftid=0x80c2bb65ba1ba941:0x365ae1c24e9c33f4', '2022-05-26 06:38:01', '2022-05-26 06:38:01'),
	(10, 'Video Game Developer', '264 George St, Sydney NSW 2000, Australia', '2022-06-30', '1', 'This is email test', 5600, 6, NULL, 11, 5, 1, '2022-06-19 18:33:51', '2022-06-29 19:00:00', 'ASSIGNED', '-33.8648223', '151.2079467', 'ChIJY4K2Ap-vEmsRXTjs_cMvkYc', 'https://maps.google.com/?cid=9768641585568561245', '2022-06-15 06:13:43', '2022-06-19 18:33:51');

-- Dumping structure for table jobtasker.job_post_histories
CREATE TABLE IF NOT EXISTS `job_post_histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_offer_id` int(11) DEFAULT NULL,
  `job_post_id` int(11) DEFAULT NULL,
  `status` enum('OPEN','ASSIGNED','COMPLETED','DISPUTED','CLOSED') DEFAULT 'OPEN',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Dumping data for table jobtasker.job_post_histories: ~14 rows (approximately)
INSERT INTO `job_post_histories` (`id`, `job_offer_id`, `job_post_id`, `status`, `created_at`, `updated_at`) VALUES
	(1, NULL, 1, 'OPEN', '2022-05-19 19:00:00', '2022-05-19 19:00:00'),
	(2, NULL, 2, 'OPEN', '2022-05-19 19:00:00', '2022-05-19 19:00:00'),
	(3, NULL, 3, 'OPEN', '2022-05-19 19:00:00', '2022-05-19 19:00:00'),
	(4, NULL, 4, 'OPEN', '2022-05-19 19:00:00', '2022-05-19 19:00:00'),
	(5, NULL, 5, 'OPEN', '2022-05-19 19:00:00', '2022-05-19 19:00:00'),
	(6, NULL, 6, 'OPEN', '2022-05-19 19:00:00', '2022-05-19 19:00:00'),
	(7, NULL, 7, 'OPEN', '2022-05-19 19:00:00', '2022-05-19 19:00:00'),
	(8, NULL, 7, 'ASSIGNED', '2022-05-20 04:58:28', '2022-05-20 04:58:29'),
	(9, NULL, 6, 'ASSIGNED', '2022-05-20 00:21:31', '2022-05-20 00:21:31'),
	(10, NULL, 6, 'ASSIGNED', '2022-05-20 00:23:15', '2022-05-20 00:23:15'),
	(11, NULL, 6, 'ASSIGNED', '2022-05-20 00:23:40', '2022-05-20 00:23:40'),
	(12, NULL, 6, 'ASSIGNED', '2022-05-20 00:24:36', '2022-05-20 00:24:36'),
	(13, NULL, 6, 'ASSIGNED', '2022-05-20 00:35:48', '2022-05-20 00:35:48'),
	(14, NULL, 7, 'ASSIGNED', '2022-05-25 09:21:26', '2022-05-25 09:21:26'),
	(17, 11, 10, 'ASSIGNED', '2022-06-19 17:54:23', '2022-06-19 17:54:23');

-- Dumping structure for table jobtasker.job_questions
CREATE TABLE IF NOT EXISTS `job_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_post_id` int(11) DEFAULT NULL,
  `question_by_id` int(11) DEFAULT NULL,
  `detail` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table jobtasker.job_questions: ~4 rows (approximately)
INSERT INTO `job_questions` (`id`, `job_post_id`, `question_by_id`, `detail`, `created_at`, `updated_at`) VALUES
	(1, 6, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '2022-05-19 07:04:07', NULL),
	(2, 6, 3, 'This test', '2022-05-19 02:14:24', '2022-05-19 02:14:24'),
	(3, 6, 3, 'Lorem Ipsum is simply dummy text of the printing', '2022-05-19 02:15:44', '2022-05-19 02:15:44'),
	(4, 7, 3, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,', '2022-05-19 23:16:33', '2022-05-19 23:16:33');

-- Dumping structure for table jobtasker.job_time_ranges
CREATE TABLE IF NOT EXISTS `job_time_ranges` (
  `id` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table jobtasker.job_time_ranges: ~4 rows (approximately)
INSERT INTO `job_time_ranges` (`id`, `title`, `created_at`, `updated_at`) VALUES
	(1, 'Before 10am', NULL, NULL),
	(2, '10am - 2pm', NULL, NULL),
	(3, '2pm - 6pm', NULL, NULL),
	(4, 'after - 6pm', NULL, NULL);

-- Dumping structure for table jobtasker.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table jobtasker.migrations: ~4 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_resets_table', 1),
	(3, '2019_08_19_000000_create_failed_jobs_table', 1),
	(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- Dumping structure for table jobtasker.password_resets
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table jobtasker.password_resets: ~0 rows (approximately)
INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
	('umair.waseem.q@gmail.com', '$2y$10$BdVtFb7GTdkTohlPROSQi.h8ZBlf/iCo4wX.WszFOLALcUQwdq1ly', '2022-06-24 22:06:00');

-- Dumping structure for table jobtasker.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table jobtasker.personal_access_tokens: ~7 rows (approximately)
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
	(4, 'App\\Models\\User', 2, 'web', 'aa1b57ea14961018ef3b90155675edffe626568ef9426d076ccc3d8946a01d06', '["*"]', NULL, '2022-05-17 10:15:03', '2022-05-17 10:15:03'),
	(6, 'App\\Models\\User', 1, 'tasker@admin.com', '6e6317909b461a7264a0e4b2cb8f4940c17f1ba69ac4621aa6656f1dfa2a2d60', '["*"]', '2022-05-17 23:46:40', '2022-05-17 14:33:12', '2022-05-17 23:46:40'),
	(13, 'App\\Models\\User', 4, 'jams@kari.com', 'a829a984ce9991ff5f239c42c21d03774b8e43729da8fbe86bd9950f4321339e', '["*"]', '2022-05-25 09:19:20', '2022-05-25 09:19:13', '2022-05-25 09:19:20'),
	(14, 'App\\Models\\User', 3, 'test@test.com', 'a4ea4770d46323ec50b9b1634974779db631b32b49e907265db0f992cc9aaf82', '["*"]', '2022-05-25 10:04:35', '2022-05-25 09:19:55', '2022-05-25 10:04:35'),
	(30, 'App\\Models\\User', 5, 'umair.waseem.q1@gmail.com', '965b3c3a322e13825294195cee745158440f36228ca9bd16beb337527a048407', '["*"]', '2022-06-25 17:36:01', '2022-06-25 17:34:31', '2022-06-25 17:36:01'),
	(32, 'App\\Models\\User', 6, 'umair.waseem.q@gmail.com', 'eedc2196c0e0f47658a2aa5262508e7073100cca8e800f6850255a6e6f56ab60', '["*"]', '2022-06-26 09:27:45', '2022-06-26 05:44:12', '2022-06-26 09:27:45'),
	(34, 'App\\Models\\User', 7, 'jobtasker@admin.com', '1be8a41dae750c78c34d047f62f519d20cd4362343bd02d53f96a47268e089ed', '["*"]', '2022-07-04 14:59:41', '2022-07-04 14:53:39', '2022-07-04 14:59:41');

-- Dumping structure for table jobtasker.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `posted_by_id` int(11) DEFAULT NULL,
  `post_category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table jobtasker.posts: ~0 rows (approximately)
INSERT INTO `posts` (`id`, `title`, `detail`, `image`, `posted_by_id`, `post_category_id`, `created_at`, `updated_at`) VALUES
	(1, 'Visa 1', '<p>This is new Visa</p><p>welcome</p><p>This is new Visa</p><p>welcome</p><p>This is new Visa</p><p>welcome</p><p>This is new Visa</p><p>welcome</p><p>This is new Visa</p><p>welcome</p><p>This is new Visa</p><p>welcome</p><p>This is new Visa</p><p>welcome</p><p>This is new Visa</p><p>welcome</p>', '3642948.webp', 7, 4, '2022-06-25 16:05:51', '2022-07-04 14:59:39');

-- Dumping structure for table jobtasker.post_categories
CREATE TABLE IF NOT EXISTS `post_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table jobtasker.post_categories: ~3 rows (approximately)
INSERT INTO `post_categories` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'Uncategory', 1, '2022-07-04 07:36:53', '2022-07-04 07:36:53'),
	(3, 'News', 0, '2022-07-04 03:09:19', '2022-07-04 03:10:53'),
	(4, 'Weather', 0, '2022-07-04 03:10:36', '2022-07-04 03:10:36');

-- Dumping structure for table jobtasker.post_comments
CREATE TABLE IF NOT EXISTS `post_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_by_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table jobtasker.post_comments: ~4 rows (approximately)
INSERT INTO `post_comments` (`id`, `comment_by_id`, `post_id`, `detail`, `created_at`, `updated_at`) VALUES
	(1, 7, 1, 'testing', '2022-06-25 17:22:50', '2022-06-25 17:22:50'),
	(2, 7, 1, 'testing 2', '2022-06-25 17:27:45', '2022-06-25 17:27:45'),
	(3, 5, 1, 'New Test', '2022-06-25 17:35:05', '2022-06-25 17:35:05'),
	(4, 5, 1, 'Final Test', '2022-06-25 17:36:01', '2022-06-25 17:36:01');

-- Dumping structure for table jobtasker.profiles
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL DEFAULT '',
  `last_name` varchar(50) NOT NULL DEFAULT '',
  `phone_number` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `postcode` varchar(50) NOT NULL DEFAULT '',
  `state` varchar(50) NOT NULL DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table jobtasker.profiles: ~5 rows (approximately)
INSERT INTO `profiles` (`id`, `first_name`, `last_name`, `phone_number`, `email`, `postcode`, `state`, `created_at`, `updated_at`) VALUES
	(1, 'tasker', 'link', '123456789', 'tasker@admin.com', '44000', 'abc', '2022-05-17 10:45:56', '2022-05-17 10:45:56'),
	(2, 'Umais', 'Waseem', '92456456123', 'tasker@gmail.com', 'Rawalpindi', 'Punjab', '2022-05-17 15:15:03', '2022-05-17 15:15:03'),
	(3, 'test', 'test1', '4569874123', 'test@test.com', 'Rawalpindi', 'Punjab', '2022-05-18 10:44:14', '2022-05-18 10:44:14'),
	(4, 'jams', 'kri', '7789456', 'jams@kari.com', '454545', 'ABC', '2022-05-20 21:15:12', '2022-05-20 21:15:12'),
	(5, 'ABC', 'test', '789654123', 'umair.waseem.q1@gmail.com', '45000', 'ABC', '2022-05-20 21:17:18', '2022-05-20 21:17:18'),
	(6, 'Umais', 'Waseem', '3465202919', 'umair.waseem.q@gmail.com', 'Rawalpindi', 'Punjab', '2022-06-15 11:12:18', '2022-06-15 11:12:18');

-- Dumping structure for table jobtasker.profile_skills
CREATE TABLE IF NOT EXISTS `profile_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table jobtasker.profile_skills: ~14 rows (approximately)
INSERT INTO `profile_skills` (`id`, `skill_id`, `user_id`, `created_at`, `updated_at`) VALUES
	(26, 1, 6, '2022-06-24 13:38:48', '2022-06-24 13:38:48'),
	(27, 2, 6, '2022-06-24 13:38:48', '2022-06-24 13:38:48'),
	(28, 3, 6, '2022-06-24 13:38:48', '2022-06-24 13:38:48'),
	(29, 9, 6, '2022-06-24 13:38:48', '2022-06-24 13:38:48'),
	(30, 4, 6, '2022-06-24 13:53:15', '2022-06-24 13:53:15'),
	(31, 10, 6, '2022-06-24 13:53:15', '2022-06-24 13:53:15'),
	(32, 10, 5, '2022-06-24 15:11:58', '2022-06-24 15:11:58'),
	(33, 9, 5, '2022-06-24 15:11:58', '2022-06-24 15:11:58'),
	(34, 6, 5, '2022-06-24 15:11:58', '2022-06-24 15:11:58'),
	(35, 5, 5, '2022-06-24 15:11:58', '2022-06-24 15:11:58'),
	(36, 4, 5, '2022-06-24 15:11:58', '2022-06-24 15:11:58'),
	(37, 2, 5, '2022-06-24 15:11:58', '2022-06-24 15:11:58'),
	(38, 3, 5, '2022-06-24 15:11:58', '2022-06-24 15:11:58'),
	(39, 1, 5, '2022-06-24 15:11:58', '2022-06-24 15:11:58');

-- Dumping structure for table jobtasker.skills
CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table jobtasker.skills: ~8 rows (approximately)
INSERT INTO `skills` (`id`, `title`, `created_at`, `updated_at`) VALUES
	(1, 'Asp.net', NULL, NULL),
	(2, 'C++', NULL, NULL),
	(3, '.net', NULL, NULL),
	(4, 'Angular', NULL, NULL),
	(5, 'ReactJs', NULL, NULL),
	(6, 'Node Js', NULL, NULL),
	(7, 'PHP', NULL, NULL),
	(8, 'Laravel', NULL, NULL),
	(9, 'android studio', '2022-06-24 10:31:41', '2022-06-24 10:31:41'),
	(10, 'Visual Studio', '2022-06-24 13:53:12', '2022-06-24 13:53:12');

-- Dumping structure for table jobtasker.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` enum('tasker','poster','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'tasker',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table jobtasker.users: ~6 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `user_type`, `created_at`, `updated_at`) VALUES
	(1, 'tasker link', 'tasker@admin.com', NULL, '$2y$10$pNZGdm9Cty2x7KbkurEagOJDXRkKuNCZ6ZjzIH523o9wkgwu37yQa', '6|ZEumzYIT0wThv3VtUwPO0bLMDZXULUTrd78rwC8i', 'tasker', '2022-05-17 05:45:56', '2022-05-17 14:33:12'),
	(2, 'Umais Waseem', 'tasker@gmail.com', NULL, '$2y$10$3.v/F7SDUIGY0En6l0tr6uf5q5iFkJMUE3c4K4.KZBt4jPA4iC9pG', NULL, 'tasker', '2022-05-17 10:15:03', '2022-05-17 10:15:03'),
	(3, 'test test1', 'test@test.com', NULL, '$2y$10$KVQdlFpOoRDu/F1Zw4b0a.iKQ05nL9lcm8fWo5bA0Jeyri9IGyVeW', '14|v0iFkM7TIjzwZarjESZZyHwsWUMy5E6Bd55RaS89', 'tasker', '2022-05-18 05:44:14', '2022-05-25 09:19:55'),
	(4, 'jams kri', 'jams@kari.com', NULL, '$2y$10$oyxhUSTeXVSIB9SfPng0c.TCV5OCtuUIe78ViGYAsdwtSQ7xY0tPi', '13|zTMiADhvx1RWdZkLrOOQUjPFC94qh1xB0QJHD4Vw', 'tasker', '2022-05-20 16:15:12', '2022-05-25 09:19:13'),
	(5, 'ABC test', 'umair.waseem.q1@gmail.com', NULL, '$2y$10$KVQdlFpOoRDu/F1Zw4b0a.iKQ05nL9lcm8fWo5bA0Jeyri9IGyVeW', '30|Ff09vkIQio3JT2uCenEd5gNAbnGXmV3PoxYzGjGn', 'tasker', '2022-05-20 16:17:18', '2022-06-25 17:34:31'),
	(6, 'Umais Waseem', 'umair.waseem.q@gmail.com', NULL, '$2y$10$VuIJUwtfJy0.WugMWJMQoOrmLmf67/aUHzJrTW6ca0wZocm71W4QC', '32|A9jbykjBdaxgLUkgmNgXU9qX13HxP7FYGQZiGSFi', 'tasker', '2022-06-15 06:12:18', '2022-06-26 05:44:12'),
	(7, 'JobTasker', 'jobtasker@admin.com', NULL, '$2y$10$VuIJUwtfJy0.WugMWJMQoOrmLmf67/aUHzJrTW6ca0wZocm71W4QC', '34|P1PSnQkW9EBbx71c9EY1gM83x0TjcT8vxauD8Kc0', 'admin', '2022-06-25 20:15:54', '2022-07-04 14:53:40');

-- Dumping structure for table jobtasker.user_payment_methods
CREATE TABLE IF NOT EXISTS `user_payment_methods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `last4` int(11) DEFAULT NULL,
  `exp_month` int(11) DEFAULT NULL,
  `exp_year` int(11) DEFAULT NULL,
  `alldata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`alldata`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table jobtasker.user_payment_methods: ~4 rows (approximately)
INSERT INTO `user_payment_methods` (`id`, `user_id`, `brand`, `last4`, `exp_month`, `exp_year`, `alldata`, `created_at`, `updated_at`) VALUES
	(2, 6, 'mastercard', 4444, 12, 2022, '{"id":"pm_1LEP5ZHMxcZ2hKOIT4u63HiG","object":"payment_method","billing_details":{"address":{"city":null,"country":null,"line1":null,"line2":null,"postal_code":"44000","state":null},"email":null,"name":null,"phone":null},"card":{"brand":"mastercard","checks":{"address_line1_check":null,"address_postal_code_check":null,"cvc_check":null},"country":"US","exp_month":12,"exp_year":2022,"funding":"credit","generated_from":null,"last4":"4444","networks":{"available":["mastercard"],"preferred":null},"three_d_secure_usage":{"supported":true},"wallet":null},"created":1656125474,"customer":null,"livemode":false,"type":"card"}', '2022-06-24 21:51:14', '2022-06-24 21:51:14'),
	(3, 6, 'visa', 4242, 12, 2022, '{"id":"pm_1LEP9NHMxcZ2hKOIW3fuVXF0","object":"payment_method","billing_details":{"address":{"city":null,"country":null,"line1":null,"line2":null,"postal_code":"44000","state":null},"email":null,"name":null,"phone":null},"card":{"brand":"visa","checks":{"address_line1_check":null,"address_postal_code_check":null,"cvc_check":null},"country":"US","exp_month":12,"exp_year":2022,"funding":"credit","generated_from":null,"last4":"4242","networks":{"available":["visa"],"preferred":null},"three_d_secure_usage":{"supported":true},"wallet":null},"created":1656125710,"customer":null,"livemode":false,"type":"card"}', '2022-06-24 21:55:10', '2022-06-24 21:55:10'),
	(4, 6, 'visa', 5556, 12, 2022, '{"id":"pm_1LEPADHMxcZ2hKOIPl0RWr1b","object":"payment_method","billing_details":{"address":{"city":null,"country":null,"line1":null,"line2":null,"postal_code":"44000","state":null},"email":null,"name":null,"phone":null},"card":{"brand":"visa","checks":{"address_line1_check":null,"address_postal_code_check":null,"cvc_check":null},"country":"US","exp_month":12,"exp_year":2022,"funding":"debit","generated_from":null,"last4":"5556","networks":{"available":["visa"],"preferred":null},"three_d_secure_usage":{"supported":true},"wallet":null},"created":1656125761,"customer":null,"livemode":false,"type":"card"}', '2022-06-24 21:56:02', '2022-06-24 21:56:02'),
	(5, 6, 'mastercard', 3222, 12, 2022, '{"id":"pm_1LEPAhHMxcZ2hKOImwsFTqWk","object":"payment_method","billing_details":{"address":{"city":null,"country":null,"line1":null,"line2":null,"postal_code":"44000","state":null},"email":null,"name":null,"phone":null},"card":{"brand":"mastercard","checks":{"address_line1_check":null,"address_postal_code_check":null,"cvc_check":null},"country":"US","exp_month":12,"exp_year":2022,"funding":"credit","generated_from":null,"last4":"3222","networks":{"available":["mastercard"],"preferred":null},"three_d_secure_usage":{"supported":true},"wallet":null},"created":1656125791,"customer":null,"livemode":false,"type":"card"}', '2022-06-24 21:56:31', '2022-06-24 21:56:31');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
