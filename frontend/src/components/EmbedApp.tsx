import { useEffect, useState } from "react"
import { EmbedRenderer } from "./EmbedRenderer"

// const DEFAULT_DESIGN = {
//     layout: "Left Aligned",
//     margin: 2,
//     borderWidth: 2
// }

function decodePayload(encoded: string) {
    try {
        return JSON.parse(atob(encoded))
    } catch {
        return null
    }
}

export default function EmbedApp() {
    const initial = (window as any).__EMBED_DATA__
    console.log(initial);

    const [design, setDesign] = useState<any>()
    const [testimonial, setTestimonial] = useState<any>()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        let encoded = params.get("data") as string;
        const payload = decodePayload(encoded)
        console.log(payload)
        setDesign(payload.design)
        setTestimonial(payload.testimonail)
    }, [])

    return <EmbedRenderer design={design} testimonial={testimonial} />
}
