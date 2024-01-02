/*
  Warnings:

  - You are about to alter the column `description` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `description` ENUM('Software Development', 'Data Analytics', 'User Interface Design', 'Network Infrastructure', 'DEVOPS') NULL;
