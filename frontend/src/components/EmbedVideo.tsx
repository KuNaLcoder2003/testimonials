import type React from "react";
import { useState } from "react";
import EmbedVideoRenderer from "./EmbedVideoRenderer";

function decodePayload(encoded: string) {
    try {
        return JSON.parse(atob(encoded))
    } catch {
        return null
    }
}

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
const EmbedVideo: React.FC = () => {
    const params = new URLSearchParams(window.location.search)
    let encoded = params.get("data") as string;
    const payload = decodePayload(encoded)
    const [tab] = useState<DesignOption>(payload.tab as DesignOption)
    const [testimonail] = useState<Testimonail>(payload.testimonail as Testimonail)
    return (
        <EmbedVideoRenderer tab={tab} testimonial={testimonail} />
    )
}

export default EmbedVideo