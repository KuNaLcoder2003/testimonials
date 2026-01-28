-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "testimonial_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_testimonial_id_key" ON "Image"("testimonial_id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "Testimonial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
