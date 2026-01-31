import { Cloud, LineSquiggle, Square, Text } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsBorder } from "react-icons/bs";
import "iframe-resizer/js/iframeResizer.contentWindow";
import Preview from "./Preview";
import { CodeBlock, dracula } from 'react-code-blocks';
// import Preview from "./Preview";


type EmbedDesign = {
    layout: DesignOption
    margin: number
    borderWidth: number
}

type styleTabs = "Design" | "Border" | "Shadow" | "Background" | "Text"
const tabs = [
    {
        id: 'Tab-1',
        name: 'Design' as styleTabs,
        icon: <LineSquiggle color="blue" size={14} />
    },
    {
        id: 'Tab-2',
        name: 'Border' as styleTabs,
        icon: <BsBorder color="blue" size={14} />
    },
    {
        id: 'Tab-3',
        name: 'Shadow' as styleTabs,
        icon: <Cloud color="blue" size={14} />
    },
    {
        id: 'Tab-4',
        name: 'Background' as styleTabs,
        icon: <Square color="blue" size={14} />
    },
    {
        id: 'Tab-5',
        name: 'Text' as styleTabs,
        icon: <Text color="blue" size={14} />
    }
]
type DesignOption = "Left Aligned" | "Left Aligned-Bold" | "With Large Image" | "Simple Centered"
const designTabs: DesignOption[] = ["Left Aligned", "Left Aligned-Bold", "Simple Centered", "With Large Image"]
const EmbedTestiMonial: React.FC<{ message: string, avatar: string, name: string, encrypted_link: string, id: string }> = ({ message, name, avatar, id, encrypted_link }) => {

    const [styleTab, setStyleTab] = useState<styleTabs>("Design")
    const [designOption, setDesignOption] = useState<DesignOption>("Left Aligned")

    // const iframeRef = useRef<HTMLIFrameElement>(null)
    const [design, setDesign] = useState<EmbedDesign>({
        layout: "Left Aligned",
        margin: 2,
        borderWidth: 2
    })
    useEffect(() => {
        window.postMessage(
            JSON.stringify({
                type: "APPLY_EMBED_DESIGN",
                link: encrypted_link,
                design,
                testimonial: {
                    name,
                    message,
                    avatar
                }
            }),
            `https://testimonials-smoky.vercel.app`
        )
    }, [design, name, message, avatar])

    return (
        <div className="w-full p-4 space-y-4">
            <div className="flex items-center gap-4">
                {
                    tabs.map((item) => {
                        return (
                            <div onClick={() => setStyleTab(item.name)} className={`w-36 h-20 rounded-lg flex flex-col items-center text-blue-600 justify-center cursor-pointer ${styleTab == item.name ? "border-2 border-blue-500" : "border border-gray-100"}`}>
                                <div>{item.icon}</div>
                                <div>{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="p-2 mt-4">
                {
                    styleTab == "Design" && <DesignTab setTab={setDesignOption} designTabs={designTabs} tab={designOption} value={design.margin} setDesign={setDesign} />
                }
                {
                    styleTab == "Background" && <BackgroundTab />
                }
                {
                    styleTab == "Border" && <BorderTab />
                }
                {
                    styleTab == "Shadow" && <ShadowTab />
                }
                {
                    styleTab == "Text" && <TextTab />
                }
            </div>


            {/* Preview of embed */}
            {/* <div className="w-[90%] mx-auto">
                <EmbedRenderer design={design} testimonial={{ name: name, message: message, avatar: avatar }} />
            </div> */}
            {/* <iframe
                ref={iframeRef}
                src="http://localhost:5173/t/9161654e-79c8-4b0b-ab6b-647c5a213966"
                className="w-full h-[20px] rounded-lg border"
                title="Embed Preview"
            /> */}
            <p className="text-md text-gray-700 font-light">Live Preview</p>
            <Preview />
            <div className="w-full mt-8">
                <p className="text-lg font-semibold">Embed Code</p>
                <div className="p-4 w-full">
                    <CodeBlock
                        text={`<script type="text/javascript" src="https://testimonials-smoky.vercel.app/js/iframeResizer.min.js"></script>
<iframe id="testimonialto-embed-text--OK-${id}" src=${`${`https://testimonials-smoky.vercel.app/t/${id}`}`} frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#testimonialto-embed-text--Ok-${id}");</script>`}
                        showLineNumbers={true}
                        language="js"
                        theme={dracula}
                    />
                </div>
            </div>
        </div>
    )
}

export const LeftAlignedDesign: React.FC<{ name: string, message: string, avatar: string, design?: EmbedDesign }> = ({ message, name, avatar, design }) => {
    return (
        <div style={{
            backgroundColor: "teal",
            padding: `${design?.margin}rem`
        }} className={`w-full rounded-lg flex items-center justify-center p-2`}>
            <div className="w-full flex flex-col items-baseline p-4 bg-white h-64 rounded-lg gap-10">
                <p>{message}</p>
                <div className="flex items-center gap-4">
                    <img src={avatar} className="w-8 h-8 rounded-full" />
                    <p className="text-md font-thin text-gray-400">{name}</p>
                </div>
            </div>
        </div>
    )
}

export const LargeImageDesign: React.FC<{ name: string, message: string, avatar: string, design: EmbedDesign }> = ({ message, name, avatar, design }) => {
    return (
        <div style={{
            backgroundColor: "teal",
            padding: `${design.margin}rem`
        }} className={`w-full rounded-lg flex items-center justify-center p-2`}>
            <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                <div className="flex flex-col items-baseline gap-4">
                    <svg className="w-auto h-9" viewBox="0 0 43 35" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M42.28 34.3H26.04C24.4533 29.1667 23.66 23.8467 23.66 18.34C23.66 12.74 25.1067 8.30666 28 5.03999C30.9867 1.68 35.3733 0 41.16 0V7.84C36.4933 7.84 34.16 10.6867 34.16 16.38V19.04H42.28V34.3ZM18.62 34.3H2.38C0.793333 29.1667 0 23.8467 0 18.34C0 12.74 1.44667 8.30666 4.34 5.03999C7.32667 1.68 11.7133 0 17.5 0V7.84C12.8333 7.84 10.5 10.6867 10.5 16.38V19.04H18.62V34.3Z"></path></svg>
                    <p className="text-xl font-light w-lg">{message}</p>
                </div>
                <div className="relative h-84 w-96">
                    <div className="h-full bg-black/10 absolute inset-0 z-[99] rounded-lg" />
                    <img src={avatar} className="rounded-lg h-full w-full" />
                    <p className="absolute text-white text-xl bottom-5 p-6 font-bold z-[99999]">{name}</p>
                </div>
            </div>
        </div>
    )
}


const DesignTab: React.FC<{ designTabs: DesignOption[], setTab: React.Dispatch<React.SetStateAction<DesignOption>>, tab: DesignOption, value: number, setDesign: React.Dispatch<React.SetStateAction<EmbedDesign>> }> = ({ designTabs, setTab, tab, value, setDesign }) => {

    return (
        <div className="w-full">
            <div className="flex items-center gap-2">
                {
                    designTabs.map((item, idx) => {
                        return (
                            <div onClick={() => {
                                setTab(item)
                                setDesign(d => ({ ...d, layout: item }))
                            }} key={idx} className={`flex justify-center ${item == tab ? 'bg-blue-300 text-blue-600' : ""} cursor-pointer items-center gap-2 border border-gray-100 rounded-lg w-42 py-2 text-center hover:border-blue-200`}>
                                <p className="text-center text-sm">{item}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-full mt-6">
                <div className="w-full space-y-3">
                    {/* Label */}
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className="text-lg font-thin text-gray-400">Margin</span>
                        <span className="font-semibold">{value}</span>
                    </div>

                    {/* Slider Wrapper */}
                    <div className="relative w-full">
                        {/* Track */}
                        <div className="h-2 w-full rounded-full bg-gray-200" />

                        {/* Filled Track */}
                        <div
                            className="absolute top-0 left-0 h-2 rounded-full bg-red"
                            style={{ width: `${(value / 6) * 100}%` }}
                        />

                        {/* Input */}
                        <input
                            type="range"
                            min={1}
                            max={6}
                            value={value}
                            onChange={(e) => setDesign(d => ({ ...d, margin: Number(e.target.value) }))}
                            className="absolute top-[-6px] w-full cursor-pointer appearance-none bg-transparent
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-black
            [&::-webkit-slider-thumb]:shadow
            [&::-webkit-slider-thumb]:cursor-pointer

            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-black
            [&::-moz-range-thumb]:border-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const BorderTab: React.FC = () => {
    return (
        <div>
            BorderTab
        </div>
    )
}

const ShadowTab: React.FC = () => {
    return (
        <div>
            Shadow Tab
        </div>
    )
}

const BackgroundTab: React.FC = () => {
    return (
        <div>
            Background Tab
        </div>
    )
}

const TextTab: React.FC = () => {
    return (
        <div>
            Text Tab
        </div>
    )
}

export default EmbedTestiMonial;