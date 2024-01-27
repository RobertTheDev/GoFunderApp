/*
  Warnings:

  - You are about to drop the column `mfa_verified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "mfa_verified" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "mfa_verified";
