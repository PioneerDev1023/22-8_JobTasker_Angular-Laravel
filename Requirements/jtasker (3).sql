-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2022 at 02:12 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jtasker`
--

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `lic_badge` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `jt_email` varchar(100) NOT NULL,
  `lic_number` varchar(200) NOT NULL,
  `lic_exp` varchar(100) NOT NULL,
  `lic_rest` varchar(500) NOT NULL,
  `photo` text DEFAULT NULL,
  `status` int(50) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`id`, `user_id`, `lic_badge`, `first_name`, `last_name`, `jt_email`, `lic_number`, `lic_exp`, `lic_rest`, `photo`, `status`, `created_at`, `updated_at`) VALUES
(8, 1, 'Electrical', 'Hassan', 'Zaidi', 'hassanzaidiksa@gmail.com', '0123456789', '20-12-2025', 'None', '1661214037.jpg', 1, '2022-08-22 19:20:37', '2022-08-23 19:26:42'),
(9, 1, 'Gas Fitting', 'asd', 'asd', 'ads', 'asd', 'asd', 'asd', '1661225847.jpg', 0, '2022-08-22 22:37:27', '2022-08-22 22:37:27');

-- --------------------------------------------------------

--
-- Table structure for table `disputes`
--

CREATE TABLE `disputes` (
  `id` int(11) NOT NULL,
  `filled_by_id` int(11) DEFAULT NULL,
  `against_id` int(11) DEFAULT NULL,
  `job_post_id` int(11) DEFAULT NULL,
  `assign_no` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `status` enum('OPEN','CLOSED','RESOLVED') DEFAULT 'OPEN',
  `winner_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_offers`
--

CREATE TABLE `job_offers` (
  `id` int(11) NOT NULL,
  `job_post_id` int(11) DEFAULT NULL,
  `offer_by_id` int(11) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `detail` longtext DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_offers`
--

INSERT INTO `job_offers` (`id`, `job_post_id`, `offer_by_id`, `amount`, `detail`, `delivery_date`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 500, 'I am with 10 years of experience in interior designing.', NULL, '2022-08-20 20:55:10', '2022-08-20 20:55:10'),
(2, 1, 5, 300, 'i will satisfy you with my work', NULL, '2022-08-20 20:57:13', '2022-08-20 20:57:13'),
(3, 2, 5, 2000, 'Will do a quality job', NULL, '2022-08-20 21:26:58', '2022-08-20 21:26:58'),
(4, 2, 1, 1250, NULL, NULL, '2022-08-20 21:31:35', '2022-08-20 21:31:35'),
(5, 4, 1, 500, NULL, NULL, '2022-08-21 17:35:26', '2022-08-21 17:35:26'),
(6, 3, 1, 200, NULL, NULL, '2022-08-21 17:35:33', '2022-08-21 17:35:33'),
(7, 4, 5, 250, NULL, NULL, '2022-08-21 17:36:17', '2022-08-21 17:36:17'),
(8, 3, 5, 350, NULL, NULL, '2022-08-21 17:36:24', '2022-08-21 17:36:24'),
(9, 3, 1, 200, NULL, NULL, '2022-08-21 18:39:31', '2022-08-21 18:39:31');

-- --------------------------------------------------------

--
-- Table structure for table `job_posts`
--

CREATE TABLE `job_posts` (
  `id` int(11) NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`id`, `what_do_you`, `where_do_you`, `required_Date`, `required_time_range`, `detail`, `budget`, `posted_by_id`, `photo`, `job_offer_id`, `assign_to_id`, `payment_request`, `payment_request_date`, `delivery_time`, `status`, `lat`, `lng`, `place_id`, `place_url`, `created_at`, `updated_at`) VALUES
(1, 'Interior Decorator', 'Bennelong Point, Sydney NSW 2000, Australia', '2022-08-21', '4', 'Hello,\r\n\r\nI’m after an Interior Decorator to help me furnish a 3 bedroom + study apartment in Burwood NSW. The job is for the full apartment: the rooms, living room, kitchen and two bathrooms.\r\n\r\nI’m after:\r\n•	Recommendations for allocation of $15k furniture budget (recommend where and which items to spend / save on). Note, this excludes whitegoods.\r\n•	Layouts (ideally 3D colour renderings) of each area with furniture in situ so that I can keep and refer to them as I progressively buy furniture.\r\n•	Links to recommended furniture items.\r\n\r\nI’d ideally like the person to visit the property also, which is in Burwood (NSW) and a 10min walk from the train station - but also open to fully remote work.', 500, 2, '1661046588.jpg', 1, 1, 2, '2022-08-20 21:15:07', '2022-08-21 19:00:00', 'COMPLETED', '-33.8567844', '151.2152967', 'ChIJ3S-JXmauEmsRUcIaWtf4MzE', 'https://maps.google.com/?cid=3545450935484072529', '2022-08-20 20:49:48', '2022-08-20 21:16:20'),
(2, 'Living area and entrance decorations Design', 'Perth WA, Australia', '2022-08-21', '4', 'I am looking for someone who can help  me to rearrange and decorate our entrance and living room.\r\nWe already have some of the stuff including sofa, tv units, tables and are more than happy to buy others if needed.\r\nNo idea about design so some help would be highly appreciated.', 1500, 2, '1661048790.jpg', 4, 1, 2, '2022-08-20 21:32:28', '2022-08-21 19:00:00', 'COMPLETED', '-31.9523123', '115.861309', 'ChIJPXNH22yWMioR0FXfNbXwBAM', 'https://maps.google.com/?q=Perth+WA,+Australia&ftid=0x2a32966cdb47733d:0x304f0b535df55d0', '2022-08-20 21:26:30', '2022-08-20 21:34:23'),
(3, 'Test with signup and login for posting a job', 'Rawalpindi, Punjab, Pakistan', '2022-08-23', '2', '(We use this to connect you with people or business who work in your area)', 100, 3, '1661117333.jpg', NULL, NULL, NULL, NULL, NULL, 'OPEN', '0', '0', NULL, NULL, '2022-08-21 16:28:53', '2022-08-21 16:28:53'),
(4, 'FCM restest', 'Rawalpindi, Punjab, Pakistan', '2022-08-22', '1', 'Hi, my name is Bisi. We are a well trained, professional cleaner that has worked in the cleaning industry with many years of experience. We will be able to clean your beautiful home, leaving it sparkling clean just for you! We take close inspections on all small details and excel when cleaning end-of-lease houses. We use all our own products and equipments such as steam cleaners and cleaning products. We: \n- Wash all walls from top to bottom.\n- Remove all spider webs around the home.\n- Clean all doors even the sides facing outside. \n- Dust all around the home including blinds.\n- Remove stains in the bathroom e.g. mould.  \n- Vacuum everywhere in the home.\n- Professionally clean the oven removing all grease and dirt.\n\nExtras may be added, but would be placed as an addition fee:\n- Steam cleaning\n- Carpet deep cleaning', 100, 3, '1661117401.jpg', 5, 1, NULL, NULL, '2022-08-24 19:00:00', 'ASSIGNED', '33.5651107', '73.0169135', 'ChIJy5pBdImU3zgRD9MyFn41hAk', 'https://maps.google.com/?q=Rawalpindi,+Punjab,+Pakistan&ftid=0x38df948974419acb:0x984357e1632d30f', '2022-08-21 16:30:01', '2022-08-21 17:39:00');

-- --------------------------------------------------------

--
-- Table structure for table `job_post_histories`
--

CREATE TABLE `job_post_histories` (
  `id` int(11) NOT NULL,
  `job_offer_id` int(11) DEFAULT NULL,
  `job_post_id` int(11) DEFAULT NULL,
  `status` enum('OPEN','ASSIGNED','COMPLETED','DISPUTED','CLOSED') DEFAULT 'OPEN',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_post_histories`
--

INSERT INTO `job_post_histories` (`id`, `job_offer_id`, `job_post_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'ASSIGNED', '2022-08-20 20:58:14', '2022-08-20 20:58:14'),
(2, NULL, 1, 'COMPLETED', '2022-08-20 21:16:20', '2022-08-20 21:16:20'),
(3, 4, 2, 'ASSIGNED', '2022-08-20 21:31:59', '2022-08-20 21:31:59'),
(4, NULL, 2, 'COMPLETED', '2022-08-20 21:34:23', '2022-08-20 21:34:23'),
(5, 5, 4, 'ASSIGNED', '2022-08-21 17:39:00', '2022-08-21 17:39:00');

-- --------------------------------------------------------

--
-- Table structure for table `job_questions`
--

CREATE TABLE `job_questions` (
  `id` int(11) NOT NULL,
  `job_post_id` int(11) DEFAULT NULL,
  `question_by_id` int(11) DEFAULT NULL,
  `detail` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_questions`
--

INSERT INTO `job_questions` (`id`, `job_post_id`, `question_by_id`, `detail`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Hi. I am interested in your job.', '2022-08-20 20:53:54', '2022-08-20 20:53:54'),
(2, 1, 5, 'I am Sajjad with 5 years of experience in interior designing industry.', '2022-08-20 20:56:48', '2022-08-20 20:56:48');

-- --------------------------------------------------------

--
-- Table structure for table `job_reports`
--

CREATE TABLE `job_reports` (
  `id` int(11) NOT NULL,
  `job_post_id` int(11) DEFAULT NULL,
  `reported_by_id` int(11) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `job_reviews`
--

CREATE TABLE `job_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_id` int(11) NOT NULL,
  `tasker_id` int(11) NOT NULL,
  `review` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `review_rating` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_reviews`
--

INSERT INTO `job_reviews` (`id`, `job_id`, `tasker_id`, `review`, `review_rating`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'A job very well done by Syed. Will hire him again', 5, NULL, NULL),
(2, 2, 1, 'A good job.', 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_time_ranges`
--

CREATE TABLE `job_time_ranges` (
  `id` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_time_ranges`
--

INSERT INTO `job_time_ranges` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'Before 10am', NULL, NULL),
(2, '10am - 2pm', NULL, NULL),
(3, '2pm - 6pm', NULL, NULL),
(4, 'after - 6pm', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_07_27_161204_add_abn_column_in_profiles_table', 2),
(6, '2022_08_01_181002_add_profile_image_column_in_profiles_table', 3),
(7, '2022_08_13_184148_add_site_logo_column_in_site_settings_table', 4),
(8, '2022_08_13_232553_add_active_column_in_users_table', 4),
(9, '2022_08_16_091904_create_job_reviews_table', 4),
(10, '2022_08_18_061816_create_tasker_reviews_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(16, 'App\\Models\\User', 7, 'web', 'c99749169f8490140427cc2c23d267871f63bc54602bf65cd958fcfb667f924e', '[\"*\"]', NULL, '2022-08-21 16:19:34', '2022-08-21 16:19:34'),
(21, 'App\\Models\\User', 4, 'teamthunder86@gmail.com', '2ae4f372eebe97a841c1fa7b2a7ecac932ed1bc3a53a26373101907ff583acd5', '[\"*\"]', '2022-08-21 16:41:37', '2022-08-21 16:32:22', '2022-08-21 16:41:37'),
(26, 'App\\Models\\User', 5, 'hassanzaidi.indus@gmail.com', '57d9ce4a5cf88b5c366afd6535cc51d2daac786d102b50c1102281b2fa901aed', '[\"*\"]', '2022-08-21 17:36:24', '2022-08-21 17:36:06', '2022-08-21 17:36:24'),
(32, 'App\\Models\\User', 2, 'hmzaidi514@gmail.com', '27f16349f8cebb0f062e6059aadf1d4f4782f1c53aa6afcab49fc3e2baf9b85c', '[\"*\"]', '2022-08-21 18:40:06', '2022-08-21 18:40:03', '2022-08-21 18:40:06'),
(33, 'App\\Models\\User', 3, 'chunjzaidi@gmail.com', 'a2d9c574277c6e680a07bfb2f0523ef5a74dafddee6762cdecbcfb454f869787', '[\"*\"]', '2022-08-21 19:33:03', '2022-08-21 18:40:23', '2022-08-21 19:33:03'),
(37, 'App\\Models\\User', 1, 'hassanzaidiksa@gmail.com', '80512f35f94bc2f989e088db510781f950c796ed69d1f80e22e29e53c91946dc', '[\"*\"]', '2022-08-22 22:37:27', '2022-08-22 22:29:30', '2022-08-22 22:37:27'),
(39, 'App\\Models\\User', 6, 'jobtasker@admin.com', 'b41251a0bbb17bf387e010bed5dad9d1710faef5f6217b7d2e10709f91804478', '[\"*\"]', '2022-08-23 19:27:10', '2022-08-23 19:27:09', '2022-08-23 19:27:10');

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`id`, `user_id`, `title`, `photo`, `description`, `created_at`, `updated_at`) VALUES
(1, 5, 'Bike', '1661047577.jpg', 'Complete Bike', '2022-08-20 21:06:17', '2022-08-20 21:06:17');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `posted_by_id` int(11) DEFAULT NULL,
  `post_category_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post_ad_categories`
--

CREATE TABLE `post_ad_categories` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_ad_categories`
--

INSERT INTO `post_ad_categories` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(3, 'Wordpress', 0, NULL, '2022-08-07 19:45:30'),
(4, 'Laravel', 0, NULL, NULL),
(5, 'Codeigniter', 0, '2022-08-07 19:43:08', '2022-08-11 09:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `post_ad_skills`
--

CREATE TABLE `post_ad_skills` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_ad_skills`
--

INSERT INTO `post_ad_skills` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(3, 'Software Architecture', 0, NULL, '2022-08-07 20:20:13'),
(4, 'UX/UI Design', 0, NULL, NULL),
(5, 'Adobe Photoshop', 0, '2022-08-07 19:43:08', '2022-08-07 19:43:08');

-- --------------------------------------------------------

--
-- Table structure for table `post_categories`
--

CREATE TABLE `post_categories` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_categories`
--

INSERT INTO `post_categories` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Uncategory', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'News', 0, '2022-07-04 15:37:37', '2022-07-04 15:37:37');

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `id` int(11) NOT NULL,
  `comment_by_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL DEFAULT '',
  `last_name` varchar(50) NOT NULL DEFAULT '',
  `phone_number` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `postcode` varchar(50) NOT NULL DEFAULT '',
  `state` varchar(50) NOT NULL DEFAULT '',
  `abn` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `post_ad_category` int(11) DEFAULT NULL,
  `fcm_token` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `first_name`, `last_name`, `phone_number`, `email`, `postcode`, `state`, `abn`, `profile_image`, `post_ad_category`, `fcm_token`, `created_at`, `updated_at`) VALUES
(1, 'Syed Hassan', 'Mujtaba Zaidi', '+923462886159', 'hassanzaidiksa@gmail.com', 'Rawalpindi 46000', 'Punjab', '249140901', 'profile-717271351_1661046783.jpg', NULL, 'cL4zJO2vDim8yXgzIG1IBE:APA91bHvCSah-aHllWHWJQfFk5E8EtB4XhmtrqplNxd8mKE3CpnZUP07b-L_-eD02JqplDaSg64wmKswbUGVb9Hjt-YjLLZGtvFizwWVV4perl_EVKVagz0bh2yBpJpa-udkaIiQ3h9w', '2022-08-21 01:29:34', '2022-08-21 01:53:03'),
(2, 'Ali', 'Akbar', '923465202919', 'hmzaidi514@gmail.com', 'Sydney 2000', 'Sydney', '209000616', '1-1627831436_1661045898.jpg', NULL, 'cL4zJO2vDim8yXgzIG1IBE:APA91bHvCSah-aHllWHWJQfFk5E8EtB4XhmtrqplNxd8mKE3CpnZUP07b-L_-eD02JqplDaSg64wmKswbUGVb9Hjt-YjLLZGtvFizwWVV4perl_EVKVagz0bh2yBpJpa-udkaIiQ3h9w', '2022-08-21 01:37:00', '2022-08-21 01:38:18'),
(3, 'Umair', 'Waseem', '923359436412', 'chunjzaidi@gmail.com', 'Sydney 2200', 'Sydney', '205666125', NULL, NULL, 'cdG4tTkDbXZzQVL0_wxufi:APA91bE3tk-JtzhmgVCiZuoeHMm2ytt6afeflma0-i57vXVkQr9OjHbC2o21MvvBMSzbp6AWIffOlw48_VvTFfSpDgTXxOMqgB9-6dXIEKs6gxNPyTSrz7Xn_OJOeE9aUC9AckOddbbj', '2022-08-21 01:40:40', '2022-08-21 01:40:40'),
(4, 'John', 'Doe', '923359436411', 'teamthunder86@gmail.com', 'Perth 4200', 'Perth', '9652102365', NULL, NULL, 'cL4zJO2vDim8yXgzIG1IBE:APA91bHvCSah-aHllWHWJQfFk5E8EtB4XhmtrqplNxd8mKE3CpnZUP07b-L_-eD02JqplDaSg64wmKswbUGVb9Hjt-YjLLZGtvFizwWVV4perl_EVKVagz0bh2yBpJpa-udkaIiQ3h9w', '2022-08-21 01:42:39', '2022-08-21 01:42:39'),
(5, 'Sajjad', 'Javed', '923359436410', 'hassanzaidi.indus@gmail.com', 'RWP 46000', 'Punjab', '0011223344', '8b46aa48-5042-4d14-b393-a997cbb03b80-1182466043_1661046975.jpg', NULL, 'cL4zJO2vDim8yXgzIG1IBE:APA91bHvCSah-aHllWHWJQfFk5E8EtB4XhmtrqplNxd8mKE3CpnZUP07b-L_-eD02JqplDaSg64wmKswbUGVb9Hjt-YjLLZGtvFizwWVV4perl_EVKVagz0bh2yBpJpa-udkaIiQ3h9w', '2022-08-21 01:43:37', '2022-08-21 01:56:15'),
(7, 'sddfsdf', 'sdfsdf', '+923002777518', 'sdfsdfsdf@yahoo.com', 'sdfsdf', 'sdfsdf', 'sdfsdf', NULL, NULL, 'cL4zJO2vDim8yXgzIG1IBE:APA91bHvCSah-aHllWHWJQfFk5E8EtB4XhmtrqplNxd8mKE3CpnZUP07b-L_-eD02JqplDaSg64wmKswbUGVb9Hjt-YjLLZGtvFizwWVV4perl_EVKVagz0bh2yBpJpa-udkaIiQ3h9w', '2022-08-21 21:19:33', '2022-08-21 21:19:33');

-- --------------------------------------------------------

--
-- Table structure for table `profile_categories`
--

CREATE TABLE `profile_categories` (
  `id` int(11) NOT NULL,
  `post_ad_category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile_categories`
--

INSERT INTO `profile_categories` (`id`, `post_ad_category_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 3, 5, '2022-08-21 02:05:26', '2022-08-21 02:05:26'),
(2, 4, 5, '2022-08-21 02:05:26', '2022-08-21 02:05:26'),
(3, 5, 5, '2022-08-21 02:05:26', '2022-08-21 02:05:26'),
(4, 3, 1, '2022-08-23 00:23:44', '2022-08-23 00:23:44'),
(5, 4, 1, '2022-08-23 00:23:44', '2022-08-23 00:23:44'),
(6, 5, 1, '2022-08-23 00:23:44', '2022-08-23 00:23:44');

-- --------------------------------------------------------

--
-- Table structure for table `profile_skills`
--

CREATE TABLE `profile_skills` (
  `id` int(11) NOT NULL,
  `skill_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `site_title` text DEFAULT NULL,
  `site_footer` text DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `mail_host` varchar(50) DEFAULT NULL,
  `smtp_username` longtext DEFAULT NULL,
  `smtp_password` varchar(500) DEFAULT NULL,
  `mail_from` varchar(200) DEFAULT NULL,
  `mailfrom_name` varchar(200) DEFAULT NULL,
  `mail_enc` varchar(100) DEFAULT NULL,
  `mail_port` varchar(100) DEFAULT NULL,
  `twitter` varchar(200) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `linkedin` varchar(200) DEFAULT NULL,
  `instagram` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stripe_publishkey` varchar(200) NOT NULL,
  `stripe_secretkey` varchar(200) NOT NULL,
  `site_logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `site_title`, `site_footer`, `address`, `mail_host`, `smtp_username`, `smtp_password`, `mail_from`, `mailfrom_name`, `mail_enc`, `mail_port`, `twitter`, `facebook`, `linkedin`, `instagram`, `created_at`, `updated_at`, `stripe_publishkey`, `stripe_secretkey`, `site_logo`) VALUES
(1, 'Jobtasker', 'Jobtasker', 'Level 26, 44 Market Street, Sydney, NSW 2000', 'gdfgdfg', 'gdfgdfg', 'gdfgdfg', 'gdfgddfgq', 'gdfgdfgdfg', 'gdfgdfgd', '345345', 'https://twitter.com', 'https://facebook.com', 'https://linkedin.com', 'https://instagram.com', '2022-05-17 18:39:06', '2022-08-21 19:24:55', 'pk_test_GFHAENeCoQslPfs1W7RElzYK', 'sk_test_nah28nnuA5f3JDjlLfg5XgBA', 'logo-1085985454_1661127803.png');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'Asp.net', NULL, NULL),
(2, 'C++', NULL, NULL),
(3, '.net', NULL, NULL),
(4, 'Angular', NULL, NULL),
(5, 'ReactJs', NULL, NULL),
(6, 'Node Js', NULL, NULL),
(7, 'PHP', NULL, NULL),
(8, 'Laravel', NULL, NULL),
(9, 'android studio', '2022-06-24 05:31:41', '2022-06-24 05:31:41'),
(10, 'Visual Studio', '2022-06-24 08:53:12', '2022-06-24 08:53:12'),
(11, 'JAVA', '2022-06-25 20:34:14', '2022-06-25 20:34:14'),
(12, 'MYSQL', '2022-06-25 20:34:48', '2022-06-25 20:34:48');

-- --------------------------------------------------------

--
-- Table structure for table `tasker_bank_details`
--

CREATE TABLE `tasker_bank_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `account_title` varchar(50) DEFAULT NULL,
  `account_no` varchar(50) DEFAULT NULL,
  `bsb` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasker_bank_details`
--

INSERT INTO `tasker_bank_details` (`id`, `user_id`, `account_title`, `account_no`, `bsb`, `created_at`, `updated_at`) VALUES
(1, 1, 'Hassan Mujtaba Zaidi', '2491409010', '1100225532', '2022-08-21 02:49:03', '2022-08-21 21:31:46'),
(3, 4, 'sdfsdf', 'sdfs', 'dfsdfsdf', '2022-08-21 21:41:37', '2022-08-21 21:41:37');

-- --------------------------------------------------------

--
-- Table structure for table `tasker_reviews`
--

CREATE TABLE `tasker_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_id` int(11) NOT NULL,
  `poster_id` int(11) NOT NULL,
  `review` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `review_rating` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasker_reviews`
--

INSERT INTO `tasker_reviews` (`id`, `job_id`, `poster_id`, `review`, `review_rating`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'It was fun to work with Ali Akbar. Thank you. Will work with him again', 5, NULL, NULL),
(2, 2, 2, 'Good client', 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `stripe_id` varchar(50) DEFAULT NULL,
  `paidby_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `job_posts_id` int(11) DEFAULT NULL,
  `prove_no` varchar(50) DEFAULT '0',
  `reject_detail` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `tran_status` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `stripe_id`, `paidby_id`, `amount`, `job_posts_id`, `prove_no`, `reject_detail`, `created_at`, `updated_at`, `tran_status`) VALUES
(1, 'ch_3LZ3hcESetrwMkhf0YijsKgb', 2, 500, 1, 'JT-123456789', '\'0\'', '2022-08-21 02:15:54', '2022-08-21 02:52:26', 1),
(2, 'ch_3LZ3y1ESetrwMkhf1TtHuKd7', 2, 1250, 2, 'JT-123456089', '\'0\'', '2022-08-21 02:32:51', '2022-08-21 02:54:35', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` enum('tasker','poster','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'tasker',
  `active` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `user_type`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Syed Hassan Mujtaba Zaidi', 'hassanzaidiksa@gmail.com', NULL, '$2y$10$gh.Hx2rqjykTVX8HSck.ouUSsrQgsI7jA11SAzhtbPPxsdpkASnwq', '37|MAPQCQ77BTigalkY0WWiBbHnNnC2B5UyaMOoFBQ9', 'tasker', 0, '2022-08-20 20:29:34', '2022-08-22 22:29:30'),
(2, 'Ali Akbar', 'hmzaidi514@gmail.com', NULL, '$2y$10$tcdNAVzj3qb47ge11KTNH.3.neHSLHhXVomi/pEixj8CkRpfQgwZK', '32|kdccmsWWdYK18kUC8avsDYATVGDxQ2Ex5aeO3oWg', 'poster', 0, '2022-08-20 20:37:00', '2022-08-21 18:40:03'),
(3, 'Umair Waseem', 'chunjzaidi@gmail.com', NULL, '$2y$10$gFhp6y2HmICug6VTMaJHE.kQLPxkrCPizqxGDLOlqSiPII6pLFWPq', '33|FXPjVSHPi6CfLglC8wKizTcQy0uNJxBPoArXy3Yc', 'poster', 0, '2022-08-20 20:40:40', '2022-08-21 18:40:23'),
(4, 'John Doe', 'teamthunder86@gmail.com', NULL, '$2y$10$TfhCIWQOvHyJdLzv.F7FYu4dqSsBbWhep.O5ccxEYz4yDE/aWfmoC', '21|EQCgaSNu6mzlM9XgxRW8hkkUIEN6yhD4npjrxNXW', 'tasker', 0, '2022-08-20 20:42:39', '2022-08-21 16:32:22'),
(5, 'Sajjad Javed', 'hassanzaidi.indus@gmail.com', NULL, '$2y$10$QRF6AyJ5fan7mTVNoGaCrO/gIKwMPEJCpc3krx9iJfv4vLPG6Xqfu', '26|qq6VlqJWva88IA4xCI1vfUreeAjMQCTLPg7aadfL', 'tasker', 0, '2022-08-20 20:43:37', '2022-08-21 17:36:06'),
(6, 'Job tasker', 'jobtasker@admin.com', NULL, '$2y$10$WVIq7StE4ZW5hOY8TNlpc.mTmxpD/UsuHwt7tzO.JNuh/DTjJNHPG', '39|N6dq6rKCQK2sI1L4GS0S7ZCXViLTI9EtLq9s9TGP', 'admin', 0, NULL, '2022-08-23 19:27:09'),
(7, 'sddfsdf sdfsdf', 'sdfsdfsdf@yahoo.com', NULL, '$2y$10$wbZmPb8MY.knck2eEWqF2.QKdSmwnZ6ZvLOy2vMOu.9ufK54cI.Ty', NULL, 'tasker', 0, '2022-08-21 16:19:33', '2022-08-21 16:19:33');

-- --------------------------------------------------------

--
-- Table structure for table `user_payment_methods`
--

CREATE TABLE `user_payment_methods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `payment_id` varchar(50) DEFAULT NULL,
  `last4` int(11) DEFAULT NULL,
  `exp_month` int(11) DEFAULT NULL,
  `exp_year` int(11) DEFAULT NULL,
  `alldata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_payment_methods`
--

INSERT INTO `user_payment_methods` (`id`, `user_id`, `brand`, `payment_id`, `last4`, `exp_month`, `exp_year`, `alldata`, `created_at`, `updated_at`) VALUES
(1, 3, 'visa', 'pm_1LZMFEESetrwMkhfMEzgoaml', 4242, 4, 2044, '{\"id\":\"pm_1LZMFEESetrwMkhfMEzgoaml\",\"object\":\"payment_method\",\"billing_details\":{\"address\":{\"city\":null,\"country\":null,\"line1\":null,\"line2\":null,\"postal_code\":\"44444\",\"state\":null},\"email\":null,\"name\":null,\"phone\":null},\"card\":{\"brand\":\"visa\",\"checks\":{\"address_line1_check\":null,\"address_postal_code_check\":null,\"cvc_check\":null},\"country\":\"US\",\"exp_month\":4,\"exp_year\":2044,\"funding\":\"credit\",\"generated_from\":null,\"last4\":\"4242\",\"networks\":{\"available\":[\"visa\"],\"preferred\":null},\"three_d_secure_usage\":{\"supported\":true},\"wallet\":null},\"created\":1661119429,\"customer\":null,\"livemode\":false,\"type\":\"card\"}', '2022-08-21 17:03:50', '2022-08-21 17:03:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disputes`
--
ALTER TABLE `disputes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `job_offers`
--
ALTER TABLE `job_offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_post_histories`
--
ALTER TABLE `job_post_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_questions`
--
ALTER TABLE `job_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_reports`
--
ALTER TABLE `job_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_reviews`
--
ALTER TABLE `job_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_reviews_job_id_index` (`job_id`),
  ADD KEY `job_reviews_tasker_id_index` (`tasker_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_ad_categories`
--
ALTER TABLE `post_ad_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_ad_skills`
--
ALTER TABLE `post_ad_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile_categories`
--
ALTER TABLE `profile_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile_skills`
--
ALTER TABLE `profile_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasker_bank_details`
--
ALTER TABLE `tasker_bank_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasker_reviews`
--
ALTER TABLE `tasker_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasker_reviews_job_id_index` (`job_id`),
  ADD KEY `tasker_reviews_poster_id_index` (`poster_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `disputes`
--
ALTER TABLE `disputes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_offers`
--
ALTER TABLE `job_offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `job_posts`
--
ALTER TABLE `job_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `job_post_histories`
--
ALTER TABLE `job_post_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `job_questions`
--
ALTER TABLE `job_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `job_reports`
--
ALTER TABLE `job_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_reviews`
--
ALTER TABLE `job_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_ad_categories`
--
ALTER TABLE `post_ad_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `post_ad_skills`
--
ALTER TABLE `post_ad_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `post_categories`
--
ALTER TABLE `post_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profile_categories`
--
ALTER TABLE `profile_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `profile_skills`
--
ALTER TABLE `profile_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tasker_bank_details`
--
ALTER TABLE `tasker_bank_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tasker_reviews`
--
ALTER TABLE `tasker_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_payment_methods`
--
ALTER TABLE `user_payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
