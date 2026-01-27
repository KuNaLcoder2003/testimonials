import express from "express"
import type { signin, signup } from "./types.js"
import prisma from "../../prisma.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import multer from "multer"
import uploadAsset from "../../cloudinary.js"
import authMiddleware from "../../middlewares/authMiddleware.js"
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
dotenv.config()
const userRouter = express.Router()
const JWT_SECRET = `${process.env.JWT_SECRET}`


userRouter.post('/signup', upload.single('avatar'), async (req: express.Request, res: express.Response) => {
    try {
        const { first_name, last_name, email, password } = req.body as signup
        const file = req.file as Express.Multer.File
        if (!first_name || !last_name || !email || !password || !file) {
            res.status(400).json({
                message: "Bad request",
                valid: false
            })
            return
        }
        const buffer = Buffer.from(file.buffer)

        const cloudResponse = await uploadAsset(buffer, "testimonials-users", "raw")
        if (cloudResponse.error && !cloudResponse.valid) {
            res.status(400).json({
                message: "Unable to create account",
                valid: false
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const new_user = await tx.user.create({
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    created_at: new Date(),
                    updated_at: new Date(),
                    avatar_url: cloudResponse.url
                }
            })
            return { new_user }
        }, { timeout: 2000, maxWait: 5000 })
        if (!response || !response.new_user) {
            res.status(403).json({
                message: "Unable to create account"
            })
            return
        }
        const token = jwt.sign({ id: response.new_user.id, email: response.new_user.email }, JWT_SECRET)
        if (!token) {
            res.status(403).json({
                message: "Unable to create account"
            })
            return
        }
        res.status(200).json({
            message: "Account Created Successfully",
            valid: true,
            token: token,
            user: {
                email: response.new_user.email,
                name: `${response.new_user.first_name} ${response.new_user.last_name}`,
                id: response.new_user.id,
                avatar: response.new_user.avatar_url
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            messsage: "Something went wrong",
            valid: false
        })
    }
})

userRouter.post('/signin', async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body as signin
        if (!email || !password) {
            res.status(400).json({
                message: "Bad request",
                valid: false
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findFirst({
                where: {
                    email: email
                }
            })
            return { user }
        }, { timeout: 2000, maxWait: 5000 })
        if (!response || !response.user) {
            res.status(403).json({
                message: "No user exists"
            })
            return
        }
        const token = jwt.sign({ id: response.user.id, email: response.user.email }, JWT_SECRET)
        if (!token) {
            res.status(403).json({
                message: "Unable to create account",
                valid: false
            })
            return
        }
        res.status(200).json({
            message: "Logged In successfully",
            valid: true,
            token: token,
            user: {
                email: response.user.email,
                name: `${response.user.first_name} ${response.user.last_name}`,
                id: response.user.id,
                avatar: response.user.avatar_url
            }
        })

    } catch (error) {
        res.status(500).json({
            error: error,
            messsage: "Something went wrong",
            valid: false
        })
    }
})

userRouter.post('/me', authMiddleware, async (req: any, res: express.Response) => {
    try {
        const userId = req.id;
        const response = await prisma.$transaction(async (tx) => {
            const spaces = await tx.space.findMany({
                where: {
                    user_id: userId
                },
                select: {
                    text_testimonial_count: true,
                    video_testimonial_count: true,
                    space_name: true,
                    space_image: true,
                    id: true,
                }
            })
            return { spaces }
        }, { maxWait: 5000, timeout: 2000 })

        if (!response || !response.spaces) {
            res.status(403).json({
                message: "Unable to get spaces",
                valid: false
            })
            return
        }
        res.status(200).json({
            valid: true,
            spaces: response.spaces
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            messsage: "Something went wrong",
            valid: false
        })
    }
})





export default userRouter