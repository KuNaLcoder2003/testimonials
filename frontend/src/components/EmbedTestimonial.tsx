import { Cloud, Copy, LineSquiggle, Minus, Plus, Square, Text } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsBorder } from "react-icons/bs";
import "iframe-resizer/js/iframeResizer.contentWindow";
import Preview from "./Preview";
import { encodeEmbedPayload } from "../util";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast, ToastContainer } from "react-toastify";
// import Preview from "./Preview";


type EmbedDesign = {
    layout: DesignOption
    margin: number
    borderWidth: number,
    borderRadius?: string,
    borderColor?: string,
    textColor?: string,
    font?: string,
    textSize?: string
    shadowType?: string,
    shadowMultiplier?: string,
    shadowColor?: string,
    background?: string,
    cardBackground?: string,
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
const EmbedTestiMonial: React.FC<{ message: string, avatar: string, name: string, encrypted_link: string, id: string, close: React.Dispatch<React.SetStateAction<boolean>> }> = ({ message, name, avatar, id, encrypted_link, close }) => {
    const channel = new BroadcastChannel("embed-preview")
    const [styleTab, setStyleTab] = useState<styleTabs>("Design")
    const [designOption, setDesignOption] = useState<DesignOption>("Left Aligned")
    const [payload, setPayload] = useState<string>('')

    // const iframeRef = useRef<HTMLIFrameElement>(null)
    const [design, setDesign] = useState<EmbedDesign>({
        layout: "Left Aligned",
        margin: 2,
        borderWidth: 2
    })
    useEffect(() => {
        channel.postMessage({
            design,
            testimonial: {
                name,
                avatar,
                message
            }
        })

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
        setPayload(encodeEmbedPayload({
            design,
            testimonial: { name, message, avatar }
        }))
    }, [design, name, message, avatar])

    return (
        <div className="w-full p-4 space-y-6">
            <div className="flex flex-wrap gap-4">
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
                    styleTab == "Background" && <BackgroundTab setDesign={setDesign} />
                }
                {
                    styleTab == "Border" && <BorderTab design={design} setDesign={setDesign} />
                }
                {
                    styleTab == "Shadow" && <ShadowTab setDesign={setDesign} />
                }
                {
                    styleTab == "Text" && <TextTab setDesign={setDesign} />
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
<iframe id="testimonialto-embed-text--OK-${id}" src="${`https://testimonials-smoky.vercel.app/embed/${id}?data=${payload}`}" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#testimonialto-embed-text--Ok-${id}");</script>`}
                </SyntaxHighlighter>
            </div>
            <div className="w-full p-2 flex items-center justify-end gap-4">
                <button onClick={() => { close(false) }} className="py-2 px-4 font-light text-sm border border-stone-300 rounded-lg cursor-pointer">Cancel</button>
                <button onClick={async () => {
                    await window.navigator.clipboard.writeText(`<script type="text/javascript" src="https://testimonials-smoky.vercel.app/js/iframeResizer.min.js"></script>
<iframe id="testimonialto-embed-text--OK-${id}" src="${`https://testimonials-smoky.vercel.app/embed/${id}?data=${payload}`}" frameborder="0" scrolling="no" width="100%"></iframe>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#testimonialto-embed-text--Ok-${id}");</script>`); toast.success("Copied to clip board")
                }} className="py-2 px-4 font-light text-sm border border-blue-600 bg-blue-600 text-white rounded-lg flex items-center gap-2 cursor-pointer"><Copy size={12} />  <p>Copy Code</p></button>
            </div>
        </div>
    )
}




const DesignTab: React.FC<{ designTabs: DesignOption[], setTab: React.Dispatch<React.SetStateAction<DesignOption>>, tab: DesignOption, value: number, setDesign: React.Dispatch<React.SetStateAction<EmbedDesign>> }> = ({ designTabs, setTab, tab, value, setDesign }) => {

    return (
        <div className="w-full">
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar
                closeOnClick
                pauseOnHover
            />
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

const BorderTab: React.FC<{ design: EmbedDesign, setDesign: React.Dispatch<React.SetStateAction<EmbedDesign>> }> = ({ design, setDesign }) => {

    const borderRadius = [
        {
            id: 'Br-1',
            value: "None",
        },
        {
            id: 'Br-2',
            value: "Small",
        },
        {
            id: 'Br-3',
            value: "Medium",
        },
        {
            id: 'Br-4',
            value: "Large",
        },
    ]

    const borderColors = [
        { id: "BorderColor-1", hex: "#FF6B6B", name: "Soft Red" },
        { id: "BorderColor-2", hex: "#F06595", name: "Pink Rose" },
        { id: "BorderColor-3", hex: "#845EF7", name: "Indigo Violet" },
        { id: "BorderColor-4", hex: "#5C7CFA", name: "Royal Blue" },
        { id: "BorderColor-5", hex: "#339AF0", name: "Sky Blue" },
        { id: "BorderColor-6", hex: "#22B8CF", name: "Cyan" },
        { id: "BorderColor-7", hex: "#20C997", name: "Mint Green" },
        { id: "BorderColor-8", hex: "#51CF66", name: "Fresh Green" },
        { id: "BorderColor-9", hex: "#FCC419", name: "Warm Yellow" },
        { id: "BorderColor-10", hex: "#FF922B", name: "Soft Orange" }
    ];



    return (
        <div className="w-full flex flex-col items-baseline gap-4 h-auto">
            <div className="w-full flex flex-col items-baseline gap-1">
                <p className="text-lg font-semibold">Boder Radius</p>
                <select onChange={(e) => setDesign(d => ({ ...d, borderRadius: e.target.value }))} className="w-full border border-stone-200 p-2" >
                    <option>Select Border Radius</option>
                    {
                        borderRadius.map(item => {
                            return (
                                <option key={item.id} value={item.value.toLowerCase()}>{item.value}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="w-full flex items-baseline justify-between">
                <div className="flex flex-col items-baseline w-full gap-2">
                    <h3 className="text-lg font-semibold">Border color</h3>
                    <div className="flex items-center w-[50%]">
                        <div className="p-4 flex items-center gap-4 flex-wrap w-[100%] shadow-lg">
                            {
                                borderColors.map(item => {
                                    return (
                                        <div onClick={() => {
                                            setDesign(d => ({ ...d, borderColor: item.hex }))
                                        }} style={{
                                            backgroundColor: item.hex
                                        }} id={`${item.name}_${item.id}`} className={`w-8 h-8 rounded-lg cursor-pointer`}>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-baseline w-[50%]">
                    <h3 className="text-lg font-semibold">Border thickness</h3>
                    <div className="w-full flex item-center justify-between p-2">
                        <div className="cursor-pointer flex items-center justify-center p-2 bg-blue-600 rounded-lg">
                            <Minus color="white" className="cursor-pointer" size={14} onClick={() => setDesign(d => ({ ...d, borderWidth: d.borderWidth <= 0 ? 0 : d.borderWidth - 1 }))} />
                        </div>
                        <p className="text-sm p-2">{design.borderWidth} (px)</p>
                        <div className="cursor-pointer flex items-center justify-center p-2 bg-blue-600 rounded-lg">
                            <Plus onClick={() => {
                                setDesign(d => ({ ...d, borderWidth: d.borderWidth + 1 }))
                            }} color="white" size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ShadowTab: React.FC<{ setDesign: React.Dispatch<React.SetStateAction<EmbedDesign>> }> = ({ setDesign }) => {
    const shadowTypes = [
        {
            id: "ST-1",
            label: "None",
            value: "none"
        },
        {
            id: "ST-2",
            label: "Standard",
            value: "0 4px 12px rgba(0, 0, 0, 0.15)"
        },
        {
            id: "ST-3",
            label: "Spotlight",
            value: "0 10px 30px rgba(0, 0, 0, 0.25)"
        }
    ];

    const shadowSizes = [
        {
            id: "SS-1",
            label: "Small",
            multiplier: 0.6
        },
        {
            id: "SS-2",
            label: "Medium",
            multiplier: 1
        },
        {
            id: "SS-3",
            label: "Large",
            multiplier: 1.4
        }
    ];

    const shadowColors = [
        { id: "BorderColor-1", hex: "#FF6B6B", name: "Soft Red" },
        { id: "BorderColor-2", hex: "#F06595", name: "Pink Rose" },
        { id: "BorderColor-3", hex: "#CC5DE8", name: "Orchid Purple" },
        { id: "BorderColor-4", hex: "#845EF7", name: "Indigo Violet" },
        { id: "BorderColor-5", hex: "#5C7CFA", name: "Royal Blue" },
        { id: "BorderColor-6", hex: "#339AF0", name: "Sky Blue" },
        { id: "BorderColor-7", hex: "#22B8CF", name: "Cyan" },
        { id: "BorderColor-8", hex: "#20C997", name: "Mint Green" },
        { id: "BorderColor-9", hex: "#51CF66", name: "Fresh Green" },
        { id: "BorderColor-10", hex: "#94D82D", name: "Lime Green" },

        { id: "BorderColor-11", hex: "#FFD43B", name: "Golden Yellow" },
        { id: "BorderColor-12", hex: "#FCC419", name: "Warm Yellow" },
        { id: "BorderColor-13", hex: "#FF922B", name: "Soft Orange" },
        { id: "BorderColor-14", hex: "#FF6F00", name: "Deep Orange" },
        { id: "BorderColor-15", hex: "#E8590C", name: "Burnt Orange" },

        { id: "BorderColor-16", hex: "#ADB5BD", name: "Cool Gray" },
        { id: "BorderColor-17", hex: "#868E96", name: "Steel Gray" },
        { id: "BorderColor-18", hex: "#495057", name: "Dark Slate" },
        { id: "BorderColor-19", hex: "#343A40", name: "Charcoal" },
        { id: "BorderColor-20", hex: "#212529", name: "Jet Black" }
    ];

    return (
        <div className="w-full flex flex-col items-baseline gap-8 h-auto">
            <div className="w-full flex flex-col items-baseline gap-1">
                <p className="text-lg font-semibold">Shadow Type</p>
                <select onChange={(e) => {
                    setDesign(d => ({ ...d, shadowType: e.target.value }))
                }} className="w-full border border-stone-200 p-2" >
                    <option>Select Shadow Type</option>
                    {
                        shadowTypes.map(item => {
                            return (
                                <option key={item.id} value={item.value.toLowerCase()}>{item.value}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="w-full flex flex-col items-baseline gap-1">
                <p className="text-lg font-semibold">Shadow Size</p>
                <select onChange={(e) => {
                    setDesign(d => ({ ...d, shadowMultiplier: e.target.value }))
                }} className="w-full border border-stone-200 p-2" >
                    <option>Select Shadow Size</option>
                    {
                        shadowSizes.map(item => {
                            return (
                                <option key={item.id} value={item.multiplier}>{item.label}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="flex flex-col items-baseline w-[50%]">
                <h3 className="text-lg font-semibold">Shadow Color</h3>
                <div className="p-4 flex items-center gap-4 flex-wrap w-[100%] shadow-lg">
                    {
                        shadowColors.map(item => {
                            return (
                                <div onClick={() => {
                                    setDesign(d => ({ ...d, shadowColor: item.hex }))
                                }} style={{
                                    backgroundColor: item.hex
                                }} id={`${item.name}_${item.id}`} className={`w-8 h-8 rounded-lg cursor-pointer`}>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const BackgroundTab: React.FC<{ setDesign: React.Dispatch<React.SetStateAction<EmbedDesign>> }> = ({ setDesign }) => {
    const backgroundColors = [
        { id: "BorderColor-0", type: "color", name: "White", hex: "#fff" },
        { id: "BorderColor-1", type: "color", name: "Soft Red", hex: "#FF6B6B" },
        { id: "BorderColor-2", type: "color", name: "Pink Rose", hex: "#F06595" },
        { id: "BorderColor-3", type: "color", name: "Purple", hex: "#CC5DE8" },
        { id: "BorderColor-4", type: "color", name: "Indigo", hex: "#845EF7" },
        { id: "BorderColor-5", type: "color", name: "Royal Blue", hex: "#5C7CFA" },
        { id: "BorderColor-6", type: "color", name: "Sky Blue", hex: "#339AF0" },
        { id: "BorderColor-7", type: "color", name: "Cyan", hex: "#22B8CF" },
        { id: "BorderColor-8", type: "color", name: "Mint Green", hex: "#20C997" },
        { id: "BorderColor-9", type: "color", name: "Fresh Green", hex: "#51CF66" },
        { id: "BorderColor-10", type: "color", name: "Golden Yellow", hex: "#FFD43B" },
    ]
    const backgroundGradients = [
        {
            id: "BorderGradient-1",
            type: "gradient",
            name: "Neon Sunset",
            gradient: "linear-gradient(135deg, #FF0080, #FF8C00, #FFD700)"
        },
        {
            id: "BorderGradient-2",
            type: "gradient",
            name: "Electric Violet",
            gradient: "linear-gradient(135deg, #7F00FF, #E100FF)"
        },
        {
            id: "BorderGradient-3",
            type: "gradient",
            name: "Cyber Blue",
            gradient: "linear-gradient(135deg, #00C6FF, #0072FF)"
        },
        {
            id: "BorderGradient-4",
            type: "gradient",
            name: "Aurora Green",
            gradient: "linear-gradient(135deg, #00F5A0, #00D9F5)"
        },
        {
            id: "BorderGradient-5",
            type: "gradient",
            name: "Inferno",
            gradient: "linear-gradient(135deg, #FF512F, #DD2476)"
        },
        {
            id: "BorderGradient-6",
            type: "gradient",
            name: "Cosmic Purple",
            gradient: "linear-gradient(135deg, #41295A, #2F0743)"
        },
        {
            id: "BorderGradient-7",
            type: "gradient",
            name: "Tropical Punch",
            gradient: "linear-gradient(135deg, #F857A6, #FF5858)"
        },
        {
            id: "BorderGradient-8",
            type: "gradient",
            name: "Ocean Depth",
            gradient: "linear-gradient(135deg, #1CB5E0, #000851)"
        },
        {
            id: "BorderGradient-9",
            type: "gradient",
            name: "Lime Shock",
            gradient: "linear-gradient(135deg, #A8FF78, #78FFD6)"
        },
        {
            id: "BorderGradient-10",
            type: "gradient",
            name: "Midnight Neon",
            gradient: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)"
        }
    ];

    return (
        <div className="w-full flex items-baseline gap-8 h-auto">
            <div className="flex flex-col items-baseline w-[25%]">
                <h3 className="text-lg font-semibold">Background</h3>
                <div className="p-4 flex items-center gap-4 flex-wrap w-[100%] shadow-lg">
                    {
                        backgroundColors.map(item => {
                            return (
                                <div onClick={() => setDesign(d => ({ ...d, background: item.hex }))} style={{
                                    backgroundColor: item.hex
                                }} id={`${item.name}_${item.id}`} className={`w-8 h-8 rounded-lg cursor-pointer`}>
                                </div>
                            )
                        })
                    }

                    {
                        backgroundGradients.map(item => {
                            return (
                                <div onClick={() => setDesign(d => ({ ...d, background: item.gradient }))} style={{
                                    background: item.gradient
                                }} id={`${item.name}_${item.id}`} className={`w-8 h-8 rounded-lg cursor-pointer`}>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
            <div className="flex flex-col items-baseline w-[25%]">
                <h3 className="text-lg font-semibold">Card Background</h3>
                <div className="p-4 flex items-center gap-4 flex-wrap w-[100%] shadow-lg">
                    {
                        backgroundColors.map(item => {
                            return (
                                <div onClick={() => setDesign(d => ({ ...d, cardBackground: item.hex }))} style={{
                                    backgroundColor: item.hex
                                }} id={`${item.name}_${item.id}`} className={`w-8 h-8 rounded-lg cursor-pointer`}>
                                </div>
                            )
                        })
                    }

                    {
                        backgroundGradients.map(item => {
                            return (
                                <div onClick={() => setDesign(d => ({ ...d, cardBackground: item.gradient }))} style={{
                                    background: item.gradient
                                }} id={`${item.name}_${item.id}`} className={`w-8 h-8 rounded-lg cursor-pointer`}>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </div>
    )
}

const TextTab: React.FC<{ setDesign: React.Dispatch<React.SetStateAction<EmbedDesign>> }> = ({ setDesign }) => {
    const colors = [
        { id: "BorderColor-1", type: "color", name: "Soft Red", hex: "#FF6B6B" },
        { id: "BorderColor-2", type: "color", name: "Pink Rose", hex: "#F06595" },
        { id: "BorderColor-3", type: "color", name: "Purple", hex: "#CC5DE8" },
        { id: "BorderColor-4", type: "color", name: "Indigo", hex: "#845EF7" },
        { id: "BorderColor-5", type: "color", name: "Royal Blue", hex: "#5C7CFA" },
        { id: "BorderColor-6", type: "color", name: "Sky Blue", hex: "#339AF0" },
        { id: "BorderColor-7", type: "color", name: "Cyan", hex: "#22B8CF" },
        { id: "BorderColor-8", type: "color", name: "Mint Green", hex: "#20C997" },
        { id: "BorderColor-9", type: "color", name: "Fresh Green", hex: "#51CF66" },
        { id: "BorderColor-10", type: "color", name: "Golden Yellow", hex: "#FFD43B" },
    ]
    const fontFamilies = [
        {
            id: "FontFamily-1",
            label: "Inter",
            value: "Inter, system-ui, sans-serif"
        },
        {
            id: "FontFamily-2",
            label: "Poppins",
            value: "Poppins, sans-serif"
        },
        {
            id: "FontFamily-3",
            label: "Roboto",
            value: "Roboto, sans-serif"
        },
        {
            id: "FontFamily-4",
            label: "Montserrat",
            value: "Montserrat, sans-serif"
        },
        {
            id: "FontFamily-5",
            label: "Playfair Display",
            value: "'Playfair Display', serif"
        },
        {
            id: "FontFamily-6",
            label: "Merriweather",
            value: "Merriweather, serif"
        },
        {
            id: "FontFamily-7",
            label: "JetBrains Mono",
            value: "'JetBrains Mono', monospace"
        },
        {
            id: "FontFamily-8",
            label: "Fira Code",
            value: "'Fira Code', monospace"
        }
    ];

    const fontSizes = [
        { id: "FontSize-1", label: "XS", value: "0.75rem" },
        { id: "FontSize-2", label: "SM", value: "0.875rem" },
        { id: "FontSize-3", label: "Base", value: "1rem" },
        { id: "FontSize-4", label: "MD", value: "1.125rem" },
        { id: "FontSize-5", label: "LG", value: "1.25rem" },
        { id: "FontSize-6", label: "XL", value: "1.5rem" },
        { id: "FontSize-7", label: "2XL", value: "1.875rem" },
        { id: "FontSize-8", label: "3XL", value: "2.25rem" }
    ];
    return (
        <div className="w-full p-4 flex flex-col items-baseline gap-8">
            <div className="w-full flex items-baseline gap-16 h-auto">
                <div className="flex flex-col items-baseline w-[35%]">
                    <h3 className="text-lg font-semibold">Text Color</h3>
                    <div className="p-4 flex items-center gap-4 flex-wrap w-[100%] shadow-lg">
                        {
                            colors.map(item => {
                                return (
                                    <div onClick={() => setDesign(d => ({ ...d, textColor: item.hex }))} style={{
                                        backgroundColor: item.hex
                                    }} id={`${item.name}_${item.id}`} className={`w-8 h-8 rounded-lg cursor-pointer`}>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>

                <div className="flex flex-col items-baseline w-[35%]">
                    <h3 className="text-lg font-semibold">Link Color</h3>
                    <div className="p-4 flex items-center gap-4 flex-wrap w-[100%] shadow-lg">
                        {
                            colors.map(item => {
                                return (
                                    <div style={{
                                        backgroundColor: item.hex
                                    }} id={`${item.name}_${item.id}`} className={`w-8 h-8 rounded-lg cursor-pointer`}>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </div>

            <div className="w-full">
                <h3 className="text-lg font-semibold">Font Family</h3>
                <select onChange={(e) => setDesign(d => ({ ...d, font: e.target.value }))} className="p-2 w-full rounded-lg border border-gray-200">
                    <option>Select Font</option>
                    {
                        fontFamilies.map((item) => {
                            return (
                                <option value={item.value}>{item.label}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="w-full">
                <h3 className="text-lg font-semibold">Font Size</h3>
                <select onChange={(e) => setDesign(d => ({ ...d, textSize: e.target.value }))} className="p-2 w-full rounded-lg border border-gray-200">
                    <option>Select Font Size</option>
                    {
                        fontSizes.map((item) => {
                            return (
                                <option value={item.value}>{item.label}</option>
                            )
                        })
                    }
                </select>
            </div>

        </div>
    )
}

export default EmbedTestiMonial;

export const LeftAlignedDesign: React.FC<{ name: string, message: string, avatar: string, design?: EmbedDesign }> = ({ message, name, avatar, design }) => {
    return (
        <div style={{
            background: `${design?.background ? design.background : "teal"}`,
            padding: `${design?.margin}rem`,
            borderWidth: `${design?.borderWidth}px`,
            borderRadius: `${design?.borderRadius}`,
            borderColor: `${design?.borderColor}`,
        }} className={`w-full rounded-lg flex items-center justify-center p-2`}>
            <div style={{
                background: `${design?.cardBackground ? design.cardBackground : 'white'}`
            }} className="w-full flex flex-col items-baseline p-4 bg-white h-64 rounded-lg gap-10">
                <p style={{
                    font: `${design?.font}`,
                    fontSize: `${design?.textSize}`,
                    color: `${design?.textColor}`
                }}>{message}</p>
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
            background: `${design?.background ? design.background : "teal"}`,
            padding: `${design?.margin}rem`,
            borderWidth: `${design?.borderWidth}px`,
            borderRadius: `${design?.borderRadius}`,
            borderColor: `${design?.borderColor}`,
        }} className={`w-full rounded-lg flex items-center justify-center p-2`}>
            <div style={{
                background: `${design?.cardBackground ? design.cardBackground : 'white'}`
            }} className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
                <div className="flex flex-col items-baseline gap-4">
                    <svg className="w-auto h-9" viewBox="0 0 43 35" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M42.28 34.3H26.04C24.4533 29.1667 23.66 23.8467 23.66 18.34C23.66 12.74 25.1067 8.30666 28 5.03999C30.9867 1.68 35.3733 0 41.16 0V7.84C36.4933 7.84 34.16 10.6867 34.16 16.38V19.04H42.28V34.3ZM18.62 34.3H2.38C0.793333 29.1667 0 23.8467 0 18.34C0 12.74 1.44667 8.30666 4.34 5.03999C7.32667 1.68 11.7133 0 17.5 0V7.84C12.8333 7.84 10.5 10.6867 10.5 16.38V19.04H18.62V34.3Z"></path></svg>
                    <p style={{
                        font: `${design?.font}`,
                        color: `${design?.textColor}`
                    }} className="text-xl font-light w-xl">{message}</p>
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