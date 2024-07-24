/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 100432
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 100432
File Encoding         : 65001

Date: 2024-07-18 16:48:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `freelancerId` int(11) NOT NULL,
  `workId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `active` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`freelancerId`,`workId`),
  KEY `FK_0e78f06e9f52300b8832551d93a` (`workId`),
  CONSTRAINT `FK_0e78f06e9f52300b8832551d93a` FOREIGN KEY (`workId`) REFERENCES `work` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ed7bc8e7ba921aab28b04dbca5d` FOREIGN KEY (`freelancerId`) REFERENCES `freelancer` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of apply
-- ----------------------------
INSERT INTO `apply` VALUES ('4', '2', '1', '2');
INSERT INTO `apply` VALUES ('4', '4', '0', '0');
INSERT INTO `apply` VALUES ('5', '1', '0', '0');
INSERT INTO `apply` VALUES ('6', '3', '0', '0');

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `userId` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `FK_3f62b42ed23958b120c235f74df` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('1', 'good');
INSERT INTO `customer` VALUES ('2', 'good');
INSERT INTO `customer` VALUES ('3', 'good');
INSERT INTO `customer` VALUES ('7', 'good');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `freelancerId` int(11) NOT NULL,
  `workId` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`freelancerId`,`workId`),
  KEY `FK_645942b5862a151fa8672b90c40` (`workId`),
  CONSTRAINT `FK_645942b5862a151fa8672b90c40` FOREIGN KEY (`workId`) REFERENCES `work` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_8b311e1fb1d9429c5bdeabf86f7` FOREIGN KEY (`freelancerId`) REFERENCES `freelancer` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES ('4', '2', '20', 'Best');
INSERT INTO `feedback` VALUES ('4', '4', '10', 'nice');
INSERT INTO `feedback` VALUES ('5', '1', '20', 'nice');

-- ----------------------------
-- Table structure for freelancer
-- ----------------------------
DROP TABLE IF EXISTS `freelancer`;
CREATE TABLE `freelancer` (
  `userId` int(11) NOT NULL,
  `salary` int(11) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `FK_3ecc6951b7f7133932a409a3fb7` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of freelancer
-- ----------------------------
INSERT INTO `freelancer` VALUES ('4', '100000');
INSERT INTO `freelancer` VALUES ('5', '120000');
INSERT INTO `freelancer` VALUES ('6', '190000');

-- ----------------------------
-- Table structure for skill
-- ----------------------------
DROP TABLE IF EXISTS `skill`;
CREATE TABLE `skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of skill
-- ----------------------------
INSERT INTO `skill` VALUES ('1', 's1');
INSERT INTO `skill` VALUES ('2', 's2');
INSERT INTO `skill` VALUES ('3', 's3');

-- ----------------------------
-- Table structure for skill_freelancer
-- ----------------------------
DROP TABLE IF EXISTS `skill_freelancer`;
CREATE TABLE `skill_freelancer` (
  `skillId` int(11) NOT NULL,
  `freelancerId` int(11) NOT NULL,
  PRIMARY KEY (`skillId`,`freelancerId`),
  KEY `FK_75fae9b922dcaa6e4e867b2908a` (`freelancerId`),
  CONSTRAINT `FK_75fae9b922dcaa6e4e867b2908a` FOREIGN KEY (`freelancerId`) REFERENCES `freelancer` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_be9ecfb59f1e4ab25c632fa9bd8` FOREIGN KEY (`skillId`) REFERENCES `skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of skill_freelancer
-- ----------------------------
INSERT INTO `skill_freelancer` VALUES ('1', '4');
INSERT INTO `skill_freelancer` VALUES ('1', '5');
INSERT INTO `skill_freelancer` VALUES ('2', '4');
INSERT INTO `skill_freelancer` VALUES ('2', '5');

-- ----------------------------
-- Table structure for skill_work
-- ----------------------------
DROP TABLE IF EXISTS `skill_work`;
CREATE TABLE `skill_work` (
  `skillId` int(11) NOT NULL,
  `workId` int(11) NOT NULL,
  PRIMARY KEY (`skillId`,`workId`),
  KEY `FK_459410473ea11fa485af58836bd` (`workId`),
  CONSTRAINT `FK_459410473ea11fa485af58836bd` FOREIGN KEY (`workId`) REFERENCES `work` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ac4e069a33de243b4ee562e7e23` FOREIGN KEY (`skillId`) REFERENCES `skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of skill_work
-- ----------------------------
INSERT INTO `skill_work` VALUES ('1', '3');
INSERT INTO `skill_work` VALUES ('1', '4');
INSERT INTO `skill_work` VALUES ('3', '5');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isVerify` int(11) NOT NULL DEFAULT 0,
  `code` int(11) NOT NULL DEFAULT 0,
  `picUrl` varchar(255) NOT NULL DEFAULT 'user.png',
  `role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'Aram', 'Aramyan', 'aa@gmail.com', '22', '$2b$10$7S7Js1qltmr04M.svh2YHOhcR1birdgJgk/BrnvCTo1VJxlMQd/k6', '0', '0', 'user.png', '0');
INSERT INTO `user` VALUES ('2', 'Gagik', 'Sahakyan', 'gg@gmail.com', '26', '$2b$10$8Qg8lAATC3SSgLZmQgHFUeFO/4u/DFVW5Z6Qun6O7LCEP4SM1bkUu', '0', '0', 'user.png', '0');
INSERT INTO `user` VALUES ('3', 'Hayk', 'Haykyan', 'hh@gmail.com', '28', '$2b$10$6gHombgvjTKGP2Ll9Mf3IORKo5pr8kb1zX6jgSH7UrlfNjkeksZeK', '0', '0', 'user.png', '0');
INSERT INTO `user` VALUES ('4', 'Anna', 'Anyan', 'an@gmail.com', '23', '$2b$10$98ubHZRpJ3x0S8cqD83fpu28Zr4LVHiN9rzpUfKa1eO.EH7nJ9CmO', '0', '0', 'user.png', '1');
INSERT INTO `user` VALUES ('5', 'Harut', 'Hyan', 'hr@gmail.com', '27', '$2b$10$QaXoweB3b1PwMEfzSfDaeurxmpQh7jwxwlAG4Z2piTPbRvjtWWkVq', '0', '0', 'user.png', '1');
INSERT INTO `user` VALUES ('6', 'Gor', 'Sahakyan', 'gs@gmail.com', '29', '$2b$10$nL1ZzwrwmGqmhwgSwdo4neVplnc7JRVAVWJJ/22odMyYCduAiTYb.', '0', '0', 'user.png', '1');
INSERT INTO `user` VALUES ('7', 'Aren', 'Ayan', 'ae@gmail.com', '29', '$2b$10$lJ.Qs5eBNB8vFwCWM.3Vh.VeiXSB7ATjss6C2NkMbsiwKzcLZEoWi', '0', '0', 'user.png', '2');

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `deadline` datetime NOT NULL,
  `customerUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_406420f12fbf9736869a43c110e` (`customerUserId`),
  CONSTRAINT `FK_406420f12fbf9736869a43c110e` FOREIGN KEY (`customerUserId`) REFERENCES `customer` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- ----------------------------
-- Records of work
-- ----------------------------
INSERT INTO `work` VALUES ('1', 'work1', 'nice', '5000', '2024-07-18 12:38:32', '3');
INSERT INTO `work` VALUES ('2', 'work1', 'nice', '5000', '2024-07-18 12:38:32', '3');
INSERT INTO `work` VALUES ('3', 'work1', 'nice', '5000', '2024-07-18 12:38:32', '1');
INSERT INTO `work` VALUES ('4', 'work2', 'nice', '5000', '2024-07-18 12:38:32', '3');
INSERT INTO `work` VALUES ('5', 'work50', 'nice', '5000', '2024-07-18 12:38:32', '3');
SET FOREIGN_KEY_CHECKS=1;
