-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "space_name" VARCHAR(255) NOT NULL,
    "header" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "question_1" TEXT NOT NULL,
    "question_2" TEXT NOT NULL,
    "question_3" TEXT NOT NULL,
    "question_4" TEXT NOT NULL,
    "question_5" TEXT NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "space_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
