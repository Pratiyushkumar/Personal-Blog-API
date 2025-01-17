/*
  Warnings:

  - You are about to drop the column `user_id` on the `postlikes` table. All the data in the column will be lost.
  - Added the required column `dislikeCount` to the `PostLikes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `postlikes` DROP FOREIGN KEY `PostLikes_user_id_fkey`;

-- DropIndex
DROP INDEX `PostLikes_user_id_fkey` ON `postlikes`;

-- AlterTable
ALTER TABLE `postlikes` DROP COLUMN `user_id`,
    ADD COLUMN `dislikeCount` INTEGER NOT NULL;
