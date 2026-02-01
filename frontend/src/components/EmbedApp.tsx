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
    const params = new URLSearchParams(window.location.search)
    let encoded = params.get("data") as string;
    const payload = decodePayload(encoded)
    console.log('Decoded is ', payload)


    const [design, setDesign] = useState<any>(payload.design)
    const [testimonial, setTestimonial] = useState<any>(payload.testimonial)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        let encoded = params.get("data") as string;
        const payload = decodePayload(encoded)
        console.log('Decoded is ', payload)
        setDesign(payload.design)
        setTestimonial(payload.testimonail)
    }, [])

    return <EmbedRenderer design={design} testimonial={testimonial} />
}
