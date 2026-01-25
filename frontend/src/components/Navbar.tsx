import { LogIn, MenuIcon, User2Icon } from "lucide-react";
import type React from "react";
import { motion } from "framer-motion"
import { useState } from "react";

const Navbar: React.FC = () => {
    const links = [
        {
            id: "1",
            title: "Features",
            to: "/features"
        },
        {
            id: "2",
            title: "Integrations",
            to: "/integrations"
        },
        {
            id: "3",
            title: "Pricing",
            to: "/pricing"
        }
    ]

    const userLinks = [
        {
            id: "1",
            title: "Dashboard",
            to: "/dashboard"
        },
        {
            id: "2",
            title: "Settings",
            to: "/settings"
        },
        {
            id: "3",
            title: "Upgrade",
            to: "/upgrade"
        }
    ]

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
    const [isUserOpen, setisUserOpen] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className="w-screen flex items-center justify-center fixed top-5 z-[99999] bg-white">
            <div className="w-full">
                <div className="w-full lg:w-4xl m-auto p-2 px-4 rouded-lg shadow-lg flex items-center justify-between rounded-lg">
                    <div className="">
                        <h2 className="text-xl font-semibold"><span className="text-blue-500 underline">Easy</span><span className="underline">Monials</span></h2>
                    </div>
                    <div className="hidden lg:flex items-center justify-center gap-8">
                        {
                            links.map(item => {
                                return (
                                    <p key={item.id} className="text-center cursor-pointer hover:scale-[1.06]" style={{ transition: "scale", transitionDuration: "0.2s" }}>{item.title}</p>
                                )
                            })
                        }
                    </div>
                    <div onClick={() => setisUserOpen(!isUserOpen)} className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 cursor-pointer relative">
                        <User2Icon />
                        {
                            isUserOpen && <div className="absolute top-15 w-36 h-auto p-4 shadow-lg z-999 rounded-lg">
                                {
                                    isLoggedIn ? <div className="flex flex-col items-baseline gap-2">
                                        {
                                            userLinks.map(item => {
                                                return (
                                                    <p key={`${item.title}_${item.id}`} className="text-sm cursor-pointer py-2">{item.title}</p>
                                                )
                                            })
                                        }
                                        <button onClick={() => {
                                            setisUserOpen(false)
                                            setIsLoggedIn(false)
                                        }} className="w-full text-center bg-blue-500 text-white rounded-lg cursor-pointer">Logout</button>
                                    </div> : <div className="flex items-center gap-2" onClick={() => {
                                        setIsLoggedIn(true)
                                    }}>
                                        <LogIn />
                                        <p className="text-sm">Login</p>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 cursor-pointer">
                        <MenuIcon />
                    </div>
                </div>
                {
                    isOpen && <motion.div
                        initial={{ y: -100 }}
                        whileInView={{ y: 0 }}
                        exit={{ y: 10 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            transitionTimingFunction: "ease"
                        }}
                        className="w-full flex flex-col gap-5 shadow-lg lg:hidden p-4">
                        <div className="flex flex-col items-baseline justify-center gap-8">
                            {
                                links.map(item => {
                                    return (
                                        <p key={item.id} className="text-center cursor-pointer hover:scale-[1.06]" style={{ transition: "scale", transitionDuration: "0.2s" }}>{item.title}</p>
                                    )
                                })
                            }
                        </div>
                        <div className="flex justify-start">
                            <div
                                onClick={() => setisUserOpen(!isUserOpen)}
                                className="relative flex items-center gap-3 cursor-pointer"
                            >
                                {/* User Icon */}
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200">
                                    <User2Icon />
                                </div>

                                {/* User Dropdown */}
                                {isUserOpen && (
                                    <div className="absolute top-14 left-0 w-44 rounded-xl bg-white shadow-xl border border-gray-100 p-3 z-50">
                                        {isLoggedIn ? (
                                            <div className="flex flex-col gap-2">
                                                {userLinks.map(item => (
                                                    <p
                                                        key={`${item.title}_${item.id}`}
                                                        className="text-sm px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {item.title}
                                                    </p>
                                                ))}
                                                <button
                                                    onClick={() => {
                                                        setisUserOpen(false)
                                                        setIsLoggedIn(false)
                                                    }}
                                                    className="mt-2 w-full rounded-lg bg-blue-500 py-1.5 text-sm text-white"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 rounded-md p-2"
                                                onClick={() => setIsLoggedIn(true)}
                                            >
                                                <LogIn size={16} />
                                                <p>Login</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                    </motion.div>
                }
            </div>
        </div>
    )
}

export default Navbar;