/*
  Warnings:

  - Added the required column `name` to the `fundraisers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fundraisers" ADD COLUMN     "name" TEXT NOT NULL;
