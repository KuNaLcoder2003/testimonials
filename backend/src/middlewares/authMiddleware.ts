import express from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET as string;

interface Token {
    id: string,
    email: string
}
function authMiddleware(req: any, res: express.Response, next: express.NextFunction) {
    try {
        const authToken = req.headers.authorization
        if (!authToken || authToken.length == 0) {
            res.status(401).json({
                message: "Unauthorized",
                valid: false
            })
            return
        }
        const token = authToken.split('Bearer ').at(-1)
        if (!token) {
            res.status(401).json({
                message: "Unauthorized",
                valid: false
            })
            return
        }
        else {
            const verified = jwt.verify(token, JWT_SECRET) as Token
            if (!verified) {
                res.status(401).json({
                    message: "Unauthorized",
                    valid: false
                })
                return
            } else {
                req.id = verified.id
                req.email = verified.email
                next()
            }

        }
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Somnething went wrong",
            valid: false
        })
    }
}

export default authMiddleware