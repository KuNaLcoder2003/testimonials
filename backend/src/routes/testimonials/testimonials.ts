import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import multer from "multer"
import type { NewTestimonial } from "./types.js"
import uploadAsset from "../../cloudinary.js"
import prisma from "../../prisma.js"
import encrypt from "../../functions/encrypt.js"
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const testiMonialRouter = express.Router()
import crypto from "crypto";
const ALGORITHM = "aes-256-gcm";
const SECRET_KEY = crypto
    .createHash("sha256")
    .update("Secret")
    .digest(); // 32 bytes
const IV_LENGTH = 12;
interface Testimonial {
    id: string;
    space_id: string;
    type: string;
    avatar: string;
    message: string;
    email: string;
    name: string;
    title: string;
    company: string;
    social_link: string;
    created_at: Date;
    updated_at: Date;
    video_url?: string
}
export function encryptObject<T>(data: T): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(data), "utf8"),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

testiMonialRouter.post('/text', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'asset', maxCount: 1 }
]), async (req: express.Request, res: express.Response) => {
    try {
        const { email, name, space_id, message } = req.body as NewTestimonial
        if (!email || !name || !space_id || !message) {
            res.status(400).json({
                message: 'Bad request',
                valid: false
            })
            return
        }
        const files = req.files as {
            avatar: Express.Multer.File[],
            asset: Express.Multer.File[]
        }
        if (!files) {
            res.status(400).json({
                message: 'Bad request',
                valid: false
            })
            return
        }
        const avatar_file = files.avatar[0]
        const asset_file = files.asset[0]
        if (!avatar_file) {
            res.status(400).json({
                message: "Avatar file missing",
                valid: false
            })
            return
        }
        const buffer_1 = Buffer.from(avatar_file.buffer)
        const cloud_response_1 = await uploadAsset(buffer_1, "testimonial-user-image", "auto")
        let buffer_2;
        let cloud_response_2: any;
        if (asset_file) {
            buffer_2 = Buffer.from(asset_file.buffer)
            cloud_response_2 = await uploadAsset(buffer_1, "testimonial-assets", "auto")
        }
        if (!cloud_response_1.valid) {
            res.status(403).json({
                message: "Unable to upload Image",
                valid: false
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const new_testimonial = await tx.testimonial.create({
                data: {
                    space_id: space_id,
                    type: "Text",
                    message: message,
                    avatar: cloud_response_1.url,
                    created_at: new Date(),
                    updated_at: new Date(),
                    name: name,
                    email: email
                }
            })
            if (cloud_response_2.valid) {
                tx.image.create({
                    data: {
                        testimonial_id: new_testimonial.id,
                        image_url: cloud_response_2.url
                    }
                })
            }

            const thankYou = await tx.thankYouPage.findFirst({
                where: {
                    space_id: space_id
                },
                select: {
                    id: true,
                    image_url: true,
                    message: true,
                    title: true
                }
            })
            return { new_testimonial, thankYou }
        }, { maxWait: 5000, timeout: 2000 })

        if (!response || !response.new_testimonial) {
            res.status(403).json({
                message: "Unable to create testimonial",
                valid: false
            })
            return
        }
        res.status(200).json({
            thankYou: response.thankYou,
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

testiMonialRouter.post('/video', upload.single('vieo'), async (req: express.Request, res: express.Response) => {
    try {
        const { email, name, space_id } = req.body as NewTestimonial
        if (!email || !name || !space_id) {
            res.status(400).json({
                message: "Bad requests",
                valid: false
            })
            return
        }
        const file = req.file as Express.Multer.File
        if (!file) {
            res.status(400).json({
                message: "Bad requests",
                valid: false
            })
            return
        }

        const space = prisma.space.findUnique({
            where: {
                id: space_id
            }
        })
        if (!space) {
            res.status(400).json({
                message: 'No more accepting testimonials for this page',
                valid: false
            })
            return
        }
        const video_file_buffer = Buffer.from(file.buffer)
        const cloudResponse = await uploadAsset(video_file_buffer, "video-testimonial", "auto")
        if (!cloudResponse.valid) {
            res.status(400).json({
                message: "Bad requests",
                valid: false
            })
            return
        }

        const response = await prisma.$transaction(async (tx) => {
            const new_testimonial = await tx.testimonial.create({
                data: {
                    space_id: space_id,
                    type: "Video",
                    email: email,
                    name: name,
                    created_at: new Date(),
                    updated_at: new Date(),
                    title: "",
                    message: "",
                    avatar: ""
                }
            })
            const video = await tx.video.create({
                data: {
                    testimonial_id: new_testimonial.id,
                    video_url: cloudResponse.url,
                }
            })
            const updated_space = await tx.space.update({
                where: {
                    id: space_id
                },
                data: {
                    video_testimonial_count: {
                        increment: 1
                    }
                }
            })
            const thankYou = await tx.thankYouPage.findFirst({
                where: {
                    space_id: space_id
                },
                select: {
                    id: true,
                    image_url: true,
                    message: true,
                    title: true
                }
            })
            return { updated_space, video, new_testimonial, thankYou }
        }, { maxWait: 5000, timeout: 2000 })
        if (!response || !response.new_testimonial || !response.video || !response.updated_space || !response.thankYou) {
            res.status(403).json({
                message: "Unable to submit the testimonial",
                valid: false
            })
            return
        }
        res.status(200).json({
            thankYou: response.thankYou,
            valid: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong',
            valid: false
        })
    }
})

testiMonialRouter.post('/getTestimonial', authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
        const { space_id } = req.body;
        if (!space_id) {
            res.status(400).json({
                message: "Bad request",
                valid: false
            })
            return
        }
        const response = await prisma.$transaction(async (tx) => {
            const testimonials = await tx.testimonial.findMany({
                where: {
                    space_id: space_id
                }
            })
            const videos = await tx.video.findMany({
                where: {
                    testimonial_id: {
                        in: testimonials.map(item => item.id)
                    }
                }
            })
            const mergedArray: Testimonial[] = testimonials.map(item => {
                let temp: Testimonial = { ...item }
                videos.map(obj => {
                    if (item.type.toLowerCase() == "video") {
                        temp.video_url = obj.video_url
                    }
                })
                return temp
            })
            return { mergedArray }
        }, { maxWait: 5000, timeout: 2000 })

        if (!response || !response.mergedArray) {
            res.status(403).json({
                message: "Unable to fetch testimonials",
                valid: false
            })
            return
        }

        res.status(200).json({
            valid: true,
            testimonials: response.mergedArray
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Somethhing went wrong",
            valid: false
        })
    }
})

testiMonialRouter.post('/createEmbed', authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
        const { testimonial_id, margin, background, border_thickness, text_size, border_color, text_font, shadow, border_radius, design_type, avatar, text_color } = req.body;

        const response = await prisma.$transaction(async (tx) => {
            const embed = tx.embed.upsert({

                create: {
                    testimonial_id: testimonial_id,
                    design_type: design_type,
                    image: avatar,
                    border_color: border_color,
                    text_color: text_color,
                    border_radius: border_radius,
                    border_thickness: border_thickness,
                    margin: margin,
                    text_font: text_font,
                    text_size: text_size,
                    background: background,
                    shadow: shadow
                },
                where: {
                    testimonial_id: testimonial_id
                },
                update: {
                    design_type: design_type,
                    image: avatar,
                    border_color: border_color,
                    text_color: text_color,
                    border_radius: border_radius,
                    border_thickness: border_thickness,
                    margin: margin,
                    text_font: text_font,
                    text_size: text_size,
                    background: background,
                    shadow: shadow
                }
            })
            return { embed }
        }, { maxWait: 5000, timeout: 2000 })

        if (!response || !response.embed) {
            res.status(403).json({
                message: "Unable to create embed link",
                valid: false
            })
            return
        }
        res.status(200).json({
            message: "Saved",
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
export default testiMonialRouter