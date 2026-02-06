import type React from "react";
import { useEffect, useState } from "react";
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
const VideoPreview: React.FC<{ testimonial: Testimonail }> = ({ testimonial }) => {
    const [tab, setTab] = useState<DesignOption>(localStorage.getItem('tab') ? JSON.parse(localStorage.getItem('tab') as DesignOption) : 'Left Aligned')
    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if (e.origin != "https://testimonials-smoky.vercel.app") {
                return
            }
            console.log(e.data)
            const data = e.data;
            const parsedData = JSON.parse(data)
            const tab = parsedData.tab as DesignOption
            setTab(tab)
            localStorage.setItem('tab', JSON.stringify(tab))
        }
        window.addEventListener("message", handler);
        () => window.removeEventListener('message', handler)
    }, [])
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

export default VideoPreview;