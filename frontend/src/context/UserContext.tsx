import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import toast from "react-hot-toast";

type Spaces = {
    space_name: string;
    text_testimonial_count: number;
    video_testimonial_count: number;
    space_image: string;
    id: string
}


type UserContextType = {
    spaces: Spaces[] | null
    isLoading: boolean
}

export const UserContext = createContext<UserContextType | null>(null)

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [spaces, setSpaces] = useState<Spaces[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('token') as string
        try {
            setIsLoading(true)
            fetch(`${BACKEND_URL}/user/me`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(async (res: Response) => {

                const data = await res.json()
                if (!data || !data.valid) {
                    setIsLoading(false)
                    toast.error(data.message)
                } else {
                    setSpaces(data.spaces)
                    setIsLoading(false)
                }
            })
        } catch (error) {
            setIsLoading(false)
            toast.error("Something went wrong")
        }
    }, [])
    const value = useMemo(
        () => ({
            spaces,
            isLoading

        }),
        [spaces, isLoading]
    )
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context
}
