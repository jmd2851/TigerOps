-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 27, 2023 at 05:23 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tigeropsdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `Name` varchar(20) NOT NULL,
  `Value` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`Name`, `Value`) VALUES
('DefaultSlideTime', '10'),
('OtherSlideTime', '20'),
('LowStorageThreshold', '0.8'),
('FreeStorage', '0'),
('TotalStorage', '0');

-- --------------------------------------------------------

--
-- Table structure for table `element`
--

CREATE TABLE `element` (
  `ElementID` int NOT NULL,
  `ElementType` varchar(255) NOT NULL,
  `ElementContent` varchar(255) NOT NULL,
  `ElementName` varchar(20) DEFAULT NULL,
  `ElementHeight` int DEFAULT NULL,
  `ElementWidth` int DEFAULT NULL,
  `PostionX` int DEFAULT NULL,
  `PositionY` int DEFAULT NULL,
  `SlideID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `element`
--

INSERT INTO `element` (`ElementID`, `ElementType`, `ElementContent`, `ElementName`, `ElementHeight`, `ElementWidth`, `PostionX`, `PositionY`, `SlideID`) VALUES
(1, 'Text', 'Sql Basics', 'WelcomeText', 150, 200, 50, 50, 1),
(2, 'Image', 'sql_basics.jpg', 'SQLImage', 100, 100, 60, 60, 2);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `EventID` int NOT NULL,
  `EventName` varchar(20) NOT NULL,
  `TargetSlideID` int DEFAULT NULL,
  `EventStartTime` datetime DEFAULT NULL,
  `EventEndTime` datetime DEFAULT NULL,
  `EventDescription` varchar(255) DEFAULT NULL,
  `IsVisible` tinyint(1) NOT NULL DEFAULT '1',
  `ImagePath` varchar(100) DEFAULT NULL,
  `ImageAlt` varchar(100) DEFAULT NULL
) ;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`EventID`, `EventName`, `TargetSlideID`, `EventStartTime`, `EventEndTime`, `EventDescription`, `IsVisible`, `ImagePath`, `ImageAlt`) VALUES
(1, 'Thankgiving', NULL, '2023-11-24 09:00:00', '2023-11-01 10:00:00', 'Turkey Day', 1, NULL, NULL),
(2, 'Christmas', NULL, '2023-12-25 12:00:00', '2023-11-01 12:00:00', 'Happy XMAS', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `MenuID` int NOT NULL,
  `MenuData` json NOT NULL,
  `Date` date NOT NULL,
  `IsVisible` tinyint(1) NOT NULL DEFAULT '1',
  `ImagePath` varchar(100) DEFAULT NULL,
  `ImageAlt` varchar(100) DEFAULT NULL
) ;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`MenuID`, `MenuData`, `Date`, `IsVisible`, `ImagePath`, `ImageAlt`) VALUES
(1, '{\"items\": [\"Vegetarian Soup\", \"Whole Wheat Bread\", \"Apple\"]}', '2023-12-10', 1, NULL, NULL),
(2, '{\"items\": [\"Rice and Beans\", \"Salad\", \"Orange\"]}', '2023-12-11', 1, NULL, NULL),
(3, '{\"items\": [\"Food\", \"Vegan\", \"Item\"]}', '2023-10-31', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `presentation`
--

CREATE TABLE `presentation` (
  `PresentationID` int NOT NULL,
  `PresentationTitle` varchar(255) NOT NULL,
  `NumberOfSlides` int NOT NULL,
  `ThemeID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `presentation`
--

INSERT INTO `presentation` (`PresentationID`, `PresentationTitle`, `NumberOfSlides`, `ThemeID`) VALUES
(1, 'Data Science 101', 10, 1),
(2, 'Introduction to SQL', 15, 2);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slide`
--

CREATE TABLE `slide` (
  `SlideID` int NOT NULL,
  `SlideNumber` int NOT NULL,
  `SlideTitle` varchar(255) DEFAULT NULL,
  `PresentationID` int DEFAULT NULL,
  `EventID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `slide`
--

INSERT INTO `slide` (`SlideID`, `SlideNumber`, `SlideTitle`, `PresentationID`, `EventID`) VALUES
(1, 1, 'Introduction to Data Science', 1, NULL),
(2, 2, 'SQL Basics', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `TotalStorage` decimal(10,2) NOT NULL,
  `FreeStorage` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `theme`
--

CREATE TABLE `theme` (
  `ThemeID` int NOT NULL,
  `ThemeName` varchar(20) NOT NULL,
  `ThemeDescription` varchar(255) DEFAULT NULL,
  `TextColor` varchar(7) DEFAULT NULL,
  `BackgroundColor` varchar(7) DEFAULT NULL,
  `AccentColor` varchar(7) DEFAULT NULL,
  `Font` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `theme`
--

INSERT INTO `theme` (`ThemeID`, `ThemeName`, `ThemeDescription`, `TextColor`, `BackgroundColor`, `AccentColor`, `Font`) VALUES
(1, 'DarkMode', 'Dark theme with bright text', '#FFFFFF', '#000000', '#FFFFFF', 'Times New Roman'),
(2, 'LightMode', 'Light theme with dark text', '#000000', '#FFFFFF', '#000000', 'Times New Roman');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int NOT NULL,
  `FirstName` varchar(35) NOT NULL,
  `LastName` varchar(35) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `LastLogin` datetime DEFAULT NULL,
  `UserRole` varchar(255) NOT NULL,
  `PresentationID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `FirstName`, `LastName`, `Email`, `Password`, `LastLogin`, `UserRole`, `PresentationID`) VALUES
(1, 'John', 'Smith', 'johnsmith@test.com', 'password123', '2023-10-28 20:33:26', 'Admin', 1),
(2, 'Jane', 'Smith', 'janesmith@test.com', 'password123', '2023-10-28 20:33:26', 'User', 2),
(3, 'test', 'test', 'tigerops@test.com', '$2a$10$e0i0/X3BgpcFR0DSaUWC/u.hJBcevRYeSwhm8sozTyp/RgV5MQ47e', NULL, 'admin', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`Name`);

--
-- Indexes for table `element`
--
ALTER TABLE `element`
  ADD PRIMARY KEY (`ElementID`),
  ADD KEY `SlideID` (`SlideID`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`EventID`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`MenuID`);

--
-- Indexes for table `presentation`
--
ALTER TABLE `presentation`
  ADD PRIMARY KEY (`PresentationID`),
  ADD KEY `ThemeID` (`ThemeID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `slide`
--
ALTER TABLE `slide`
  ADD PRIMARY KEY (`SlideID`),
  ADD KEY `PresentationID` (`PresentationID`),
  ADD KEY `EventID` (`EventID`);

--
-- Indexes for table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`ThemeID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `PresentationID` (`PresentationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `element`
--
ALTER TABLE `element`
  MODIFY `ElementID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `EventID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `MenuID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `presentation`
--
ALTER TABLE `presentation`
  MODIFY `PresentationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `slide`
--
ALTER TABLE `slide`
  MODIFY `SlideID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `theme`
--
ALTER TABLE `theme`
  MODIFY `ThemeID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `element`
--
ALTER TABLE `element`
  ADD CONSTRAINT `element_ibfk_1` FOREIGN KEY (`SlideID`) REFERENCES `slide` (`SlideID`);

--
-- Constraints for table `presentation`
--
ALTER TABLE `presentation`
  ADD CONSTRAINT `presentation_ibfk_1` FOREIGN KEY (`ThemeID`) REFERENCES `theme` (`ThemeID`);

--
-- Constraints for table `slide`
--
ALTER TABLE `slide`
  ADD CONSTRAINT `slide_ibfk_1` FOREIGN KEY (`PresentationID`) REFERENCES `presentation` (`PresentationID`),
  ADD CONSTRAINT `slide_ibfk_2` FOREIGN KEY (`EventID`) REFERENCES `event` (`EventID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`PresentationID`) REFERENCES `presentation` (`PresentationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
