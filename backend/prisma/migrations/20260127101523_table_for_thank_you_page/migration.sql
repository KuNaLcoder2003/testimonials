/*
  Warnings:

  - Added the required column `space_image` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "space_image" TEXT NOT NULL,
ADD COLUMN     "text_testimonial_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "video_testimonial_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "company" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "social_link" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "ThankYouPage" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "space_id" TEXT NOT NULL,

    CONSTRAINT "ThankYouPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ThankYouPage_space_id_key" ON "ThankYouPage"("space_id");

-- AddForeignKey
ALTER TABLE "ThankYouPage" ADD CONSTRAINT "ThankYouPage_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
