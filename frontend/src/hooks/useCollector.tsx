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

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`
const useCollector = () => {
    const [collectorCard, setCollectorCard] = useState<Space>()
    const [loading, setLoading] = useState<boolean>(false)
    const [err, setErr] = useState<string>("")
    const path = useLocation()
    const space = path.pathname.split('/').at(-1);
    useEffect(() => {
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
    return { collectorCard, loading, err }
}

export default useCollector;