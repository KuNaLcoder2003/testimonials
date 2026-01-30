-- CreateTable
CREATE TABLE "Embed" (
    "testimonial_id" TEXT NOT NULL,
    "design_type" TEXT NOT NULL DEFAULT 'Aligned Left',
    "background" TEXT NOT NULL DEFAULT 'blue',
    "margin" INTEGER NOT NULL DEFAULT 4,
    "border_thickness" INTEGER NOT NULL,
    "border_color" TEXT NOT NULL,
    "border_radius" TEXT NOT NULL DEFAULT 'small',
    "text_color" TEXT NOT NULL DEFAULT 'black',
    "text_font" TEXT NOT NULL DEFAULT 'Open Sans',
    "text_size" TEXT NOT NULL DEFAULT 'Default',
    "shadow" TEXT NOT NULL,

    CONSTRAINT "Embed_pkey" PRIMARY KEY ("testimonial_id")
);

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_testimonial_id_fkey" FOREIGN KEY ("testimonial_id") REFERENCES "Testimonial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
