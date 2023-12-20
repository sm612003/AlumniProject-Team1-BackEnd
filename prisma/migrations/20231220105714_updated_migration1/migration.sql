/*
  Warnings:

  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lastName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_userName_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `userName`,
    ADD COLUMN `dob` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstName` VARCHAR(255) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_firstName_key` ON `User`(`firstName`);

-- CreateIndex
CREATE UNIQUE INDEX `User_lastName_key` ON `User`(`lastName`);
