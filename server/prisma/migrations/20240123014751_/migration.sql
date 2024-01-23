/*
  Warnings:

  - You are about to drop the column `charityId` on the `fundraisers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `fundraisers` table. All the data in the column will be lost.
  - You are about to drop the `charities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `charity_followers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `charity_owners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "charity_followers" DROP CONSTRAINT "charity_followers_charityId_fkey";

-- DropForeignKey
ALTER TABLE "charity_followers" DROP CONSTRAINT "charity_followers_userId_fkey";

-- DropForeignKey
ALTER TABLE "charity_owners" DROP CONSTRAINT "charity_owners_charity_id_fkey";

-- DropForeignKey
ALTER TABLE "charity_owners" DROP CONSTRAINT "charity_owners_user_id_fkey";

-- DropForeignKey
ALTER TABLE "fundraisers" DROP CONSTRAINT "fundraisers_charityId_fkey";

-- DropForeignKey
ALTER TABLE "fundraisers" DROP CONSTRAINT "fundraisers_userId_fkey";

-- AlterTable
ALTER TABLE "fundraisers" DROP COLUMN "charityId",
DROP COLUMN "userId";

-- DropTable
DROP TABLE "charities";

-- DropTable
DROP TABLE "charity_followers";

-- DropTable
DROP TABLE "charity_owners";

-- CreateTable
CREATE TABLE "fundraiser_owners" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fundraiser_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "fundraiser_owners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fundraiser_owners_fundraiser_id_user_id_key" ON "fundraiser_owners"("fundraiser_id", "user_id");

-- AddForeignKey
ALTER TABLE "fundraiser_owners" ADD CONSTRAINT "fundraiser_owners_fundraiser_id_fkey" FOREIGN KEY ("fundraiser_id") REFERENCES "fundraisers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraiser_owners" ADD CONSTRAINT "fundraiser_owners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
