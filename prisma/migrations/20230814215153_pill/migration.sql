-- CreateEnum
CREATE TYPE "Pill" AS ENUM ('BLUE_PILL', 'RED_PILL');

-- CreateTable
CREATE TABLE "PillChoice" (
    "id" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL,
    "pill" "Pill" NOT NULL,

    CONSTRAINT "PillChoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PillChoice_twitterId_key" ON "PillChoice"("twitterId");
