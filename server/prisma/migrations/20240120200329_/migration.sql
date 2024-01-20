/*
  Warnings:

  - Made the column `logo` on table `charities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `charities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "charities" ALTER COLUMN "logo" SET NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "username" TEXT;
