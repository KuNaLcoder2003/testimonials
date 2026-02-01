import "iframe-resizer/js/iframeResizer.contentWindow";
import { useEffect, useState } from "react";
import { EmbedRenderer } from "./EmbedRenderer";
// import { useLocation } from "react-router-dom";





type DesignOption = "Left Aligned" | "Left Aligned-Bold" | "With Large Image" | "Simple Centered"
type EmbedDesign = {
    layout: DesignOption
    margin: number
    borderWidth: number
}
export default function Preview() {
    const channel = new BroadcastChannel("embed-preview")
    const [design, setDesign] = useState<EmbedDesign>({
        layout: "Left Aligned",
        margin: 2,
        borderWidth: 2
    });
    // const path = useLocation();
    const [testimonial, setTestimonial] = useState<any>();




    useEffect(() => {
        const handler = (e: MessageEvent) => {
            channel.onmessage = (event) => {
                console.log('Boradastinf channel : ', event.data)
            }

            if (e.origin !== "https://testimonials-smoky.vercel.app") return;
            console.log(JSON.parse(e.data))
            const recvd_data = JSON.parse(e.data)
            console.log(recvd_data.design.layout)
            setDesign(recvd_data.design)
            setTestimonial(recvd_data.testimonial)
            localStorage.setItem('design', JSON.stringify(recvd_data.design))
            localStorage.setItem('testimonial', JSON.stringify(recvd_data.testimonial))

        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [design]);

    return <EmbedRenderer design={design} testimonial={testimonial} />;
}