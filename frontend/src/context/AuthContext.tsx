import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import { useNavigate } from "react-router-dom"

type User = {
    id: string
    email: string
    name: string
}

type AuthContextType = {
    user: User | null
    isLoggedIn: boolean
    isLoading: boolean
    login: (token: string, user: User) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (token && storedUser) {
            setUser(JSON.parse(storedUser))
        }

        setIsLoading(false)
    }, [])
    const login = (token: string, user: User) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        navigate("/dashboard")
        setUser(user)
    }
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }

    const value = useMemo(
        () => ({
            user,
            isLoggedIn: !!user,
            isLoading,
            login,
            logout,
        }),
        [user, isLoading]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context
}