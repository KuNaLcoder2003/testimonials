import type React from "react";
import { useEffect, useRef, useState } from "react";
import { encodeEmbedPayload } from "../util";
import VideoPreview from "./VideoPreview";
import SyntaxHighlighter from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import { Play, Pause } from "lucide-react";


type DesignOption = "Left Aligned" | "Left Aligned-Bold" | "With Large Image" | "Simple Centered"

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
const designTabs: DesignOption[] = ["Left Aligned", "Left Aligned-Bold", "Simple Centered", "With Large Image"]
const EmbedVideoTestimonial: React.FC<{ testimonail: Testimonail, close: React.Dispatch<React.SetStateAction<boolean>> }> = ({ testimonail, close }) => {
    const [tab, setTab] = useState<DesignOption>("Left Aligned")
    const [dataEncoded, setDataEncoded] = useState<string>("")
    useEffect(() => {
        window.postMessage(
            JSON.stringify({
                type: "Video Embed",
                testimonail: testimonail,
                tab: tab
            }),
            "https://testimonials-smoky.vercel.app"
        )
        setDataEncoded(encodeEmbedPayload({
            testimonial: testimonail,
            tab: tab
        }))
    }, [tab])
    return (
        <div className="w-full p-4 space-y-6">
            <div className="w-full">
                <div className="flex items-center gap-2">
                    {
                        designTabs.map((item, idx) => {
                            return (
                                <div onClick={() => {
                                    setTab(item)
                                }} key={idx} className={`flex justify-center ${item == tab ? 'bg-blue-300 text-blue-600' : ""} cursor-pointer items-center gap-2 border border-gray-100 rounded-lg w-42 py-2 text-center hover:border-blue-200`}>
                                    <p className="text-center text-sm">{item}</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

            <VideoPreview testimonial={testimonail} />

            <div className="w-full mt-8">
                <p className="text-lg font-semibold">Embed Code</p>
                {/* <div className="p-4 w-full">
                    <CodeBlock
                        text={`<script type="text/javascript" src="https://testimonials-smoky.vercel.app/js/iframeResizer.min.js"></script>
<iframe id="testimonialto-embed-text--OK-${id}" src=${`https://testimonials-smoky.vercel.app/embed/${id}?data=${payload}`} frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#testimonialto-embed-text--Ok-${id}");</script>`}
                        showLineNumbers={true}
                        language="js"
                        theme={dracula}
                    />
                </div> */}
                <SyntaxHighlighter language="javascript" style={lucario}>
                    {`<script type="text/javascript" src="https://testimonials-smoky.vercel.app/js/iframeResizer.min.js"></script>
<iframe id="testimonialto-embed-text--OK-${testimonail.id}" src="${`https://testimonials-smoky.vercel.app/embed/v/${testimonail.id}?data=${dataEncoded}`}" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#testimonialto-embed-text--Ok-${testimonail.id}");</script>`}
                </SyntaxHighlighter>
            </div>
            <div className="w-full p-2 flex items-center justify-end gap-4">
                <button onClick={() => { close(false) }} className="py-2 px-4 font-light text-sm border border-stone-300 rounded-lg cursor-pointer">Cancel</button>
                <button onClick={async () => {
                    await window.navigator.clipboard.writeText(`<script type="text/javascript" src="https://testimonials-smoky.vercel.app/js/iframeResizer.min.js"></script>
<iframe id="testimonialto-embed-text--OK-${testimonail.id}" src="${`https://testimonials-smoky.vercel.app/embed/v/${testimonail.id}?data=${dataEncoded}`}" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#testimonialto-embed-text--Ok-${testimonail.id}");</script>`); toast.success("Copied to clip board")
                }} className="py-2 px-4 font-light text-sm border border-blue-600 bg-blue-600 text-white rounded-lg flex items-center gap-2 cursor-pointer"><Copy size={12} />  <p>Copy Code</p></button>
            </div>

        </div>
    )
}

export const LeftAlignedTestimonial = ({ item }: { item: Testimonail }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (!videoRef.current) return

        if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
        } else {
            videoRef.current.play()
            setIsPlaying(true)
        }
    }

    return (
        <div className="flex gap-4 p-5 rounded-xl bg-white shadow-sm max-w-3xl">
            <div className="relative group">
                <video
                    ref={videoRef}
                    src={item.video_url}
                    className="w-40 h-28 rounded-lg object-cover"
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                />

                {/* Play Button (only when paused) */}
                {!isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg"
                    >
                        <Play className="text-white" size={28} />
                    </button>
                )}

                {/* Pause Button (only on hover while playing) */}
                {isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30 rounded-lg"
                    >
                        <Pause className="text-white" size={28} />
                    </button>
                )}
            </div>

            <div className="flex flex-col justify-center">
                <p className="text-base font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.email}</p>
            </div>
        </div>
    )
}


export const LeftAlignedBoldTestimonial = ({ item }: { item: Testimonail }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (!videoRef.current) return
        isPlaying ? videoRef.current.pause() : videoRef.current.play()
    }

    return (
        <div className="flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white max-w-3xl">
            <div className="relative group">
                <video
                    ref={videoRef}
                    src={item.video_url}
                    className="w-44 h-32 rounded-xl object-cover border border-white/20"
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                />

                {!isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl"
                    >
                        <Play className="text-white" size={30} />
                    </button>
                )}

                {isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30 rounded-xl"
                    >
                        <Pause className="text-white" size={30} />
                    </button>
                )}
            </div>

            <div className="flex flex-col justify-center">
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-sm text-white/70">{item.email}</p>
            </div>
        </div>
    )
}


export const CenteredTestimonial = ({ item }: { item: Testimonail }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (!videoRef.current) return
        isPlaying ? videoRef.current.pause() : videoRef.current.play()
    }

    return (
        <div className="max-w-xl mx-auto text-center p-6 bg-white rounded-xl shadow-md">
            <div className="relative group mb-4">
                <video
                    ref={videoRef}
                    src={item.video_url}
                    className="w-full h-56 rounded-lg object-cover"
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                />

                {!isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg"
                    >
                        <Play className="text-white" size={36} />
                    </button>
                )}

                {isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30 rounded-lg"
                    >
                        <Pause className="text-white" size={36} />
                    </button>
                )}
            </div>

            <p className="text-lg font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">{item.email}</p>
        </div>
    )
}


export const LargeVideoTestimonial = ({ item }: { item: Testimonail }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (!videoRef.current) return
        isPlaying ? videoRef.current.pause() : videoRef.current.play()
    }

    return (
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-black shadow-2xl">
            <div className="relative group">
                <video
                    ref={videoRef}
                    src={item.video_url}
                    className="w-full h-[420px] object-cover"
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                />

                {!isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/40"
                    >
                        <Play className="text-white" size={48} />
                    </button>
                )}

                {isPlaying && (
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30"
                    >
                        <Pause className="text-white" size={48} />
                    </button>
                )}
            </div>

            <div className="p-6 bg-gradient-to-t from-black/80 to-transparent -mt-28">
                <p className="text-white text-xl font-semibold">{item.name}</p>
                <p className="text-white/70 text-sm">{item.email}</p>
            </div>
        </div>
    )
}



export default EmbedVideoTestimonial;