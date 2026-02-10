import type React from "react";
import useCollector from "../hooks/useCollector";
import { Pencil, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

type ThankYou = {
    message: string;
    id: string;
    title: string;
    image_url: string;
}

interface SubmitResponse {
    err?: string
    valid: boolean,
    thankYou?: ThankYou
}
const Collect: React.FC = () => {
    const { collectorCard, loading, err, submitTextTestimonials, space, submitVideoTestimonials } = useCollector()
    let questions: string[] = []

    if (collectorCard) {
        const { question_1, question_2, question_3, question_4, question_5 } = collectorCard
        questions = [question_1, question_2, question_3, question_4, question_5]
    }
    const [isOpen, setIsOpen] = useState<string>("")
    return (
        <>

            {
                loading ? <div className="w-screen h-screen flex items-center justify-center">
                    <div className="flex flex-row gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                </div> : collectorCard ? <div className="w-screen h-screen flex items-center justify-center relative">
                    {
                        isOpen.length > 0 && isOpen == "Text" && <div className="absolute h-screen inset-0 bg-black/20 flex items-center justify-center z-[99999]">
                            <TextTestimonialPopUp space_id={space} submitHander={submitTextTestimonials} closeModal={setIsOpen} questions={questions} space_image={collectorCard.space_image} />
                        </div>
                    }
                    {
                        isOpen.length > 0 && isOpen == "Video" && <div className="absolute h-screen inset-0 bg-black/20 flex items-center justify-center z-[99999]">
                            <VideoRecordingPopUp closeModal={setIsOpen} space_id={space} submit={submitVideoTestimonials} />
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
                                    <button onClick={() => setIsOpen("Video")} className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                                        Record a video <Video />
                                    </button>
                                    <button onClick={() => setIsOpen("Text")} className="w-full bg-black/70 text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                                        Send in text <Pencil />
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div> : <div className="text-4xl flex items-center justify-center">
                    <p>{err}</p>
                </div>
            }
        </>
    )
}

const VideoRecordingPopUp: React.FC<{ closeModal: React.Dispatch<React.SetStateAction<string>>, space_id: string, submit: (formData: FormData) => Promise<SubmitResponse> }> = ({ closeModal, space_id, submit }) => {
    const previewRef = useRef<HTMLVideoElement | null>(null)
    const recordingRef = useRef<HTMLVideoElement | null>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const [deviceInfo, setDeviceInfo] = useState<{ camera?: string; mic?: string }>({})
    const [blob, setBlob] = useState<Blob | null>(null)
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: ""
    })
    const [thankYou, setThankYou] = useState<ThankYou | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)
    let recordingTimeMS = 4000;
    const startRecording = async (stream: MediaStream, lengthInMS: number) => {

        return new Promise((resolve, reject) => {
            // We have to first get user's video and audio , that will send some data (mainly video and audio)
            // also the type of Data is MediaStream 
            // MediaStream is basically a pipeline that contains chunks / tracks / stream of data (video or audio) from the input device
            // The chunks / tracks / stream is an extention of MediaStreamTrack interface , that holds list of data for video from camera or audio from microphone
            // these will be provided in the arguments

            // Now we have the data(stream) available to record ,
            // We define a recorder of Type MediaRecorder that will handle the recording of the incoming stream
            const recorder: MediaRecorder = new MediaRecorder(stream)

            // Now we initailaize an array that has Blob's (file-like object of immutable, raw data) of media data , which will be provided on onDataAvailable event of MediaRecorder
            let streamData: Blob[] = []
            // pushing data(Blob) in the array
            recorder.ondataavailable = ((event: BlobEvent) => {
                streamData.push(event.data)
            })
            recorder.onerror = (e) => reject(e)

            // when the data is available , we start the recorder
            recorder.start(1000);
            setTimeout(() => {
                if (recorder.state === "recording") {
                    recorder.stop()
                }
            }, lengthInMS)

            recorder.onstop = () => {
                resolve(streamData)
            }
        })
    }
    function stop(stream: MediaStream | null) {
        if (!stream) {
            return
        }
        stream.getTracks().forEach(track => track.stop())
    }
    function getActiveDevices(stream: MediaStream) {
        const videoTrack = stream.getVideoTracks()[0]
        const audioTrack = stream.getAudioTracks()[0]
        streamRef.current = stream
        setDeviceInfo({
            camera: stream.getVideoTracks()[0]?.label,
            mic: stream.getAudioTracks()[0]?.label,
        })

        return {
            camera: videoTrack?.label || "Camera",
            microphone: audioTrack?.label || "Microphone",
            videoSettings: videoTrack?.getSettings(),
            audioSettings: audioTrack?.getSettings(),
        }
    }
    async function handleStartRecording() {
        try {
            const data: MediaStream = await window.navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            })
            getActiveDevices(data)
            if (previewRef.current) {
                previewRef.current.srcObject = data
                previewRef.current.muted = true
                // when the data is available , play the video being recorded
                await previewRef.current.play()
            }
            console.log('Hi')
            // now we have the input(stream) coming form the media device , now we need to record it
            const recordedChunks = await startRecording(data, recordingTimeMS) as Blob[]
            console.log('Recorded streams : ', recordedChunks)
            // now we create the recieved blob's array into a single blob onject
            const recordedBlob = new Blob(recordedChunks, { type: "video/webm" })
            console.log(recordedBlob)
            if (recordingRef.current) {
                recordingRef.current.srcObject = null
                recordingRef.current.src = URL.createObjectURL(recordedBlob)
                recordingRef.current.controls = true
                recordingRef.current.onloadedmetadata = () => {
                    recordingRef.current?.play()
                }
            }
            setBlob(recordedBlob)

        } catch (error) {
            console.log(error)
        }
    }

    async function handleVideoTestimonailSubmit() {
        try {
            if (!blob) {
                return
            }
            const videoFile = new File(
                [blob],
                "recording.webm",
                { type: "video/webm" }
            )
            const formData = new FormData();

            formData.append('vieo', videoFile)
            formData.append('name', userDetails.name)
            formData.append('email', userDetails.email)
            formData.append('space_id', space_id)
            const { thankYou, err, valid } = await submit(formData)
            if (!valid || !thankYou) {
                toast.error(err || "Error")
                setThankYou(null)
                setSubmitting(false)
                return
            }
            setThankYou(thankYou)
            setSubmitting(false)

        } catch (error) {
            setSubmitting(false)
            console.log(error)
            setThankYou(null)
        }
    }

    return (
        <>
            {
                submitting ? <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-row gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                </div> : thankYou ? <div className="lg:sticky lg:top-6 h-fit mx-auto max-w-lg">
                    <div className="rounded-xl shadow-sm p-6 flex flex-col justify-center gap-6 min-h-90 bg-white">
                        <div className="w-[100%] h-[70%] mx-auto">
                            <img className="w-full h-full object-cover rounded-lg" src={thankYou.image_url} />
                        </div>
                        <h3 className="text-3xl font-semibold text-gray-400 text-center">{thankYou.title}</h3>
                        <p className="text-md font-light text-gray-400 text-center">{thankYou.message}</p>
                    </div>
                </div> : <div className="w-lg m-auto min-h-[97%] p-4 flex flex-col items-baseline gap-4 bg-white rounded-xl shadow-sm">
                    {/* Header */}
                    <div className="flex items-center w-full justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Record video testimonial
                        </h2>
                        <X
                            onClick={() => closeModal("")}
                            className="cursor-pointer text-gray-500 hover:text-gray-800"
                        />
                    </div>

                    {/* Live Preview */}
                    <div className="w-full mt-4 space-y-2">
                        <h3 className="text-md font-semibold text-gray-700">Live Preview</h3>

                        <div className="overflow-hidden rounded-lg bg-black border">
                            <video
                                ref={previewRef}
                                className="h-52 w-full object-cover"
                                muted
                            />
                        </div>

                        {/* Device Info */}
                        <div className="rounded-lg bg-gray-50 px-4 py-2 text-xs text-gray-600 border">
                            <p className="font-medium text-gray-700 mb-1">Devices in use</p>
                            <p>🎥 Camera: {deviceInfo.camera || "Not detected"}</p>
                            <p>🎙️ Microphone: {deviceInfo.mic || "Not detected"}</p>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-3 mt-3">
                            <button
                                onClick={handleStartRecording}
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                ⏺ Start Recording
                            </button>

                            <button
                                onClick={() => stop(streamRef.current)}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                ⏹ Stop
                            </button>
                        </div>
                    </div>

                    {/* Recorded Video */}
                    <div className="w-full mt-6 space-y-2">
                        <h3 className="text-md font-semibold text-gray-700">Recorded Video</h3>
                        <div className="overflow-hidden rounded-lg bg-black border">
                            <video
                                ref={recordingRef}
                                className="h-52 w-full object-cover"
                                controls
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="w-full space-y-1 mt-6">
                        <p className="text-sm font-light text-gray-500">
                            Your Name <span className="text-red-500">*</span>
                        </p>
                        <input
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                            type="text"
                            className="border rounded-lg border-stone-300 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div className="w-full space-y-1 mt-4">
                        <p className="text-sm font-light text-gray-500">
                            Your Email <span className="text-red-500">*</span>
                        </p>
                        <input
                            value={userDetails.email}
                            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                            type="email"
                            className="border rounded-lg border-stone-300 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Submit */}
                    <div className="w-full flex items-center justify-end mt-6">
                        <button
                            onClick={handleVideoTestimonailSubmit}
                            disabled={!blob}
                            className={`px-6 py-2 rounded-lg text-sm font-medium text-white 
            ${blob ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}`}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            }
        </>
    )
}


const TextTestimonialPopUp: React.FC<{ space_image: string, questions: string[], closeModal: React.Dispatch<React.SetStateAction<string>>, submitHander: (formData: FormData) => Promise<SubmitResponse>, space_id: string }> = ({ space_image, questions, closeModal, submitHander, space_id }) => {
    const [review, setReview] = useState<string>("")
    const [attachment, setAttachment] = useState<File | null>(null)
    const [userImage, setUserImage] = useState<File | null>(null)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [thankYou, setThankYou] = useState<ThankYou | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const handleSubmit = async () => {
        if (!userImage) {
            return
        }
        if (review.length == 0) {
            return
        }
        if (name.length == 0) {
            return
        }
        if (email.length == 0) {
            return
        }
        const formData = new FormData()
        formData.append('type', 'Text')
        formData.append('avatar', userImage)
        formData.append('message', review)
        formData.append('email', email)
        formData.append('name', name)
        formData.append('space_id', space_id)
        if (attachment) {
            formData.append('asset', attachment)
        }
        setSubmitting(true)
        const { thankYou, err, valid } = await submitHander(formData)
        if (!valid || !thankYou) {
            toast.error(err || "Error")
            setThankYou(null)
            setSubmitting(false)
            return
        }
        setThankYou(thankYou)
        setSubmitting(false)
    }
    return (
        <>
            {
                submitting ? <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-row gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                </div> : <>
                    {
                        thankYou ?
                            <div className="lg:sticky lg:top-6 h-fit mx-auto max-w-lg">
                                <div className="rounded-xl shadow-sm p-6 flex flex-col justify-center gap-6 min-h-90 bg-white">
                                    <div className="w-[100%] h-[70%] mx-auto">
                                        <img className="w-full h-full object-cover rounded-lg" src={thankYou.image_url} />
                                    </div>
                                    <h3 className="text-3xl font-semibold text-gray-400 text-center">{thankYou.title}</h3>
                                    <p className="text-md font-light text-gray-400 text-center">{thankYou.message}</p>
                                </div>
                            </div>
                            : <div className="w-lg m-auto min-h-[97%] p-4 flex flex-col items-baseline gap-1 bg-white">
                                <div className="flex items-center w-full justify-between">
                                    <h2 className="">Write text testimonial to</h2>
                                    <X onClick={() => closeModal("")} className="cursor-pointer" />
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
                                        <input value={name} onChange={(e) => setName(e.target.value)} className="border rounded-lg border-stone-300 w-full px-4 py-2" />
                                    </div>
                                    <div className="w-auto space-y-2 w-full mt-4">
                                        <p className="text-sm font-light text-gray-500">Your Email <span className="text-red-500">*</span></p>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg border-stone-300 w-full px-4 py-2" />
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
                                        <button onClick={handleSubmit} className="text-sm text-center border border-blue-500 bg-blue-500 text-white cursor-pointer px-6 py-1 rounded-lg">Send</button>
                                    </div>
                                </div>


                            </div>
                    }
                </>
            }
        </>
    )
}
export default Collect;