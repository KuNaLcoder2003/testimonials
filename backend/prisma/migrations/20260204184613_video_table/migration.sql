-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "testimonial_id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_testimonial_id_key" ON "Video"("testimonial_id");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "Testimonial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
