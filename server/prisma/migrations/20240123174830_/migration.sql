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
CREATE TABLE "donations" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
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
    "headline" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "total_donations" INTEGER NOT NULL DEFAULT 0,
    "total_raised" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "fundraisers_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "annonymous" BOOLEAN NOT NULL DEFAULT false,
    "default_currency" TEXT NOT NULL DEFAULT 'GBP',
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "mfa_secret" TEXT,
    "mfa_type" TEXT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "total_charities_owned" INTEGER NOT NULL DEFAULT 0,
    "total_donations_amount" INTEGER NOT NULL DEFAULT 0,
    "total_donations_made" INTEGER NOT NULL DEFAULT 0,
    "total_fundraisers_owned" INTEGER NOT NULL DEFAULT 0,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_requests" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "verification_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "access_token" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "provider_account_id" TEXT NOT NULL,
    "provider_type" TEXT NOT NULL,
    "refresh_token" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires" TIMESTAMP(3),
    "session_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fundraiser_owners_fundraiser_id_user_id_key" ON "fundraiser_owners"("fundraiser_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "fundraisers_slug_key" ON "fundraisers"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "saved_fundraisers_fundraiser_id_user_id_key" ON "saved_fundraisers"("fundraiser_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests_token_key" ON "verification_requests"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests_identifier_token_key" ON "verification_requests"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_account_id_key" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_id_key" ON "sessions"("session_id");

-- AddForeignKey
ALTER TABLE "fundraiser_owners" ADD CONSTRAINT "fundraiser_owners_fundraiser_id_fkey" FOREIGN KEY ("fundraiser_id") REFERENCES "fundraisers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundraiser_owners" ADD CONSTRAINT "fundraiser_owners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_fundraiser_id_fkey" FOREIGN KEY ("fundraiser_id") REFERENCES "fundraisers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_fundraisers" ADD CONSTRAINT "saved_fundraisers_fundraiser_id_fkey" FOREIGN KEY ("fundraiser_id") REFERENCES "fundraisers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_fundraisers" ADD CONSTRAINT "saved_fundraisers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
