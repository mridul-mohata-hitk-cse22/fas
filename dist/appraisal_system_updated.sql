-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2022 at 07:00 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appraisal_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `student` bigint(20) UNSIGNED NOT NULL,
  `class` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `value` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`student`, `class`, `date`, `value`) VALUES
(1851014, 1, '2022-04-24', 1),
(1851014, 1, '2022-04-26', 1),
(1851014, 1, '2022-04-30', 1),
(1851002, 1, '2022-05-03', 2),
(1851004, 1, '2022-05-03', 2),
(1851014, 1, '2022-05-03', 2),
(1851019, 1, '2022-05-03', 2);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(10) UNSIGNED NOT NULL,
  `paper` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `teacher` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `students` int(10) UNSIGNED NOT NULL,
  `sem` tinyint(4) NOT NULL,
  `year` year(4) NOT NULL,
  `count` int(10) UNSIGNED NOT NULL,
  `ratings` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `paper`, `teacher`, `name`, `active`, `students`, `sem`, `year`, `count`, `ratings`) VALUES
(1, 'CSEN 4237', 1001, 'CSE A', 1, 82, 8, 2022, 6, 1),
(2, 'CSEN 4241', 1002, 'CSE A', 1, 75, 8, 2022, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dept` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `dept`) VALUES
(1, 'B.Tech CSE', 1);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abbreviation` char(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hod` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `abbreviation`, `hod`) VALUES
(1, 'Computer Science & Engineering', 'CSE', NULL),
(2, 'Humanities', 'HMTS', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `map`
--

CREATE TABLE `map` (
  `student` bigint(20) UNSIGNED NOT NULL,
  `class` int(10) UNSIGNED NOT NULL,
  `attendance` int(10) UNSIGNED NOT NULL,
  `rated` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `map`
--

INSERT INTO `map` (`student`, `class`, `attendance`, `rated`) VALUES
(1851014, 1, 5, 1),
(1851002, 1, 2, 0),
(1851002, 2, 0, 0),
(1851014, 2, 0, 0),
(1851004, 1, 2, 0),
(1851004, 2, 0, 0),
(1851019, 1, 2, 0),
(1851019, 2, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `paper`
--

CREATE TABLE `paper` (
  `code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `paper`
--

INSERT INTO `paper` (`code`, `name`, `course`) VALUES
('CSEN 4237', 'Web Development', 1),
('CSEN 4241', 'Distributed Databases', 1),
('HMTS 4222', 'Introduction to French', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `student` bigint(20) UNSIGNED NOT NULL,
  `class` int(10) UNSIGNED NOT NULL,
  `question` tinyint(3) UNSIGNED NOT NULL,
  `value` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`student`, `class`, `question`, `value`) VALUES
(1851014, 1, 1, 5),
(1851014, 1, 2, 5),
(1851014, 1, 3, 5),
(1851014, 1, 4, 3),
(1851014, 1, 5, 4),
(1851014, 1, 6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dept` tinyint(4) NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `dept`, `user`, `dob`) VALUES
(1851002, 'Manish Singh', 1, 5, '1998-02-03'),
(1851004, 'Mohini Sharma', 1, 6, '2000-01-01'),
(1851014, 'Mridul Mohata', 1, 1, '2000-07-14'),
(1851019, 'Sarim Ali Khan', 1, 7, '2000-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dept` tinyint(4) NOT NULL,
  `user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `dept`, `user`) VALUES
(1001, 'Nilanjana G Basu', 1, 2),
(1002, 'Smritikona Barai', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` tinyint(3) UNSIGNED NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `joined` date NOT NULL,
  `address` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` date DEFAULT NULL,
  `datestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `type`, `email`, `phone`, `password`, `joined`, `address`, `expires`, `datestamp`) VALUES
(1, 1, 'mridul.mohata.cse22@heritageit.edu.in', '9874193030', '827ccb0eea8a706c4c34a16891f84e7b', '2018-07-25', '5, BM Road, Kolkata 26', NULL, '2022-07-16 00:00:00'),
(2, 2, 'nilanjanag.basu@heritage.edu', '9903019015', '827ccb0eea8a706c4c34a16891f84e7b', '2015-04-01', '', NULL, '2022-07-16 00:00:00'),
(3, 3, 'admin.fas@heritage.edu', '9876543210', '827ccb0eea8a706c4c34a16891f84e7b', '2016-04-01', '', NULL, '2022-07-16 00:00:00'),
(4, 2, 'smritikona.barai@heritage.edu', '9876543210', '827ccb0eea8a706c4c34a16891f84e7b', '2015-04-01', '', NULL, '2022-07-16 00:00:00'),
(5, 1, 'manish.singh.cse22@heritageit.edu.in', '9876543210', '827ccb0eea8a706c4c34a16891f84e7b', '2018-07-25', '', NULL, '2022-07-16 00:00:00'),
(6, 1, 'mohini.sharma.cse22@heritageit.edu.in', '9876543210', '827ccb0eea8a706c4c34a16891f84e7b', '2018-07-25', '', NULL, '2022-07-16 00:00:00'),
(7, 1, 'sarim.ali.khan.cse22@heritageit.edu.in', '9876543210', '827ccb0eea8a706c4c34a16891f84e7b', '2018-07-25', '', NULL, '2022-07-16 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD KEY `student` (`student`),
  ADD KEY `class` (`class`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher` (`teacher`),
  ADD KEY `paper` (`paper`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dept` (`dept`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `map`
--
ALTER TABLE `map`
  ADD KEY `student` (`student`),
  ADD KEY `class` (`class`);

--
-- Indexes for table `paper`
--
ALTER TABLE `paper`
  ADD PRIMARY KEY (`code`),
  ADD KEY `course` (`course`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD KEY `student` (`student`),
  ADD KEY `class` (`class`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dept` (`dept`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dept` (`dept`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`student`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`class`) REFERENCES `class` (`id`);

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_2` FOREIGN KEY (`teacher`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `class_ibfk_3` FOREIGN KEY (`paper`) REFERENCES `paper` (`code`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`dept`) REFERENCES `department` (`id`);

--
-- Constraints for table `map`
--
ALTER TABLE `map`
  ADD CONSTRAINT `map_ibfk_1` FOREIGN KEY (`student`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `map_ibfk_2` FOREIGN KEY (`class`) REFERENCES `class` (`id`);

--
-- Constraints for table `paper`
--
ALTER TABLE `paper`
  ADD CONSTRAINT `paper_ibfk_1` FOREIGN KEY (`course`) REFERENCES `course` (`id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`student`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`class`) REFERENCES `class` (`id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`dept`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`id`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`dept`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
