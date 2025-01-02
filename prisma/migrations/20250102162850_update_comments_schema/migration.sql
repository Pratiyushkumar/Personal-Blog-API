-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_parent_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_user_id_fkey`;

-- DropIndex
DROP INDEX `Comments_post_id_fkey` ON `comments`;

-- DropIndex
DROP INDEX `Comments_user_id_fkey` ON `comments`;

-- AlterTable
ALTER TABLE `comments` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `session` MODIFY `token` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_parent_comment_id_fkey` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
