-- AlterTable
ALTER TABLE "User" ADD COLUMN     "space_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subscription_status" TEXT NOT NULL DEFAULT 'free';
