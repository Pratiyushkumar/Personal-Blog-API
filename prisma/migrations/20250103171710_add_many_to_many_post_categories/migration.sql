/*
  Warnings:

  - You are about to drop the column `published_at` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `Posts_category_id_fkey`;

-- DropIndex
DROP INDEX `Posts_category_id_fkey` ON `posts`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `published_at`;

-- AlterTable
ALTER TABLE `session` MODIFY `token` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `PostCategories` (
    `post_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`post_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Categories_name_key` ON `Categories`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Session_token_key` ON `Session`(`token`);

-- AddForeignKey
ALTER TABLE `PostCategories` ADD CONSTRAINT `PostCategories_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostCategories` ADD CONSTRAINT `PostCategories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
