import { LargeImageDesign, LeftAlignedDesign } from "./EmbedTestimonial"
type DesignOption = "Left Aligned" | "Left Aligned-Bold" | "With Large Image" | "Simple Centered"
type EmbedDesign = {
    layout: DesignOption
    margin: number
    borderWidth: number
}

export const EmbedRenderer = ({
    testimonial,
    design
}: {
    testimonial: { name: string; message: string; avatar: string }
    design: EmbedDesign
}) => {
    switch (design.layout) {
        case "Left Aligned":
            return (
                <LeftAlignedDesign
                    {...testimonial}
                    design={design}
                />
            )

        case "With Large Image":
            return (
                <LargeImageDesign
                    {...testimonial}
                    design={design}
                />
            )

        default:
            return null
    }
}
