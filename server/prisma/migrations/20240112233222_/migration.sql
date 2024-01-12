/*
  Warnings:

  - You are about to drop the `fundraiser_owners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fundraiser_owners" DROP CONSTRAINT "fundraiser_owners_fundraiser_id_fkey";

-- DropForeignKey
ALTER TABLE "fundraiser_owners" DROP CONSTRAINT "fundraiser_owners_user_id_fkey";

-- AlterTable
ALTER TABLE "fundraisers" ADD COLUMN     "charityId" TEXT,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "fundraiser_owners";

-- AddForeignKey
ALTER TABLE "fundraisers" ADD CONSTRAINT "fundraisers_charityId_fkey" FOREIGN KEY ("charityId") REFERENCES "charities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraisers" ADD CONSTRAINT "fundraisers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
