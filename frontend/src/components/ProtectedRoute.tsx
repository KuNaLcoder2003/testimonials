import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import type { JSX } from "react"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedIn, isLoading } = useAuth()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />
    }

    return children
}

export default ProtectedRoute
