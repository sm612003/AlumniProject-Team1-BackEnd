-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_userId_fkey`;

-- DropForeignKey
ALTER TABLE `News` DROP FOREIGN KEY `News_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `News` DROP FOREIGN KEY `News_newsletterId_fkey`;

-- DropForeignKey
ALTER TABLE `SubscribedUser` DROP FOREIGN KEY `SubscribedUser_NewsLetterId_fkey`;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_newsletterId_fkey` FOREIGN KEY (`newsletterId`) REFERENCES `Newsletter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubscribedUser` ADD CONSTRAINT `SubscribedUser_NewsLetterId_fkey` FOREIGN KEY (`NewsLetterId`) REFERENCES `Newsletter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
