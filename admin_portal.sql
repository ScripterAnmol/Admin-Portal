-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2023 at 07:13 PM
-- Server version: 5.7.17
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `c_email` varchar(500) NOT NULL,
  `location_id` varchar(500) NOT NULL,
  `drone_shot_id` varchar(500) NOT NULL,
  `creation_timestamp` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `c_email`, `location_id`, `drone_shot_id`, `creation_timestamp`) VALUES
(13, 'ayasha@example.com', '750', '890', '2023-03-28T16:06:24.891Z'),
(14, 'uttam.rathod@example.com', '780', '650', '2023-03-28T16:06:46.093Z'),
(15, 'rohit@example.com', '840', '680', '2023-03-28T16:07:08.450Z'),
(16, 'anmoldhall1221@gmail.com', '765', '853', '2023-03-28T16:07:20.295Z'),
(17, 'piyush@example.com', '765', '846', '2023-03-28T16:07:48.308Z'),
(12, 'anmoldhall1221@gmail.com', '570', '980', '2023-03-28T16:06:11.517Z');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `c_id` int(11) NOT NULL,
  `email` varchar(500) NOT NULL,
  `ph_no` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`c_id`, `email`, `ph_no`) VALUES
(12, 'rohit@example.com', '9876543210'),
(9, 'ayasha@example.com', '9876543210'),
(10, 'anmoldhall1221@gmail.com', '9876543210'),
(11, 'uttam.rathod@example.com', '9876543210'),
(13, 'piyush@example.com', '9876543210'),
(14, 'adish@example.com', '9876543210');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `e_id` int(11) NOT NULL,
  `e_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `ph_no` varchar(100) NOT NULL,
  `pswd` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`e_id`, `e_name`, `email`, `ph_no`, `pswd`) VALUES
(1, 'Anmol', 'anmoldhall1221@gmail.com', '9872446888', '$2b$08$s6M8fVYMRj0z/fhKOmE66ej6q1iIEU4cBioSx.PkHHFeIWzWNjiue');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`e_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `e_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
