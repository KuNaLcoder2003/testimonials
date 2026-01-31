import type React from "react"
import Navbar from "../components/Navbar"
import { useEffect, useState, type JSX, type ReactNode } from "react"
import { ArrowDown, ArrowUp, CodeXml, Download, Folder, GiftIcon, Heart, Image, Link, Pencil, ShareIcon, Star, TagIcon, Video, X } from "lucide-react"
import { BsPeople, BsThreeDots } from "react-icons/bs"
import { HiHeart } from "react-icons/hi"
import { FaDownLong } from "react-icons/fa6"
import { useLocation } from "react-router-dom"
import { TbBucketOff } from "react-icons/tb"
import { ImEmbed } from "react-icons/im"
import { ToastContainer, toast } from 'react-toastify';
import EmbedTestiMonial from "../components/EmbedTestimonial"
type Testimonail = {
    encrypted_link: string
    id: string;
    space_id: string;
    type: string;
    avatar: string;
    message: string;
    email: string;
    name: string;
    title: string;
    company: string;
    social_link: string;
    created_at: Date;
    updated_at: Date;
}
type Action = {
    id: string;
    icon: JSX.Element;
    name: string;
    subActions?: {
        id: string;
        name: string;
        icon: JSX.Element;
        action?: () => any
    }[];
}
const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`
// type Tabs = "Inbox" | "Integrations" | "Embed Widgets" | "Pages"

const Space: React.FC = () => {

    const notify = () => toast.success("Comming Soon");


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
        const id = path.pathname.split('/').at(-1) as string
        try {
            setLoading(true)
            const token = localStorage.getItem('token') as string
            if (!token) {
                return
            }
            fetch(`${BACKEND_URL}/testimonial/getTestimonial`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    space_id: id
                })
            }).then(async (res: Response) => {
                const data = await res.json()
                if (!data || !data.valid) {
                    setTestiMonials([])
                    setLoading(false)
                } else {
                    setTestiMonials(data.testimonials)
                    setLoading(false)
                }
            })
        } catch (error) {
            setTestiMonials([])
            setLoading(false)
        }
    }, [])

    const tabs = [
        {
            id: 1,
            tab: 'Inbox',
            subTabs: [{
                id: '11',
                text: 'All',
                icon: <Folder className="font-thin" size={14} />
            }, {
                id: '12',
                text: 'Video',
                icon: <Video className="font-thin" size={14} />
            }, {
                id: '13',
                text: 'Text',
                icon: <Pencil className="font-thin" size={14} />
            }]
        },
        {
            id: 2,
            tab: 'Integrations',
            subTabs: [{
                id: '21',
                text: 'Social Media',
                icon: <BsPeople className="font-thin" size={14} />
            },
                // {
                //     id: '12',
                //     text: 'Video',
                //     icon: <Video className="font-thin" size={14} />
                // }, {
                //     id: '13',
                //     text: 'Text',
                //     icon: <Pencil className="font-thin" size={14} />
                // }
            ]
        }, {

            id: 3,
            tab: 'Embed Widgets',
            subTabs: [{
                id: '31',
                text: 'Wall of love',
                icon: <HiHeart className="font-thin border-black" size={14} />
            },
            {
                id: '32',
                text: 'Single Testimonail',
                icon: <CodeXml className="font-thin" size={14} />
            },
            {
                id: '33',
                text: 'Collection Widget',
                icon: <FaDownLong className="font-thin" size={14} />
            },
            ]
        }
    ]
    const actions: Action[] = [
        {
            id: 'Action-1',
            icon: <TagIcon size={14} color="gray" />,
            name: 'Tags'
        },
        {
            id: 'Action-2',
            icon: <GiftIcon size={14} color="gray" />,
            name: 'Incentivise',
        },
        {
            id: 'Action-3',
            icon: <ShareIcon size={14} color="gray" />,
            name: 'Share',
            subActions: [
                {
                    id: 'SubAction-31',
                    name: 'Get Link',
                    icon: <Link size={14} color="gray" />,
                    action: copyToclipBoard
                },
                {
                    id: 'SubAction-32',
                    name: 'Embed Testimonial',
                    icon: <ImEmbed size={14} color="gray" />,
                    action: openEmbedTestiMonial
                },
                {
                    id: 'SubAction-33',
                    name: 'Create an image',
                    icon: <Image size={14} color="gray" />
                },
            ]
        },
        {
            id: 'Action-4',
            icon: <Download size={14} color="gray" />,
            name: 'Download'
        },
        {
            id: 'Action-5',
            icon: <Pencil size={14} color="gray" />,
            name: 'Edit',
        },
        {
            id: 'Action-6',
            icon: <TbBucketOff size={14} color="gray" />,
            name: 'Delete',
        },
        {
            id: 'Action-7',
            icon: <BsThreeDots size={14} color="gray" />,
            name: 'More'
        }
    ]
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)
    const [openAction, setAction] = useState<string | null>(null);
    const [openActionModal, setOpenActionModal] = useState<boolean>(false)
    const [selectedTestimonail, setSelectedtestimonial] = useState<Testimonail | null>()
    return (
        <>

            {
                loading ? <div className="h-screen w-screen flex items-center justify-center">
                    <div className="flex flex-row gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                </div> : <div className="relative flex h-screen w-full bg-white">
                    <Navbar display={false} />
                    {
                        openActionModal && selectedTestimonail && <ActionModal heading="Embed this testimonial to your website" subheading="With just quick copy paste" close={setOpenActionModal} children={<EmbedTestiMonial id={selectedTestimonail.id} encrypted_link={selectedTestimonail.encrypted_link} name={selectedTestimonail.name} message={selectedTestimonail.message} avatar={selectedTestimonail.avatar} />} />
                    }
                    <div className="h-full w-full flex items-end">
                        <ToastContainer position="bottom-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <div className="w-full h-[90%] flex items-center gap-4">
                            <div className="w-96 p-6 h-full flex flex-col items-baseline gap-6 ml-20 shadow-md border-blue-200/20 border">
                                {
                                    tabs.map((item, idx) => {
                                        const isOpen = openMenuId === item.id
                                        return (
                                            <div key={`${item.id}_${idx}`} className="text-center space-y-3 w-full">
                                                <div onClick={() => setOpenMenuId(isOpen ? null : item.id)} className="w-full flex items-center justify-between cursor-pointer">
                                                    <p className="text-xl font-bold text-gray-500">{item.tab}</p>
                                                    {
                                                        item.id > 1 ? isOpen ? <ArrowUp size={14} /> : <ArrowDown size={14} /> : null
                                                    }
                                                </div>
                                                <div className="flex flex-col items-baseline gap-4">
                                                    {
                                                        item.id == 1 ? item.subTabs.map((subTab) => {
                                                            return (
                                                                <div key={subTab.id} className="flex items-center gap-2 cursor-pointer py-1 w-full hover:bg-gray-100 px-6 rounded-lg">
                                                                    {subTab.icon}
                                                                    <p className="text-lg">{subTab.text}</p>
                                                                </div>
                                                            )
                                                        }) : isOpen && item.subTabs.map((subTab) => {
                                                            return (
                                                                <div key={subTab.id} className="flex items-center gap-2 cursor-pointer py-1 w-full hover:bg-gray-100 px-6 rounded-lg">
                                                                    {subTab.icon}
                                                                    <p className="text-lg">{subTab.text}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex-2 p-4 h-full">
                                <div className="space-y-4 w-full">

                                    <div className="flex items-center gap-4 w-full">
                                        <div className="relative w-[70%] group">
                                            <span
                                                className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-gradient-to-b from-indigo-500 to-purple-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100"
                                            ></span>
                                            <input
                                                type="text"
                                                id="input"
                                                placeholder=""
                                                className="peer w-full pl-6 pr-4 pt-4 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
                                            />
                                            <label
                                                htmlFor="input"
                                                className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-500 peer-focus:font-semibold cursor-text"
                                            >
                                                Search by name , email or testimonail keywords
                                            </label>
                                        </div>

                                        <div className="px-6 py-2 text-center flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer">
                                            Options
                                        </div>
                                    </div>

                                    {
                                        testiMonials && testiMonials.length > 0 ?
                                            (
                                                <div className="w-full p-6">
                                                    <div className="w-[70%] mx-auto flex flex-col items-center gap-6 overflow-y-scroll">
                                                        {
                                                            testiMonials.map((item, idx) => {

                                                                return (
                                                                    <div onClick={() => {
                                                                        setActiveTestimonial(item.id)
                                                                        setSelectedtestimonial(item)
                                                                    }} key={`${item.created_at}_${idx}`} className="w-full border-2 border-red-100/70 rounded-lg p-4 flex flex-col items-baseline gap-4">
                                                                        <div className="w-full flex items-center justify-between">
                                                                            <p className="text-blue-600 bg-blue-300/50 rounded-lg w-auto px-4 py-1">{item.type}</p>
                                                                            <div className="flex items-center gap-4">
                                                                                <Star color="red" fill="white" size={15} className="cursor-pointer" />
                                                                                <Heart color="red" fill="white" className="cursor-pointer" size={15} />
                                                                            </div>
                                                                        </div>
                                                                        <p className="max-w-xl mt-4 text-md font-light text-gray-500">{item.message}</p>

                                                                        <div className="w-[80%] flex items-center justify-between">
                                                                            <div className="flex flex-col items-baseline gap-1">
                                                                                <p className="text-lg text-gray-500">Name</p>
                                                                                <div className="flex items-center gap-2">
                                                                                    <img src={item.avatar} className="h-6 w-6 rounded-full" />
                                                                                    <p className="text-md font-thin text-gray-500">{item.name}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-col items-baseline gap-1">
                                                                                <p className="text-lg text-gray-500">Email</p>
                                                                                <p className="text-md font-thin text-gray-500">{item.email}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-col items-baseline gap-1">
                                                                            <p className="text-lg text-gray-500">Submitted at</p>
                                                                            <p className="text-md font-thin text-gray-500">{item.created_at.toString().split('T')[0].split('-').reverse().join('-')}</p>
                                                                        </div>
                                                                        <div className="flex justify-end w-full">
                                                                            <div className="flex items-center gap-6">
                                                                                {
                                                                                    actions.map(action => {
                                                                                        const isOpen = action.id === openAction
                                                                                        return (
                                                                                            <div onClick={() => {
                                                                                                if (!action.subActions) {
                                                                                                    notify()
                                                                                                    setAction(null)
                                                                                                } else {
                                                                                                    setAction(isOpen ? null : action.id)
                                                                                                }
                                                                                            }} key={action.id} className="flex items-center gap-1 cursor-pointer p-1 hover:bg-blue-200 rounded-lg relative">
                                                                                                {action.icon}
                                                                                                <p className="text-sm">{action.name}</p>
                                                                                                {
                                                                                                    isOpen && action.subActions && activeTestimonial == item.id ? <ActionPopUp subAction={action.subActions} /> : null
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            ) : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

const ActionModal: React.FC<{ children: ReactNode, heading: string, subheading: string, close: React.Dispatch<React.SetStateAction<boolean>> }> = ({ children, heading, subheading, close }) => {
    return (
        <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-black/20 z-[9999999]">
            <div className="w-6xl mx-auto bg-white h-auto space-y-4 p-6">
                <div className="flex w-full items-baseline justify-between">
                    <div className="flex flex-col items-baseline gap-1">
                        <h2 className="text-xl font-semibold">{heading}</h2>
                        <p className="text-sm font-light text-gray-500">{subheading}</p>
                    </div>
                    <X className="cursor-pointer" size={15} onClick={() => close(false)} />
                </div>
                {children}
            </div>
        </div>
    )
}

interface SubAction {
    id: string;
    name: string;
    icon: JSX.Element;
    action?: () => any
}
const ActionPopUp: React.FC<{ subAction: SubAction[] }> = ({ subAction }) => {
    return (
        <div className="absolute w-64 h-auto p-4 bg-white rounded-lg top-5 -left-10 flex flex-col items-baseline gap-4">
            {
                subAction.map((action) => {
                    return (
                        <div onClick={() => action.action ? action.action() : null} key={action.id} className="flex items-center gap-1 cursor-pointer p-1 hover:bg-blue-200 hover:text-blue-600 rounded-lg relative">
                            {action.icon}
                            <p className="text-sm">{action.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Space