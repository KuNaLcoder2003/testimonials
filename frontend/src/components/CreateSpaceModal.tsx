import { Heart, MessageCircleIcon, Pencil, Settings, Video, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
type Tabs = "Baisc" | "Prompts" | "Thankyou Page"

const tabs = [
    {
        id: 1,
        tab: "Baisc" as Tabs,
        icon: <Settings />
    },
    {
        id: 2,
        tab: "Prompts" as Tabs,
        icon: <MessageCircleIcon />
    },
    {
        id: 2,
        tab: "Thankyou Page" as Tabs,
        icon: <Heart />
    }
]

interface Basic {
    space_name: string,
    header: string,
    custom_message: string,
}

interface Question {
    id: number;
    question: string;
}

const CreateSpaceModal: React.FC<{ setModal: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setModal }) => {
    const [tab, setTab] = useState<Tabs>("Baisc")
    const [basicTabDetails, setbasicTabDetails] = useState<Basic>({
        space_name: "",
        header: "Header goes here...",
        custom_message: "Your custom message goes here...",
    })
    const [spaceLogo, setSpaceLogo] = useState<File | null>(null)
    const [question, setquestions] = useState<Question[]>([
        {
            id: 1,
            question: "Who are you / what are you working on?",
        },
        {
            id: 2,
            question: "How has [our product / service] helped you?",
        },
        {
            id: 3,
            question: "What is the best thing about [our product / service]",
        }
    ])

    return (
        <div className="fixed inset-0 z-[9999999] bg-black/30 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex flex-wrap">
                        {tabs.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setTab(item.tab)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition
                  ${item.tab === tab
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "border-stone-200 hover:bg-stone-100"}`}
                            >
                                {item.icon}
                                {item.tab}
                            </button>
                        ))}
                    </div>
                    <X onClick={() => setModal(false)} className="cursor-pointer" size={18} />
                </div>

                {/* Body */}
                <div className="p-6 max-h-[85vh] overflow-y-auto">
                    {tab === "Baisc" && (
                        <BasicTab
                            questions={question}
                            setBasicDetails={setbasicTabDetails}
                            space_logo={spaceLogo}
                            baiscDetails={basicTabDetails}
                            setLogo={setSpaceLogo}
                        />
                    )}
                    {tab === "Prompts" && <PromptsTab questions={question} setQuestions={setquestions} />}
                    {tab === "Thankyou Page" && <div>Thank You page</div>}
                </div>

            </div>
        </div>
    )
}


const BasicTab: React.FC<{
    questions: Question[]
    baiscDetails: Basic
    space_logo: File | null
    setBasicDetails: React.Dispatch<React.SetStateAction<Basic>>
    setLogo: React.Dispatch<React.SetStateAction<File | null>>
}> = ({ baiscDetails, space_logo, setBasicDetails, setLogo, questions }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Preview */}
            <div className="lg:sticky lg:top-6 h-fit col-span-2">
                <div className="rounded-xl shadow-sm p-6 flex flex-col justify-between min-h-160">
                    <div className="space-y-6">
                        {space_logo ? (
                            <img
                                src={URL.createObjectURL(space_logo)}
                                className="h-24 w-24 rounded-full mx-auto object-cover"
                            />
                        ) : (
                            <div className="h-16 w-16 rounded-full mx-auto bg-indigo-600 text-white flex items-center justify-center text-xl">
                                👍
                            </div>
                        )}

                        <div>
                            <h2 className="text-2xl font-semibold text-center">
                                {baiscDetails.header || "Header goes here..."}
                            </h2>
                            <p className="text-gray-400 mt-2 text-center">
                                {baiscDetails.custom_message || "Custom message goes here..."}
                            </p>
                        </div>
                        <div className="flex flex-col items-baseline gap-2 mt-8">
                            <div className="w-full">
                                <h3 className="text-2xl font-semibold">Questions</h3>
                                <div className="w-[20%] border-2 border-blue-600" />
                            </div>
                            {
                                questions.map((item) => {
                                    return (
                                        <div className="flex items-baseline gap-4">
                                            <div className="w-2 h-2 rounded-full bg-black"></div>
                                            <p className="text-md font-light text-gray-500">{item.question}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="space-y-2 mt-6">
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                            Record a video <Video />
                        </button>
                        <button className="w-full bg-black/70 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                            Send in text <Pencil />
                        </button>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="space-y-10 col-span-3">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">Create a new Space</h2>
                    <p className="text-gray-400">
                        A dedicated page will be generated for collecting testimonials.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Space Name */}
                    <div>
                        <label className="text-sm text-gray-500">Space name <span className="text-red-600">*</span></label>
                        <input
                            className="w-full border border-stone-200 rounded-lg px-4 py-2"
                            onChange={(e) =>
                                setBasicDetails({ ...baiscDetails, space_name: e.target.value })
                            }
                        />
                    </div>

                    {/* Logo */}
                    <div>
                        <label className="text-sm text-gray-500">Space logo <span className="text-red-600">*</span></label>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="h-12 w-12 rounded-full bg-gray-100 overflow-hidden">
                                {space_logo && (
                                    <img
                                        src={URL.createObjectURL(space_logo)}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <label className="relative cursor-pointer px-4 py-2 rounded-lg bg-gray-100">
                                Change
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        if (e.target.files) setLogo(e.target.files[0])
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Heading */}
                    <div>
                        <label className="text-sm text-gray-500">Heading <span className="text-red-600">*</span></label>
                        <input
                            className="w-full border border-stone-200 rounded-lg px-4 py-2"
                            onChange={(e) =>
                                setBasicDetails({ ...baiscDetails, header: e.target.value })
                            }
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="text-sm text-gray-500">Custom message <span className="text-red-600">*</span></label>
                        <textarea
                            rows={4}
                            className="w-full border border-stone-200 rounded-lg px-4 py-2"
                            onChange={(e) =>
                                setBasicDetails({
                                    ...baiscDetails,
                                    custom_message: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-10">
                        <button className="text-white text-center bg-blue-600 px-6 py-2 rounded-lg cursor-pointer hover:scale-[1.05]" style={{
                            transition: "scale",
                            transitionTimingFunction: "ease",
                            transitionDuration: "0.2s"
                        }}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PromptsTab: React.FC<{ setQuestions: React.Dispatch<React.SetStateAction<Question[]>>, questions: Question[] }> = ({ setQuestions, questions }) => {
    console.log(questions, setQuestions)
    return (
        <div>

        </div>
    )
}




export default CreateSpaceModal