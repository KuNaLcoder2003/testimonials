import { MenuIcon, PlusIcon, Video } from "lucide-react";

import { cn } from "../util";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import CreateSpaceModal from "../components/CreateSpaceModal";



const Spaces = [
    {
        id: 1,
        space_name: "KunalSingh",
        video: 0,
        text: 1,
        space_image: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fkunalsingh%2Flogo?alt=media&token=7861e60f-ca4a-4967-a1d7-95a40bf13cdc"
    },
    {
        id: 2,
        space_name: "EdgeFrame-Solutions",
        video: 2,
        text: 10,
        space_image: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fkunalsingh%2Flogo?alt=media&token=7861e60f-ca4a-4967-a1d7-95a40bf13cdc"
    }
]


function Dashboard() {
    const [modalOpen, setModalOpen] = useState<boolean>(true)
    return (
        <>
            <div className="relative flex h-screen w-full bg-white">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_0px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    )}
                />
                {
                    modalOpen && <CreateSpaceModal setModal={setModalOpen} />
                }

                {/* Radial gradient for the container to give a faded look */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
                <Navbar display={false} />

                <div className="w-7xl mx-auto mt-30 z-[9999] flex flex-col gap-6">
                    <div className="space-y-4 max-w-full">
                        <h2 className="text-3xl font-semibold">Overview</h2>
                        <div className="flex items-baseline w-full gap-8">

                            <div className="space-y-3 w-[30%] p-4 bg-white rounded-lg shadow-lg">
                                <div className="w-full flex justify-between items-center">
                                    <p>Total Videos</p>
                                    <Video />
                                </div>
                                <div className="text-lg font-semibold">0<span className="text-md font-normal">/2</span></div>
                            </div>

                            <div className="space-y-3 w-[30%] p-4 bg-white rounded-lg shadow-lg">
                                <div className="w-full flex justify-between items-center">
                                    <p>Total Videos</p>
                                    <Video />
                                </div>
                                <div className="text-lg font-semibold">0<span className="text-md font-normal">/2</span></div>
                            </div>

                            <div className="space-y-3 w-[30%] p-4 bg-white rounded-lg shadow-lg">
                                <div className="w-full flex justify-between items-center">
                                    <p>Total Videos</p>
                                    <Video />
                                </div>
                                <div className="text-lg font-semibold">0<span className="text-md font-normal">/2</span></div>
                            </div>

                        </div>
                    </div>

                    <div className="space-y-4 max-w-full mt-20">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-semibold">Spaces</h2>
                            <button onClick={() => setModalOpen(true)} className="px-6 py-3 text-center text-white bg-blue-500 rounded-lg flex items-center gap-2 cursor-pointer"><PlusIcon fill="white" color="white" size={16} /><span>Create new space</span></button>
                        </div>

                        <div className="flex max-w-full flex items-center gap-4 flex-wrap">
                            {
                                Spaces.map((item) => {
                                    return (
                                        <div key={`${item.id}_${item.space_name}`} className="flex flex-col justify-between w-[28%] p-4 h-32 bg-white rounded-lg shadow-lg cursor-pointer">
                                            <div className="w-full flex items-center justify-center">
                                                <div className="w-full flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                                        <img className="rounded-full" src={item.space_image} />
                                                    </div>
                                                    <p>{item.space_name}</p>
                                                </div>
                                                <div className="p-1 hover:bg-gray-100 cursor-pointer"><MenuIcon size={12} /></div>
                                            </div>
                                            <div className="w-full flex items-center justify-between">
                                                <p className="text-md text-gray-400">Videos : <span className="text-md text-black">{item.video}</span></p>
                                                <p className="text-md text-gray-400">Text : <span className="text-md text-black">{item.text}</span></p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}

export default Dashboard
