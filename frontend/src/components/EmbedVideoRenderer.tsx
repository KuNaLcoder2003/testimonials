import type React from "react";
import { CenteredTestimonial, LargeVideoTestimonial, LeftAlignedBoldTestimonial, LeftAlignedTestimonial } from "./EmbedVideoTestimonial";
type Testimonail = {
    id: string
    space_id: string
    type: string
    avatar: string
    message: string
    email: string
    name: string
    title: string
    company: string
    social_link: string
    created_at: Date
    updated_at: Date
    video_url?: string
}
type DesignOption = "Left Aligned" | "Left Aligned-Bold" | "Simple Centered" | "With Large Image"
const EmbedVideoRenderer: React.FC<{ testimonial: Testimonail, tab: DesignOption }> = ({ testimonial, tab }) => {
    switch (tab) {

        case "Left Aligned":

            return (
                <LeftAlignedTestimonial item={testimonial} />
            )

        case "With Large Image":

            return (
                <LargeVideoTestimonial item={testimonial} />
            )
        case "Left Aligned-Bold":
            return (
                <LeftAlignedBoldTestimonial item={testimonial} />
            )
        case "Simple Centered":
            return (
                <CenteredTestimonial item={testimonial} />
            )
    }
}

export default EmbedVideoRenderer;