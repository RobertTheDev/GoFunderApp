/*
  Warnings:

  - Made the column `headline` on table `fundraisers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `fundraisers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `fundraisers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "fundraisers" ALTER COLUMN "headline" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;
