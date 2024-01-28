/*
  Warnings:

  - You are about to drop the column `image` on the `fundraisers` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `fundraisers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fundraisers" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image",
ADD COLUMN     "avatarUrl" TEXT;
