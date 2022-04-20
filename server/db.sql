CREATE TABLE if not exists`users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `passCode` varchar(255) DEFAULT NULL,
  `birthDate` varchar(255) DEFAULT NULL,
  `joined` datetime DEFAULT NULL,
  `isOnline` bit(1) DEFAULT NULL,
  `lastSeen` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `messageSenderFK` (`userId`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |