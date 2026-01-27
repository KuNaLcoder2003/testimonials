import type React from "react";
import useCollector from "../hooks/useCollector";
import { Loader, Pencil, Video, X } from "lucide-react";
import { useState } from "react";

const Collect: React.FC = () => {
    const { collectorCard, loading, err } = useCollector()
    let questions: string[] = []
    if (loading) {
        <div className="h-screen w-screen flex items-center justify-center">
            <Loader />
        </div>
    }
    if (err && !loading) {
        return <div className="text-4xl flex h-screen items-center justify-center">
            <p>{err}</p>
        </div>
    }

    if (collectorCard) {
        const { question_1, question_2, question_3, question_4, question_5 } = collectorCard
        questions = [question_1, question_2, question_3, question_4, question_5]
    }
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            {
                collectorCard ? <div className="w-screen h-screen flex items-center justify-center relative">
                    {
                        isOpen && <div className="absolute h-screen inset-0 bg-black/20 flex items-center justify-center z-[99999]">
                            <TextTestimonialPopUp questions={questions} space_image={collectorCard.space_image} />
                        </div>
                    }
                    {
                        <div className="w-[80%] lg:w-[30%] mx-auto lg:sticky lg:top-6 h-fit col-span-2">
                            <div className="rounded-xl shadow-sm p-6 flex flex-col justify-between min-h-160">
                                <div className="space-y-6">
                                    {collectorCard.space_image ? (
                                        <img
                                            src={collectorCard.space_image}
                                            className="h-24 w-24 rounded-full mx-auto object-cover"
                                        />
                                    ) : (
                                        <div className="h-16 w-16 rounded-full mx-auto bg-indigo-600 text-white flex items-center justify-center text-xl">
                                            👍
                                        </div>
                                    )}

                                    <div>
                                        <h2 className="text-2xl font-semibold text-center">
                                            {collectorCard.header || "Header goes here..."}
                                        </h2>
                                        <p className="text-gray-400 mt-2 text-center">
                                            {collectorCard.message || "Custom message goes here..."}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-baseline gap-2 mt-8">
                                        <div className="w-full">
                                            <h3 className="text-2xl font-semibold">Questions</h3>
                                            <div className="w-[20%] border-2 border-blue-600" />
                                        </div>
                                        {
                                            questions.map((item, idx) => {
                                                if (item.length == 0) {
                                                    return null
                                                } else {
                                                    return (
                                                        <div key={idx} className="flex items-baseline gap-4">
                                                            <div className="w-2 h-2 rounded-full bg-black"></div>
                                                            <p className="text-md font-light text-gray-500">{item}</p>
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                    </div>
                                </div>
                                <div className="space-y-2 mt-6">
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                                        Record a video <Video />
                                    </button>
                                    <button onClick={() => setIsOpen(true)} className="w-full bg-black/70 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                                        Send in text <Pencil />
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div> : <div className="text-4xl flex items-center justify-center">
                    <p>Unable to get the details</p>
                </div>
            }
        </>
    )
}


const TextTestimonialPopUp: React.FC<{ space_image: string, questions: string[] }> = ({ space_image, questions }) => {
    const [review, setReview] = useState<string>("")
    const [attachment, setAttachment] = useState<File | null>(null)
    const [userImage, setUserImage] = useState<File | null>(null)
    return (
        <div className="w-lg m-auto min-h-[97%] p-4 flex flex-col items-baseline gap-1 bg-white">
            <div className="flex items-center w-full justify-between">
                <h2 className="">Write text testimonial to</h2>
                <X className="cursor-pointer" />
            </div>
            <div className="flex flex-col gap-1 w-full mt-4">
                {space_image ? (
                    <img
                        src={space_image}
                        className="h-16 w-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="h-16 w-16 rounded-full mx-auto bg-indigo-600 text-white flex items-center justify-center text-xl">
                        👍
                    </div>
                )}

                <div className="flex flex-col items-baseline gap-1">
                    <div className="w-full">
                        <h3 className="text-lg font-semibold">Questions</h3>
                        <div className="w-[20%] border-2 border-blue-600" />
                    </div>
                    {
                        questions.map((item, idx) => {
                            if (item.length == 0) {
                                return null
                            } else {
                                return (
                                    <div key={idx} className="flex items-baseline gap-4">
                                        <div className="w-2 h-2 rounded-full bg-black"></div>
                                        <p className="text-sm font-light text-gray-500">{item}</p>
                                    </div>
                                )
                            }

                        })
                    }
                </div>

                <div className="w-full p-2">
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} className="border rounded-lg border-stone-300 w-full px-4" rows={4} />
                </div>
                <div className="w-auto space-y-2">
                    <p className="text-sm font-light text-gray-500">Attach Image</p>
                    {
                        attachment && <img src={URL.createObjectURL(attachment)} className="w-16 h-16 rounded-md" />
                    }
                    <button className="relative px-2 py-2 rounded-lg text-center flex items-center justify-center bg-blue-600 text-white text-xs cursor-pointer">
                        <p>Upload Image</p>
                        <input onChange={(e) => {
                            const files = e.target.files
                            if (!files) {
                                return
                            }
                            setAttachment(files[0])
                        }} type="file" className="absolute inset-0 opacity-0" />
                    </button>
                </div>
                <div className="w-auto space-y-2 w-full mt-4">
                    <p className="text-sm font-light text-gray-500">Your Name <span className="text-red-500">*</span></p>
                    <input className="border rounded-lg border-stone-300 w-full px-4 py-2" />
                </div>
                <div className="w-auto space-y-2 w-full mt-4">
                    <p className="text-sm font-light text-gray-500">Your Email <span className="text-red-500">*</span></p>
                    <input className="border rounded-lg border-stone-300 w-full px-4 py-2" />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-light text-gray-500">Your Photo</p>
                    <div className="w-auto flex items-center gap-2">

                        {
                            userImage ? <img src={URL.createObjectURL(userImage)} className="w-32 h-32 rounded-full" /> : <div className="w-32 h-32 rounded-full bg-blue-400/20" />
                        }
                        <button className="relative px-2 py-2 rounded-lg text-center flex items-center justify-center bg-blue-600 text-white text-xs cursor-pointer">
                            <p>Upload Image</p>
                            <input onChange={(e) => {
                                const files = e.target.files
                                if (!files) {
                                    return
                                }
                                setUserImage(files[0])
                            }} type="file" className="absolute inset-0 opacity-0" />
                        </button>
                    </div>
                </div>

                <div className="w-full flex items-center justify-end gap-4">
                    <button className="text-sm text-center border border-blue-500 cursor-pointer px-6 py-1 rounded-lg">Cancel</button>
                    <button className="text-sm text-center border border-blue-500 bg-blue-500 text-white cursor-pointer px-6 py-1 rounded-lg">Send</button>
                </div>


            </div>


        </div>
    )
}

export default Collect;