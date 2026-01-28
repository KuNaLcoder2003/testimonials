import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

type Space = {
    id: string;
    space_name: string;
    text_testimonial_count: number;
    video_testimonial_count: number;
    header: string;
    message: string;
    space_image: string;
    question_1: string;
    question_2: string;
    question_3: string;
    question_4: string;
    question_5: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
}

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

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`
const useCollector = () => {
    const [collectorCard, setCollectorCard] = useState<Space>()
    const [loading, setLoading] = useState<boolean>(false)
    const [err, setErr] = useState<string>("")
    const path = useLocation()
    const space = path.pathname.split('/').at(-1) as string;
    useEffect(() => {
        // const alreadySubmitted = sessionStorage.getItem(`submitted:${space}`)
        // if (alreadySubmitted) {
        //     return
        // }
        try {
            setLoading(true)
            fetch(`${BACKEND_URL}/space/collect/${space}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res: Response) => {
                const data = await res.json()
                if (!data || !data.valid) {
                    setLoading(false)
                    setErr(data.message)
                } else {
                    setLoading(false);
                    setCollectorCard(data.space)
                }
            })
        } catch (error) {
            setLoading(false)
            setErr("Something went wrong")
        }
    }, [space])

    const submitTestimonials = async (formData: FormData): Promise<SubmitResponse> => {
        if (!formData) {
            return { err: "Please provide complete data", valid: false }
        }
        const token = localStorage.getItem('token') as string
        try {
            const reposne = await fetch(`${BACKEND_URL}/testimonial`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            const data = await reposne.json()
            if (!data || !data.valid) {
                return { err: data.message, valid: false }
            } else {
                // sessionStorage.setItem(`submitted:${space}`, "true")
                return { valid: true, thankYou: data.thankYou }
            }
        } catch (error) {
            return { err: "Something went wrong", valid: false }
        }
    }
    return { collectorCard, loading, err, submitTestimonials, space }
}

export default useCollector;