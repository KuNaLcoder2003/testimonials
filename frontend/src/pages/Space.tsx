import type React from "react"
import Navbar from "../components/Navbar"
import { useEffect, useRef, useState, type JSX, type ReactNode } from "react"
import {
    ArrowDown,
    ArrowUp,
    CodeXml,
    Download,
    Folder,
    GiftIcon,
    Heart,
    Image,
    Link,
    Pencil,
    ShareIcon,
    Star,
    TagIcon,
    Video,
    Play,
    Pause,
    X
} from "lucide-react"
import { BsPeople, BsThreeDots } from "react-icons/bs"
import { HiHeart } from "react-icons/hi"
import { FaDownLong } from "react-icons/fa6"
import { useLocation } from "react-router-dom"
import { TbBucketOff } from "react-icons/tb"
import { ImEmbed } from "react-icons/im"
import { ToastContainer, toast } from "react-toastify"
import EmbedTestiMonial from "../components/EmbedTestimonial"

type Testimonail = {
    encrypted_link: string
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

type Action = {
    id: string
    icon: JSX.Element
    name: string
    subActions?: {
        id: string
        name: string
        icon: JSX.Element
        action?: () => any
    }[]
}

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`

const Space: React.FC = () => {

    function openEmbedTestiMonial() {
        setOpenActionModal(true)
    }

    function copyToclipBoard() {
        window.navigator.clipboard.writeText("")
    }

    const [testiMonials, setTestiMonials] = useState<Testimonail[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const path = useLocation()
    const [activeTestimonial, setActiveTestimonial] = useState<string | null>(null)

    useEffect(() => {
        const id = path.pathname.split("/").at(-1) as string
        try {
            setLoading(true)
            const token = localStorage.getItem("token") as string
            if (!token) return

            fetch(`${BACKEND_URL}/testimonial/getTestimonial`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ space_id: id })
            }).then(async (res: Response) => {
                const data = await res.json()
                setTestiMonials(data?.valid ? data.testimonials : [])
                setLoading(false)
            })
        } catch {
            setTestiMonials([])
            setLoading(false)
        }
    }, [])

    const tabs = [
        {
            id: 1,
            tab: "Inbox",
            subTabs: [
                { id: "11", text: "All", icon: <Folder size={14} /> },
                { id: "12", text: "Video", icon: <Video size={14} /> },
                { id: "13", text: "Text", icon: <Pencil size={14} /> }
            ]
        },
        {
            id: 2,
            tab: "Integrations",
            subTabs: [{ id: "21", text: "Social Media", icon: <BsPeople size={14} /> }]
        },
        {
            id: 3,
            tab: "Embed Widgets",
            subTabs: [
                { id: "31", text: "Wall of love", icon: <HiHeart size={14} /> },
                { id: "32", text: "Single Testimonial", icon: <CodeXml size={14} /> },
                { id: "33", text: "Collection Widget", icon: <FaDownLong size={14} /> }
            ]
        }
    ]

    const actions: Action[] = [
        { id: "Action-1", icon: <TagIcon size={14} />, name: "Tags" },
        { id: "Action-2", icon: <GiftIcon size={14} />, name: "Incentivise" },
        {
            id: "Action-3",
            icon: <ShareIcon size={14} />,
            name: "Share",
            subActions: [
                { id: "Sub-31", name: "Get Link", icon: <Link size={14} />, action: copyToclipBoard },
                { id: "Sub-32", name: "Embed", icon: <ImEmbed size={14} />, action: openEmbedTestiMonial },
                { id: "Sub-33", name: "Create Image", icon: <Image size={14} /> }
            ]
        },
        { id: "Action-4", icon: <Download size={14} />, name: "Download" },
        { id: "Action-5", icon: <Pencil size={14} />, name: "Edit" },
        { id: "Action-6", icon: <TbBucketOff size={14} />, name: "Delete" },
        { id: "Action-7", icon: <BsThreeDots size={14} />, name: "More" }
    ]

    const [openMenuId, setOpenMenuId] = useState<number | null>(null)
    const [openAction, setAction] = useState<string | null>(null)
    const [openActionModal, setOpenActionModal] = useState<boolean>(false)
    const [selectedTestimonail, setSelectedtestimonial] = useState<Testimonail | null>()

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-150" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-300" />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16 flex mb-10">
            <Navbar display={false} />
            <ToastContainer position="bottom-center" theme="light" />

            {/* Sidebar */}
            <aside className="hidden md:block w-72 bg-white px-6 py-8">
                {tabs.map((item) => {
                    const isOpen = openMenuId === item.id
                    return (
                        <div key={item.id} className="mb-6">
                            <div
                                onClick={() => setOpenMenuId(isOpen ? null : item.id)}
                                className="flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer"
                            >
                                {item.tab}
                                {item.id > 1 && (isOpen ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                            </div>

                            <div className="mt-3 space-y-1">
                                {(item.id === 1 || isOpen) &&
                                    item.subTabs.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-600
                      hover:bg-gray-100 transition-colors cursor-pointer"
                                        >
                                            {sub.icon}
                                            {sub.text}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )
                })}
            </aside>

            {/* Main */}
            <main className="flex-1 px-8 py-6">
                {/* Search row */}
                <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row gap-4">
                    <input
                        className="flex-1 px-4 py-2.5 rounded-md bg-white shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                        placeholder="Search by name, email, or testimonial keywords"
                    />
                    <button className="px-4 py-2.5 rounded-md bg-white shadow-sm text-sm text-gray-600 hover:bg-gray-50 transition">
                        Options
                    </button>
                </div>

                {/* Cards */}
                <div className="max-w-5xl mx-auto space-y-6">
                    {testiMonials?.map((item) => (
                        //             <div
                        //                 key={item.id}
                        //                 onClick={() => {
                        //                     setActiveTestimonial(item.id)
                        //                     setSelectedtestimonial(item)
                        //                 }}
                        //                 className="rounded-lg p-6 border border-red-100
                        //   shadow-sm hover:shadow-md transition-shadow"
                        //             >
                        //                 <div className="flex justify-between items-center mb-3">
                        //                     <span className="text-xs px-3 py-1 rounded-full bg-white/70 text-gray-700">
                        //                         {item.type}
                        //                     </span>
                        //                     <div className="flex gap-3 text-gray-500">
                        //                         <Star size={15} />
                        //                         <Heart size={15} />
                        //                     </div>
                        //                 </div>

                        //                 <p className="text-sm text-gray-800 leading-relaxed">{item.message}</p>

                        //                 <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                        //                     <div className="flex items-center gap-2">
                        //                         <img src={item.avatar} className="w-7 h-7 rounded-full" />
                        //                         {item.name}
                        //                     </div>
                        //                     <span>{item.created_at.toString().split("T")[0]}</span>
                        //                 </div>

                        //                 <div className="mt-4 flex justify-end gap-3 relative">
                        //                     {actions.map((action) => {
                        //                         const isOpen = openAction === action.id
                        //                         return (
                        //                             <div
                        //                                 key={action.id}
                        //                                 onClick={() => {
                        //                                     if (!action.subActions) {
                        //                                         notify()
                        //                                         setAction(null)
                        //                                     } else {
                        //                                         setAction(isOpen ? null : action.id)
                        //                                     }
                        //                                 }}
                        //                                 className="text-xs flex items-center gap-1 px-3 py-2 rounded-md
                        //           text-gray-600 hover:bg-white/70 transition cursor-pointer"
                        //                             >
                        //                                 {action.icon}
                        //                                 {action.name}
                        //                                 {isOpen && action.subActions && activeTestimonial === item.id && (
                        //                                     <ActionPopUp subAction={action.subActions} />
                        //                                 )}
                        //                             </div>
                        //                         )
                        //                     })}
                        //                 </div>
                        //             </div>
                        <>
                            {
                                item.type.toLowerCase() == 'text' && <TextTestimonial actions={actions} setAction={setAction} setActiveTestimonial={setActiveTestimonial} setSelectedtestimonial={setSelectedtestimonial} item={item} openAction={openAction} activeTestimonial={activeTestimonial} />
                            }{
                                item.type.toLowerCase() == 'video' && <VideoTestimonial actions={actions} setAction={setAction} setActiveTestimonial={setActiveTestimonial} setSelectedtestimonial={setSelectedtestimonial} item={item} openAction={openAction} activeTestimonial={activeTestimonial} />
                            }
                        </>

                    ))}
                </div>
            </main>

            {openActionModal && selectedTestimonail && (
                <ActionModal
                    heading="Embed this testimonial"
                    subheading="Copy & paste into your website"
                    close={setOpenActionModal}
                >
                    {
                        selectedTestimonail.type.toLowerCase() == 'text' ? <EmbedTestiMonial {...selectedTestimonail} close={setOpenActionModal} /> : <div>Video</div>
                    }
                </ActionModal>
            )}
        </div>
    )
}

const ActionModal: React.FC<{
    children: ReactNode
    heading: string
    subheading: string
    close: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ children, heading, subheading, close }) => {
    return (
        <div className="fixed inset-0 z-[9999999] bg-black/30 flex justify-center items-start overflow-y-auto">
            <div className="w-full max-w-[95vw] lg:max-w-7xl my-8 bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">{heading}</h2>
                        <p className="text-sm text-gray-500">{subheading}</p>
                    </div>
                    <X className="cursor-pointer" size={16} onClick={() => close(false)} />
                </div>

                {/* Body */}
                <div className="px-6 pb-6 overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}


const ActionPopUp: React.FC<{ subAction: any[] }> = ({ subAction }) => (
    <div className="absolute right-0 top-10 bg-white rounded-md shadow-md p-2 z-99999">
        {subAction.map((action) => (
            <div
                key={action.id}
                onClick={() => action.action?.()}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-md
        hover:bg-gray-100 transition cursor-pointer"
            >
                {action.icon}
                {action.name}
            </div>
        ))}
    </div>
)

const TextTestimonial: React.FC<{ item: Testimonail, setAction: React.Dispatch<React.SetStateAction<string | null>>, setSelectedtestimonial: React.Dispatch<React.SetStateAction<Testimonail | null | undefined>>, setActiveTestimonial: React.Dispatch<React.SetStateAction<string | null>>, activeTestimonial: string | null, openAction: string | null, actions: Action[] }> = ({ item, setSelectedtestimonial, setActiveTestimonial, setAction, activeTestimonial, openAction, actions }) => {
    const notify = () => toast.success("Coming soon")
    return (
        <div
            key={item.id}
            onClick={() => {
                setActiveTestimonial(item.id)
                setSelectedtestimonial(item)
            }}
            className="rounded-lg p-6 border border-red-100
              shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs px-3 py-1 rounded-full bg-white/70 text-gray-700">
                    {item.type}
                </span>
                <div className="flex gap-3 text-gray-500">
                    <Star size={15} />
                    <Heart size={15} />
                </div>
            </div>

            <p className="text-sm text-gray-800 leading-relaxed">{item.message}</p>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <img src={item.avatar} className="w-7 h-7 rounded-full" />
                    {item.name}
                </div>
                <span>{item.created_at.toString().split("T")[0]}</span>
            </div>

            <div className="mt-4 flex justify-end gap-3 relative">
                {actions.map((action) => {
                    const isOpen = openAction === action.id
                    return (
                        <div
                            key={action.id}
                            onClick={() => {
                                if (!action.subActions) {
                                    notify()
                                    setAction(null)
                                } else {
                                    setAction(isOpen ? null : action.id)
                                }
                            }}
                            className="text-xs flex items-center gap-1 px-3 py-2 rounded-md
                      text-gray-600 hover:bg-white/70 transition cursor-pointer"
                        >
                            {action.icon}
                            {action.name}
                            {isOpen && action.subActions && activeTestimonial === item.id && (
                                <ActionPopUp subAction={action.subActions} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const VideoTestimonial: React.FC<{ item: Testimonail, setAction: React.Dispatch<React.SetStateAction<string | null>>, setSelectedtestimonial: React.Dispatch<React.SetStateAction<Testimonail | null | undefined>>, setActiveTestimonial: React.Dispatch<React.SetStateAction<string | null>>, activeTestimonial: string | null, openAction: string | null, actions: Action[] }> = ({ item, setSelectedtestimonial, setActiveTestimonial, setAction, activeTestimonial, openAction, actions }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const notify = () => toast.success("Coming soon")

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div onClick={() => {
            setActiveTestimonial(item.id)
            setSelectedtestimonial(item)
        }} className="max-w-3xl mx-auto p-5 rounded-2xl shadow-xl">
            {/* Video Wrapper */}
            <div
                className="relative rounded-xl overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <video
                    ref={videoRef}
                    src={item.video_url}
                    className="w-full h-full object-cover"
                    onEnded={() => setIsPlaying(false)}
                />

                {/* PAUSED → Play button always visible */}
                {!isPlaying && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center hover:scale-105 transition"
                        >
                            <Play className="w-7 h-7 text-white ml-1" />
                        </button>
                    </div>
                )}

                {/* PLAYING + HOVER → Pause button */}
                {isPlaying && isHovering && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity">
                        <button
                            onClick={togglePlay}
                            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition"
                        >
                            <Pause className="w-6 h-6 text-white" />
                        </button>
                    </div>
                )}
            </div>

            {/* Meta */}
            <div className="mt-4">
                <p className="text-gray-400 text-lg font-medium">{item.name}</p>
                <p className="text-gray-400 text-sm">{item.email}</p>
            </div>
            <div className="mt-4 flex justify-end gap-3 relative">
                {actions.map((action) => {
                    const isOpen = openAction === action.id
                    return (
                        <div
                            key={action.id}
                            onClick={() => {
                                if (!action.subActions) {
                                    notify()
                                    setAction(null)
                                } else {
                                    setAction(isOpen ? null : action.id)
                                }
                            }}
                            className="text-xs flex items-center gap-1 px-3 py-2 rounded-md
                      text-gray-600 hover:bg-white/70 transition cursor-pointer"
                        >
                            {action.icon}
                            {action.name}
                            {isOpen && action.subActions && activeTestimonial === item.id && (
                                <ActionPopUp subAction={action.subActions} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};


export default Space
