/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "charities" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "logo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "annonymous" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "default_currency" TEXT NOT NULL DEFAULT 'GBP',
ADD COLUMN     "mfa_secret" TEXT,
ADD COLUMN     "mfa_type" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "phone_number_verified" TIMESTAMP(3),
ADD COLUMN     "total_charities_owned" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_donations_amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_donations_made" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_fundraisers_owned" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "charity_followers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "charityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "charity_followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charity_owners" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "charity_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "charity_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "annonymous" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "fundraiser_id" TEXT NOT NULL,
    "message" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraisers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "deadline_date" TIMESTAMP(3),
    "default_currency" TEXT NOT NULL DEFAULT 'GBP',
    "description" TEXT,
    "headline" TEXT,
    "image" TEXT,
    "target" INTEGER NOT NULL,
    "total_donations" INTEGER NOT NULL DEFAULT 0,
    "total_raised" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "fundraisers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundraiser_owners" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fundraiser_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "fundraiser_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_fundraisers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fundraiser_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "saved_fundraisers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "charity_followers_charityId_userId_key" ON "charity_followers"("charityId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "charity_owners_charity_id_user_id_key" ON "charity_owners"("charity_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "fundraiser_owners_fundraiser_id_user_id_key" ON "fundraiser_owners"("fundraiser_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "saved_fundraisers_fundraiser_id_user_id_key" ON "saved_fundraisers"("fundraiser_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- AddForeignKey
ALTER TABLE "charity_followers" ADD CONSTRAINT "charity_followers_charityId_fkey" FOREIGN KEY ("charityId") REFERENCES "charities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charity_followers" ADD CONSTRAINT "charity_followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charity_owners" ADD CONSTRAINT "charity_owners_charity_id_fkey" FOREIGN KEY ("charity_id") REFERENCES "charities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charity_owners" ADD CONSTRAINT "charity_owners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_fundraiser_id_fkey" FOREIGN KEY ("fundraiser_id") REFERENCES "fundraisers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraiser_owners" ADD CONSTRAINT "fundraiser_owners_fundraiser_id_fkey" FOREIGN KEY ("fundraiser_id") REFERENCES "fundraisers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraiser_owners" ADD CONSTRAINT "fundraiser_owners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_fundraisers" ADD CONSTRAINT "saved_fundraisers_fundraiser_id_fkey" FOREIGN KEY ("fundraiser_id") REFERENCES "fundraisers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_fundraisers" ADD CONSTRAINT "saved_fundraisers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
