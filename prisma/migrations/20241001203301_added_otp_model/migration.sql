-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- CreateTable
CREATE TABLE `Otp` (
    `is` INTEGER NOT NULL AUTO_INCREMENT,
    `otpHash` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Otp_userId_key`(`userId`),
    PRIMARY KEY (`is`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
