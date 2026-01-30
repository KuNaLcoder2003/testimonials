import "iframe-resizer/js/iframeResizer.contentWindow";
import { useEffect, useState } from "react";
import { EmbedRenderer } from "./EmbedRenderer";
type DesignOption = "Left Aligned" | "Left Aligned-Bold" | "With Large Image" | "Simple Centered"
type EmbedDesign = {
    layout: DesignOption
    margin: number
    borderWidth: number
}
export default function Preview() {
    const [design, setDesign] = useState<EmbedDesign>(localStorage.getItem('design') ? JSON.parse(localStorage.getItem('design') as string) as EmbedDesign : {
        layout: "Left Aligned",
        margin: 2,
        borderWidth: 2
    });
    const [testimonial, setTestimonial] = useState<any>({
        name: "Kunal",
        message: "Yoooooo we are trying our best",
        avatar: ""
    });



    useEffect(() => {

        const handler = (e: MessageEvent) => {
            // console.log(e)
            if (e.origin !== "http://localhost:5173") return;
            console.log(JSON.parse(e.data))
            const recvd_data = JSON.parse(e.data)
            console.log(recvd_data.design.layout)
            setDesign(recvd_data.design)
            localStorage.setItem('design', JSON.stringify(recvd_data.design))
            setTestimonial(recvd_data.testimonial)

            // setDesign(e.data.design);
            // console.log('Hiiii')
            // setTestimonial(e.data.testimonial);
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [design]);

    return <EmbedRenderer design={design} testimonial={testimonial} />;
}