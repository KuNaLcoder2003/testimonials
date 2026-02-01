import { useState } from "react"
import { EmbedRenderer } from "./EmbedRenderer"

const DEFAULT_DESIGN = {
    layout: "Left Aligned",
    margin: 2,
    borderWidth: 2
}

export default function EmbedApp() {
    const initial = (window as any).__EMBED_DATA__

    const [design] = useState(initial?.design ?? DEFAULT_DESIGN)
    const [testimonial] = useState(
        initial?.testimonial ?? {
            name: "",
            message: "",
            avatar: ""
        }
    )

    return <EmbedRenderer design={design} testimonial={testimonial} />
}
