import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import prisma from "../../prisma.js";
import multer from "multer"
import uploadAsset from "../../cloudinary.js"
import { buffer } from "node:stream/consumers";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const spaceRouter = express.Router()

spaceRouter.post('/newSpace', authMiddleware, upload.fields([
    { name: 'space_image', maxCount: 1 },
    { name: 'thank_you_page_image', maxCount: 1 }
]), async (req: any, res: express.Response) => {
    try {
        const userId = req.id;
        const { space_name, header, message, question_1, question_2, question_3, title, thank_you_message } = req.body
        console.log(req.body)
        const files = req.files as {
            space_image: Express.Multer.File[],
            thank_you_page_image?: Express.Multer.File[]
        }
        console.log(req.files)
        if (!files || !files.space_image || !files.thank_you_page_image) {
            return res.status(400).json({
                message: 'space_image and thank_you_page_image are required',
                valid: false
            })
        }
        const spaceFile = files.space_image?.[0]
        const thankYouFile = files.thank_you_page_image?.[0]
        if (!spaceFile || !thankYouFile) {
            return res.status(400).json({ message: 'Files missing' })
        }
        const buffer_1 = Buffer.from(spaceFile.buffer)
        const buffer_2 = Buffer.from(thankYouFile.buffer)
        const cloud_response_1 = await uploadAsset(buffer_1, "space", "auto")
        const cloud_response_2 = await uploadAsset(buffer_2, "thankyou", "auto")

        if (!cloud_response_1.valid || !cloud_response_2.valid) {
            return res.status(500).json({
                message: "Unable to upload assets",
                valid: false,
            })
        }

        const response = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findFirst({
                where: {
                    id: userId
                }
            })
            if (!user) {
                throw new Error("User not found")
            }
            const new_space = await tx.space.create({
                data: {
                    space_image: cloud_response_1.url,
                    space_name: space_name,
                    question_1: question_1,
                    question_2: question_2,
                    question_3: question_3,
                    user_id: userId,
                    header: header,
                    message: message,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            })

            const new_thank_you_page = await tx.thankYouPage.create({
                data: {
                    image_url: cloud_response_2.url,
                    space_id: new_space.id,
                    message: thank_you_message,
                    title: title
                }
            })
            return { new_space, new_thank_you_page }
        }, { timeout: 3000, maxWait: 6000 })

        if (!response || !response.new_space || !response.new_thank_you_page) {
            res.status(403).json({
                message: "Unable to create space",
                valid: false
            })
            return
        }
        res.status(200).json({
            message: "Successfully created space",
            valid: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error,
            message: "Something went wrong",
            valid: false
        })
    }
})

spaceRouter.get('/collect/:id', async (req: express.Request, res: express.Response) => {

    try {
        const id = req.params.id
        if (!id) {
            res.status(400).json({
                message: "Bad request",
                valid: false
            })
            return
        }
        console.log(id)
        const response = await prisma.$transaction(async (tx) => {
            const space = await tx.space.findFirst({
                where: {
                    id: id
                }
            })
            return { space }
        }, { maxWait: 5000, timeout: 2000 })
        if (!response || !response.space) {
            res.status(403).json({
                message: "Unable to load details",
                valid: false
            })
            return
        }
        res.status(200).json({
            space: response.space,
            valid: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong",
            error: error,
            valid: false
        })
    }
})

export default spaceRouter